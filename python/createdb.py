import sqlite3
db = sqlite3.connect('Airbnb.sqlite')

db.execute('DROP TABLE IF EXISTS wishlist')

db.execute('''CREATE TABLE wishlist(
    userID INTEGER NOT NULL,
    propertyID TEXT NOT NULL,
    PRIMARY KEY (userID, propertyID)
)''')

db.execute('DROP TABLE IF EXISTS bookings')

db.execute('''CREATE TABLE bookings(
    bookingID integer PRIMARY KEY AUTOINCREMENT,
    userID integer NOT NULL,
    propertyID text NOT NULL,
    startDate text NOT NULL,
    endDate text NOT NULL,
    numGuests integer NOT NULL,
    numDays integer NOT NULL,
    paymentMethod text NOT NULL
)''')

db.commit()
db.close()
