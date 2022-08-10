const tables = {
  anime: "anime",
  animecharacter: "animecharacter",
  animeisofgenre: "animeisofgenre",
  animepicture: "animepicture",
  animestaff: "animestaff",
  animestars: "animestars",
  animestudio: "animestudio",
  characters: "characters",
  charactervoiceactor: "charactervoiceactor",
  episode: "episode",
  episoderates: "episoderates",
  genre: "genre",
  personnel: "personnel",
  review: "review",
  reviewvote: "reviewvote",
  studio: "studio",
  users: "users",
  watchlist: "watchlist",
  watchroom: "watchroom",
  watchroomparticipants: "watchroomparticipants",
};

const users = {
  userIDNOTNULL: "userid",
  passwordNOTNULL: "security_key",
  mailNOTNULL: "email",
  bio: "biography",
  pictureNOTNULL: "pictureid",
  admin: "admin",
};

const anime = {
  animeIDNOTNULL: "animeid",
  titleNOTNULL: "title",
  releaseseason: "releaseseason",
  releasedateNOTNULL: "releasedate",
  averagerating: "averagerating",
  animerank: "animerank",
  synopsis: "synopsis",
};

const watchlist = {
  userIDNOTNULL: "userid",
  favouriteNOTNULL: "favourite",
  animeIDNOTNULL: "animeid",
};

const animepicture = {
  animeIDNOTNULL: "animeid",
  pictureIDNOTNULL: "pictureid",
  poster: "poster",
};

const animestaff = {
  personnelID: "personnelid",
  animeIDNOTNULL: "animeid",
};

const animestudio = {
  animeIDNOTNULL: "animeid",
  studioIDNOTNULL: "studioname",
};

const animecharacter = {
  animeIDNOTNULL: "animeid",
  characterIDNOTNULL: "characterid",
};

const animeisofgenre = {
  animeIDNOTNULL: "animeid",
  genreNameNOTNULL: "genrename",
};

const animestars = {
  userIDNOTNULL: "userid",
  animeIDNOTNULL: "animeid",
  starcountNOTNULL: "starcount",
};

const characters = {
  characterIDNOTNULL: "characterid",
  firstnameNOTNULL: "firstname",
  lastnameNOTNULL: "lastname",
  gender: "gender",
  age: "age",
  dateofbirth: "dateofbirth",
  role: "role",
  description: "description",
  pictureid: "pictureid",
};

const charactervoiceactor = {
  characteridNOTNULL: "characterid",
  personnelIDNOTNULL: "personnelid",
};

const episode = {
  episodeidNOTNULL: "episodeid",
  episodeNOTNULL: "episode",
  seasonNOTNULL: "season",
  airingdate: "airingdate",
  title: "title",
  runtime: "runtime",
  episoderating: "episoderating",
  animeIDNOTNULL: "animeid",
};

const episoderates = {
  userIDNOTNULL: "userid",
  episodeidNOTNULL: "episodeid",
  ratingNOTNULL: "rating",
};

const genre = {
  genreIDNOTNULL: "genrename",
};

const personnel = {
  personnelIDNOTNULL: "personnelid",
  lastnameNOTNULL: "lastname",
  firstnameNOTNULL: "firstname",
  gender: "gender",
  birthday: "birthday",
  age: "age",
  address: "address",
  website: "website",
  pictureIDNOTNULL: "pictureid",
};

const review = {
  reviewidNOTNULL: "reviewid",
  contentNOTNULL: "content",
  votes: "votes",
  reviewtime: "reviewtime",
  animeIDNOTNULL: "animeid",
  userIDNOTNULL: "userid",
};

const reviewvote = {
  reviewidNOTNULL: "reviewid",
  userIDNOTNULL: "userid",
  voteupordownNOTNULL: "voteupordown",
  commentonreview: "commentonreview",
  commenttime: "commenttime",
};

const studio = {
  studioIDNOTNULL: "studioname",
  foundingdate: "foundingdate",
  office_address: "office_address",
  website: "website",
};

const watchroom = {
  watchroomidNOTNULL: "watchroomid",
  watchroomnameNOTNULL: "watchroomname",
  starttimeNOTNULL: "starttime",
  endtimeNOTNULL: "endtime",
  animeIDNOTNULL: "animeid",
  description: "description",
};

const watchroomparticipants = {
  userIDNOTNULL: "userid",
  watchroomidNOTNULL: "watchroomid",
};

module.exports = {
  tables,
  anime,
  animecharacter,
  animeisofgenre,
  animepicture,
  animestaff,
  animestars,
  animestudio,
  characters,
  charactervoiceactor,
  episode,
  episoderates,
  genre,
  personnel,
  review,
  reviewvote,
  studio,
  users,
  watchlist,
  watchroom,
  watchroomparticipants,
};
