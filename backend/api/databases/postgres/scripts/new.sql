-- PostgreSQL database creation script

CREATE TABLE IF NOT EXISTS public.user (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.friendship (
  id SERIAL PRIMARY KEY,
  first_user_id INT NOT NULL,
  second_user_id INT NOT NULL,
  FOREIGN KEY (first_user_id) REFERENCES public.user(id),
  FOREIGN KEY (second_user_id) REFERENCES public.user(id),
  UNIQUE (first_user_id, second_user_id),
  CHECK (first_user_id < second_user_id) -- this makes impossible to create duplicated friendship even with inverted columns
);

CREATE TABLE IF NOT EXISTS public.gradebook (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES public.user(id)
);

CREATE TABLE IF NOT EXISTS public.subject (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  abbreviation VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.grade (
  id SERIAL PRIMARY KEY,
  score DECIMAL NOT NULL,
  subject_id INT NOT NULL,
  gradebook_id INT NOT NULL,
  FOREIGN KEY (subject_id) REFERENCES public.subject(id),
  FOREIGN KEY (gradebook_id) REFERENCES public.gradebook(id)
);

CREATE TABLE IF NOT EXISTS public.note (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES public.user(id)
);
