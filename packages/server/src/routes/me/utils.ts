import fs from "fs/promises";
import mime from "mime";

export const avatarPathToBase64 = async (avatarPath: string) => {
    const buffer = await fs.readFile(avatarPath);
    const avatarData = buffer.toString("base64");

    const mimeType = mime.lookup(avatarPath);

    return `data:image/${mimeType};base64,${avatarData}` as const;
}
