# Flexiana test task

Stack - React, CSS-modules

This app allows to search for repositories and explore contributors of some specific repository.

## Project structure

- _api_ - this folder contains all the information related to requests and backend endpoints
- _components_ - this folder contains simple UI components
- _hooks_ - this folder contains several app hooks
- _store_ - this folder contains data model which is used in the app

## Possible improvements

I supported direct data flow when effects are triggered by state updates.
React uses VDOM approach and that's why there are unnecessary components rerenders.
It is possible to get rid of all rerenders and unnecessary things like "useCallback" just by using SolidJS :)
