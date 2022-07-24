const mainCalendarStartMonth = 7; // August

const blocks = {
  1: 1,
  2: 2,
  3: 2,
  4: 3,
  5: 3
}

const trackerSpreadsheetsData: GradeDict<TrackerSpreadsheet> = {
  9: new TrackerSpreadsheet(
    "https://docs.google.com/spreadsheets/d/1gzBwpcPMiQvwZeOro2FTUrKnGwoRHP0ixdtyEH85eOg/edit",
    "9th Grade Calendar", 4,
    new CalendarSheet("Pre-Alg/Alg1 (Gamboa)", 3, 2, DateFormat.Date, [4,5,6]), 
    new CalendarSheet("IED", 3, 3, DateFormat.Date, [4,5,6]),
    new CalendarSheet("Physics", 3, 1, DateFormat.WeekBlock, [3,4,5]),
    new CalendarSheet("Alg1 / Stats (Liang)", 3, 1, DateFormat.Date, [4,5]),
    new CalendarSheet("Geometry (Kurczek)", 3, 1, DateFormat.WeekDay, [3,4,5]),
    new CalendarSheet("English 9", 3, 2, DateFormat.Date, [4,5,6,7]),
    new CalendarSheet("Spanish 1", 4, 3, DateFormat.Date, [4,5,6,7]),
    new CalendarSheet("Spanish 1 Native", 4, 3, DateFormat.Date, [4,5,6,7])
  ),
  10: new TrackerSpreadsheet(
    "https://docs.google.com/spreadsheets/d/1XhQqAfjMGV8Q4Mtxbh4wfi8xjbZ3Au3uftDxjt_4498/edit",
    "10th Grade Calendar", 3,
    new CalendarSheet("Algebra 2", 3, 3, DateFormat.Date, [4,5,6]),
    new CalendarSheet("Chemistry", 3, 3, DateFormat.Date, [4,5,6]),
    new CalendarSheet("English 10", 3, 3, DateFormat.Date, [4,5,6]),
    new CalendarSheet("Spanish 2", 3, 3, DateFormat.Date, [4,5,6]),
    new CalendarSheet("Spanish 2 Native", 3, 3, DateFormat.Date, [4,5,6]),
    new CalendarSheet("PBS", 3, 3, DateFormat.Date, [4,5,6]),
    new CalendarSheet("World History", 3, 3, DateFormat.Date, [4,5,6]),
  ),
  11: new TrackerSpreadsheet(
    "https://docs.google.com/spreadsheets/d/1XhQqAfjMGV8Q4Mtxbh4wfi8xjbZ3Au3uftDxjt_4498/edit",
    "11th Grade Calendar", 3,
    new CalendarSheet("English 11", 3, 1, DateFormat.Week, [3,4,5]).overrideColumnTitleRow(5), // TODO
    new CalendarSheet("US History", 6, 2, DateFormat.DateRange, [3,4,5,6]),
    new CalendarSheet("Spanish 3", 4, 1, DateFormat.WeekBlock, [3,4,5]),
    new CalendarSheet("Spanish 4", 4, 1, DateFormat.DateRange, [3,4,5]),
    new CalendarSheet("Biology", 4, 2, DateFormat.WeekBlock, [4,5,6,7]),
    new CalendarSheet("Precalculus", 3, 1, DateFormat.WeekBlock, [3,4,5]),
    new CalendarSheet("HBS", 3, 1, DateFormat.WeekBlock, [3,4,5,6]),
    new CalendarSheet("CEA", 3, 1, DateFormat.WeekBlock, [3,4,5])
  ),
  12: new TrackerSpreadsheet(
    "https://docs.google.com/spreadsheets/d/1XhQqAfjMGV8Q4Mtxbh4wfi8xjbZ3Au3uftDxjt_4498/edit",
    "12th Grade Calendar", 3
  )
};
