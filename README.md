Requires node.js to be installed

<br>

1. Clone the repo:
	```shell
	git clone https://github.com/mateimarica/sample-express-server
	```

2. Open a terminal in the `/backend` directory and install the required packages:
	```shell
	npm install
	```

3. Run the `init` script to create a `.env` file using the `template.env`.
	```shell
	npm run init
	```

<br>

### Running locally

4. Start the server:
	```
	npm run dev
	```
	Your server is now online locally at [localhost:5000](http://localhost:5000) (or whatever port you set in `.env`)

<br>

### Running production (Unix)

4. Copy your SSL certificate files directly into `/backend/sslcert` and reference them in `.env`.
	
	For example, a Let's Encrypt certificate would need to be referenced as such:
	```env
	SSL_PRIVATE_KEY=sslcert/private.key.pem
	SSL_CERT=sslcert/domain.cert.pem
	```
	Different issuers may name these files differently.

5. Install screen to be able to run the server in the background
	```shell
	sudo apt update
	sudo apt install screen
	```

6. Start the server
	```
	npm run prod
	```

	This will open up the server in its own screen.
	- To leave (detach) the screen, do `Ctrl+A` then `Ctrl+D`
	- To kill the screen, do `Ctrl+C` to kill the server then type `exit` to terminate the screen.
	- To resume the screen, do `screen -r myserver`. The screen name can be changed in package.json
	- To check for if any screens are running, do `screen -ls`
	   - If a screen says `attached` you're in that screen
	   - If a screen says `detached`, you're *not* in that screen

<br>
