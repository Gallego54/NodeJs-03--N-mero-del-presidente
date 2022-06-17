import http from 'http'
import getView from './src/modules/path.js';
import primeProvider from './src/modules/primeNumberProvider.js';
import {searchCSS, insertCSS } from './src/modules/CSSsearcher.js';


const PORT = 8000;


http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    if (req.url === '/result') {
        const HTMLNOCSS = getView(req.url);
        const CSS = searchCSS('./src/public/css/', 'style.css');
        const HTML = insertCSS(HTMLNOCSS, CSS);
        const INDEX = HTML.search('<body>')+'<body>'.length;

        getParams(req, (D) => {
            const primeConsulter = new primeProvider();
            primeConsulter.primeCheckRange(D.get('a'), D.get('b'));  
            const presidentNumbers = getNumbersPresident(primeConsulter);


            const FINAL_HTML = insertStr(HTML, INDEX, strArrayMapping(presidentNumbers, ', '));

            return res.end(FINAL_HTML)
        })


        //return res.end(getView(req.url));
    } else {
        const HTMLNOCSS = getView(req.url);
        const CSS = searchCSS('./src/public/css/', 'style.css');
        const HTML = insertCSS(HTMLNOCSS, CSS);
        const INDEX = HTML.search('<body>')+'<body>'.length;

        return res.end(HTML);
    }

}).listen(PORT, _ => {
    const primeConsulter = new primeProvider();
    primeConsulter.primeCheckRange(10, 50);
    getNumbersPresident(primeConsulter)

    console.log("PORT: " + PORT)
})


const strArrayMapping = function(arr, bt){
    var str = "<p class='numbers'>";
    arr.forEach(element => {
        str+=element+bt;
    }); 

    return str.slice(0, str.length-2)+'</p>';
}

const insertStr = function (STR, INDEX, DATA) {
    return STR.substring(0, INDEX)+
    DATA
    +STR.substring(INDEX, STR.length)
}

const getNumbersPresident = function ( primeConsulter ) {
    const finalCollection = [];
    primeConsulter.getPrimeCollec().forEach(element => {
        if( 
            primeConsulter.
            primeCheck( digitSum(element) ) 
        ){
            finalCollection.push(element)
        }
    });

    return finalCollection;
}

const digitSum =  function ( primeNumber ) {
    const strNumber = String(primeNumber);
    let acum = 0;

    for (const e of strNumber) {
        acum += Number(e);
    }
    
    return acum;
}   


const getParams = function(req, callback){
    let Params = ''; 
    req.on('data', D => {
        Params += D;
    })

    
    req.on('end', _ => {
        const FormParams = new URLSearchParams(Params);
        callback(FormParams);
    })
    
}

