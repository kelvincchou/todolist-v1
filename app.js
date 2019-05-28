const express = require("express");
const bodyParser = require("body-parser"); //post to req.body
//const request = require("request");
const date = require(__dirname + "/date.js");

const app = express();
const items = ["buy flat", "buy car"]; //array declare as constant also can change content
const workItems = [];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.listen(process.env.PORT||3000, () => {
	console.log("Express listen on port 3000");
});

app.get("/", (req, res) => {
	let day = date.getDate(); 
      	res.render("list", {listTitle:day, newListItems:items});	
});

app.post("/", (req,res) => {
	let item = req.body.newItem;
        console.log(req.body); //request body: newItem and button
        console.log(req.body.button);
         if(req.body.button === "Work") {
		workItems.push(item);
                res.redirect("/work");
                console.log("test workItems");
 	} else {
  		items.push(item);
        	res.redirect("/");
        }
});

app.get("/work", (req, res) => {
	res.render("list", {listTitle: "Work List", newListItems:workItems});
});


app.post("/work", (req, res) =>{
	let item = req.body.newItem;
	workItems.push(item);
	res.redirect("/work");
});
