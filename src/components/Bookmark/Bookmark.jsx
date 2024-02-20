import React, { useEffect } from "react";
import "./Bookmark.css";
import { useDispatch, useSelector } from "react-redux";
import { getFormattedDate } from "../../helper/Utility";
import { BsBookmarkXFill } from "react-icons/bs";
import { removeBookmark, setBookmark } from "../../redux/actions";
import { BookmarkLocalStorage } from "../../storage/localStorage";

function Bookmark() {
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.pdfViewerReducer);

  useEffect(() => {
    const bookmarks = BookmarkLocalStorage.getBookmarksLocalStorage();
    if (bookmarks && JSON.parse(bookmarks).length)
      dispatch(setBookmark(JSON.parse(bookmarks)));
  }, []);

  useEffect(() => {
    BookmarkLocalStorage.setBookmarkLocalStorage(bookmarks);
  }, [bookmarks]);

  return (
    <div
      className="bookmark"
      style={{ display: bookmarks.length ? "flex" : "none" }}
    >
      <div className="bookmark__header">
        <h3 className="bookmark__title">
          Bookmark{" "}
          {bookmarks.length ? (
            <span className="bookmark__badge">({bookmarks.length})</span>
          ) : null}
        </h3>
      </div>
      {bookmarks.length
        ? bookmarks.map((bookmark, index) => {
            return <BookmarkCard key={index} bookmark={bookmark} />;
          })
        : null}
    </div>
  );
}

const BookmarkCard = ({ bookmark }) => {
  const dispatch = useDispatch();

  /**
   * @author Lovesh Singh.
   * @since 20-02-2024
   * @description to remove bookmark.
   */
  const onPressRemoveBookmark = () => {
    dispatch(removeBookmark(bookmark));
  };

  return (
    <div className="bookmark__card">
      <div className="bookmark__detail-wrapper">
        <p className="bookmark__card-title">Page {bookmark?.pageNo}</p>
        <p className="bookmark__card-date">
          {getFormattedDate(bookmark?.createdAt, "DD MMM YY")}
        </p>
      </div>
      <i onClick={onPressRemoveBookmark} className="bookmark__remove-icon">
        <BsBookmarkXFill />
      </i>
    </div>
  );
};

export default Bookmark;
