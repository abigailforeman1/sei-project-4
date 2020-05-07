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
This app has been deployed on Heroku and can be found here: https://interview-story-project4.herokuapp.com

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

The interview questions section of the story was built with one React component that sets state to the next question every time the user clicks the next button and uses their overall score to determine which final component to render. The player must pass with a score of 4 in order to have a successful interview, meaning that they can miss out on the luck points but still pass if they answer every question correctly. Conversely, they can miss up to 2 interview questions but still pass if they had good luck.

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


4. Profile

When a new user registers, their information is saved to the jwt_auth user model in our Django database. This is then used to populate their profile page. When the current logged in user clicks on their own profile, they see an edit button which can be used to update more information to their profile including a profile image using Cloudinary.

![screenshot of profile page](https://github.com/abigailforeman1/sei-project-4/blob/master/frontend/src/assets/profile.png)

## My contributions

1. Django backend models

I focused on building the backend of our app using Python and Django REST framework. We originally planned to build 4 models for the user, businesses, interview questions and comments, and we created the ERD below to help us distingush the relationships between them. This made it easier to visualise our database and realise that we didn't need to build all 4 models.

![screenshot of ERD](https://github.com/abigailforeman1/sei-project-4/blob/master/frontend/src/assets/database.png)

We ended up just building a businesses model from scratch and using Django's abstract jwt_auth user model but adding some of our own functionality. We added the businesses model onto the user model with a many to many relationship so that we could populate the users with their chosen businesses and eventually display this on the users profile.

```javascript
class User(AbstractUser):
    email = models.CharField(max_length=40, unique=True)
    profile_image = models.CharField(max_length=500, null= True, blank=True)
    location = models.CharField(max_length=100, null=True, blank=True)
    privacy = models.BooleanField(default=True)
    looking_for_work = models.BooleanField(default=True)
    website = models.CharField(max_length=200, null=True, blank=True)
    businesses = models.ManyToManyField('businesses.Business', related_name='user', blank=True)

    def __str__(self):
      return self.email
```

2. Frontend profile page 

Another part of the app that I focused on was the users profile page and edit page. This required multiple get requests to the database some checks to see if the user had saved both businesses to their user model. If there was none of only one then that section of the profile page won't render.

```javascript
  componentDidMount = async () => {
    const payload = Auth.getPayload().sub
    try {
      const res = await axios.get(`/api/users/${payload}`)
      console.log(res.data)
      this.setState({ user: res.data })
      if (res.data.businesses.length === 2) {
        return this.getBusinesses()
      } else {
        return
      }
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }
```

For the profile edit page, I made a get request to the database to retrieve the users information already stored and set state with this. I then built a user edit form and refactored this out into a seperate functional React component. When the user clicks the update button, a patch request is sent to the database so that only the updated fields are targeted, along with a header and bearer token for authentication. I also created handleChange functions that set state when ever a change event occured.

```javascript
  componentDidMount = async () => {
    const payload = Auth.getPayload().sub
    try {
      const res = await axios.get(`/api/users/${payload}`)
      this.setState({ data: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const data = { ...this.state.data, [e.target.name]: value }
    this.setState({ data })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const payload = Auth.getPayload().sub
    try {
      const res = await axios.patch(`/api/users/${payload}/edit`, { ...this.state.data }, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/profile/${payload}`)
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleChangeImage = ({ target: { name, value } }) => {
    const newValue = value
    const data = { ...this.state.data, [name]: newValue }
    this.setState({ data })
  }
```

3. Styling

I enjoyed illustrating all the cartoons for this project and putting a personal touch on it. We also used Bootstrap for the styling framework which was new for both of us and fun to play around with. 

## Key learnings:
1. The versatility of using Boolean logic

The use of Boolean's answered a lot of problems in our project. One fun use was randomly deciding whether our player's luck was true or false, and this determining which path of the story they take.  

2. Using React to build a game 

This project demonstrated how perfectly suited React is for building a multiple choice game or quiz. We were able to store the interview questions and their multiple choice answers in state and use this data when needed. We could also easily pass through the players score as props to other components of the project and use this to find their outcome of the game.

## Challenges and future improvements:

Manipulating django's abract user model proved to be a challenge.
When making a "put" request onto the user model, we ran into a 422 error (unprocessable entity). It was requiring that the user username, email, password and password confirmation be resent. We did not want to insert a prompt midway through a game to ask for password and password confirmation, so we added context= "is_create" onto the user validation serializer that only required password and password confirmation on creation. We then added this context to the updated_user data that we sent in a patch request instead of a put request. We then added partial = true on the updated_user in order to forego the email and username information it was requesting.

Additional functionality that we plan to add is the ability for users to leave comments on another user's page, hide users from the search index if they check "privacy" as true on their profile edit page, and use latitude and longitude of businesses to be able to display (using mapbox) their locations.
