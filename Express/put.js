import express from 'express';
const app=express();
app.use(express.json());

let credentials=[
    {email:"ana@gmail.com" , password:123},
    {email:"manu@gmail.com" , password:234},
]
//GET request
app.get("/auth/users",(req,res)=>{
    res.json({message:"users Fetch Successful", credentials})
});

//RESET PASS
app.put("/auth/reset",(req,res)=>{
    const {email,password,newPassword}=req.body;
    //FIND USER

    const user=credentials.find(
        (cred)=>cred.email==email && cred.password==password,
    );
    if(!user){
        return res.status(400).send("Invalid Credentials");
    }
    //UPDATE PASS
    user.password=newPassword;
    res.json({message:"Password Reset Successful", user});

});
//Forget PASS
app.put("/auth/forget",(req,res)=>{
    const {email,newPassword}=req.body;
    const user=credentials.find((cred)=>cred.email==email);
    if(!user){
        return res.status(400).send("User not found");
    }
    user.password=newPassword;
    res.json({message:"Password forgot Successfully", user});
})
app.put("/auth/forget/email",(req,res)=>{
    const {newEmail,password}=req.body;
    const user=credentials.find((cred)=>cred.password==password);
    if(!user){
        return res.status(400).send("User not found");
    }
    user.email=newEmail;
    res.json({message:"Email Updated Successfully", user});

})
app.listen(8080,()=>(console.log("Server Started")));