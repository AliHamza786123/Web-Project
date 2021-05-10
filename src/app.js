const express=require("express");
const app=express();
const port=process.env.port || 3000;
require("./db/conn");
const User=require("./models/user");
const path=require("path");
const hbs=require("hbs");
const {registerPartials} = require("hbs");

const static_path=path.join(__dirname, "../public");
const templatpath=path.join(__dirname, "../templates/views");
const partialspath=path.join(__dirname, "../templates/partials");

app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")))
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")))
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")))

app.use(express.urlencoded( {extended:false}));
app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views", templatpath),
hbs.registerPartials(partialspath);

app.get("/", (req,res)=>{
    res.render("index");
})

 /*  app.get("/registration", (req,res)=>{
  res.render("registration");
}) 

  app.get("/about", (req,res)=>{
    res.render("about")
}) */ 

  app.post("/contact", async(req,res)=>{
    try {
     const userData=new User(req.body);
     await userData.save(); 
    res.status(201).render("index");

    } catch(error){
        res.status(500).send(error);
    }
    
}) 


app.listen(port, ()=>{
    console.log(`listing the port ${port}`);
})