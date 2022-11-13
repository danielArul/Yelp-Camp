const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');
 
//define extension for security measures for joi - .escapeHTML()
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages:{
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules:{
        escapeHTML:{
            validate(value, helpers){
                const clean = sanitizeHtml(value, { //pkg "sanitize-html" 
                    allowedTags:[],  //nothing is allowed - not even h1 or p
                    allowedAttributes:{},
                });
                if (clean !== value) return helpers.error('string.escapeHTML',{ value })//if there's a difference in the sanitized output= error
                return clean;
            }
        }
    }
});
 
const Joi = BaseJoi.extend(extension);//Base is with sanitize
 
//define Joi Schema - validating the data for access also through postman
 
module.exports.campgroundSchema = Joi.object({   
    campground:Joi.object({
        title:Joi.string().required().escapeHTML(),
        price:Joi.number().required().min(0),// (price >= 0) validation
        //image:Joi.string().required(),
        location:Joi.string().required().escapeHTML(),
        description:Joi.string().required().escapeHTML()
    }).required(),            // have to be added to validate
    deleteImages:Joi.array()//after checking images they'll be deleted
});
 
//validation for review inputs
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating:Joi.number().required().min(1).max(5),
        body:Joi.string().required().escapeHTML()
    }).required()           // have to be added to validate
})