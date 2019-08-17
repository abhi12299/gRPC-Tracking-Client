## An example of grpc-web with React application

Server side code available [here](https://github.com/abhi12299/gRPC-Tracking-Server).

This example demonstrates how you can use grpc-web to track user activity on your website **using web worker.**

The `src/worker.js` file contains the web worker code for handling grpc requests and response.

>Please note that web workers do not support imports from other files. Therefore it needs to be compiled using `browserify`. Webpack doesn't seem to work for this scenario because it gives errors.

The `public/worker.js` file is the browserified worker file. Whenever you change the `src/worker.js` file, make sure to do `npx browserify src/worker.js > public/worker.js` to reflect those changes. (This must be executed romm the root of this project). 

>Also note that the web worker file tends to become very large. It already sits at around 270kB because of all the code from different libraries coming together there. So know what you are doing and its implications before using the web worker approach.