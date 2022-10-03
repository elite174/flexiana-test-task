import { EMPTY_LINK } from "../constants";

const ENDPOINT = "https://api.github.com/search";

const HEADERS = {
  Accept: "application/vnd.github+json",
  Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
};

const NEXT_LINK_REGEXP = /<([^>]*)>;\srel="next"/;
const PREV_LINK_REGEXP = /<([^>]*)>;\srel="prev"/;

export const makeRepositoriesLink = (query) =>
  `${ENDPOINT}/repositories?${new URLSearchParams({
    q: query,
  }).toString()}`;

export const fetchData = async ({ url, abortSignal }) => {
  let nextLink = EMPTY_LINK;
  let prevLink = EMPTY_LINK;

  return fetch(url, {
    headers: HEADERS,
    signal: abortSignal,
  })
    .then((response) => {
      const linkHeader = response.headers.get("link");

      if (linkHeader) {
        nextLink = linkHeader.match(NEXT_LINK_REGEXP)?.[1];
        prevLink = linkHeader.match(PREV_LINK_REGEXP)?.[1];
      }

      return response.json();
    })
    .then((data) => ({ nextLink, prevLink, data }));
};
