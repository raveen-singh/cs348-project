from flask import Flask, jsonify, request, session
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
import os
import cv2
import base64
import numpy as np
import uuid
import random
import re
from urllib.parse import urlparse

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
bcrypt = Bcrypt(app)

# make directory to store images
basedir = os.path.abspath(os.path.dirname(__file__))
images_path = os.path.join(basedir, 'images/')
os.makedirs(images_path, exist_ok=True)


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

def sanitize_user_input(raw):
    return raw.replace(";", "").replace("%", "").replace("--", "") # remove common sql characters

def is_url(url):
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except ValueError:
        return False

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

    # user input validation to prevent sql injections
    if not username.isalnum():
        return {"success": False, "message": "Not a valid username! Must be alphanumeric."}, STATUS_BAD_REQUEST

    if not password.isalnum():
        return {"success": False, "message": "Not a valid password! Must be alphanumeric."}, STATUS_BAD_REQUEST

    if not name.replace(" ", "").isalpha():
        return {"success": False, "message": "Not a valid name! Must only contain letters in the alphabet."}, STATUS_BAD_REQUEST

    if not phone_num.isnumeric() or len(phone_num) != 10:
        return {"success": False, "message": "Not a valid phone number! Please input a 10-digit phone number."}, STATUS_BAD_REQUEST
    
    if email != sanitize_user_input(email) or not re.match("[^@]+@[^@]+\.[^@]+", email):
        return {"success": False, "message": "Not a valid email!"}, STATUS_BAD_REQUEST

    if website and (website != sanitize_user_input(website) or not is_url(website)):
        return {"success": False, "message": "Not a valid website!"}, STATUS_BAD_REQUEST

    # hash password before insert
    password = bcrypt.generate_password_hash(password)

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
        return {"status": False, "message": f"Error with inserting: {e}"}

# to be used for address dropdown for building info auto-populate (join)
@app.route('/api/building/get_addresses', methods = ["GET"])
def get_building_addresses():
    cur = mysql.connection.cursor()
    cur.execute("SELECT DISTINCT building_id, address FROM building;")
    rv = cur.fetchall()
    addresses = {pair["address"]: pair["building_id"] for pair in rv}
    cur.close()
    return addresses

@app.route('/api/unit/get', methods = ["GET", "POST"])
def get_units():
    # expecting to be called /api/unit/get?id={id} (optional id) or just /api/unit/get
    id = request.args.get("id")
    cur = mysql.connection.cursor()

    json_data = ""
    order_by_sql = ""
    filter_by_sql = ""
    if request.method == "POST": # POST, or query string
        json_data = request.get_json()

        sort_by = json_data["sort"]["field"]
        sort_by_direction = json_data["sort"]["direction"]
        filter_by = json_data["filter"]["field"]
        filter_by_option = json_data["filter"]["option"]
        filter_by_lower = json_data["filter"]["lowerBound"]
        filter_by_upper = json_data["filter"]["upperBound"]

        if sort_by:
            sort_by_dict = {"distance": "b.distance_from_waterloo", "price": "u.rent_price"} # distance_from_waterloo is from building
            order_by_sql = "ORDER BY {} {}".format(sort_by_dict[sort_by], sort_by_direction)
        
        if filter_by:
            string_valued_fields = set(["Pet Friendly", "Laundry Availability", "Type of Unit"])
            value_based_filters = set(["Lease Duration", "Pet Friendly", "Laundry Availability", "Type of Unit", "Washrooms", "Bedrooms"])
            sql_fields_dict = {"Bedrooms": "u.num_beds", "Washrooms": "u.num_washrooms", "Rent Price": "u.rent_price", "Distance": "b.distance_from_waterloo",
                                "Lease Duration": "u.lease_term", "Pet Friendly": "b.pet_friendly", "Laundry Availability": "b.laundry_availability", "Type of Unit": "b.type_of_unit"}
            sql_filter_field = sql_fields_dict[filter_by]
            if filter_by in value_based_filters: # value-based filtering
                if filter_by in string_valued_fields:
                    filter_by_option = f"'{filter_by_option}'"
                filter_by_sql = "WHERE {} = {}".format(sql_filter_field, filter_by_option)
            else: # range-based filtering
                filter_by_sql = f"WHERE {sql_filter_field} >= {filter_by_lower} and {sql_filter_field} <= {filter_by_upper}"

    if id: # return one unit
        cur.execute("SELECT * FROM AvailableUnit u JOIN BUILDING b ON u.building_id = b.building_id WHERE unit_id = %s;", [id])
        rv = cur.fetchone()
    else: # return all units
        sql_query = "SELECT * FROM AvailableUnit u JOIN BUILDING b ON u.building_id = b.building_id"
        if filter_by_sql:
            sql_query += f" {filter_by_sql}"
        if order_by_sql:
            sql_query += f" {order_by_sql}"
        cur.execute(sql_query)
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

