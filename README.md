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
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
# About The Project

The point of this project is to create a web application that can allow students to touch base on classes positively and negatively, giving an outlook that students can use to help their own understandings of the course at large and give them just the right amount of information to hopefully not confuse them even further! 

We can accomplish this through allowing: 
* Individuals to search for courses and write reviews based on those courses
* View reviews in a easy to digest format, so they can learn about other people’s journey through the class being searched through including automatic sentiment analysis

So at the end of the day the students can take back and use college for what it's actually meant to be, not a wild russian roulette service of random classes but a product, that you buy, and double, triple, quadruple check to make sure that you are getting the best bang for your buck.

## Webpage

The webpage in its current state is capable of running through the sis.api and using it to search up classes through running the sis.api through a middleware function setupProxy.js to convert into JSONP and then read the code through the App.js and Searchbar.js function and component respectively.

## Sentiment Analysis

The 'finetune_review_dataset.ipynb' finetunes the 'bert-base-cased' model on the 'coursera course review' dataset. The training of the model takes 4 hours to process.
The 'course_review_analyser.ipynb' imports the finetuned model we created above and runs it on the review input by the user. To run this file in current state, you can used Google Colab.
The output is a rating between 1 to 5 and the confidence of the model in that rating itself. This helps us understand the emotion of the reviewer and it can be analysed to give a final output on the website.
In the next iterations, this code will be attached to the backend so that the reviews uploaded on the website will be reviewed by the analyser automatically.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Built With

MERN stack, Python

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

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

To get a local copy up and running follow these simple example steps.
<!-- Prerequisites -->
<!-- Installation -->
### Prerequisites and Installation
Firstly download and/or clone the repo on to your local machine

Make sure you have node.js as well as the basic npm functions downloaded on your end.
If this node module needs anything specific to run locally know that note that your computer will probably have to download it locally. The only plugins used are

antd
react
http-proxy-middleware
axios

do `npm install react-scripts`

In the server src/server directory Run `npm start` to create an instance of a local host
Make sure in the package.json the instance of "scripts": { "start": "react-scripts start", "build": "react-scripts build", "test": "react-scripts test", "eject": "react-scripts eject" },
Is there to make sure that npm start is converted into npm react-scripts start

If not add it or run `npm react-scipts start`


<!-- USAGE EXAMPLES -->
# Usage

## Running Sentiment Analysis

You can view the tests for this branch of code here: https://colab.research.google.com/drive/1JEmG7M4BLVaegpEoqAs6XFxxKtGsbzmL?usp=sharing

## Running Website

If you have it installed correctly, run the website through: 
npm react-script start

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
