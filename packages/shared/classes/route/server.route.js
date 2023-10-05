export default class ServerRoute {
  /** Returns a server route object */
  static object() {
    return {
      use: () => '/',
      auth: {
        use: () => '/auth',
        login: {
          use: () => '/auth/login',
        },
        signup: {
          use: () => '/auth/signup'
        },
        logout: {
          use: () => '/auth/logout'
        },
        verifyToken: {
          use: () => '/auth/verifytoken'
        }
      },
      friends: {
        use: () => '/friends',
        add: {
          use: () => '/friends/add'
        },
        remove: {
          use: () => '/friends/remove'
        }
      },
      notes: {
        /** Read all notes */
        use: () => '/notes',
        /** Add a note and returns the id */
        add: {
          use: () => '/notes/add'
        },
        /** Delete a note */
        delete: {
          use: () => '/notes/delete'
        },
        /** Update a note */
        update: {
          use: () => `/notes/update`
        },
        /** Returns a specific note's data */
        read: {
          use: () => `/notes/read`
        }
      },
      account: {
        /** Returns the user's data. */
        use: () => '/account/data'
      }
    };
  }
}