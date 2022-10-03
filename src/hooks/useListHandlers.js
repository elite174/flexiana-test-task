import { EMPTY_LINK } from "../constants";

export const useListHandlers = ({ store, kind, updateStore }) => {
  const getHandler = (propName) =>
    store[kind][propName]
      ? () =>
          updateStore((currentState) => ({
            [kind]: {
              data: currentState[kind].data,
              link: store[kind][propName],
              nextLink: EMPTY_LINK,
              prevLink: EMPTY_LINK,
            },
          }))
      : undefined;

  return {
    onNext: getHandler("nextLink"),
    onPrev: getHandler("prevLink"),
  };
};
