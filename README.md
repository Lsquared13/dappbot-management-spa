# Dapperator: Deploy
This SPA lets users create new dapps via Dapperator.  At present, it's just a pretty, validated form for the create endpoint.  It will later include Cognito auth, Stripe payment, and existing Dapp management.  

The base is [create-react-app](https://github.com/facebook/create-react-app), giving us all the conveniences that comes with:

```
// RUN & DEVELOP
npm run start
```

```
// BUILD & DEPLOY to S3
npm run build
aws sync build/ s3://[your-bucket] --profile [your-profile]
```

## Infrastructure Configuration
The Dapp.Bot landing page is a static website which is stored in S3, delivered by Cloudfront, and aliased by Route 53.

### Prerequisites
Prior to setting this up, make sure that you have an SSL certificate configured to verify your intended deployment domain.  For instance, if you are deploying to `test.dapp.bot`, then you need an cert for `test.dapp.bot` or `*.dapp.bot`.  Note that wildcard certificates do not allow for additional subdomain nesting: `*.dapp.bot` will cover `other-test.dapp.bot`, but not `other.test.dapp.bot`.

### S3 Bucket
Your S3 bucket needs to be configured to host a public website.  Once you have created it in the console:
1. Disable all four permission checks
2. Go to the Bucket Policy section and set it to:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::[YOUR-BUCKET-NAME]/*"
        }
    ]
}
```

### Cloudfront Distro

### Route 53 Record

## Related Documents
- [**Scaling Analysis**](https://github.com/Eximchain/eximchain-notes/blob/master/dapperator/scaling.md)