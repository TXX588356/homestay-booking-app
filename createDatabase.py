import sqlite3
db = sqlite3.connect('users.sqlite')


db.execute('''CREATE TABLE IF NOT EXISTS users(
    id integer PRIMARY KEY AUTOINCREMENT,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    phoneNumber text NOT NULL
)''')

cursor = db.cursor()


db.commit()
db.close()