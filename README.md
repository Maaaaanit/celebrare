# Celebrare Photo Gallery

A responsive photo gallery that loads 30 photographs from Picsum Photos, filters by photographer, and saves favourites between visits.

## Technologies

- React with JavaScript and JSX
- Vite
- Tailwind CSS v4
- Browser `fetch`, React hooks, and `localStorage`

## Features

- Fetches and displays 30 real Picsum Photos images in a responsive 1/2/4-column grid.
- Shows loading and request error states.
- Filters loaded photos by author as you type, without another request.
- Toggles favourites with a pure `useReducer` reducer.
- Restores and saves favourite photo IDs with `localStorage`.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```sh
npm run build
```

## Implementation notes

`useFetchPhotos` requests the API once when its component mounts and returns `photos`, `loading`, and `error`. It checks the HTTP status, reports request or JSON errors, and aborts an unfinished request during cleanup.

The favourites reducer adds or removes photo IDs without mutating the previous array. A reducer initializer safely restores saved IDs; an effect writes changes to `localStorage` under `celebrare-favourites`.

`useCallback` keeps the search handler's function reference stable while its dependencies are unchanged. `useMemo` reuses the author-filtered list until the fetched photos or search query changes. Search only filters data already in memory.

## Photos API

`https://picsum.photos/v2/list?limit=30`