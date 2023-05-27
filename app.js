const express = require("express");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('/posts', express.static('public'));
app.set("view engine", "ejs");

const contentHome = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula sem nec felis semper feugiat. Ut semper felis dapibus nisl euismod, vel commodo dui molestie. Nam gravida mauris et velit ornare fermentum. Vestibulum eu urna varius, suscipit orci quis, cursus lacus. Phasellus nec viverra nulla. Sed eu risus aliquam, tincidunt massa cursus, lobortis est. Vivamus at bibendum urna. Mauris porttitor magna lorem, in tincidunt lacus dictum non. Nam est metus, pulvinar eu ante vitae, ornare ultricies ante. Donec pulvinar metus vitae velit ullamcorper maximus. Mauris at odio molestie, finibus purus sit amet, ullamcorper neque.";
const contentAbout = "Curabitur vehicula congue nibh id tempus. Suspendisse lobortis, ante at consectetur condimentum, lacus felis finibus odio, sit amet feugiat dui est ut ante. Maecenas id lectus facilisis erat condimentum egestas id vel diam. Sed bibendum magna et mi egestas, non eleifend massa dignissim. Nulla accumsan, orci at aliquet sollicitudin, turpis odio condimentum sem, ac venenatis nisi ipsum at tortor. Donec vitae dolor nec arcu dictum fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";
const contentContact = "Pellentesque hendrerit risus sed nunc luctus facilisis. Etiam malesuada, orci eget consectetur maximus, felis arcu ornare arcu, eget rutrum sapien est egestas diam. Praesent laoreet rutrum congue. Mauris in arcu auctor, ornare libero id, porttitor ligula. Donec neque tellus, scelerisque nec ultricies nec, bibendum facilisis dui. Curabitur porta fermentum leo at venenatis. Donec et nibh vel turpis efficitur malesuada at non lacus. Etiam nec justo nec arcu fermentum semper quis sed mauris. Cras fermentum nunc ligula, venenatis tristique eros pretium id.";

let posts = [];

app.get("/", (req, res) => {
    res.render("home", {content: posts});
});

app.get("/about", (req, res) => {
    res.render("about", {content: contentAbout});
});

app.get("/contact", (req, res) => {
    res.render("contact", {content: contentContact});
});

app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/compose", (req, res) => {
    const post = {
        blogTitle: req.body.blogTitle,
        blogBody: req.body.blogBody
    };
    posts.push(post);
    res.redirect("/");
})

app.get("/posts/:path", (req, res) => {
    posts.forEach((post) => {
        if(post.blogTitle.replace(" ", "-").toLowerCase() == req.params.path) {
            res.render("post", {post: post});
        }
    })
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});