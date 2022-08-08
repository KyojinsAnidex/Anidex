--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: anime; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.anime (
    animeid integer NOT NULL,
    title character varying(255) NOT NULL,
    releaseseason character varying(63),
    releasedate date NOT NULL,
    averagerating numeric,
    animerank integer,
    synopsis text NOT NULL
);


ALTER TABLE public.anime OWNER TO me;

--
-- Name: anime_animeid_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.anime_animeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.anime_animeid_seq OWNER TO me;

--
-- Name: anime_animeid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.anime_animeid_seq OWNED BY public.anime.animeid;


--
-- Name: animecharacter; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.animecharacter (
    animeid integer NOT NULL,
    characterid integer NOT NULL
);


ALTER TABLE public.animecharacter OWNER TO me;

--
-- Name: animeisofgenre; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.animeisofgenre (
    animeid integer NOT NULL,
    genrename character varying(63) NOT NULL
);


ALTER TABLE public.animeisofgenre OWNER TO me;

--
-- Name: animepicture; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.animepicture (
    pictureid character varying(255) NOT NULL,
    animeid integer NOT NULL,
    poster boolean DEFAULT false
);


ALTER TABLE public.animepicture OWNER TO me;

--
-- Name: animestaff; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.animestaff (
    personnelid integer NOT NULL,
    animeid integer NOT NULL,
    role character varying(255)
);


ALTER TABLE public.animestaff OWNER TO me;

--
-- Name: animestars; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.animestars (
    userid character varying(63) NOT NULL,
    animeid integer NOT NULL,
    starcount integer NOT NULL,
    CONSTRAINT animestar_star_check CHECK (((0 <= starcount) AND (starcount >= 10)))
);


ALTER TABLE public.animestars OWNER TO me;

--
-- Name: animestudio; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.animestudio (
    animeid integer NOT NULL,
    studioname character varying(255) NOT NULL
);


ALTER TABLE public.animestudio OWNER TO me;

--
-- Name: characters; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.characters (
    characterid integer NOT NULL,
    firstname character varying(63) NOT NULL,
    lastname character varying(63) NOT NULL,
    gender character varying(1),
    age integer,
    dateofbirth date,
    role character varying(31) NOT NULL,
    description text,
    pictureid character varying(255) NOT NULL,
    CONSTRAINT character_age_check CHECK ((age > 0)),
    CONSTRAINT character_gender_check CHECK (((gender)::text = ANY ((ARRAY['M'::character varying, 'F'::character varying, 'O'::character varying])::text[])))
);


ALTER TABLE public.characters OWNER TO me;

--
-- Name: characters_characterid_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.characters_characterid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.characters_characterid_seq OWNER TO me;

--
-- Name: characters_characterid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.characters_characterid_seq OWNED BY public.characters.characterid;


--
-- Name: charactervoiceactor; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.charactervoiceactor (
    characterid integer NOT NULL,
    personnelid integer NOT NULL
);


ALTER TABLE public.charactervoiceactor OWNER TO me;

--
-- Name: episode; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.episode (
    episodeid integer NOT NULL,
    episode integer NOT NULL,
    season integer NOT NULL,
    airingdate date,
    title character varying(255),
    runtime interval hour to minute,
    episoderating numeric,
    animeid integer NOT NULL
);


ALTER TABLE public.episode OWNER TO me;

--
-- Name: episode_episodeid_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.episode_episodeid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.episode_episodeid_seq OWNER TO me;

--
-- Name: episode_episodeid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.episode_episodeid_seq OWNED BY public.episode.episodeid;


--
-- Name: episoderates; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.episoderates (
    userid character varying(63) NOT NULL,
    episodeid integer NOT NULL,
    rating integer NOT NULL,
    CONSTRAINT episoderates_rating_check CHECK (((0 <= rating) AND (rating >= 10)))
);


ALTER TABLE public.episoderates OWNER TO me;

--
-- Name: genre; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.genre (
    genrename character varying(63) NOT NULL
);


ALTER TABLE public.genre OWNER TO me;

--
-- Name: personnel; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.personnel (
    personnelid integer NOT NULL,
    lastname character varying(63) NOT NULL,
    firstname character varying(63) NOT NULL,
    gender character varying(1),
    birthday date,
    age integer,
    address character varying(255),
    website character varying(255),
    pictureid character varying(255),
    CONSTRAINT personnel_age_check CHECK ((age > 0)),
    CONSTRAINT personnel_gender_check CHECK (((gender)::text = ANY ((ARRAY['M'::character varying, 'F'::character varying, 'O'::character varying])::text[])))
);


ALTER TABLE public.personnel OWNER TO me;

--
-- Name: personnel_personnelid_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.personnel_personnelid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.personnel_personnelid_seq OWNER TO me;

--
-- Name: personnel_personnelid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.personnel_personnelid_seq OWNED BY public.personnel.personnelid;


--
-- Name: review; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.review (
    reviewid integer NOT NULL,
    content text NOT NULL,
    votes integer,
    reviewtime timestamp without time zone NOT NULL,
    animeid integer NOT NULL,
    userid character varying(63) NOT NULL
);


ALTER TABLE public.review OWNER TO me;

--
-- Name: review_reviewid_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.review_reviewid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.review_reviewid_seq OWNER TO me;

--
-- Name: review_reviewid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.review_reviewid_seq OWNED BY public.review.reviewid;


--
-- Name: reviewvote; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.reviewvote (
    reviewid integer NOT NULL,
    userid character varying(63) NOT NULL,
    voteupordown integer NOT NULL,
    commentonreview text,
    commenttime timestamp without time zone,
    CONSTRAINT reviewvote_vote_check CHECK ((voteupordown = ANY (ARRAY['-1'::integer, 1])))
);


ALTER TABLE public.reviewvote OWNER TO me;

--
-- Name: studio; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.studio (
    studioname character varying(255) NOT NULL,
    foundingdate date,
    office_address character varying(255),
    website character varying(255)
);


ALTER TABLE public.studio OWNER TO me;

--
-- Name: users; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.users (
    userid character varying(63) NOT NULL,
    security_key character varying(64) NOT NULL,
    email character varying(63) NOT NULL,
    biography text,
    pictureid character varying(255) NOT NULL,
    admin boolean DEFAULT false,
    CONSTRAINT users_email_check CHECK (((email)::text ~~ '_%@_%.___'::text)),
    CONSTRAINT users_security_key_check CHECK ((length((security_key)::text) > 0))
);


ALTER TABLE public.users OWNER TO me;

--
-- Name: watchlist; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.watchlist (
    userid character varying(63) NOT NULL,
    favourite boolean NOT NULL,
    animeid integer NOT NULL
);


ALTER TABLE public.watchlist OWNER TO me;

--
-- Name: watchroom; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.watchroom (
    watchroomid integer NOT NULL,
    watchroomname character varying(255) NOT NULL,
    starttime timestamp without time zone NOT NULL,
    endtime timestamp without time zone NOT NULL,
    animeid integer NOT NULL
);


ALTER TABLE public.watchroom OWNER TO me;

--
-- Name: watchroom_watchroomid_seq; Type: SEQUENCE; Schema: public; Owner: me
--

CREATE SEQUENCE public.watchroom_watchroomid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.watchroom_watchroomid_seq OWNER TO me;

--
-- Name: watchroom_watchroomid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: me
--

ALTER SEQUENCE public.watchroom_watchroomid_seq OWNED BY public.watchroom.watchroomid;


--
-- Name: watchroomparticipants; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.watchroomparticipants (
    userid character varying(63) NOT NULL,
    watchroomid integer NOT NULL
);


ALTER TABLE public.watchroomparticipants OWNER TO me;

--
-- Name: anime animeid; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.anime ALTER COLUMN animeid SET DEFAULT nextval('public.anime_animeid_seq'::regclass);


--
-- Name: characters characterid; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.characters ALTER COLUMN characterid SET DEFAULT nextval('public.characters_characterid_seq'::regclass);


--
-- Name: episode episodeid; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.episode ALTER COLUMN episodeid SET DEFAULT nextval('public.episode_episodeid_seq'::regclass);


--
-- Name: personnel personnelid; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.personnel ALTER COLUMN personnelid SET DEFAULT nextval('public.personnel_personnelid_seq'::regclass);


--
-- Name: review reviewid; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.review ALTER COLUMN reviewid SET DEFAULT nextval('public.review_reviewid_seq'::regclass);


--
-- Name: watchroom watchroomid; Type: DEFAULT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.watchroom ALTER COLUMN watchroomid SET DEFAULT nextval('public.watchroom_watchroomid_seq'::regclass);


