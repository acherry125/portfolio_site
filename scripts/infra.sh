#!/usr/bin/env bash
set -euo pipefail

COMMAND="${1:-preview}"
PROFILE="${AWS_PROFILE:-acherry125}"
BACKEND="s3://alex-cherry-pulumi-backend?region=us-east-1"

echo "→ Exporting AWS credentials for profile: $PROFILE"
eval "$(aws configure export-credentials --profile "$PROFILE" --format env)"
export AWS_REGION=us-east-1

echo "→ Logging into Pulumi backend"
pulumi login "$BACKEND"

cd "$(dirname "$0")/../projects/infra"

case "$COMMAND" in
  preview)
    npx tsc && pulumi preview
    ;;
  deploy)
    npx tsc && pulumi up
    ;;
  *)
    echo "Usage: infra.sh [preview|deploy]"
    exit 1
    ;;
esac
