const http=require('http');
const usersData=[
    {
        name:"Ananya",
        age:21,
        email:'ana@gmail.com'
    },
    {
        name:"Abhay",
        age:'20',
        email:'abhay@gmail.com'
    }
]
const server=http.createServer((req,res)=>{
    res.setHeader("Content-Type",'application/json')
    res.write(JSON.stringify(usersData));
    res.end();

}).listen(4000);