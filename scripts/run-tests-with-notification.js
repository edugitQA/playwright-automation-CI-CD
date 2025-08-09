#!/usr/bin/env node

/**
 * Script principal para executar testes Playwright com notificações Discord
 * @author edugitQA
 */

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { DiscordNotifier } = require('../utils/discord-notifier');

class PlaywrightTestRunner {
  constructor() {
    this.webhookUrl = process.env.DISCORD_WEBHOOK || 'https://discord.com/api/webhooks/1365873191263801375/s4ssIafbsG-X9Shx0imD5ZaBn6BYl_gFMXGhKtmLwi_M9OPppiRS7qZRH4q6ipzRqlI9';
    this.notifier = new DiscordNotifier(this.webhookUrl);
    this.branch = process.env.GITHUB_REF_NAME || this.getCurrentBranch();
    this.commit = process.env.GITHUB_SHA || this.getCurrentCommit();
    this.runId = process.env.GITHUB_RUN_ID;
  }

  /**
   * Obtém branch atual do git
   */
  getCurrentBranch() {
    try {
      return execSync('git branch --show-current', { encoding: 'utf-8' }).trim();
    } catch {
      return 'local';
    }
  }

  /**
   * Obtém hash do commit atual
   */
  getCurrentCommit() {
    try {
      return execSync('git rev-parse HEAD', { encoding: 'utf-8' }).trim();
    } catch {
      return 'unknown';
    }
  }

  /**
   * Processa resultados dos testes do arquivo JSON
   */
  async processTestResults() {
    const resultsPath = path.join(process.cwd(), 'test-results', 'results.json');
    
    if (!fs.existsSync(resultsPath)) {
      console.error('❌ Arquivo de resultados não encontrado:', resultsPath);
      return null;
    }

    try {
      const rawData = fs.readFileSync(resultsPath, 'utf-8');
      const results = JSON.parse(rawData);
      
      // Extrair informações dos testes que falharam
      const failedTests = [];
      if (results.suites) {
        this.extractFailedTests(results.suites, failedTests);
      }

      const summary = {
        passed: results.stats?.expected || 0,
        failed: results.stats?.unexpected || 0,
        skipped: results.stats?.skipped || 0,
        total: (results.stats?.expected || 0) + (results.stats?.unexpected || 0) + (results.stats?.skipped || 0),
        duration: this.formatDuration(results.stats?.duration || 0),
        branch: this.branch,
        commit: this.commit,
        failedTests: failedTests,
        reportUrl: this.runId ? `https://github.com/edugitQA/playwright-automation-CI-CD/actions/runs/${this.runId}` : null
      };

      return summary;
    } catch (error) {
      console.error('❌ Erro ao processar resultados:', error.message);
      return null;
    }
  }

  /**
   * Extrai recursivamente os testes que falharam
   */
  extractFailedTests(suites, failedTests, suitePath = '') {
    for (const suite of suites) {
      const currentPath = suitePath ? `${suitePath} > ${suite.title}` : suite.title;
      
      if (suite.tests) {
        for (const test of suite.tests) {
          if (test.results && test.results.some(result => result.status === 'failed')) {
            failedTests.push(`${currentPath} > ${test.title}`);
          }
        }
      }
      
      if (suite.suites) {
        this.extractFailedTests(suite.suites, failedTests, currentPath);
      }
    }
  }

  /**
   * Formata duração em ms para formato legível
   */
  formatDuration(ms) {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
  }

  /**
   * Executa os testes Playwright
   */
  async runTests() {
    const startTime = Date.now();
    
    try {
      // Notificar início dos testes
      console.log('🚀 Enviando notificação de início...');
      await this.notifier.sendTestStartNotification(this.branch, this.commit);
    } catch (error) {
      console.warn('⚠️ Falha ao enviar notificação de início:', error.message);
    }

    return new Promise((resolve) => {
      console.log('🧪 Executando testes Playwright...');
      
      const testProcess = spawn('npx', ['playwright', 'test', '--reporter=json'], {
        stdio: 'inherit',
        env: { ...process.env, CI: 'true' }
      });

      testProcess.on('close', async (code) => {
        const duration = Date.now() - startTime;
        console.log(`\n⏱️ Testes concluídos em ${this.formatDuration(duration)}`);
        
        // Processar e enviar resultados
        setTimeout(async () => {
          const results = await this.processTestResults();
          
          if (results) {
            try {
              await this.notifier.sendTestResults(results);
              console.log('✅ Notificação de resultados enviada!');
            } catch (error) {
              console.error('❌ Falha ao enviar notificação de resultados:', error.message);
            }
          }
          
          resolve(code);
        }, 1000); // Aguarda 1s para garantir que o arquivo JSON foi criado
      });

      testProcess.on('error', (error) => {
        console.error('❌ Erro ao executar testes:', error.message);
        resolve(1);
      });
    });
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const runner = new PlaywrightTestRunner();
  runner.runTests().then((exitCode) => {
    process.exit(exitCode);
  });
}

module.exports = { PlaywrightTestRunner };
