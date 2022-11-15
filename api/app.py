from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
import os
import cv2
import base64
import numpy as np
import uuid

app = Flask(__name__)

# env vars for the db
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'cs348db'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

STATUS_BAD_REQUEST = 400

mysql = MySQL(app)

# make directory to store images
basedir = os.path.abspath(os.path.dirname(__file__))
images_path = os.path.join(basedir, 'images/')
os.makedirs(images_path, exist_ok=True)



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

@app.route('/api/unit/create', methods = ["POST"])
def create_unit():
    conn = mysql.connection
    cur = conn.cursor()

    json_data = request.get_json()
    # address is used in future to find building_id
    address = json_data["address"]
    room = json_data["room"]
    lease_term = json_data["leaseDuration"]
    beds = json_data["numBeds"]
    floor = json_data["floor"]
    image = json_data["selectedFile"]
    washrooms = json_data["numWashrooms"]
    rent = json_data["price"]
    image_name = json_data["fileName"]
    # these are hardcoded values for the foreign keys
    # for the future, change these to dynamic SQL queries
    building_id = 1
    account_id = 1
 
    data = image.split(',')
    filename = images_path + f'{str(uuid.uuid4())}{image_name}'

    try:
        jpg_original = base64.b64decode(data[1])
        jpg_as_np = np.frombuffer(jpg_original, dtype=np.uint8)
        img = cv2.imdecode(jpg_as_np, flags=1)
        cv2.imwrite(filename, img)
    except Exception as e:
        return {"success": False, "message":" could not save image"}, STATUS_BAD_REQUEST

    try:
        cur.execute("INSERT INTO AvailableUnit VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                [building_id, account_id, room if room else None, 
                lease_term, beds, floor if floor else None, 
                filename, washrooms, rent])
        cur.close()
        conn.commit()
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": f"Error creating listing: {e}"}