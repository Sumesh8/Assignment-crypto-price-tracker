const { 
    createFavorites,
    getFavorites,
    updateFavorites, 
    deleteFavorites,
} = require("./user_favorites.service");

const { genSaltSync, hashSync , compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createFavoritesCryptocurrencies: (req, res) => {
        const body = req.body;
        createFavorites(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Dublicate entry or Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getFavoritesCryptocurrencies: (req, res) => {
        const userId = req.params.userId;
        getFavorites(userId, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Invalid request or Server error"
                })
            }

            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Record not found"
                })
            };
            //console.log(cryptoPrices);
            return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },

    updateFavoritesCryptocurrencies: (req, res) => {
        const body = req.body;
        updateFavorites(body, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Invalid inpu or Sever error"
                })
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

    deleteFavoritesCryptocurrencies: (req, res) => {
        const userId = req.params.userId;
        //const data = req.body;
        deleteFavorites(userId, (err, results) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: "Invalid request or Sever error"
                });
            }
            if (!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Favourite cryptocurrrencies deleted successfully"
            });
        });
    }
}