import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product-service-2'
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    },
    "serverless-offline": {
      httpPort: 4000,
      lambdaPort: 4001
    }
  },
  plugins: [ 'serverless-webpack', 'serverless-offline' ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: '${opt:stage}',
    tracing: {
      apiGateway: true,
      lambda: true
    },
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '10',
      ENV_STAGE: '${opt:stage}'
    },
  },
  package: {
    include: [ '../libs/*' ]
  },
  functions: {
    getProductById: {
      handler: 'handler.getProductById',
      memorySize: 128,
      timeout: 10,
      events: [
        {
          http: {
            method: 'get',
            path: 'products/{productId}',
            cors: true,
            request: {
              parameters: {
                paths: {
                  productId: true
                }
              }
            }
          }
        }
      ]
    },
    getAllProducts: {
      handler: 'handler.getAllProducts',
      memorySize: 128,
      timeout: 10,
      events: [
        {
          http: {
            method: 'get',
            path: 'products',
            cors: true
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
