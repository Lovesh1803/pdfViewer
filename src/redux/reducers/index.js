import {combineReducers} from 'redux';
import PdfViewerReducer from './pdfViewerReducer';

/**
 * @author Lovesh Singh
 * @since 20-02-2024
 * @description appReducer: to combine all reducers
 */
const AppReducers = combineReducers({
  pdfViewerReducer: PdfViewerReducer,
});

export default AppReducers;
