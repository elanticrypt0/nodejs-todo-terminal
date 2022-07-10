const fs = require('fs');

const fileName='./db/data.json';

const saveDB=(data)=>{

    fs.writeFileSync(fileName, JSON.stringify(data));

}

const readDB=()=>{

    return JSON.parse(fs.existsSync(fileName)? fs.readFileSync(fileName, { encoding:'utf-8' }) : false);

}

module.exports= {
    saveDB,
    readDB
}