import { db } from "$database";
import type { Memo, RawMemo } from "$database/models/Memo";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, url }) => {
    const search = url.searchParams.get('search');

    if (search === "") {
        throw redirect(307, "/app/memos");
    }

    let memos: Memo[] = [];
    try {
        const client = await db.connect();

        const { rows } = await client.query<RawMemo>("SELECT * FROM public.memo WHERE user_id = $1;", [locals.user!.id]);

        memos = rows.map(row => row.transform());

        client.release();
    } catch (err) {
        return fail(422, { memos, dbError: true });
    }

    const filteredAndSortedMemos = memos
                                    .filter(memo => search === null || memo.title.toLowerCase().includes(search.toLowerCase()))
                                    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    return {
        search: search,
        memos: filteredAndSortedMemos
    }
};

const DEFAULT_TITLE = "Mon mémo";

export const actions: Actions = {
    default: async ({ locals }) => {
        try {
			const client = await db.connect();

			const { rows } = await client.query("INSERT INTO public.memo (user_id, tag, title, content) VALUES ($1, $2, $3) RETURNING id;", [locals.user!.id, null, DEFAULT_TITLE, ""]);

			client.release();

            const memoId = rows[0];

			throw redirect(307, `/app/memos/${memoId}`);
		} catch (err) {
			return fail(422, { memos: [] as Memo[], dbError: true });
		}
    }
};
