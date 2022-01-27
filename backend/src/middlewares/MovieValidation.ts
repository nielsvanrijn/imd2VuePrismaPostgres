import { body, oneOf, param } from 'express-validator';

const createAndUpdateRules = [
    body('name', 'Name is required')
        .notEmpty().withMessage('Name must not be empty')
        .isString().withMessage('Name must be a string'),
    body('year').optional()
        .notEmpty().withMessage('Year must not be empty')
        .isNumeric().withMessage('Year must be numeric')
        .isInt().withMessage('Year must be a whole number')
        .isLength({max: 4}).withMessage('Year can not be more than 4 characters'),
    body('lenght').optional()
        .notEmpty().withMessage('Lenght must not be empty')
        .isNumeric().withMessage('Lenght must be numeric'),
    body('description').optional()
        .notEmpty().withMessage('Description must not be empty')
        .isString().withMessage('Description must be a string'),
    body('posterUrls').optional()
        .notEmpty().withMessage('Description must not be empty')
        .isArray().withMessage('Description must be an array'),
    body('trailerUrls').optional()
        .notEmpty().withMessage('Description must not be empty')
        .isArray().withMessage('Description must be an array'),
    body('directors').optional()
        .notEmpty().withMessage('Directors must not be empty')
        .isArray().withMessage('Directors must be an array'),
    body('writers').optional()
        .notEmpty().withMessage('Writers must not be empty')
        .isNumeric().withMessage('Writers must be numeric'),
    body('cast').optional()
        .notEmpty().withMessage('Cast must not be empty')
        .isNumeric().withMessage('Cast must be numeric'),
    body('genres').optional()
        .notEmpty().withMessage('Genres must not be empty')
        .isNumeric().withMessage('Genres must be numeric'),
];

// Create a single Movie
export const createMovieSchema = [
    ...createAndUpdateRules,
    body('posterUrls.*')
        .isString().withMessage('Description array must contain only strings'),
    body('trailerUrls.*')
        .isString().withMessage('Description array must contain only strings'),
    body('directors.*')
        .isNumeric().withMessage('Directors array must contain only numberics'),
    body('writers.*')
        .isNumeric().withMessage('Writers array must contain only numberics'),
    body('cast.*')
        .isNumeric().withMessage('Cast array must contain only numberics'),
    body('genres.*')
        .isNumeric().withMessage('Genres array must contain only numberics'),
];

// Read a single Movie
export const getMovieSchema = [
    param('id', 'id is required')
        .notEmpty().withMessage('id must not be empty').bail()
        .isNumeric().withMessage('id must be numeric')
];

// Update a single Movie
export const updateMovieSchema = [
    param('id', 'id is required')
        .notEmpty().withMessage('id must not be empty').bail()
        .isNumeric().withMessage('id must be numeric').bail(),
    oneOf(createAndUpdateRules, 'Must update at least one field'),
    body('posterUrls.*')
        .isString().withMessage('Description array must contain only strings'),
    body('trailerUrls.*')
        .isString().withMessage('Description array must contain only strings'),
    body('directors.*')
        .isNumeric().withMessage('Directors array must contain only numberics'),
    body('writers.*')
        .isNumeric().withMessage('Writers array must contain only numberics'),
    body('cast.*')
        .isNumeric().withMessage('Cast array must contain only numberics'),
    body('genres.*')
        .isNumeric().withMessage('Genres array must contain only numberics'),
];

// Delete a single Movie
export const deleteMovieSchema = [
    param('id', 'id is required')
        .notEmpty().withMessage('id must not be empty').bail()
        .isNumeric().withMessage('id must be numeric').bail(),
];
