# Track Your Life

personal app to track health, meditation, sports and other goals.

<img height="600px" src="https://user-images.githubusercontent.com/44790691/105927254-ebcba800-6043-11eb-92ed-e8d21cb103de.gif"/>

### Database & Hosting
- you need a firebase account and the [firebase CLI tools](https://github.com/firebase/firebase-tools). `npm install -g firebase-tools`
- you will need to setup a custom firebase project.
- **database**: you should decide for a database to store all data. I decided to use a firebase firestore.
- **hosting**: firebase provides hosting for free. Just run `firebase deploy --only hosting` inside the main directory and connect your existing firebase project or create a new one.

### Customize
Change the values in `public/js/initWebComponents.js` to customize your goals / colors etc...

### Folder Structure
**public**: all the files hosted on firebase are stored here
**functions**: all cloud functions are store here (not in use yet, but I set it up since I maybe will use it)

### Database Structure
create a `users` collection. Initialize a new entry and put the generated userId inside `firebaseInit.js` (line 29). Then make a subcollection of `days`. This subcollection has to have id's in the form `YYYY-MM-DD`.

### Webcomponents
Jut trying out.
- mycard.js -> the card that holds the doughnut chart with the achievements. Click on the chart to increase, click on the card title on top of the card to decrease the amount.
- mycardcoals.js -> the card that holds 3 switches to activate
