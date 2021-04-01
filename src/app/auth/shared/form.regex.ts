// Regular expression to deal with names. Only letters and spaces are allowed.
export const REGEX_NAME = /^[a-zA-Z ]{3,30}$/;
export const REGEX_PHONE = /(\(\d{3}\)[.-]?|\d{3}[.-]?)?\d{3}[.-]?\d{4}/;