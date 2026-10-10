"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.distributionDomain = exports.distributionId = exports.websiteEndpoint = exports.bucketArn = exports.bucketName = void 0;
const aws = __importStar(require("@pulumi/aws"));
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
// S3 bucket for alexandercherry.com static site hosting
const siteBucket = new aws.s3.Bucket("site-bucket", {
    bucket: "alexandercherry.com",
    website: {
        indexDocument: "index.html",
    },
}, {
    import: "alexandercherry.com",
    ignoreChanges: ["grants", "acl"],
});
const canonicalRedirect = new aws.cloudfront.Function("canonical-redirect", {
    runtime: "cloudfront-js-2.0",
    publish: true,
    code: (0, node_fs_1.readFileSync)((0, node_path_1.join)(process.cwd(), "functions/canonical-redirect.js"), "utf8"),
});
// CloudFront distribution serving alexandercherry.com
const distribution = new aws.cloudfront.Distribution("site-distribution", {
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
        functionAssociations: [
            { eventType: "viewer-request", functionArn: canonicalRedirect.arn },
        ],
        cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
    },
    restrictions: {
        geoRestriction: {
            restrictionType: "none",
        },
    },
    viewerCertificate: {
        acmCertificateArn: "arn:aws:acm:us-east-1:129772851647:certificate/68fdf8b3-c95e-447a-b5f9-779d18e1fd2a",
        sslSupportMethod: "sni-only",
        minimumProtocolVersion: "TLSv1.2_2021",
    },
}, {
    import: "ECL9SS3UCVNGI",
    ignoreChanges: ["defaultCacheBehavior.forwardedValues"],
});
exports.bucketName = siteBucket.id;
exports.bucketArn = siteBucket.arn;
exports.websiteEndpoint = siteBucket.websiteEndpoint;
exports.distributionId = distribution.id;
exports.distributionDomain = distribution.domainName;
