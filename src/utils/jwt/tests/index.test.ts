
import { sign, verify } from "..";

it("signs some data and has the same content after verification", async () => {
    const payload = { foo: "bar" };
    const token = await sign(payload);
    const payload2 = (await verify(token)).payload;
    expect(payload).toEqual(payload2);
});
