![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# General Assembly Project 4: Interview Story

## Goal:
Build a full-stack application with React, Django and Python.

## Timeframe:
8 days

## Team mates:
* [Astara Cambata](https://github.com/astara303)

## Technologies used:
* HTML5
* SCSS & Bootstrap
* JavaScript
* React.js
* Python
* Django Rest Framework
* Insomnia
* GitHub
* Cloudinary
* https://www.quickdatabasediagrams.com/

## Deployment:
This app has been deployed on Heroku and can be found here: interview-story-project4.herokuapp.com

## Getting started:
Use the clone button to download the source code. In the terminal enter the following commands:

```
<!— To install all the packages listed in the package.json: —> $ yarn 
<!- Navigate into the shell -> $ pipenv shell
<!— Run the app on localhost:8000 : —> $ python manage.py runserver
<!— Check the console for any issues and if there are any then check the package.json for any dependancies missing —>
<!- Navigate to http://localhost:8000/>
```

## Brief:
Either in pairs or solo, we had 1 week to build a full-stack application by making our own React front-end and our own backend using a Python Django API using Django REST Framework to serve our data from a Postgres database.

This was my fourth and final project while on General Assembly’s SEI course.

## User experience:
Interview Story is an interactive choice-based game where users can immersively take part in a junior coding interview from the moment they wake up to finding out if they were successful or not. The choices they make along the way are saved to the backend database for use on their frontend profile.

1. Homepage, register & login

The user lands on the homepage where they are encouraged to register or login to play. The only feature they can explore before logging in is the connect page where they can browse other users and their game choices. Once registered users will be given a personal profile page ready to customise.

![screenshot of homepage](https://github.com/abigailforeman1/sei-project-4/blob/master/frontend/src/assets/codehome.png)

2. Start your story

The main premise of our website is the immersive interview story. Users are guided through a series of realistic events via our pre-written story with different choices and outcomes. The first 2 scenarios require the user to pick an outfit for their interview and a hot drink from the cafe. The choices they make get sent to our Django database with a patch request so that they can check them out later.

![screenshot of first story](https://github.com/abigailforeman1/sei-project-4/blob/master/frontend/src/assets/wakeup.png)

![screenshot of second story](https://github.com/abigailforeman1/sei-project-4/blob/master/frontend/src/assets/nearlytime.png)

We built parts of the story so that the outcome is decided by luck (or a Math.random function more specifically!) This meant that for a number of the story pages, there were 2 options for the user to choose from, but each of those had a positive and a negative outcome. This made it more exciting and unpredictable. 

![screenshot of third story](https://github.com/abigailforeman1/sei-project-4/blob/master/frontend/src/assets/choice.png)

The interview questions section of the story was built with one React component that sets state to the next question every time the user clicks the next button and uses their overall score to determine which final component to render.

![screenshot of interview](https://github.com/abigailforeman1/sei-project-4/blob/master/frontend/src/assets/interview.png)

```javascript
  handleGuess = e => {
    if (this.state.playerGuess) return
    let playerGuess = ''
    let score = this.state.score
    if (e.target.textContent === this.state.questionObj.correctAnswer) {
      playerGuess = 'Correct'
      score += 1
    } else {
      playerGuess = 'Incorrect'
    }
    this.setState({ playerGuess, score })
  }
```

3. Connect

Once you have finished your interview journey, you can browse other users profiles and see what choices they made.

![screenshot of connect page](https://github.com/abigailforeman1/sei-project-4/blob/master/frontend/src/assets/connect.png)


4. Profile - and profile edit 

When a new user registers, their information is saved to the jwt_auth user model in our Django database. This is then used to populate their profile page. When the current logged in user clicks on their own profile, they see an edit button which can be used to update more information to their profile including a profile image using Cloudinary.

![screenshot of profile page](https://github.com/abigailforeman1/sei-project-4/blob/master/frontend/src/assets/profile.png)


## My contributions

1. Django backend models - add database diagram
While Astara took on most of the frontend functionality, I built out the backend using Python and Django REST framework.

2. Profile - and profile edit 

3. Styling

## Challenges and future improvements:







Django backend:
Manipulating django's abract user model proved to be a challenge.
When making a "put" request onto the user model, we ran into a 422 error (unprocessable entity). It was requiring that the user username, email, password and password confirmation be resent. We did not want to insert a prompt midway through a game to ask for password and password confirmation, so we added context= "is_create" onto the user validation serializer that only required password and password confirmation on creation. We then added this context to the updated_user data that we sent in a patch request instead of a put request. We then added partial = true on the updated_user in order to forego the email and username information it was requesting.

React frontend:
We had to form a better understanding of spreading in order to send this patch request through on the front end to the correct part of the user model where we wanted to store the information (one business pk in the businesses array)

We had a serializer to populate the business model information when the user model is called for quick access to the business information when rendering the user profile. But this created an issue when trying to add more than one business to the businesses array on the user model. The view we had written for the patch request was expect a pk, not an object, so when we tried to send through the second pk, the first had populated as an object, and because we had spread the previous user information into state to re-send in the patch request, we were sending an array of one object and one pk. Django didn't like that! So we removed the serializer to populate the business model, and make a get request to the businesses url with the index of the businesses, taken from the user's array of businesses that held the pk of the business.

For the story, we originally only had one choice (with four results), which would spawn a particular button that would link to the corresponding page, and that page held the corresponding "luck score" in state. This was then passed down as a prop when we rendered the subsequent page within the page that the choice is made. 
This ended up changing when we added in an additional choice (with an additional four results) and decided to pass the score down as a prop from the beginning. But for the first choice, we pass through a score and text to the same page, simply displaying that text passed as a prop, making the page appear to be different when you made different choices. For the next choice, however, we passed down the score as a prop but needed more story text, so we did link through to four different pages depending on your second choice. From here, you begin your interview, which is rendered within the page and the score passed down to as a prop.

For the score, the player can accrue a maximum of 6 points: 2 from luck and 4 from the interview. The player must pass with a score of 4 in order to have a successful interview, meaning that they can miss out on the luck points but still pass if they answer every question correctly. Conversely, they can miss up to 2 interview questions but still pass if they had good luck. We feel that this game model accurately describes the sensation that many job-hunters experience, which is that landing your perfect job can take luck as much as skill.

Additional functionality:
The ability for users to leave comments on another user's page
Hide users from the search index if they check "privacy" as true on their profile edit page
use latitude and longitude of businesses to be able to display (using mapbox) their locations
