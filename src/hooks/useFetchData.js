import { useEffect, useState } from "react";

import { fetchData } from "../api";

import { EMPTY_LINK } from "../constants";

export const useFetchData = (store, kind, updateStore) => {
  const [isPendingRequest, setPendingRequest] = useState(false);

  const currentLink = store[kind].link;

  useEffect(() => {
    const abortController = new AbortController();

    const getData = async () => {
      if (currentLink) {
        setPendingRequest(true);

        let data = null;

        try {
          data = await fetchData({
            url: currentLink,
            abortSignal: abortController.signal,
          });
        } catch {
          updateStore({
            [kind]: {
              data: null,
              link: EMPTY_LINK,
              nextLink: EMPTY_LINK,
              prevLink: EMPTY_LINK,
            },
          });

          return;
        } finally {
          setPendingRequest(false);
        }

        if (data) {
          updateStore((currentState) => ({
            [kind]: {
              data: data.data,
              link: currentState[kind].link,
              nextLink: data.nextLink,
              prevLink: data.prevLink,
            },
          }));
        }
      }
    };

    getData();

    return () => {
      abortController.abort();
    };
  }, [kind, currentLink, updateStore]);

  return isPendingRequest;
};
