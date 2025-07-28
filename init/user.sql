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
-- Name: addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.addresses (
    id integer NOT NULL,
    name character varying(255),
    street character varying(255),
    city character varying(255),
    zip_code character varying(255),
    complementary text,
    country_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.addresses OWNER TO postgres;

--
-- Name: addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.addresses_id_seq OWNER TO postgres;

--
-- Name: addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;


--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name character varying(255),
    code character varying(255)
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.countries_id_seq OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;


--
-- Name: languages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.languages (
    id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.languages OWNER TO postgres;

--
-- Name: languages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.languages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.languages_id_seq OWNER TO postgres;

--
-- Name: languages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.languages_id_seq OWNED BY public.languages.id;


--
-- Name: reset_passwords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reset_passwords (
    id integer NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    expired_at timestamp with time zone NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.reset_passwords OWNER TO postgres;

--
-- Name: reset_passwords_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reset_passwords_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reset_passwords_id_seq OWNER TO postgres;

--
-- Name: reset_passwords_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reset_passwords_id_seq OWNED BY public.reset_passwords.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    role character varying(255) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token character varying(255) NOT NULL,
    valid boolean NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: user_group_links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_group_links (
    user_id integer NOT NULL,
    user_group_id integer NOT NULL,
    is_owner boolean NOT NULL,
    is_accepted boolean DEFAULT false NOT NULL,
    user_quiz_answer_id integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.user_group_links OWNER TO postgres;

--
-- Name: user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_groups (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.user_groups OWNER TO postgres;

--
-- Name: user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_groups_id_seq OWNER TO postgres;

--
-- Name: user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_groups_id_seq OWNED BY public.user_groups.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    birth_date timestamp with time zone NOT NULL,
    language_id integer NOT NULL,
    country_id integer NOT NULL,
    role_id integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    img character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: addresses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);


--
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- Name: languages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages ALTER COLUMN id SET DEFAULT nextval('public.languages_id_seq'::regclass);


--
-- Name: reset_passwords id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_passwords ALTER COLUMN id SET DEFAULT nextval('public.reset_passwords_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: user_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_groups ALTER COLUMN id SET DEFAULT nextval('public.user_groups_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
01-20240603102910-create-role.js
02-20240611131635-country.js
03-20240611131718-create-language.js
04-2024061112025ff7-user.js
05-20240612102602-create-add.js
07-20240709012352-create-session.js
08-20240709012352-create-reset-password.js
20250404075017-create-user-group.js
20250404084750-create-user-group-link.js
20250501220850-add-img-to-users.js
\.


--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.addresses (id, name, street, city, zip_code, complementary, country_id, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (id, name, code) FROM stdin;
1	Afghanistan	AF
2	Åland Islands	AX
3	Albania	AL
4	Algeria	DZ
5	American Samoa	AS
6	AndorrA	AD
7	Angola	AO
8	Anguilla	AI
9	Antarctica	AQ
10	Antigua and Barbuda	AG
11	Argentina	AR
12	Armenia	AM
13	Aruba	AW
14	Australia	AU
15	Austria	AT
16	Azerbaijan	AZ
17	Bahamas	BS
18	Bahrain	BH
19	Bangladesh	BD
20	Barbados	BB
21	Belarus	BY
22	Belgium	BE
23	Belize	BZ
24	Benin	BJ
25	Bermuda	BM
26	Bhutan	BT
27	Bolivia	BO
28	Bosnia and Herzegovina	BA
29	Botswana	BW
30	Bouvet Island	BV
31	Brazil	BR
32	British Indian Ocean Territory	IO
33	Brunei Darussalam	BN
34	Bulgaria	BG
35	Burkina Faso	BF
36	Burundi	BI
37	Cambodia	KH
38	Cameroon	CM
39	Canada	CA
40	Cape Verde	CV
41	Cayman Islands	KY
42	Central African Republic	CF
43	Chad	TD
44	Chile	CL
45	China	CN
46	Christmas Island	CX
47	Cocos (Keeling) Islands	CC
48	Colombia	CO
49	Comoros	KM
50	Congo	CG
51	Congo, The Democratic Republic of the	CD
52	Cook Islands	CK
53	Costa Rica	CR
54	Cote D'Ivoire	CI
55	Croatia	HR
56	Cuba	CU
57	Cyprus	CY
58	Czech Republic	CZ
59	Denmark	DK
60	Djibouti	DJ
61	Dominica	DM
62	Dominican Republic	DO
63	Ecuador	EC
64	Egypt	EG
65	El Salvador	SV
66	Equatorial Guinea	GQ
67	Eritrea	ER
68	Estonia	EE
69	Ethiopia	ET
70	Falkland Islands (Malvinas)	FK
71	Faroe Islands	FO
72	Fiji	FJ
73	Finland	FI
74	France	FR
75	French Guiana	GF
76	French Polynesia	PF
77	French Southern Territories	TF
78	Gabon	GA
79	Gambia	GM
80	Georgia	GE
81	Germany	DE
82	Ghana	GH
83	Gibraltar	GI
84	Greece	GR
85	Greenland	GL
86	Grenada	GD
87	Guadeloupe	GP
88	Guam	GU
89	Guatemala	GT
90	Guernsey	GG
91	Guinea	GN
92	Guinea-Bissau	GW
93	Guyana	GY
94	Haiti	HT
95	Heard Island and Mcdonald Islands	HM
96	Holy See (Vatican City State)	VA
97	Honduras	HN
98	Hong Kong	HK
99	Hungary	HU
100	Iceland	IS
101	India	IN
102	Indonesia	ID
103	Iran, Islamic Republic Of	IR
104	Iraq	IQ
105	Ireland	IE
106	Isle of Man	IM
107	Israel	IL
108	Italy	IT
109	Jamaica	JM
110	Japan	JP
111	Jersey	JE
112	Jordan	JO
113	Kazakhstan	KZ
114	Kenya	KE
115	Kiribati	KI
116	Korea, Democratic People'S Republic of	KP
117	Korea, Republic of	KR
118	Kuwait	KW
119	Kyrgyzstan	KG
120	Lao People'S Democratic Republic	LA
121	Latvia	LV
122	Lebanon	LB
123	Lesotho	LS
124	Liberia	LR
125	Libyan Arab Jamahiriya	LY
126	Liechtenstein	LI
127	Lithuania	LT
128	Luxembourg	LU
129	Macao	MO
130	Macedonia, The Former Yugoslav Republic of	MK
131	Madagascar	MG
132	Malawi	MW
133	Malaysia	MY
134	Maldives	MV
135	Mali	ML
136	Malta	MT
137	Marshall Islands	MH
138	Martinique	MQ
139	Mauritania	MR
140	Mauritius	MU
141	Mayotte	YT
142	Mexico	MX
143	Micronesia, Federated States of	FM
144	Moldova, Republic of	MD
145	Monaco	MC
146	Mongolia	MN
147	Montserrat	MS
148	Morocco	MA
149	Mozambique	MZ
150	Myanmar	MM
151	Namibia	NA
152	Nauru	NR
153	Nepal	NP
154	Netherlands	NL
155	Netherlands Antilles	AN
156	New Caledonia	NC
157	New Zealand	NZ
158	Nicaragua	NI
159	Niger	NE
160	Nigeria	NG
161	Niue	NU
162	Norfolk Island	NF
163	Northern Mariana Islands	MP
164	Norway	NO
165	Oman	OM
166	Pakistan	PK
167	Palau	PW
168	Palestinian Territory, Occupied	PS
169	Panama	PA
170	Papua New Guinea	PG
171	Paraguay	PY
172	Peru	PE
173	Philippines	PH
174	Pitcairn	PN
175	Poland	PL
176	Portugal	PT
177	Puerto Rico	PR
178	Qatar	QA
179	Reunion	RE
180	Romania	RO
181	Russian Federation	RU
182	RWANDA	RW
183	Saint Helena	SH
184	Saint Kitts and Nevis	KN
185	Saint Lucia	LC
186	Saint Pierre and Miquelon	PM
187	Saint Vincent and the Grenadines	VC
188	Samoa	WS
189	San Marino	SM
190	Sao Tome and Principe	ST
191	Saudi Arabia	SA
192	Senegal	SN
193	Serbia and Montenegro	CS
194	Seychelles	SC
195	Sierra Leone	SL
196	Singapore	SG
197	Slovakia	SK
198	Slovenia	SI
199	Solomon Islands	SB
200	Somalia	SO
201	South Africa	ZA
202	South Georgia and the South Sandwich Islands	GS
203	Spain	ES
204	Sri Lanka	LK
205	Sudan	SD
206	Suriname	SR
207	Svalbard and Jan Mayen	SJ
208	Swaziland	SZ
209	Sweden	SE
210	Switzerland	CH
211	Syrian Arab Republic	SY
212	Taiwan, Province of China	TW
213	Tajikistan	TJ
214	Tanzania, United Republic of	TZ
215	Thailand	TH
216	Timor-Leste	TL
217	Togo	TG
218	Tokelau	TK
219	Tonga	TO
220	Trinidad and Tobago	TT
221	Tunisia	TN
222	Turkey	TR
223	Turkmenistan	TM
224	Turks and Caicos Islands	TC
225	Tuvalu	TV
226	Uganda	UG
227	Ukraine	UA
228	United Arab Emirates	AE
229	United Kingdom	GB
230	United States	US
231	United States Minor Outlying Islands	UM
232	Uruguay	UY
233	Uzbekistan	UZ
234	Vanuatu	VU
235	Venezuela	VE
236	Viet Nam	VN
237	Virgin Islands, British	VG
238	Virgin Islands, U.S.	VI
239	Wallis and Futuna	WF
240	Western Sahara	EH
241	Yemen	YE
242	Zambia	ZM
243	Zimbabwe	ZW
\.


--
-- Data for Name: languages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.languages (id, name) FROM stdin;
1	Afar
2	Abkhaze
3	Avestique
4	Afrikaans
5	Akan
6	Amharique
7	Aragonais
8	Arabe
9	Assamais
10	Avar
11	Aymara
12	Azéri
13	Bachkir
14	Bélarusse
15	Bulgare
16	Langues bihari
17	Bichelamar
18	Bambara
19	Bengali
20	Tibétain
21	Breton
22	Bosnien
23	Catalan
24	Valencien
25	Tchétchène
26	Chamorro
27	Corse
28	Cree
29	Tchèque
30	Slavon d'église
31	Vieux slave
32	Vieux bulgare
33	Vieux slavon d'église
34	Tchouvache
35	Gallois
36	Danois
37	Allemand
38	Divehi
39	Dhivehi
40	Maldivien
41	Dzongkha
42	Ewe
43	Grec moderne (après 1453)
44	Anglais
45	Espéranto
46	Espagnol
47	Castillan
48	Estonien
49	Basque
50	Persan
51	Peul
52	Finnois
53	Fidjien
54	Féroïen
55	Français
56	Frison occidental
57	Irlandais
58	Gaélique
59	Gaélique écossais
60	Galicien
61	Guarani
62	Gujarati
63	Mannois
64	Haoussa
65	Hébreu
66	Hindi
67	Hiri motu
68	Croate
69	Haïtien
70	Créole haïtien
71	Hongrois
72	Arménien
73	Herero
74	Interlingua
75	Indonésien
76	Interlingue
77	Occidental
78	Igbo
79	Yi de Sichuan
80	Nuosu
81	Inupiaq
82	Ido
83	Islandais
84	Italien
85	Inuktitut
86	Japonais
87	Javanais
88	Géorgien
89	Kongo
90	Kikuyu
91	Gikuyu
92	Kuanyama
93	Kwanyama
94	Kazakh
95	Kalaallisut
96	Groenlandais
97	Khmer central
98	Kannada
99	Coréen
100	Kanouri
101	Cachemiri
102	Kurde
103	Kom
104	Cornique
105	Kirghiz
106	Kyrgyz
107	Latin
108	Luxembourgeois
109	Letzeburgesch
110	Ganda
111	Limbourgeois
112	Limbourgeois
113	Limbourgeois
114	Lingala
115	Lao
116	Lituanien
117	Luba-Katanga
118	Letton
119	Malgache
120	Marshallais
121	Maori
122	Macédonien
123	Malayalam
124	Mongol
125	Marathi
126	Malais
127	Maltais
128	Birman
129	Nauruan
130	Norvégien Bokmål
131	Bokmål norvégien
132	Ndébélé du Nord
133	Népalais
134	Ndonga
135	Néerlandais
136	Flamand
137	Nynorsk norvégien
138	Norvégien
139	Ndébélé du Sud
140	Navajo
141	Navaho
142	Chichewa
143	Chewa
144	Nyanja
145	Occitan (après 1500)
146	Ojibwa
147	Oromo
148	Oriya
149	Ossète
150	Ossétique
151	Panjabi
152	Pendjabi
153	Pali
154	Polonais
155	Pachto
156	Pachtou
157	Portugais
158	Quechua
159	Romanche
160	Kirundi
161	Roumain
162	Moldave
163	Moldovan
164	Russe
165	Kinyarwanda
166	Sanskrit
167	Sarde
168	Sindhi
169	Same du Nord
170	Sango
171	Singhalais
172	Cinghalais
173	Slovaque
174	Slovène
175	Samoan
176	Shona
177	Somali
178	Albanais
179	Serbe
180	Swati
181	Sotho du Sud
182	Soundanais
183	Suédois
184	Swahili
185	Tamoul
186	Télougou
187	Tadjik
188	Thaï
189	Tigrigna
190	Turkmène
191	Tagalog
192	Tswana
193	Tonga (Îles Tonga)
194	Turc
195	Tsonga
196	Tatar
197	Twi
198	Tahitien
199	Ouïghour
200	Ouïgour
201	Ukrainien
202	Ourdou
203	Ouzbek
204	Venda
205	Vietnamien
206	Volapük
207	Wallon
208	Wolof
209	Xhosa
210	Yiddish
211	Yoruba
212	Zhuang
213	Chuang
214	Chinois
215	Zoulou
\.


--
-- Data for Name: reset_passwords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reset_passwords (id, token, created_at, expired_at, user_id) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, role) FROM stdin;
1	User
2	Staff
3	Admin
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, token, valid, user_id) FROM stdin;
\.


--
-- Data for Name: user_group_links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_group_links (user_id, user_group_id, is_owner, is_accepted, user_quiz_answer_id, created_at, updated_at) FROM stdin;
2	1	t	t	\N	2025-05-28 18:38:50.296+02	2025-05-28 18:38:50.296+02
3	1	f	t	2	2025-05-28 18:38:50.296+02	2025-05-28 18:38:50.296+02
4	1	f	t	3	2025-05-28 18:38:50.296+02	2025-05-28 18:38:50.296+02
3	2	t	t	\N	2025-05-28 18:38:50.296+02	2025-05-28 18:38:50.296+02
2	2	f	f	1	2025-05-28 18:38:50.296+02	2025-05-28 18:38:50.296+02
4	2	f	t	2	2025-05-28 18:38:50.296+02	2025-05-28 18:38:50.296+02
4	3	t	t	\N	2025-05-28 18:38:50.296+02	2025-05-28 18:38:50.296+02
2	3	f	f	2	2025-05-28 18:38:50.296+02	2025-05-28 18:38:50.296+02
3	3	f	t	1	2025-05-28 18:38:50.296+02	2025-05-28 18:38:50.296+02
\.


--
-- Data for Name: user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_groups (id, name, created_at, updated_at) FROM stdin;
1	Trip to New Zeland	2025-05-28 18:38:50.295+02	2025-05-28 18:38:50.295+02
2	Trip to Iceland	2025-05-28 18:38:50.295+02	2025-05-28 18:38:50.295+02
3	Trip to Colombia	2025-05-28 18:38:50.295+02	2025-05-28 18:38:50.295+02
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, last_name, email, password, birth_date, language_id, country_id, role_id, created_at, updated_at, img) FROM stdin;
1	John	Doe	example@example.com	$argon2id$v=19$m=65536,t=3,p=4$I+PgTErWrV80jTSJVvK+qg$1MfLKqexdgUeWGJBCod8HmpOtrcAu5Dw2z50YeJ8m9E	1990-01-01 01:00:00+01	1	1	1	2025-05-28 18:38:50.288+02	2025-05-28 18:38:50.288+02	\N
2	Jane	Doe	jane.doe@example.com	$argon2id$v=19$m=65536,t=3,p=4$C+DmE/AWFsE9JodK3w1oCw$5yLo7G3pRd/9Kh7b/isdcYZquHAvS+xvL0yGcZ9ldrQ	1992-02-02 01:00:00+01	1	1	1	2025-05-28 18:38:50.288+02	2025-05-28 18:38:50.288+02	\N
3	Alice	Smith	alice.smith@example.com	$argon2id$v=19$m=65536,t=3,p=4$dNUqPqWtM4gGmS2XB9uNjw$SoVsP/ViGMk3XzVI9jK6XgoLAzl/CeFs+4OnD2qXL+g	1985-03-03 01:00:00+01	2	2	1	2025-05-28 18:38:50.288+02	2025-05-28 18:38:50.288+02	\N
4	Bob	Johnson	bob.johnson@example.com	$argon2id$v=19$m=65536,t=3,p=4$P7bJHDNX33IF/Uq/qWdqEQ$JHr1ygIOg4Vk4nT7PpsFUAXxbKUSmiPz4+HBB62rr2A	1988-04-04 02:00:00+02	3	3	1	2025-05-28 18:38:50.288+02	2025-05-28 18:38:50.288+02	\N
5	Charlie	Brown	charlie.brown@example.com	$argon2id$v=19$m=65536,t=3,p=4$CMGgKWQpcz5J+oMQw9LbYw$/19r8tdpI7BGEgZSXv1u9UEg8auvwfUU1gF4oorshVg	1995-05-05 02:00:00+02	1	1	1	2025-05-28 18:38:50.288+02	2025-05-28 18:38:50.288+02	\N
\.


--
-- Name: addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.addresses_id_seq', 1, false);


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_id_seq', 243, true);


--
-- Name: languages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.languages_id_seq', 215, true);


--
-- Name: reset_passwords_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reset_passwords_id_seq', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 1, false);


--
-- Name: user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_groups_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- Name: countries countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);


--
-- Name: languages languages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);


--
-- Name: reset_passwords reset_passwords_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_passwords
    ADD CONSTRAINT reset_passwords_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: roles roles_role_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_key UNIQUE (role);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: user_groups user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_groups
    ADD CONSTRAINT user_groups_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: addresses country_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT country_id FOREIGN KEY (country_id) REFERENCES public.countries(id) ON UPDATE CASCADE;


--
-- Name: users language_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT language_id FOREIGN KEY (language_id) REFERENCES public.languages(id) ON UPDATE CASCADE;


--
-- Name: users role_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT role_id FOREIGN KEY (role_id) REFERENCES public.roles(id) ON UPDATE CASCADE;


--
-- Name: user_group_links user_group_links_user_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_group_links
    ADD CONSTRAINT user_group_links_user_group_id_fkey FOREIGN KEY (user_group_id) REFERENCES public.user_groups(id);


--
-- Name: user_group_links user_group_links_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_group_links
    ADD CONSTRAINT user_group_links_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: addresses user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: sessions user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- PostgreSQL database dump complete
--

