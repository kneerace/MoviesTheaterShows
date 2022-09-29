const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties")

const configuration = 
    {
        movie_id: ["movies", null, "movie_id"],
        title: ["movies", null, "title"],
        runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
        rating: ["movies", null, "rating"],
        description: ["movies", null, "description"],
        image_url: ["movies", null, "image_url"],
        movies_created_at: ["movies", null, "created_at"],
        movies_updated_at: ["movies", null, "updated_at"],
        is_showing: ["movies", null, "is_showing"],
        movies_theater_id: ["movies", null, "theater_id"],
}
const reduceMovies = reduceProperties("theater_id", configuration);

function list(){
    return knex("theaters")
        .select("*")
        .where("theater_id", 9)
}

function listTheaterWithMovies(){
    return knex("theaters as t")
        .join("movies_theaters as mt","t.theater_id", "mt.theater_id")
        .join("movies as m","m.movie_id", "mt.movie_id")
//         .where({"t.theater_id": 9, "mt.is_showing": true})
        .select("t.*",
        "m.movie_id",
        "m.title",
        "m.runtime_in_minutes",
        "m.rating",
        "m.description",
        "m.image_url",
        "m.created_at as movies_created_at",
        "m.updated_at as movies_updated_at",
        "mt.is_showing",
        "mt.theater_id as movies_theater_id"
        )
        .then(reduceMovies)
}

function moviesPlayingOnTheater(theater_id){
    return knex("movies_theaters as mt")
        .join("movies as m","movie_id")
        .where("mt.theater_id", theater_id)
        .select("m.*")

}

module.exports = {
    list,
    moviesPlayingOnTheater,
    listTheaterWithMovies,
}