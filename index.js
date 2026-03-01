import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const app = express();
app.use(express.json());

// CONFIGURAÇÃO NOVA (Substitui o erro do setAccessToken)
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || "SEU_TOKEN_AQUI_PARA_TESTE_LOCAL" 
});

app.post('/create_preference', async (req, res) => {
  try {
    const preference = new Preference(client);
    const response = await preference.create({
      body: {
        items: [
          {
            title: req.body.description || "Produto Teste",
            unit_price: Number(req.body.price) || 10,
            quantity: Number(req.body.quantity) || 1,
          }
        ],
      }
    });
    res.json({ id: response.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar preferência' });
  }
});

// IMPORTANTE PARA O RENDER: Usar process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
