@echo off
echo 🚀 Ultra Systems - Docker Setup
echo ================================
echo.

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker não está rodando!
    echo Inicie o Docker Desktop e tente novamente.
    pause
    exit /b 1
)

echo ✅ Docker está rodando
echo.

REM Stop existing containers
echo 🛑 Parando containers existentes...
docker-compose down

REM Build and start containers
echo 🔨 Construindo e iniciando containers...
docker-compose up -d --build

REM Wait for services
echo ⏳ Aguardando serviços iniciarem...
timeout /t 10 /nobreak >nul

REM Check status
echo.
echo 📊 Status dos Serviços:
docker-compose ps

echo.
echo ✅ Setup completo!
echo.
echo 🌐 Acesse:
echo   - Frontend: http://localhost:3000
echo   - API: http://localhost:3001
echo   - Mongo Express: http://localhost:8081 (admin/ultra2024)
echo.
echo 📝 Comandos úteis:
echo   docker-compose logs -f       # Ver logs
echo   docker-compose down          # Parar tudo
echo   docker-compose restart api   # Reiniciar API
echo.
pause
