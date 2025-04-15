#!/bin/sh

set -e

echo "📦 Installing dependencies..."
npm install

if [ "$DEBUG" = "false" ]; then
    echo "🚀 Building for production..."
    npm run build
    echo "🌐 Starting Nuxt in production mode..."
    exec npm run start
else
    echo "🛠️ Starting Nuxt in development mode..."
    exec npm run dev -- --host 0.0.0.0
fi