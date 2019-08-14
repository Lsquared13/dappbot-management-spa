# Dapperator: Deploy
This SPA lets users create new dapps via Dapperator.  At present, it's just a pretty, validated form for the create endpoint.  It will later include Cognito auth, Stripe payment, and existing Dapp management.  

The base is [create-react-app](https://github.com/facebook/create-react-app), giving us all the conveniences that comes with:

```
// RUN & DEVELOP
npm run start

// CREATE STATIC FILES
npm run build

// DEPLOY TO dappbot.eximchain-dev.com
npm run deployStaging

// DEPLOY TO dapp.bot
npm run deployProduction

```

## Infrastructure Configuration
The Dapp.Bot landing page is a static website which is stored in S3, delivered by Cloudfront, and aliased by Route 53.

### Prerequisites

> This section used to cover setting up the underlying Cognito User Pool that this client depends now.  The [`dappbot-api-lambda`](https://github.com/Eximchain/dappbot-api-lambda) now fully contains all of the Cognito logic within the `auth` method, so that content is no longer necessary.

#### ACM Certificate
Prior to setting this up, make sure that you have an SSL certificate configured to verify your intended deployment domain.  For instance, if you are deploying to `test.dapp.bot`, then you need an cert for `test.dapp.bot` or `*.dapp.bot`.  Note that wildcard certificates do not allow for different subdomain nesting: `*.dapp.bot` will cover `other-test.dapp.bot`, but not `other.test.dapp.bot` or `dapp.bot`.  If you're using a domain which you have configured in Route 53, then AWS can create the required CNAME record for you.  If not, take note of the record they ask you to create and look up how to do it with your provider.  Once your record has been validated, you're ready to begin.

### S3 Bucket
Your S3 bucket needs to be configured to host a public website.  You can create it with all the default settings.  Take note of the bucket name, as you'll use it again later. Once you have created it in the console:

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
3. At the bottom of the page, set the Default Root object to `index.html`.

This will make all of the static file in the bucket publicly accessible to your users.

### Cloudfront Distro
Go to the Cloudfront console page and click Create Distribution.  Select your S3 bucket within the Origin Domain Name, this will configure most of the other fields.  The only changes you need to make are:
1. In Default Cache Behavior Settings, Viewer Protocol Policy should redirect HTTP to HTTPS.
2. In Distribution Settings, only select `Use All Edge Locations` if you expect worldwide usage.  We're doing this to get free HTTPS, so if you only expect NA & EU users, then pick a cheaper price class.  It also makes invalidations faster.
3. Below Price Class, select Custom SSL Certificate and pick one which fits where the site is being deployed.

Once you've confirmed and created the disbution, note both its ID and the Domain Name, listed on its General tab.  You will need the domain name for Route 53, and the ID for your deployment command.

### Route 53 Record
The Route 53 record is pretty straightforward.  Just make an Alias record where the target is your Cloudfront domain, and you're done.  The other defaults are fine.

## Deployment
The deployment commands are already written into `package.json` for current infrastructure.  The command crunches these into one line, but essentially the steps are:
```
npm run build
aws s3 sync build/ s3://[BUCKET-NAME]
aws cloudfront create-invalidation --distribution-id [DISTRIBUTION ID]
```

## Related Documents
- [**Scaling Analysis**](https://github.com/Eximchain/eximchain-notes/blob/master/dapperator/scaling.md)