--
-- Data for Name: anime; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.anime (animeid, title, releaseseason, releasedate, averagerating, animerank, synopsis) FROM stdin;
3	Kuroko no Basket	Summer	2012-09-09	\N	\N	For the last three years, Teikou Middle School has dominated the national basketball scene with its legendary lineup: the "Generation of Miracles." It consisted of five prodigies who excelled at the sport, but a "Phantom Sixth Man" lurked in the shadows and helped earn the team their revered status. Eventually, their monstrous growth jaded them from the sport they loved and made them go their separate ways in high school. In search of new members, the Seirin High School basketball team recruits Taiga Kagami and Tetsuya Kuroko, two freshmen who seem to have significant differences in abilities. Having returned recently from America, Kagami has both a natural aptitude and relentless love for the sport. Meanwhile, Kuroko lacks presence and exhibits no outstanding athletic talent. However, it is later revealed that he is Teikou''s Phantom Sixth Manâ€”the player once part of the Generation of Miracles.
4	After The Rain	Summer	2012-09-09	\N	\N	Akira Tachibana is a soft-spoken high school student who used to be a part of the track and field club but, due to an injury, she is no longer able to run as fast as she once could. Working part-time at a family restaurant as a recourse, she finds herself inexplicably falling in love with her manager, a divorced 45-year-old man with a young son. Despite the age gap, Akira wholeheartedly embraces his mannerisms and kind nature, which is seen as spinelessness by the other employees, and little by little, the two begin to understand each other. Although unable to explain why exactly she is attracted to him, Akira believes that a concrete reason is not needed to truly love someone. On a rainy day, she decides to finally tell her manager about how she feels... But just how will he react?
5	Kaguya-Sama : Love is War	Spring	2015-01-01	\N	\N	At the renowned Shuchiin Academy, Miyuki Shirogane and Kaguya Shinomiya are the student body''s top representatives. Ranked the top student in the nation and respected by peers and mentors alike, Miyuki serves as the student council president. Alongside him, the vice president Kaguyaâ€”eldest daughter of the wealthy Shinomiya familyâ€”excels in every field imaginable. They are the envy of the entire student body, regarded as the perfect couple. However, despite both having already developed feelings for the other, neither are willing to admit them. The first to confess loses, will be looked down upon, and will be considered the lesser. With their honor and pride at stake, Miyuki and Kaguya are both equally determined to be the one to emerge victorious on the battlefield of love!
6	Gintama	Spring	1995-01-14	\N	\N	Gintoki, Shinpachi, and Kagura return as the fun-loving but broke members of the Yorozuya team! Living in an alternate-reality Edo, where swords are prohibited and alien overlords have conquered Japan, they try to thrive on doing whatever work they can get their hands on. However, Shinpachi and Kagura still haven''t been paid... Does Gin-chan really spend all that cash playing pachinko? Meanwhile, when Gintoki drunkenly staggers home one night, an alien spaceship crashes nearby. A fatally injured crew member emerges from the ship and gives Gintoki a strange, clock-shaped device, warning him that it is incredibly powerful and must be safeguarded. Mistaking it for his alarm clock, Gintoki proceeds to smash the device the next morning and suddenly discovers that the world outside his apartment has come to a standstill. With Kagura and Shinpachi at his side, he sets off to get the device fixed; though, as usual, nothing is ever that simple for the Yorozuya team.
7	One Piece	Winter	1990-05-18	\N	\N	Gol D. Roger was known as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Pieceâ€”which promises an unlimited amount of riches and fameâ€”and quite possibly the pinnacle of glory and the title of the Pirate King.
8	Code Geass	Fall	2005-09-29	\N	\N	In the year 2010, the Holy Empire of Britannia is establishing itself as a dominant military nation, starting with the conquest of Japan. Renamed to Area 11 after its swift defeat, Japan has seen significant resistance against these tyrants in an attempt to regain independence. Lelouch Lamperouge, a Britannian student, unfortunately finds himself caught in a crossfire between the Britannian and the Area 11 rebel armed forces. He is able to escape, however, thanks to the timely appearance of a mysterious girl named C.C., who bestows upon him Geass, the "Power of Kings." Realizing the vast potential of his newfound "power of absolute obedience," Lelouch embarks upon a perilous journey as the masked vigilante known as Zero, leading a merciless onslaught against Britannia in order to get revenge once and for all.
9	K-On	Spring	2009-04-03	\N	\N	A fresh high school year always means much to come, and one of those things is joining a club. Being in a dilemma about which club to join, Yui Hirasawa stumbles upon and applies for the Light Music Club, which she misinterprets to be about playing simple instruments, such as castanets. Unable to play an instrument, she decides to visit to apologize and quit. Meanwhile, the Light Music Club faces disbandment due to a lack of members. This causes the club members to offer anything, from food to slacking off during club time, in order to convince Yui to join. Despite their efforts, Yui insists on leaving due to her lack of musical experience. As a last resort, they play a piece for Yui, which sparks her fiery passion and finally convinces her to join the club.
10	Hyouka	Spring	2012-04-12	\N	\N	High school freshman Houtarou Oreki has but one goal: to lead a gray life while conserving as much energy as he can. Unfortunately, his peaceful days come to an end when his older sister, Tomoe, forces him to save the memberless Classics Club from disbandment. Luckily, Oreki''s predicament seems to be over when he heads to the clubroom and discovers that his fellow first-year, Eru Chitanda, has already become a member. However, despite his obligation being fulfilled, Oreki finds himself entangled by Chitanda''s curious and bubbly personality, soon joining the club of his own volition.
11	Violet Evergarden	Winter	2018-01-18	\N	\N	The Great War finally came to an end after four long years of conflict; fractured in two, the continent of Telesis slowly began to flourish once again. Caught up in the bloodshed was Violet Evergarden, a young girl raised for the sole purpose of decimating enemy lines. Hospitalized and maimed in a bloody skirmish during the War''s final leg, she was left with only words from the person she held dearest, but with no understanding of their meaning. Recovering from her wounds, Violet starts a new life working at CH Postal Services after a falling out with her new intended guardian family. There, she witnesses by pure chance the work of an "Auto Memory Doll," amanuenses that transcribe people''s thoughts and feelings into words on paper. Moved by the notion, Violet begins work as an Auto Memory Doll, a trade that will take her on an adventure, one that will reshape the lives of her clients and hopefully lead to self-discovery.
12	Black Clover	Fall	2017-05-30	\N	\N	Asta and Yuno were abandoned at the same church on the same day. Raised together as children, they came to know of the "Wizard King"â€”a title given to the strongest mage in the kingdomâ€”and promised that they would compete against each other for the position of the next Wizard King. However, as they grew up, the stark difference between them became evident. While Yuno is able to wield magic with amazing power and control, Asta cannot use magic at all and desperately tries to awaken his powers by training physically.
13	Tokyo Ghoul	Summer	2014-06-04	\N	\N	A sinister threat is invading Tokyo: flesh-eating "ghouls" who appear identical to humans and blend into their population. Reserved college student Ken Kaneki buries his nose in books and avoids the news of the growing crisis. However, the appearance of an attractive woman named Rize Kamishiro shatters his solitude when she forwardly asks him on a date. While walking Rize home, Kaneki discovers she isn''t as kind as she first appeared, and she has led him on with sinister intent. After a tragic struggle, he later awakens in a hospital to learn his life was saved by transplanting the now deceased Rize''s organs into his own body.
14	Bleach	Winter	2004-01-01	\N	\N	Ichigo Kurosaki is an ordinary high schoolerâ€”until his family is attacked by a Hollow, a corrupt spirit that seeks to devour human souls. It is then that he meets a Soul Reaper named Rukia Kuchiki, who gets injured while protecting Ichigo''s family from the assailant. To save his family, Ichigo accepts Rukia''s offer of taking her powers and becomes a Soul Reaper as a result. However, as Rukia is unable to regain her powers, Ichigo is given the daunting task of hunting down the Hollows that plague their town. However, he is not alone in his fight, as he is later joined by his friendsâ€”classmates Orihime Inoue, Yasutora Sado, and Uryuu Ishidaâ€”who each have their own unique abilities. As Ichigo and his comrades get used to their new duties and support each other on and off the battlefield, the young Soul Reaper soon learns that the Hollows are not the only real threat to the human world.
15	Boku Dake Ga Inai Machi	Winter	2013-03-14	\N	\N	When tragedy is about to strike, Satoru Fujinuma finds himself sent back several minutes before the accident occurs. The detached, 29-year-old manga artist has taken advantage of this powerful yet mysterious phenomenon, which he calls "Revival," to save many lives. However, when he is wrongfully accused of murdering someone close to him, Satoru is sent back to the past once again, but this time to 1988, 18 years in the past. Soon, he realizes that the murder may be connected to the abduction and killing of one of his classmates, the solitary and mysterious Kayo Hinazuki, that took place when he was a child. This is his chance to make things right.
16	Sword Art Online	Summer	2016-06-04	\N	\N	In the year 2022, virtual reality has progressed by leaps and bounds, and a massive online role-playing game called Sword Art Online (SAO) is launched. With the aid of "NerveGear" technology, players can control their avatars within the game using nothing but their own thoughts. Kazuto Kirigaya, nicknamed "Kirito," is among the lucky few enthusiasts who get their hands on the first shipment of the game. He logs in to find himself, with ten-thousand others, in the scenic and elaborate world of Aincrad, one full of fantastic medieval weapons and gruesome monsters. However, in a cruel turn of events, the players soon realize they cannot log out; the game''s creator has trapped them in his new world until they complete all one hundred levels of the game.
17	Hataraku Maou-sama	Spring	2013-05-18	\N	\N	Striking fear into the hearts of mortals, the Demon Lord Satan begins to conquer the land of Ente Isla with his vast demon armies. However, while embarking on this brutal quest to take over the continent, his efforts are foiled by the hero Emilia, forcing Satan to make his swift retreat through a dimensional portal only to land in the human world. Along with his loyal general Alsiel, the demon finds himself stranded in modern-day Tokyo and vows to return and complete his subjugation of Ente Islaâ€”that is, if they can find a way back! Powerless in a world without magic, Satan assumes the guise of a human named Sadao Maou and begins working at MgRonald''sâ€”a local fast-food restaurantâ€”to make ends meet. He soon realizes that his goal of conquering Ente Isla is just not enough as he grows determined to climb the corporate ladder and become the ruler of Earth, one satisfied customer at a time!
18	Steins;Gate	Spring	2011-04-06	\N	\N	The self-proclaimed mad scientist Rintarou Okabe rents out a room in a rickety old building in Akihabara, where he indulges himself in his hobby of inventing prospective "future gadgets" with fellow lab members: Mayuri Shiina, his air-headed childhood friend, and Hashida Itaru, a perverted hacker nicknamed "Daru." The three pass the time by tinkering with their most promising contraption yet, a machine dubbed the "Phone Microwave," which performs the strange function of morphing bananas into piles of green gel. Though miraculous in itself, the phenomenon doesn''t provide anything concrete in Okabe''s search for a scientific breakthrough; that is, until the lab members are spurred into action by a string of mysterious happenings before stumbling upon an unexpected successâ€”the Phone Microwave can send emails to the past, altering the flow of history.
19	Naruto	Winter	2007-02-01	\N	\N	Moments prior to Naruto Uzumaki''s birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox, attacked Konohagakure, the Hidden Leaf Village, and wreaked havoc. In order to put an end to the Kyuubi''s rampage, the leader of the village, the Fourth Hokage, sacrificed his life and sealed the monstrous beast inside the newborn Naruto. Now, Naruto is a hyperactive and knuckle-headed ninja still living in Konohagakure. Shunned because of the Kyuubi inside him, Naruto struggles to find his place in the village, while his burning desire to become the Hokage of Konohagakure leads him not only to some great new friends, but also some deadly foes.
2	Attack On Titan	Spring	2013-01-20	\N	\N	Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations
\.


