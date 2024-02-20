import { StorageConstant } from ".";

const setBookmarkLocalStorage = async (bookmarks) => {
  await localStorage.setItem(
    StorageConstant.BOOKMARKS,
    JSON.stringify(bookmarks)
  );
};

const getBookmarksLocalStorage = () => {
  return localStorage.getItem(StorageConstant.BOOKMARKS);
};

export const BookmarkLocalStorage = {
  getBookmarksLocalStorage,
  setBookmarkLocalStorage,
};
