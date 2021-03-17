const warmer = require('lambda-warmer');

module.exports.hello = async (event) => {
    if (await warmer( event ))
        return 'warmed';

    return {
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Go Serverless v1.0! Your function executed successfully!',
            input: event,
          },
          null,
          2
        ),
    };
};
