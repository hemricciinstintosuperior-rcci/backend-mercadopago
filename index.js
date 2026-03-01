// index.js
import express from "express";
import mercadopago from "mercadopago";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do Mercado Pago com variável de ambiente
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

// Endpoint para criar preferência de pagamento
app.post("/create_preference", async (req, res) => {
    try {
        const { title, quantity, unit_price, payer_email } = req.body;

        const preference = {
            items: [
                {
                    title,
                    quantity,
                    unit_price,
                },
            ],
            payer: {
                email: payer_email,
            },
            back_urls: {
                success: "https://seu-site-no-github.io/?pago=true",
                failure: "https://seu-site-no-github.io/?pago=false",
                pending: "https://seu-site-no-github.io/?pago=pending",
            },
            auto_return: "approved",
        };

        const response = await mercadopago.preferences.create(preference);
        res.json({ id: response.body.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar preferência" });
    }
});

// Endpoint para testar status (opcional)
app.get("/status/:id", async (req, res) => {
    try {
        const payment = await mercadopago.payment.findById(req.params.id);
        res.json(payment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar pagamento" });
    }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
