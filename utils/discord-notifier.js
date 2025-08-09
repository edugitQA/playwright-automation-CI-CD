/**
 * Discord Notifier para resultados dos testes Playwright
 * @author edugitQA
 * @description Envia notificações para Discord via webhook sobre resultados de testes
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

class DiscordNotifier {
  constructor(webhookUrl) {
    this.webhookUrl = webhookUrl;
  }

  /**
   * Envia notificação dos resultados dos testes para o Discord
   * @param {Object} results - Resultados dos testes
   */
  async sendTestResults(results) {
    const color = results.failed > 0 ? 15158332 : 3066993; // Vermelho ou Verde
    const status = results.failed > 0 ? '❌ FALHOU' : '✅ PASSOU';
    const emoji = results.failed > 0 ? '🚨' : '🎉';

    const embed = {
      embeds: [{
        title: `🧪 Testes Playwright ${status}`,
        description: `${emoji} **Execução ${results.failed > 0 ? 'falhou' : 'concluída com sucesso'}!**`,
        color: color,
        fields: [
          {
            name: '📊 Resumo dos Testes',
            value: `**Total:** ${results.total}\n**✅ Passou:** ${results.passed}\n**❌ Falhou:** ${results.failed}\n**⏭️ Pulado:** ${results.skipped || 0}`,
            inline: true
          },
          {
            name: '⏱️ Informações da Execução',
            value: `**Duração:** ${results.duration}\n**Branch:** ${results.branch}\n**Commit:** \`${results.commit.substring(0, 7)}\``,
            inline: true
          },
          {
            name: '🔗 Links Úteis',
            value: results.reportUrl ? `[📋 Ver Relatório](${results.reportUrl})\n[📂 Repositório](https://github.com/edugitQA/playwright-automation-CI-CD)` : '[📂 Repositório](https://github.com/edugitQA/playwright-automation-CI-CD)',
            inline: false
          }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: '🤖 Automação - Playwright',
          icon_url: 'https://playwright.dev/img/playwright-logo.svg'
        },
        author: {
          name: 'Playwright Test Runner',
          icon_url: 'https://playwright.dev/img/playwright-logo.svg'
        }
      }]
    };

    // Adicionar campo com detalhes dos testes que falharam, se houver
    if (results.failed > 0 && results.failedTests) {
      embed.embeds[0].fields.push({
        name: '💥 Testes que Falharam',
        value: results.failedTests.slice(0, 5).map(test => `• ${test}`).join('\n') + 
               (results.failedTests.length > 5 ? `\n... e mais ${results.failedTests.length - 5} testes` : ''),
        inline: false
      });
    }

    return this.sendWebhook(embed);
  }

  /**
   * Envia webhook para Discord
   * @param {Object} payload - Payload do webhook
   */
  async sendWebhook(payload) {
    return new Promise((resolve, reject) => {
      const url = new URL(this.webhookUrl);
      const data = JSON.stringify(payload);

      const options = {
        hostname: url.hostname,
        port: 443,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data),
          'User-Agent': 'Playwright-Discord-Notifier/1.0.0'
        }
      };

      const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log('✅ Notificação Discord enviada com sucesso!');
            resolve({ success: true, status: res.statusCode });
          } else {
            console.error(`❌ Erro ao enviar notificação Discord: ${res.statusCode}`);
            console.error('Response:', responseData);
            reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
          }
        });
      });

      req.on('error', (error) => {
        console.error('❌ Falha na notificação Discord:', error.message);
        reject(error);
      });

      req.write(data);
      req.end();
    });
  }

  /**
   * Envia notificação simples de início de testes
   */
  async sendTestStartNotification(branch = 'unknown', commit = 'unknown') {
    const embed = {
      embeds: [{
        title: '🚀 Iniciando Testes Playwright',
        description: '⏳ **Execução de testes iniciada...**',
        color: 3447003, // Azul
        fields: [
          {
            name: '📋 Informações',
            value: `**Branch:** ${branch}\n**Commit:** \`${commit.substring(0, 7)}\`\n**Horário:** ${new Date().toLocaleString('pt-BR')}`,
            inline: false
          }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: '🤖 Automação QA - Playwright'
        }
      }]
    };

    return this.sendWebhook(embed);
  }
}

module.exports = { DiscordNotifier };
