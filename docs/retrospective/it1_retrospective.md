# Retrospective Iteration 1
## Team Sentience

## __Iteration 1 Accomplishments__
### Delivered
- We used the SIS API to create a website platform that allows the user to search for any course that has been offered at JHU through its course title.
- The website displays a table including the School, Course Code, Course Title, Credits, and the Instructor.
- We trained a sentiment analyzer model. The 'finetune_review_dataset.ipynb' finetunes the 'bert-base-cased' model on the 'coursera course review' dataset.
- The model outputs a rating between 1 to 5 and the confidence of the model in that rating itself.
- Successfully implemented all the CRUD Features based in the MongoDB Database Backend code so that when connected to the front end we can successfully use the methods to tie everything together

### Not Delivered
- The current search function only supports searching by course title. We will add more filters to our search function like course name and department.

## Challenges
- Took hours to train the sentiment analyzer method.
- The iteration 1 deliverable came together at the last day, which was a little stressful.
- Front end to back end challenges. Integration of the search function code with the webpage design.
- Learning the implementation of MERN and all the seperate parts of the stack

## Reflection for Iteration 2
- To do a better job as a team, we can better define and specify every person's role, especially in the final deliverable for that iteration.
- We can update and push the github repository more often.
- Better utilize the project backlog by defining more specific tasks for each user story.
- We should update the readme as often as we get new features put out on the project, at least in terms of how to run the deliverable
- To make it easier on us in the long run we should seperate the frontend into more components as designated in the UML as we go along with this iteration
