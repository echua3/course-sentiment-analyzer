# Retrospective Iteration 4
## Team Sentience

## __Iteration 4 Accomplishments__
### Delivered
- Edit and delete review feature
- Ability to upvote and downvote reviews (and remove previous votes)
- Improved Profile Page with ability to edit profile information
- View reviews on profile page
- Course Reccomendation Page listing courses based on user interests
- Course Summary displays course description
- User Login and Authorization to view reviews and course recommendations
- Deployed application on Heroku

### Not Delivered
- JHU SSO Authentication - the JHU IT Risk department has a 7-10 day turnaround

## Challenges
- Creating the correct build instructions for Heroku to build and deploy the application. Tried multiple methods, and ended with using a root package.js file that had instructions for building the client and server.
- Routing problems that were present only in deployment, had to make sure the server.js file was getting the correct path names.
- The use of setting functions causing rerendering loops when working on the voting feature.
- the useState() function returning previous values when using pagination, so the votes did not correspond to the correct reviews. Had to make sure the components were unique using keys to give the elements a stable identity.
- The MongoDB site was not working (collections were unavailable) for hours the day before the deadline. So we could not check our database during that time.
-Collecting data from different collection in mongodb. Since it's not a relational database, it takes some time to figure out how to collect data we need in 3 colletions.

## Reflection for Iteration 5
- We could have better utilized soft deadlines for major features to ensure that we leave more time for integrating features together
- Overall throughput for the last iteration improved significantly, just need to continue doing this for iteration 5
- We need not only implement the new features but also pay attention to the feedback of the last iteration.
