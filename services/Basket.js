const db = require('../mysql/db');

module.exports = class Basket {
    static async addProduct(user, product) {
        const data = [product.id, user];
        const [rows] = await db.execute('SELECT * FROM basket_product WHERE product = ? AND `user` = ?', data);
        if (rows.length > 0) {
            await db.execute('UPDATE basket_product SET quantity = quantity + 1 WHERE product = ? AND `user` = ?', data);
        }
        else {
            await db.execute('INSERT INTO basket_product (product, `user`, quantity) VALUES(?, ?, 1)', data);
        }

        return await Basket.getContent(user);
    }
    static async dropProduct(user, product) {
        const data = [product.id, user];
        const [rows] = await db.execute('SELECT * FROM basket_product WHERE product = ? AND `user` = ?', data);
        if (rows.length > 0) {
            if (rows[0].quantity <= 1) {
                await db.execute('DELETE FROM basket_product WHERE product = ? AND `user`= ?', data);
            }
            else {
                await db.execute('UPDATE basket_product SET quantity = quantity - 1 WHERE product = ? AND `user` = ?', data);
            }
        }

        return await Basket.getContent(user);
    }
    static async clear(user) {
        await db.execute('DELETE FROM basket_product WHERE `user`= ?', [user]);
    }
    static async getContent(user) {
        const [rows] = await db.execute(`
            SELECT product.*, basket_product.quantity FROM basket_product
                INNER JOIN product ON product.id = basket_product.product
            WHERE \`user\` = ?`, [user]);

        return rows.map(x => {
            const obj = { quantity: x.quantity };
            delete x.quantity;
            obj.product = { ...x };

            return obj
        });
    }
}