# Software Requirement Specification

## Problem Statement

Finding the right course at the start of the semester can be a really challenging task for many. Furthermore, the task is more challenging for freshmen who might have no contact with alumni, their peer or the teachers. JHU provides a brief description of the courses however, sometimes that’s not enough and can be very confusing.  
How exactly can one base their entire future and the potential differences of offered courses, if that is all they’re left with. How can one accurately assess the difficulties of a course if they are forced to message individuals, grades above them, to get the entire gist of a semester long class through one source instead of a pipeline. How is somebody supposed to know how to prepare if they are forced to take the two weeks that the school offers you to get the grasp of a class, lose said grasp of a class, and drop, just to repeat the cycle again but now with a different subject and no way out. There is a need for an application which can analyze the reviews, extract relevant information and provide with charts and graphs which can explain various factors like Assignment/Syllabus difficulty etc.

## Potential Clients 

1. All students in JHU who would like to learn more about the courses they are interested in.
2. All students in JHU who would like to share their experience or opinion with others.
3. Professors who teach the course could add their own opinions on student evaluations.

## Proposed Solution 

The proposed solution is to build a responsive web application which has a sentiment analysis engine which can be accessed using a mobile or a desktop computer. The plan is to initially give students the chance to splurge all the details they want to give about a class by touching on a variety of different sectors of what would compile to make up the complete value the course has to offer, and a summary of the course as well, once the data is compiled on the student’s end it is shunted back to the server to perform some computations on the text and generate either a sentiment or a detailed analysis of the course through graphs and charts.

For students who want to learn more information about the course they are interested in, they can search with keywords and filters and even post a question which has not been answered yet. Based on the keywords, responses and overall gratifying or grating notions of the class the information will then be parsed through potentially a variety of methods, any student can access the reviews for any course. The professor of a particular course can review and share his thoughts about the course he would teach. Their review will have a higher priority than the student reviews. The reviews can be upvoted or downvoted depending on how helpful they are. The most helpful reviews will have a higher priority and will show up on top of the screen.

## Functional Requirements
### Must have:

1. As a user, I want to be able to search for courses using a search bar so that I can easily find the course that I am looking for.
2. As a user, I want to be able to view all the reviews, so that I can learn about others’ experiences with a class. 
3. As a user, I want to be able to view numerical data as well as text-based information, so that reviews are easier and faster to understand
4. As a developer, only previous or current students should be allowed to give a review, so this would prevent malafide reviews in our database   
5. As a user, there should be charts and Graph analysis based on information given through the sentiment analysis form (Might not need a certain sample size threshold for this specific analysis, because even one review could lead to a world of information), these graphs have to relate to different parts of the sentiment analysis form, so that the reviews could be digested in a different medium allowing us to compare courses and other selections properly.


### Nice to have:

1. As a user, I want to view an in-depth analysis of the reviews for a course, so that I can know what it will be like to take the class
2. As a user, I want to see the most helpful reviews first, so that I can efficiently go through only the reviews that are relevant and not waste time reading unhelpful reviews
3. As a user, I want to see recommended courses, so that I can more easily find courses that suit both my course requirements and preferences
4. As a user, I want to access the site from any browser, so that I easily use the website on different devices. 

## Non-functional Requirements:

1. No huge load time: Any of the graphs or charts which are generated, as a result  of the algorithms we use to account for any of the information being given, anything over 1-2 seconds is most likely overkill
2. Preferences don’t bog each other down; making sure that they don’t clash and slow down the program is a must.
3. Security of the users are paramount, reviews can be anonymous if need be. Important info like password should be kept secure. 
4. System meets the WCAG 2.1

## Software Architecture & Technology Stack: 

Website Application development; the most preferable is using the MERN stack
Language: Python for Data Analysis and Machine Learning. 
Architecture: Client - Server Architecture.

## Similar Apps: 

- Rate My Professor: Flaws include the fact that it only tacks on information about the professors but professors don’t always teach the exact same class and they’re teaching styles while maybe staying the same can also differ with harder or easier subjects
- JHUReviews: aims to do the same as our project goals. Anyone can review a course and also, it does not display the User’s own profile. User can only search using various filters and give out reviews in the form of rating from 1 to 5. Any worded review is analyzed by the website admin and summarized and averaged with the other reviews. There is no proper analysis regarding the various aspects of the course.  
### Similar applications geared towards instructors:
- explorance
- qualtrics
- gocanvas
- quicktapsurvey