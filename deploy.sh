#!/bin/bash

# EnerPrice API Documentation - Quick Deploy Script
# This script helps you quickly deploy to different platforms

echo "🚀 EnerPrice API Documentation Deployment Script"
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
cd frontend
npm install

echo "🏗️ Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo "✅ Build completed successfully!"

echo ""
echo "Choose your deployment platform:"
echo "1) GitHub Pages"
echo "2) Netlify (drag & drop)"
echo "3) Vercel CLI"
echo "4) Firebase Hosting"
echo "5) Just build (manual deployment)"

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo "🐙 GitHub Pages is deployed by CI, not from here."
        echo ""
        echo "Pushing to main runs .github/workflows/pages.yml, which builds"
        echo "frontend/ and publishes it to https://docs.enerpricedata.com/"
        echo "via actions/deploy-pages."
        echo ""
        echo "To release: merge to main and watch the run:"
        echo "   gh run watch \$(gh run list --workflow=pages.yml -L1 --json databaseId --jq '.[0].databaseId')"
        echo ""
        echo "Deploying by hand would publish a build CI does not know about."
        ;;
        
    2)
        echo "🌐 Preparing for Netlify deployment..."
        echo "📁 Build folder is ready at: ./build"
        echo ""
        echo "Next steps:"
        echo "1. Go to https://netlify.com"
        echo "2. Drag and drop the 'build' folder"
        echo "3. Or connect your Git repository for automatic deploys"
        echo ""
        echo "✅ Build ready for Netlify!"
        ;;
        
    3)
        echo "▲ Deploying to Vercel..."
        
        # Check if Vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            echo "📦 Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        echo "🚀 Deploying..."
        vercel --prod
        
        if [ $? -eq 0 ]; then
            echo "✅ Deployed successfully to Vercel!"
        else
            echo "❌ Deployment failed. Check the errors above."
        fi
        ;;
        
    4)
        echo "🔥 Deploying to Firebase Hosting..."
        
        # Check if Firebase CLI is installed
        if ! command -v firebase &> /dev/null; then
            echo "📦 Installing Firebase CLI..."
            npm install -g firebase-tools
        fi
        
        # Check if Firebase is initialized
        if [ ! -f "../firebase.json" ]; then
            echo "🔧 Firebase not initialized. Please run:"
            echo "   firebase login"
            echo "   firebase init hosting"
            echo ""
            echo "Then run this script again."
            exit 1
        fi
        
        echo "🚀 Deploying..."
        firebase deploy
        
        if [ $? -eq 0 ]; then
            echo "✅ Deployed successfully to Firebase!"
        else
            echo "❌ Deployment failed. Check the errors above."
        fi
        ;;
        
    5)
        echo "📁 Build completed!"
        echo "📍 Build files are located at: ./build"
        echo ""
        echo "You can now manually deploy these files to:"
        echo "• Any static hosting service"
        echo "• Your own web server"
        echo "• AWS S3"
        echo "• Google Cloud Storage"
        echo ""
        echo "✅ Ready for manual deployment!"
        ;;
        
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo "📖 For detailed instructions, see DEPLOYMENT_GUIDE.md"