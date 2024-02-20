/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
import moment from "moment";

export const getFormattedDate = (date, format) => {
  return moment(date).format(format);
};

export const getFileNameFromUrl = (url) => {
  if (url) {
    let filename = url.substring(
      url.lastIndexOf("/") + 1,
      url.lastIndexOf(".")
    );
    return filename;
  }
  return "";
};
