const fs = require('fs');
const superAgent = require('superagent');

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) reject('Could not find that file, sorry! 😥');
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write the file! 😥');
            resolve('Success');
        });
    });
};

// async await to resolve promises
const getDogPic = async () => {
    try {
        const data = await readFilePro('./dog.txt')
        console.log(`Breed: ${data}`);
    
        const promise1 = superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const promise2 = superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const promise3 = superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const all = await Promise.all([promise1, promise2, promise3])
        const allImages = all.map(el => el.body.message);
        console.log(allImages);
        // const res = await superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        // console.log(res.body.message);
    
        await writeFilePro('dog-image.txt', allImages.join('\n'));
        console.log('Saved the dog image into a new txt file');
    } catch (err){
        console.log(err);
    }
}
getDogPic();

// .then chaining to resolve promises
// readFilePro('./dooog.txt')
// .then(data => { 
//     console.log(`Breed: ${data}`);
//     return superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`)
// })
// .then(res => { 
//     console.log(res.body.message);
//     return writeFilePro('dog-image.txt', res.body.message);
// })
// .then(() => { 
//     console.log('Saved the dog image into a new txt file') 
// })
// .catch( err => {
//     console.log(err);
// })
