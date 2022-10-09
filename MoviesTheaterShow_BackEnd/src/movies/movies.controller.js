const movieService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { as } = require("../db/connection");

async function movieExists(req, res, next){
    // console.log("movies.controller::movieExists::::", req.params.movieId ,"\n")
    const movie = await movieService.read(req.params.movieId);
    // console.log("movies.controller:::movieExists::::: movie=>> ", movie ,"\n")
    if(movie){
        res.locals.movie = movie;
        return next();
    }
    next({
        status:404, 
        message:`Movie cannot be found`,
    });
}

async function list(req, res){
    const query = req.query.is_showing;
    // console.log("list:::query::: ", query);

    const data = (query==="true") ? await movieService.listIsShowing() : await movieService.list();
//   const data = await movieService.list();
//   console.log('listcontroller::: ', data)
    res.json({data});
}

function read(req, res){
    // console.log("inside read ::")
    const data = res.locals.movie;
    // console.log("movies.controller:::read::::::=>", data ,"\n")
    res.json({data})
}

async function readMovieTheaters(req, res){
    const data = await movieService.readMovieTheaters(req.params.movieId);
    res.json({data});
}

async function readMovieReviews(req, res){
    
    const data = await movieService.readMovieReviews(req.params.movieId);
    
    const result = data.map((d) => {
        return {
          "review_id": d.review_id,
          "content": d.content,
          "score": d.score,
          "critic_id": d.critic_id,
          "movie_id": d.movie_id,
          "created_at": d.created_at,
          "updated_at": d.updated_at,
          "critic":{
            "critic_id":d.critic_critic_id,
          "preferred_name": d.critic_preferred_name,
          "surname": d.critic_surname,
          "organization_name": d.critic_organization_name,
          "created_at":d.critic_created_at,
          "updated_at":d.critic_updated_at
          }
        }
      });
    res.json({data:result});
}

module.exports = {
    list: asyncErrorBoundary(list),
    // list, 
    read:[
        asyncErrorBoundary(movieExists),
        read,
    ], 
    readMovieTheaters:[asyncErrorBoundary(movieExists), readMovieTheaters],
    readMovieReviews:[asyncErrorBoundary(movieExists), readMovieReviews],

}