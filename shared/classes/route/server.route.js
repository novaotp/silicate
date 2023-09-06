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
      }
    };
  }
}