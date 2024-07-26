import { Preferences } from "@capacitor/preferences";

type GetPreferenceOptions = {
    parse?: boolean
}

/** 
 * A convenient helper to get a preference with type inference.
 * @param key The key of the KV.
 */
export async function getPreference<T>(key: string, { parse }: GetPreferenceOptions = { parse: true }): Promise<T> {
    const preference = await Preferences.get({ key });

    if (!parse) {
        return preference.value as T;
    }

    return JSON.parse(preference.value!) as T;
}