def delete_image(image_path): 
    # expects image_path to be of the form "/images/{image_name}.jpg"
    # note: do not call this function unless you know the unit has been successfully deleted/modified. 
    #       if you delete the image first, but the unit fails to delete/modify, view all units will not be able to render :()
    filename = "." + image_path

    if os.path.isfile(filename):
        os.remove(filename)

@app.route('/api/units/get', methods = ["GET"])
def get_my_units():
    id = request.args.get("id")
    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM AvailableUnit WHERE account_id = %s", [id])
    rv = cur.fetchall()

    cur.close()
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
    return {"data": rv}

@app.route('/api/unit/delete', methods = ["DELETE"])
def delete_unit():
    # expecting to be called /api/unit/delete?id={id} 
    if "loggedin" not in session:
        return {"success": False, "message": "Not logged in!"}, STATUS_BAD_REQUEST

    id = request.args.get("id")
    conn = mysql.connection
    cur = conn.cursor()
    
    success = True
    message = ""
    account_id = session["id"]

    cur.execute("SELECT * FROM AvailableUnit WHERE unit_id = %s AND account_id = %s;", [id, account_id]) # checks that the unit exists, and belongs to the logged in user
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
        
        delete_image(rv["image_path"])
    
    cur.close()
    conn.commit()

    if not success:
        return {"status": success, "message": message}, STATUS_BAD_REQUEST
    else:
        return {"status": success}

def save_image(image, image_name, unique_id):
    data = image.split(',')
    filename = images_path + f'{unique_id}{image_name}'
    image_data = data[1]

    jpg_original = base64.b64decode(image_data)
    jpg_as_np = np.frombuffer(jpg_original, dtype=np.uint8)
    img = cv2.imdecode(jpg_as_np, flags=1)
    # we write to os filepath in development (this might have to change in prod)
    cv2.imwrite(filename, img) # image_name

@app.route('/api/unit/update', methods = ["PUT"])
def update_unit():
    if "loggedin" not in session:
        return {"success": False, "message": "Not logged in!"}, STATUS_BAD_REQUEST

    json_data = request.get_json()

    unit_id = json_data["unit_id"]
    room_num = json_data["room_num"]
    rent_price = json_data["rent_price"]
    num_beds = json_data["num_beds"]
    num_washrooms = json_data["num_washrooms"]
    lease_term = json_data["lease_term"]
    floor_num = json_data["floor_num"]
    image_path = json_data["image_path"]

    # check that unit belongs to the logged in user
    conn = mysql.connection
    cur = conn.cursor()
    account_id = session["id"]
    cur.execute("SELECT * FROM AvailableUnit WHERE unit_id = %s AND account_id = %s;", [unit_id, account_id]) # checks that the unit exists, and belongs to the logged in user
    rv = cur.fetchone()
    if not rv:
        return {"success": False, "message": "You are not permissioned to update this unit!"}, STATUS_BAD_REQUEST
    
    try:
        if rv["image_path"] == image_path: # don't need to change the image
            cur.execute("""UPDATE AvailableUnit 
                    SET room_num = %s, lease_term = %s, num_beds = %s, floor_num = %s, num_washrooms = %s, rent_price = %s
                    WHERE unit_id = %s;""", [room_num, lease_term, num_beds, floor_num, num_washrooms, rent_price, unit_id])
                
        else: # need to change the image
            relative_image_path = ""
            try: 
                image_name = f"unit{unit_id}.png"
                unique_id = str(uuid.uuid4())[:8]
                relative_image_path = '/images/' + f'{unique_id}{image_name}'
                save_image(image_path, image_name, unique_id)
            except Exception as e:
                return {"success": False, "message": f"Error saving updated image: {e}"}

            cur.execute("""UPDATE AvailableUnit 
                    SET room_num = %s, lease_term = %s, num_beds = %s, floor_num = %s, image_path = %s, num_washrooms = %s, rent_price = %s
                    WHERE unit_id = %s;""", [room_num, lease_term, num_beds, floor_num, relative_image_path, num_washrooms, rent_price, unit_id])
        conn.commit()
    except Exception as e:
        return {"success": False, "message": f"Error updating listing: {e}"}

    if rv["image_path"] != image_path: # a new image was successfully uploaded and linked to the unit, time to delete the old image
        delete_image(rv["image_path"])

    return {"success": True}

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
    
    unique_id = str(uuid.uuid4())[:8]
    relative_image_path = '/images/' + f'{unique_id}{image_name}'
    try:
        save_image(image, image_name, unique_id)
    except Exception as e:
        delete_image(relative_image_path)
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
        delete_image(relative_image_path)
        return {"success": False, "message": f"Error creating listing: {e}"}, STATUS_BAD_REQUEST
    

