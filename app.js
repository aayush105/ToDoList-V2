const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

// const date = require(__dirname + "/date.js"); // it require the date.js and gets the module and store into date 

const app = express();

mongoose.connect("mongodb+srv://admin-aayush:Aayush_105@cluster0.eexvyx0.mongodb.net/todoDB");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); // this helps us to use the css in our website 


const itemSchema = {
    name: String
};

const Item = mongoose.model("Item", itemSchema);

const item1 = {
    name: "Welcome to ToDo List!"
};
const item2 = {
    name: "Click + to add the item to the list"
};
const item3 = {
    name: "<-- click this to delete the item"
};

const defaultItem = [item1, item2, item3];


// this is schema for the other routes
const listSchema = {
    name: String,
    items : [itemSchema] 
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res){

    // const day = date.getDate();

    async function readData(){
        try{
            const result = await Item.find();

            // this will help to not repeat the same data
            if (result.length === 0){
                Item.insertMany(defaultItem);  
                res.redirect("/");
            } else {
                res.render("list", {listTitle: "Today", newListItems: result});
            }
    } catch{}

 } 
    readData();

});

app.post("/",async function(req, res){
    const itemName = req.body.newItem; // we will get the value from the input box from the template
    const listName = req.body.list;

    // new document to enter the new item in the list
    const item = new Item ({
        name: itemName
    });

    // check whether the item inserted was form default route or other routes
    if (listName === "Today"){
        item.save();
        res.redirect("/");
    } else {
        try{
            const foundList = await List.findOne({name: listName});
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName); // this will redirect to the new route
        } catch {}
    }
    
    // if (req.body.list === "Work List"){
    //     workItems.push(item);
    //     res.redirect("/work"); // it will redirect to the work route and get trigger the app.get in work route and then render the value in the templete
    // } else {
    //     items.push(item);
    //     res.redirect("/"); // it will redirect to the home route and get trigger the app.get in home route and then render the both value in the templete
    // }
});

// to delete the checked item
app.post("/delete", async function(req, res){
    const checkedItemID = req.body.checkbox;
    const listName = req.body.listName;

    // check weather the delete was call from default route or other route
    if(listName === "Today"){
        try {
            await Item.findByIdAndRemove(checkedItemID);
            console.log("Successfully Deleted");
            res.redirect("/")
            } catch (err) {
            console.log(err);
            }
    } else {
        try{
            await List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemID}}});
            res.redirect("/" + listName);
        } catch (err){
            console.log(err);
        }
    }    
});

// dynamic routing 
app.get("/:customListName", async function(req, res){
    const customListName = _.capitalize(req.params.customListName); // here "_.capitalize()" is used to make the list name 1st letter capital ither small
    try{
        const foundList = await List.findOne({name: customListName});
        if (!foundList){
            // create a new list
            const list = new List ({
                name: customListName,
                items: defaultItem
            });
            list.save();
            res.redirect("/"+customListName);
        } else {
            // show an existing list
            res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
        }
    } catch (err) {
        console.log(err);
    }
});


app.listen(3000, function(){
    console.log("Server started at port 3000");
});