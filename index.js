const express = require("express");
const cors = require("cors");
const mercadopago = require("mercadopago");

const app = express();
app.use(express.json());
app.use(cors());

// Configura o Mercado Pago com seu token
mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN);

app.post("/create-payment", async (req, res) => {
  try {
    let preference = {
      items: [
        {
          title: "Acesso ao Produto Digital",
          quantity: 1,
          currency_id: "BRL",
          unit_price: 50.0,
        },
      ],
      back_urls: {
        success: "https://SEUUSUARIO.github.io/sucesso.html",
        failure: "https://SEUUSUARIO.github.io/falha.html",
        pending: "https://SEUUSUARIO.github.io/pendente.html",
      },
      auto_return: "approved",
      notification_url: "https://SEU-BACKEND.onrender.com/webhook",
    };

    const response = await mercadopago.preferences.create(preference);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/webhook", (req, res) => {
  console.log("Webhook recebido:", req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
