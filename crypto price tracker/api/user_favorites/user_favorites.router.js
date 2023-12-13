const { 
    createFavoritesCryptocurrencies,
    getFavoritesCryptocurrencies,
    updateFavoritesCryptocurrencies, 
    deleteFavoritesCryptocurrencies,
} = require("./user_favorites.controller");

//const { createFavoritesCryptocurrencies } = require("./user_favorites.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken , createFavoritesCryptocurrencies);
router.get("/:userId", checkToken , getFavoritesCryptocurrencies);
router.patch("/", checkToken ,updateFavoritesCryptocurrencies );
router.delete("/:userId", checkToken , deleteFavoritesCryptocurrencies);

module.exports = router;

