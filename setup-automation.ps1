# Ultra Systems - Setup de Automação Completa
# Execução: .\setup-automation.ps1

Write-Host "🚀 Ultra Systems - Configuração de Automação" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Gray

# 1. Instalar PM2 (Process Manager)
Write-Host "`n📦 [1/6] Instalando PM2..." -ForegroundColor Yellow
try {
    npm install -g pm2
    Write-Host "✅ PM2 instalado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao instalar PM2: $_" -ForegroundColor Red
}

# 2. Instalar Nodemon
Write-Host "`n🔄 [2/6] Instalando Nodemon..." -ForegroundColor Yellow
try {
    npm install -g nodemon
    Write-Host "✅ Nodemon instalado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao instalar Nodemon: $_" -ForegroundColor Red
}

# 3. Instalar dependências do backend
Write-Host "`n📚 [3/6] Instalando dependências do backend..." -ForegroundColor Yellow
Set-Location -Path "$PSScriptRoot\api"
try {
    npm install xlsx pdfkit node-cron winston joi
    Write-Host "✅ Dependências instaladas com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao instalar dependências: $_" -ForegroundColor Red
}

# 4. Criar agent autônomo
Write-Host "`n🤖 [4/6] Criando agent autônomo..." -ForegroundColor Yellow

$agentCode = @'
const cron = require('node-cron');
const winston = require('winston');

// Configurar logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'agent-error.log', level: 'error' }),
    new winston.transports.File({ filename: 'agent.log' }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

class AutonomousAgent {
  constructor() {
    this.name = 'Ultra Agent';
    logger.info(`${this.name} inicializado`);
  }

  // Backup automático (todo dia às 2h)
  scheduleBackup() {
    cron.schedule('0 2 * * *', () => {
      logger.info('🔄 Executando backup automático...');
      // TODO: Implementar lógica de backup do MongoDB
    });
  }

  // Limpeza de logs (domingo às 3h)
  scheduleCleanup() {
    cron.schedule('0 3 * * 0', () => {
      logger.info('🧹 Limpando logs antigos...');
      // TODO: Implementar limpeza de logs
    });
  }

  // Health check (a cada 15 minutos)
  scheduleHealthCheck() {
    cron.schedule('*/15 * * * *', async () => {
      try {
        // Verificar se a API está respondendo
        const response = await fetch('http://localhost:3001/health');
        if (response.ok) {
          logger.info('🏥 Sistema saudável');
        } else {
          logger.error('❌ API não está respondendo corretamente');
        }
      } catch (error) {
        logger.error(`❌ Erro no health check: ${error.message}`);
      }
    });
  }

  start() {
    logger.info(`🤖 ${this.name} iniciado com sucesso!`);
    logger.info('📅 Tarefas agendadas:');
    logger.info('  - Backup: Diariamente às 2h');
    logger.info('  - Limpeza: Domingos às 3h');
    logger.info('  - Health Check: A cada 15 minutos');
    
    this.scheduleBackup();
    this.scheduleCleanup();
    this.scheduleHealthCheck();
  }
}

const agent = new AutonomousAgent();
agent.start();

// Manter processo vivo
setInterval(() => {}, 1000);
'@

Set-Content -Path "autonomous-agent.js" -Value $agentCode
Write-Host "✅ Agent criado: autonomous-agent.js" -ForegroundColor Green

# 5. Criar script de início
Write-Host "`n📝 [5/6] Criando scripts de controle..." -ForegroundColor Yellow

$startScript = @'
@echo off
echo Iniciando Ultra Agent...
pm2 start autonomous-agent.js --name ultra-agent
pm2 save
pm2 startup
echo Agent iniciado! Use 'pm2 monit' para monitorar.
pause
'@

Set-Content -Path "start-agent.bat" -Value $startScript

$stopScript = @'
@echo off
echo Parando Ultra Agent...
pm2 stop ultra-agent
echo Agent parado!
pause
'@

Set-Content -Path "stop-agent.bat" -Value $stopScript

Write-Host "✅ Scripts criados: start-agent.bat, stop-agent.bat" -ForegroundColor Green

# 6. Finalizar
Write-Host "`n✅ [6/6] Configuração completa!" -ForegroundColor Green
Write-Host "`n" + "=" * 60 -ForegroundColor Gray
Write-Host "📋 Próximos Passos:" -ForegroundColor Cyan
Write-Host "   1. Execute 'start-agent.bat' para iniciar o agent" -ForegroundColor White
Write-Host "   2. Use 'pm2 monit' para monitorar" -ForegroundColor White
Write-Host "   3. Use 'pm2 logs ultra-agent' para ver logs" -ForegroundColor White
Write-Host "=" * 60 -ForegroundColor Gray

Set-Location -Path $PSScriptRoot
