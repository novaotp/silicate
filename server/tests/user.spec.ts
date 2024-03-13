import { compareSync } from "bcrypt";
import { ApiResponse, ApiResponseWithData } from "../../libs/types/ApiResponse";
import dotenv from "dotenv";
import { User } from "../../libs/models/User";

dotenv.config();

if (!process.env.ENV || process.env.ENV !== "test") {
    throw new Error("Invalid environment ! Cannot run the tests if the ENV isn't set to 'test'.")
}

/** We need to find a better way. */
let userId: number;

describe("Test endpoints related to a user.", () => {
    it("Creates a user and returns his id.", async () => {
        const response = await fetch(`${process.env.BACKEND_URL}/users`, {
            method: "POST",
            body: JSON.stringify({
                firstName: "Test",
                lastName: "Silicate",
                email: "test@silicate.com",
                password: "mypassword"
            }),
            headers: {
                "content-type": "application/json"
            }
        });
        const { data }: ApiResponseWithData<number> = await response.json();
        userId = data;

        expect(typeof data).toBe("number");
    });

    it("Reads a newly user successfully.", async () => {
        const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}`);
        const { data }: ApiResponseWithData<User> = await response.json();

        expect(data.id).toBe(userId);
        expect(data.firstName).toBe("Test");
        expect(data.lastName).toBe("Silicate");
        expect(data.email).toBe("test@silicate.com");
        expect(compareSync("mypassword", data.password)).toBeTruthy();
    });

    it("Updates a user successfully.", async () => {
        const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}`, {
            method: "PUT",
            body: JSON.stringify({
                firstName: "Modified",
                lastName: "Silicate",
                email: "mod@silicate.com",
                password: "mypasswordwasmodified"
            }),
            headers: {
                "content-type": "application/json"
            }
        });
        const { success }: ApiResponseWithData<number> = await response.json();

        expect(success).toBeTruthy();
    });

    it("Reads an updated user successfully.", async () => {
        const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}`);
        const { data }: ApiResponseWithData<User> = await response.json();

        expect(data.id).toBe(userId);
        expect(data.firstName).toBe("Modified");
        expect(data.lastName).toBe("Silicate");
        expect(data.email).toBe("mod@silicate.com");
        expect(compareSync("mypasswordwasmodified", data.password)).toBeTruthy();
    });

    it("Deletes a user successfully.", async () => {
        const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}`, {
            method: "DELETE"
        });
        const { success }: ApiResponseWithData<number> = await response.json();

        expect(success).toBeTruthy();
    });

    it("Fails to read a user after it was deleted.", async () => {
        const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}`);
        const { success, message }: ApiResponse = await response.json();

        expect(success).toBeFalsy();
        expect(message).toBe("User not found");
    });
});
