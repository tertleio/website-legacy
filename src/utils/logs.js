const Reset = '\x1b[0m';
const Red = '\x1b[31m';
const Green = '\x1b[32m';
const Yellow = '\x1b[33m';

const ylw = (str) => Yellow + str + Reset;
const grn = (str) => Green + str + Reset;

module.exports = { ylw, grn };
