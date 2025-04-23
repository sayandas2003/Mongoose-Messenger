const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const methodOverride = require("method-override");


app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

main()
.then(() => {
    console.log("connection successfull");
})
.catch(() => {
    console.log("connection error");
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}



//Index Route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});
})

// New Route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

//Create Route
app.post("/chats", (req, res) => {
    let {from, to, msg} = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    })
    newChat.save()
    .then((res) => {
        console.log(res);
        // res.redirect("/chats");
    })
    .catch((err) => {
        console.log(err);
        res.send("Error creating chat");
    })
    res.redirect("/chats");
})

// Edit Route
app.get("/chats/:id/edit", async (req, res) => {
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
})


// Update Route
app.put("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newMsg}, {runValidators: true, new: true});

    // console.log(updatedChat);
    res.redirect("/chats");
})


// Destroy Route
app.delete("/chats/:id", async (req, res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})



app.get("/", (req, res) => {
    res.send("root is working");
})
app.listen(8080, () => {
    console.log("server is listening on port 8080");
})





// let chat1 = new Chat({
//     from: "neha",
//     to: "priya",
//     msg: "send me your exam sheets",
//     created_at: new Date()
// });

// chat1.save()
// .then((res) => {
//     console.log(res);
// })