// index.js - Backend Mercado Pago (CommonJS)
const express = require("express");
const cors = require("cors");
const mercadopago = require("mercadopago");

const app = express();
app.use(express.json());
app.use(cors());

// Configura o Mercado Pago com o Access Token
// **Substitua pelo seu access token do Mercado Pago**
mercadopago.configurations.setAccessToken("SEU_ACCESS_TOKEN_AQUI");

// Rota para criar o pagamento
app.post("/create-payment", async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: "Acesso ao Produto Digital",
          quantity: 1,
          currency_id: "BRL",
          unit_price: 50.0, // Coloque o valor correto
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
    res.json(response); // Retorna JSON com init_point
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Rota de webhook para notificações do Mercado Pago
app.post("/webhook", (req, res) => {
  console.log("Webhook recebido:", req.body);
  res.sendStatus(200);
});

// Porta do servidor (o Render define a variável de ambiente PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
