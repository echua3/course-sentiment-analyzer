This README file shall be updated to contain info about the specific details of your app source code (how it is organized/structured, assumptions made etc.)

Running The Webpage =====================================================================
1.) Prerequisites: Make sure you have node.js aswell as the basic npm functions downloaded on your end.

If this node module needs anything specific to run locally know that note that your computer will probably have to download it locally. The only plugins used are 

antd
react
http-proxy-middleware
axios

2.) do npm install react-scripts

3.) Run npm start to create an instance of a local host
Make sure in the package.json the instance of 
 "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
Is there to make sure that npm start is converted into npm react-scripts start

If not add it or run npm react-scipts start

Running Sentiment Analysis ==========================================================
You can view the tests for this branch of code here: https://colab.research.google.com/drive/1JEmG7M4BLVaegpEoqAs6XFxxKtGsbzmL?usp=sharing

Webpage =============================================================================
The webpage in its current state is capable of running through the sis.api and using it to search up classes through running the sis.api through a middleware function setupProxy.js to convert into JSONP and then read the code through the App.js and Searchbar.js function and component respectively. 

Sentiment Analysis ==================================================================
The 'finetune_review_dataset.ipynb' finetunes the 'bert-base-cased' model on the 'coursera course review' dataset. The training of the model takes 4 hours to process.
The 'course_review_analyser.ipynb' imports the finetuned model we created above and runs it on the review input by the user. To run this file in current state, you can used Google Colab.
The output is a rating between 1 to 5 and the confidence of the model in that rating itself. This helps us understand the emotion of the reviewer and it can be analysed to give a final output on the website.
In the next iterations, this code will be attached to the backend so that the reviews uploaded on the website will be reviewed by the analyser automatically.

