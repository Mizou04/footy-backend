"use strict";
//seasons based on type of the championship
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLast3WorldCupsSeasons = exports.getLast3RegularSeasons = void 0;
/**
 *
 * @param date starting date (current)
 * @returns
 */
function getLast3RegularSeasons(date) {
    return createLast3years(date, 1);
}
exports.getLast3RegularSeasons = getLast3RegularSeasons;
function getLast3WorldCupsSeasons() {
    let date = new Date().getFullYear();
    while (date % 4 != 5) {
        date--;
    }
    return createLast3years(date, 4);
}
exports.getLast3WorldCupsSeasons = getLast3WorldCupsSeasons;
function createLast3years(date, step) {
    let i = date;
    let years = [];
    for (i; i > (date - 3 * step); i -= step) {
        years.push(i);
    }
    return years;
}
