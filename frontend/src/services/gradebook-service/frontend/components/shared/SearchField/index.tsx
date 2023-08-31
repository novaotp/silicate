'use client';

// MUI Icons
import SearchIcon from '@mui/icons-material/Search';

// React
import React, { SetStateAction } from 'react';

// Internal
import styles from './index.module.css';

interface SearchFieldProps {
  filter: string;
  setFilter: React.Dispatch<SetStateAction<string>>;
}

export default function SearchField({ filter, setFilter }: SearchFieldProps) {
  return (
    <div className={styles.field}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className={styles.icon}>
        <SearchIcon />
      </div>
    </div>
  )
};
