import http from 'http'
import getView from './src/modules/path.js';
import primeProvider from './src/modules/primeNumberProvider.js';


const PORT = 8000;


http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    if (req.url === '/result') {
        const HTML = getView(req.url);
        const INDEX = HTML.search('body')+6;

        getParams(req, (D) => {
            const primeConsulter = new primeProvider();
            primeConsulter.primeCheckRange(D.get('a'), D.get('b'));  
            const presidentNumbers = getNumbersPresident(primeConsulter);


            const FINAL_HTML = insertStr(HTML, INDEX, strArrayMapping(presidentNumbers, ', '));

            return res.end(FINAL_HTML)
        })


        //return res.end(getView(req.url));
    } else {
        return res.end(getView(req.url));
    }

}).listen(PORT, _ => {
    const primeConsulter = new primeProvider();
    primeConsulter.primeCheckRange(10, 50);
    getNumbersPresident(primeConsulter)

    console.log("PORT: " + PORT)
})


const strArrayMapping = function(arr, bt){
    var str = "";
    arr.forEach(element => {
        str+=element+bt;
    }); 

    return str.slice(0, str.length-2);
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

