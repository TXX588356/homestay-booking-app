import sqlite3
from flask import Flask, jsonify, request, abort

DB = 'Airbnb.sqlite'

"""
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
"""

app = Flask(__name__)

"""
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
"""

@app.route('/api/wishlist/user/<int:user_id>/property/<string:property_id>', methods=['GET'])
def get_user_wishlist_property(user_id, property_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM wishlist WHERE userID=? AND propertyID=?', (user_id, property_id))
    row = cursor.fetchone()
    db.close()

    if row:
        wishlist_item = {'userID': row[0], 'propertyID': row[1]}
        return jsonify(wishlist_item), 200
    else:
        return jsonify({}), 200  # return empty object if not found

@app.route('/api/wishlist', methods=['POST'])
def add_wishlist():
    if not request.json:
        abort(400, description="Invalid JSON request")

    new_wishlist = (
        request.json['userID'],
        request.json['propertyID']
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('''
        INSERT INTO wishlist(userID, propertyID)
        VALUES(?, ?)
    ''', new_wishlist)

    db.commit()
    response = {
        'affected': db.total_changes,
    }

    db.close()
    return jsonify(response), 201

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
    response = {
        'affected': db.total_changes,
    }

    db.close()
    return jsonify(response), 200

@app.route('/api/wishlist/user/<int:user_id>', methods=['GET'])
def get_user_wishlist(user_id):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT propertyID FROM wishlist WHERE userID=?', (user_id,))
    rows = cursor.fetchall()
    db.close()

    if rows:
        wishlist = [{'propertyID': row[0]} for row in rows]
        return jsonify(wishlist), 200  # Return wishlist items for the user
    else:
        return jsonify([]), 200  # Return empty list if no wishlist items found
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
