import express from 'express';
import { userData } from "./data.js";

const app = express();
app.use(express.json());

app.get("/user/:id", (req, res) => {
    const id = req.params.id;
    const user = userData.find((ele) => ele.id == id);

    if (!user) {
        return res.json({ message: "user not found" });
    }

    return res.json(user);
});
app.get("/user",(req,res)=>{
    const users=userData;
    res.json(users);
})
app.get("/", (req, res) => {
    res.send("home route");
});
app.get("/search",(req,res)=>{
    console.log(req.query);
    const username=req.query.name;
    const password=req.query.password;
    res.send({
        username,password
    });

    

})
app.post("/user",(req,res)=>{
    //let usernewData=req.body;
    //console.log(usernewData);
    //res.send("user created")
    let{name,age,course}=req.body;
    let newUserData={
        
        name:name,
        age:age,
        id:userData.length+1
    }

    userData.push(newUserData);
    res.send("user created successfully")

})

app.get("/about", (req, res) => {
    res.send("about route");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
