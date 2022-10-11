import time
from flask import Flask

app = Flask(__name__)

@app.route('/api')
def get_message():
    return {'message': 'Hello from the API'}