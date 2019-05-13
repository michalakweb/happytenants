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

* 0.3.7 beta
    * modularize CSS
    * split existing components into smaller chunks
    * Regex for 'missing colon' bug when joining a list
    * settings button to log out
    * fix offline bugs and wrap offline functionality in a simpler way than it is now
* 0.4
    * chores can be now set by the group
* 0.5
    * refactor code - further separate logic from presentation
    * other languages 
* 0.6 
    * type-checking in all files
    * more complex testing
* 0.7
    * UI tips for new users + Modal 
* 0.8
    * push notifications



<br/>


## Release History
* 0.3.6 beta
    * registration tips
    * styling overhaul for chores and buying list
    * improved styling for Login Page
    * fonts in css
* 0.3.5
    * replaced all 'any' types
    * added some addditional localStorage key/values in todoList
    * fixed a few UI bugs
    * refactored the code to use TypeScript
    * lists are private now and can be shared
* 0.3.1
    * setup, style login page
    * integrate auth info with redux
    * private/public routes
* 0.2.3 
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

