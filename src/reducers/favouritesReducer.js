export const TOGGLE_FAVOURITE = 'TOGGLE_FAVOURITE'

function favouritesReducer(favouriteIds, action) {
  switch (action.type) {
    case TOGGLE_FAVOURITE:
      return favouriteIds.includes(action.photoId)
        ? favouriteIds.filter((photoId) => photoId !== action.photoId)
        : [...favouriteIds, action.photoId]
    default:
      return favouriteIds
  }
}

export default favouritesReducer