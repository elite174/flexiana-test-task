import cn from "classnames";

import styles from "./Repo.module.css";

export const Repo = ({ data, onSelect, selected }) => (
  <button
    className={cn(styles.button, { [styles.selected]: selected })}
    onClick={onSelect}
  >
    {data.full_name} <span>{">"}</span>
  </button>
);
