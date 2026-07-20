const express = require("express");

const router = express.Router();

const cropController =
require("../controllers/cropController");



// CREATE

router.post(

"/add",

cropController.addCrop

);




// READ ALL

router.get(

"/all",

cropController.getAllCrops

);




// SEARCH BY CROP NAME

router.get(

"/search/:crop",

cropController.searchCrop

);




// READ SINGLE

router.get(

"/:id",

cropController.getCropById

);




// UPDATE COMPLETE DATA

router.put(

"/update/:id",

cropController.updateCrop

);




// UPDATE PARTIAL DATA

router.patch(

"/patch/:id",

cropController.patchCrop

);




// DELETE

router.delete(

"/delete/:id",

cropController.deleteCrop

);



module.exports = router;