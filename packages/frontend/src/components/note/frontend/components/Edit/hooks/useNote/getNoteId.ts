
import { usePathname } from "next/navigation";

/** Returns the note id from the url casted as an int. */
const getNoteId = (): number => {
  return Number(usePathname().split('/').pop()!);
}

export default getNoteId;
