# Happy Tenants
> Keep track of the things that need to be done in your apartment

Happy Tenants is an information tracker that has two features:
- adding items to a todo list
- viewing the current chores for the week.

Working example: [https://michalakweb.github.io/happytenants/](https://michalakweb.github.io/happytenants/)

It's in beta phase and serves more as a showcase of technologies used in it. It's a React app that uses ReactRouter for routing, Redux for managing state and Firebase to serve data among different users.  It's also a Progressive Web App - you can add it to your Andoid/iOS homescreen! 

Currently, all users are allowed to make changes into the firebase and the chores for the week are set programatically. That will change in the future releases. 

## Future Beta Releases
* 0.2.1
    * Add tests through Jest
    * Figure out how to prevent GET requests from firebase when app is offline
* 0.2.2
    * Allow only registered users to read and write information to firebase
* 0.2.3
    * Push notifications
    * Integrate FontAwesome for React
* more to come!


## Release History
* 0.2 beta
    * The first proper release
* 0.0.1 beta
    * Work in progress

## Author

Mateusz – michalakweb@gmail.com

