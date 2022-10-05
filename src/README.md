This README file shall be updated to contain info about the specific details of your app source code (how it is organized/structured, assumptions made etc.)

Running the webpage =====================================================================
1.) Prerequisites: Make sure you have node.js aswell as the basic npm functions downloaded on your end.

If this node module needs anything specific to run locally know that note that your computer will probably have to download it locally. The only plugins used are 

antd
react
http-proxy-middleware
axios

2.) Run npm start to create an instance of a local host
Make sure in the package.json the instance of 
 "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
Is there to make sure that npm start is converted into npm react-scripts start

If not add it or run npm react-scipts start

