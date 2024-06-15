import { Router } from "express";
import { Reminder } from "../../../../libs/models/Task";
import { query } from "../../database/utils";

export const router = Router();

router.get('/:id(\\d+$)/reminders', async (req, res) => {
    try {
        const { rows: reminders } = await query<Reminder>(`
            SELECT id, task_id as "taskId", time
            FROM public.task_reminder
            WHERE id = $1 AND user_id = $2;
        `, [req.params.id, req.userId]);

        return res.success("Task reminders read successfully", reminders);
    } catch (err) {
        console.error(`Something went wrong whilst fetching a task reminder : ${err.message}`);
        return res.serverError();
    }
});

router.post('/:id(\\d+$)/reminders', async (req, res) => {
    try {
        const { time } = req.body;

        await query<Reminder>(`
            INSERT INTO public.task_reminder (task_id, time)
            VALUES ($1, $2);
        `, [req.params.id, time]);

        return res.success("Task reminder added successfully");
    } catch (err) {
        console.error(`Something went wrong whilst adding a task reminder : ${err.message}`);
        return res.serverError();
    }
});

router.put('/:taskId(\\d+$)/reminders/:reminderId(\\d+$)', async (req, res) => {
    try {
        const { time } = req.body;

        await query<Reminder>(`
            UPDATE public.task_reminder
            SET time = $1
            WHERE id = $2 AND task_id = $3;
        `, [time, req.params.reminderId, req.params.taskId]);

        return res.success("Task reminder updated successfully");
    } catch (err) {
        console.error(`Something went wrong whilst updating a task reminder : ${err.message}`);
        return res.serverError();
    }
});

router.delete('/:taskId(\\d+$)/reminders/:reminderId(\\d+$)', async (req, res) => {
    try {
        await query<Reminder>(`
            DELETE FROM public.task_reminder
            WHERE id = $1 AND task_id = $2;
        `, [req.params.reminderId, req.params.taskId]);

        return res.success("Task reminder updated successfully");
    } catch (err) {
        console.error(`Something went wrong whilst updating a task reminder : ${err.message}`);
        return res.serverError();
    }
});
