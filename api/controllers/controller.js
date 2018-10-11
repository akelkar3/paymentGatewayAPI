const mongoose = require("mongoose");
const Product = require("../models/product");
const Discount = require("../models/discount");

var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "n7wdbctyfzvp8x4m",
  publicKey: "xwggvjvshzy3qk82",
  privateKey: "e273297b9663b630681709cea63ab68a"
});





module.exports.getToken = function (req, res) {

gateway.clientToken.generate({}, function (err, response) {
    //res.send(response.clientToken);

    res.status(200).json(
            //result
            {client_token:response.clientToken,

            status:200}
            )
  });
//});
};




module.exports.checkout =function (req, res) {
  var nonceFromTheClient = req.body.payment_method_nonce;
  // Use payment method nonce here
  gateway.transaction.sale({
    amount: req.body.amount,
    paymentMethodNonce: nonceFromTheClient,
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {


  });
};







//get product
module.exports.getProducts = function(req, res){
  const id=req.body.region;

  if (!id) {
    res.status(401).json({
      "message" : "Error: no valid device found"
    });
  } else {
    Product
      .find({region: req.body.region})
      .exec(function(err, product) {
        res.status(200).json(
        //result
        {message:"Request successful",
        product: product,
        status:200}
        )
      });
  }
};


//get discount
module.exports.getDiscounts = function(req, res){
  const id=req.body.region;

  if (!id) {
   Discount
      .find({})
      .exec(function(err, product) {
		  if(err){
		  res.status(401).json({
				"message" : "Error: no valid device found"
			});
			return;
			}
        res.status(200).json(
        //result
        {message:"Request successful",
        product: product,
        status:200}
        )
      });
  } else {
    Discount
      .find({region: req.body.region})
      .exec(function(err, discounts) {
        res.status(200).json(
        //result
        {message:"Request successful",
        product: discounts,
        status:200}
        )
      });
  }
};

//get image
/**module.exports.getImage = function(req, res){
  const image=req.body.image;
  var path= "/images/"+ image;

  if (true) {
    res.status(401).json({
      "message" : "Error: no valid device found"
    });
  } else {
    res.sendFile(__dirname+'path');
      }

}; **/


//add product

module.exports.saveProduct = function(req, res){
const product = new Product({
              _id: new mongoose.Types.ObjectId(),
              region: req.body.region,
              path: req.body.path,
              pname: req.body.pname,
              discount: req.body.discount,
              price: req.body.price

            });
product.save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "product added",
                  status: 200
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err,
                  status: 500
                });
              }); }

