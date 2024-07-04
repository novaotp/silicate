import { Router } from "express";
import { Mark } from "../../../libs/models/Mark";
import { query } from "../database/utils";

export const router = Router();

router.get("/:id(\\d+$)", async (req, res) => {
    try {
        const { first: markBook } = await query<Mark.Book>(`
            SELECT
                id,
                user_id as "userId",
                title,
                description
            FROM mark.book
            WHERE id = $1 AND user_id = $2
            LIMIT 1;
        `, [req.params.id, req.userId]);

        if (!markBook) {
            return res.notFoundError("Mark book not found");
        }

        return res.success("Mark book read successfully", markBook);
    } catch (err) {
        console.error(`Something went wrong whilst fetching a mark book : ${err.message}`);
        return res.serverError();
    }
});

router.get("/", async (req, res) => {
    try {
        let { search } = req.query;

        if (!search || search === "") {
            // Wildcard in SQL
            search = "%";
        } 

        const { rows } = await query<Mark.Book>(`
            SELECT
                id,
                user_id as "userId",
                title,
                description
            FROM mark.book
            WHERE user_id = $1 AND title LIKE $2;
        `, [req.userId, search]);

        return res.success("Mark books read successfully", rows);
    } catch (err) {
        console.error(`Something went wrong whilst fetching mark books : ${err.message}`);
        return res.serverError();
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;

        const { first } = await query<{ id: number }>(`
            INSERT INTO mark.book (user_id, title, description)
            VALUES ($1, $2, $3)
            RETURNING id;
        `, [req.userId, title, description]);

        return res.success("Mark book created successfully", first!.id);
    } catch (err) {
        console.error(`Something went wrong whilst creating a memo : ${err.message}`);
        return res.serverError();
    }
});

router.put('/:id(\\d+$)', async (req, res) => {
    try {
        const { title, description } = req.body;

        await query(`
            UPDATE mark.book
            SET title = $1,
                description = $2,
                updated_at = $3
            WHERE id = $4 AND user_id = $5;
        `, [title, description, new Date(), req.params.id, req.userId]);

        return res.success("Mark book updated successfully");
    } catch (err) {
        console.error(`Something went wrong whilst updating a mark book : ${err.message}`);
        return res.serverError();
    }
});

router.delete('/:id(\\d+$)', async (req, res) => {
    try {
        await query(`
            DELETE FROM mark.book
            WHERE id = $1 AND user_id = $2;
        `, [req.params.id, req.userId]);

        return res.success("Mark book deleted successfully");
    } catch (err) {
        console.error(`Something went wrong whilst deleting a mark book : ${err.message}`);
        return res.serverError();
    }
});

/**
 * Groups
 */

router.get("/:bookId(\\d+)/groups/:groupId(\\d+$)", async (req, res) => {
    try {
        // group surrounded by quotes because it's a reserved keyword
        // weight casted to float because decimals return as string
        const { first: markGroup } = await query<Mark.Group>(`
            SELECT
                "group".id,
                "group".book_id as "bookId",
                "group".title,
                "group".description,
                "group".weight::float
            FROM mark."group"
            JOIN mark.book ON book.id = "group".book_id
            WHERE "group".id = $1 AND "group".book_id = $2 AND book.user_id = $3
            LIMIT 1;
        `, [req.params.groupId, req.params.bookId, req.userId]);

        if (!markGroup) {
            return res.notFoundError("Mark group not found");
        }

        return res.success("Mark group read successfully", markGroup);
    } catch (err) {
        console.error(`Something went wrong whilst fetching a mark group : ${err.message}`);
        return res.serverError();
    }
});

router.get("/:bookId(\\d+)/groups", async (req, res) => {
    try {
        // group surrounded by quotes because it's a reserved keyword
        const { rows } = await query<Mark.Group>(`
            SELECT
                "group".id,
                "group".book_id as "bookId",
                "group".title,
                "group".description,
                "group".weight::float
            FROM mark."group"
            JOIN mark.book ON book.id = "group".book_id
            WHERE "group".book_id = $1 AND book.user_id = $2;
        `, [req.params.bookId, req.userId]);

        return res.success("Mark groups read successfully", rows);
    } catch (err) {
        console.error(`Something went wrong whilst fetching a user's mark groups : ${err.message}`);
        return res.serverError();
    }
});

router.post("/:bookId(\\d+)/groups", async (req, res) => {
    try {
        const { title, description, weight } = req.body;

        // group surrounded by quotes because it's a reserved keyword
        const { first } = await query<{ id: number }>(`
            INSERT INTO mark."group" (book_id, title, description, weight)
            VALUES ($1, $2, $3, $4)
            RETURNING id;
        `, [req.params.bookId, title, description, weight]);

        return res.success("Mark group added successfully", first!.id);
    } catch (err) {
        console.error(`Something went wrong whilst adding a mark group : ${err.message}`);
        return res.serverError();
    }
});

