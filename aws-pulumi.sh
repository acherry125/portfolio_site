# Helper to export resolved AWS credentials for Pulumi S3 backend
# Usage: source infra/aws-pulumi.sh
# Then run: aws-pulumi

aws-pulumi() {
  if [ -z "${1:-}" ]; then
    PROFILE=acherry125
  else
    PROFILE=$1
  fi
  echo "Exporting resolved credentials for profile: $PROFILE"
  eval $(aws configure export-credentials --profile "$PROFILE" --format env)
  export AWS_REGION=${AWS_REGION:-us-east-1}
  echo "Exported AWS_ACCESS_KEY_ID (masked): ${AWS_ACCESS_KEY_ID:0:4}..."
  echo "AWS_REGION: $AWS_REGION"
}
