-- PostgreSQL database creation script

CREATE TABLE IF NOT EXISTS public.user (
  id SERIAL PRIMARY KEY,
<<<<<<< HEAD
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL
=======
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(75) UNIQUE NOT NULL,
  CHECK(email LIKE '%@%.%')
>>>>>>> d1f5d52d2ebb99cc5d474f8d6bc4c1d82a41ec1e
);

CREATE TABLE IF NOT EXISTS public.friendship (
  id SERIAL PRIMARY KEY,
  first_user_id INT NOT NULL,
  second_user_id INT NOT NULL,
<<<<<<< HEAD
  FOREIGN KEY (first_user_id) REFERENCES user(id),
  FOREIGN KEY (second_user_id) REFERENCES user(id),
=======
  FOREIGN KEY (first_user_id) REFERENCES public.user(id),
  FOREIGN KEY (second_user_id) REFERENCES public.user(id),
>>>>>>> d1f5d52d2ebb99cc5d474f8d6bc4c1d82a41ec1e
  UNIQUE (first_user_id, second_user_id),
  CHECK (first_user_id < second_user_id) -- this makes impossible to create duplicated friendship even with inverted columns
);

CREATE TABLE IF NOT EXISTS public.gradebook (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  user_id INT NOT NULL,
<<<<<<< HEAD
  FOREIGN KEY (user_id) REFERENCES user(id)
=======
  FOREIGN KEY (user_id) REFERENCES public.user(id),
  UNIQUE(name, user_id)
>>>>>>> d1f5d52d2ebb99cc5d474f8d6bc4c1d82a41ec1e
);

CREATE TABLE IF NOT EXISTS public.subject (
  id SERIAL PRIMARY KEY,
<<<<<<< HEAD
  name VARCHAR(50) NOT NULL,
  abbreviation VARCHAR(10) NOT NULL
=======
  name VARCHAR(50) UNIQUE NOT NULL,
  abbreviation VARCHAR(10) UNIQUE NOT NULL
>>>>>>> d1f5d52d2ebb99cc5d474f8d6bc4c1d82a41ec1e
);

CREATE TABLE IF NOT EXISTS public.grade (
  id SERIAL PRIMARY KEY,
  score DECIMAL NOT NULL,
<<<<<<< HEAD
  subject_id INT NOT NULL,
  gradebook_id INT NOT NULL,
  FOREIGN KEY (subject_id) REFERENCES subject(id),
  FOREIGN KEY (gradebook_id) REFERENCES gradebook(id)
=======
  name VARCHAR(50) NOT NULL,
  subject_id INT NOT NULL,
  gradebook_id INT NOT NULL,
  FOREIGN KEY (subject_id) REFERENCES public.subject(id),
  FOREIGN KEY (gradebook_id) REFERENCES public.gradebook(id),
  UNIQUE(name, subject_id, gradebook_id)
>>>>>>> d1f5d52d2ebb99cc5d474f8d6bc4c1d82a41ec1e
);

CREATE TABLE IF NOT EXISTS public.note (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  user_id INT NOT NULL,
<<<<<<< HEAD
  FOREIGN KEY (user_id) REFERENCES user(id)
);
=======
  FOREIGN KEY (user_id) REFERENCES public.user(id)
);
>>>>>>> d1f5d52d2ebb99cc5d474f8d6bc4c1d82a41ec1e
