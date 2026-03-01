import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const app = express();
app.use(express.json());

// 1. Configuração Robusta
const accessToken = process.env.MP_ACCESS_TOKEN;

if (!accessToken) {
  console.warn("AVISO: Variável MP_ACCESS_TOKEN não encontrada. O sistema pode falhar.");
}

const client = new MercadoPagoConfig({ 
  accessToken: accessToken || 'TOKEN_PROVISORIO' 
});

// 2. Rota de Teste (Para você ver se está online)
app.get('/health', (req, res) => res.send('O servidor está vivo! 🚀'));

// 3. Rota de Pagamento
app.post('/create_preference', async (req, res) => {
  try {
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [{ title: 'Produto', unit_price: 10, quantity: 1 }]
      }
    });
    res.json({ id: result.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Porta que o Render EXIGE
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
