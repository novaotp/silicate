
/** A static class for server-side routes. */
class ServerRoute {
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
           * The server-side route to fetch the list of friends of the user with a dynamic id.
           * 
           * Method : `get`
           * @returns {'/friends/:userId'} The server-side endpoint to fetch the list of friends of the user.
           */
          server: () => '/friends/:userId',
          /**
           * The client-side route to fetch the list of friends of the user with a dynamic id.
           * 
           * Method : `get`
           * @param {string} userId The id of the user whose friends are being fetched.
           * @returns {string} The client-side endpoint to fetch the list of friends of the user.
           */
          client: (userId) => `/friends/${userId}`,
        },
        /** Returns a specific friend of the user. */
        read: {
          /**
           * The server-side route to fetch a specific friend of the user with dynamic ids.
           * 
           * Method : `get`
           * @returns {'/friend/:userId/:friendId'} The server-side endpoint to fetch a specific friend of the user.
           */
          server: () => '/friend/:userId/:friendId',
          /**
           * The client-side route to fetch a specific friend of the user with dynamic ids.
           * 
           * Method : `get`
           * @param {string} userId The id of the user whose friend is being fetched.
           * @param {string} friendId The id of the friend to be fetched.
           * @returns {string} The client-side endpoint to fetch a specific friend of the user.
           */
          client: (userId, friendId) => `/friend/${userId}/${friendId}`,
        },
        /** Adds a new friend to the user. */
        add: {
          /**
           * The server-side route to add a friend with dynamic ids.
           * 
           * Method : `post`
           * @returns {'/friend/:userId/:friendId'} The server-side endpoint to add the friend to the user.
           */
          server: () => '/friend/:userId/:friendId',
          /**
           * The client-side route to add a friend with dynamic ids.
           * 
           * Method : `post`
           * @param {string} userId The id of the user from whom the friend is being added.
           * @param {string} friendId The id of the friend to be added.
           * @returns {string} The client-side endpoint to add the friend to the user.
           */
          client: (userId, friendId) => `/friend/${userId}/${friendId}`,
        },
        /** Removes a friend from the user. */
        remove: {
          /**
           * The server-side route to remove a friend from a user with dynamic ids.
           * 
           * Method : `delete`
           * @returns {'/friend/:userId/:friendId'} The server-side endpoint to remove the friend from the user.
           */
          server: () => '/friend/:userId/:friendId',
          /**
           * The client-side route to remove a friend with dynamic ids.
           * 
           * Method : `delete`
           * @param {string} userId The id of the user from whom the friend is being removed.
           * @param {string} friendId The id of the friend to be removed.
           * @returns {string} The client-side endpoint to remove the friend from the user.
           */
          client: (userId, friendId) => `/friend/${userId}/${friendId}`,
        }
      },
      /** Some endpoints related to notes. */
      notes: {
        /** Returns the list of notes associated with the user. */
        readAll: {
          /**
           * The server-side route to fetch all the notes with a dynamic id.
           * 
           * Method : `get`
           * @returns {'/notes/:userId'} The server-side endpoint to fetch all the notes with a dynamic id.
           */
          server: () => '/notes/:userId',
          /**
           * The client-side route to fetch all the notes.
           * 
           * Method : `get`
           * @param {string} userId The id of the user from whom the notes are being fetched.
           * @returns {string} The client-side endpoint to fetch all the notes.
           */
          client: (userId) => `/notes/${userId}`,
        },
        /** Returns a specific note associated with the user. */
        read: {
          /**
           * The server-side route to fetch a specific note.
           * 
           * Method : `get`
           * @returns {'/notes/:userId/:noteId'} The server-side endpoint to fetch a specific note.
           */
          server: () => '/notes/:userId/:noteId',
          /**
           * The client-side route to fetch a specific note with dynamic ids.
           * 
           * Method : `get`
           * @param {string} userId The id of the user from whom the note is being fetched.
           * @param {string} noteId The id of the note to be fetched.
           * @returns {string} The client-side endpoint to fetch a specific note with dynamic ids.
           */
          client: (userId, noteId) => `/notes/${userId}/${noteId}`
        },
        /** Adds a new note to the user. */
        add: {
          /**
           * The server-side route to add a new note with dynamic ids.
           * 
           * Method : `post`
           * @returns {'/notes/:userId/:noteId'} The server-side endpoint to add a new note with dynamic ids.
           */
          server: () => '/notes/:userId/:noteId',
          /**
           * The client-side route to add a new note with dynamic ids.
           * 
           * Method : `post`
           * @param {string} userId The id of the user from whom the note is being added.
           * @param {string} noteId The id of the note to be added.
           * @returns {string} The client-side endpoint to add a new note with dynamic ids.
           */
          client: (userId, noteId) => `/notes/${userId}/${noteId}`
        },
        /** Deletes a note from the user. */
        delete: {
          /**
           * The server-side route to delete a note with dynamic ids.
           * 
           * Method : `delete`
           * @returns {'/notes/:userId/:noteId'} The server-side endpoint to delete a note with dynamic ids.
           */
          server: () => '/notes/:userId/:noteId',
          /**
           * The client-side route to delete a note with dynamic ids.
           * 
           * Method : `delete`
           * @param {string} userId The id of the user from whom the note is being deleted.
           * @param {string} noteId The id of the note to be deleted.
           * @returns {string} The client-side endpoint to delete a note with dynamic ids.
           */
          client: (userId, noteId) => `/notes/${userId}/${noteId}`
        },
        /** Updates a specific note of the user. */
        update: {
          /**
           * The server-side route to update a specific note with dynamic ids.
           * 
           * Method : `put`
           * @returns {'/notes/:userId/:noteId'} The server-side endpoint to update a specific note with dynamic ids.
           */
          server: () => '/notes/:userId/:noteId',
          /**
           * The client-side route to update a specific note with dynamic ids.
           * 
           * Method : `put`
           * @param {string} userId The id of the user from whom the note is being updated.
           * @param {string} noteId The id of the note to be updated.
           * @returns {string} The client-side endpoint to update a specific note with dynamic ids.
           */
          client: (userId, noteId) => `/notes/${userId}/${noteId}`
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
           * @returns {'/account/:userId'} The server-side endpoint to fetch the data of the user.
           */
          server: () => '/account/:userId',
          /**
           * The client-side route to fetch the data of the user.
           * 
           * Method : `get`
           * @param {string} userId The id of the user whose data is being fetched.
           * @returns {string} The client-side endpoint to fetch the data of the user.
           */
          client: (userId) => `/account/${userId}`
        },
        /** Updates the data of the user. */
        update: {
          /**
           * The server-side route to update the data of the user.
           * 
           * Method : `put`
           * @returns {'/account/:userId'} The server-side endpoint to update the data of the user.
           */
          server: () => '/account/:userId',
          /**
           * The client-side route to update the data of the user.
           * 
           * Method : `put`
           * @param {string} userId The id of the user whose data is being updated.
           * @returns {string} The client-side endpoint to update the data of the user.
           */
          client: (userId) => `/account/${userId}`
        },
        /** Deletes the user. */
        delete: {
          /**
           * The server-side route to delete the user.
           * 
           * Method : `delete`
           * @returns {'/account/:userId'} The server-side endpoint to delete the user.
           */
          server: () => '/account/:userId',
          /**
           * The client-side route to delete the user.
           * 
           * Method : `delete`
           * @param {string} userId The id of the user whose data is being deleted.
           * @returns {string} The client-side endpoint to delete the user.
           */
          client: (userId) => `/account/${userId}`
        }
      }
    };
  }
}

export default ServerRoute;
