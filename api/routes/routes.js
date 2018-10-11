const express = require("express");
const router = express.Router();

const controller = require('../controllers/controller');


router.post("/productlist", controller.getProducts);
router.post("/getDiscounts", controller.getDiscounts);
router.post("/addproduct", controller.saveProduct);
//router.post("/image", controller.getImage);


router.get("/client_token", controller.getToken);
router.post("/checkout", controller.checkout);


module.exports = router;
