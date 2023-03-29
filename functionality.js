const fs = require('fs');
let spec_url = "https://quizlet.com/360507593/clep-principles-of-management-flash-cards/"
const express = require('express')
const webpagedir = `${__dirname}/srv`;
const app = express();

//   to use the static directory webpagedir
app.use(express.static(webpagedir, { index: 'page.html' }));


// Instruct the app to listen on port 3000
app.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});

app.get("/range", async (req, res) => {
    // let start = req.query.start;
    // let stop = req.query.stop;
    // start = parseInt(start);
    // stop = parseInt(stop);
    let data = await parseBoofFile();
    // data = data.slice(start, stop);
    //
    res.json({
        status: "success",
        values: data,
    });

});

// const getDataHTML = async () => {
//     let data = await fetch(spec_url)
//     let body = await data.text();
//     let lines = body.split("\n");
//     lines.forEach((line) => {
//         fs.appendFile("myfile.txt", line, (err) => {
//         });
//     })
//
//     let newData = "";
//
//     await new Promise((resolve) => {
//         fs.readFile("myfile.txt", 'utf8', (err, data) => {
//                 resolve(data);
//                 newData = data;
//         });
//     });
//     let termsArr = [];
//
//
//     let doneWithFile = false;
//     while(!doneWithFile){
//         let index1 = newData.indexOf("TermText notranslate lang-en");
//         if(index1 === -1){
//             doneWithFile = true;
//         } else {
//             newData = newData.substring(index1);
//             let brackIndex = newData.indexOf(">");
//             let body = newData.substring(brackIndex + 1, newData.indexOf("</span>"));
//             //console.log(body);
//             termsArr.push(body);
//             await fs.appendFile("output.txt", body, (err) => {
//             });
//             newData = newData.substring(newData.indexOf("</span>"));
//         }
//     }
//
//
//     // let currString = "";
//     // for (let i = 0; i < lines.length; i++) {
//     //     if (lines[i].includes("class=\"TermText notranslate lang-en\"")) {
//     //         let j = i + 1;
//     //         while (!lines[j].includes("/span")) {
//     //             currString = currString + lines[j];
//     //             j++;
//     //         }
//     //         termsArr.push(currString);
//     //     }
//     // }
//     termsArr.push("hello")
//     console.log(termsArr)
//
//     //console.log(lines)
//     // fs.writeFile('myfile.txt', '', function(err) {
//     //     if (err) throw err;
//     //     console.log('File cleared!');
//     // });
// }

const parseBoofFile = async () => {
    let lines = "";
    await new Promise((resolve) => {
        fs.readFile("correctFile.txt", 'utf8', (err, data) => {
            resolve(data);
            lines = data;
        });
    });
    let splitLines = lines.split("\n");
    let isTerm = true;
    let termsArr = [];

    for(let i = 0; i < splitLines.length; i++){
        if(isTerm  && splitLines[i] !== "\r"){
            termsArr.push(splitLines[i].replace("\r", ""))
        } else if (!isTerm && !splitLines[i] === "\r"){
            let j = i + 1;
            let termDef = "";
            while (splitLines[j] !== "\r"){
                termDef = termDef + splitLines[j]
                j += 1;
            }
            termDef.replace("\r", " ");
            termsArr.push(termdef);
        } else {
            isTerm = true;
        }
    }

    let completeTerms = []
    for (let i = 0; i < termsArr.length; i = i + 2){
        if(i !== termsArr.length-1){
            let card = {
                term: termsArr[i],
                def: termsArr[i + 1],

            }
            completeTerms.push(card);
        }
    }
    //console.log(completeTerms)
    return completeTerms;
}
