import {
  ADD_BOOKMARKS,
  REMOVE_BOOKMARKS,
  SET_BOOKMARKS,
} from "../../actions/types";

/**
 * @author Lovesh Singh
 * @since 20-02-2024
 * @description initial states of pdf viewer reducer
 */
const INITIAL_STATE = {
  bookmarks: [],
};

/**
 * @author Lovesh Singh
 * @since 20-02-2024
 * @description to handle pdf viewer reducer
 */
const PdfViewerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_BOOKMARKS: {
      return {
        ...state,
        bookmarks: action.payload,
      };
    }
    case ADD_BOOKMARKS: {
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
      };
    }
    case REMOVE_BOOKMARKS: {
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark?.pageNo !== action.payload.pageNo
        ),
      };
    }

    default: {
      return state;
    }
  }
};

export default PdfViewerReducer;
