const Joi = require('joi');

const postExam = Joi.object({
    name: Joi.string().required(),
    url: Joi.string().uri().required(),
    type: Joi.string().pattern(/^P1|P2|P3|PF|2ch|Outras$/).required(),
    teacherId: Joi.number().min(1).max(20).required(),
    subjectId: Joi.number().min(1).max(59).required()
});

module.exports = {
    postExam
}
