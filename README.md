# 🎭 Automação de Testes End-to-End com Playwright

<p align="center">
  <img alt="Playwright" src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
</p>

<p align="center">
  <strong>Automação de testes de aplicações web utilizando Playwright, TypeScript e Node.js.</strong><br>
  Estrutura profissional, fácil manutenção e integração com CI/CD.
</p>

---

## 📦 Estrutura do Projeto

```
playwright-mpc/
├── tests/                      # Testes automatizados
│   ├── pageobjects/           # Page Objects (LoginPage.ts)
│   └── login.spec.ts          # Testes de login
├── utils/                     # Utilitários e helpers
│   └── discord-notifier.js    # Notificador Discord
├── scripts/                   # Scripts de automação
│   └── run-tests-with-notification.js # Executor com notificações
├── docs/                      # Documentação adicional
│   └── discord-notifications.md # Guia notificações Discord
├── .github/workflows/         # GitHub Actions
│   └── playwright-tests.yml   # Pipeline CI/CD com Discord
├── playwright.config.ts       # Configuração do Playwright
└── README.md                  # Documentação do projeto
```

## 🎯 Cenários de Teste Implementados

### 🔐 **Testes de Login** (`tests/login.spec.ts`)
- ✅ **Login com credenciais válidas**: Testa login com `admin/password123`
- ❌ **Login com credenciais inválidas**: Testa login com senha incorreta
- ⚠️ **Login sem preencher campos**: Testa validação de campos obrigatórios

**Site testado**: [front-test-automation.onrender.com](https://front-test-automation.onrender.com/)
## 🚀 Como Executar os Testes

### 📋 Pré-requisitos

- Node.js 16+ instalado
- NPM ou Yarn

### 🔧 Instalação

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd playwright-mpc
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Instale os navegadores do Playwright:**
   ```bash
   npx playwright install
   ```

### ▶️ Execução dos Testes

| Comando | Descrição |
|---------|-----------|
| `npm run test` | Execução padrão dos testes |
| `npm run test:headed` | Execução visual (acompanhar no navegador) |
| `npm run test:ui` | Interface gráfica interativa |
| `npm run test:notify` | **Execução com notificações Discord** |
| `npm run test:debug` | Execução em modo debug |

### 🔔 **Notificações Discord**

O projeto inclui integração completa com Discord para notificar sobre:
- 🚀 **Início da execução**: Quando os testes começam
- ✅ **Sucesso**: Todos os testes passaram com estatísticas detalhadas
- ❌ **Falhas**: Testes falharam com informações dos erros

**Para configurar**: Consulte o [Guia de Notificações Discord](docs/discord-notifications.md)

### 📊 Relatórios

```bash
# Gerar e abrir relatório HTML
npx playwright show-report
```

## ⚙️ Tecnologias Utilizadas

<table>
<tr>
<td align="center">
<img src="https://playwright.dev/img/playwright-logo.svg" width="50"><br>
<strong>Playwright</strong><br>
Framework de automação de testes
</td>
<td align="center">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="50"><br>
<strong>TypeScript</strong><br>
Linguagem de programação tipada
</td>
<td align="center">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width="50"><br>
<strong>Node.js</strong><br>
Ambiente de execução JavaScript
</td>
<td align="center">
<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="50"><br>
<strong>GitHub Actions</strong><br>
CI/CD integrado
</td>
</tr>
</table>

## 📚 Documentação e Recursos

| Recurso | Link |
|---------|------|
| 📖 Documentação Playwright | [playwright.dev](https://playwright.dev/docs/intro) |
| 📘 Documentação TypeScript | [typescriptlang.org](https://www.typescriptlang.org/docs/) |
| 📗 Documentação Node.js | [nodejs.org](https://nodejs.org/en/docs/) |
| 🔔 Guia Discord Notifications | [docs/discord-notifications.md](docs/discord-notifications.md) |

## ⚙️ Funcionalidades Implementadas

### 🎭 **Automação de Testes**
- ✅ Page Object Model para organização
- ✅ Testes de login com múltiplos cenários
- ✅ Captura automática de screenshots em falhas
- ✅ Gravação de vídeos quando necessário
- ✅ Relatórios HTML detalhados

### 🔔 **Sistema de Notificações**
- ✅ Notificações Discord em tempo real
- ✅ Informações detalhadas sobre execução
- ✅ Links diretos para logs e artefatos
- ✅ Diferenciação visual entre sucesso/falha
- ✅ Integração com GitHub Actions

### 🚀 **CI/CD Pipeline**
- ✅ Execução automática em push/PR
- ✅ Execução paralela para performance
- ✅ Armazenamento de artefatos (30 dias)
- ✅ Múltiplos browsers (Chromium, Firefox)
- ✅ Timeout configurável (60 minutos)

## 💡 Boas Práticas e Recomendações

- ✅ **Organização**: Mantenha os testes organizados em page objects e specs
- 🔍 **Debug**: Utilize o modo visual (`--headed`) para depuração de cenários complexos
- 🔄 **CI/CD**: Integre com pipelines de integração contínua para garantir qualidade
- 📊 **Relatórios**: Sempre verifique os relatórios HTML após a execução dos testes
- 🧪 **Testes**: Escreva testes independentes e reutilizáveis

---

<p align="center">
  <strong>🤝 Contribuições são bem-vindas!</strong><br>
  Sinta-se à vontade para abrir issues ou pull requests.
</p>
