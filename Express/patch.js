import express from 'express';
//const express=require("express");
const app=express();
app.use(express.json());

let students=[
    {id:1 , name:"Ananya" , marks: 100, city:"Hyderabad"},
    {id:2 , name:"Manu" , marks: 10, city:"Bangalore"},
]

//VIEW STUDENTS
app.get("/students",(req,res)=>{
    res.json(students);
    
});

app.patch("/students/:id",(req,res)=>{
    const id=req.params.id;
    const updates=req.body.marks;
    if(updates.id || updates.name || updates.city){
        res.status(400).json({message:"Cannot update id,name or city"});
    }
    const student=students.find((s)=>s.id==id);
    if(!student){
        return res.status(404).json({message:"Student not found"});
    }
    //APPLY PARTIAL UPDATE
    Object.assign(student,{marks:updates});
    res.json({message:"Student Updated successfully", student});
        
});
app.listen(8000,()=>console.log("Server Started"));
    
