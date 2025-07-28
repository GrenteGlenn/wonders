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
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    message character varying(255),
    user_id integer,
    subject integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_seq OWNER TO postgres;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: subjects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subjects (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content character varying(255) NOT NULL,
    user_id integer NOT NULL,
    topic integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.subjects OWNER TO postgres;

--
-- Name: subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subjects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subjects_id_seq OWNER TO postgres;

--
-- Name: subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subjects_id_seq OWNED BY public.subjects.id;


--
-- Name: topics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topics (
    id integer NOT NULL,
    country_id integer,
    name character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.topics OWNER TO postgres;

--
-- Name: topics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.topics_id_seq OWNER TO postgres;

--
-- Name: topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;


--
-- Name: user_subjects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_subjects (
    id integer NOT NULL,
    user_id integer NOT NULL,
    subject_id integer NOT NULL
);


ALTER TABLE public.user_subjects OWNER TO postgres;

--
-- Name: user_subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_subjects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_subjects_id_seq OWNER TO postgres;

--
-- Name: user_subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_subjects_id_seq OWNED BY public.user_subjects.id;


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: subjects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects ALTER COLUMN id SET DEFAULT nextval('public.subjects_id_seq'::regclass);


--
-- Name: topics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);


--
-- Name: user_subjects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_subjects ALTER COLUMN id SET DEFAULT nextval('public.user_subjects_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20250303090933-create-topic.js
20250303091245-create-subject.js
20250303091505-create-comment.js
20250305135754-create-user-subject.js
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, message, user_id, subject, created_at, updated_at) FROM stdin;
1	Type of vacation, is this all-inclusive?	1	1	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
2	Pricing seems a bit steep, any discounts?	2	1	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
3	What activities are available for kids?	3	1	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
4	Is there a swimming pool on site?	4	1	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
5	Can you explain the different pricing tiers?	5	2	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
6	What’s included in the “luxury” package?	6	2	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
7	Are there group discounts available?	7	2	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
8	Do you offer flexible payment options?	8	2	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
9	What types of excursions do you offer?	9	3	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
10	Are pets allowed on excursions?	10	3	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
11	Can you arrange private excursions?	11	3	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
12	I heard there’s a wine-tasting tour, is that true?	12	3	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
13	How many restaurants are there on the property?	13	4	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
14	Do you have vegetarian or vegan options?	14	4	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
15	Is there a dress code for the fine-dining restaurant?	15	4	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
16	What time does dinner service end?	16	4	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
17	How can I book a room with a view?	17	5	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
18	Do you offer rooms with private balconies?	18	5	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
19	Are there any special offers for honeymooners?	19	5	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
20	What’s the check-in/check-out process like?	20	5	2025-05-28 18:38:40.167+02	2025-05-28 18:38:40.167+02
\.


--
-- Data for Name: subjects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subjects (id, title, content, user_id, topic, created_at, updated_at) FROM stdin;
1	Vacations in the Caribbean	A detailed discussion about different vacation destinations in the Caribbean.	1	1	2025-05-28 18:38:40.164+02	2025-05-28 18:38:40.164+02
2	Budget Travel Tips	Tips and tricks for traveling on a budget without sacrificing comfort.	2	1	2025-05-28 18:38:40.164+02	2025-05-28 18:38:40.164+02
3	The Best Beaches in Europe	An overview of the top beaches in Europe, ideal for sunbathing and relaxation.	3	2	2025-05-28 18:38:40.164+02	2025-05-28 18:38:40.164+02
4	Solo Travel Experiences	Sharing personal experiences and insights for solo travelers.	4	3	2025-05-28 18:38:40.164+02	2025-05-28 18:38:40.164+02
5	Luxury Resorts Around the World	A guide to the most luxurious resorts in the world.	5	4	2025-05-28 18:38:40.164+02	2025-05-28 18:38:40.164+02
\.


--
-- Data for Name: topics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topics (id, country_id, name, created_at, updated_at) FROM stdin;
1	1	Tourism	2025-05-28 18:38:40.16+02	2025-05-28 18:38:40.16+02
2	2	Travel Tips	2025-05-28 18:38:40.16+02	2025-05-28 18:38:40.16+02
3	3	Cultural Experiences	2025-05-28 18:38:40.16+02	2025-05-28 18:38:40.16+02
4	4	Food and Cuisine	2025-05-28 18:38:40.16+02	2025-05-28 18:38:40.16+02
5	5	Adventure Travel	2025-05-28 18:38:40.16+02	2025-05-28 18:38:40.16+02
\.


--
-- Data for Name: user_subjects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_subjects (id, user_id, subject_id) FROM stdin;
1	2	1
2	3	1
3	4	1
4	5	1
5	1	1
6	2	1
7	3	1
8	4	1
9	5	1
10	1	1
11	2	1
12	3	1
13	4	1
14	5	1
15	1	1
16	2	1
17	3	1
18	4	1
19	5	1
20	1	1
21	2	1
22	3	1
23	4	1
24	5	1
25	1	1
26	2	1
27	3	1
28	4	1
29	5	1
30	1	1
31	2	1
32	3	1
33	4	1
34	5	1
35	1	1
36	2	1
37	3	1
38	4	1
39	5	1
40	1	1
41	2	1
42	3	1
43	4	1
44	5	1
45	1	1
46	2	1
47	3	1
48	4	1
49	5	1
50	1	1
51	2	1
52	3	1
53	4	1
54	5	1
55	1	1
56	2	1
57	3	1
58	4	1
59	5	1
60	1	1
61	2	1
62	3	1
63	4	1
64	5	1
65	1	1
66	2	1
67	3	1
68	4	1
69	5	1
70	1	1
71	2	1
72	3	1
73	4	1
74	5	1
75	1	1
76	2	1
77	3	1
78	4	1
79	5	1
80	1	1
81	2	1
82	3	1
83	4	1
84	5	1
85	1	1
86	2	1
87	3	1
88	4	1
89	5	1
90	1	1
91	2	1
92	3	1
93	4	1
94	5	1
95	1	1
96	2	1
97	3	1
98	4	1
99	5	1
100	1	1
101	2	1
102	3	1
103	4	1
104	5	1
105	1	1
106	2	1
107	3	1
108	4	1
109	5	1
110	1	1
111	2	1
112	3	1
113	4	1
114	5	1
115	1	1
116	2	1
117	3	1
118	4	1
119	5	1
120	1	1
121	2	1
122	3	1
123	4	1
124	5	1
125	1	1
126	2	1
127	3	1
128	4	1
129	5	1
130	1	1
131	2	1
132	3	1
133	4	1
134	5	1
135	1	1
136	2	1
137	3	1
138	4	1
139	5	1
140	1	1
141	2	1
142	3	1
143	4	1
144	5	1
145	1	1
146	2	1
147	3	1
148	4	1
149	5	1
150	1	1
151	2	1
152	3	1
153	2	2
154	3	2
155	4	2
156	5	2
157	1	2
158	2	2
159	3	2
160	4	2
161	5	2
162	1	2
163	2	2
164	2	3
165	3	3
166	4	3
167	5	3
168	1	3
169	2	3
170	3	3
171	4	3
172	5	3
173	1	3
174	2	3
175	3	3
176	4	3
177	5	3
178	1	3
179	2	3
180	3	3
181	4	3
182	5	3
183	1	3
184	2	3
185	3	3
186	4	3
187	5	3
188	1	3
189	2	3
190	3	3
191	4	3
192	5	3
193	1	3
194	2	3
195	3	3
196	4	3
197	5	3
198	1	3
199	2	3
200	3	3
201	4	3
202	5	3
203	1	3
204	2	3
205	3	3
206	4	3
207	5	3
208	1	3
209	2	3
210	3	3
211	4	3
212	5	3
213	1	3
214	2	3
215	3	3
216	4	3
217	5	3
218	1	3
219	2	3
220	3	3
221	4	3
222	5	3
223	1	3
224	2	3
225	3	3
226	4	3
227	5	3
228	1	3
229	2	3
230	3	3
231	4	3
232	5	3
233	1	3
234	2	3
235	3	3
236	4	3
237	5	3
238	1	3
239	2	3
240	3	3
241	4	3
242	5	3
243	1	3
244	2	3
245	3	3
246	4	3
247	5	3
248	1	3
249	2	3
250	3	3
251	4	3
252	5	3
253	1	3
254	2	3
255	3	3
256	4	3
257	5	3
258	1	3
259	2	3
260	3	3
261	4	3
262	5	3
263	1	3
264	2	3
265	3	3
266	4	3
267	5	3
268	1	3
269	2	3
270	3	3
271	4	3
272	5	3
273	1	3
274	2	3
275	3	3
276	4	3
277	5	3
278	1	3
279	2	3
280	3	3
281	4	3
282	5	3
283	1	3
284	2	3
285	3	3
286	4	3
287	5	3
288	1	3
289	2	4
290	3	4
291	4	4
292	5	4
293	1	4
294	2	4
295	3	4
296	4	4
297	5	4
298	1	4
299	2	4
300	3	4
301	4	4
302	5	4
303	1	4
304	2	4
305	3	4
306	4	4
307	5	4
308	1	4
309	2	4
310	3	4
311	4	4
312	5	4
313	1	4
314	2	4
315	3	4
316	4	4
317	5	4
318	1	4
319	2	4
320	3	4
321	4	4
322	5	4
323	1	4
324	2	4
325	3	4
326	4	4
327	5	4
328	1	4
329	2	4
330	3	4
331	4	4
332	5	4
333	1	4
334	2	4
335	3	4
336	4	4
337	5	4
338	1	4
339	2	4
340	3	4
341	4	4
342	5	4
343	1	4
344	2	4
345	3	4
346	4	4
347	5	4
348	1	4
349	2	4
350	3	4
351	4	4
352	5	4
353	1	4
354	2	4
355	3	4
356	4	4
357	5	4
358	1	4
359	2	4
360	3	4
361	4	4
362	2	5
363	3	5
364	4	5
365	5	5
366	1	5
367	2	5
368	3	5
369	4	5
370	5	5
371	1	5
372	2	5
373	3	5
374	4	5
375	5	5
376	1	5
377	2	5
378	3	5
379	4	5
380	5	5
381	1	5
382	2	5
383	3	5
384	4	5
385	5	5
386	1	5
387	2	5
388	3	5
389	4	5
390	5	5
391	1	5
392	2	5
393	3	5
394	4	5
395	5	5
396	1	5
397	2	5
398	3	5
399	4	5
400	5	5
401	1	5
402	2	5
403	3	5
404	4	5
405	5	5
406	1	5
407	2	5
\.


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 20, true);


--
-- Name: subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subjects_id_seq', 5, true);


--
-- Name: topics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topics_id_seq', 5, true);


--
-- Name: user_subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_subjects_id_seq', 407, true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: subjects subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (id);


--
-- Name: topics topics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);


--
-- Name: user_subjects user_subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_subjects
    ADD CONSTRAINT user_subjects_pkey PRIMARY KEY (id);


--
-- Name: comments subject; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT subject FOREIGN KEY (subject) REFERENCES public.subjects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_subjects subject; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_subjects
    ADD CONSTRAINT subject FOREIGN KEY (subject_id) REFERENCES public.subjects(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: subjects topic; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT topic FOREIGN KEY (topic) REFERENCES public.topics(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

