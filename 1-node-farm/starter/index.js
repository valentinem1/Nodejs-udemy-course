const fs = require('fs')
const http = require('http')
const url = require('url')


//////// PARSING DATA INTO JAVASCRIPT ONLY ONCE THE APP IS LAUNCHED ////////
const data = fs.readFileSync('./dev-data/data.json', 'utf-8')
const dataObj = JSON.parse(data)


//////// SERVER ////////
const server = http.createServer((request, response) => {
    const pathName = request.url

    if(pathName === '/' || pathName === '/overview'){
        response.end("Hello from Overview!")
    }else if(pathName === '/products'){
        response.end("Hello from the Products!")
//////// SENDIND RESPONSE BACK FOR API DATA ////////
    }else if (pathName === '/api'){
        response.writeHead(200, {
            'Content-Type': 'application/json'
        })
        response.end(data)
    }else{
        response.writeHead(404, {
            'Contente-Type': 'text/html'
        },
            response.end("<h1>Page not found!</h1>")
        )
    }
})

server.listen(3001, 'localhost', () => {
    console.log("Listening to request on port 3001")
})