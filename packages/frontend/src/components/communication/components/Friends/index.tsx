
"use client";

// React
import { useState } from 'react';

// Internal
import styles from './index.module.scss';

/** The main component of the friends page. */
const FriendsComponent = (): JSX.Element => {
  const [friendName, setFriendName] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>(['Alice', 'Bob', 'Charlie', 'Dave']);

  const friendsList = ['Alice', 'Bob', 'Charlie', 'Dave'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFriendName(value);

    const newSuggestions = friendsList.filter(
      (name) => name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(newSuggestions);
  };

  const handleFriendRequest = (name: string) => {
    console.log(`Sent a friend request to ${name}`);
  };

  return (
    <div className={styles.friendContainer}>
      <input
        type="text"
        value={friendName}
        onChange={handleInputChange}
        placeholder="Type a friend's name"
      />
      <div className={styles.suggestions}>
        {suggestions.map((name, index) => (
          <div key={index} className={styles.suggestionItem}>
            <span onClick={() => setFriendName(name)}>{name}</span>
            <button onClick={() => handleFriendRequest(name)}>Send Friend Request</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsComponent;