--
-- Data for Name: animecharacter; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.animecharacter (animeid, characterid) FROM stdin;
2	117
2	118
2	119
2	120
3	157
3	158
3	159
3	160
4	154
4	155
4	156
5	148
5	149
5	150
5	151
5	152
5	153
6	146
6	147
7	142
7	143
7	144
7	145
8	138
8	139
8	140
8	141
9	113
9	114
9	115
9	116
10	171
10	172
11	169
11	170
12	166
12	167
12	168
13	163
13	164
13	165
14	111
14	112
14	161
14	162
15	135
15	136
15	137
16	132
16	133
16	134
17	130
17	131
18	128
18	129
19	121
19	122
19	123
19	124
19	125
19	126
19	127
\.


--
-- Data for Name: animeisofgenre; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.animeisofgenre (animeid, genrename) FROM stdin;
2	Action
2	Adventure
2	Fantasy
2	Mystery
2	Horror
19	Action
19	Adventure
18	Adventure
18	Romance
18	Sci-Fi
17	Comedy
17	Fantasy
17	Romance
17	Supernatural
16	Action
16	Adventure
16	Fantasy
16	Supernatural
15	Mystery
15	Supernatural
8	Action
8	Drama
8	Sci-Fi
8	Supernatural
7	Action
7	Adventure
7	Fantasy
7	Supernatural
6	Action
6	Comedy
6	Fantasy
5	Drama
5	Romance
5	Slice of Life
4	Drama
4	Slice of Life
3	Sports
14	Action
14	Adventure
14	Comedy
14	Supernatural
13	Action
13	Drama
13	Mystery
13	Supernatural
12	Action
12	Comedy
12	Fantasy
11	Fantasy
11	Drama
11	Slice of Life
10	Mystery
10	Slice of Life
9	Comedy
9	Slice of Life
\.


--
-- Data for Name: animepicture; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.animepicture (pictureid, animeid, poster) FROM stdin;
c8393fa2-163f-11ed-bddc-b37983214d45.jpg	3	t
c8394088-163f-11ed-bddd-e3ed0bb4697e.jpg	4	t
c83940b0-163f-11ed-bdde-47378be5750e.jpg	5	t
c83940ce-163f-11ed-bddf-93d3e1e7e684.jpg	6	t
c83940ec-163f-11ed-bde0-872c4a9d6017.jpg	7	t
c839410a-163f-11ed-bde1-6f61257fbd02.jpg	8	t
c8394128-163f-11ed-bde2-17b4ea4eca4f.jpg	9	t
c8394146-163f-11ed-bde3-0f4dfd495fb4.jpg	10	t
c8394164-163f-11ed-bde4-e32086258b22.jpg	11	t
c8394182-163f-11ed-bde5-7323f4f89e2f.jpg	12	t
c83941aa-163f-11ed-bde6-93c46ca3be8a.jpg	13	t
c83941c8-163f-11ed-bde7-d3b9916ea823.jpg	14	t
c83941f0-163f-11ed-bde8-f7cc429af0a5.jpg	15	t
c8394218-163f-11ed-bde9-7fdd8fbc7652.jpg	16	t
c8394236-163f-11ed-bdea-77a1837dce66.jpg	17	t
c839425e-163f-11ed-bdeb-ef989c9a4290.jpg	18	t
c8394286-163f-11ed-bdec-8f0a51b6c116.jpg	19	t
bb08caaa-163f-11ed-98cd-bbe4521f6055.jpg	2	t
\.


--
-- Data for Name: animestaff; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.animestaff (personnelid, animeid, role) FROM stdin;
\.


--
-- Data for Name: animestars; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.animestars (userid, animeid, starcount) FROM stdin;
\.


--
-- Data for Name: animestudio; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.animestudio (animeid, studioname) FROM stdin;
\.


