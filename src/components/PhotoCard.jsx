function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  const buttonLabel = isFavourite
    ? 'Remove from favourites'
    : 'Add to favourites'

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-md">
      <img
        src={photo.download_url}
        alt={`Photograph by ${photo.author}`}
        width={photo.width}
        height={photo.height}
        loading="lazy"
        className="aspect-[4/3] w-full object-cover"
      />
      <div className="flex min-h-16 items-center justify-between gap-3 px-4 py-2">
        <p className="min-w-0 truncate text-sm font-medium text-slate-800">
          {photo.author}
        </p>
        <button
          type="button"
          aria-label={buttonLabel}
          aria-pressed={isFavourite}
          onClick={() => onToggleFavourite(photo.id)}
          className={`grid size-11 shrink-0 place-items-center rounded-full transition-colors hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
            isFavourite ? 'text-rose-600' : 'text-slate-500'
          }`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.8 8.8c0 4.2-8.8 10-8.8 10s-8.8-5.8-8.8-10a4.7 4.7 0 0 1 8.8-2.3 4.7 4.7 0 0 1 8.8 2.3Z"
            />
          </svg>
        </button>
      </div>
    </article>
  )
}

export default PhotoCard