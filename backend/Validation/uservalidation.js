const Joi=require('joi')



const signupvalidation=Joi.object({
    
    name:Joi.string().min(3).required().messages({
'string.empty':"Namae should contain value",
'any.required':"email  required",
'string.min':"minimum 3 letters required"

    }),
    email:Joi.string().email().required().messages({
        'string.empty':"Email should contain value",
        'string.email':"email format required",
        'any.required':"email  required"

        
    }),
    password:Joi.string().min(6).required().messages({
'string.empty':" Passwordshould contain value",
'any.required':"Password  required",
'string.min':"minimum 6 letters required"


        
    })
})



const loginvalidation=Joi.object({
    
    email:Joi.string().email().required().messages({
        'string.empty':"Email should contain value",
        'string.email':"email format required",
        'any.required':"email  required"

        
    }),
    password:Joi.string().min(6).required().messages({
'string.empty':" Passwordshould contain value",
'any.required':"Password  required",
'string.min':"minimum 3 letters required"


        
    })
})







module.exports={signupvalidation,loginvalidation}