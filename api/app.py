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
    image = json_data["selectedImage"]
    washrooms = json_data["numWashrooms"]
    rent = json_data["price"]

    # these are hardcoded values for the foreign keys
    # for the future, change these to dynamic SQL queries
    building_id = 1
    pm_id = 1

    try:
        cur.execute("INSERT INTO AvailableUnit VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                [building_id, pm_id, room if room else None, 
                lease_term, beds, floor if floor else None, 
                image, washrooms, rent])
        cur.close()
        conn.commit()
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": f"Error creating listing: {e}"}


@app.route('/api/login', methods = ["POST"])
def login():
    conn = mysql.connection
    cur = conn.cursor()

    cur.execute("SELECT * FROM UnitListerAccount WHERE username = %s AND password = %s", (username, password))

    account = cur.fetchone()

    if account:
        # session["loggedin"] = True
        # session["id"] = account["id"]
        # session["username"] = account["username"]
        return {"sucess": True}