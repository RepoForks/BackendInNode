const http = require("http");
const hostname = 'localhost';
const port = 3000;


const server = http.createServer((req,res)=>{
// end fiunction responds that it has ended
res.end('Welcome to node');
});
server.listen(port,hostname,()=>{
    console.log(`server running on ${port}`); 
});