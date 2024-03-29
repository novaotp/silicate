DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

CREATE TABLE public.user (
    id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE public.memo (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    tag VARCHAR(30),
    title VARCHAR(80) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_memo_user FOREIGN KEY (user_id) REFERENCES public.user (id)
);

CREATE TABLE public.priority (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO public.priority (name)
VALUES ('Aucune'), ('Basse'), ('Moyenne'), ('Haute');

CREATE TABLE public.status (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO public.status (name)
VALUES ('Aucun'), ('À faire'), ('En cours'), ('Terminé');

CREATE TABLE public.task (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    priority_id INT,
    status_id INT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(255),
    due TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_task_user FOREIGN KEY (user_id) REFERENCES public.user (id),
    CONSTRAINT fk_task_priority FOREIGN KEY (priority_id) REFERENCES public.priority (id),
    CONSTRAINT fk_task_status FOREIGN KEY (status_id) REFERENCES public.status (id)
);
