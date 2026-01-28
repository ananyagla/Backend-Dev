const http=require('http');
const server=http.createServer((req,resp)=>{
    resp.setHeader("Content-Type","text/html");
    resp.write("<h1>Hello Ananya Here</h1>")
    //how to end the response
    resp.end('Ananya')

    //how to stop the server
    process.exit();

})
server.listen(4800);