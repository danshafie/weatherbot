'use strict';

const Readline = require('readline');
const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

const matcher = require('./matcher');
const weather = require('./weather');
const {currentWeather} = require('./parser');

rl.setPrompt('> ');
rl.prompt();
rl.on('line', reply => {
  matcher(reply, data => {
    switch(data.intent) {
      case 'Hello':
        console.log(`${data.entities.greeting} to you`);
        rl.prompt();
        break;
      case "Exit":
        console.log('Lat3r hat3r');
        process.exit(0);
        break;
        case 'CurrentWeather':
  				console.log("Let me check...");
  				// get weather data from an API
  				weather(data.entities.city, 'current')
  					.then(response => {
              let parseResult = currentWeather(response)
  						rl.prompt();
  					})
  					.catch(error => {
  						console.log("There seems to be a problem connecting to the Weather service!");
  						rl.prompt();
  					});
  				break;
      default: {
        console.log('I dont know what that means');
        rl.prompt();
      }
    }
  })
})
