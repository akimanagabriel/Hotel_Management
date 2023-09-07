const parameter = {
    SERVER_URL: `http://localhost:5000`,
};

function handleError(error) {
    return error.response.data.message || error.message;
}

export { parameter, handleError };
