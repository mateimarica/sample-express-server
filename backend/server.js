// This is the starting point of your server

//--------------------------------------//
//     IMPORTING REQUIRED PACKAGES      //
//--------------------------------------//
require('dotenv').config(); // Load environment variables from the .env file
const express = require('express'),
      path = require('path'),
      http = require('http'),
      https = require('https'),
      fs = require('fs'),
      helmet = require("helmet"),
      compression = require('compression');

const app = express(); // Create the express app





//--------------------------------------//
//       SETTING UP SOME MIDDLEWARE     //
//--------------------------------------//
app.use(compression()); // Compress certain response bodies using gzip (makes site load quicker)
app.use(helmet()); // Sets certain response headers for increased security
app.use(express.json()); // Allows express to recognize incoming request objects as JSON objects
app.use(express.urlencoded({extended: true})); // Allows express to recognize incoming request objects as strings or arrays




//--------------------------------------//
//               ROUTING                //
//--------------------------------------//
app.use(express.static(path.join(__dirname, '..', 'frontend'))); // Deliver everything in the frontend directory as a static file

// Sending JSON as a response
app.get('/fruits', (req, res) => {
	const obj = {
		name: 'apple',
		color: 'green',
		weight: 100
	}

	const objString = JSON.stringify(obj); // Gotta turn object into string before sending it
	res.send(objString);
});

// Accepting a number and sending an image as a response
app.get('/get_image', (req, res) => {
	const number = parseInt(req.query.number); // Grab the number from the query params
	
	// Do some validation
	if (isNaN(number) || number < 0 || number > 4) {
		return res.status(400).send('Invalid request!');
	}

	// Send an image based on the user's given number 
	res.sendFile(path.join(__dirname, 'components', `sample_image${number}.jpg`));
});

// For any other GET requests, send a 404 page
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'frontend', '404.html'));
});



//--------------------------------------//
//        STARTING THE SERVER           //
//--------------------------------------//

// Create either a HTTPS or HTTP server
let server, port;
if (process.env.NODE_ENV === 'production') {
	const credentials = { // SSL certificate
		key: fs.readFileSync(process.env.SSL_PRIVATE_KEY),
		cert: fs.readFileSync(process.env.SSL_CERT)
	}
	server = https.createServer(credentials, app);
	port = process.env.PORT_PROD;
} else {
	server = http.createServer(app);
	port = process.env.PORT_DEV;
}

// Listen on a specific port
server.listen(port, () => {
	console.log(`Server started on port ${port}`);
});