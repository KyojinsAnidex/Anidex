<p align="center">
  <img height = "70" width = "70" src="/assets/anidex.jpg" alt= "Anidex")
</p>

<p align="center"> <h1 align="center"> Anidex - Simple Online Anime Database </h1> </p>

A simple website to find and list one's favourite anime, discover characters, anime staffs, genres, studios, add items and finally, discuss anything with others in forums!


## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#main-technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Demonstration](#demonstration)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Resources](#resources-used)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## General Information

This project was our submission for CSE 216 Database Lab term project in Level 2/Term 2 at BUET CSE Undergrad.
We are both avid anime watchers and fan of all things anime, so we thought, why not try and make an anime database? Thus we got into this project and tried to make a simple website where users can -

- find and view anime and all related data
- make list of watched anime
- add new anime and other related data
- discuss with one another in a forum


## Main Technologies Used

<p align="center">
  <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" /> <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" /> <img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" /><img height="50" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" />       
</p>

**Backend:**
- Postgresql - version 14.4
- NodeJS - version 16.13
- Express JS - version 4.18

**Frontend:**
- Svelte JS - version 3.44

For convenience, backend guy thought of the name **SNEP stack**...


## Features

Without signing up, a user can:

- Use **full text search** in all anime, episode, character, genre, studio and personnel
- **View** all **anime**, top rated anime and all related ratings
- **View** anime by **genres and studios**
- **View** anime **episodes** and related ratings
- **View** anime **staffs and characters**, see which anime they had been in
- **View** the **forum**

After siging up, a user can furthermore:

- **Rate** anime and episodes
- **Add** anime to **watchlist and favourite list**
- **Add to database** new anime, episoded, character, personnel, genre and studio with pictures as applicable
- **Participate** in all discussion threads in the **forum**
- **Edit** their account information
- **Delete** database entry if admin privilege is given to user

In the backend, there is

- **RESTfull API** with endpoints for various data and operations with authentication if necessary
- **Authentication** with **JWT**
- Secure **password storage** using **Bcrypt**
- **File** upload and static hosting
- **Documentation of the RESTfull API using Swagger**, hosted in the backend server


## Setup

We are using a **ExpressJS** RESTfull API server in the backend to serve the **SvelteJS** frontend website with the data from **Postgres** database.

- **Backend:** To have the backend server up and running, please follow these [instructions](https://github.com/KyojinsAnidex/Anidex/blob/main/backend/README.md).
- **Frontend:** You can set up the frontend by going through these [steps](https://github.com/KyojinsAnidex/Anidex/blob/main/frontend/README.md).


## Demonstration

Here is a little demo of the running project:


## Project Status

Project is: _in progress_ .


## Room for Improvement

Room for improvement:

- Use **Postgresql** prepared queries and functions in backend
- Add linking of and throughout all **Svelte** pages in the frontend
- Add extended addition features in the frontend
- Possible cleanup of **Postgres** database structure
- Possible use of **Quill** for Rich Text Editor in forum


## Resources Used

- This project was inspired by the fan-made user generated anime database **[Anidb](anidb.net)** and not-so-fan-made anime database **[MAL](myanimelist.net)**.
- The backend was inspired by the RESTful API server idea of this [Course](https://www.udemy.com/course/react-nodejs-express-mongodb-the-mern-fullstack-guide/).
- The frontend was made using multiple tutorials and ideas, list of which can be found [here](https://github.com/KyojinsAnidex/Anidex/tree/main/resources#svelte).

Comprehensive list of all tutorials and other helpful resources are [here](https://github.com/KyojinsAnidex/Anidex/tree/main/resources).


## Acknowledgements

We would like to specially give our heartfelt thanks to our honourable professors **[Dr. Abu Sayed Md. Latiful Hoque](https://cse.buet.ac.bd/faculty_list/detail/asmlatifulhoque)** and **[Dr. A.K.M. Ashikur Rahman](https://cse.buet.ac.bd/faculty_list/detail/ashikurrahman)**.

We would also like to express our heartiest gratitude to our project supervisor **[Mr. Mohammad Tawhidul Hasan Bhuiyan](https://cse.buet.ac.bd/faculty_list/detail/tawhid)** for the very important guidances and suggestions he gave us throughout the project.

We would like to give our heartfelt thanks to **[Sihat Afnan](https://github.com/AfnanCSE98)** vaiya for his guidance starting the project and his help throughout the term. Without his starting pointers, we would not have managed to complete the project at all.

A special shoutout to **[this cat](https://github.com/Siam11651)** for helping us out anytime we needed. Check out his **[project](https://github.com/ePathshala-org)**, dude is one of the only two backend guys out of roughly 60 to use **CPP 🤲** in backend. Thanks man!

Which lands us to this other project with **CPP 🤲** backend - our one and only, the great **[Harmony](www.harmony-open.com) developer team** of **[Local Kiriyama](https://github.com/risenfromashes) and [Lord Sadat](https://github.com/Sadat-Hossain-01)** had done amazing work for their project AND also helped us out a lot. Specially it was Local Kiriyama's suggestion that made us use **SvelteJS** for the frontend. Thanks guys! Please check out their **[project](https://github.com/risenfromashes/harmony-web)**, Ashraf (Kiriyama) wrote a **[cpp http/2 server](https://github.com/risenfromashes/harmony-http)** from scratch just for this project.


## License

This project is licensed under [GNU General Public License v3.0](/LICENSE).
