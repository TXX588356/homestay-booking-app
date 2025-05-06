import sqlite3
from flask import Flask, jsonify, request, abort, render_template
from flask_socketio import SocketIO, emit
from datetime import datetime
import json
import threading

DB = 'Airbnb.sqlite'

def get_row_as_dict(row):
    return {
        'bookingID': row[0],
        'userID': row[1],
        'propertyID': row[2],
        'startDate': row[3],
        'endDate': row[4],
        'numGuests': row[5],
        'numDays': row[6],
        'paymentMethod': row[7]
    }

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)

@app.route('/api/bookingHistory/user/<int:user_id>', methods=['GET'])
def get_user_bookings(user_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM bookings WHERE userID=?', (user_id,))
    rows = cursor.fetchall()
    db.close()

    booking_list = [get_row_as_dict(row) for row in rows]
    return jsonify(booking_list), 200

@app.route('/api/bookingHistory', methods=['POST'])
def store():
    if not request.json:
        abort(400, description="Invalid JSON request")

    new_BookingHistory = (
        request.json['userID'],
        request.json['propertyID'],
        request.json['startDate'],
        request.json['endDate'],
        request.json['numGuests'],
        request.json['numDays'],
        request.json['paymentMethod']
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''
        INSERT INTO bookings(userID, propertyID, startDate, endDate, numGuests, numDays, paymentMethod)
        VALUES(?, ?, ?, ?, ?, ?, ?)
    ''', new_BookingHistory)

    booking_id = cursor.lastrowid
    db.commit()
    db.close()

    return jsonify({'bookingID': booking_id, 'affected': 1}), 201

@app.route('/api/bookingHistory', methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM bookings')
    rows = cursor.fetchall()
    db.close()

    booking_list = [get_row_as_dict(row) for row in rows]
    return jsonify(booking_list), 200

@app.route('/api/wishlist/user/<int:user_id>/property/<string:property_id>', methods=['GET'])
def get_user_wishlist_property(user_id, property_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM wishlist WHERE userID=? AND propertyID=?', (user_id, property_id))
    row = cursor.fetchone()
    db.close()

    if row:
        return jsonify({'userID': row[0], 'propertyID': row[1]}), 200
    else:
        return jsonify({}), 200

@app.route('/api/wishlist', methods=['POST'])
def add_wishlist():
    if not request.json:
        abort(400, description="Invalid JSON request")

    new_wishlist = (request.json['userID'], request.json['propertyID'])

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('INSERT INTO wishlist(userID, propertyID) VALUES(?, ?)', new_wishlist)
    db.commit()
    db.close()

    return jsonify({'affected': 1}), 201

@app.route('/api/wishlist', methods=['DELETE'])
def delete_wishlist():
    if not request.json:
        abort(400, description="Invalid JSON request")

    userID = request.json['userID']
    propertyID = request.json['propertyID']

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('DELETE FROM wishlist WHERE userID=? AND propertyID=?', (userID, propertyID))
    db.commit()
    db.close()

    return jsonify({'affected': 1}), 200

@app.route('/api/wishlist/user/<int:user_id>', methods=['GET'])
def get_user_wishlist(user_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT propertyID FROM wishlist WHERE userID=?', (user_id,))
    rows = cursor.fetchall()
    db.close()

    wishlist = [{'propertyID': row[0]} for row in rows]
    return jsonify(wishlist), 200

# WebSocket routes and handling
@app.route('/chat')
def sessions():
    return render_template('index.html')

@socketio.on('connect', namespace='/chat')
def handle_connect_chat():
    print('A client connected')

@socketio.on('mobile_client_connected', namespace='/chat')
def handle_mobile_connected(json_data):
    print("Mobile client connected:", json_data['connected'])
    return 'noticed'

@socketio.on('web_client_connected', namespace='/chat')
def handle_web_connected(json_data):
    print("Admin client connected:", json_data['connected'])

@socketio.on('message_sent', namespace='/chat')
def handle_message_sent(json_data):
    sender = json_data['sender']
    message = json_data['message']
    data = {
        'timestamp': str(datetime.now()),
        'sender': sender,
        'message': message,
    }
    print(f"Message from {sender}: {message}")
    emit('message_broadcast', json.dumps(data), broadcast=True)

# Start Flask and SocketIO server
def start_servers():
    # Start SocketIO server in a separate thread
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)

if __name__ == '__main__':
    # Start the Flask app and WebSocket server
    start_servers()

"""
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from datetime import datetime
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)

@app.route('/chat')
def sessions():
    return render_template('index.html')

@socketio.on('connect', namespace='/chat')
def handle_connect_chat():
    print('A client connected')

@socketio.on('mobile_client_connected', namespace='/chat')
def handle_mobile_connected(json_data):
    print("Mobile client connected:", json_data['connected'])
    return 'noticed'

@socketio.on('web_client_connected', namespace='/chat')
def handle_web_connected(json_data):
    print("Admin client connected:", json_data['connected'])

@socketio.on('message_sent', namespace='/chat')
def handle_message_sent(json_data):
    sender = json_data['sender']
    message = json_data['message']
    data = {
        'timestamp': str(datetime.now()),
        'sender': sender,
        'message': message,
    }
    print(f"Message from {sender}: {message}")
    emit('message_broadcast', json.dumps(data), broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
"""