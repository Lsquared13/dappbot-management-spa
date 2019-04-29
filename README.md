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