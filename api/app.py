from flask import Flask, jsonify, request, session
from flask_mysqldb import MySQL
import os
import cv2
import base64
import numpy as np
import uuid

app = Flask(__name__)
app.secret_key = 'a secret key'
# env vars for the db
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'cs348db'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

STATUS_BAD_REQUEST = 400
STATUS_ALREADY_EXISTS = 403

mysql = MySQL(app)

# make directory to store images
basedir = os.path.abspath(os.path.dirname(__file__))
images_path = os.path.join(basedir, 'images/')
os.makedirs(images_path, exist_ok=True)

def save_image(image_name, image_data):
    jpg_original = base64.b64decode(image_data)
    jpg_as_np = np.frombuffer(jpg_original, dtype=np.uint8)
    img = cv2.imdecode(jpg_as_np, flags=1)
    # we write to os filepath in development (this might have to change in prod)
    cv2.imwrite(image_name, img)


@app.route('/api/building/get', methods = ["GET"]) # add ability to filter by current user's property
def get_buildings():
    # expecting to be called /api/building/get?id={id} (optional id) or just /api/building/get
    id = request.args.get("id")
    review_grouped_by_building_query = "SELECT building_id, ROUND(AVG(admin_helpfulness_rating), 1) AS admin_rating, ROUND(AVG(cleanliness_rating), 1) AS cleanliness_rating FROM review group BY building_id"
    cur = mysql.connection.cursor()

    if id: # return one building
        cur.execute(f"SELECT * FROM building b LEFT JOIN ({review_grouped_by_building_query}) r ON b.building_id = r.building_id WHERE b.building_id = %s;", [id])
        rv = cur.fetchone()
    else: # return all buildings
        cur.execute(f"SELECT * FROM building b LEFT JOIN ({review_grouped_by_building_query}) r ON b.building_id = r.building_id;")
        rv = cur.fetchall()

    cur.close()
    return {"data": rv} # rv is a dictionary if provided id, otherwise a list of dictionaries. dictionary includes averaged reviews.


@app.route('/api/lister/create', methods = ["POST"])
def create_lister():
    conn = mysql.connection
    cur = conn.cursor()

    json_data = request.get_json()
    username = json_data["username"]
    password = json_data["password"]
    name = json_data["name"]
    phone_num = json_data["phone_num"]
    email = json_data["email"]
    website = json_data["website"]
    
    # This check might be redundant now since we added UNIQUE to username,
    # so the trycatch block would return a duplicate user error
    cur.execute("SELECT * FROM UnitListerAccount WHERE username = %s", [username])
    rv = cur.fetchone()
    if not rv: # user dne, insert
        try:
            cur.execute("INSERT INTO UnitListerAccount VALUES (NULL, %s, %s, %s, %s, %s, %s)", 
                        (username, password, name, phone_num, email, website if website != "" else None))
            cur.close()
            conn.commit()
            return {"success": True}
        except Exception as e:
            return {"success": False, "message": f"Error with inserting: {e}"}, STATUS_BAD_REQUEST
    else: # user already exists
        return {"success": False, "message": "This username is taken!"}, STATUS_ALREADY_EXISTS


def create_building(building_info):
    conn = mysql.connection
    cur = conn.cursor()

    try:
        cur.execute("INSERT INTO Building VALUES (NULL, %s, %s, %s, %s, %s)", 
                    (building_info["address"], building_info["pet_friendly"], building_info["laundry_availability"], building_info["type_of_unit"], building_info["distance_from_waterloo"]))
        conn.commit()

        cur.execute("SELECT last_insert_id() as building_id from building;")
        building_id = cur.fetchone()["building_id"]
        cur.close()
        return {"status": True, "building_id": building_id}
    except Exception as e:
        return {"status": False, "message": f"Error with inserting: {e}"}, STATUS_BAD_REQUEST

# to be used for address dropdown for building info auto-populate (join)
@app.route('/api/building/get_addresses', methods = ["GET"])
def get_building_addresses():
    cur = mysql.connection.cursor()
    cur.execute("SELECT DISTINCT building_id, address FROM building;")
    rv = cur.fetchall()
    addresses = {pair["address"]: pair["building_id"] for pair in rv}
    cur.close()
    return addresses

@app.route('/api/unit/get', methods = ["GET"])
def get_units():
    # expecting to be called /api/unit/get?id={id} (optional id) or just /api/unit/get
    id = request.args.get("id")
    cur = mysql.connection.cursor()

    if id: # return one unit
        cur.execute("SELECT * FROM AvailableUnit WHERE unit_id = %s;", [id])
        rv = cur.fetchone()
    else: # return all units
        cur.execute(f"SELECT * FROM AvailableUnit;")
        rv = cur.fetchall()
    
    if not rv:
        return {"success": False}, STATUS_BAD_REQUEST
    # append image data to returned tuple
    if type(rv) == tuple:
        rv = list(rv)
    else:
        rv = [rv]
   
    for r in rv:
        file_name = basedir + r['image_path']
        img = cv2.imread(file_name)
        jpg_img = cv2.imencode('.jpg',img)
        b64_string = base64.b64encode(jpg_img[1]).decode('utf-8')
        r["image_data"] = b64_string
    rv = tuple(rv)
    cur.close()
    return {"data": rv} # rv is a dictionary if provided id, otherwise a list of dictionaries

