const reviewService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res){
    const data = await reviewService.list();

    res.json(data);
}

function hasData(req, res, next){
    const data = req.body;
    // console.log("hasData::::: ", data,' length:::::', data.length);
    if(Object.keys(data).length){
        return next();
    }
    next({
        status: 400, 
        message:`Request must have body data`
    })
}
async function reviewIdExists(req, res, next){
    const reviewId = req.params.reviewId;
    const review = await reviewService.read(reviewId);
    // console.log("reviewIdExists::::: ", review ,'\n==========');
    // console.log("reviewlength:::", review.length)
    if(review){
        res.locals.review = review;
        return next();
    }
    next({status:404, 
        message:`Review cannot be found`})
}

function read(req, res){
    const data = res.locals.review;
    res.json({data});
}

async function destroy(req, res){
    const reviewId = req.params.reviewId;
    // console.log("\n destory::::::reviewId:::=======\n ", reviewId , '\n========');
    await reviewService.destroy(reviewId);
    res.sendStatus(204);
}

async function update(req, res){
    const reqBodyData = req.body.data;
    const reviewId = req.params.reviewId;
    console.log("update::: ", reviewId , ' ::: ', reqBodyData ,'\n==============')
     const updatedReview = 
           await reviewService.update(reviewId, reqBodyData);
//       const updatedReview = await reviewService.read(reviewId);
  console.log("uupdatedReview:::> ", updatedReview)
        updatedReview.critic = await reviewService.listCritics(updatedReview.critic_id)
     res.json({data:updatedReview})
    }

module.exports = {
    list: asyncErrorBoundary(list),
    read: [ 
        asyncErrorBoundary(reviewIdExists),
        asyncErrorBoundary(read)
        ],
    delete:[
        asyncErrorBoundary(reviewIdExists),
        asyncErrorBoundary(destroy)
        ],
    update:[
//         hasData,
        asyncErrorBoundary(reviewIdExists),
        asyncErrorBoundary(update),
    ]
}