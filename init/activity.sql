--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)

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
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activities (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    url character varying(255) NOT NULL,
    is_free boolean NOT NULL,
    price double precision,
    duration double precision NOT NULL,
    partner character varying(255) NOT NULL,
    category_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.activities OWNER TO postgres;

--
-- Name: activities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.activities_id_seq OWNER TO postgres;

--
-- Name: activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activities_id_seq OWNED BY public.activities.id;


--
-- Name: activity_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_categories (
    id integer NOT NULL,
    name character varying(255),
    picture_id integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.activity_categories OWNER TO postgres;

--
-- Name: activity_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.activity_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.activity_categories_id_seq OWNER TO postgres;

--
-- Name: activity_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.activity_categories_id_seq OWNED BY public.activity_categories.id;


--
-- Name: pictures; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pictures (
    id integer NOT NULL,
    path character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.pictures OWNER TO postgres;

--
-- Name: pictures_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pictures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pictures_id_seq OWNER TO postgres;

--
-- Name: pictures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pictures_id_seq OWNED BY public.pictures.id;


--
-- Name: ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ratings (
    id integer NOT NULL,
    rating integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.ratings OWNER TO postgres;

--
-- Name: ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ratings_id_seq OWNER TO postgres;

--
-- Name: ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ratings_id_seq OWNED BY public.ratings.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    rating_id integer NOT NULL,
    comment character varying(255),
    user_id integer,
    activity_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: activities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities ALTER COLUMN id SET DEFAULT nextval('public.activities_id_seq'::regclass);


--
-- Name: activity_categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_categories ALTER COLUMN id SET DEFAULT nextval('public.activity_categories_id_seq'::regclass);


--
-- Name: pictures id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pictures ALTER COLUMN id SET DEFAULT nextval('public.pictures_id_seq'::regclass);


--
-- Name: ratings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings ALTER COLUMN id SET DEFAULT nextval('public.ratings_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20240828175154-create-picture.js
20240828175155-create-activity-category.js
20240828175157-create-activity.js
20240828175158-create-rating.js
20240828175159-create-review.js
\.


--
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activities (id, name, description, url, is_free, price, duration, partner, category_id, created_at, updated_at) FROM stdin;
1	Sports montagne	Profitez d'une excursion passionnante en hélicoptère privé au-dessus de Beverly Hills et d'Hollywood. Lors de cette excursion, vous découvrirez la vie intime de célébrités, tout en écoutant les histoires vraies racontées par votre sympathique pilote.Commencez votre visite à l'aéroport de classe mondiale de Burbank, à deux pas des studios Universal et Warner Bros. Veuillez être présent au point de rencontre au moins 30 min avant le décollage afin de rencontrer le personnel de vol et d’obtenir les informations nécessaires au bon déroulement de l’activité.Décollez du sol et envolez-vous dans les airs en survolant les collines d'Hollywood et le bassin de Los Angeles.En passant au-dessus des studios Universal, tentez d’apercevoir la foule qui fait la file pour gouter une bièraubeurre dans le Wizarding World d’Harry Potter ou les volutes de fumées s’échappant des stunt shows ou des spectacles d’animaux.Passez devant le panneau d’Hollywood et ne manquez pas de le prendre en photo, ou en selfie si vous êtes rapide, d’un angle véritablement unique.Survolez ensuite Mulholland Drive et Laurel Canyon, enclave exclusive et historique où résidaient autrefois les plus grands noms de l’industrie musicale. Passez par Beverly Hills et le richissime Bel-Air, et découvrez le manoir de 90 millions de dollars acheté par Jay-Z et Beyonce en 2017.Chaque siège est le meilleur dans un tour qui comprend un casque anti-bruit qui vous permet d'écouter les commentaires de votre pilote pendant que vous tourbillonnez dans les airs au cours de cette aventure exclusive en hélicoptère avec des célébrités.Pour un supplément, réservez cette excursion en privé ou ajoutez-y l’option coucher de soleil pour admirer ce magnifique spectacle de la nature et rendre cette expérience encore plus incroyable.	https://www.getyourguide.fr/los-angeles-l179/beverly-hills-et-hollywood-excursion-en-helicoptere-t194891/?ranking_uuid=24de875b-aae6-4057-9220-efda335a4ff7%	f	180.09	15	GetYourGuide	6	2025-05-28 18:38:52.839+02	2025-05-28 18:38:52.839+02
2	Sports montagne	Profitez d'une excursion passionnante en hélicoptère privé au-dessus de Beverly Hills et d'Hollywood. Lors de cette excursion, vous découvrirez la vie intime de célébrités, tout en écoutant les histoires vraies racontées par votre sympathique pilote.Commencez votre visite à l'aéroport de classe mondiale de Burbank, à deux pas des studios Universal et Warner Bros. Veuillez être présent au point de rencontre au moins 30 min avant le décollage afin de rencontrer le personnel de vol et d’obtenir les informations nécessaires au bon déroulement de l’activité.Décollez du sol et envolez-vous dans les airs en survolant les collines d'Hollywood et le bassin de Los Angeles.En passant au-dessus des studios Universal, tentez d’apercevoir la foule qui fait la file pour gouter une bièraubeurre dans le Wizarding World d’Harry Potter ou les volutes de fumées s’échappant des stunt shows ou des spectacles d’animaux.Passez devant le panneau d’Hollywood et ne manquez pas de le prendre en photo, ou en selfie si vous êtes rapide, d’un angle véritablement unique.Survolez ensuite Mulholland Drive et Laurel Canyon, enclave exclusive et historique où résidaient autrefois les plus grands noms de l’industrie musicale. Passez par Beverly Hills et le richissime Bel-Air, et découvrez le manoir de 90 millions de dollars acheté par Jay-Z et Beyonce en 2017.Chaque siège est le meilleur dans un tour qui comprend un casque anti-bruit qui vous permet d'écouter les commentaires de votre pilote pendant que vous tourbillonnez dans les airs au cours de cette aventure exclusive en hélicoptère avec des célébrités.Pour un supplément, réservez cette excursion en privé ou ajoutez-y l’option coucher de soleil pour admirer ce magnifique spectacle de la nature et rendre cette expérience encore plus incroyable.	https://www.getyourguide.fr/los-angeles-l179/beverly-hills-et-hollywood-excursion-en-helicoptere-t194891/?ranking_uuid=24de875b-aae6-4057-9220-efda335a4ff7%	f	180.09	15	GetYourGuide	6	2025-05-28 18:38:52.841+02	2025-05-28 18:38:52.841+02
3	Sports montagne	Profitez d'une excursion passionnante en hélicoptère privé au-dessus de Beverly Hills et d'Hollywood. Lors de cette excursion, vous découvrirez la vie intime de célébrités, tout en écoutant les histoires vraies racontées par votre sympathique pilote.Commencez votre visite à l'aéroport de classe mondiale de Burbank, à deux pas des studios Universal et Warner Bros. Veuillez être présent au point de rencontre au moins 30 min avant le décollage afin de rencontrer le personnel de vol et d’obtenir les informations nécessaires au bon déroulement de l’activité.Décollez du sol et envolez-vous dans les airs en survolant les collines d'Hollywood et le bassin de Los Angeles.En passant au-dessus des studios Universal, tentez d’apercevoir la foule qui fait la file pour gouter une bièraubeurre dans le Wizarding World d’Harry Potter ou les volutes de fumées s’échappant des stunt shows ou des spectacles d’animaux.Passez devant le panneau d’Hollywood et ne manquez pas de le prendre en photo, ou en selfie si vous êtes rapide, d’un angle véritablement unique.Survolez ensuite Mulholland Drive et Laurel Canyon, enclave exclusive et historique où résidaient autrefois les plus grands noms de l’industrie musicale. Passez par Beverly Hills et le richissime Bel-Air, et découvrez le manoir de 90 millions de dollars acheté par Jay-Z et Beyonce en 2017.Chaque siège est le meilleur dans un tour qui comprend un casque anti-bruit qui vous permet d'écouter les commentaires de votre pilote pendant que vous tourbillonnez dans les airs au cours de cette aventure exclusive en hélicoptère avec des célébrités.Pour un supplément, réservez cette excursion en privé ou ajoutez-y l’option coucher de soleil pour admirer ce magnifique spectacle de la nature et rendre cette expérience encore plus incroyable.	https://www.getyourguide.fr/los-angeles-l179/beverly-hills-et-hollywood-excursion-en-helicoptere-t194891/?ranking_uuid=24de875b-aae6-4057-9220-efda335a4ff7%	f	180.09	15	GetYourGuide	6	2025-05-28 18:38:52.842+02	2025-05-28 18:38:52.842+02
4	Sports montagne	Profitez d'une excursion passionnante en hélicoptère privé au-dessus de Beverly Hills et d'Hollywood. Lors de cette excursion, vous découvrirez la vie intime de célébrités, tout en écoutant les histoires vraies racontées par votre sympathique pilote.Commencez votre visite à l'aéroport de classe mondiale de Burbank, à deux pas des studios Universal et Warner Bros. Veuillez être présent au point de rencontre au moins 30 min avant le décollage afin de rencontrer le personnel de vol et d’obtenir les informations nécessaires au bon déroulement de l’activité.Décollez du sol et envolez-vous dans les airs en survolant les collines d'Hollywood et le bassin de Los Angeles.En passant au-dessus des studios Universal, tentez d’apercevoir la foule qui fait la file pour gouter une bièraubeurre dans le Wizarding World d’Harry Potter ou les volutes de fumées s’échappant des stunt shows ou des spectacles d’animaux.Passez devant le panneau d’Hollywood et ne manquez pas de le prendre en photo, ou en selfie si vous êtes rapide, d’un angle véritablement unique.Survolez ensuite Mulholland Drive et Laurel Canyon, enclave exclusive et historique où résidaient autrefois les plus grands noms de l’industrie musicale. Passez par Beverly Hills et le richissime Bel-Air, et découvrez le manoir de 90 millions de dollars acheté par Jay-Z et Beyonce en 2017.Chaque siège est le meilleur dans un tour qui comprend un casque anti-bruit qui vous permet d'écouter les commentaires de votre pilote pendant que vous tourbillonnez dans les airs au cours de cette aventure exclusive en hélicoptère avec des célébrités.Pour un supplément, réservez cette excursion en privé ou ajoutez-y l’option coucher de soleil pour admirer ce magnifique spectacle de la nature et rendre cette expérience encore plus incroyable.	https://www.getyourguide.fr/los-angeles-l179/beverly-hills-et-hollywood-excursion-en-helicoptere-t194891/?ranking_uuid=24de875b-aae6-4057-9220-efda335a4ff7%	f	180.09	15	GetYourGuide	6	2025-05-28 18:38:52.843+02	2025-05-28 18:38:52.843+02
5	Sports montagne	Profitez d'une excursion passionnante en hélicoptère privé au-dessus de Beverly Hills et d'Hollywood. Lors de cette excursion, vous découvrirez la vie intime de célébrités, tout en écoutant les histoires vraies racontées par votre sympathique pilote.Commencez votre visite à l'aéroport de classe mondiale de Burbank, à deux pas des studios Universal et Warner Bros. Veuillez être présent au point de rencontre au moins 30 min avant le décollage afin de rencontrer le personnel de vol et d’obtenir les informations nécessaires au bon déroulement de l’activité.Décollez du sol et envolez-vous dans les airs en survolant les collines d'Hollywood et le bassin de Los Angeles.En passant au-dessus des studios Universal, tentez d’apercevoir la foule qui fait la file pour gouter une bièraubeurre dans le Wizarding World d’Harry Potter ou les volutes de fumées s’échappant des stunt shows ou des spectacles d’animaux.Passez devant le panneau d’Hollywood et ne manquez pas de le prendre en photo, ou en selfie si vous êtes rapide, d’un angle véritablement unique.Survolez ensuite Mulholland Drive et Laurel Canyon, enclave exclusive et historique où résidaient autrefois les plus grands noms de l’industrie musicale. Passez par Beverly Hills et le richissime Bel-Air, et découvrez le manoir de 90 millions de dollars acheté par Jay-Z et Beyonce en 2017.Chaque siège est le meilleur dans un tour qui comprend un casque anti-bruit qui vous permet d'écouter les commentaires de votre pilote pendant que vous tourbillonnez dans les airs au cours de cette aventure exclusive en hélicoptère avec des célébrités.Pour un supplément, réservez cette excursion en privé ou ajoutez-y l’option coucher de soleil pour admirer ce magnifique spectacle de la nature et rendre cette expérience encore plus incroyable.	https://www.getyourguide.fr/los-angeles-l179/beverly-hills-et-hollywood-excursion-en-helicoptere-t194891/?ranking_uuid=24de875b-aae6-4057-9220-efda335a4ff7%	f	180.09	15	GetYourGuide	6	2025-05-28 18:38:52.845+02	2025-05-28 18:38:52.845+02
6	Sports montagne	Profitez d'une excursion passionnante en hélicoptère privé au-dessus de Beverly Hills et d'Hollywood. Lors de cette excursion, vous découvrirez la vie intime de célébrités, tout en écoutant les histoires vraies racontées par votre sympathique pilote.Commencez votre visite à l'aéroport de classe mondiale de Burbank, à deux pas des studios Universal et Warner Bros. Veuillez être présent au point de rencontre au moins 30 min avant le décollage afin de rencontrer le personnel de vol et d’obtenir les informations nécessaires au bon déroulement de l’activité.Décollez du sol et envolez-vous dans les airs en survolant les collines d'Hollywood et le bassin de Los Angeles.En passant au-dessus des studios Universal, tentez d’apercevoir la foule qui fait la file pour gouter une bièraubeurre dans le Wizarding World d’Harry Potter ou les volutes de fumées s’échappant des stunt shows ou des spectacles d’animaux.Passez devant le panneau d’Hollywood et ne manquez pas de le prendre en photo, ou en selfie si vous êtes rapide, d’un angle véritablement unique.Survolez ensuite Mulholland Drive et Laurel Canyon, enclave exclusive et historique où résidaient autrefois les plus grands noms de l’industrie musicale. Passez par Beverly Hills et le richissime Bel-Air, et découvrez le manoir de 90 millions de dollars acheté par Jay-Z et Beyonce en 2017.Chaque siège est le meilleur dans un tour qui comprend un casque anti-bruit qui vous permet d'écouter les commentaires de votre pilote pendant que vous tourbillonnez dans les airs au cours de cette aventure exclusive en hélicoptère avec des célébrités.Pour un supplément, réservez cette excursion en privé ou ajoutez-y l’option coucher de soleil pour admirer ce magnifique spectacle de la nature et rendre cette expérience encore plus incroyable.	https://www.getyourguide.fr/los-angeles-l179/beverly-hills-et-hollywood-excursion-en-helicoptere-t194891/?ranking_uuid=24de875b-aae6-4057-9220-efda335a4ff7%	f	180.09	15	GetYourGuide	6	2025-05-28 18:38:52.846+02	2025-05-28 18:38:52.846+02
\.


--
-- Data for Name: activity_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activity_categories (id, name, picture_id, created_at, updated_at) FROM stdin;
1	Sports montagne	1	2025-05-28 18:38:52.831+02	2025-05-28 18:38:52.831+02
2	Sports aquatiques	1	2025-05-28 18:38:52.833+02	2025-05-28 18:38:52.833+02
3	Randonnées	2	2025-05-28 18:38:52.834+02	2025-05-28 18:38:52.834+02
4	Auto - Moto	3	2025-05-28 18:38:52.835+02	2025-05-28 18:38:52.835+02
5	Visites	3	2025-05-28 18:38:52.836+02	2025-05-28 18:38:52.836+02
6	Aerien	3	2025-05-28 18:38:52.837+02	2025-05-28 18:38:52.837+02
\.


--
-- Data for Name: pictures; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pictures (id, path, created_at, updated_at) FROM stdin;
1	https://picsum.photos/200/300	2025-05-28 18:38:52.821+02	2025-05-28 18:38:52.821+02
2	https://picsum.photos/200/300	2025-05-28 18:38:52.826+02	2025-05-28 18:38:52.826+02
3	https://picsum.photos/200/300	2025-05-28 18:38:52.827+02	2025-05-28 18:38:52.827+02
4	https://picsum.photos/200/300	2025-05-28 18:38:52.828+02	2025-05-28 18:38:52.828+02
5	https://picsum.photos/200/300	2025-05-28 18:38:52.829+02	2025-05-28 18:38:52.829+02
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ratings (id, rating, created_at, updated_at) FROM stdin;
1	1	2025-05-28 18:38:52.848+02	2025-05-28 18:38:52.848+02
2	2	2025-05-28 18:38:52.849+02	2025-05-28 18:38:52.849+02
3	3	2025-05-28 18:38:52.85+02	2025-05-28 18:38:52.85+02
4	4	2025-05-28 18:38:52.85+02	2025-05-28 18:38:52.85+02
5	5	2025-05-28 18:38:52.851+02	2025-05-28 18:38:52.851+02
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, rating_id, comment, user_id, activity_id, created_at, updated_at) FROM stdin;
1	1	Lorem ipsum dolor sit amet, consectetur adipiscing elit	1	1	2025-05-28 18:38:52.853+02	2025-05-28 18:38:52.853+02
2	1	Lorem ipsum dolor sit amet, consectetur adipiscing elit	1	1	2025-05-28 18:38:52.854+02	2025-05-28 18:38:52.854+02
3	1	Lorem ipsum dolor sit amet, consectetur adipiscing elit	1	1	2025-05-28 18:38:52.855+02	2025-05-28 18:38:52.855+02
4	1	Lorem ipsum dolor sit amet, consectetur adipiscing elit	1	1	2025-05-28 18:38:52.856+02	2025-05-28 18:38:52.856+02
5	1	Lorem ipsum dolor sit amet, consectetur adipiscing elit	1	1	2025-05-28 18:38:52.857+02	2025-05-28 18:38:52.857+02
\.


--
-- Name: activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activities_id_seq', 6, true);


--
-- Name: activity_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.activity_categories_id_seq', 6, true);


--
-- Name: pictures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pictures_id_seq', 5, true);


--
-- Name: ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ratings_id_seq', 5, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 5, true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- Name: activity_categories activity_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_categories
    ADD CONSTRAINT activity_categories_pkey PRIMARY KEY (id);


--
-- Name: pictures pictures_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pictures
    ADD CONSTRAINT pictures_pkey PRIMARY KEY (id);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: reviews activity_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT activity_id FOREIGN KEY (activity_id) REFERENCES public.activities(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activities category_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT category_id FOREIGN KEY (category_id) REFERENCES public.activity_categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: activity_categories picture_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_categories
    ADD CONSTRAINT picture_id FOREIGN KEY (picture_id) REFERENCES public.pictures(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reviews rating_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT rating_id FOREIGN KEY (rating_id) REFERENCES public.ratings(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

