#!/bin/bash

echo "🚀 Ultra Systems - Docker Setup"
echo "================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado!"
    echo "Instale Docker Desktop: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado!"
    exit 1
fi

echo "✅ Docker e Docker Compose encontrados"
echo ""

# Stop existing containers
echo "🛑 Parando containers existentes..."
docker-compose down

# Build and start containers
echo "🔨 Construindo e iniciando containers..."
docker-compose up -d --build

# Wait for services to be ready
echo "⏳ Aguardando serviços iniciarem..."
sleep 10

# Check if services are running
echo ""
echo "📊 Status dos Serviços:"
docker-compose ps

echo ""
echo "✅ Setup completo!"
echo ""
echo "🌐 Acesse:"
echo "  - Frontend: http://localhost:3000"
echo "  - API: http://localhost:3001"
echo "  - Mongo Express: http://localhost:8081 (admin/ultra2024)"
echo ""
echo "📝 Comandos úteis:"
echo "  docker-compose logs -f       # Ver logs"
echo "  docker-compose down          # Parar tudo"
echo "  docker-compose restart api   # Reiniciar API"
echo ""
