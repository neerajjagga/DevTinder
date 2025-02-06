import Joi from 'joi';

const userValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(25)
        .trim()
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name should be minimum of length 3',
            'string.max': 'Name should be maximum 25 characters'
        }),

    email: Joi.string()
        .email()
        .trim()
        .lowercase()
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Invalid email format'
        }),

    password: Joi.string()
        .min(6)
        .trim()
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password should be minimum of length 6'
        }),

    profileImageUrl: Joi.string()
        .uri()
        .allow('')
        .messages({
            'string.uri': 'Profile Image URL should be a valid URI'
        }),

    about: Joi.string()
        .allow(''),

    skills: Joi.array()
        .items(Joi.string())
        .min(1)
        .max(10)
        .required()
        .messages({
            'array.min': 'The array should contain at least 1 skill',
            'array.max': 'The array should contain a maximum of 10 skills',
        })
}).options({ allowUnknown: false });

export const validateUserSchema = async (req, res, next) => {
    const { error } = userValidationSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })
    }

    next();
}

