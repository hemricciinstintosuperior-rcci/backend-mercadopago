// index.js
import express from "express";           // Para ES Modules (Node 22+)
import mercadopago from "mercadopago";

// === CONFIGURAÇÃO DO MERCADO PAGO ===
// Substitua abaixo pelo seu token de produção
mercadopago.configurations.setAccessToken("SEU_ACCESS_TOKEN_AQUI");

const app = express();
const PORT = process.env.PORT || 10000;

// === MIDDLEWARES ===
app.use(express.json());                // Para receber JSON do front-end
app.use(express.urlencoded({ extended: true })); // Para receber dados de forms

// === ROTAS ===

// Rota teste
app.get("/", (req, res) => {
  res.send("Backend Mercado Pago rodando!");
});

// Criar pagamento via preference
app.post("/create_preference", async (req, res) => {
  try {
    const { title, quantity, price, back_url } = req.body;

    const preference = {
      items: [
        {
          title: title || "Produto",
          quantity: quantity || 1,
          unit_price: Number(price) || 10,
        },
      ],
      back_urls: {
        success: back_url || "https://seusite.github.io/sucesso.html",
        pending: back_url || "https://seusite.github.io/pendente.html",
        failure: back_url || "https://seusite.github.io/falha.html",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    return res.json({ id: response.body.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar preference" });
  }
});

// Rota para verificar status do pagamento (opcional)
app.get("/status/:id", async (req, res) => {
  try {
    const payment = await mercadopago.payment.get(req.params.id);
    res.json(payment.body);
  } catch (err) {
    res.status(500).json({ error: "Erro ao consultar pagamento" });
  }
});

// === START DO SERVIDOR ===
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
