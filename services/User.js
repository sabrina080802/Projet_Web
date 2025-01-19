const db = require('../mysql/db');
const bcrypt = require('bcryptjs');

module.exports = class User {
    static async findByUsername(email) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length == 0)
            return null;

        return rows[0];
    }
    static async createUser(firstname, lastname, username, password) {
        const hashedPwd = await bcrypt.hash(password, 10);
        return await db.query('INSERT INTO users (firstname, lastname, email, password) VALUES(?, ?, ?, ?)', [firstname, lastname, username, hashedPwd]);
    }
    static async updateUserPassword(user, newPassword) {
        const hashedPwd = await bcrypt.hash(newPassword, 10);
        const userData = await User.findByUsername(user.email);
        console.log('Setting password of ' + userData.id + ' to ' + hashedPwd);
        return await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPwd, userData.id]);
    }
    static async updateUserProfil(user) {
        return await db.query(
            `UPDATE users SET
                email = ?, phone = ?,
                firstname = ?, lastname = ?,
                address = ?, city = ?, postal_code = ?, country = ?
                    WHERE id = ?`,
            [
                user.email, user.phone,
                user.firstname, user.lastname,
                user.address, user.city, user.postal_code, user.country,
                user.id
            ]);
    }
}