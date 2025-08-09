# 🔔 Notificações Discord - Playwright Tests

Este documento explica como configurar e usar as notificações Discord para os testes Playwright.

## 🚀 Configuração Inicial

### 1. Configurar Webhook do Discord

1. Acesse seu servidor Discord
2. Vá no canal desejado → **Configurações** → **Integrações** → **Webhooks**
3. Clique em **Criar Webhook**
4. Defina um nome e avatar (opcional)
5. **Copie a URL do Webhook**

### 2. Configurar no GitHub

1. Vá em **Settings** → **Secrets and variables** → **Actions**
2. Clique em **New repository secret**
3. Nome: `DISCORD_WEBHOOK`
4. Valor: Sua URL do webhook do Discord

## 📋 Como Usar

### Execução Local

```bash
# Executar testes com notificação Discord
npm run test:notify

# Ou definir a variável de ambiente
DISCORD_WEBHOOK=https://discord.com/api/webhooks/... npm run test:notify
```

### Execução na Pipeline (GitHub Actions)

As notificações são enviadas automaticamente quando:
- ✅ Push ou Pull Request nas branches `main` ou `develop`
- 🔧 Execução manual via `workflow_dispatch`

## 📊 Tipos de Notificação

### 1. 🚀 Início dos Testes
- Enviada quando os testes começam a executar
- Inclui informações da branch, commit e executor

### 2. ✅ Testes Bem-sucedidos
- Enviada quando todos os testes passam
- Mostra estatísticas detalhadas e links úteis

### 3. ❌ Testes com Falha
- Enviada quando há testes falhando
- Inclui detalhes dos erros e links para logs

## 🎨 Personalização

### Modificar Mensagens

Edite o arquivo `utils/discord-notifier.js` para personalizar:
- Cores dos embeds
- Campos exibidos
- Formato das mensagens
- Emojis utilizados

### Adicionar Campos Personalizados

```javascript
// Exemplo: Adicionar informações do ambiente
fields: [
  {
    name: '🌍 Ambiente',
    value: `**Ambiente:** ${process.env.NODE_ENV}\n**Versão:** ${process.env.APP_VERSION}`,
    inline: true
  }
]
```

## 🔧 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run test` | Executar testes sem notificação |
| `npm run test:notify` | Executar testes COM notificação Discord |
| `npm run test:ci` | Executar testes no modo CI |
| `npm run test:headed` | Executar testes com interface gráfica |
| `npm run test:debug` | Executar testes em modo debug |

## 🐛 Solução de Problemas

### Notificação não está sendo enviada

1. **Verifique a URL do webhook**
   - Certifique-se que está no formato correto
   - Teste a URL manualmente com curl

2. **Verifique permissões**
   - O webhook deve ter permissões de envio no canal
   - Verifique se o bot não foi removido

3. **Verifique logs**
   ```bash
   # Executar com debug
   DEBUG=true npm run test:notify
   ```

### Webhook inválido ou expirado

```bash
# Teste manual do webhook
curl -H "Content-Type: application/json" \
-X POST \
-d '{"content":"Teste de webhook!"}' \
"https://discord.com/api/webhooks/..."
```

### Campos não aparecem corretamente

- Verifique se o arquivo `test-results/results.json` está sendo gerado
- Confirme as configurações do reporter no `playwright.config.ts`

## 📁 Estrutura de Arquivos

```
├── utils/
│   └── discord-notifier.js          # Classe principal de notificação
├── scripts/
│   └── run-tests-with-notification.js # Script de execução com notificação
├── .github/workflows/
│   └── playwright-tests.yml         # Pipeline do GitHub Actions
├── test-results/
│   └── results.json                 # Resultados dos testes (gerado automaticamente)
└── .env.example                     # Exemplo de variáveis de ambiente
```

## 🎯 Exemplos de Notificação

### Sucesso ✅
```
🧪 Testes Playwright ✅ PASSOU
🎉 Execução concluída com sucesso!

📊 Resumo dos Testes    ⏱️ Informações da Execução
Total: 15               Duração: 2m 30s
✅ Passou: 15           Branch: main
⏭️ Pulado: 0            Commit: a1b2c3d

🔗 Links Úteis
📋 Ver Logs | 📂 Repositório | 📊 Artefatos

🤖 Automação QA - Playwright • hoje às 14:30
```

### Falha ❌
```
🧪 Testes Playwright ❌ FALHOU
🚨 Execução falhou! Verifique os logs para mais detalhes.

📊 Resumo dos Testes    ⏱️ Informações da Execução
Total: 15               Duração: 1m 45s
✅ Passou: 12           Branch: main
❌ Falhou: 3            Commit: a1b2c3d
⏭️ Pulado: 0            

💥 Testes que Falharam
• Login Tests > should login with valid credentials
• Dashboard Tests > should load user data
• Profile Tests > should update user profile

🔗 Links Úteis
🚨 Ver Logs de Erro | 📂 Repositório | 📊 Artefatos

🤖 Automação QA - Playwright • hoje às 14:30
```

## 🔒 Segurança

- ⚠️ **Nunca commite a URL do webhook no código**
- ✅ Use sempre secrets do GitHub ou variáveis de ambiente
- 🔄 Regenere o webhook se ele for exposto acidentalmente
- 👥 Limite as permissões do webhook apenas ao necessário

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs da pipeline no GitHub Actions
2. Consulte a [documentação oficial do Playwright](https://playwright.dev/)
3. Abra uma issue no repositório
