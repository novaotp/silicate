export default class ClientRoute {
  /** Returns a client route object */
  static object() {
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
          book: (id) => ({
            use: () => `/app/gradebooks/${id}`,
            subject: (subject) => ({
              use: () => `/app/gradebooks/${id}/${subject}`
            })
          }),
        },
        notes: {
          use: () => '/app/notes',
          note: (id) => ({
            use: () => `/app/notes/${id}`
          })
        }
      }
    };
  }

  static parent() {};
  /**
   * Returns the parent link
   * @param {string} href 
   * @returns {string} The parent link
   */
  static parent(href) {
    return href.split("/").slice(0, -1).join("/");
  }
}