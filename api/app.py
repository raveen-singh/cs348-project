import time
from flask import Flask, jsonify
from flask_mysqldb import MySQL
from flask import request

app = Flask(__name__)

# env vars for the db
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'cs348db'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)



@app.route('/api')
def get_message():
    return {'message': 'Hello from the API'}

@app.route('/api/db')
def get_data():
    cur = mysql.connection.cursor()
    cur.execute("""SELECT * FROM users""")
    rv = cur.fetchone()
    cur.close()
    return {'message':rv}

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
            return {"status": True}
        except Exception as e:
            return {"status": False, "message": f"Error with inserting: {e}"} 
    else: # user already exists
        return {"status": False, "message": "This username is taken!"}

def create_building(building_info):
    # info is a dictionary with keys address, pet_friendly, laundry_availability, type_of_unit, and distance_from_waterloo
    # address VARCHAR(255) NOT NULL,
    # pet_friendly TINYINT(1) NOT NULL,
    # laundry_availability ENUM('building', 'ensuite', 'none') NOT NULL,
    # type_of_unit ENUM('apartment','house') NOT NULL,
    # distance_from_waterloo DECIMAL(3,1) NOT NULL,

    # building_info = {"address": "123 H", "pet_friendly": 0, "laundry_availability": "ensuite", "type_of_unit": "house", "distance_from_waterloo": 0.4}
    conn = mysql.connection
    cur = conn.cursor()

    try:
        cur.execute("INSERT INTO Building VALUES (NULL, %s, %s, %s, %s, %s)", 
                    (building_info["address"], building_info["pet_friendly"], building_info["laundry_availability"], building_info["type_of_unit"], building_info["distance_from_waterloo"]))
        conn.commit()

        cur.execute("SELECT max(building_id) as building_id from building;")
        building_id = cur.fetchone()["building_id"]
        print(f"new building id is {building_id}")
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
            print(message)
    
    cur.close()
    conn.commit()
    return {"status": success, "message": message}



@app.route('/api/unit/create', methods = ["POST"])
def list_unit():
    conn = mysql.connection
    cur = conn.cursor()

    json_data = request.get_json()
    print(json_data)
    # address is used in future to find building_id
    address = json_data["address"]
    room = json_data["room_num"]
    lease_term = json_data["lease_term"]
    beds = json_data["num_beds"]
    floor = json_data["floor_num"]
    image = json_data["image_path"]
    washrooms = json_data["num_washrooms"]
    rent = json_data["rent_price"]

    if not json_data["building_id"]:
        print("creating building...")
        pet_friendly = 0
        laundry_availability = "Ensuite"
        type_of_unit = "House"
        distance_from_waterloo = 0.5
        building_info = {"address": address, "pet_friendly": pet_friendly, "laundry_availability": laundry_availability, "type_of_unit": type_of_unit, "distance_from_waterloo": distance_from_waterloo}
        result = create_building(building_info)
        print(f"creating building result: {result}")

    # these are hardcoded values for the foreign keys
    # for the future, change these to dynamic SQL queries
    building_id = 1

    # GET CURRENT PM!
    pm_id = 1

    try:
        cur.execute("INSERT INTO AvailableUnit VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                [building_id, pm_id, room if room else None, 
                lease_term, beds, floor if floor else None, 
                image, washrooms, rent])
        conn.commit()

        # get id of recently inserted building, assumes no concurrent writes :(
        cur.execute("SELECT max(unit_id) as unit_id FROM AvailableUnit;")
        unit_id = cur.fetchone()["unit_id"]

        cur.close()
        return {"success": True, "unit_id": unit_id} # RETURN UNIT ID
    except Exception as e:
        return {"success": False, "message": f"Error creating listing: {e}"}