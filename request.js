const http=require('http');

http.createServer((req,res)=>{
    //console.log(req);
    //console.log(req.url);
    //res.write("<h1>Home Page</h1>");
    //res.end("Hello");

    console.log(req.method);
    if(req.url=="/"){
        res.write("<h1>HOME PAGE</h1>")
    }
    else if (req.url=="/login"){
        res.write("<h1>Login Page</h1>")
    }
    else{
        res.write("<h1>Error</h1>")
    }
    res.end();
}).listen(5600)