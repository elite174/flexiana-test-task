import { useMemo } from "react";

import { List } from "./components/List";
import { Search } from "./components/Search";
import { User } from "./components/User";
import { Repo } from "./components/Repo";

import { useFetchData } from "./hooks/useFetchData";
import { useListHandlers } from "./hooks/useListHandlers";

import { useStore } from "./store";

import { makeRepositoriesLink } from "./api";

import { EMPTY_LINK } from "./constants";

import styles from "./App.module.css";

const App = () => {
  const {
    store,
    api: { updateStore },
    getters,
  } = useStore();

  // fetching the data is an effect
  // which depends on store links
  const isReposPendingRequest = useFetchData(store, "repos", updateStore);
  const isUsersPendingRequest = useFetchData(store, "users", updateStore);

  const handleSearchQuery = (query) =>
    updateStore((currentState) => ({
      repos: {
        data: currentState.repos.data,
        link: makeRepositoriesLink(query),
        nextLink: EMPTY_LINK,
        prevLink: EMPTY_LINK,
      },
    }));

  const reposHandlers = useListHandlers({
    store,
    kind: "repos",
    updateStore,
  });

  const usersHandlers = useListHandlers({
    store,
    kind: "users",
    updateStore,
  });

  // I decided to leave RepoRenderer here instead of moving it to containers folder
  // If I made it as a container it would require context support
  // So I decided to make it simple
  const RepoRenderer = useMemo(
    () =>
      ({ data }) => {
        const isRepoSelected = store.selectedRepoId === data.id;

        const handleRepoSelect = () =>
          updateStore((currentState) => ({
            selectedRepoId: data.id,
            users: {
              data: currentState.users.data,
              link: data.contributors_url,
              prevLink: EMPTY_LINK,
              nextLink: EMPTY_LINK,
            },
          }));

        return (
          <Repo
            data={data}
            selected={isRepoSelected}
            onSelect={handleRepoSelect}
          />
        );
      },
    [store.selectedRepoId, updateStore]
  );

  return (
    <main className={styles.container}>
      <Search
        className={styles.searchSection}
        disabled={isReposPendingRequest}
        onQuery={handleSearchQuery}
      />
      <List
        {...reposHandlers}
        loading={isReposPendingRequest}
        currentPage={getters.repos.page}
        className={styles.reposSection}
        Renderer={RepoRenderer}
        items={getters.repos.items}
      />
      <List
        {...usersHandlers}
        loading={isUsersPendingRequest}
        className={styles.usersSection}
        currentPage={getters.users.page}
        Renderer={User}
        items={getters.users.items}
      />
    </main>
  );
};

export default App;
