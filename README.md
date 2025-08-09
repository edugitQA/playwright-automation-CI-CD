Projeto de Automação de Testes End-to-End com Playwright

<img alt="Playwright" src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&amp;logo=playwright&amp;logoColor=white">
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&amp;logo=typescript&amp;logoColor=white">
<img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&amp;logo=node.js&amp;logoColor=white">
Automação de testes de aplicações web utilizando Playwright, TypeScript e Node.js. Estrutura profissional, fácil manutenção e integração com CI/CD.

📦 Estrutura do Projeto
tests — Testes automatizados (specs e page objects)
playwright.config.ts — Configuração do Playwright
playwright.yml — Workflow para execução dos testes no GitHub Actions
README.md — Documentação do projeto
🚀 Como Executar os Testes

### Instalação dos requisitos
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Instale os navegadores do Playwright:
   ```bash
   npx playwright install
   ```

### Execução dos testes

#### Modo headless (padrão):
```bash
npx playwright test
```

#### Modo visual (acompanhar execução):
```bash
npx playwright test --headed
```

#### Modo UI interativo:
```bash
npx playwright test --ui
```

#### Executar em navegador específico:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

⚙️ Tecnologias Utilizadas

- **Playwright**: Framework de automação de testes.
- **TypeScript**: Linguagem de programação tipada.
- **Node.js**: Ambiente de execução JavaScript.
- **GitHub Actions**: Integração contínua e entrega contínua (CI/CD).

📚 Documentação

- [Documentação Playwright](https://playwright.dev/docs/intro)
- [Documentação TypeScript](https://www.typescriptlang.org/docs/)
- [Documentação Node.js](https://nodejs.org/en/docs/)

💡 Recomendações

- Mantenha os testes organizados em page objects e specs.
- Utilize o modo visual para depuração de cenários complexos.
- Integre com pipelines CI/CD para garantir qualidade contínua.
