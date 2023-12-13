const pool = require("../../config/database")

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into users(firstName, lastName, email, password) 
                values(?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }

        );
    },

    getUsers: callBack => {
        pool.query(
            'select  id, firstName, lastName, email from users',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserByUserId: (id, callBack) => {
        pool.query(
            `select id, firstName, lastName, email from users where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select * from users where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updateUser: (data, callBack) => {
        pool.query(
            `update users set firstName=?, lastName=?, email=?, password=? where id = ?`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.password,
                data.id,
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    deleteUser: (id, callBack) => {
        pool.query(
            `delete from users where id = ?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};