@app.route('/api/reviews/create', methods = ["POST"])
def post_review():
    conn = mysql.connection
    cur = conn.cursor()

    json_data = request.get_json()
    admin_helpfulness = json_data["adminHelpfulness"]
    building_id = json_data["building_id"]
    cleanliness = json_data["cleanliness"]
    comment = json_data["comment"]
    review_helpfulness = 0

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


@app.route('/api/reviews/get_random_names', methods = ["GET"])
def get_random_name():
    num = int(request.args.get("number"))

    adjectives = ["adventurous", "ambitious", "amusing", "bright", "charming", "clever", "courageous", "creative", "determined", "dynamic", "enthusiastic", "exuberant", "friendly",
    "funny", "gentle", "honest", "kind", "loyal", "nice", "sincere", "thoughtful", "bedazzled", "blissful", "blushing", "bold", "breezy", "caring", "charismatic", "cheerful", "delightful",
    "dreamy", "energetic", "enthusiastic", "fashionable", "graceful", "groovy", "humble", "hopeful", "impressive", "insightful", "phenomenal", "quirky", "suave", "playful", "sweet", 
    "empathetic", "fun"]

    animals = ["leopard", "dog", "rabbit", "dolphin", "eagle", "beaver", "hamster", "tiger", "cheetah", "turtle", "giraffe", "deer", "cat", "bear", "fox", "antelope", "chameleon", "elephant",
    "alligator", "armadillo", "camel", "hippo", "chihuahua", "chinchilla", "zebra", "dodo", "jellyfish", "possum", "swan", "peacock", "lemur", "lynx", "sheep", "rhino", "llama", "koala", 
    "kangaroo", "iguana", "gecko", "shark", "dove", "flamingo", "butterfly", "chickadee", "mouse", "goldfish", "sparrow"]

    if num > len(adjectives) or num > len(animals):
        multiply = int((num / max(len(adjectives), len(animals))) + 1)
        adjectives  = adjectives * multiply
        animals = animals * multiply

    random_names = [adjective.capitalize() + " " + animal.capitalize() for (adjective, animal) in list(zip(random.sample(adjectives, num), random.sample(animals, num)))]

    return random_names

@app.route('/api/reviews/update', methods = ["PUT"])
def update_review():
    conn = mysql.connection
    cur = conn.cursor()

    review_id = request.args.get("id")    
    like = request.args.get("like") 
    try:
        if like == 'yes':
            cur.execute("UPDATE Review SET review_helpfulness = review_helpfulness + 1  WHERE review_id=%s", 
            [review_id])
        elif like == 'no':
            cur.execute("UPDATE Review SET review_helpfulness = review_helpfulness - 1  WHERE review_id=%s", 
            [review_id])

        conn.commit()

        cur.execute("SELECT review_helpfulness FROM Review WHERE review_id=%s", 
        [review_id])
        review = cur.fetchone()
        cur.close()
        return {"success": True, "review_helpfulness": review["review_helpfulness"]}
    except Exception as e:
        return {"success": False, "message": f"Error updating comment: {e}"}, STATUS_BAD_REQUEST



@app.route('/api/login', methods = ["POST"])
def login():
    json_data = request.get_json()
    username = json_data["username"]
    password = json_data["password"]

    cur = mysql.connection.cursor()

    cur.execute("SELECT * FROM UnitListerAccount WHERE username = %s", [username])

    account = cur.fetchone()
    cur.close()

    if account:
        # check retrieved hash password against user input
        validate_password = bcrypt.check_password_hash(account["password"], password)

        if validate_password:
            session["loggedin"] = True
            session["id"] = account["account_id"]
            session["username"] = account["username"]
            return {"success": True, "session": session}
        else:
            return {"success": False, "message": "Invalid credentials!"} # not sure if i should throw STATUS_BAD_REQUEST, but when i do, the frontend is unable to read the message because an exception is thrown
    else:
        return {"success": False, "message": "This username doesn't exist!"} # same as above!


@app.route('/api/logout', methods = ["POST"])
def logout():
    session.pop("loggedin", None)
    session.pop("id", None)
    session.pop("username", None)

    return {"success": True}