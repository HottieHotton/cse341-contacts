const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

const mongodb = require("./db/connect");

app.use(bodyParser.json());
app.use('/', require("./routes"));

mongodb.initDB((err) =>{
    if(err){
        console.error(err);
    }else{
        app.listen(port, () => {console.log(`Database Online. Listening on port ${port}`);});
    }
})


module.exports = {mongodb};