const pool = require("../../config/database")


module.exports = {
    createFavorites: (data, callBack) => {
        pool.query(
            `INSERT INTO user_favorites (userId, cryptoSymbols) VALUES (?, ?)`,
            [
                data.userId,
                data.crypto_symbols,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getFavorites: (userId, callBack) => {
        pool.query(
            `select userId, cryptoSymbols from user_favorites where userId = ?`,
            [userId],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateFavorites: (data, callBack) => {
        pool.query(
            `update user_favorites set cryptoSymbols=? where userId = ? `,
            [
                data.crypto_symbols,
                data.userId,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log(results);
                return callBack(null, results);
            }
        );
    },

    deleteFavorites: (userId, callBack) => {
        pool.query(
            `delete from user_favorites where userId = ?`,
            [userId],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
}




