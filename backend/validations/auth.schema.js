import Joi from 'joi';

 const authSchema = Joi.object({
  username: Joi.string()
    .alphanum() // Only letters and numbers
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.alphanum': 'Username must only contain letters and numbers',
      'string.min': 'Username must be at least {#limit} characters',
      'string.max': 'Username cannot exceed {#limit} characters',
      'any.required': 'Username is required',
    }),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] }}) // Validate common TLDs
    .required()
    .messages({
      'string.email': 'Please enter a valid email (e.g., user@example.com)',
      'any.required': 'Email is required',
    }),

   password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z]).{8,30}$')) // Only enforces uppercase + lowercase
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase and one lowercase letter',
      'string.empty': 'Password is required',
    }),
});



const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required',
  }),
});

export {authSchema,loginSchema};