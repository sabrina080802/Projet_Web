const db = require('../mysql/db');

module.exports = class Cards {
    static async getCard(user, card) {
        const [row] = await db.execute('SELECT * FROM user_card WHERE `user` = ? AND id = ?', [user, card]);
        return row[0];
    }
    static deleteCard(card) {
        db.query('DELETE FROM user_card WHERE id = ?', [card.id]);
    }
    static async getCards(user) {
        const [row] = await db.execute('SELECT * FROM user_card WHERE `user` = ?', [user]);
        return row;
    }

    static async createCard(user, cardInfos) {
        let number = cardInfos.number.substr(cardInfos.number.length - 4, 4);
        for (let i = 0; i < 12; i++)
            number = 'X' + number;

        cardInfos.number = number;

        const data = [user, cardInfos.owner, cardInfos.number, cardInfos.cvc, cardInfos.expire];
        const result = await db.execute('INSERT INTO user_card (`user`, card_owner, card_number, cvc, expire_date) VALUES(?, ?, ?, ?, ?)', data);
        cardInfos.id = result.insertId;

        return cardInfos;
    }

    static isValidNumber(cardNumber) {
        return cardNumber.length == 16 && !isNaN(parseInt(cardNumber));
    }
    static isValidCVC(cvc) {
        return cvc.length == 3 && !isNaN(parseInt(cvc));
    }
}