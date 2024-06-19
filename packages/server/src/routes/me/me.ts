import { Router } from "express";
import { User, UserWithAvatarPath } from "../../../../libs/models/User";
import { hash } from "bcrypt";
import { avatarUpload } from "../../middlewares/file-uploads";
import { query } from "../../database/utils";
import { avatarPathToBase64 } from "./utils";

export const router = Router();

router.get('/', async (req, res) => {
    try {
        const { first: user } = await query<UserWithAvatarPath>(`
            SELECT
                id,
                first_name as "firstName",
                last_name as "lastName",
                email,
                avatar_path as "avatarPath",
                bio,
                created_at as "joinedOn"
            FROM public.user
            WHERE id = $1
            LIMIT 1;
        `, [req.userId]);

        if (!user) {
            return res.notFoundError("User not found");
        }

        let avatar: string | null = null;
        if (user.avatarPath) {
            avatar = await avatarPathToBase64(user.avatarPath);
        }

        // No need for the avatar path.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { avatarPath: _, ...userWithoutAvatarPath } = { ...user };

        return res.success("User read successfully", { ...userWithoutAvatarPath, avatar } satisfies User);
    } catch (err) {
        console.error(`Something went wrong whilst fetching a user's data : ${err.message}`);
        return res.serverError();
    }
});

router.put('/', avatarUpload.single("avatar"), async (req, res) => {
    try {
        const { firstName, lastName, email, password, bio } = req.body;
        const avatar = req.file;

        let avatarPath: string | null = null;
        if (avatar) {
            avatarPath = avatar.path;
        }

        await query(`
            UPDATE public.user
            SET first_name = $1,
                last_name = $2,
                email = $3,
                password = $4,
                avatar_path = $5,
                bio = $6,
                updated_at = $7,
            WHERE id = $8;
        `, [firstName, lastName, email, await hash(password, 15), avatarPath, bio, new Date(), req.userId]);

        return res.success("User updated successfully");
    } catch (err) {
        console.error(`Something went wrong whilst updating a user : ${err.message}`);
        return res.serverError();
    }
});

router.delete('/', async (req, res) => {
    try {
        await query(`
            DELETE FROM public.user
            WHERE id = $1;
        `, [req.userId]);

        return res.success("User deleted successfully");
    } catch (err) {
        console.error(`Something went wrong whilst deleting a user : ${err.message}`);
        return res.serverError();
    }
});
