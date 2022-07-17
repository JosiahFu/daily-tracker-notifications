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

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const timeSpreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1cn8dF4paE3l77010T0-aaAVNn14uW40RU8hwWL4N1_Y/edit");

enum DateFormat {
    Date = "DATE",
    WeekBlock = "WEEK_BLOCK",
    WeekDay = "WEEK_DAY"
}

type CalendarContents = {[key: string]: SpreadsheetApp.Range};
type TrackerContents = {[key: string]: CalendarContents};

type GradeSheetDict = {9: SpreadsheetApp.Sheet, 10: SpreadsheetApp.Sheet, 11: SpreadsheetApp.Sheet, 12: SpreadsheetApp.Sheet};

class CalendarSheet {
  constructor(name: string, headerRows: number, dateColumn: number, dateFormat: DateFormat, infoColumns: number[]) {
    this.name = name;
    this.headerRows = headerRows;
    this.dateColumn = dateColumn;
    this.dateFormat = dateFormat;
    this.infoColumns = infoColumns;
  }

  findSheet(spreadsheet: SpreadsheetApp.Spreadsheet): void {
    this.sheet = spreadsheet.getSheetByName(this.name);
    if (this.sheet == null) {
      throw "Could not find sheet \"" + this.name + "\", check name spelling";
    }
  }
}

class TrackerSpreadsheet {
  constructor(url: string, mainName: string, mainHeaderRows, ...subjects: CalendarSheet[]) {
    this.spreadsheet = SpreadsheetApp.openByUrl(url);
    if (this.spreadsheet == null) {
      throw "Could not find spreadsheet (which contains \"" + main.name + "\"), check URL";
    }
    this.mainName = mainName;
    this.mainSheet = this.spreadsheet.getSheetByName(mainName);
    if (this.mainSheet == null) {
      throw "Could not find sheet \"" + mainName + "\", check name spelling";
    }
    this.mainHeaderRows = mainHeaderRows;
    this.subjects = subjects;
    for (let i of this.subjects)
      i.findSheet(this.spreadsheet);
  }
}

const timeSheets: {today: GradeSheetDict, tomorrow: GradeSheetDict} = {
  today: {
    9: timeSpreadsheet.getSheetByName("Today9"),
    10: timeSpreadsheet.getSheetByName("Today10"),
    11: timeSpreadsheet.getSheetByName("Today11"),
    12: timeSpreadsheet.getSheetByName("Today12")
  },
  tomorrow: {
    9: timeSpreadsheet.getSheetByName("Tomorrow9"),
    10: timeSpreadsheet.getSheetByName("Tomorrow10"),
    11: timeSpreadsheet.getSheetByName("Tomorrow11"),
    12: timeSpreadsheet.getSheetByName("Tomorrow12")
  }
}

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
