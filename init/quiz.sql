--
-- PostgreSQL database dump
--

-- Dumped from database version 16.8 (Ubuntu 16.8-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.8 (Ubuntu 16.8-0ubuntu0.24.04.1)

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA IF NOT EXISTS public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: enum_trip_day_activities_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_trip_day_activities_status AS ENUM (
    'APayer',
    'EnAttenteDeReservation',
    'EnAttenteDeConfirmation',
    'ProblemeDeReservation',
    'Reserve',
    'Annuler'
);


ALTER TYPE public.enum_trip_day_activities_status OWNER TO postgres;

--
-- Name: enum_trip_hotels_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_trip_hotels_status AS ENUM (
    'APayer',
    'EnAttenteDeReservation',
    'EnAttenteDeConfirmation',
    'ProblemeDeReservation',
    'Reserve',
    'Annuler'
);


ALTER TYPE public.enum_trip_hotels_status OWNER TO postgres;

--
-- Name: enum_trip_transportations_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_trip_transportations_status AS ENUM (
    'APayer',
    'EnAttenteDeReservation',
    'EnAttenteDeConfirmation',
    'ProblemeDeReservation',
    'Reserve',
    'Annuler'
);


ALTER TYPE public.enum_trip_transportations_status OWNER TO postgres;

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
-- Name: organization_urls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organization_urls (
    id integer NOT NULL,
    url text NOT NULL,
    organization_id integer NOT NULL,
    rank integer NOT NULL,
    partner character varying(255) NOT NULL,
    key character varying(255),
    status_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.organization_urls OWNER TO postgres;

--
-- Name: organization_urls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organization_urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.organization_urls_id_seq OWNER TO postgres;

--
-- Name: organization_urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organization_urls_id_seq OWNED BY public.organization_urls.id;


--
-- Name: organizations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organizations (
    id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    status_id integer NOT NULL
);


ALTER TABLE public.organizations OWNER TO postgres;

--
-- Name: organizations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.organizations_id_seq OWNER TO postgres;

--
-- Name: organizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organizations_id_seq OWNED BY public.organizations.id;


--
-- Name: quiz_answer_texts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz_answer_texts (
    id integer NOT NULL,
    answer text,
    quiz_line_id integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.quiz_answer_texts OWNER TO postgres;

--
-- Name: quiz_answer_texts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quiz_answer_texts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quiz_answer_texts_id_seq OWNER TO postgres;

--
-- Name: quiz_answer_texts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quiz_answer_texts_id_seq OWNED BY public.quiz_answer_texts.id;


--
-- Name: quiz_lines; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz_lines (
    id integer NOT NULL,
    question text,
    step integer NOT NULL,
    is_required boolean,
    is_text boolean,
    is_boolean boolean,
    quiz_id integer NOT NULL,
    parent integer,
    mutiple_type_answer boolean NOT NULL,
    response_kind_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.quiz_lines OWNER TO postgres;

--
-- Name: quiz_lines_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quiz_lines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quiz_lines_id_seq OWNER TO postgres;

--
-- Name: quiz_lines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quiz_lines_id_seq OWNED BY public.quiz_lines.id;


--
-- Name: quiz_responses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz_responses (
    id integer NOT NULL,
    user_id integer,
    quiz_id integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.quiz_responses OWNER TO postgres;

--
-- Name: quiz_responses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quiz_responses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quiz_responses_id_seq OWNER TO postgres;

--
-- Name: quiz_responses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quiz_responses_id_seq OWNED BY public.quiz_responses.id;


--
-- Name: quizzes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quizzes (
    id integer NOT NULL,
    name character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE public.quizzes OWNER TO postgres;

--
-- Name: quizzes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quizzes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quizzes_id_seq OWNER TO postgres;

--
-- Name: quizzes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quizzes_id_seq OWNED BY public.quizzes.id;


--
-- Name: response_kinds; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.response_kinds (
    id integer NOT NULL,
    type character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.response_kinds OWNER TO postgres;

--
-- Name: response_kinds_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.response_kinds_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.response_kinds_id_seq OWNER TO postgres;

--
-- Name: response_kinds_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.response_kinds_id_seq OWNED BY public.response_kinds.id;


--
-- Name: result_activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.result_activities (
    id integer NOT NULL,
    test integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    result_city integer NOT NULL,
    activity_id integer NOT NULL
);


ALTER TABLE public.result_activities OWNER TO postgres;

--
-- Name: result_activities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.result_activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.result_activities_id_seq OWNER TO postgres;

--
-- Name: result_activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.result_activities_id_seq OWNED BY public.result_activities.id;


--
-- Name: result_cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.result_cities (
    id integer NOT NULL,
    step integer,
    start_at timestamp with time zone,
    end_at timestamp with time zone,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    user_quiz_ia_result_country integer NOT NULL
);


ALTER TABLE public.result_cities OWNER TO postgres;

--
-- Name: result_cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.result_cities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.result_cities_id_seq OWNER TO postgres;

--
-- Name: result_cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.result_cities_id_seq OWNED BY public.result_cities.id;


--
-- Name: statuses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.statuses (
    id integer NOT NULL,
    name character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.statuses OWNER TO postgres;

--
-- Name: statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.statuses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.statuses_id_seq OWNER TO postgres;

--
-- Name: statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.statuses_id_seq OWNED BY public.statuses.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tags_id_seq OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: trip_cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trip_cities (
    id integer NOT NULL,
    trip_id integer,
    city_id integer,
    duration integer,
    transportation_id integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.trip_cities OWNER TO postgres;

--
-- Name: trip_cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trip_cities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trip_cities_id_seq OWNER TO postgres;

--
-- Name: trip_cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trip_cities_id_seq OWNED BY public.trip_cities.id;


--
-- Name: trip_day_activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trip_day_activities (
    id integer NOT NULL,
    trip_day_id integer,
    activity_id integer,
    status public.enum_trip_day_activities_status NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.trip_day_activities OWNER TO postgres;

--
-- Name: trip_day_activities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trip_day_activities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trip_day_activities_id_seq OWNER TO postgres;

--
-- Name: trip_day_activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trip_day_activities_id_seq OWNED BY public.trip_day_activities.id;


--
-- Name: trip_days; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trip_days (
    id integer NOT NULL,
    trip_city_id integer,
    date timestamp with time zone,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.trip_days OWNER TO postgres;

--
-- Name: trip_days_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trip_days_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trip_days_id_seq OWNER TO postgres;

--
-- Name: trip_days_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trip_days_id_seq OWNED BY public.trip_days.id;


--
-- Name: trip_hotels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trip_hotels (
    id integer NOT NULL,
    trip_city_id integer,
    name character varying(255),
    price double precision,
    "from" timestamp with time zone,
    "to" timestamp with time zone,
    url character varying(255),
    adults integer,
    children integer,
    longitude double precision,
    latitude double precision,
    status public.enum_trip_hotels_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.trip_hotels OWNER TO postgres;

--
-- Name: trip_hotels_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trip_hotels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trip_hotels_id_seq OWNER TO postgres;

--
-- Name: trip_hotels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trip_hotels_id_seq OWNED BY public.trip_hotels.id;


--
-- Name: trip_transportations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trip_transportations (
    id integer NOT NULL,
    from_date timestamp with time zone NOT NULL,
    to_date timestamp with time zone NOT NULL,
    price double precision NOT NULL,
    url text NOT NULL,
    status public.enum_trip_transportations_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.trip_transportations OWNER TO postgres;

--
-- Name: trip_transportations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trip_transportations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trip_transportations_id_seq OWNER TO postgres;

--
-- Name: trip_transportations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trip_transportations_id_seq OWNED BY public.trip_transportations.id;


--
-- Name: trips; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.trips (
    id integer NOT NULL,
    user_id integer,
    country_id integer,
    duration integer,
    transportation_id integer,
    from_date timestamp with time zone,
    to_date timestamp with time zone,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.trips OWNER TO postgres;

--
-- Name: trips_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.trips_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trips_id_seq OWNER TO postgres;

--
-- Name: trips_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.trips_id_seq OWNED BY public.trips.id;


--
-- Name: user_answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_answers (
    id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    quiz_answer_text_id integer,
    quiz_line_id integer NOT NULL,
    quiz_response_id integer,
    "boolean" boolean,
    text text
);


ALTER TABLE public.user_answers OWNER TO postgres;

--
-- Name: user_answers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_answers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_answers_id_seq OWNER TO postgres;

--
-- Name: user_answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_answers_id_seq OWNED BY public.user_answers.id;


--
-- Name: user_quiz_ia_result_countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_quiz_ia_result_countries (
    id integer NOT NULL,
    test character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    country integer NOT NULL
);


ALTER TABLE public.user_quiz_ia_result_countries OWNER TO postgres;

--
-- Name: user_quiz_ia_result_countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_quiz_ia_result_countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_quiz_ia_result_countries_id_seq OWNER TO postgres;

--
-- Name: user_quiz_ia_result_countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_quiz_ia_result_countries_id_seq OWNED BY public.user_quiz_ia_result_countries.id;


--
-- Name: user_quiz_ia_results; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_quiz_ia_results (
    id integer NOT NULL,
    date timestamp with time zone,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    user_answer integer NOT NULL
);


ALTER TABLE public.user_quiz_ia_results OWNER TO postgres;

--
-- Name: user_quiz_ia_results_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_quiz_ia_results_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_quiz_ia_results_id_seq OWNER TO postgres;

--
-- Name: user_quiz_ia_results_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_quiz_ia_results_id_seq OWNED BY public.user_quiz_ia_results.id;


--
-- Name: organization_urls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization_urls ALTER COLUMN id SET DEFAULT nextval('public.organization_urls_id_seq'::regclass);


--
-- Name: organizations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations ALTER COLUMN id SET DEFAULT nextval('public.organizations_id_seq'::regclass);


--
-- Name: quiz_answer_texts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_answer_texts ALTER COLUMN id SET DEFAULT nextval('public.quiz_answer_texts_id_seq'::regclass);


--
-- Name: quiz_lines id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_lines ALTER COLUMN id SET DEFAULT nextval('public.quiz_lines_id_seq'::regclass);


--
-- Name: quiz_responses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_responses ALTER COLUMN id SET DEFAULT nextval('public.quiz_responses_id_seq'::regclass);


--
-- Name: quizzes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes ALTER COLUMN id SET DEFAULT nextval('public.quizzes_id_seq'::regclass);


--
-- Name: response_kinds id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.response_kinds ALTER COLUMN id SET DEFAULT nextval('public.response_kinds_id_seq'::regclass);


--
-- Name: result_activities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.result_activities ALTER COLUMN id SET DEFAULT nextval('public.result_activities_id_seq'::regclass);


--
-- Name: result_cities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.result_cities ALTER COLUMN id SET DEFAULT nextval('public.result_cities_id_seq'::regclass);


--
-- Name: statuses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.statuses ALTER COLUMN id SET DEFAULT nextval('public.statuses_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: trip_cities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_cities ALTER COLUMN id SET DEFAULT nextval('public.trip_cities_id_seq'::regclass);


--
-- Name: trip_day_activities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_day_activities ALTER COLUMN id SET DEFAULT nextval('public.trip_day_activities_id_seq'::regclass);


--
-- Name: trip_days id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_days ALTER COLUMN id SET DEFAULT nextval('public.trip_days_id_seq'::regclass);


--
-- Name: trip_hotels id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_hotels ALTER COLUMN id SET DEFAULT nextval('public.trip_hotels_id_seq'::regclass);


--
-- Name: trip_transportations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_transportations ALTER COLUMN id SET DEFAULT nextval('public.trip_transportations_id_seq'::regclass);


--
-- Name: trips id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trips ALTER COLUMN id SET DEFAULT nextval('public.trips_id_seq'::regclass);


--
-- Name: user_answers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_answers ALTER COLUMN id SET DEFAULT nextval('public.user_answers_id_seq'::regclass);


--
-- Name: user_quiz_ia_result_countries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_quiz_ia_result_countries ALTER COLUMN id SET DEFAULT nextval('public.user_quiz_ia_result_countries_id_seq'::regclass);


--
-- Name: user_quiz_ia_results id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_quiz_ia_results ALTER COLUMN id SET DEFAULT nextval('public.user_quiz_ia_results_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
001-create-quiz-response.js
002-create-tag.js
003-create-quiz.js
004-create-response-kind.js
005-create-quiz-line.js
006-create-quiz-answer-text.js
007-create-user-answer.js
008-create-user-quiz-ia-result-country.js
009-create-result-city.js
010-create-result-activity.js
011-create-status.js
012-create-organization.js
013-create-organization-url.js
014-create-user-quiz-ia-result.js
015-create-triptransportation.js
016-create-trip.js
017-create-trip-city.js
018-create-trip-day.js
019-create-trip-hotel.js
020-create-trip-day-activity.js
\.


--
-- Data for Name: organization_urls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organization_urls (id, url, organization_id, rank, partner, key, status_id, created_at, updated_at) FROM stdin;
1	https://www.getyourguide.fr	1	2	GetYourQuide	key	2	2025-05-05 15:48:29.74+02	2025-05-05 15:48:29.74+02
2	https://www.booking.com/searchresults.fr.html?ss=Ostende%2C+Flandre-Occidentale%2C+Belgique&efdco=1&label=en-fr-booking-desktop-Akb7DsuMl_04Kj1fagYeEgS652796016858%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9056528%3Ali%3Adec%3Adm&aid=2311236&lang=fr&sb=1&src_elem=sb&src=index&dest_id=-1966651&dest_type=city&ac_position=0&ac_click_type=b&ac_langcode=fr&ac_suggestion_list_length=5&search_selected=true&search_pageview_id=d54248260745014e&ac_meta=GhBkNTQyNDgyNjA3NDUwMTRlIAAoATICZnI6Bm9zdGVuZEAASgBQAA%3D%3D&checkin=2024-06-27&checkout=2024-06-28&group_adults=2&no_rooms=1&group_children=0	1	2	Booking	key	2	2025-05-05 15:48:29.741+02	2025-05-05 15:48:29.741+02
3	https://flights.booking.com/flights/PAR.CITY-NCE.AIRPORT/?type=ROUNDTRIP&adults=1&cabinClass=ECONOMY&children=&from=PAR.CITY&to=NCE.AIRPORT&fromCountry=FR&toCountry=FR&fromLocationName=Paris&toLocationName=A%C3%A9roport+de+Nice-C%C3%B4te+d%27Azur&depart=2024-07-20&return=2024-07-27&sort=BEST&travelPurpose=leisure&ca_source=flights_index_sb&aid=2311236&label=en-fr-booking-desktop-Akb7DsuMl_04Kj1fagYeEgS652796016858%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9056528%3Ali%3Adec%3Adm	1	2	Booking	key	2	2025-05-05 15:48:29.741+02	2025-05-05 15:48:29.741+02
\.


--
-- Data for Name: organizations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organizations (id, user_id, created_at, updated_at, status_id) FROM stdin;
1	1	2025-05-05 15:48:29.737+02	2025-05-05 15:48:29.737+02	1
2	1	2025-05-05 15:48:29.738+02	2025-05-05 15:48:29.738+02	2
3	1	2025-05-05 15:48:29.739+02	2025-05-05 15:48:29.739+02	3
\.


--
-- Data for Name: quiz_answer_texts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz_answer_texts (id, answer, quiz_line_id, created_at, updated_at) FROM stdin;
1	Au moins 1 fois par an	1	2025-05-05 15:48:29.728+02	2025-05-05 15:48:29.728+02
2	Entre 1 et 3 fois par an	1	2025-05-05 15:48:29.729+02	2025-05-05 15:48:29.729+02
3	Plus de 3 fois par an, j'adore ca	1	2025-05-05 15:48:29.73+02	2025-05-05 15:48:29.73+02
4	Je suis constamment en voyage	1	2025-05-05 15:48:29.73+02	2025-05-05 15:48:29.73+02
5	Moins de 800 euros par semaine	2	2025-05-05 15:48:29.731+02	2025-05-05 15:48:29.731+02
6	Entre 800 et 1200 euros par semaine	2	2025-05-05 15:48:29.732+02	2025-05-05 15:48:29.732+02
7	Entre 1200 et 1500 euros par semaine	2	2025-05-05 15:48:29.732+02	2025-05-05 15:48:29.732+02
8	Plus de 1500 euros	2	2025-05-05 15:48:29.733+02	2025-05-05 15:48:29.733+02
\.


--
-- Data for Name: quiz_lines; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz_lines (id, question, step, is_required, is_text, is_boolean, quiz_id, parent, mutiple_type_answer, response_kind_id, created_at, updated_at) FROM stdin;
1	A quelle frequence vous voyagez ?	1	t	t	f	2	\N	t	3	2025-05-05 15:48:29.722+02	2025-05-05 15:48:29.722+02
2	How much will you spend during your trip	2	t	t	f	2	1	f	3	2025-05-05 15:48:29.723+02	2025-05-05 15:48:29.723+02
3	What types of places you like ?	3	t	t	f	3	1	t	2	2025-05-05 15:48:29.724+02	2025-05-05 15:48:29.724+02
4	What kind of accommodation you prefer ? 	4	t	t	f	2	1	t	2	2025-05-05 15:48:29.725+02	2025-05-05 15:48:29.725+02
5	What kind of class you will get in plane ?	5	t	t	f	2	\N	t	2	2025-05-05 15:48:29.725+02	2025-05-05 15:48:29.725+02
6	How many different locations you will visit during your trip ?	6	t	t	f	2	\N	t	2	2025-05-05 15:48:29.726+02	2025-05-05 15:48:29.726+02
7	Will you tell us something that we need to know about your whishes ?	7	t	t	f	2	1	f	2	2025-05-05 15:48:29.727+02	2025-05-05 15:48:29.727+02
\.


--
-- Data for Name: quiz_responses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz_responses (id, user_id, quiz_id, created_at, updated_at) FROM stdin;
1	1	1	2025-05-05 15:48:29.734+02	2025-05-05 15:48:29.734+02
2	1	2	2025-05-05 15:48:29.734+02	2025-05-05 15:48:29.734+02
3	1	3	2025-05-05 15:48:29.734+02	2025-05-05 15:48:29.734+02
\.


--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quizzes (id, name, created_at, updated_at, tag_id) FROM stdin;
1	Type of vacation	2025-05-05 15:48:29.721+02	2025-05-05 15:48:29.721+02	1
2	Pricing	2025-05-05 15:48:29.721+02	2025-05-05 15:48:29.721+02	1
3	Activities	2025-05-05 15:48:29.721+02	2025-05-05 15:48:29.721+02	1
\.


--
-- Data for Name: response_kinds; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.response_kinds (id, type, created_at, updated_at) FROM stdin;
1	Boolean	2025-05-05 15:48:29.7+02	2025-05-05 15:48:29.7+02
2	Text	2025-05-05 15:48:29.701+02	2025-05-05 15:48:29.701+02
3	Responses	2025-05-05 15:48:29.702+02	2025-05-05 15:48:29.702+02
\.


--
-- Data for Name: result_activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.result_activities (id, test, created_at, updated_at, result_city, activity_id) FROM stdin;
\.


--
-- Data for Name: result_cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.result_cities (id, step, start_at, end_at, created_at, updated_at, user_quiz_ia_result_country) FROM stdin;
\.


--
-- Data for Name: statuses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.statuses (id, name, created_at, updated_at) FROM stdin;
1	Done	2025-05-05 15:48:29.719+02	2025-05-05 15:48:29.719+02
2	Awaiting	2025-05-05 15:48:29.719+02	2025-05-05 15:48:29.719+02
3	In progress	2025-05-05 15:48:29.719+02	2025-05-05 15:48:29.719+02
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tags (id, name, created_at, updated_at) FROM stdin;
1	type of vacation	2025-05-05 15:48:29.69+02	2025-05-05 15:48:29.69+02
2	duration	2025-05-05 15:48:29.695+02	2025-05-05 15:48:29.695+02
3	budget	2025-05-05 15:48:29.696+02	2025-05-05 15:48:29.696+02
4	shill or not	2025-05-05 15:48:29.697+02	2025-05-05 15:48:29.697+02
5	don't now	2025-05-05 15:48:29.698+02	2025-05-05 15:48:29.698+02
\.


--
-- Data for Name: trip_cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trip_cities (id, trip_id, city_id, duration, transportation_id, created_at, updated_at) FROM stdin;
1	2	15	\N	2	2025-05-05 15:48:29.71+02	2025-05-05 15:48:29.71+02
2	1	15	\N	1	2025-05-05 15:48:29.711+02	2025-05-05 15:48:29.711+02
3	2	15	\N	3	2025-05-05 15:48:29.712+02	2025-05-05 15:48:29.712+02
\.


--
-- Data for Name: trip_day_activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trip_day_activities (id, trip_day_id, activity_id, status, created_at, updated_at) FROM stdin;
1	2	44	APayer	2025-05-05 15:48:29.716+02	2025-05-05 15:48:29.716+02
2	2	17	EnAttenteDeReservation	2025-05-05 15:48:29.716+02	2025-05-05 15:48:29.716+02
3	1	22	EnAttenteDeConfirmation	2025-05-05 15:48:29.716+02	2025-05-05 15:48:29.716+02
4	3	18	ProblemeDeReservation	2025-05-05 15:48:29.716+02	2025-05-05 15:48:29.716+02
5	4	9	Annuler	2025-05-05 15:48:29.716+02	2025-05-05 15:48:29.716+02
\.


--
-- Data for Name: trip_days; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trip_days (id, trip_city_id, date, created_at, updated_at) FROM stdin;
1	2	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
2	3	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
3	1	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
4	2	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
5	3	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
6	1	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
7	2	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
8	3	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
9	1	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
10	2	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
11	3	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
12	1	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
13	2	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
14	3	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
15	1	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
16	2	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
17	3	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
18	1	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
19	2	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
20	3	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
21	1	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
22	2	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
23	3	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
24	1	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
25	2	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
26	3	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
27	1	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
28	2	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
29	3	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
30	1	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02	2025-05-05 15:48:29.713+02
\.


--
-- Data for Name: trip_hotels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trip_hotels (id, trip_city_id, name, price, "from", "to", url, adults, children, longitude, latitude, status, created_at, updated_at) FROM stdin;
1	1	Hotel Sunshine	150	2024-01-01 01:00:00+01	2024-01-05 01:00:00+01	https://example.com/hotel-sunshine	2	0	15.7876	7.6976	EnAttenteDeReservation	2025-05-05 15:48:29.718+02	2025-05-05 15:48:29.718+02
2	2	Hotel Moonlight	200	2024-02-01 01:00:00+01	2024-02-06 01:00:00+01	https://example.com/hotel-moonlight	2	0	15.7876	7.6976	EnAttenteDeReservation	2025-05-05 15:48:29.718+02	2025-05-05 15:48:29.718+02
3	3	Hotel Starlight	180	2024-03-01 01:00:00+01	2024-03-07 01:00:00+01	https://example.com/hotel-starlight	2	0	15.7876	7.6976	EnAttenteDeReservation	2025-05-05 15:48:29.718+02	2025-05-05 15:48:29.718+02
\.


--
-- Data for Name: trip_transportations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trip_transportations (id, from_date, to_date, price, url, status, created_at, updated_at) FROM stdin;
1	2025-05-05 15:48:29.703+02	2025-05-05 15:48:29.703+02	175	https://wwws.airfrance.fr/?utm_medium=SEA&utm_source=GOO&utm_campaign=FR_BRD_CNV_BrandName&utm_content=9254315150_34971934_3461728324_Brandname%20-%20Pure%20Brand&utm_term=air%20france&gad_source=1&gclid=Cj0KCQiAvP-6BhDyARIsAJ3uv7Y94UkihKlzPQft45eYY_mCeDC0Siai0Hr-b8TgSxAcCr_2lctXTb0aAojKEALw_wcB&gclsrc=aw.ds	APayer	2025-05-05 15:48:29.703+02	2025-05-05 15:48:29.703+02
2	2025-05-05 15:48:29.704+02	2025-05-05 15:48:29.704+02	225	https://wwws.airfrance.fr/?utm_medium=SEA&utm_source=GOO&utm_campaign=FR_BRD_CNV_BrandName&utm_content=9254315150_34971934_3461728324_Brandname%20-%20Pure%20Brand&utm_term=air%20france&gad_source=1&gclid=Cj0KCQiAvP-6BhDyARIsAJ3uv7Y94UkihKlzPQft45eYY_mCeDC0Siai0Hr-b8TgSxAcCr_2lctXTb0aAojKEALw_wcB&gclsrc=aw.ds	ProblemeDeReservation	2025-05-05 15:48:29.704+02	2025-05-05 15:48:29.704+02
3	2025-05-05 15:48:29.705+02	2025-05-05 15:48:29.705+02	95	https://wwws.airfrance.fr/?utm_medium=SEA&utm_source=GOO&utm_campaign=FR_BRD_CNV_BrandName&utm_content=9254315150_34971934_3461728324_Brandname%20-%20Pure%20Brand&utm_term=air%20france&gad_source=1&gclid=Cj0KCQiAvP-6BhDyARIsAJ3uv7Y94UkihKlzPQft45eYY_mCeDC0Siai0Hr-b8TgSxAcCr_2lctXTb0aAojKEALw_wcB&gclsrc=aw.ds	EnAttenteDeReservation	2025-05-05 15:48:29.705+02	2025-05-05 15:48:29.705+02
\.


--
-- Data for Name: trips; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.trips (id, user_id, country_id, duration, transportation_id, from_date, to_date, created_at, updated_at) FROM stdin;
1	1	1	15	1	2025-05-05 15:48:29.706+02	2025-05-05 15:48:29.706+02	2025-05-05 15:48:29.706+02	2025-05-05 15:48:29.706+02
2	1	1	15	1	2025-05-05 15:48:29.708+02	2025-05-05 15:48:29.708+02	2025-05-05 15:48:29.708+02	2025-05-05 15:48:29.708+02
3	1	1	15	1	2025-05-05 15:48:29.709+02	2025-05-05 15:48:29.709+02	2025-05-05 15:48:29.709+02	2025-05-05 15:48:29.709+02
\.


--
-- Data for Name: user_answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_answers (id, created_at, updated_at, quiz_answer_text_id, quiz_line_id, quiz_response_id, "boolean", text) FROM stdin;
1	2025-05-05 15:48:29.735+02	2025-05-05 15:48:29.735+02	1	1	1	f	\N
2	2025-05-05 15:48:29.735+02	2025-05-05 15:48:29.735+02	1	1	1	f	\N
3	2025-05-05 15:48:29.735+02	2025-05-05 15:48:29.735+02	1	1	1	f	\N
\.


--
-- Data for Name: user_quiz_ia_result_countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_quiz_ia_result_countries (id, test, created_at, updated_at, country) FROM stdin;
\.


--
-- Data for Name: user_quiz_ia_results; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_quiz_ia_results (id, date, created_at, updated_at, user_answer) FROM stdin;
\.


--
-- Name: organization_urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organization_urls_id_seq', 3, true);


--
-- Name: organizations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organizations_id_seq', 1, false);


--
-- Name: quiz_answer_texts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quiz_answer_texts_id_seq', 8, true);


--
-- Name: quiz_lines_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quiz_lines_id_seq', 1, false);


--
-- Name: quiz_responses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quiz_responses_id_seq', 3, true);


--
-- Name: quizzes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quizzes_id_seq', 3, true);


--
-- Name: response_kinds_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.response_kinds_id_seq', 3, true);


--
-- Name: result_activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.result_activities_id_seq', 1, false);


--
-- Name: result_cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.result_cities_id_seq', 1, false);


--
-- Name: statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.statuses_id_seq', 3, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_id_seq', 5, true);


--
-- Name: trip_cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trip_cities_id_seq', 1, false);


--
-- Name: trip_day_activities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trip_day_activities_id_seq', 1, false);


--
-- Name: trip_days_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trip_days_id_seq', 1, false);


--
-- Name: trip_hotels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trip_hotels_id_seq', 1, false);


--
-- Name: trip_transportations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trip_transportations_id_seq', 1, false);


--
-- Name: trips_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.trips_id_seq', 1, false);


--
-- Name: user_answers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_answers_id_seq', 3, true);


--
-- Name: user_quiz_ia_result_countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_quiz_ia_result_countries_id_seq', 1, false);


--
-- Name: user_quiz_ia_results_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_quiz_ia_results_id_seq', 1, false);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: organization_urls organization_urls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization_urls
    ADD CONSTRAINT organization_urls_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: quiz_answer_texts quiz_answer_texts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_answer_texts
    ADD CONSTRAINT quiz_answer_texts_pkey PRIMARY KEY (id);


--
-- Name: quiz_lines quiz_lines_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_lines
    ADD CONSTRAINT quiz_lines_pkey PRIMARY KEY (id);


--
-- Name: quiz_responses quiz_responses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_responses
    ADD CONSTRAINT quiz_responses_pkey PRIMARY KEY (id);


--
-- Name: quizzes quizzes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (id);


--
-- Name: response_kinds response_kinds_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.response_kinds
    ADD CONSTRAINT response_kinds_pkey PRIMARY KEY (id);


--
-- Name: result_activities result_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.result_activities
    ADD CONSTRAINT result_activities_pkey PRIMARY KEY (id);


--
-- Name: result_cities result_cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.result_cities
    ADD CONSTRAINT result_cities_pkey PRIMARY KEY (id);


--
-- Name: statuses statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: trip_cities trip_cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_cities
    ADD CONSTRAINT trip_cities_pkey PRIMARY KEY (id);


--
-- Name: trip_day_activities trip_day_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_day_activities
    ADD CONSTRAINT trip_day_activities_pkey PRIMARY KEY (id);


--
-- Name: trip_days trip_days_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_days
    ADD CONSTRAINT trip_days_pkey PRIMARY KEY (id);


--
-- Name: trip_hotels trip_hotels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_hotels
    ADD CONSTRAINT trip_hotels_pkey PRIMARY KEY (id);


--
-- Name: trip_transportations trip_transportations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_transportations
    ADD CONSTRAINT trip_transportations_pkey PRIMARY KEY (id);


--
-- Name: trips trips_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trips_pkey PRIMARY KEY (id);


--
-- Name: user_answers user_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_answers
    ADD CONSTRAINT user_answers_pkey PRIMARY KEY (id);


--
-- Name: user_quiz_ia_result_countries user_quiz_ia_result_countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_quiz_ia_result_countries
    ADD CONSTRAINT user_quiz_ia_result_countries_pkey PRIMARY KEY (id);


--
-- Name: user_quiz_ia_results user_quiz_ia_results_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_quiz_ia_results
    ADD CONSTRAINT user_quiz_ia_results_pkey PRIMARY KEY (id);


--
-- Name: organization_urls organization_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization_urls
    ADD CONSTRAINT organization_id FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON UPDATE CASCADE;


--
-- Name: quiz_lines parent; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_lines
    ADD CONSTRAINT parent FOREIGN KEY (parent) REFERENCES public.quiz_lines(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_answers quiz_answer_text_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_answers
    ADD CONSTRAINT quiz_answer_text_id FOREIGN KEY (quiz_answer_text_id) REFERENCES public.quiz_answer_texts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: quiz_lines quiz_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_lines
    ADD CONSTRAINT quiz_id FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id) ON UPDATE CASCADE;


--
-- Name: quiz_answer_texts quiz_line_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_answer_texts
    ADD CONSTRAINT quiz_line_id FOREIGN KEY (quiz_line_id) REFERENCES public.quiz_lines(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_answers quiz_line_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_answers
    ADD CONSTRAINT quiz_line_id FOREIGN KEY (quiz_line_id) REFERENCES public.quiz_lines(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_answers quiz_response_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_answers
    ADD CONSTRAINT quiz_response_id FOREIGN KEY (quiz_response_id) REFERENCES public.quiz_responses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: quiz_lines response_kind_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_lines
    ADD CONSTRAINT response_kind_id FOREIGN KEY (response_kind_id) REFERENCES public.response_kinds(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: result_activities result_city; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.result_activities
    ADD CONSTRAINT result_city FOREIGN KEY (result_city) REFERENCES public.result_cities(id) ON UPDATE CASCADE;


--
-- Name: organizations status_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT status_id FOREIGN KEY (status_id) REFERENCES public.statuses(id) ON UPDATE CASCADE;


--
-- Name: organization_urls status_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organization_urls
    ADD CONSTRAINT status_id FOREIGN KEY (status_id) REFERENCES public.statuses(id) ON UPDATE CASCADE;


--
-- Name: quizzes tag_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT tag_id FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON UPDATE CASCADE;


--
-- Name: trips transportation; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT transportation FOREIGN KEY (transportation_id) REFERENCES public.trip_transportations(id) ON UPDATE CASCADE;


--
-- Name: trip_cities transportation_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_cities
    ADD CONSTRAINT transportation_id FOREIGN KEY (transportation_id) REFERENCES public.trip_transportations(id) ON UPDATE CASCADE;


--
-- Name: trip_hotels trip_city; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_hotels
    ADD CONSTRAINT trip_city FOREIGN KEY (trip_city_id) REFERENCES public.trip_cities(id) ON UPDATE CASCADE;


--
-- Name: trip_days trip_city_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_days
    ADD CONSTRAINT trip_city_id FOREIGN KEY (trip_city_id) REFERENCES public.trip_cities(id) ON UPDATE CASCADE;


--
-- Name: trip_day_activities trip_day; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_day_activities
    ADD CONSTRAINT trip_day FOREIGN KEY (trip_day_id) REFERENCES public.trip_days(id) ON UPDATE CASCADE;


--
-- Name: trip_cities trip_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.trip_cities
    ADD CONSTRAINT trip_id FOREIGN KEY (trip_id) REFERENCES public.trips(id) ON UPDATE CASCADE;


--
-- Name: user_quiz_ia_results user_answer; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_quiz_ia_results
    ADD CONSTRAINT user_answer FOREIGN KEY (user_answer) REFERENCES public.user_answers(id) ON UPDATE CASCADE;


--
-- Name: result_cities user_quiz_ia_result_country; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.result_cities
    ADD CONSTRAINT user_quiz_ia_result_country FOREIGN KEY (user_quiz_ia_result_country) REFERENCES public.user_quiz_ia_result_countries(id) ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--

