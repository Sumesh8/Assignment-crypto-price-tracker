require("dotenv").config();
const express = require("express")
const app = express();
const userRouter = require("./api/users/user.router");
const userFavoritesRouter = require("./api/user_favorites/user_favorites.router");


const cryptoPairs = [
    'etheur', 'btcusdt', 'ethusdt', 'xrpusdt', 'ltcusdt',
    'adausdt', 'bnbusdt', 'dogeusdt', 'dotusdt', 'linkusdt'
];


const cryptoPricesUpdate = require("./cryptocurrencies/cryptocurrencies");

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/user_favorites", userFavoritesRouter);

setInterval(() => {
    cryptoPricesUpdate.updateCryptoPrices();
}, 300000);


app.listen(process.env.APP_PORT, () => {
    console.log("Sever up and runing on port : ", process.env.APP_PORT);
});
