const fs = require('fs')
const http = require('http')
const url = require('url')

const slugify = require('slugify')

const replaceTemplate = require('./modules/replaceTemplate')

//////// GET TEMPLATES FILES FROM THE TEMPLATE FOLDER ////////
const tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8')
const tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8')
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8')

//////// PARSING DATA INTO JAVASCRIPT ONLY ONCE THE APP IS LAUNCHED ////////
const data = fs.readFileSync('./dev-data/data.json', 'utf-8')
const dataObj = JSON.parse(data)

const slugs = dataObj.map(product => slugify(product.productName, { 
    replacement: '_', 
    lower: true 
}))

//////// SERVER ////////
const server = http.createServer((request, response) => {
    const { query, pathname } = url.parse(request.url, true)
//////// OVERVIEW PAGE RESPONSE ////////

    if(pathname === '/' || pathname === '/overview'){
        response.writeHead(200, { 'content-type': 'text/html'})

        const cards = dataObj.map(product => replaceTemplate(tempCard, product)).join('')
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cards)

        response.end(output)

//////// PRODUCT PAGE RESPONSE ////////

    }else if(pathname === '/product'){
        response.writeHead(200, { 'content-type': 'text/html' })
        
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product)

        response.end(output)

//////// SENDIND RESPONSE BACK FOR API DATA ////////

    }else if (pathname === '/api'){
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