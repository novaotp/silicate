import Due from "./Due.svelte";
import { render, screen } from '@testing-library/svelte';

describe("Due Component", () => {
    it("should find the label", () => {
        render(Due, { value: "2024-08-15T12:00:00.000Z" });

        const label = screen.getByText(/Échéance/i);

        expect(label).toBeTruthy();
    });

    it("should render the time correctly", () => {
        const value = "2024-08-15T12:00:00.000Z";

        render(Due, { value: value });

        // Timezone +2
        const due = screen.getByText(/15 août 2024, 14h00/i);

        expect(due).toBeTruthy();
    });
});
