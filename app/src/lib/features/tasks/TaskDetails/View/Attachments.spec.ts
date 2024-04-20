import { render, screen } from "@testing-library/svelte";
import Attachments from "./Attachments.svelte";
import type { Attachment } from "$libs/models/Task";

describe("Attachments Component", () => {
    it("should render the number of files correctly", () => {
        const attachments: Attachment[] = [
            {
                relativePathOnServer: "/some-route",
                name: "A filename"
            }
        ]
        const controller = new AbortController();
        render(Attachments, { id: 1, value: JSON.stringify(attachments), signal: controller.signal });

        const label = screen.getByText("Fichier(s) joint(s) (1)");

        expect(label).toBeTruthy();
    });
});
