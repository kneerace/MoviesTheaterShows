const router = require("express").Router();
const reviewController = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/")
    .get(reviewController.list)
        .all(methodNotAllowed);

router.route("/:reviewId")
    .get(reviewController.read)
        .put(reviewController.update)
            .delete(reviewController.delete)
                .all(methodNotAllowed);


module.exports = router;