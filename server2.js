// HTTPS method
// GET -- to fetch data from server
// POST -- to send data to server
// PUT -- to update data
// DELETE -- to delete data
// PATCH -- to update partial data

const http = require('http');
const fs = require('fs');
const url = require('url');

const myserver = http.createServer((req,res) =>{
    if(req.url =='/favicon.ico') return res.end();
    const log = `${Date.now()}: ${req.method} ${req.url} New req Received\n`;
    const myurl= url.parse(req.url, true)
    fs.appendFile("log.txt",log, (err,data) =>{
        switch(myurl.pathname){
            case "/":
                if (req.method === 'GET') res.end('This is Home page');
                break;

            case "/login":
                
                if(req.method === 'PUT') res.end("This is Login page");
                

            case "/about":
                const username = myurl.query.myname;
                res.end(`Hi, ${username}`);
                break;
            case '/user':
                const userId = myurl.query.id;
                
            case "/serach":
                const serach = myurl.query.search_query;
                res.end("Here are your result for " +serach);
                break;
            case "/signup":
                if(req.method === 'GET') res.end("This is SignUp form");
                else if(req.method ==='POST'){
                    // it will go in db and serach gor the data
                    res.end("Success")
                }
            
                break;
            default:
            res.end("404 page not found")
        }
    });
});

myserver.listen(8000, () => console.log("server started"));