import { Store } from "@tauri-apps/plugin-store";

/** A tauri native KV store. */
export const kv = new Store('store.bin');
