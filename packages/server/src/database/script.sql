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
    category VARCHAR(30),
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    pinned BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_memo_user FOREIGN KEY (user_id) REFERENCES public.user (id)
);

CREATE TABLE public.task (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(255),
    due TIMESTAMPTZ NOT NULL,
    steps TEXT,
    attachments TEXT,
    archived BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_task_user FOREIGN KEY (user_id) REFERENCES public.user (id)
);

CREATE TABLE public.task_reminder (
    id SERIAL NOT NULL PRIMARY KEY,
    task_id INT NOT NULL,
    time TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_task_reminder_task FOREIGN KEY (task_id) REFERENCES public.task (id) ON DELETE CASCADE
);

CREATE TABLE public.task_notification (
    id SERIAL NOT NULL PRIMARY KEY,
    task_reminder_id INT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_task_notification_task_reminder FOREIGN KEY (task_reminder_id) REFERENCES public.task_reminder (id) ON DELETE CASCADE
);
