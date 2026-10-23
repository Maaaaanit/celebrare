import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import PhotoCard from './PhotoCard.jsx'
import useFetchPhotos from '../hooks/useFetchPhotos.js'
import favouritesReducer, {
  TOGGLE_FAVOURITE,
} from '../reducers/favouritesReducer.js'

const FAVOURITES_STORAGE_KEY = 'celebrare-favourites'

function loadFavouriteIds() {
  try {
    const savedValue = localStorage.getItem(FAVOURITES_STORAGE_KEY)
    const parsedValue = savedValue ? JSON.parse(savedValue) : []

    return Array.isArray(parsedValue) && parsedValue.every((id) => typeof id === 'string')
      ? parsedValue
      : []
  } catch {
    return []
  }
}

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [searchQuery, setSearchQuery] = useState('')
  const [favouriteIds, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    loadFavouriteIds,
  )

  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return photos
    }

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(normalizedQuery),
    )
  }, [photos, searchQuery])

  useEffect(() => {
    try {
      localStorage.setItem(
        FAVOURITES_STORAGE_KEY,
        JSON.stringify(favouriteIds),
      )
    } catch {
      // Storage can be unavailable in restricted browser contexts.
    }
  }, [favouriteIds])

  function handleToggleFavourite(photoId) {
    dispatch({ type: TOGGLE_FAVOURITE, photoId })
  }

  return (
    <section className="mx-auto max-w-7xl" aria-labelledby="gallery-title">
      <header className="mb-8 border-b border-slate-200 pb-7 sm:mb-10 sm:pb-8">
        <h1
          id="gallery-title"
          className="font-serif text-4xl font-medium leading-tight text-slate-950 sm:text-5xl"
        >
          Photo Gallery
        </h1>
        <p className="mt-2 text-base text-slate-600">
          A collection of photographs from the Picsum community.
        </p>
        <label className="mt-7 block max-w-xl">
          <span className="sr-only">Search by author name</span>
          <span className="relative block">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500"
            >
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path strokeLinecap="round" d="m16 16 4.5 4.5" />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by author name..."
              className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-500 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
            />
          </span>
        </label>
      </header>

      {loading && (
        <div
          role="status"
          className="flex min-h-56 flex-col items-center justify-center gap-4 text-slate-600"
        >
          <span
            aria-hidden="true"
            className="size-9 animate-spin rounded-full border-4 border-emerald-700 border-r-transparent"
          />
          <p>Loading photos...</p>
        </div>
      )}

      {!loading && error && (
        <p
          role="alert"
          className="rounded-lg border border-rose-200 bg-rose-50 px-5 py-4 text-rose-800"
        >
          We couldn&apos;t load the photos. {error}
        </p>
      )}

      {!loading && !error && filteredPhotos.length === 0 && (
        <p className="py-12 text-center text-slate-600">
          No photos found matching your search.
        </p>
      )}

      {!loading && !error && filteredPhotos.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favouriteIds.includes(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Gallery