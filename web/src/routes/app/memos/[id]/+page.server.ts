import { db } from "$database";
import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { RawMemo, Memo } from "$database/models/Memo";

export const load: PageServerLoad = async ({ params }) => {
    let memo: Memo;
    try {
        const client = await db.connect();
        const { rows } = await client.query<RawMemo>("SELECT * FROM public.memo WHERE id = $1 LIMIT 1;", [params.id]);
        client.release();

        if (!rows[0]) {
            throw redirect(307, "/app/memos");
        }

        memo = rows[0].transform();
    } catch (err) {
        return fail(422, { dbError: true });
    }

    return {
        memo: memo
    }
};
