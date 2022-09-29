const theaterService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res){
    const data = await theaterService.listTheaterWithMovies();
    // console.log("theatersController:: list::: ", data);
    res.json({data})
}

module.exports={
    list : asyncErrorBoundary(list), 
}