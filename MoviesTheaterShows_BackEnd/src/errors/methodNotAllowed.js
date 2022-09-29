function methodnotAllowed(req, res, next){
    next({
        status: 405, 
        message: `${req.method} not allowerd for ${req.originalUrl}`,
    });
}

module.exports = methodnotAllowed;