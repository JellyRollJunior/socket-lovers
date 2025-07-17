class DatabaseError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.name = "Database Error";
        this.statusCode = statusCode;
    }
}

export { DatabaseError };
