const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'pradyu2916',
    database: process.env.DB_NAME || 'prado_db'
});

connection.connect((err) => {
    if (err) {
        console.error('❌ DB Connection Error: ' + err.stack);
        return;
    }
    console.log('✅ MySQL Connected');
});

module.exports = connection;