# Track Your Life

personal app to track health, meditation, sports and other goals.

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

### Webcomponents
Jut trying out.
- mycard.js -> the card that holds the doughnut chart with the achievements. Click on the chart to increase, click on the card title on top of the card to decrease the amount.
- mycardcoals.js -> the card that holds 3 switches to activate
