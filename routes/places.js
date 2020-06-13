const express = require("express");
const PlacesController = require("../controllers/places");
const router = express.Router();

router
  .route("/")
  .get(PlacesController.index)
  .post(
    PlacesController.multerMiddleware(),
    PlacesController.saveImage,
    PlacesController.create
  )
  .put(PlacesController.update);

router.route("/:id").get(PlacesController.show).delete(PlacesController.delete);

module.exports = router;
