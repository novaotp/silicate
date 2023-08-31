import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export default class Route {
  private static router = useRouter();

  /** Use the route object instead */
  public static object(): Object {
    return {
      use: () => '/',
      auth: {
        use: () => '/auth',
        login: {
          use: () => '/auth/log-in',
        },
        signup: {
          use: () => '/auth/sign-up',
        },
        logout: {
          use: () => '/auth/log-out',
        }
      },
      app: {
        use: () => '/app',
        dashboard: {
          use: () => '/app/dashboard',
        },
        gradebooks: {
          use: () => '/app/gradebooks',
          book: (id: string) => ({
            use: () => `/app/gradebooks/${id}`,
            subject: (subject: string) => ({
              use: () => `/app/gradebooks/${id}/${subject}`
            })
          }),
        },
        notes: {
          use: () => '/app/notes',
          note: (id: string) => ({
            use: () => `/app/notes/${id}`
          })
        }
      }
    };
  }

  public static current() {
    return usePathname();
  }

  public static parent() {
    const currentPath = this.current();
    const parent = currentPath.split("/").slice(0, -1).join("/");

    return parent;
  }

  public static sendTo(href: string) {
    this.router.push(href);
  }
}

/**
 * Shorthand for Route.object()
 */
export const route: Object = Route.object();