router.put("/:bookId(\\d+)/groups/:groupId(\\d+$)", async (req, res) => {
    try {
        const { title, description, weight } = req.body;

        // group surrounded by quotes because it's a reserved keyword
        await query(`
            UPDATE mark."group"
            SET title = $1,
                description = $2,
                weight = $3
            FROM mark.book
            WHERE book.id = "group".book_id
                AND "group".id = $4
                AND "group".book_id = $5
                AND book.user_id = $6;
        `, [title, description, weight, req.params.groupId, req.params.bookId, req.userId]);

        return res.success("Mark group updated successfully");
    } catch (err) {
        console.error(`Something went wrong whilst updating a mark group : ${err.message}`);
        return res.serverError();
    }
});

router.delete("/:bookId(\\d+)/groups/:groupId(\\d+$)", async (req, res) => {
    try {
        // group surrounded by quotes because it's a reserved keyword
        await query(`
            DELETE FROM mark."group"
            USING mark.book
            WHERE "group".book_id = book.id
                AND "group".id = $1
                AND "group".book_id = $2
                AND book.user_id = $3;
        `, [req.params.groupId, req.params.bookId, req.userId]);

        return res.success("Mark group deleted successfully");
    } catch (err) {
        console.error(`Something went wrong whilst deleting a mark group : ${err.message}`);
        return res.serverError();
    }
});

/**
 * Subjects
 */

router.get("/:bookId(\\d+)/groups/:groupId(\\d+)/subjects/:subjectId(\\d+$)", async (req, res) => {
    try {
        // group surrounded by quotes because it's a reserved keyword
        const { first: subject } = await query<Mark.Subject>(`
            SELECT
                subject.id,
                subject.group_id as "groupId",
                subject.title,
                subject.description
            FROM mark.subject
            JOIN mark."group" ON "group".id = subject.group_id
            JOIN mark.book ON book.id = "group".book_id
            WHERE subject.id = $1
                AND subject.group_id = $2
                AND "group".book_id = $3
                AND book.user_id = $4
            LIMIT 1;
        `, [req.params.subjectId, req.params.groupId, req.params.bookId, req.userId]);

        if (!subject) {
            return res.notFoundError("Subject not found");
        }

        return res.success("Subject read successfully", subject);
    } catch (err) {
        console.error(`Something went wrong whilst fetching a subject : ${err.message}`);
        return res.serverError();
    }
});

router.get("/:bookId(\\d+)/groups/:groupId(\\d+)/subjects", async (req, res) => {
    try {
        // group surrounded by quotes because it's a reserved keyword
        const { rows } = await query<Mark.Subject>(`
            SELECT
                subject.id,
                subject.group_id as "groupId",
                subject.title,
                subject.description
            FROM mark.subject
            JOIN mark."group" ON "group".id = subject.group_id
            JOIN mark.book ON book.id = "group".book_id
            WHERE subject.group_id = $1
                AND "group".book_id = $2
                AND book.user_id = $3;
        `, [req.params.groupId, req.params.bookId, req.userId]);

        return res.success("Subjects read successfully", rows);
    } catch (err) {
        console.error(`Something went wrong whilst fetching subjects : ${err.message}`);
        return res.serverError();
    }
});

router.post("/:bookId(\\d+)/groups/:groupId(\\d+)/subjects", async (req, res) => {
    try {
        const { title, description } = req.body;

        // group surrounded by quotes because it's a reserved keyword
        const { first } = await query<{ id: number }>(`
            INSERT INTO mark.subject (group_id, title, description)
            VALUES ($1, $2, $3)
            RETURNING id;
        `, [req.params.groupId, title, description]);

        return res.success("Subject added successfully", first!.id);
    } catch (err) {
        console.error(`Something went wrong whilst adding a subject : ${err.message}`);
        return res.serverError();
    }
});

router.put("/:bookId(\\d+)/groups/:groupId(\\d+)/subjects/:subjectId(\\d+$)", async (req, res) => {
    try {
        const { title, description } = req.body;

        // group surrounded by quotes because it's a reserved keyword
        await query(`
            UPDATE mark.subject
            SET title = $1,
                description = $2,
                updated_at = $3
            FROM mark."group", mark.book
            WHERE "group".id = group_id
                AND book.id = "group".book_id
                AND subject.id = $4
                AND subject.group_id = $5
                AND "group".book_id = $6
                AND book.user_id = $7;
        `, [title, description, new Date(), req.params.subjectId, req.params.groupId, req.params.bookId, req.userId]);

        return res.success("Subject updated successfully");
    } catch (err) {
        console.error(`Something went wrong whilst updating a subject : ${err.message}`);
        return res.serverError();
    }
});

router.delete("/:bookId(\\d+)/groups/:groupId(\\d+)/subjects/:subjectId(\\d+$)", async (req, res) => {
    try {
        // group surrounded by quotes because it's a reserved keyword
        await query(`
            DELETE FROM mark.subject
            USING mark."group", mark.book
            WHERE "group".id = subject.group_id
                AND "group".book_id = book.id
                AND subject.id = $1
                AND "group".id = $2
                AND "group".book_id = $3
                AND book.user_id = $4;
        `, [req.params.subjectId, req.params.groupId, req.params.bookId, req.userId]);

        return res.success("Subject deleted successfully");
    } catch (err) {
        console.error(`Something went wrong whilst deleting a subject : ${err.message}`);
        return res.serverError();
    }
});

