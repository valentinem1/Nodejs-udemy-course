const http = require('http')
const url = require('url')

const server = http.createServer((request, response) => {
    const pathName = request.url

    if(pathName === '/' || pathName === '/overview'){
        response.end("Hello from Overview!")
    }else if(pathName === '/products'){
        response.end("Hello from the Products!")
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