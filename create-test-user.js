const bcrypt = require('bcryptjs');
const { getDB } = require('./database-sqlite');

// Test user credentials
const testUser = {
    firstname: 'Test',
    lastname: 'User',
    email: 'test@example.com',
    password: 'password123'
};

async function createTestUser() {
    try {
        // Initialize database
        const db = getDB();
        
        // Check if user already exists
        const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(testUser.email);
        if (existingUser) {
            console.log('Test user already exists:');
            console.log(`Email: ${existingUser.email}`);
            console.log(`Password: ${testUser.password}`);
            return;
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        
        // Create user
        const result = db.prepare('INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)').run(
            testUser.firstname,
            testUser.lastname,
            testUser.email,
            hashedPassword
        );
        
        console.log('Test user created successfully!');
        console.log(`Email: ${testUser.email}`);
        console.log(`Password: ${testUser.password}`);
        console.log(`User ID: ${result.lastInsertRowid}`);
        
    } catch (error) {
        console.error('Error creating test user:', error);
    }
}

createTestUser().then(() => {
    console.log('Finished creating test user');
    process.exit(0);
});