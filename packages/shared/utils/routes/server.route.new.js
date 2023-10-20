
/** A static class for server-side routes. */
class NewServerRoute {
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
      /** Some endpoints related to friends. */
      friends: {
        /** Returns the list of friends of the user. */
        readAll: {
          /**
           * The server-side route to fetch the list of friends of the user.
           * 
           * Method : `get`
           * @returns {'/friends'}
           */
          server: () => '/friends',
          /**
           * The client-side route to fetch the list of friends of the user.
           * 
           * Method : `get`
           * @returns {string}
           */
          client: () => '/friends',
        },
        /** Returns a specific friend of the user. */
        read: {
          /**
           * The server-side route to fetch a specific friend of the user.
           * 
           * Method : `get`
           * @returns {'/friend/:friendId'}
           */
          server: () => '/friend/:friendId',
          /**
           * The client-side route to fetch a specific friend of the user.
           * 
           * Method : `get`
           * @param {string} friendId The id of the friend to be fetched.
           * @returns {string}
           */
          client: (friendId) => `/friend/${friendId}`,
        },
        /** Adds a new friend to the user. */
        add: {
          /**
           * The server-side route to add a friend to the user.
           * 
           * Method : `post`
           * @returns {'/friend/:friendId'}
           */
          server: () => '/friend/:friendId',
          /**
           * The client-side route to add a friend to the user.
           * 
           * Method : `post`
           * @param {string} friendId The id of the friend to be added.
           * @returns {string}
           */
          client: (friendId) => `/friend/${friendId}`,
        },
        /** Deletes a friend from the user. */
        delete: {
          /**
           * The server-side route to delete a friend from a user.
           * 
           * Method : `delete`
           * @returns {'/friend/:friendId'}
           */
          server: () => '/friend/:friendId',
          /**
           * The client-side route to delete a friend.
           * 
           * Method : `delete`
           * @param {string} friendId The id of the friend to be deleted.
           * @returns {string}
           */
          client: (friendId) => `/friend/${friendId}`,
        }
      },
      /** Some endpoints related to notes. */
      notes: {
        /** Returns the list of notes associated with the user. */
        readAll: {
          /**
           * The server-side route to fetch all the notes of the user.
           * 
           * Method : `get`
           * @returns {'/notes'}
           */
          server: () => '/notes',
          /**
           * The client-side route to fetch all the notes of the user.
           * 
           * Method : `get`
           * @returns {string}
           */
          client: () => `/notes`,
        },
        /** Returns a specific note associated with the user. */
        read: {
          /**
           * The server-side route to fetch a specific note of the user.
           * 
           * Method : `get`
           * @returns {'/notes/:noteId'}
           */
          server: () => '/notes/:noteId',
          /**
           * The client-side route to fetch a specific note.
           * 
           * Method : `get`
           * @returns {string}
           */
          client: (noteId) => `/notes/${noteId}`
        },
        /** Adds a new note to the user. */
        add: {
          /**
           * The server-side route to add a new note to the user.
           * 
           * Method : `post`
           * @returns {'/notes'}
           */
          server: () => '/notes',
          /**
           * The client-side route to add a new note to the user.
           * 
           * Method : `post`
           * @returns {'/notes'}
           */
          client: () => '/notes'
        },
        /** Deletes a note from the user. */
        delete: {
          /**
           * The server-side route to delete a note from the user.
           * 
           * Method : `delete`
           * @returns {'/notes/:noteId'}
           */
          server: () => '/notes/:noteId',
          /**
           * The client-side route to delete a note for the user.
           * 
           * Method : `delete`
           * @param {string} noteId The id of the note to be deleted.
           * @returns {string}
           */
          client: (noteId) => `/notes/${noteId}`
        },
        /** Updates a specific note of the user. */
        update: {
          /**
           * The server-side route to update a specific note of the user.
           * 
           * Method : `put`
           * @returns {'/notes/:noteId'}
           */
          server: () => '/notes/:noteId',
          /**
           * The client-side route to update a specific note of the user.
           * 
           * Method : `put`
           * @param {string} noteId The id of the note to be updated.
           * @returns {string}
           */
          client: (noteId) => `/notes/${noteId}`
        }
      },
      /** Some endpoints related to the user's account. */
      account: {
        /** Returns the data of the user. */
        read: {
          /**
           * The server-side route to fetch the data of the user.
           * 
           * Method : `get`
           * @returns {'/account'}
           */
          server: () => '/account',
          /**
           * The client-side route to fetch the data of the user.
           * 
           * Method : `get`
           * @returns {string}
           */
          client: () => '/account'
        },
        /** Updates the data of the user. */
        update: {
          /**
           * The server-side route to update the data of the user.
           * 
           * Method : `put`
           * @returns {'/account'}
           */
          server: () => '/account',
          /**
           * The client-side route to update the data of the user.
           * 
           * Method : `put`
           * @returns {string}
           */
          client: () => '/account'
        },
        /** Deletes the user. */
        delete: {
          /**
           * The server-side route to delete the user.
           * 
           * Method : `delete`
           * @returns {'/account'}
           */
          server: () => '/account',
          /**
           * The client-side route to delete the user.
           * 
           * Method : `delete`
           * @returns {string}
           */
          client: () => '/account'
        }
      }
    };
  }
}

export default NewServerRoute;
