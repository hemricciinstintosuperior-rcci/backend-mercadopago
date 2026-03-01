==> Clonando de https://github.com/hemricciinstintosuperior-rcci/backend-mercadopago 
==> Verificando o commit ed56973fe8e6c723d3129f014039b9cd8b4a772d no branch principal 
==> Usando a versão 22.22.0 do Node.js (padrão) 
==> Documentação sobre como especificar uma versão do Node.js: https://render.com/docs/node-version 
Menu
==> Executando o comando de compilação 'npm install'... 
Adicionamos 76 pacotes e auditamos 77 pacotes em 5 segundos.
17 projetos estão buscando financiamento.
  Execute `npm fund` para obter detalhes.
Nenhuma vulnerabilidade encontrada.
==> Enviando build... 
==> Enviado em 3,3s. A compressão levou 1,7s 
==> Construa com sucesso 🎉 
==> Implantando...
==> Definindo WEB_CONCURRENCY=1 por padrão, com base nas CPUs disponíveis na instância.
==> Executando 'npm start' 
==> Nenhuma porta aberta detectada, continuando a varredura...
==> Documentação sobre como especificar uma porta: https://render.com/docs/web-services#port-binding
> backend-mercadopago@1.0.0 iniciar
> node index.js
file:///opt/render/project/src/index.js:10
mercadopago.configure({
            ^
TypeError: mercadopago.configure não é uma função
    em file:///opt/render/project/src/index.js:10:13
    em ModuleJob.run (node:internal/modules/esm/module_job:343:25)
    em async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:665:26)
    em async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)
Node.js v22.22.0
==> Saída com status 1
==> Métodos comuns para solucionar problemas de implantação: https://render.com/docs/troubleshooting-deploys
