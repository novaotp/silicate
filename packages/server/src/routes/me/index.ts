import { Router } from "express";
import { compare, hash } from "bcrypt";
import path from "path";
import sharp from "sharp";
import { avatarUpload } from "../../middlewares/file-uploads.js";
import { query } from "../../database/utils.js";
import { avatarPathToBase64 } from "./utils.js";
import type { User, UserWithAvatarPath } from "$common/models/user.js";

export const router = Router();

router.get('/', async (req, res) => {
    try {
        const { first: userWithAvatarPath } = await query<UserWithAvatarPath>(`
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

        if (!userWithAvatarPath) {
            return res.notFoundError("User not found");
        }

        let avatar: string | null = null;
        if (userWithAvatarPath.avatarPath) {
            avatar = await avatarPathToBase64(userWithAvatarPath.avatarPath);
        }

        const user: User = {
            id: userWithAvatarPath.id,
            firstName: userWithAvatarPath.firstName,
            lastName: userWithAvatarPath.lastName,
            email: userWithAvatarPath.email,
            avatar: avatar,
            bio: userWithAvatarPath.bio,
            joinedOn: userWithAvatarPath.joinedOn
        }

        return res.success("User read successfully", user);
    } catch (err) {
        console.error(`Something went wrong whilst fetching a user's data : ${err.message}`);
        return res.serverError();
    }
});

router.put('/', async (req, res) => {
    try {
        const { firstName, lastName, email, bio } = req.body;

        await query(`
            UPDATE public.user
            SET first_name = $1,
                last_name = $2,
                email = $3,
                bio = $4,
                updated_at = $5
            WHERE id = $6;
        `, [firstName, lastName, email, bio, new Date(), req.userId]);

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

router.put('/avatar', avatarUpload.single("avatar"), async (req, res) => {
    try {
        const cropArea: { x: number, y: number, width: number, height: number } = JSON.parse(req.body.cropArea);
        const avatar = req.file;

        if (!avatar) {
            return res.status(418).send({ message: 'No file uploaded.' });
        }

        const outputFilename = `cropped_${avatar.filename.split(".").at(0)}.${avatar.filename.split(".").at(1)}`;
        const outputPath = path.join('public\\uploads\\avatars', outputFilename);

        const cropX = Number(cropArea.x.toFixed(10));
        const cropY = Number(cropArea.y.toFixed(10));
        const cropWidth = Number(cropArea.width.toFixed(10));
        const cropHeight = Number(cropArea.height.toFixed(10));

        await sharp(avatar.path)
            .extract({ left: cropX, top: cropY, width: cropWidth, height: cropHeight })
            .toFile(outputPath);

        await query(`
            UPDATE public.user
            SET avatar_path = $1
            WHERE id = $2;
        `, [outputPath, req.userId]);

        const avatarData = await avatarPathToBase64(outputPath);

        return res.success("User avatar updated successfully", avatarData);
    } catch (err) {
        console.error(`Something went wrong whilst updating a user's avatar : ${err.message}`);
        return res.serverError();
    }
});

router.delete('/avatar', async (req, res) => {
    try {
        await query(`
            UPDATE public.user
            SET avatar_path = NULL
            WHERE id = $1;
        `, [req.userId]);

        return res.success("User avatar deleted successfully");
    } catch (err) {
        console.error(`Something went wrong whilst deleting a user's avatar : ${err.message}`);
        return res.serverError();
    }
});

router.put('/password', async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const { first } = await query<{ password: string }>(`
            SELECT password
            FROM public.user
            WHERE id = $1;
        `, [req.userId]);

        const isValidPassword = await compare(oldPassword, first!.password);
        if (!isValidPassword) {
            return res.status(401).send({ success: false, message: "The old passwords don't match." })
        }

        await query(`
            UPDATE public.user
            SET password = $1
            WHERE id = $2;
        `, [await hash(newPassword, 15), req.userId]);

        return res.success("User's password updated successfully");
    } catch (err) {
        console.error(`Something went wrong whilst updating a user's password : ${err.message}`);
        return res.serverError();
    }
});
