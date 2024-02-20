import { ADD_BOOKMARKS, REMOVE_BOOKMARKS, SET_BOOKMARKS } from "./types";

/**
 * @author Lovesh Singh
 * @since 20-02-2024
 * @description to set bookmarks
 */
export const setBookmark = (data) => ({
  type: SET_BOOKMARKS,
  payload: data,
});

/**
 * @author Lovesh Singh
 * @since 20-02-2024
 * @description to add bookmarks
 */
export const addBookmark = (data) => ({
  type: ADD_BOOKMARKS,
  payload: data,
});

/**
 * @author Lovesh Singh
 * @since 20-02-2024
 * @description to remove bookmarks
 */
export const removeBookmark = (data) => ({
  type: REMOVE_BOOKMARKS,
  payload: data,
});
