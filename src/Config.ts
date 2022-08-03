const mainCalendarStartMonth = 7; // August

const blocks: WeekSchedule = {
  [WeekDays.Monday]: 1,
  [WeekDays.Tuesday]: 2,
  [WeekDays.Wednesday]: 2,
  [WeekDays.Thursday]: 3,
  [WeekDays.Friday]: 3
}

const pdWeek: WeekSchedule = {
  [WeekDays.Monday]: 1,
  [WeekDays.Tuesday]: 1,
  [WeekDays.Wednesday]: 2,
  [WeekDays.Thursday]: 2,
  [WeekDays.Friday]: 3
}

const overrideWeeks: {[key: number]: WeekSchedule} = {
  24: pdWeek,
  27: pdWeek
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
    "https://docs.google.com/spreadsheets/d/1a3HkDixva5kksYW017AafwFDnj4RWJJX29tSTiISwh4/edit",
    "11th Grade Calendar", 3,
    new CalendarSheet("English 11", 3, 1, DateFormat.Week, [3,4,5]).overrideHeaders(["Zoom Session 1", "Zoom Session 2", "Zoom Session 3"]), // TODO
    new CalendarSheet("US History", 6, 2, DateFormat.DateRange, [3,4,5,6]),
    new CalendarSheet(" Spanish 3", 4, 1, DateFormat.WeekBlock, [3,4,5]),
    new CalendarSheet("Spanish 4", 4, 1, DateFormat.WeekBlock, [3,4,5]),
    new CalendarSheet("Biology", 4, 2, DateFormat.WeekBlock, [4,5,6,7]),
    new CalendarSheet("Precalculus", 3, 1, DateFormat.WeekBlock, [3,4,5]),
    new CalendarSheet("HBS", 3, 1, DateFormat.WeekBlock, [3,4,5,6]),
    new CalendarSheet("CEA", 3, 1, DateFormat.WeekBlock, [3,4,5])
  ),
  12: new TrackerSpreadsheet(
    "https://docs.google.com/spreadsheets/d/1Jcc5ZnoGg8EVEDdsO47dzJD6b9vpXSMekCdq_mTIRA4/edit",
    "12th Grade Calendar", 3,
    new CalendarSheet("Gov/Econ", 3, 3, DateFormat.DateRange, [4,5,6]),
    new CalendarSheet("English 12", 4, 1, DateFormat.WeekBlock, [3,4,5]),
    new CalendarSheet("Psych", 3, 1, DateFormat.WeekBlock, [3,4,5,6]),
    new CalendarSheet("CCL", 3, 1, DateFormat.WeekBlock, [3,4,5]),
    new CalendarSheet("Adv Calc", 4, 1, DateFormat.WeekDayName, [3,4,5]).setSecondayDateColumn(2),
    new CalendarSheet("Calculus", 4, 1, DateFormat.WeekBlock, [3,4,5]),
    new CalendarSheet("Problem-Solving", 4, 1, DateFormat.WeekBlock, [3,4,5]),
    new CalendarSheet("POE", 3, 3, DateFormat.DateRange, [4,5,6]),
    new CalendarSheet("CSP", 3, 1, DateFormat.WeekBlockOnly, [3,4,5]),
    new CalendarSheet("MI", 4, 1, DateFormat.WeekBlock, [4,5,6]),
    new CalendarSheet("Adv Physics", 3, 1, DateFormat.WeekBlock, [3,4,5]),
    new CalendarSheet("AE", 3, 1, DateFormat.WeekBlock, [4,5,6]),
    new CalendarSheet("CEA Honors(MCG)", 3, 1, DateFormat.WeekBlock, [3,4,5]),
  )
};
