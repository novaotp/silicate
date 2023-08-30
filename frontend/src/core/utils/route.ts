const route = {
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

export default route;