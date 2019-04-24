# Happy Tenants
> Keep track of the things that need to be done in your apartment

Happy Tenants is an information tracker that has two features:
- adding items to a todo list
- viewing the current chores for the week.

Working example: [https://michalakweb.github.io/happytenants/](https://michalakweb.github.io/happytenants/)

It's in beta phase and serves more as a showcase of technologies used in it. It's a React app that uses ReactRouter for routing, Redux for managing state and Firebase to serve data among different users.  It's also a Progressive Web App - you can add it to your Andoid homescreen! 

Currently, all users are allowed to make changes into the firebase and the chores for the week are set programatically. That will change in the future releases. 

<br/>

## Future Releases
* 0.3
    * setup, style login page
    * integrate auth info with redux
    * private/public routes
    * making data private to groups
    * demo link
* 0.4
    * chores can be now set by the group
* 0.5
    * other languages 
* 0.6
    * improve styling
* 0.7 
    * more complex testing
* 0.8
    * UI tips for new users
* 0.9
    * push notifications
* 1.0
    * Public release


<br/>


## Release History
* 0.2.3 beta
    * Only registered users can write information to firebase
* 0.2.2
    * Integrated FontAwesome for React
* 0.2.1
    * Added rendering Jest tests
* 0.2 
    * The first proper release
* 0.0.1 
    * Work in progress

<br/>
    
## Deployment

### `git clone https://github.com/michalakweb/happytenants.git`

### `npm install || yarn install`
Grab the dependencies.

### `npm start || yarn start`
Runs the app in the development mode.

### `npm test`
Launches the test runner in the interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

<br/>

## Author

Mateusz – michalakweb@gmail.com

