import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser

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

@app.route('/api/bookingHistory/user/<int:user_id>', methods=['GET'])
def get_user_bookings(user_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM bookings WHERE userID=?', (user_id,))
    rows = cursor.fetchall()
    db.close()

    if rows:
        booking_list = [get_row_as_dict(row) for row in rows]
        return jsonify(booking_list), 200
    else:
        return jsonify([]), 200

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

    response = {
        'bookingID': booking_id,
        'affected': db.total_changes,
    }

    db.close()
    return jsonify(response), 201

@app.route('/api/bookingHistory', methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM bookings')
    rows = cursor.fetchall()
    db.close()

    booking_list = [get_row_as_dict(row) for row in rows]

    return jsonify(booking_list), 200

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5001, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)
    
