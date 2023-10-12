
class ClientRoute {
  /** Returns a client route object */
  static object() {
    return {
      use: () => '/',
      features: {
        use: () => '/features'
      },
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
      account: {
        use: () => '/account',
        profile: {
          use: () => '/account/profile',
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
          note: {
            use: () => '/app/note',
            edit: (title) => ({
              use: () => `/app/note/${title}`
            })
          },
        },
        friends: {
          use: () => '/app/friends',
        },
        chat: {
          use: () => '/app/chat',
        },
      }
    };
  }

  /**
   * Returns the parent link.
   * @param {string} href The href to parse
   * @returns {string} The parent link
   */
  static parent(href) {
    return href.split("/").slice(0, -1).join("/");
  }
}

export default ClientRoute;
