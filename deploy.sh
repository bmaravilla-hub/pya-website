#!/bin/bash

# Configuration
BUCKET_NAME="platform-kerbrum/pya-website"
REGION="us-east-1"

echo "🚀 Starting deployment to S3: $BUCKET_NAME"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null
then
    echo "❌ Error: aws-cli is not installed. Please install it to deploy."
    exit 1
fi

# Sync files
# We exclude node_modules, .git, and other non-frontend files
echo "📦 Syncing files..."
aws s3 sync . s3://$BUCKET_NAME \
    --delete \
    --exclude "node_modules/*" \
    --exclude ".git/*" \
    --exclude ".serverless/*" \
    --exclude "package.json" \
    --exclude "package-lock.json" \
    --exclude "serverless.yml" \
    --exclude ".env*" \
    --exclude "server.js" \
    --exclude "deploy.sh" \
    --region $REGION

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
else
    echo "❌ Deployment failed."
    exit 1
fi
