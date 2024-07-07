DROP SCHEMA IF EXISTS mark CASCADE;
DROP SCHEMA IF EXISTS public CASCADE;

CREATE SCHEMA mark;
CREATE SCHEMA public;

CREATE TABLE public.user (
    id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL DEFAULT '',
    avatar_path VARCHAR(255),
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
    CONSTRAINT fk_memo_user FOREIGN KEY (user_id) REFERENCES public.user (id) ON DELETE CASCADE
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
    CONSTRAINT fk_task_user FOREIGN KEY (user_id) REFERENCES public.user (id) ON DELETE CASCADE
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

CREATE TABLE mark.book (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    -- letters (e.g. A, B, C) or numbers (6, 5.5, 5)
    grading_system VARCHAR(255) NOT NULL DEFAULT 'numbers',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_book_public_user FOREIGN KEY (user_id) REFERENCES public.user (id) ON DELETE CASCADE
);

CREATE TABLE mark.group (
    id SERIAL NOT NULL PRIMARY KEY,
    book_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    -- If "null", don't take the group into account
    -- when calculating the book's average score.
    weight NUMERIC,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_group_book FOREIGN KEY (book_id) REFERENCES mark.book (id) ON DELETE CASCADE
);

CREATE TABLE mark.subject (
    id SERIAL NOT NULL PRIMARY KEY,
    group_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_subject_group FOREIGN KEY (group_id) REFERENCES mark.group (id) ON DELETE CASCADE
);

CREATE TABLE mark.exam (
    id SERIAL NOT NULL PRIMARY KEY,
    subject_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL DEFAULT '',
    score NUMERIC NOT NULL,
    weight NUMERIC NOT NULL,
    date TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_exam_subject FOREIGN KEY (subject_id) REFERENCES mark.subject (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_exam_subject_id ON mark.exam(subject_id);
CREATE INDEX IF NOT EXISTS idx_subject_group_id ON mark.subject(group_id);
CREATE INDEX IF NOT EXISTS idx_group_book_id ON mark."group"(book_id);
CREATE INDEX IF NOT EXISTS idx_book_user_id ON mark.book(user_id);
