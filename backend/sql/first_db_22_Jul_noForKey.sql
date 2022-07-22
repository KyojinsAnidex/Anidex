DROP TABLE IF EXISTS AnimePicture; CREATE TABLE AnimePicture (
  pictureID VARCHAR(255) NOT NULL,
  animeID INTEGER,
  CONSTRAINT animePicture_pkey PRIMARY KEY (pictureID, animeID)
);

DROP TABLE IF EXISTS Anime; CREATE TABLE Anime (
  animeID SERIAL NOT NULL  PRIMARY KEY,
  title Varchar(200) NOT NULL, 
  releaseSeason Varchar(100) NOT NULL,
  releaseDate Date,
  averageRating NUMERIC,
  animeRank INTEGER,
  synopsis TEXT NOT NULL
);

DROP TABLE IF EXISTS Genre; CREATE TABLE Genre (
  genreName Varchar(50) NOT NULL PRIMARY KEY
);

DROP TABLE IF EXISTS Users; CREATE TABLE Users (
  userID Varchar(50) NOT NULL PRIMARY KEY,
  security_key Varchar(64) NOT NULL,
  email Varchar(50) NOT NULL,
  biography TEXT,
  pictureID VARCHAR(255) NOT NULL,
  CONSTRAINT users_email_check CHECK (((email)::text ~~ '_%@_%.___'::text)),
  CONSTRAINT users_security_key_check CHECK ((length(security_key) > 0))
);


DROP TABLE IF EXISTS Characters; CREATE TABLE Characters (
  characterID SERIAL NOT NULL  PRIMARY KEY,
  firstName Varchar(50) NOT NULL,
  lastName Varchar(50) NOT NULL,
  gender Varchar(1),
  age INTEGER,
  dateOfBirth Date,
  role Varchar(25) NOT NULL,
  description TEXT,
  pictureID VARCHAR(255) NOT NULL,
  CONSTRAINT character_age_check CHECK ((age > 0)),
  CONSTRAINT character_gender_check CHECK((gender IN ('M', 'F', 'O')))
);

DROP TABLE IF EXISTS Episode; CREATE TABLE Episode (
  episodeID SERIAL NOT NULL PRIMARY KEY,
  episode INTEGER NOT NULL,
  season INTEGER NOT NULL,
  airingDate Date,
  title Varchar(200),
  runtime INTERVAL HOUR TO MINUTE,
  episodeRating NUMERIC,
  animeID INTEGER
);


DROP TABLE IF EXISTS Personnel; CREATE TABLE Personnel (
  personnelID SERIAL NOT NULL PRIMARY KEY,
  lastName Varchar(50) NOT NULL,
  firstName Varchar(50) NOT NULL,
  gender Varchar(1),
  birthday Date,
  age INTEGER,
  address Varchar(200),
  website Varchar(200),
  pictureID VARCHAR(255) NOT NULL,
  CONSTRAINT personnel_age_check CHECK ((age > 0)),
  CONSTRAINT personnel_gender_check CHECK((gender IN ('M', 'F', 'O')))
);

DROP TABLE IF EXISTS Studio; CREATE TABLE Studio (
  studioName Varchar(200) NOT NULL PRIMARY KEY,
  foundingDate Date,
  office_address Varchar(200),
  website Varchar(200)
);

DROP TABLE IF EXISTS Watchroom; CREATE TABLE Watchroom (
  watchroomID SERIAL NOT NULL PRIMARY KEY,
  watchroomName Varchar(200) NOT NULL,
  startTime TIMESTAMP NOT NULL,
  endTime TIMESTAMP NOT NULL,
  animeID INTEGER
);


DROP TABLE IF EXISTS Review; CREATE TABLE Review (
  reviewID SERIAL NOT NULL PRIMARY KEY,
  content TEXT NOT NULL,
  votes INTEGER,
  reviewTime TIMESTAMP NOT NULL,
  animeID INTEGER,
  userID Varchar(50)
);

DROP TABLE IF EXISTS ReviewVote; CREATE TABLE ReviewVote (
  reviewID INTEGER,
  userID Varchar(50),
  voteUpOrDown INTEGER NOT NULL,
  commentOnReview TEXT,
  commentTime TIMESTAMP,
  CONSTRAINT reviewVote_vote_check CHECK ((voteUpOrDown IN (-1,1)))
);


DROP TABLE IF EXISTS AnimeCharacter; CREATE TABLE AnimeCharacter (
  animeID INTEGER,
  characterID INTEGER
);


DROP TABLE IF EXISTS EpisodeRates; CREATE TABLE EpisodeRates (
  userID Varchar(50),
  episodeID INTEGER,
  rating INTEGER NOT NULL,
  CONSTRAINT episodeRates_rating_check CHECK (((0 <= rating) AND (rating >= 10)))
);


DROP TABLE IF EXISTS CharacterVoiceActor; CREATE TABLE CharacterVoiceActor (
  characterID INTEGER,
  personnelID INTEGER
);

DROP TABLE IF EXISTS AnimeIsOfGenre; CREATE TABLE AnimeIsOfGenre (
  animeID INTEGER,
  genreName Varchar(50)
);

DROP TABLE IF EXISTS AnimeStar; CREATE TABLE AnimeStar (
  userID Varchar(50),
  animeID INTEGER,
  starCount INTEGER NOT NULL,
  CONSTRAINT animeStar_star_check CHECK (((0 <= starCount) AND (starCount >= 10)))
);

DROP TABLE IF EXISTS AnimeStaff; CREATE TABLE AnimeStaff (
  personnelID INTEGER,
  animeID INTEGER
);


DROP TABLE IF EXISTS WatchList; CREATE TABLE WatchList (
  userID Varchar(50),
  favourite BOOLEAN NOT NULL,
  animeID INTEGER
);


DROP TABLE IF EXISTS WatchroomParticipants; CREATE TABLE WatchroomParticipants (
  userID Varchar(50),
  watchroomID INTEGER
);


DROP TABLE IF EXISTS AnimeStudio; CREATE TABLE AnimeStudio (
  animeID INTEGER,
  studioName Varchar(200)
);