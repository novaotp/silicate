-- PostgreSQL Database creation script --
DROP SCHEMA IF EXISTS public CASCADE;

CREATE SCHEMA public;

CREATE TABLE IF NOT EXISTS public.user (
	id SERIAL PRIMARY KEY NOT NULL,
	first_name VARCHAR NOT NULL,
	last_name VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	CONSTRAINT check_email CHECK(email LIKE '%@%.%'),
	CONSTRAINT unique_user_email UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS public.friendship (
	id SERIAL PRIMARY KEY NOT NULL,
	first_user_id INT NOT NULL,
	second_user_id INT NOT NULL,
	CONSTRAINT unique_friendship UNIQUE(first_user_id, second_user_id),
	CONSTRAINT check_friendship CHECK(first_user_id < second_user_id),
	CONSTRAINT fk_first_user_id FOREIGN KEY (first_user_id) REFERENCES public.user(id),
	CONSTRAINT fk_second_user_id FOREIGN KEY (second_user_id) REFERENCES public.user(id)
);

CREATE TABLE IF NOT EXISTS public.gradebook (
	id SERIAL PRIMARY KEY NOT NULL,
	user_id INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	description TEXT,
	start_period TIMESTAMPTZ NOT NULL,
	end_period TIMESTAMPTZ NOT NULL,
	created_at TIMESTAMPTZ NOT NULL,
	updated_at TIMESTAMPTZ NOT NULL,
	deleted_at TIMESTAMPTZ,
	CONSTRAINT unique_gradebook UNIQUE(user_id, name),
	CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.user(id)
);

CREATE TABLE IF NOT EXISTS public.subject (
	id SERIAL PRIMARY KEY NOT NULL,
	user_id INT NOT NULL,
	gradebook_id INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	description TEXT,
	created_at TIMESTAMPTZ NOT NULL,
	updated_at TIMESTAMPTZ NOT NULL,
	deleted_at TIMESTAMPTZ,
	CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.user(id),
	CONSTRAINT fk_gradebook_id FOREIGN KEY (gradebook_id) REFERENCES public.gradebook(id)
);

CREATE TABLE IF NOT EXISTS public.grade (
	id SERIAL PRIMARY KEY NOT NULL,
	user_id INT NOT NULL,
	subject_id INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	score VARCHAR(5) NOT NULL,
	weight DECIMAL NOT NULL,
	comment TEXT,
	created_at TIMESTAMPTZ NOT NULL,
	updated_at TIMESTAMPTZ NOT NULL,
	deleted_at TIMESTAMPTZ,
	CONSTRAINT check_weight CHECK(
		weight > 0
		AND weight <= 100
	),
	CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.user(id),
	CONSTRAINT fk_subject_id FOREIGN KEY (subject_id) REFERENCES public.subject(id)
);

CREATE TABLE IF NOT EXISTS public.memo (
	id SERIAL PRIMARY KEY NOT NULL,
	user_id INT NOT NULL,
	title VARCHAR(50) NOT NULL,
	content TEXT NOT NULL,
	created_at TIMESTAMPTZ NOT NULL,
	updated_at TIMESTAMPTZ NOT NULL,
	deleted_at TIMESTAMPTZ,
	CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.user(id)
);