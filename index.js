import express from "express";
import mercadopago from "mercadopago";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Configuração com variável de ambiente (NÃO colocar token direto aqui)
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN
});

// Rota para criar pagamento
app.post("/create-payment", async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: "Acesso ao Produto Digital",
          quantity: 1,
          currency_id: "BRL",
          unit_price: 50.00
        }
      ],
      back_urls: {
        success: "https://SEUUSUARIO.github.io/sucesso.html",
        failure: "https://SEUUSUARIO.github.io/falha.html",
        pending: "https://SEUUSUARIO.github.io/pendente.html"
      },
      auto_return: "approved",
      notification_url: "https://SEU-BACKEND.onrender.com/webhook"
    };

    const response = await mercadopago.preferences.create(preference);

    res.json({
      id: response.body.id,
      init_point: response.body.init_point
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Webhook
app.post("/webhook", async (req, res) => {
  console.log("Webhook recebido:", req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
