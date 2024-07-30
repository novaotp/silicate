import { Router } from 'express';
import { query } from '../../database/utils.js';
import type { Reminder } from '$common/models/task.js';

/**
 * ? Why are the endpoints typed ?
 * * Because the actual route prefix is always `/api/v1/tasks/:taskId/reminders`
 * * And to have type inference, it's the way to do it.
 * 
 * @author Sajidur Rahman
 * @date 27/07/2024
 */

export const router = Router();

router.get<'/', { taskId: string }, unknown, unknown, qs.ParsedQs, Record<string, unknown>>('/', async (req, res) => {
    try {
        const { rows: reminders } = await query<Reminder>(
            `
            SELECT
                task_reminder.id,
                task_reminder.task_id as "taskId", 
                task_reminder.time
            FROM public.task_reminder
            INNER JOIN public.task ON task.id = task_id
            WHERE task_reminder.task_id = $1 AND task.user_id = $2;
        `,
            [req.params.taskId, req.userId]
        );

        return res.success('Task reminders read successfully', reminders);
    } catch (err) {
        console.error(`Something went wrong whilst fetching a task reminder : ${err.message}`);
        return res.serverError();
    }
});

router.post<'/', { taskId: string }, unknown, { time: string }, qs.ParsedQs, Record<string, unknown>>(
    '/',
    async (req, res) => {
        try {
            const { time } = req.body;

            const { first: reminder } = await query<Reminder>(
                `
            INSERT INTO public.task_reminder (task_id, time)
            VALUES ($1, $2)
            RETURNING id, task_id as "taskId", time;
        `,
                [req.params.taskId, time]
            );

            return res.success('Task reminder added successfully', reminder);
        } catch (err) {
            console.error(`Something went wrong whilst adding a task reminder : ${err.message}`);
            return res.serverError();
        }
    }
);

router.put<
    '/:reminderId',
    { taskId: string; reminderId: string },
    unknown,
    { time: string },
    qs.ParsedQs,
    Record<string, unknown>
>('/:reminderId', async (req, res) => {
    try {
        const { time } = req.body;

        await query<Reminder>(
            `
            UPDATE public.task_reminder
            SET time = $1
            WHERE id = $2 AND task_id = $3;
        `,
            [new Date(time), req.params.reminderId, req.params.taskId]
        );

        return res.success('Task reminder updated successfully');
    } catch (err) {
        console.error(`Something went wrong whilst updating a task reminder : ${err.message}`);
        return res.serverError();
    }
});

router.delete<
    '/:reminderId',
    { taskId: string; reminderId: string },
    unknown,
    unknown,
    qs.ParsedQs,
    Record<string, unknown>
>('/:reminderId', async (req, res) => {
    try {
        await query<Reminder>(
            `
            DELETE FROM public.task_reminder
            WHERE id = $1 AND task_id = $2;
        `,
            [req.params.reminderId, req.params.taskId]
        );

        return res.success('Task reminder updated successfully');
    } catch (err) {
        console.error(`Something went wrong whilst updating a task reminder : ${err.message}`);
        return res.serverError();
    }
});
