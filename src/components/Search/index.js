import { useState } from "react";
import cn from "classnames";

import styles from "./Search.module.css";

export const Search = ({ onQuery, disabled, className }) => {
  const [value, setValue] = useState("");

  const handleButtonClick = () => onQuery?.(value);

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      onQuery?.(value);
    }
  };

  return (
    <form className={cn(styles.container, className)}>
      <label className={styles.label}>
        <span>Search for repos</span>
        <input
          type="search"
          value={value}
          disabled={disabled}
          placeholder="Type repo query"
          onChange={(e) => setValue(e.currentTarget.value)}
          onKeyDown={handleInputKeyDown}
        />
      </label>
      <button
        className={styles.button}
        type="button"
        disabled={disabled}
        onClick={handleButtonClick}
      >
        Search
      </button>
    </form>
  );
};
