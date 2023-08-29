DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

CREATE TABLE public.accounts (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(80) NOT NULL,
  password VARCHAR(24) NOT NULL,
  CONSTRAINT u_email UNIQUE (email),
  CONSTRAINT c_email CHECK (email LIKE '%@%.%')
);

CREATE TABLE gradebooks (
  id SERIAL NOT NULL,
  account_id INT,
  name TEXT,
  CONSTRAINT pk_grade_books_id PRIMARY KEY (id),
  CONSTRAINT fk_grade_books_accounts FOREIGN KEY (account_id) REFERENCES public.accounts (id),
  CONSTRAINT u_grade_book UNIQUE (account_id, name)
);

CREATE TABLE subjects (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT,
  CONSTRAINT u_subject UNIQUE (name)
);

CREATE TABLE grades (
  id SERIAL PRIMARY KEY NOT NULL,
  gradebook_id INT NOT NULL,
  subject_id INT NOT NULL,
  title TEXT,
  value TEXT,
  CONSTRAINT fk_grades_gradebooks FOREIGN KEY (gradebook_id) REFERENCES public.gradebooks (id),
  CONSTRAINT fk_grades_subjects FOREIGN KEY (subject_id) REFERENCES public.subjects (id),
  CONSTRAINT u_grade UNIQUE (gradebook_id, subject_id, title, value)
);