/**
 * Exams
 */

router.get("/:bookId(\\d+)/groups/:groupId(\\d+)/subjects/:subjectId(\\d+)/exams/:examId(\\d+$)", async (req, res) => {
    try {
        // group surrounded by quotes because it's a reserved keyword
        // weight casted to float because decimals return as string
        const { first: exam } = await query<Mark.Exam>(`
            SELECT
                exam.id,
                exam.subject_id as "subjectId",
                exam.title,
                exam.comment,
                exam.score::float,
                exam.weight::float,
                date
            FROM mark.exam
            JOIN mark.subject ON subject.id = exam.subject_id
            JOIN mark."group" ON "group".id = subject.group_id
            JOIN mark.book ON book.id = "group".book_id
            WHERE exam.id = $1
                AND exam.subject_id = $2
                AND subject.group_id = $3
                AND "group".book_id = $4
                AND book.user_id = $5
            LIMIT 1;
        `, [req.params.examId, req.params.subjectId, req.params.groupId, req.params.bookId, req.userId]);

        if (!exam) {
            return res.notFoundError("Exam not found");
        }

        return res.success("Exam read successfully", exam);
    } catch (err) {
        console.error(`Something went wrong whilst fetching an exam : ${err.message}`);
        return res.serverError();
    }
});

router.get("/:bookId(\\d+)/groups/:groupId(\\d+)/subjects/:subjectId(\\d+)/exams", async (req, res) => {
    try {
        // group surrounded by quotes because it's a reserved keyword
        const { rows } = await query<Mark.Exam>(`
            SELECT
                exam.id,
                exam.subject_id as "subjectId",
                exam.title,
                exam.comment,
                exam.score::float,
                exam.weight::float,
                date
            FROM mark.exam
            JOIN mark.subject ON subject.id = exam.subject_id
            JOIN mark."group" ON "group".id = subject.group_id
            JOIN mark.book ON book.id = "group".book_id
            WHERE exam.subject_id = $1
                AND subject.group_id = $2
                AND "group".book_id = $3
                AND book.user_id = $4;
        `, [req.params.subjectId, req.params.groupId, req.params.bookId, req.userId]);

        return res.success("Exams read successfully", rows);
    } catch (err) {
        console.error(`Something went wrong whilst fetching exams : ${err.message}`);
        return res.serverError();
    }
});

router.post("/:bookId(\\d+)/groups/:groupId(\\d+)/subjects/:subjectId(\\d+)/exams", async (req, res) => {
    try {
        const { title, comment, score, weight, date } = req.body;

        const { first } = await query<{ id: number }>(`
            INSERT INTO mark.exam (subject_id, title, comment, score, weight, date)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id;
        `, [req.params.subjectId, title, comment, score, weight, date]);

        return res.success("Exam added successfully", first!.id);
    } catch (err) {
        console.error(`Something went wrong whilst adding an exam : ${err.message}`);
        return res.serverError();
    }
});

router.put("/:bookId(\\d+)/groups/:groupId(\\d+)/subjects/:subjectId(\\d+)/exams/:examId(\\d+$)", async (req, res) => {
    try {
        const { title, comment, score, weight, date } = req.body;

        // group surrounded by quotes because it's a reserved keyword
        await query(`
            UPDATE mark.exam
            SET title = $1,
                comment = $2,
                score = $3,
                weight = $4,
                date = $5,
                updated_at = $6
            FROM mark.subject, mark."group", mark.book
            WHERE exam.subject_id = subject.id
                AND "group".id = subject.group_id
                AND book.id = "group".book_id
                AND exam.id = $7
                AND subject.id = $8
                AND subject.group_id = $9
                AND "group".book_id = $10
                AND book.user_id = $11;
        `, [title, comment, score, weight, date, new Date(), req.params.examId, req.params.subjectId, req.params.groupId, req.params.bookId, req.userId]);

        return res.success("Exam updated successfully");
    } catch (err) {
        console.error(`Something went wrong whilst updating an exam : ${err.message}`);
        return res.serverError();
    }
});

router.delete("/:bookId(\\d+)/groups/:groupId(\\d+)/subjects/:subjectId(\\d+)/exams/:examId(\\d+$)", async (req, res) => {
    try {
        // group surrounded by quotes because it's a reserved keyword
        await query(`
            DELETE FROM mark.exam
            USING mark.subject, mark."group", mark.book
            WHERE exam.subject_id = subject.id
                AND "group".id = subject.group_id
                AND "group".book_id = book.id
                AND exam.id = $1
                AND subject.id = $2
                AND "group".id = $3
                AND "group".book_id = $4
                AND book.user_id = $5;
        `, [req.params.examId, req.params.subjectId, req.params.groupId, req.params.bookId, req.userId]);

        return res.success("Exam deleted successfully");
    } catch (err) {
        console.error(`Something went wrong whilst deleting an exam : ${err.message}`);
        return res.serverError();
    }
});