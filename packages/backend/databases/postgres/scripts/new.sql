
-- PostgreSQL Database creation script --

CREATE TABLE IF NOT EXISTS public.user (
	id 					SERIAL 			PRIMARY KEY NOT NULL,
	first_name 	VARCHAR(50) NOT NULL,
	last_name  	VARCHAR(50) NOT NULL,
	email 			VARCHAR(50)	NOT NULL,
	password		VARCHAR			NOT NULL,
	CONSTRAINT check_email 				CHECK(email LIKE '%@%.%'),
	CONSTRAINT unique_user_email 	UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS public.friendship (
	id							SERIAL	PRIMARY KEY NOT NULL,
	first_user_id		INT			NOT NULL,
	second_user_id	INT			NOT NULL,
	CONSTRAINT unique_friendship 	UNIQUE(first_user_id, second_user_id),
	CONSTRAINT check_friendship 	CHECK(first_user_id < second_user_id),
	CONSTRAINT fk_first_user_id 	FOREIGN KEY (first_user_id) 	REFERENCES public.user(id),
	CONSTRAINT fk_second_user_id 	FOREIGN KEY (second_user_id) 	REFERENCES public.user(id)
);

CREATE TABLE IF NOT EXISTS public.gradebook (
	id				SERIAL			PRIMARY KEY NOT NULL,
	user_id		INT					NOT NULL,
	name			VARCHAR(50)	NOT NULL,
	CONSTRAINT unique_gradebook UNIQUE(user_id, name),
	CONSTRAINT fk_user_id 			FOREIGN KEY (user_id) REFERENCES public.user(id)
);

CREATE TABLE IF NOT EXISTS public.subject (
	id			SERIAL			PRIMARY KEY NOT NULL,
	name		VARCHAR(50)	NOT NULL,
	abbrev	VARCHAR(10)	NOT NULL,
	CONSTRAINT unique_subject_name 		UNIQUE(name),
	CONSTRAINT unique_subject_abbrev 	UNIQUE(abbrev)
);

CREATE TABLE IF NOT EXISTS public.grade (
	id						SERIAL			PRIMARY KEY NOT NULL,
	gradebook_id	INT					NOT NULL,
	subject_id		INT					NOT NULL,
	score					VARCHAR(5)	NOT NULL,
	weight				DECIMAL			NOT NULL,
	name					VARCHAR(50)	NOT NULL,
	CONSTRAINT unique_grade 		UNIQUE(gradebook_id, subject_id, name),
	CONSTRAINT check_weight 		CHECK(weight > 0 AND weight <= 100),
	CONSTRAINT fk_gradebook_id 	FOREIGN KEY (gradebook_id) 	REFERENCES public.gradebook(id),
	CONSTRAINT fk_subject_id 		FOREIGN KEY (subject_id) 		REFERENCES public.subject(id)
);

CREATE TABLE IF NOT EXISTS public.note (
	id					SERIAL			PRIMARY KEY NOT NULL,
	user_id			INT					NOT NULL,
	title				VARCHAR(50)	NOT NULL,
	content			TEXT				NOT NULL,
	created_at 	BIGINT					NOT NULL,
	updated_at 	BIGINT					NOT NULL,
	deleted_at 	BIGINT,
	CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.user(id)
);
