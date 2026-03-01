==> Baixando cache... 
Menu
==> Clonando de https://github.com/hemricciinstintosuperior-rcci/backend-mercadopago 
==> Verificando o commit 4d9375d61fff2fb5287e9164683f8e8fbda6807b no branch principal 
==> Download concluído em 3 segundos (58 MB). Extração concluída em 2 segundos. 
==> Usando a versão 22.22.0 do Node.js (padrão) 
==> Documentação sobre como especificar uma versão do Node.js: https://render.com/docs/node-version 
==> Executando o comando de compilação 'npm install'... 
Atualizado, 77 pacotes auditados em 759ms
Dezesseis projetos estão buscando financiamento.
  Execute `npm fund` para obter detalhes.
Nenhuma vulnerabilidade encontrada.
==> Enviando build... 
==> Enviado em 3,8s. A compressão levou 1,5s. 
==> Construa com sucesso 🎉 
==> Implantando...
==> Definindo WEB_CONCURRENCY=1 por padrão, com base nas CPUs disponíveis na instância.
==> Executando 'npm start' 
> backend-mercadopago@1.0.0 iniciar
> node index.js
file:///opt/render/project/src/index.js:11
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);
                           ^
TypeError: Não é possível ler as propriedades de undefined (leitura de 'setAccessToken')
    em file:///opt/render/project/src/index.js:11:28
    em ModuleJob.run (node:internal/modules/esm/module_job:343:25)
    em async onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:665:26)
    em async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)
Node.js v22.22.0
==> Saída com status 1
==> Métodos comuns para solucionar problemas de implantação: https://render.com/docs/troubleshooting-deploys
