import cn from "classnames";

import { PageButtons } from "../PageButtons";

import styles from "./List.module.css";

export const List = ({
  className,
  Renderer,
  items,
  loading,
  onNext,
  onPrev,
  currentPage,
}) => {
  const hasResults = items?.length > 0;

  return (
    <section
      className={cn(className, styles.container, { [styles.loading]: loading })}
    >
      <p className={styles.fallback}>
        {hasResults ? (
          <>
            Found: <b>{items.length}</b> results
          </>
        ) : (
          <b>No results found</b>
        )}
      </p>
      {hasResults ? (
        <>
          <ul className={styles.list}>
            {items.map((item) => (
              <li className={styles.listItem} key={item.id}>
                <Renderer data={item} />
              </li>
            ))}
          </ul>
          <PageButtons
            onNext={onNext}
            onPrev={onPrev}
            disabled={loading}
            currentPage={currentPage}
          />
        </>
      ) : null}
    </section>
  );
};
