class AuthenticationError extends Error {
    constructor(statusCode = 401) {
        super("Unable to authenticate user");
        this.name = "Authentication Error";
        this.statusCode = statusCode;
    }
}

export { AuthenticationError };
