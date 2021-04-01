interface responseInterface {
    statusCode: number
    headers: Object,
    body: Object
}

const defaultHeaders = {
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*'
};

const errorResponse = ( err: Error, statusCode: number = 500 ): responseInterface => {
    console.log(
        `Error: ${ err.message  }`
    );

    return {
        statusCode,
        headers: {
            ...defaultHeaders
        },
        body: JSON.stringify( { message: err.message || 'Something went wrong !!!' })
    }
}

const successResponse = ( body: Object, statusCode: number = 200 ): responseInterface => {
    console.log(
        `Lambda successfully invoked and finished`
    );

    return {
        statusCode,
        headers: {
            ...defaultHeaders
        },
        body: JSON.stringify( body )
    }
}

export { errorResponse, successResponse, responseInterface };
