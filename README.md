# authentication_example_authorizer
Serverless Framework project - AWS Lamdba for using as an authenticator

This project is part of a blog post about creating an Authorizer for API Gateway. 
Check the whole blog post from here: https://foobar123.com/serverless-authorization-25a556e883d6

The authorizer is missing a config.js file where you should add something like this:
```
var env = {};
env.AUTH0_SECRET=<auth0 secret>;
env.DOMAIN = <auth0 domain>;
module.exports = env;´´´
