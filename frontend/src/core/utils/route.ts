import ClientRoute from "@shared/utils/route/client.route";
import { usePathname } from "next/navigation";

/**
 * This object is only usable in client components.
 * 
 * See {@link ClientRoute} to access it in server components.
 */
export default class SuperClientRoute extends ClientRoute {
  /** Returns the parent link */
  public static override parent(): string {
    return usePathname().split("/").slice(0, -1).join("/");
  }

  /** Add a new string to the current path */
  public static addToPath(id: string): string {
    return `${usePathname()}/${id}`;
  }
}