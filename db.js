const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'StudentDetails',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const executeQuery = async (query, params = []) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [results, fields] = await connection.execute(query, params);
        return results;
    } catch (err) {
        console.error('Database query error:', err.message);
        throw err;
    } finally {
        if (connection) connection.release();
    }
};

module.exports = { executeQuery };
