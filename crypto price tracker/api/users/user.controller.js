const { 
    create, 
    getUserByUserId, 
    getUsers, 
    updateUser, 
    deleteUser,
    getUserByUserEmail
} = require("./user.service");

const { genSaltSync, hashSync , compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error "

                });
            }
            return res.status(201).json({
                success: 1,
                message: "Creted new user",
                data: results

            });
        });
    },

    getUserByUserId: (req, res) => {
        const id = req.params.id;
        //const userId = req.userId;
        //console.log(userId);
        getUserByUserId(id, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Invalid request"
                })
            }

            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Record not found"
                })
            };
            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Invalid request"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Records not found not found"
                });
            };
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    updateUsers: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Invalid input or Server error"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Failed to update user"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Updated successfully"
            });
        });
    },

    deleteUser: (req, res) => {
        const id = req.params.id;
        //const data = req.body;
        deleteUser(id, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Invalid request"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "User Not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "User deleted successfully"
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Invalid request"
                });
            }
            if (!results){
                return res.status(404).json ({
                    success: 0,
                    data: "Invalid Email or password or Invalid input format"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                result.password = undefined;

                const jsontoken = sign({ userId: results.userId }, "This is secret key", {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    success: 1,
                    message: "Login Successfully",
                    token: jsontoken
                });
            } else {
                return res.status(404).json ({
                    success: 0,
                    data: "Invalid Email or password or Invalid input format"
                });
            }
        });
    }
}