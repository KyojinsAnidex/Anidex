### How to create the necessary Database

#### Creating a new postgresql user

Assumming you have postgresql installed and and working, log in to it via command line: 

` psql -U postgres `

Then create a new role which serves as an user in postgres:

` CREATE ROLE me WITH LOGIN PASSWORD 'password'; `

**This is the user name and password used in backend for now.**

Grant user 'me' database creation ability: 

` ALTER ROLE me CREATEDB; `

Logout: 

` \q `

**Drop previous ***anidex*** :**

` dropdb -U me -d anidex `

and log back in as user 'me':

` psql -d postgres -U me `

The prompt should look like this:

` postgres=> `

#### Creating a database

First list all database just to check:

` \l `


**Now create database ***anidex*** :**

` CREATE DATABASE anidex; `

Connect to *anidex* :

` \c anidex `

Just to check connection parameters: 

` \conninfo `

#### Creating the tables from this sql: 

Copy and save the .sql file. Then copy it's absolute save path.

Then in psql command prompt connected to *anidex* as user *me*, we load the file:

**Some notes: all the '\\' in the path has to have another '\\' before them, like `E:\t\f.sql` becomes `E:\\t\\f.sql`.**

Type in the command prompt: 

` \i 'path_to_sql_in_single_quotes_with_the_extra_slashes' `

Fingers crossed it should work...

If you get to the prompt as ` anidex=> ` the script has ended it's running. Check all tables:

` \dt `

Result should be like this:

```

              List of relations
 Schema |         Name          | Type  | Owner
--------+-----------------------+-------+-------
 public | anime                 | table | me
 public | animecharacter        | table | me
 public | animeisofgenre        | table | me
 public | animepicture          | table | me
 public | animestaff            | table | me
 public | animestar             | table | me
 public | animestudio           | table | me
 public | characters            | table | me
 public | charactervoiceactor   | table | me
 public | episode               | table | me
 public | episoderates          | table | me
 public | genre                 | table | me
 public | personnel             | table | me
 public | review                | table | me
 public | reviewvote            | table | me
 public | studio                | table | me
 public | users                 | table | me
 public | watchlist             | table | me
 public | watchroom             | table | me
 public | watchroomparticipants | table | me
(20 rows)
```