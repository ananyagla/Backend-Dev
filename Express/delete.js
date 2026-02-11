//const express=require("express");
import express from 'express';
const app=express();
app.use(express.json());

let students=[
    {id:20 , name:"Mansi" , marks: 94 , city:"Pune"},
    {id:30 , name:"Rakhi" , marks: 66, city:"Agra"},
    {id:40, name:"Sonal" , marks: 88, city:"Delhi"},
];

//VIEW STUDENTS
app.get("/students",(req,res)=>{
    res.json(students);
});

app.delete("/students/:id",(req,res)=>{
    const id=req.params.id;
    const index=students.findIndex((s)=>s.id==id);
    if(index===-1){
        return res.status(404).json({message:"Student not found"})

    }
    else if(marks<70){
        return res.status(400).json({message:"Student deleted Successfully"})

    }else{
        return res.status(200).json({message:"Student can not be deleted as "})
    }
    const deleteStudent=students.splice(index,1);
    res.json({message:"Student deleted successfully" , 
    student:deleteStudent[0]})
});
app.listen(8000,()=>console.log("Server Started"));