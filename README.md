# 🎭 Projeto de Automação de Testes End-to-End com Playwright

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
│   ├── pages/                  # Page Objects
│   └── specs/                  # Arquivos de teste
├── playwright.config.ts        # Configuração do Playwright
├── .github/workflows/          # GitHub Actions
│   └── playwright.yml          # Workflow CI/CD
└── README.md                   # Documentação do projeto
```
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
| `npx playwright test` | Execução em modo headless (padrão) |
| `npx playwright test --headed` | Execução visual (acompanhar no navegador) |
| `npx playwright test --ui` | Interface gráfica interativa |
| `npx playwright test --project=chromium` | Executar apenas no Chromium |
| `npx playwright test --project=firefox` | Executar apenas no Firefox |

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
