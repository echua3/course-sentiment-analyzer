<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites-and-installation">Prerequisites and Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
# About The Project

This project aims to create a web application that allows students to touch base on classes positively and negatively, giving an outlook that students can use to help their own understandings of the course at large and give them just the right amount of information to hopefully not confuse them even further!

We can accomplish this through allowing:
* Individuals to search for courses and write reviews based on those courses
* View reviews in a easy to digest format, so they can learn about other people’s journey in the class using automatic sentiment analysis

So at the end of the day the students can take back and use college for what it's actually meant to be, not a wild russian roulette service of random classes but a product, that you buy, and double, triple, quadruple check to make sure that you are getting the best bang for your buck.

## Webpage

The webpage utilizes course information from the SIS.API stored in a MongoDB database to contain information about all JHU Fall 2022 courses. Users can utilize various search filters and an autocomplete dropdown menu to find the course they are looking for.

Users login via the JHU SSO and create a profile upon first login.

The search function has four filter conditions: Course Title, Course Number, Credits and Department. Our algorithm supports fuzzy queries for the first 3 filters. And we provide the drop down options for the Department filter with all department options from both Whiting School of Engineering and Krieger School of Arts and Science. Users could use any combination of the 4 filters to search. A list of courses will show in the table if they meet all the criteria.

After clicking the desired course, it expands to show the Class Summary, Analysis, Add a Review, and View All Reviews windows. In Class Summary, the course title and description is shown. In the Chart Analysis, the average sentiment and average difficulty is displayed along with charts depicting the data. In Add a Review, Users are given a free-form text box to write a course review and rate the difficulty on a 1-5 sliding scale. After submission, users can view their review and all other reviews under the View All Reviews tab. Users can rate the helpfulness of reviews. 

The Reccommendations tab lists course recommendations for the current user based on interests indicated in the profile.

In the profile page, users can update their profile info, set their interests, as well as view and edit their course reviews.


## Sentiment Analysis

The 'finetune_review_dataset.ipynb' finetunes the 'bert-base-cased' model on the 'coursera course review' dataset. The training of the model takes 4 hours to process.
The 'course_review_analyser.ipynb' imports the finetuned model we created above and runs it on the review input by the user. To run this file in current state, you can use Google Colab.
The output is a rating between 1 to 5 and the confidence of the model in that rating itself. This helps us understand the emotion of the reviewer and it can be analyzed to give a final output on the website.
In the next iterations, this code will be attached to the backend so that the reviews uploaded on the website will be reviewed by the analyzer automatically.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

MERN stack, Python
<!-- 
This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples. -->

* Ant Design (AntD)
* React
* MongoDB
* Express
* Node.js
* Http-Proxy-Middleware
* Axios

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
# Getting Started

To run the website on the web hop over to https://jhu-courses.herokuapp.com/, and login is as either af3 or jy6! There are no extra steps needed within this iteration in order to make it run smoothly, just make sure that the logins work on your end if there are any problems message the group!

To get a local copy up and running follow these simple example steps.
<!-- Prerequisites -->
<!-- Installation -->
### Prerequisites and Installation
First, download and/or clone the repo on to your local machine.

Make sure you have Node.js as well as the basic npm functions downloaded.
If this node module needs anything specific to run locally note that your computer will probably have to download it locally. The plugins used are

* antd
* react
* http-proxy-middleware
* axios
* @material-ui/core --legacy or --force
* @material-ui/lab

### 1. Create the .env files  

In the server **src/server** directory:  
- Create `config.env` file and define the terms. (don't forget to remove the brackets)  

        ATLAS_URI={MONGO_DB_KEY_W_USERNAME_AND_PASSWORD}
        PORT={PORT}

In the **src/webpage** directory: 
- Create `.env` file and define the same server port as in the previous step.

        REACT_APP_API_ENDPOINT=http://localhost:{PORT}

### 2. Install Dependencies and Build the Application  

In the root directory:  `npm run build`
- this command should install the node-module dependencies for the client, server, and sentiment analyzer

### 3. Run the application
Start the server: `npm run start`

In the **src/webpage** directory: `serve -s build`

## Development Instructions
To run the server and client locally with nodemon and concurrently:

1. follow step 1 above

2. In the root directory,  
install dependencies: `npm run install`  

3. `npm run dev`


You should then see a successful connection message, follow the error prompt if one is listed to work out your issue.

Your app should be capable of running locally now!

<!-- USAGE EXAMPLES -->
# Usage

## Running Sentiment Analysis

You can view the tests for this branch of code here: https://colab.research.google.com/drive/1JEmG7M4BLVaegpEoqAs6XFxxKtGsbzmL?usp=sharing

## View Deployed Application

https://jhu-courses.herokuapp.com/

<!-- CONTRIBUTING -->
# Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap
View our progress on the project here! https://github.com/jhu-oose-f22/team-teamsentience/projects?query=is%3Aopen

<!-- CONTACT -->
## Contact

sentienceteam@gmail.com

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
