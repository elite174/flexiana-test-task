import { useState, useCallback } from "react";

import { DEFAULT_LIST, EMPTY_LINK, INITIAL_PAGE } from "../constants";

const EMPTY_QUERY = "";

const getPageFromLink = (link) =>
  link
    ? Number(new URL(link).searchParams.get("page") ?? INITIAL_PAGE)
    : INITIAL_PAGE;

export const useStore = () => {
  const [state, setState] = useState({
    searchQuery: EMPTY_QUERY,
    selectedRepoId: null,
    repos: {
      data: null,
      link: EMPTY_LINK,
      nextLink: EMPTY_LINK,
      prevLink: EMPTY_LINK,
    },
    users: {
      data: null,
      link: EMPTY_LINK,
      nextLink: EMPTY_LINK,
      prevLink: EMPTY_LINK,
    },
  });

  const updateStore = useCallback(
    (patch) =>
      setState((currentState) => ({
        ...currentState,
        ...(typeof patch === "function" ? patch(currentState) : patch),
      })),
    []
  );

  return {
    store: state,
    getters: {
      repos: {
        items: state.repos.data?.items ?? DEFAULT_LIST,
        page: getPageFromLink(state.repos.link),
      },
      users: {
        items: state.users.data ?? DEFAULT_LIST,
        page: getPageFromLink(state.users.link),
      },
    },
    api: {
      updateStore,
    },
  };
};
