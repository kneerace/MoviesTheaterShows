const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

function list(){
    return knex("movies")
        .select("*");
}

function listIsShowing(){
    return knex ("movies as m ")
        .join("movies_theaters as mt","m.movie_id", "mt.movie_id")
        .distinct("m.*")
            .where("mt.is_showing", true)
}

function read(movie_id){
    return knex("movies")
        .select("*")
            .where({movie_id})
            .first()
                ;
}

function readMovieTheaters(movieId){
    return knex("movies_theaters as mt")
        .join("theaters as t", "t.theater_id","mt.theater_id")
        .select("t.*","mt.is_showing", "mt.movie_id")
        .where("mt.movie_id", movieId); 
};

function readMovieReviews(movie_id){
    return knex("reviews as r")
        .join("critics as c", "r.critic_id","c.critic_id")
        .select("r.*", 
            "c.critic_id as critic_critic_id",
            "c.preferred_name as critic_preferred_name",
            "c.surname as critic_surname",
            "c.organization_name as critic_organization_name",
            "c.created_at as critic_created_at",
            "c.updated_at as critic_updated_at"
            )
        .where({movie_id})
};

function listCritics(critic_id){
    return knex("critics")
        .where({critic_id})
        .first();
}

module.exports = {
    list,
    listIsShowing,
    read,
    readMovieTheaters,
    readMovieReviews,
    listCritics,
}