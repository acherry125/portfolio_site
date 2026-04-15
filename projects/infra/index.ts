import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// S3 bucket for alexandercherry.com static site hosting
const siteBucket = new aws.s3.Bucket(
  "site-bucket",
  {
    bucket: "alexandercherry.com",
    website: {
      indexDocument: "index.html",
    },
  },
  {
    import: "alexandercherry.com",
    ignoreChanges: ["grants", "acl"],
  }
);

// CloudFront distribution serving alexandercherry.com
const distribution = new aws.cloudfront.Distribution(
  "site-distribution",
  {
    enabled: true,
    aliases: ["alexandercherry.com", "www.alexandercherry.com"],
    httpVersion: "http2",
    isIpv6Enabled: true,
    priceClass: "PriceClass_100",
    origins: [
      {
        originId: "alexandercherry.com.s3-website-us-east-1.amazonaws.com",
        domainName: "alexandercherry.com.s3-website-us-east-1.amazonaws.com",
        customOriginConfig: {
          httpPort: 80,
          httpsPort: 443,
          originProtocolPolicy: "http-only",
          originSslProtocols: ["TLSv1", "TLSv1.1", "TLSv1.2"],
          originReadTimeout: 30,
          originKeepaliveTimeout: 5,
        },
      },
    ],
    defaultCacheBehavior: {
      targetOriginId: "alexandercherry.com.s3-website-us-east-1.amazonaws.com",
      viewerProtocolPolicy: "redirect-to-https",
      allowedMethods: ["HEAD", "GET"],
      cachedMethods: ["HEAD", "GET"],
      compress: true,
      cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
    },
    restrictions: {
      geoRestriction: {
        restrictionType: "none",
      },
    },
    viewerCertificate: {
      acmCertificateArn:
        "arn:aws:acm:us-east-1:129772851647:certificate/68fdf8b3-c95e-447a-b5f9-779d18e1fd2a",
      sslSupportMethod: "sni-only",
      minimumProtocolVersion: "TLSv1.2_2021",
    },
  },
  {
    import: "ECL9SS3UCVNGI",
    ignoreChanges: ["defaultCacheBehavior.forwardedValues"],
  }
);

export const bucketName = siteBucket.id;
export const bucketArn = siteBucket.arn;
export const websiteEndpoint = siteBucket.websiteEndpoint;
export const distributionId = distribution.id;
export const distributionDomain = distribution.domainName;
