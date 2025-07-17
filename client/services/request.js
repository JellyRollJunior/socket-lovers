const SERVER_BASE_URL = import.meta.env.VITE_SERVER_URL;

const request = async (endpoint, options) => {
    const response = await fetch(`${SERVER_BASE_URL}${endpoint}`, options);
    const json = await response.json();
    if (!response.ok) {
        const error = new Error();
        error.status = json.status;
        error.name = json.name;
        error.message = json.message;
        if (json.validationErrors) {
            error.validationErrors = json.validationErrors;
        }
        throw error;
    }
    return json;
};

export { request };
