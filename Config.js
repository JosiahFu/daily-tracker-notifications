const mainCalendarStartMonth = 7; // August

const blocks = {
  1: 1,
  2: 2,
  3: 2,
  4: 3,
  5: 3
}

const trackerSpreadsheetsData = {
  9: new TrackerSpreadsheet(
    "https://docs.google.com/spreadsheets/d/1gzBwpcPMiQvwZeOro2FTUrKnGwoRHP0ixdtyEH85eOg/edit",
    new CalendarSheet("9th Grade Calendar", 4),
    new CalendarSheet("Pre-Alg/Alg1 (Gamboa)", 3, 2, dateFormat.date, [4,5,6]), 
    new CalendarSheet("IED", 3, 3, dateFormat.date, [4,5,6]),
    new CalendarSheet("Physics", 3, 1, dateFormat.week_block, [3,4,5]),
    new CalendarSheet("Alg1 / Stats (Liang)", 3, 1, dateFormat.date, [4,5]),
    new CalendarSheet("Geometry (Kurczek)", 3, 1, dateFormat.week_day, [3,4,5]),
    new CalendarSheet("English 9", 3, 2, dateFormat.date, [4,5,6,7]),
    new CalendarSheet("Spanish 1", 4, 3, dateFormat.date, [4,5,6,7]),
    new CalendarSheet("Spanish 1 Native", 4, 3, dateFormat.date, [4,5,6,7])
  ),
  10: new TrackerSpreadsheet(
    "https://docs.google.com/spreadsheets/d/1XhQqAfjMGV8Q4Mtxbh4wfi8xjbZ3Au3uftDxjt_4498/edit",
    new CalendarSheet("10th Grade Calendar", 3),
    new CalendarSheet("Algebra 2", 3, 3, dateFormat.date, [4,5,6]),
    new CalendarSheet("Chemistry", 3, 3, dateFormat.date, [4,5,6]),
    new CalendarSheet("English 10", 3, 3, dateFormat.date, [4,5,6]),
    new CalendarSheet("Spanish 2", 3, 3, dateFormat.date, [4,5,6]),
    new CalendarSheet("Spanish 2 Native", 3, 3, dateFormat.date, [4,5,6]),
    new CalendarSheet("PBS", 3, 3, dateFormat.date, [4,5,6]),
    new CalendarSheet("World History", 3, 3, dateFormat.date, [4,5,6]),
  ),
  11: new TrackerSpreadsheet(
    "https://docs.google.com/spreadsheets/d/1XhQqAfjMGV8Q4Mtxbh4wfi8xjbZ3Au3uftDxjt_4498/edit",
    new CalendarSheet("11th Grade Calendar", 3),
    new CalendarSheet("English 11", 3, 1, dateFormat.week, [3,4,5]).overrideHeaderRow(5),
    new CalendarSheet("US History", 6, 2, dateFormat.date_range, [3,4,5,6]),
    new CalendarSheet("Spanish 3", 4, 1, dateFormat.week_block, [3,4,5]),
    new CalendarSheet("Spanish 4", 4, 1, dateFormat.date_range, [3,4,5]),
    new CalendarSheet("Biology", 4,  )
  ),
  12: SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1XhQqAfjMGV8Q4Mtxbh4wfi8xjbZ3Au3uftDxjt_4498/edit")
};

// for (let i of Object.values(trackerSpreadsheetsData)) {
//   console.log(i);
//   i.findSheets();
// }

trackerSpreadsheetsData[9].findSheets();
trackerSpreadsheetsData[10].findSheets()
