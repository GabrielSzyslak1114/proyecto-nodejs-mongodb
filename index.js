const express = require("express");
const { create } = require("express-handlebars");
require("dotenv").config();
require("./database/db")

const app = express();


/**
 * hbs contendraa un metodo de express-handlebars "create" que configura la extension
 *  del nombre y tambien se configura la ruta de los partials de este view engine
 */
const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"]
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.static(__dirname + "/public"))

/**
 * este middleware ayuda a que se pueda leer los datos que provienen del metodo POST
 */
app.use(express.urlencoded({extended: true}));

/**
 * La ruta del home y de autenticacion se llaman pero se configuran por seperado
 */
app.use("/", require("./routes/home"))
app.use("/auth", require("./routes/auth"))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server andando 🔥"));