DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

CREATE TABLE public.accounts (
  id SERIAL NOT NULL,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(80) NOT NULL,
  password VARCHAR(24) NOT NULL,
  CONSTRAINT pk_id PRIMARY KEY (id),
  CONSTRAINT u_email UNIQUE (email),
  CONSTRAINT c_email CHECK (email LIKE '%@%.%')
);
