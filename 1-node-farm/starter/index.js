const http = require('http')

const server = http.createServer((request, response) => {
    response.end("Hello from the server!")
})

server.listen(3001, 'localhost', () => {
    console.log("Listening to request on port 3001")
})