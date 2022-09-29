const knex = require("../db/connection");

function list(){
    return knex("reviews")
        .select("*");
}


function read(reviewId){
    return knex("reviews")
        .select("*")
        .where({review_id:reviewId})
        .first() ;
}


function destroy(reviewId){
    return knex("reviews")
        .where("review_id", Number(reviewId))
        .del();
}

// function update(reviewId, data){
//     const inputScore = data.score;
//     const inputContent = data.content;
//     return knex("reviews")
//         .where({review_id:reviewId})
//         .update({score:inputScore, content:inputContent})
        
// }
function update(review_id, updatedReview) { 
  return knex("reviews")
//       .select("*")
      .where({ review_id })
      .update(updatedReview)
.then(() => read(review_id))
}


function listCritics(critic_id){
    return knex("critics")
        .where({critic_id})
        .first();
}


module.exports= {
    list, 
    read, 
    destroy,
    update,
    listCritics, 

}
