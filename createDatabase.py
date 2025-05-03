import sqlite3
db = sqlite3.connect('users.sqlite')

db.execute('DROP TABLE IF EXISTS users')

db.execute('''CREATE TABLE users(
    id integer PRIMARY KEY AUTOINCREMENT,
    name text NOT NULL,
    email text NOT NULL,
    password integer NOT NULL,
    phoneNumber text NOT NULL
)''')

cursor = db.cursor()


db.commit()
db.close()