const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors());

mercadopago.configure({
  access_token: "APP_USR-8902774665784533-092911-fab78ca802b6475923ebb446b02fee62-1160743707",
});

app.get("/", function (req, res) {
  res.send("el servidor de mercado pago funciona! :)");
});

app.post("/create_preference", (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "https://otalvaro-mp-commerce-nodejs-7fe8012e45af.herokuapp.com",
      failure: "https://otalvaro-mp-commerce-nodejs-7fe8012e45af.herokuapp.com",
      pending: "",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(8080, () => {
  console.log("the server is now running on port 8080");
});
