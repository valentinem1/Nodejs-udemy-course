//////// REPLACE TEMPLATE PLACEHOLDER BY THE ITEM'S DATA ////////
const replaceTemplate = (template, product) => {
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

module.exports = replaceTemplate;