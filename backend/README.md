### Running the server

#### Clone the repo

In a suitable folder, clone the repo:

` git clone https://github.com/Mohaimin41/Anidex.git `

#### Install dependencies

Move to /backend folder, install dependencies:

` cd ./backend`

` npm install `

#### Ok, forgot .env file

In the `./backend` folder, create a file named `.env`

In that file copy this:

```
#server port
PORT=5000

#database connection information
USER='me'
HOST='localhost'
DATABASE='anidex'
PASSWORD='password'
DATABASE_PORT=5432

#jwt key
JWT_KEY='sup3r_s3cr3t_d0nt_shar3'
```

#### Configuring the database

Go to `./sql` folder, follow the [instructions](https://github.com/KyojinsAnidex/Anidex/tree/main/backend/sql)

#### Running the server: 

We are using nodemon to have a continuously running development server. To start: 

` npm start `

To quit, press ` Ctrl + C ` and then type ` y `