@app.route('/api/unit/delete', methods = ["DELETE"])
def delete_unit():
    # expecting to be called /api/unit/get?id={id} 
    id = request.args.get("id")
    conn = mysql.connection
    cur = conn.cursor()
    
    success = True
    message = ""

    cur.execute("SELECT * FROM AvailableUnit WHERE unit_id = %s", [id])
    rv = cur.fetchone()
    if not rv:
        success = False
        message = f"unit_id {id} doesn't exist so it cannot be deleted!"
    else:
        try:
            cur.execute("DELETE FROM AvailableUnit WHERE unit_id = %s;", [id])
        except Exception as e:
            success = False
            message = f"Error with deleting unit id {id}: {e}"
    
    cur.close()
    conn.commit()
    if not success:
        return {"status": success, "message": message}, STATUS_BAD_REQUEST
    else:
        return {"status": success}



@app.route('/api/unit/create', methods = ["POST"])
def list_unit():
    # check if user is logged in
    if "loggedin" not in session:
        return {"success": False, "message": "Not logged in!"}, STATUS_BAD_REQUEST

    conn = mysql.connection
    cur = conn.cursor()

    json_data = request.get_json()

    building_id = json_data["building_id"]
    room = json_data["room_num"] if json_data["room_num"] != "" else None
    lease_term = json_data["lease_term"]
    beds = json_data["num_beds"]
    floor = json_data["floor_num"] if json_data["floor_num"] != "" else None
    image = json_data["image_path"]
    washrooms = json_data["num_washrooms"]
    rent = json_data["rent_price"]

    if "fileName" not in json_data:
        return {"success": False, "message": "Please upload an image!"}, STATUS_BAD_REQUEST
    image_name = json_data["fileName"]
    account_id = session["id"]
    
    if not building_id:
        building_info = {"address": json_data["new_address"], 
                        "pet_friendly": json_data["pet_friendly"], 
                        "laundry_availability": json_data["laundry_availability"], 
                        "type_of_unit": json_data["type_of_unit"], 
                        "distance_from_waterloo": json_data["distance_from_waterloo"]}
        result = create_building(building_info)
        if result["status"]:
            building_id = result["building_id"]
        else:
            return {"success": False, "message": result["message"]}, STATUS_BAD_REQUEST
 
    data = image.split(',')
    relative_image_path = '/images/' + f'{str(uuid.uuid4())[:8]}{image_name}'
    filename = images_path + f'{str(uuid.uuid4())[:8]}{image_name}'

    try:
        save_image(filename, data[1])
    except Exception as e:
        return {"success": False, "message": f"could not save image: {e}"}, STATUS_BAD_REQUEST

    try:
        cur.execute("INSERT INTO AvailableUnit VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                [building_id, account_id, room if room else None, 
                lease_term, beds, floor if floor else None, 
                relative_image_path, washrooms, rent])
        conn.commit()

        # get id of recently inserted unit, assumes no concurrent writes :(
        cur.execute("SELECT last_insert_id() as unit_id FROM AvailableUnit;")
        unit_id = cur.fetchone()["unit_id"]

        cur.close()
        return {"success": True, "unit_id": unit_id}
    except Exception as e:
        return {"success": False, "message": f"Error creating listing: {e}"}, STATUS_BAD_REQUEST

@app.route('/api/review/create', methods = ["POST"])
def post_review():
    conn = mysql.connection
    cur = conn.cursor()

    json_data = request.get_json()
    admin_helpfulness = json_data["adminHelpfulness"]
    building_id = json_data["building_id"]
    cleanliness = json_data["cleanliness"]
    comment = json_data["comment"]
    review_helpfulness = json_data["reviewHelpfulness"]

    try:
        cur.execute("INSERT INTO Review VALUES (NULL, %s, %s, %s, %s, %s)", 
        [building_id, admin_helpfulness, cleanliness, 
        comment, review_helpfulness])
        cur.close()
        conn.commit()
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": f"Error posting comment: {e}"}, STATUS_BAD_REQUEST

@app.route('/api/reviews/get', methods = ["GET"])
def get_review():
    id = request.args.get("id")

    all_reviews_query = "SELECT review_id, admin_helpfulness_rating, cleanliness_rating, review_helpfulness, comment FROM review r LEFT JOIN building b ON r.building_id = b.building_id WHERE b.building_id = %s;" 
    cur = mysql.connection.cursor()
    cur.execute(all_reviews_query, [id])
    reviews = cur.fetchall()
    cur.close()

    return {"success": True, "reviews": reviews}


@app.route('/api/login', methods = ["POST"])
def login():
    json_data = request.get_json()
    username = json_data["username"]
    password = json_data["password"]

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM UnitListerAccount WHERE username = %s AND password = %s", (username, password))

    account = cur.fetchone()
    cur.close()

    if account:
        session["loggedin"] = True
        session["id"] = account["account_id"]
        session["username"] = account["username"]
        return {"success": True, "session": session}
    else:
        return {"success": False, "message": "Invalid credentials"}


@app.route('/api/logout', methods = ["POST"])
def logout():
    session.pop("loggedin", None)
    session.pop("id", None)
    session.pop("username", None)

    return {"success": True}
