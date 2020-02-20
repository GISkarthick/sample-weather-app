const express = require('express')
const request = require('request');
const app = express()

const port = 8000

const apiKey = '0049058f942c6a19bfa550036cbcb840';
//https://api.openweathermap.org/data/2.5/forecast?q=chennai&appid=0049058f942c6a19bfa550036cbcb840

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => 'Example app listening on port ${port}!');

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askCity (){
    rl.question("Please Enter the city ? \n", function(name) {
        if(name){
            let city = name;
            let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`

            request(url, function (err, res, body) {
                if(err){
                    console.log("Check your internet and please try again");
                    rl.close();
                } else {
                    let parsedResponse = JSON.parse(body)
                    let lists = parsedResponse["list"];

                    if(lists === undefined){
                        console.log("No Weather found for that city");
                    }else{
                        let WeatherObj = [];
        
                        lists.forEach(value => {
                            let tempObj = value.main;
                            delete tempObj['feels_like'];
                            
                            WeatherObj.push({"dt": value.dt, "temp": tempObj, "wind": value.wind});
                        });
        
                        console.log(JSON.stringify(WeatherObj, null ,2));
                    } 
                    ContinueOrQuit();
                }
            });
        }else{
            console.log("Cityname is mandatory");
            askCity()
        } 
    });
}

function ContinueOrQuit(){
    rl.question("Contine Or Quit (yes or no) ? (no) \n", function(name) {
        if(name && name.toLowerCase() === 'yes'){
            askCity()
        }else{
            console.log("Quitting ????? Thanks"); rl.close()
        }
    });
}

askCity();

rl.on("close", function() {
    //console.log("\nBYE BYE !!!");
    process.exit(0);
});


