class AuthenticationError extends Error {
    constructor(status = 401) {
        super("Unable to authenticate user. Please log in again");
        this.name = "Authentication Error";
        this.status = status;
    }
}

export { AuthenticationError };
