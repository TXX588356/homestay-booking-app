import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser

DB = 'Airbnb.sqlite'

app = Flask(__name__)

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
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5002, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)
    
