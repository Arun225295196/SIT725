var express = require("express")
var app = express()

// Serve static files from public directory
app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("App listening to: "+port)
})