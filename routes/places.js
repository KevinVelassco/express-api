const express = require("express");
const PlaceController = require("../controllers/places");
const router = express.Router();

router.route("/places").get(PlaceController.index)
                       .post(PlaceController.create)
                       .put(PlaceController.update);

router.route("/places/:id").get(PlaceController.show).delete(PlaceController.delete);

module.exports = router;