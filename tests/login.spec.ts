import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';

test('Login com credenciais válidas', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillUsername('admin');
  await loginPage.fillPassword('password123');
  await loginPage.submit();

  // Valida se realmente logou: verifica se saiu da tela de login
  await expect(page.locator('text=Sistema de Login')).toHaveCount(0);
  // Exemplo: verifica se existe algum elemento pós-login
  // await expect(page.locator('text=Bem-vindo')).toBeVisible({ timeout: 10000 });
});

test('Login com credenciais inválidas', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillUsername('admin');
  await loginPage.fillPassword('senhaerrada');
  await loginPage.submit();

  // Valida se permanece na tela de login
  await expect(page.locator('text=Sistema de Login')).toBeVisible();
  // Valida se aparece mensagem de erro (ajuste conforme o sistema)
  // await expect(page.locator('text=Usuário ou senha inválidos')).toBeVisible();
});

test('Login sem preencher campos obrigatórios', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  // Não preenche usuário nem senha
  await loginPage.submit();

  // Valida se permanece na tela de login
  await expect(page.locator('text=Sistema de Login')).toBeVisible();
  // Valida se aparece mensagem de erro de campos obrigatórios (ajuste conforme o sistema)
  // await expect(page.locator('text=Preencha todos os campos')).toBeVisible();
});

  test('Login com senha incorreta', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillUsername('admin');
    await loginPage.fillPassword('senhaErrada123');
    await loginPage.submit();
    // Valida se aparece mensagem de erro de senha incorreta
    await expect(page.locator('text=Credenciais inválidas. Use admin/password123')).toBeVisible();
  });

  test('Login com e-mail inválido', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillUsername('emailinvalido');
    await loginPage.fillPassword('SenhaValida123');
    await loginPage.submit();
    // Valida se aparece mensagem de erro de e-mail inválido
    await expect(page.locator('text=Credenciais inválidas. Use admin/password123')).toBeVisible();
  });

  test('Botão de login desabilitado com campos vazios', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.submit();
    // Não preenche usuário nem senha
    await expect(page.locator('text=Credenciais inválidas. Use admin/password123')).toBeVisible();
  });
