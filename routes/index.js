if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

const express = require("express"),
  router = express.Router();

router.get("/", async (req, res, next) => {
  
  try{
  let data = "test route"
  res.status(200).json({data , success : true })
  }
  catch(err){
   res.status(500).json({err : err.message, success: false})
  
  }
   
});

module.exports = router;
