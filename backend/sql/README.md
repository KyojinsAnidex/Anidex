### How to create the necessary Database

### Creating a new postgresql user

Assumming you have postgresql installed and and working, log in to it via command line: 

` psql -U postgres `

Then create a new role which serves as an user in postgres:

` CREATE ROLE me WITH LOGIN PASSWORD 'password'; `

**This is the postgres database user name and password used in backend for now.**


Grant user 'me' database creation permission: 

` ALTER ROLE me CREATEDB; `

Logout: 

` \q `

and log back in as user 'me':

` psql -d postgres -U me `

The prompt should look like this:

` postgres=> `

**Drop previous ***anidex***, if you had created it before by chance:**

` DROP DATABASE IF EXISTS anidex; `


### Creating the database

First list all database just to check:

` \l `

**Now create database ***anidex*** :**

` CREATE DATABASE anidex; `

Connect to *anidex* :

` \c anidex `

Just to check connection parameters: 

` \conninfo `

should give this: 

` You are connected to database "anidex" as user "me" on host "localhost" (address "::1") at port "5432". `


### Creating the tables from this sql file: 

Copy and save the .sql file. Then copy it's absolute save path.

Then in psql command prompt connected to ***anidex*** as user ***me***, we load the file:


**Note: All the '\\' in the path has to be escaped another '\\' before them, like `E:\t\f.sql` becomes `E:\\t\\f.sql`, or replaced with /, like `E:\t\f.sql` becomes `E:/t/f.sql` .**


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
 public | animediscussion       | table | me
 public | animeisofgenre        | table | me
 public | animepicture          | table | me
 public | animestaff            | table | me
 public | animestars            | table | me
 public | animestudio           | table | me
 public | characters            | table | me
 public | charactervoiceactor   | table | me
 public | discussionentries     | table | me
 public | discussionheads       | table | me
 public | discussiontags        | table | me
 public | episode               | table | me
 public | episoderates          | table | me
 public | genre                 | table | me
 public | personnel             | table | me
 public | studio                | table | me
 public | tagcloud              | table | me
 public | users                 | table | me
 public | watchlist             | table | me
 public | watchroom             | table | me
 public | watchroomparticipants | table | me
 (23 rows)
```
