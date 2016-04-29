Meet-up Event Planner
My second project for the Senior Web Developer Nanodegree. It displays train schedule for Bay Area Rapid Transit, using BART API.
Works without an Internet connection: assets are stored in cache via Service Worker, results from the BART API are stored in Local Storage.

Built with React and Material UI.

Installation

Node.js and NPM are required.

npm install
npm run build
Then dist folder must be served with a static server. NPM script is available if you have `python` installed globally:

npm run server
