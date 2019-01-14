# Welcome to NSS student tracker/squasher

## Live Demo
https://nssstudenttracker.herokuapp.com/

**Purpose** This app allows NSS students to track their assigned exercises

### Install
You will need two npm packages installed in order to run this web app

**[React](https://www.npmjs.com/package/create-react-app)**
```npm i create-react-app```

**[JSON-Server](https://www.npmjs.com/package/json-server)**
```npm i json-server```

In the terminal type `npm i` <br>
You will want to run two termnials.<br>
In one of them cd to src/database and type `json-server Database.json -p 5002`.<br>
In the other, you will type `npm start`.<br>
Page will load on login page

### Use ###
The student initial view is of a login in form for previous register user. Link to register is in the boot right. The login in form accepts two input fields. One for name and the other for password. A new user will want to click the register link and will be routed to a registration form

Registration for has a input field for name,password and cohort number. It also has two radial buttons to identify if the use is an student or instructor. Once the form is completed the user should click the register account and their info is saved to the database.

Depending is the user is registered as student or instructor, they will be routed to separate views dependent on user role.

### Student view ###
A user that is logged in as student will see a page with a welcome message, a navigation bar and a list of exercises the student has not started. A click on a exercise name will expand the card that contains a form. A student can leave a link for their github repository. The form also contains two check boxes denoting complete and stuck as well as a text area for student feedback. The navbar routes to the completed view and a stuck view. Exercises marked completed or stuck will be removed from main student view on the next visit on the page.
On the completed view a student can review their completed exercises. Likewise on a student's stuck view, a student can view the exercises marked as stuck.

### Instructor View ###
Instructor view is currently a work in progress. This README will be updated as more features are added to Instructor view.
Instructor view has a nav bar with links to filter by student and by exercise