--
-- Data for Name: characters; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.characters (characterid, firstname, lastname, gender, age, dateofbirth, role, description, pictureid) FROM stdin;
111	Ichigo	Kurosaki	\N	17	\N	Protagonist	For the most part, Ichigo appears like a normal teenage boy, the one exception to that is his spiky, orange hair	b1679534-1627-11ed-b85f-9386f43b0ae7.jpg
112	Rukia	Kuchiki	\N	17	\N	Main		b1679610-1627-11ed-b860-4f1bbe1d8269.jpg
113	Yui	Hirasawa	\N	15	\N	Main	Yui is the lead guitarist and split vocalist of the Light Music Club who plays a Standard electric guitar that she nicknames "GÄ«ta"	b1679638-1627-11ed-b861-8b65f972dd30.jpg
114	Mio	Akiyama	\N	15	\N	Main	Mio is a shy girl who is in the light music club.	b1679656-1627-11ed-b862-73883327a120.jpg
115	Tsumugi	Kotobuki	\N	15	\N	Main	Tsumugi, often referred to as Mugi by her friends, is a wealthy girl with a gentle and sweet personality who plays a Korg	b1679674-1627-11ed-b863-5b0a03e48473.jpg
116	Ritsu	Tanaka	\N	15	\N	Main	Ritsu (or Ricchan, as nicknamed by Yui) is the self-proclaimed president of the light music club ans plays the drums	b1679692-1627-11ed-b864-8763e1fa7648.jpg
117	Eren	Yaeger	\N	22	\N	Protagonist	Eren is Shingeki no Kyojins protagonist.	b16796b0-1627-11ed-b865-37f1d91b9815.jpg
118	Mikasa	Ackerman	\N	22	\N	Main	Mikasa is Erens childhood friend, along with Armin.	b16796ce-1627-11ed-b866-2befde53cfa9.jpg
119	Levi	Ackerman	\N	25	\N	Supporting	Levi is known as humanitys most powerful soldier.	b16796ec-1627-11ed-b867-0fa45e9173c1.jpg
120	Armin	Arlert	\N	22	\N	Main	Armin Arlert is Erens best friend. He is physically weak, but emotionally strong.	b167970a-1627-11ed-b868-3ba971297dab.jpg
121	Naruto	Uzumaki	\N	17	\N	Protagonist	Born in Konohagakure, a ninja village hidden in the leaves, Naruto Uzumaki was destined for greatness.	b1679728-1627-11ed-b869-db0d4366a799.jpg
122	Sasuke	Uchiha	\N	17	\N	Main	When Sasuke was young, his clan was murdered by his older brother, Itachi.	b1679746-1627-11ed-b86a-4f78c90cbcae.jpg
123	Sakura	Haruno	\N	17	\N	Main	Sakura is the only female ninja of Team 7.	b1679764-1627-11ed-b86b-a39547f8361c.jpg
124	Kakashi	Hatake	\N	35	\N	Supporting	Kakashi has an ongoing, albeit slightly one-sided, rivalry with Might Guy	b1679782-1627-11ed-b86c-c701a1e8ccaa.jpg
125	Shikamaru	Nara	\N	18	\N	Supporting	Shikamaru is an extremely unenthusiastic person, and as such lives his life avoiding work.	b16797a0-1627-11ed-b86d-8fc58edc61d3.jpg
126	Obito	Uchiha	\N	34	\N	Antagonist	Obito Uchiha was teammates with Kakashi Hatake and Rin under the Fourth Hokage.	b16797be-1627-11ed-b86e-b71c0d297599.jpg
127	Madara	Uchiha	\N	90	\N	Antagonist	Before the era of ninja villages, Madara and his younger brother, Izuna, were considered the most gifted members of the Uchiha clan.	b16797dc-1627-11ed-b86f-d34351b9067b.jpg
128	Okabe	Rintarou	\N	18	\N	Protagonist	Okabe is a theatrical and eccentric individual. He is a self-proclaimed mad scientis	b16797fa-1627-11ed-b870-13f209d25b82.jpg
129	Makise	Kurisu	\N	18	\N	Main	The female protagonist. Kurisu is a research member in Victor Qondria Universitys Brain Research Program	b1679818-1627-11ed-b871-231d9aae1088.jpg
130	Sadao	Maou	\N	300	\N	Protagonist	Sadao is the Demon King from Ente Isla. Due to being confronted by the Hero Emilia and the humans, he was forced to retreat and ended up in the human world in present day Japan	b1679836-1627-11ed-b872-af8cede0a2d4.jpg
131	Emi	Yusa	\N	18	\N	Main	The hero who defeated Satan Lord. After forcing the Satan Lord out, she is not satisfied until she sees to it that he is destroyed	b1679854-1627-11ed-b873-8f6eb85450b7.jpg
132	Kirito	Kirigaya	\N	15	\N	Protagonist	Kirito is the protagonist of Sword Art Online. He is a "solo" player, a player who hasnt joined a guild and usually works alone.	b1679872-1627-11ed-b874-338ea4caf0cc.jpg
133	Asuna	Yuuki	\N	16	\N	Main	Asuna is a friend of Kirito and is a sub-leader of the guild Knights of the Blood (KoB), a medium-sized guild of about thirty players, also called the strongest guild in Aincrad.	b1679890-1627-11ed-b875-8f803c7f13a9.jpg
134	Yui	Watanabe	\N	10	\N	Supporting	A young and cheerful girl with long black hair who looks no older than  years old. Kirito and Asuna found her in a forest in the 22nd floor of Aincrad.	b16798ae-1627-11ed-b876-3f5206da1cbf.jpg
135	Satoru	Fujinuma	\N	21	\N	Protagonist	Satoru Fujinuma is a struggling manga author with a supernatural power that enables, or rather, forces him to prevent deaths and catastrophes that happen near him	b16798cc-1627-11ed-b877-dfd5cb07b88e.jpg
136	Gaku	Yashiro	\N	52	\N	Antagonist	Yashiro Gaku was Satorus homeroom teacher at Mikoto Elementary School in 1988.	b16798cc-1627-11ed-b877-dfd5cb07b88e.jpg
137	Kayo	Hinazuki	\N	10	\N	Main	Kayo Hinazuki is a ten-year-old girl and the first victim of the serial killer/kidnapper. She went missing on the 2nd of March 1988. Her body was found a few days later once the snow had thawed.	b16798ea-1627-11ed-b878-7bc5d6774e57.jpg
138	Lelouch	vi Brittannia	\N	18	\N	Protagonist		b1679908-1627-11ed-b879-e399ccb64a9c.jpg
139	C.	C.	\N	20	\N	Main		b167993a-1627-11ed-b87b-8b19fde85689.jpg
140	Suzaku	Kururugi	\N	18	\N	Main		b1679926-1627-11ed-b87a-abf4bc02424a.jpg
141	Euphemia	li Brittannia	\N	17	\N	Main		b167993a-1627-11ed-b87b-8b19fde85689.jpg
142	Monkey	D. Luffy	\N	19	\N	Protagonist		b1679958-1627-11ed-b87c-23c6caae7136.jpg
143	Roronoa	Zoro	\N	25	\N	Main		b1679976-1627-11ed-b87d-57299bfbff44.jpg
144	Vinesmoke	Sanji	\N	25	\N	Main		b1679994-1627-11ed-b87e-2f4b7686d2d2.jpg
145	Nico	Robin	\N	30	\N	Main		b16799b2-1627-11ed-b87f-6b05c39283c6.jpg
146	Gintoki	Sakata	\N	27	\N	Protagonist		b16799d0-1627-11ed-b880-eb20cf4c5c90.jpg
147	Kotaro	Katsura	\N	26	\N	Main		b16799ee-1627-11ed-b881-4be8ec4ecfbb.jpg
148	Chika	Fujiwara	\N	16	\N	Main		b1679a48-1627-11ed-b884-1fc519c2d881.jpg
149	Kaguya	Shinomiya	\N	16	\N	Protagonist		b1679a66-1627-11ed-b885-db5075fa3695.jpg
150	Miyuki	Shirogane	\N	16	\N	Main		b1679a84-1627-11ed-b886-c3c7f144fd40.jpg
151	Ai	Hayasaka	\N	17	\N	Supporting		b1679aa2-1627-11ed-b887-9be65a57d63e.jpg
152	Yu	Ishigami	\N	15	\N	Main		b1679b42-1627-11ed-b888-472395b77a56.jpg
153	Kei	Shirogane	\N	15	\N	Supporting		b1679b6a-1627-11ed-b889-57a7e0b7950b.jpg
154	Akira	Tachibana	\N	15	\N	Protagonist		b1679b88-1627-11ed-b88a-b3d4155ae734.jpg
155	Masami	Kondo	\N	29	\N	Main		b1679bb0-1627-11ed-b88b-0feb7b9413a3.jpg
156	Haruka	Kyan	\N	15	\N	Supporting		b1679bce-1627-11ed-b88c-07ff1662717d.jpg
157	Tetsuya	Kuroko	\N	17	\N	Protagonist		b1679bec-1627-11ed-b88d-d7e0e81a3538.jpg
158	Taiga	Kagami	\N	17	\N	Main		b1679c0a-1627-11ed-b88e-735aed59a34f.jpg
159	Daiki	Aomine	\N	18	\N	Supporting		b1679c28-1627-11ed-b88f-4f1c021c48ee.jpg
160	Shintaro	Midorima	\N	18	\N	Supporting		b1679c46-1627-11ed-b890-a324d277a222.jpg
161	Renji	Abarai	\N	20	\N	Supporting	Renji is one of the most unusual Bleach character, having long crimson hair which is usually kept in high ponytail, and whole upper body tattooed in tribal work	b1679c5a-1627-11ed-b891-3b6603e19bb9.jpg
162	Cifer	Ulquiorra	\N	25	\N	Antagonist	Ulquiorra is a male arrancar with a melancholic appearance. Ulquiora is the 4th ranked espada.	b1679c78-1627-11ed-b892-1fb63e13057b.jpg
163	Ken	Kaneki	\N	16	\N	Protagonist	Originally born as a human, his encounter with a female ghoul under the name of Kamishiro Rize forced him to turn into a ghoul	b1679c96-1627-11ed-b893-734a6180be00.jpg
164	Touka	Kirishima	\N	16	\N	Main	Touka is a ghoul successfully posing as a human and working as a waitress at a cafe which serves as a gathering place for other ghouls, as well as a food resource.	b1679cb4-1627-11ed-b894-ff3c76eb200b.jpg
165	Nagachika	Hideyoshi	\N	16	\N	Supporting	Hideyoshi is a normal human and the best friend of Ken Kaneki.	b1679cd2-1627-11ed-b895-73ea6294672d.jpg
166	Asta		\N	17	\N	Protagonist	Asta is an orphan who was left under the care of a church in the village of Hage	b1679cf0-1627-11ed-b896-13496475b8bb.jpg
167	Noelle	Silva	\N	16	\N	Main	Noelle Silva is a member of the Black Bull squad.	b1679d0e-1627-11ed-b897-a3a1306baf0b.jpg
168	Luck	Voltia	\N	18	\N	Supporting	A member of the Black Bull Squad of Magic Knights.	b1679d2c-1627-11ed-b898-73baed6cd81f.jpg
169	Violet	Evergarden	\N	14	\N	Protagonist	Violet is a newcomer Auto Memory Doll at the CH postal company.	b1679d4a-1627-11ed-b899-d7bae803ea28.jpg
170	Gilbert	Bougainvilliea	\N	29	\N	Supporting	Gilbert is a major of the Leiden Shaf Rich Army.	b1679d68-1627-11ed-b89a-fb858c15a8f1.jpg
171	Houtarou	Oreki	\N	16	\N	Protagonist	Oreki is a high-schooler with messy brown hair and green eyes.	b1679d86-1627-11ed-b89b-9f8c354d2df7.jpg
172	Eru	Chitanda	\N	16	\N	Main	Chitanda is a calm and happy person, but can become very excited when new or interesting things happen, especially when it involves her club.	b1679da4-1627-11ed-b89c-f37152e45e5b.jpg
\.


