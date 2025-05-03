import {SQLiteDatabase, openDatabase, enablePromise} from "react-native-sqlite-storage";

// Enable promise for SQLite operations
enablePromise(true);

const databaseName = "users.sqlite";

const openCallback = () => {
    console.log('Database open successfully');
}

const errorCallback = (err: any) => {
    console.error("Error in opening the database:", err);
}

export const getDBConnection = async() => {
    try {
        console.log("Attempting to open database:", databaseName);
        const db = await openDatabase(
            {
                name: databaseName, 
                createFromLocation: "~users.sqlite", 
                location: 'default'
            },
            openCallback, 
            errorCallback
        );
        console.log("Database connection object created");
        
        return db;
    } catch (error) {
        console.error("Failed to open database:", error);
        throw error;
    }
}

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export const getUsers = async (db: SQLiteDatabase): Promise<User[]> => {
    try {
        console.log("Fetching all users from database");
        const userData: User[] = [];
        const query = 'SELECT * FROM users';
        const results = await db.executeSql(query);
        
        if (results && results.length > 0) {
            const rows = results[0].rows;
            console.log(`Found ${rows.length} users in database`);
            for (let i = 0; i < rows.length; i++) {
                userData.push(rows.item(i));
            }
        } else {
            console.log("No users found or results empty");
        }
        return userData;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export const getUserByEmail = async (db: SQLiteDatabase, email: string): Promise<User | null> => {
    try {
        console.log(`Checking if user exists with email: ${email}`);
        const query = 'SELECT * FROM users WHERE email = ?';
        const results = await db.executeSql(query, [email]);
        
        if (results && results.length > 0 && results[0].rows.length > 0) {
            console.log("User found with matching email");
            return results[0].rows.item(0);
        }
        console.log("No user found with this email");
        return null;
    } catch (error) {
        console.error(`Error checking user by email ${email}:`, error);
        return null;
    }
}

export const createUser = async (db: SQLiteDatabase, user: User): Promise<boolean> => {
    try {
        console.log(`Attempting to create user with email: ${user.email}`);
        
        // Check if user with email already exists
        const existingUser = await getUserByEmail(db, user.email);
        if (existingUser) {
            console.log("User with this email already exists");
            return false;
        }
        
        console.log("Email is unique, proceeding with user creation");
        const insertQuery = 'INSERT INTO users (name, email, password, phoneNumber) VALUES (?, ?, ?, ?)';
        
        console.log("Executing SQL:", insertQuery);
        console.log("With values:", user.name, user.email, "[PASSWORD]", user.phoneNumber);
        
        const results = await db.executeSql(
            insertQuery, 
            [user.name, user.email, user.password, user.phoneNumber]
        );
        
        if (results && results.length > 0) {
            const rowsAffected = results[0].rowsAffected;
            console.log(`User creation result - rows affected: ${rowsAffected}`);
            return rowsAffected > 0;
        } else {
            console.error("User creation failed: No results returned");
            return false;
        }
    } catch (error) {
        console.error("Error creating user:", error);
        
        // Try to provide more specific error information
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
        
        return false;
    }
}

export const validateUser = async (db: SQLiteDatabase, email: string, password: string): Promise<User | null> => {
    try {
        console.log(`Attempting to validate user: ${email}`);
        const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
        const results = await db.executeSql(query, [email, password]);
        
        if (results && results.length > 0 && results[0].rows.length > 0) {
            console.log("User validation successful");
            return results[0].rows.item(0);
        }
        console.log("User validation failed: Invalid credentials");
        return null;
    } catch (error) {
        console.error("Error validating user:", error);
        return null;
    }
}