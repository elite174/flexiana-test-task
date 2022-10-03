import styles from "./PageButtons.module.css";

export const PageButtons = ({ currentPage, disabled, onNext, onPrev }) => (
  <div className={styles.buttonRow}>
    <button disabled={disabled || !Boolean(onPrev)} onClick={onPrev}>
      Prev
    </button>
    <p>
      Current page: <b>{currentPage}</b>
    </p>
    <button disabled={disabled || !Boolean(onNext)} onClick={onNext}>
      Next
    </button>
  </div>
);
