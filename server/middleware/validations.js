import { check } from "express-validator";
import { validationResult } from 'express-validator';
import { ValidationError } from '../errors/ValidationError.js';
const EMPTY_ERROR = 'must not be empty.';
const CREDENTIAL_LENGTH_ERROR = 'must be between 6 and 24 characters';
const ARRAY_ERROR = 'must be an array of user ids.';
const UUID_ERROR = 'must be a user id.';

const userValidation = [
    check('username').trim()
        .notEmpty().withMessage(`Username ${EMPTY_ERROR}`)
        .isLength({ min: 6, max: 24 }).withMessage(`Username ${CREDENTIAL_LENGTH_ERROR}`),
    check('password').trim()
        .notEmpty().withMessage(`Password ${EMPTY_ERROR}`)
        .isLength({ min: 6, max: 24 }).withMessage(`Password ${CREDENTIAL_LENGTH_ERROR}`),
];

const chatIdValidations = [
    check('chatId')
        .isUUID().withMessage(`chat id ${UUID_ERROR}`),
];

const chatValidations = [
    check('userIds')
        .isArray().withMessage(`userIds ${ARRAY_ERROR}`),
    check('userIds.*')
        .isUUID().withMessage(`userIds array contents ${UUID_ERROR}`),
]

// incorporate this one into the socket message creation?
const MESSAGE_LENGTH_ERROR = 'must be between 1 and 250 characters';
const messageValidations = [
    check('content').trim()
        .notEmpty().withMessage(`content ${EMPTY_ERROR}`)
        .isLength({ min: 1, max: 250 }).withMessage(`content ${MESSAGE_LENGTH_ERROR}`),
]

const validateInput = (req) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        throw new ValidationError(validationErrors.array());
    }
};

export {
    userValidation, 
    chatIdValidations, 
    chatValidations, 
    messageValidations,
    validateInput,
};