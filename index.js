import express from 'express';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const app = express();
app.use(express.json());

// 1. Configuração do Token (O Render vai ler das Variáveis de Ambiente)
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN 
});

// 2. Rota Principal para o Render não ficar "Carregando" (Health Check)
app.get('/', (req, res) => {
  res.send('Servidor Numerologia Online 🚀');
});

// 3. Rota de Criação de Pagamento
app.post('/create_preference', async (req, res) => {
  const { id_produto, nome_produto, preco } = req.body;

  try {
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            title: nome_produto || "Relatório Numerológico",
            unit_price: Number(preco) || 47.00,
            quantity: 1,
            currency_id: 'BRL'
          }
        ],
        // CONFIGURAÇÃO DE RETORNO: Aqui é onde a mágica acontece
        back_urls: {
          success: `https://hemricciinstintosuperior-rcci.github.io/backend-mercadopago/index.html?pago=${id_produto}`,
          failure: `https://hemricciinstintosuperior-rcci.github.io/backend-mercadopago/index.html?erro=1`,
          pending: `https://hemricciinstintosuperior-rcci.github.io/backend-mercadopago/index.html?processando=1`
        },
        auto_return: "approved",
      }
    });

    // Devolve o ID da preferência para o seu site abrir o Mercado Pago
    res.json({ id: result.id });

  } catch (error) {
    console.error("Erro ao criar preferência:", error);
    res.status(500).json({ error: error.message });
  }
});

// 4. Configuração da Porta para o Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
