![TripPlanner Logo](./public/img/logo-dark.svg#gh-light-mode-only)
![TripPlanner Logo](./public/img/logo-light.svg#gh-dark-mode-only)

This is [TripPlanner](https://tripplannerx.web.app/), a quick project for Lendis, created with [`NEXTJS`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), Typescript.

## Getting Started

First, run the development server:
Rename .env-sample to .env and edit content as required (update with required API)

```bash
npm run dev
```

Open [http://localhost:8502](http://localhost:8502) with your browser to see the result.

## About
This project is about a trip planner, built on top of the Deutsche Bahn’s open API. The [wrapper API](https://v5.db.transport.rest/) from [transport.rest](https://transport.rest/) was used instead of Deutsche Bahn’s official API.

A user can specify the name of the city or the station s/he wants to start his/her journey, along with the day and time, and get back the journey’s details.

The journey can occur with all available modes of transportation, and the language used for all messaging is in English.


## Features

Few features where included:

- Mobile responsive.
- Dark and Light Mode.
- Date/Time Picker.
- Deploy to Firebase.

You can check out [TripPlanner](https://tripplannerx.web.app/) for a preview!

## Deploy on Firebase

[Google's Firebase](https://console.firebase.google.com/) was the choose for deployment.
Here are simple steps to deploy to Firebase.

1. Create an firebase account on [Firebase](https://console.firebase.google.com/) (you will already have one if you own a gmail account)
2. Locally install firebase in the project
```bash
npm i firebase-tools -D
```
3. Login into your firebase account from the project
```bash
node_modules/.bin/firebase login
```

4. Initialise hosting
```bash
node_modules/.bin/firebase init hosting
```
5. Follow instructions of the subsequent prompts, and answer accordingly
```bash
create or use existing project, eg - tripplanner or whatever name you like

? What do you want to use as your public directory? out
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? No
? File out/404.html already exists. Overwrite? Yes
✔  Wrote out/404.html
? File out/index.html already exists. Overwrite? Yes
✔  Wrote out/index.html
```

6. Build your project
```bash
npm run build
```

7. Deploy
```bash
node_modules/.bin/firebase deploy --only hosting
```
