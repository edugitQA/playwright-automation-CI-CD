import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://front-test-automation.onrender.com/', { timeout: 40000 });
  }

  async fillUsername(username: string) {
    await this.page.getByPlaceholder('Usuário').fill(username);
  }

  async fillPassword(password: string) {
    await this.page.getByPlaceholder('Senha').fill(password);
  }

  async submit() {
    await this.page.getByRole('button', { name: 'Entrar' }).click();
  }
}
