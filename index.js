const express = require("express");
const app = express();
var fs = require("fs");
var crypto = require("crypto");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var storages = "./blog_app/posts.json";

app.set('json spaces', 2);


const help = [{
    "method": "GET",
    "url": "https://quickytext.samannoyb.hackclub.app/",
    "description": "Home Page, giving you a welcome!"
},
{
    "method": "GET",
    "url": "https://quickytext.samannoyb.hackclub.app/help",
    "description": "That's what you are reading right now! The API documentation."
},
{
    "method": "GET",
    "url": "https://quickytext.samannoyb.hackclub.app/posts",
    "description": "All posts of QuickyText in one place!"
},{
    "method": "GET",
    "url": "https://quickytext.samannoyb.hackclub.app/posts/[email]",
    "description": "Filter posts by email!"
},{
    "method": "GET",
    "url": "https://quickytext.samannoyb.hackclub.app/posts/search",
    "description": "Search for posts!"
},
{
    "method": "POST",
    "url": "https://quickytext.samannoyb.hackclub.app/createpost",
    "description": "Make a new post! Required parameters are name, email, title and content."
},]


function retrievePosts (storage) {
    if (fs.existsSync(storage)) {
        var data = fs.readFileSync(storage, "utf-8");
        if (data != "") {
            return JSON.parse(data);
        }
    }
    return [];
}

let posts = retrievePosts(storages);

function makePost (storage, data) {
        fs.writeFileSync(storage, JSON.stringify(data, null, 2), "utf-8");
}

function findPost (email) {
    postsFromthis = [];
    for (let i of posts) {
        if (i.email == email) {
            postsFromthis.push(i);
        }
    }

    return postsFromthis;
}
/*app.get('/db', (req, res) => {
    res.sendFile("./posts.json");
})*/
app.get('/', (req, res) => {
    res.send("Welcome to QuickyText! Post whatever you like :D! GET `/help` to get a list of commands for the API!");
});

app.get('/help', (req, res) => {
    res.json(help);
})

app.post("/createpost", (req, res) => {
    const {name, email, title, content} = req.body;
    if (!name || name.trim() === '') {
        return res.status(400).json({ error: "Name is required and cannot be empty" });
    }

    if (!email || email.trim() === '') {
        return res.status(400).json({ error: "Email is required and cannot be empty" });
    }
    if (!title || title.trim() === '') {
        return res.status(400).json({ error: "Title is required and cannot be empty" });
    }
    if (!content || content.trim() === '') {
        return res.status(400).json({ error: "Content is required and cannot be empty" });
    }
    var id = crypto.randomUUID();
    const date = new Date().toISOString();
    var post = {id, name, email, title, content, date};
    posts.push(post);
    makePost(storages, posts);
    //posts = retrievePosts(storages);
    res.send("Posted successfully!");
});

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.get("/posts/:email", (req, res) => {
    var postages = findPost(req.params.email);
    res.json(postages);
});

app.get("/posts/search", (req, res) => {
    var query = req.query.q;

    if (!query) return res.status(400).json({ error: "Search query is required" });

    const loweredquery = query.toLowerCase();
    const results = posts.filter(post =>
        post.title.toLowerCase().includes(loweredquery) ||
        post.content.toLowerCase().includes(loweredquery)
    );

    res.json(results);
});

app.listen(3000);
