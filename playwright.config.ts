import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  /* Executa arquivos de teste em paralelo */
  fullyParallel: true,

  /* Evita commit acidental de test.only */
  forbidOnly: !!process.env.CI,

  /* Reexecuta no CI em caso de falha */
  retries: process.env.CI ? 2 : 0,

  /* No CI, um worker por vez para estabilidade */
  workers: process.env.CI ? 1 : undefined,

  /**
   * Reporters configurados:
   * - HTML com pasta fixa `playwright-report`
   * - JSON com resultados em `test-results/results.json`
   * - GitHub reporter quando em Actions
   */
  reporter: process.env.GITHUB_ACTIONS
    ? [
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['json', { outputFile: 'test-results/results.json' }],
        ['github']
      ]
    : [
        ['html', { outputFolder: 'playwright-report', open: 'never' }],
        ['json', { outputFile: 'test-results/results.json' }]
      ],

  /* Configuração global de uso */
  use: {
    /* Captura trace ao menos uma vez em falha */
    trace: 'retain-on-failure',

    /* Screenshot sempre em falha */
    screenshot: 'only-on-failure',

    /* Vídeo sempre em falha */
    video: 'retain-on-failure',

    /* Timeout padrão por teste (opcional) */
    // timeout: 30 * 1000,
  },

  /* Browsers de teste */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // Você pode reativar os mobiles se necessário:
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* Se precisar rodar um servidor antes dos testes:
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  */
});
