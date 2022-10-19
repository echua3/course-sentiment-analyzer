> This README file shall be updated to contain info about the specific details of your app source code (how it is organized/structured, assumptions made etc.)

## Webpage 
Briefly, iteration 2 is a free-form text course review website for all JHU fall 2022 courses.

In the current state, the webpage utilizes course information from the SIS.API stored in a MongoDB database to contain information about all JHU Fall 2022 courses. Users can utilize various search filters and an autocomplete dropdown menu to find the course they are looking for.

At this stage, our search function has four filter conditions: Course Title, Course Number, Credits and Department. Our algorithm supports fuzzy queries for the first 3 filters. And we provide the drop down options for the Department filter with all department options from both Whiting School of Engineering and Krieger School of Arts and Science. Users could use any combination of the 4 filters to search. A list of courses will show in the table if they meet all the criteria.

After clicking the desired course, it expands to show the Class Summary, Add a Review, and View All Reviews windows. Users are given a free-form text box to write a course review and rate the difficulty on a 1-5 sliding scale. After submission, users can view their review and all other reivews under the View All Reviews tab.

## Server
A established mongodb poster and getter, in its current state it is divided up into the database, routes, and server itself, to instantiate connection uris we can then use to fetch or post data to mongodb core. Uses limit and skip functions to induce pagination in both the server and reviews.

## Sentiment Analysis 
The 'finetune_review_dataset.ipynb' finetunes the 'bert-base-cased' model on the 'coursera course review' dataset. The training of the model takes 4 hours to process.  
The 'course_review_analyser.ipynb' imports the finetuned model we created above and runs it on the review input by the user. To run this file in current state, you can used Google Colab.  
The output is a rating between 1 to 5 and the confidence of the model in that rating itself. This helps us understand the emotion of the reviewer and it can be analysed to give a final output on the website.  
In the next iterations, this code will be attached to the backend so that the reviews uploaded on the website will be reviewed by the analyser automatically.