--
-- Data for Name: charactervoiceactor; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.charactervoiceactor (characterid, personnelid) FROM stdin;
\.


--
-- Data for Name: episode; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.episode (episodeid, episode, season, airingdate, title, runtime, episoderating, animeid) FROM stdin;
50	3	1	2018-01-26	Raining Tears	22:16:00	\N	4
51	4	1	2018-02-02	Gentle Rain	22:55:00	\N	4
52	5	1	2018-02-09	The Scent of Rain	22:01:00	\N	4
53	6	1	2018-02-12	Fine Rain	22:15:00	\N	4
54	7	1	2018-02-25	Heavy Rain	22:06:00	\N	4
55	8	1	2018-03-02	Quiet rain	22:19:00	\N	4
56	9	1	2018-03-12	Rain of Sorrow	22:13:00	\N	4
57	10	1	2018-03-20	Sudden Shower	22:44:00	\N	4
58	11	1	2018-03-12	Passing Shower	22:15:00	\N	4
59	12	1	2018-03-30	After the Rain	22:06:00	\N	4
60	1	1	2012-04-20	I Am Kuroko	22:19:00	\N	3
61	2	1	2012-04-20	I''m Serious	22:13:00	\N	3
62	3	1	2012-04-20	It''s Better If I Can''t Win	22:44:00	\N	3
63	4	1	2012-04-13	Take Care of Counter Attack!	22:51:00	\N	3
64	5	1	2012-04-06	Your Basketball	22:55:00	\N	3
65	1	2	2013-01-20	I Never Thought We`d Meet Here	22:16:00	\N	3
66	2	2	2013-01-20	At The Winter Cup	22:55:00	\N	3
67	3	2	2013-01-20	Start!!!	22:01:00	\N	3
68	4	2	2013-01-13	There Is Only One Answer	22:01:00	\N	3
69	5	2	2013-01-06	I''ve Been Waiting for This	22:06:00	\N	3
70	1	1	2002-10-03	Enter: Naruto Uzumaki!	22:01:00	\N	19
71	2	1	2002-10-03	My name is Konohamaru!	22:15:00	\N	19
72	3	1	2002-06-20	Sasuke and Sakura	22:06:00	\N	19
73	4	1	2002-07-07	Survival test	22:19:00	\N	19
74	5	1	2002-06-08	Kakashi''s final descision	22:13:00	\N	19
75	1	2	2007-06-20	Homecoming	22:44:00	\N	19
76	2	2	2007-07-07	Akatsuki makes its move	22:15:00	\N	19
77	3	2	2007-06-08	The result of training	22:06:00	\N	19
78	4	2	2007-10-03	Jinchuriki of sand	22:19:00	\N	19
79	5	2	2007-10-03	The Kazekage stands tall	22:13:00	\N	19
80	1	1	2011-10-03	Turning point	22:44:00	\N	18
81	2	1	2011-10-03	Time travel paranoia	22:51:00	\N	18
82	3	1	2011-06-20	Parallel word paranoia	22:55:00	\N	18
83	4	1	2011-07-07	Interpreter rendezvous	22:16:00	\N	18
84	5	1	2011-06-08	Starmine rendezvous	22:55:00	\N	18
85	6	1	2011-06-20	Butterfly effect''s divergence	22:01:00	\N	18
86	7	1	2011-07-07	Divergence Singularity	22:15:00	\N	18
87	8	1	2011-06-08	Chaos theory homeostasis I	22:06:00	\N	18
88	9	1	2011-10-03	Chaos theory homeostasis II	22:15:00	\N	18
89	10	1	2011-10-03	Chaos theory homeostasis III	22:06:00	\N	18
90	1	1	2013-01-20	Devil''s arrival in Sasazuka	22:19:00	\N	17
91	2	1	2013-01-20	Hero stays at devil''s castle	22:13:00	\N	17
92	3	1	2013-01-20	Devil goes on a date	22:44:00	\N	17
93	4	1	2013-01-13	Hero experiences human warmth	22:15:00	\N	17
94	5	1	2013-01-06	Devil and hero save Sasazuka	22:06:00	\N	17
95	1	1	2012-04-20	The world of swords	22:13:00	\N	16
96	2	1	2012-04-20	Beater	22:44:00	\N	16
97	3	1	2012-04-20	The red nose reindeeer	22:51:00	\N	16
98	4	1	2012-04-13	The black swordsman	22:55:00	\N	16
99	5	1	2012-04-06	A crime within the wall	22:16:00	\N	16
100	1	2	2014-04-20	The world of guns	22:55:00	\N	16
101	2	2	2014-04-20	Cold-hearted sniper	22:01:00	\N	16
102	3	2	2014-04-20	Memories of fresh blood	22:01:00	\N	16
103	4	2	2014-04-13	GGO	22:15:00	\N	16
104	5	2	2014-04-06	Guns and Swords	22:06:00	\N	16
105	1	1	2016-01-06	Flashing before my eyes	22:19:00	\N	15
106	2	1	2016-01-06	Palm of the hands	22:13:00	\N	15
107	3	1	2016-04-20	Birthmark	22:44:00	\N	15
108	4	1	2016-04-20	Accomplishment	22:51:00	\N	15
109	5	1	2016-04-20	Getaway	22:55:00	\N	15
110	6	1	2016-04-13	Grim Reaper	22:16:00	\N	15
111	7	1	2016-04-06	Out of control	22:55:00	\N	15
112	8	1	2016-04-20	Spiral	22:01:00	\N	15
113	9	1	2016-04-20	Closure	22:15:00	\N	15
114	10	1	2016-04-20	Joy	22:06:00	\N	15
115	11	1	2016-04-13	Future	22:15:00	\N	15
116	12	1	2016-04-06	Treasure	22:06:00	\N	15
117	1	1	2004-01-12	The day I become a Shinigami	22:19:00	\N	5
118	2	1	2004-01-16	A Shinigami''s work	22:13:00	\N	5
119	3	1	2004-01-26	Sibling''s wish	22:44:00	\N	5
120	4	1	2004-02-02	Cursed Parakeet	22:15:00	\N	5
121	5	1	2004-02-09	Beat the invisible enemy!	22:06:00	\N	5
122	6	1	2004-02-16	Ichigo vs. Ichigo	22:19:00	\N	5
123	7	1	2004-02-23	Greetings from a stuffed lion	22:13:00	\N	5
124	8	1	2004-03-01	Memories of rain	22:44:00	\N	5
125	9	1	2004-03-08	Unbeatable enemy	22:51:00	\N	5
126	10	1	2004-03-15	Assult on trip	22:55:00	\N	5
127	11	1	2004-03-22	The legendary quincy	22:16:00	\N	5
128	12	1	2004-03-29	A gentle right arm	22:55:00	\N	5
129	1	1	2014-04-20	Tragedy	22:01:00	\N	13
130	2	1	2014-04-20	Incubation	22:01:00	\N	13
131	3	1	2014-04-20	Dove	22:15:00	\N	13
132	4	1	2014-04-13	Supper	22:51:00	\N	13
133	5	1	2014-04-06	Scar	22:55:00	\N	13
134	1	2	2015-04-20	New surge	22:16:00	\N	13
135	2	2	2015-04-20	Dancing flowers	22:55:00	\N	13
136	3	2	2015-04-20	Hangman	22:01:00	\N	13
137	4	2	2015-04-13	Deeper layers	22:15:00	\N	13
138	5	2	2015-04-06	Rift	22:06:00	\N	13
139	1	3	2018-02-09	Start:Those who hunt	22:15:00	\N	13
140	2	3	2018-02-12	Member:Fragments	22:06:00	\N	13
141	3	3	2018-02-25	Fresh:Eve	22:19:00	\N	13
142	4	3	2018-03-02	Main:Auction	22:13:00	\N	13
143	5	3	2018-03-12	Press:Night of scattering	22:44:00	\N	13
144	1	1	2017-03-12	Asta and Yuno	22:15:00	\N	12
145	2	1	2017-03-19	The boy''s promise	22:06:00	\N	12
146	3	1	2017-03-26	To the Royal Capital	22:19:00	\N	12
147	4	1	2017-04-02	Entance exam	22:13:00	\N	12
148	5	1	2017-04-09	Path to the Wizard King	22:44:00	\N	12
149	6	1	2017-04-24	The Black Bulls	22:51:00	\N	12
150	1	1	2018-02-09	I Love You-Auto Memoir Doll	22:55:00	\N	11
151	2	1	2018-02-12	''Never Coming Back''	22:16:00	\N	11
152	3	1	2018-02-25	An Exemplary Auto Memoir Doll	22:55:00	\N	11
153	4	1	2018-03-02	Not a tool	22:01:00	\N	11
154	5	1	2018-03-12	Letters-Bring people together	22:01:00	\N	11
155	1	1	2012-04-20	Revival	22:15:00	\N	10
156	2	1	2012-04-20	Activities	22:51:00	\N	10
157	3	1	2012-04-20	Descendants	22:55:00	\N	10
158	4	1	2012-04-13	Old days	22:16:00	\N	10
159	5	1	2012-04-06	Truth	22:55:00	\N	10
160	1	1	2009-01-20	Disband the Club!	22:01:00	\N	9
161	2	1	2009-01-20	Instruments!	22:15:00	\N	9
162	3	1	2009-01-13	Cram Session!	22:06:00	\N	9
163	4	1	2009-01-06	Training Camp!	22:15:00	\N	9
164	5	1	2009-01-20	Advisor!	22:06:00	\N	9
165	1	2	2010-10-20	Seniors!	22:19:00	\N	9
166	2	2	2010-10-20	Clean-up!	22:13:00	\N	9
167	3	2	2010-10-27	Drummer!	22:44:00	\N	9
168	4	2	2010-11-02	Field Trip!	22:15:00	\N	9
169	5	2	2010-11-13	Staying Behind!	22:06:00	\N	9
170	1	1	2006-01-20	The Day a New Demon was Born	22:19:00	\N	8
171	2	1	2006-01-20	The White Knight Awakens	22:13:00	\N	8
172	3	1	2006-01-13	The False Classmate	22:44:00	\N	8
173	4	1	2006-01-06	His Name is Zero	22:51:00	\N	8
174	5	1	2006-01-20	The Princess and the Witch	22:55:00	\N	8
175	1	2	2008-10-20	The Day a Demon Awakens	22:16:00	\N	8
176	2	2	2008-10-20	Plan for Independent Japan	22:55:00	\N	8
177	3	2	2008-10-27	Imprisoned in Campus	22:01:00	\N	8
178	4	2	2008-11-02	Counterattack at the Gallows	22:15:00	\N	8
179	5	2	2008-11-13	Knights of the Round	22:06:00	\N	8
180	1	1	1999-10-20	I''m Luffy! 	22:19:00	\N	7
181	2	1	1999-10-20	Pirate Hunter Roronoa Zoro!	22:13:00	\N	7
182	3	1	1999-10-27	Morgan versus Luffy! 	22:44:00	\N	7
183	4	1	1999-11-02	Enter Red-Haired Shanks!	22:15:00	\N	7
184	5	1	1999-11-13	Captain Buggy,the Clown Pirate	22:06:00	\N	7
185	6	1	1999-11-16	Beast Tamer Mohji vs. Luffy!	22:19:00	\N	7
186	7	1	1999-11-20	Zoro vs. Cabaji	22:13:00	\N	7
187	8	1	1999-11-27	Devil Fruit Power Showdown!	22:44:00	\N	7
188	9	1	1999-12-05	Captain Usopp!	22:51:00	\N	7
189	10	1	1999-12-13	Jango the Hypnotist!	22:55:00	\N	7
190	1	1	2006-01-20	Claim To Have Gintama (part 1)	22:16:00	\N	6
191	2	1	2006-01-20	Claim To Have Gintama (part 2)	22:55:00	\N	6
192	3	1	2006-01-20	Wavy Hair Can Be That Bad	22:01:00	\N	6
193	4	1	2006-01-13	Watch Out!	22:15:00	\N	6
194	5	1	2006-01-06	Friends-Nicknames-Old Fart	22:06:00	\N	6
195	6	1	2006-01-20	Promise Even If It Kills You	22:19:00	\N	6
196	7	1	2006-01-20	Clean Up After Their Pets	22:13:00	\N	6
197	8	1	2006-01-20	Persistence And Stubbornness	22:44:00	\N	6
198	9	1	2006-01-13	Fighting-Done With Fists	22:15:00	\N	6
199	10	1	2006-01-06	Eat sour when tired	22:06:00	\N	6
200	1	1	2019-01-12	Kaguya wants it	22:15:00	\N	5
201	2	1	2019-01-19	Kaguya Wants to Trade	22:06:00	\N	5
202	3	1	2019-01-26	Kaguya Wants to Walk	22:19:00	\N	5
203	4	1	2019-02-02	Kaguya Wants Affection 	22:13:00	\N	5
204	5	1	2019-02-09	Kaguya Wants to Handle It	22:44:00	\N	5
205	1	2	2020-01-12	Kaguya Wants to Celebrate	22:15:00	\N	5
206	2	2	2020-01-19	Kaguya Wants to Know	22:06:00	\N	5
207	3	2	2020-01-26	Kaguya Doesn''t want to Say it	22:19:00	\N	5
208	1	1	2013-01-20	To you, in 2000 years	22:15:00	\N	2
209	2	1	2013-01-20	That day	22:06:00	\N	2
210	3	1	2013-01-20	A dim Light	22:19:00	\N	2
211	4	1	2013-01-13	The night of the ceremony	22:13:00	\N	2
212	5	1	2013-01-06	First Battle	22:44:00	\N	2
213	6	1	2013-01-20	The World the Girl Saw	22:15:00	\N	2
214	7	1	2013-01-20	Small Blade	22:06:00	\N	2
215	8	1	2013-01-20	I Can Hear His Heartbeat	22:19:00	\N	2
216	9	1	2013-01-13	Whereabouts of His Left Arm	22:13:00	\N	2
217	10	1	2013-01-06	Response	22:44:00	\N	2
218	1	2	2013-07-21	Idol	22:51:00	\N	2
219	2	2	2013-07-06	Wound	22:55:00	\N	2
220	3	2	2013-06-20	Primal Desire	22:16:00	\N	2
221	4	2	2013-07-07	Since That Day	22:55:00	\N	2
222	5	2	2013-06-08	Can''t Look into His Eyes Yet	22:01:00	\N	2
223	4	2	2020-02-02	Kaguya Wants to be Confesed to	22:13:00	\N	5
224	5	2	2020-02-09	Kaguya Wants to kick them out	22:44:00	\N	5
225	1	1	2018-01-12	The Sound of Rain	22:51:00	\N	4
49	2	1	2018-01-19	Rain Drops on Green leaves	22:55:00	\N	4
\.


--
-- Data for Name: episoderates; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.episoderates (userid, episodeid, rating) FROM stdin;
\.


--
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.genre (genrename) FROM stdin;
Action
Adventure
Fantasy
Mystery
Romance
Sci-Fi
Comedy
Supernatural
Drama
Slice of Life
Sports
Horror
\.


--
-- Data for Name: personnel; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.personnel (personnelid, lastname, firstname, gender, birthday, age, address, website, pictureid) FROM stdin;
48	Sasaki	Airi	\N	2009-03-18	\N	5-2-13 Higashi Gotanda, Shinagawa-ku 	\N	\N
49	Yamashita	Aika	\N	1994-09-09	\N	1-7-9 Omido, Higashiosaka	\N	\N
50	Tanaka	Momoka	\N	2001-09-04	\N	5-19-8 Shinei 4 Jo, Kiyota Ward	\N	\N
51	Sugawara	Chika	\N	2003-01-13	\N	6-1-14, Miyanomori 4 Jo, Chuo Ward	\N	\N
52	Miura	Itsuki	\N	2003-12-21	\N	1-1-17 Deshiro, Nishinari Ward	\N	\N
53	Harada	Eiko	\N	1999-01-28	\N	4-9-6 Kamihigashi, Hirano Ward	\N	\N
54	Noguchi	Akina	\N	1992-12-16	\N	3-9-3 Gakuenminami	\N	\N
55	Takada	Fumiko	\N	2006-05-19	\N	2-1-16 Kaminopporo 1 Jo, Atsubetsu Ward	\N	\N
56	Yoshida	Rena	\N	2003-12-21	\N	1-7-19 Saidaiji Akodacho	\N	\N
57	Sato	Kaguya	\N	2007-08-26	\N	2-5-14 Chitose, Atsuta Ward	\N	\N
58	Sano	Kaito	\N	2008-11-22	\N	13-3-13 Toyohira 3 Jo, Toyohira Ward	\N	\N
59	Ueno	Sasuke	\N	1999-05-27	\N	5-4-7 Kikusui 3 Jo, Shiroishi Ward,	\N	\N
60	Masuda	Yamato	\N	1992-01-24	\N	1-5-17, Higashi-Shimbashi, Minato-ku	\N	\N
61	Kudo	Ayato	\N	2009-04-12	\N	1-5-5, Higashi-Shimbashi, Minato-ku	\N	\N
62	Yamaguchi	Minato	\N	1996-04-04	\N	4-9-9 Kamihigashi, Hirano Ward	\N	\N
63	Kaneko	Takuya	\N	1996-08-18	\N	4 3-803 Kusunokiajima, Kita Ward	\N	\N
64	Ueno	Hibiki	\N	1999-12-19	\N	13-3-16 Toyohira 3 Jo, Toyohira Ward	\N	\N
65	Ando	Hisao	\N	1996-05-15	\N	5-2-6 Kikusui 3 Jo, Shiroishi Ward	\N	\N
66	Miyazaki	Junichiro	\N	2000-11-19	\N	2-1-11 Tenjinnomori, Nishinari Ward	\N	\N
67	Yamazaki	Hyousuke	\N	1997-12-02	\N	2 1-1 Honjocho, Yamatokoriyama	\N	\N
68	Aoshi	Arimura 	\N	2012-12-01	\N	613 Nostrand Ave	\N	\N
69	Murphy	Billy 	\N	2005-08-11	\N	1-7-13 Saidaiji Akodacho	\N	\N
70	Shaw	Gerald 	\N	2010-08-10	\N	2-5-19 Chitose, Atsuta Ward	\N	\N
71	Wan	Ku Ching 	\N	2015-06-19	\N	401 Figueroa Street	\N	\N
72	Kenta	Yamamoto 	\N	2020-06-29	\N	670 Wicklow Road	\N	\N
73	Wing	Fan Sum 	\N	2015-06-14	\N	672 S Broadway	\N	\N
74	Kawahara	Reki	\N	1980-07-10	\N	411 Figueroa Street	\N	\N
75	Hernandez	Mary	\N	1985-02-04	\N	593 Wall Street	\N	\N
76	Cole	Annie	\N	1985-12-17	\N	608 Ridgewood Road	\N	\N
77	Watanabe	Riku	\N	1983-09-26	\N	6 1-1 Honjocho, Yamatokoriyama	\N	\N
78	Spencer	Tracy	\N	2000-04-02	\N	292 Little Clarendon St	\N	\N
79	Gutierrez	Rebecca	\N	1992-11-26	\N	3 Wicklow Road	\N	\N
80	Patel	Beverly	\N	1988-03-30	\N	131 Central Avenue	\N	\N
81	Ueda	Hana	\N	2000-08-27	\N	4-9-3 Kamihigashi, Hirano Ward	\N	\N
82	Wilson	Clara	\N	1987-05-15	\N	870 East Cooke Road	\N	\N
83	Medina	Joshua	\N	1996-05-10	\N	872 Spring Gardens	\N	\N
84	 Kinoshita	Tetsuya	\N	1997-02-15	\N	651 Flatbush Ave	\N	\N
85	Tateishi	Kensuke	\N	1983-03-11	\N	397 Broadway	\N	\N
86	 Maeda	Toshihiro	\N	1984-07-06	\N	189 Bank Street	\N	\N
87	Yamamoto	Daisuke	\N	2001-10-25	\N	677 Columbia St	\N	\N
88	Chiba	Eita	\N	1998-02-07	\N	5-2-10 Higashi Gotanda, Shinagawa-ku 	\N	\N
89	Furukawa	Shin	\N	2015-06-14	\N	672 S Broadway	\N	\N
90	Nagase	Tomohito	\N	1980-07-10	\N	411 Figueroa Street	\N	\N
91	Wada	George	\N	1985-02-04	\N	593 Wall Street	\N	\N
92	Endo	Tetsuya	\N	1985-12-17	\N	608 Ridgewood Road	\N	\N
93	Nishiya	Yasuyuki	\N	1983-09-26	\N	6 1-1 Honjocho, Yamatokoriyama	\N	\N
94	Kiyota	Sakuno	\N	2000-04-02	\N	292 Little Clarendon St	\N	\N
95	Ito	Hitoshi	\N	1992-11-26	\N	3 Wicklow Road	\N	\N
96	Kimura	Makoto	\N	2015-06-19	\N	401 Figueroa Street	\N	\N
97	Nishimiya	Mariko	\N	1980-07-10	\N	397 Broadway	\N	\N
98	Kashiwagi	Kei	\N	1996-05-10	\N	6 1-1 Honjocho, Yamatokoriyama	\N	\N
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.review (reviewid, content, votes, reviewtime, animeid, userid) FROM stdin;
\.


--
-- Data for Name: reviewvote; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.reviewvote (reviewid, userid, voteupordown, commentonreview, commenttime) FROM stdin;
\.


--
-- Data for Name: studio; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.studio (studioname, foundingdate, office_address, website) FROM stdin;
A-1 Pictures	2003-05-03	Tokyo	a1p.jp
White Fox	2015-01-13	Osaka	w-fox.co.jp
Toei Animation	1998-06-10	Tokyo	www.toei-anim.co.jp
Sunrise	1972-12-12	Tokyo	sunrise-inc.co.jp
Wit Studio	2009-01-15	Tokyo	witstudio.co.jp
Kyoto Animation	1981-12-05	Kyoto	kyotoanimation.co.jp
Pierro	1979-05-16	Tokyo	en.pierro.jp
Mappa	2007-06-08	Tokyo	mappa.co.jp
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.users (userid, security_key, email, biography, pictureid, admin) FROM stdin;
mohaimin	amarPassword	mohaimin@test.com	\N	0def0052-0af8-11ed-9b9e-3bfa2000802e.jpg	t
sadif	tomarPassword	sadif@test.com	\N	031e2b12-0af8-11ed-bb53-0f78b2b4099c.jpg	t
siam	tarPassword	siam@test.com	\N	9f2a3916-0af7-11ed-b1e9-87055a9e8d61.jpg	t
test1	password	test@test.com	\N	344058d2-0af8-11ed-a5e5-4b31b0708a7b	f
john	johnerpassword	john@gmail.com	\N	ce6d20bc-0af7-11ed-8a89-fb699d599405.jpg	f
mary	maryerPassword	mary@yahoo.com	\N	ef6ee778-0af7-11ed-8dfa-732a934cf103.jpg	f
jane	janeD-e	jane@doe.com	\N	cc5b1760-15f7-11ed-ba7b-c332ac0e7e58.jpg	f
\.


--
-- Data for Name: watchlist; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.watchlist (userid, favourite, animeid) FROM stdin;
\.


--
-- Data for Name: watchroom; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.watchroom (watchroomid, watchroomname, starttime, endtime, animeid) FROM stdin;
\.


--
-- Data for Name: watchroomparticipants; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.watchroomparticipants (userid, watchroomid) FROM stdin;
\.


--
-- Name: anime_animeid_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.anime_animeid_seq', 19, true);


--
-- Name: characters_characterid_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.characters_characterid_seq', 172, true);


--
-- Name: episode_episodeid_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.episode_episodeid_seq', 225, true);


--
-- Name: personnel_personnelid_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.personnel_personnelid_seq', 98, true);


--
-- Name: review_reviewid_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.review_reviewid_seq', 1, false);


--
-- Name: watchroom_watchroomid_seq; Type: SEQUENCE SET; Schema: public; Owner: me
--

SELECT pg_catalog.setval('public.watchroom_watchroomid_seq', 1, false);


--
-- Name: anime anime_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.anime
    ADD CONSTRAINT anime_pkey PRIMARY KEY (animeid);


--
-- Name: animecharacter animecharacter_pk; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animecharacter
    ADD CONSTRAINT animecharacter_pk PRIMARY KEY (animeid, characterid);


--
-- Name: animeisofgenre animeisofgenre_pk; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animeisofgenre
    ADD CONSTRAINT animeisofgenre_pk PRIMARY KEY (animeid, genrename);


--
-- Name: animepicture animepicture_pk; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animepicture
    ADD CONSTRAINT animepicture_pk PRIMARY KEY (pictureid, animeid);


--
-- Name: animestaff animestaff_pk; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animestaff
    ADD CONSTRAINT animestaff_pk PRIMARY KEY (personnelid, animeid);


--
-- Name: animestars animestars_pk; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animestars
    ADD CONSTRAINT animestars_pk PRIMARY KEY (animeid, userid);


--
-- Name: animestudio animestudio_pk; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animestudio
    ADD CONSTRAINT animestudio_pk PRIMARY KEY (animeid, studioname);


--
-- Name: characters characters_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.characters
    ADD CONSTRAINT characters_pkey PRIMARY KEY (characterid);


--
-- Name: charactervoiceactor charactervoiceactor_pk; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.charactervoiceactor
    ADD CONSTRAINT charactervoiceactor_pk PRIMARY KEY (characterid, personnelid);


--
-- Name: episode episode_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.episode
    ADD CONSTRAINT episode_pkey PRIMARY KEY (episodeid);


--
-- Name: episoderates episoderates_pk; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.episoderates
    ADD CONSTRAINT episoderates_pk PRIMARY KEY (episodeid, userid);


--
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (genrename);


--
-- Name: personnel personnel_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.personnel
    ADD CONSTRAINT personnel_pkey PRIMARY KEY (personnelid);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (reviewid);


--
-- Name: studio studio_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.studio
    ADD CONSTRAINT studio_pkey PRIMARY KEY (studioname);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: watchlist watchlist_pk; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.watchlist
    ADD CONSTRAINT watchlist_pk PRIMARY KEY (userid, animeid);


--
-- Name: watchroom watchroom_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.watchroom
    ADD CONSTRAINT watchroom_pkey PRIMARY KEY (watchroomid);


--
-- Name: watchroomparticipants watchroomparticipants_pk; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.watchroomparticipants
    ADD CONSTRAINT watchroomparticipants_pk PRIMARY KEY (userid, watchroomid);


--
-- Name: episode fk_anime_episode; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.episode
    ADD CONSTRAINT fk_anime_episode FOREIGN KEY (animeid) REFERENCES public.anime(animeid) ON DELETE CASCADE;


--
-- Name: animecharacter fk_anime_hascharacters; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animecharacter
    ADD CONSTRAINT fk_anime_hascharacters FOREIGN KEY (characterid) REFERENCES public.characters(characterid) ON DELETE CASCADE;


--
-- Name: review fk_anime_review; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT fk_anime_review FOREIGN KEY (animeid) REFERENCES public.anime(animeid) ON DELETE CASCADE;


--
-- Name: watchroom fk_anime_watchroom; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.watchroom
    ADD CONSTRAINT fk_anime_watchroom FOREIGN KEY (animeid) REFERENCES public.anime(animeid) ON DELETE CASCADE;


--
-- Name: animeisofgenre fk_animegenre_anime; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animeisofgenre
    ADD CONSTRAINT fk_animegenre_anime FOREIGN KEY (animeid) REFERENCES public.anime(animeid) ON DELETE CASCADE;


--
-- Name: animeisofgenre fk_animegenre_genre; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animeisofgenre
    ADD CONSTRAINT fk_animegenre_genre FOREIGN KEY (genrename) REFERENCES public.genre(genrename) ON DELETE CASCADE;


--
-- Name: animepicture fk_animepicture_anime; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animepicture
    ADD CONSTRAINT fk_animepicture_anime FOREIGN KEY (animeid) REFERENCES public.anime(animeid) ON DELETE CASCADE;


--
-- Name: animestudio fk_animestudio_anime; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animestudio
    ADD CONSTRAINT fk_animestudio_anime FOREIGN KEY (animeid) REFERENCES public.anime(animeid) ON DELETE CASCADE;


--
-- Name: animestudio fk_animestudio_studio; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animestudio
    ADD CONSTRAINT fk_animestudio_studio FOREIGN KEY (studioname) REFERENCES public.studio(studioname) ON DELETE CASCADE;


--
-- Name: animecharacter fk_characterisin_anime; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animecharacter
    ADD CONSTRAINT fk_characterisin_anime FOREIGN KEY (animeid) REFERENCES public.anime(animeid) ON DELETE CASCADE;


--
-- Name: episoderates fk_episoderate_episode; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.episoderates
    ADD CONSTRAINT fk_episoderate_episode FOREIGN KEY (episodeid) REFERENCES public.episode(episodeid) ON DELETE CASCADE;


--
-- Name: episoderates fk_episoderate_users; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.episoderates
    ADD CONSTRAINT fk_episoderate_users FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: animestars fk_givesstar_anime; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animestars
    ADD CONSTRAINT fk_givesstar_anime FOREIGN KEY (animeid) REFERENCES public.anime(animeid) ON DELETE CASCADE;


--
-- Name: animestars fk_givesstar_user; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animestars
    ADD CONSTRAINT fk_givesstar_user FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: watchroomparticipants fk_participatewatchroom_user; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.watchroomparticipants
    ADD CONSTRAINT fk_participatewatchroom_user FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: watchroomparticipants fk_participatewatchroom_watchroom; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.watchroomparticipants
    ADD CONSTRAINT fk_participatewatchroom_watchroom FOREIGN KEY (watchroomid) REFERENCES public.watchroom(watchroomid) ON DELETE CASCADE;


--
-- Name: reviewvote fk_review_reviewvote; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.reviewvote
    ADD CONSTRAINT fk_review_reviewvote FOREIGN KEY (reviewid) REFERENCES public.review(reviewid) ON DELETE CASCADE;


--
-- Name: animestaff fk_staff_anime; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animestaff
    ADD CONSTRAINT fk_staff_anime FOREIGN KEY (animeid) REFERENCES public.anime(animeid) ON DELETE CASCADE;


--
-- Name: animestaff fk_staff_personnel; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.animestaff
    ADD CONSTRAINT fk_staff_personnel FOREIGN KEY (personnelid) REFERENCES public.personnel(personnelid) ON DELETE CASCADE;


--
-- Name: review fk_user_review; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT fk_user_review FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: reviewvote fk_user_reviewvote; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.reviewvote
    ADD CONSTRAINT fk_user_reviewvote FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- Name: charactervoiceactor fk_voiceactor_character; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.charactervoiceactor
    ADD CONSTRAINT fk_voiceactor_character FOREIGN KEY (characterid) REFERENCES public.characters(characterid) ON DELETE CASCADE;


--
-- Name: charactervoiceactor fk_voiceactor_personnel; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.charactervoiceactor
    ADD CONSTRAINT fk_voiceactor_personnel FOREIGN KEY (personnelid) REFERENCES public.personnel(personnelid) ON DELETE CASCADE;


--
-- Name: watchlist fk_watchlist_anime; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.watchlist
    ADD CONSTRAINT fk_watchlist_anime FOREIGN KEY (animeid) REFERENCES public.anime(animeid) ON DELETE CASCADE;


--
-- Name: watchlist fk_watchlist_user; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.watchlist
    ADD CONSTRAINT fk_watchlist_user FOREIGN KEY (userid) REFERENCES public.users(userid) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

