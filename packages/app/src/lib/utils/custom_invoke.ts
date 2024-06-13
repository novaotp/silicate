import { invoke as tauri_invoke, type InvokeArgs, type InvokeOptions } from "@tauri-apps/api/core";

/** A custom invoke implementation with parsing. Make sure the actual invoke returns a string. */
export async function invoke<T>(cmd: string, args?: InvokeArgs | undefined, options?: InvokeOptions | undefined): Promise<T> {
    const response = await tauri_invoke<string>(cmd, args, options);
    return JSON.parse(response);
}
