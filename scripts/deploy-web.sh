#!/usr/bin/env bash
set -euo pipefail

PROFILE="${AWS_PROFILE:-acherry125}"
BUCKET="alexandercherry.com"
BACKEND="s3://alex-cherry-pulumi-backend?region=us-east-1"
INFRA_DIR="$(dirname "$0")/../projects/infra"
WEB_DIR="$(dirname "$0")/../projects/web"

PASSPHRASE_FILE="$(dirname "$0")/../.pulumi-passphrase"
if [[ ! -f "$PASSPHRASE_FILE" ]]; then
  echo "✗ Missing .pulumi-passphrase file at repo root"
  exit 1
fi
export PULUMI_CONFIG_PASSPHRASE
PULUMI_CONFIG_PASSPHRASE=$(cat "$PASSPHRASE_FILE")

echo "→ Exporting AWS credentials for profile: $PROFILE"
eval "$(aws configure export-credentials --profile "$PROFILE" --format env)"
export AWS_REGION=us-east-1
pulumi login "$BACKEND"

echo "→ Fetching CloudFront distribution ID from Pulumi stack"
DISTRIBUTION_ID=$(cd "$INFRA_DIR" && pulumi stack output distributionId)

echo "→ Building Astro site"
cd "$WEB_DIR"
yarn build

echo "→ Syncing to S3 (s3://$BUCKET)"
aws s3 sync dist/ "s3://$BUCKET" \
  --profile "$PROFILE" \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "*.html" \
  --exclude ".DS_Store"

# HTML should not be cached aggressively
aws s3 sync dist/ "s3://$BUCKET" \
  --profile "$PROFILE" \
  --delete \
  --cache-control "public, max-age=0, must-revalidate" \
  --exclude "*" \
  --include "*.html"

echo "→ Invalidating CloudFront distribution $DISTRIBUTION_ID"
aws cloudfront create-invalidation \
  --profile "$PROFILE" \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*" \
  --output json | python3 -c "import sys,json; i=json.load(sys.stdin)['Invalidation']; print(f'  Invalidation {i[\"Id\"]} status: {i[\"Status\"]}')"

echo "✓ Deploy complete"
