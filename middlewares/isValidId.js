const { isValidObjectId } = require('mongoose');
const {HttpError} = require('../utils');

const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) next(HttpError(400, `${id} is not valid, please enter correct id`));
    
    next();
}

module.exports = isValidId;