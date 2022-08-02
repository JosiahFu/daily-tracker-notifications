const date_today = new Date();
const date_tomorrow = new Date();

date_tomorrow.setDate(date_today.getDate()+1);

const _testing = true;
if (_testing) {
  console.warn("Test mode is currently on");
  date_today.setMonth(7),
  date_today.setDate(23);
  date_today.setFullYear(2021);
}

function checkNull<T>(value: T | null, message: string = "A library returned null where it was not supposed to"): T {
  if (value == null) {
    console.trace(message);
    throw new Error(message);
  }
  return value;
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const timeSpreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1cn8dF4paE3l77010T0-aaAVNn14uW40RU8hwWL4N1_Y/edit");

enum DateFormat {
  Date = "DATE",
  DateRange = "DATE_RANGE",
  Week = "WEEK",
  WeekBlock = "WEEK_BLOCK",
  WeekBlockOnly = "WEEK_BLOCK_ONLY",
  WeekDay = "WEEK_DAY",
  WeekDayName = "WEEK_DAY_NAME"
}

enum WeekDays {
  Monday = "MONDAY",
  Tuesday = "TUESDAY",
  Wednesday = "WEDNESDAY",
  Thursday = "THURSDAY",
  Friday = "FRIDAY"
}

type CalendarContents = {[key: string]: GoogleAppsScript.Spreadsheet.Range};
type TrackerContents = {[key: string]: CalendarContents};
type Grade = 9 | 10 | 11 | 12;
type TargetDay = "today" | "tomorrow";

type GradeDict<T> = {[key in Grade]: T};
type WeekSchedule = {[key in WeekDays]: number};

class CalendarSheet {
  name: string;
  headerRowCount: number;
  headers?: string[];
  columnTitleRow: number
  dateColumn: number;
  secondayDateColumn?: number;
  dateFormat: DateFormat;
  infoColumns: number[];
  sheet: GoogleAppsScript.Spreadsheet.Sheet;

  constructor(name: string, headerRowCount: number, dateColumn: number, dateFormat: DateFormat, infoColumns: number[]) {
    this.name = name;
    this.headerRowCount = headerRowCount;
    this.columnTitleRow = headerRowCount;
    this.dateColumn = dateColumn;
    this.dateFormat = dateFormat;
    this.infoColumns = infoColumns;
  }
  
  overrideColumnTitleRow(row: number): CalendarSheet {
    this.columnTitleRow = row;
    return this;
  }
  
  overrideHeaders(headers: string[]): CalendarSheet {
    this.headers = headers;
    return this;
  }
  
  setSecondayDateColumn(column: number): CalendarSheet {
    this.secondayDateColumn = column;
    return this;
  }

  findSheet(spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet): void {
    this.sheet = checkNull(spreadsheet.getSheetByName(this.name), "Could not find sheet \"" + this.name + "\", check name spelling");
  }
}

class TrackerSpreadsheet {
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  mainName: string;
  mainHeaderRows: number;
  mainSheet: GoogleAppsScript.Spreadsheet.Sheet;
  subjects: CalendarSheet[];

  constructor(url: string, mainName: string, mainHeaderRows: number, ...subjects: CalendarSheet[]) {
    this.spreadsheet = checkNull(SpreadsheetApp.openByUrl(url), "Could not find spreadsheet (which contains \"" + mainName + "\"), check URL");
    this.mainName = mainName;
    this.mainSheet = checkNull(this.spreadsheet.getSheetByName(mainName), "Could not find sheet \"" + mainName + "\", check name spelling");
    this.mainHeaderRows = mainHeaderRows;
    this.subjects = subjects;
    for (let i of this.subjects)
      i.findSheet(this.spreadsheet);
  }
}

const timeSheetNames: {[key in TargetDay]: GradeDict<string>} = {
  today: {
    9: "Today9",
    10: "Today10",
    11: "Today11",
    12: "Today12"
  },
  tomorrow: {
    9: "Tomorrow9",
    10: "Tomorrow10",
    11: "Tomorrow11",
    12: "Tomorrow12"
  }
};

let timeSheetsBuilder: {[key in TargetDay]?: {[key in Grade]?: GoogleAppsScript.Spreadsheet.Sheet}} = {};
for (let day in timeSheetNames) {
  let dayTyped = <TargetDay>day;
  let dayObject: {[key in Grade]?: GoogleAppsScript.Spreadsheet.Sheet} = timeSheetsBuilder[dayTyped] = {};
  for (let grade in timeSheetNames[<TargetDay>day]) {
    let gradeTyped = parseInt(grade) as Grade;
    dayObject[gradeTyped] = checkNull(timeSpreadsheet.getSheetByName(timeSheetNames[dayTyped][gradeTyped]), "Could not find time sheet " + timeSheetNames[dayTyped][gradeTyped]);
  }
}

const timeSheets = timeSheetsBuilder as {[key in TargetDay]: GradeDict<GoogleAppsScript.Spreadsheet.Sheet>};

const signupSheetHeight = 100; 

const timeColumns = {
  midnight: 1,
  morning: 2,
  noon: 3,
  afternoon: 4,
  evening: 5
}

const style = `
/*@import url('https://fonts.googleapis.com/css2?family=Asap+Condensed&display=swap');

body {
    font-family: 'Asap Condensed', sans-serif;
}*/

.missing {
    color: gray;
}

.container {
    width: 100%;
    position: relative;
    column-count: auto;
    column-width: 250px;
    column-gap: 10px;
}

.block {
    background-color: gainsboro;
    padding: 10px;
    /*width: 250px;*/
    width: 100%;
    margin-bottom: 10px;
    box-sizing: border-box;
    display: inline-block;
    border-radius: 10px;
}

h1 {
    text-align: center;
}

h2 {
    margin-top: 0;
}

.link {
    display: none;
}
`
