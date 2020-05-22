const fs = require('fs')
const http = require('http')
const url = require('url')

//////// REPLACE TEMPLATE PLACEHOLDER BY THE ITEM'S DATA ////////
replaceTemplate = (template, product) => {
    let cardOutput = template.replace(/{%IMAGE%}/g, product.image)
    cardOutput = cardOutput.replace(/{%PRODUCTNAME%}/g, product.productName)
    cardOutput = cardOutput.replace(/{%FROM%}/g, product.from)
    cardOutput = cardOutput.replace(/{%NUTRIENTS%}/g, product.nutrients)
    cardOutput = cardOutput.replace(/{%QUANTITY%}/g, product.quantity)
    cardOutput = cardOutput.replace(/{%PRICE%}/g, product.price)
    cardOutput = cardOutput.replace(/{%DESCRIPTION%}/g, product.description)
    cardOutput = cardOutput.replace(/{%ID%}/g, product.id)

    if(!product.organic) cardOutput = cardOutput.replace(/{%NOT_ORGANIC%}/g, 'not-organic')
    return cardOutput
}

//////// GET TEMPLATES FILES FROM THE TEMPLATE FOLDER ////////
const tempOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8')
const tempProduct = fs.readFileSync('./templates/template-product.html', 'utf-8')
const tempCard = fs.readFileSync('./templates/template-card.html', 'utf-8')

//////// PARSING DATA INTO JAVASCRIPT ONLY ONCE THE APP IS LAUNCHED ////////
const data = fs.readFileSync('./dev-data/data.json', 'utf-8')
const dataObj = JSON.parse(data)

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