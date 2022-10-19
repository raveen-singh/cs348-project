import time
from flask import Flask, jsonify
from flask_mysqldb import MySQL
from flask import request
import sys

app = Flask(__name__)

# env vars for the db
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'cs348db'

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

@app.route('/register_lister', methods = ["POST"])
def register_lister():
    json_data = request.get_json()
    if json_data['name'] == "test":
        return {'status': True}
    return {'status': False}
    # "INSERT INTO lister_accounts () values ()"