let weekNum: number;

function getEvents(date: Date, trackerSpreadsheet: TrackerSpreadsheet): Object<string, Object<string,SpreadsheetApp.Range>> {
  console.log("Collecting events on " + (date.getMonth() + 1) + "/" + date.getDate() + " from " + trackerSpreadsheet.spreadsheet.getName());

  let allSheetContents = {}
  allSheetContents[trackerSpreadsheet.mainName] = parseMainCalendar(trackerSpreadsheet.mainSheet, trackerSpreadsheet.mainHeaderRows, date);

  for (let i of trackerSpreadsheet.subjects) {
    let sheetContentArray = parseSubjectCalendar(i, date);
  
    allSheetContents[i.name] = sheetContentArray;
  }

  console.log("| Searched all calendars");
  console.log();
  return allSheetContents;
}

function parseMainCalendar(sheet: SpreadsheetApp.Sheet, headerRows: number, date: Date): Object<string, SpreadsheetApp.Range> {
  console.log("| Searching main calendar");
  let range = sheet.getRange(headerRows + 1, 1, sheet.getLastRow() - headerRows - 1, 6);
  let p_date: number;
  let month = mainCalendarStartMonth;

  for (let row = 0; row < range.getHeight(); row++) {
    for (let column = 1; column < range.getWidth(); column++) {
      let cell = range.getCell(row + 1, column + 1);

      let value = cell.getValue().toString();

      let dateMatches = /\d+/.exec(value); // Get the first sequence of digits

      if (dateMatches != null) {
        let testDate = parseInt(dateMatches[0]);
        if (!isNaN(testDate)) {
          if (p_date > testDate) {
            month = (month + 1) % 12;
          }

          if (month == date.getMonth() && testDate == date.getDate()) {
            let weekString = range.getCell(row + 1, 1).getDisplayValue();
            let weekMatches = /\d+/.exec(weekString);
            if (weekMatches == null) {
              console.warn("| Could not find week number on row" + (row + 1));
            } else {
              weekNum = parseInt(weekMatches[0]);
              console.log("| Week number is " + weekNum);
            }

            console.log("| Found events on main calendar");
            return {"main": cell};
          }

          p_date = testDate;
        }
      }
    }
  }
  console.warn("| Could not find events on main calendar");
  return {};
}

function parseSubjectCalendar(calendarSheet: CalendarSheet, date: Date): Object<string, SpreadsheetApp.Range> {
  console.log("| Searching " + calendarSheet.name);
  let infoRowsCount = calendarSheet.sheet.getLastRow() - calendarSheet.headerRows -1;
  let headers = [];
  let columns = [];
  for (let i of calendarSheet.infoColumns) {
    let headerCell = calendarSheet.sheet.getRange(calendarSheet.headerRows, i);
    if (headerCell.getMergedRanges().length == 0)
      headers.push(headerCell.getDisplayValue());
    else
      headers.push(headerCell.getMergedRanges()[0].getDisplayValue());
    columns.push(calendarSheet.sheet.getRange(calendarSheet.headerRows + 1, i, infoRowsCount, 1));
  }

  let output = {};
  let pattern: RegExp;

  switch (calendarSheet.dateFormat) {
    case DateFormat.date:
      pattern = new RegExp("(?<!\d\d\/)0?" + (date.getMonth() + 1) + "\\/0?" + date.getDate());

      for (let row = calendarSheet.headerRows + 1; row <= infoRowsCount; row++) {
        let dateString = calendarSheet.sheet.getRange(row, calendarSheet.dateColumn).getDisplayValue().toString();    

        if (pattern.test(dateString)) {
          for (let i = 0; i < calendarSheet.infoColumns.length; i++) {
            output[headers[i]] = calendarSheet.sheet.getRange(row, calendarSheet.infoColumns[i]);
          }
          console.log("| Found events in row with date string " + dateString);
          return output;
        }
      }
      break;
    case DateFormat.week_block:
    case DateFormat.week_day:
      if (date.getDay() > 0 && date.getDay() < 6) {
        pattern = /\d+/; // First sequence of digits

        for (let row = calendarSheet.headerRows + 1; row <= infoRowsCount; row++) {
          let weekString = calendarSheet.sheet.getRange(row, calendarSheet.dateColumn).getDisplayValue().toString();
          let weekMatches = pattern.exec(weekString);

          if (weekMatches != null) if (weekMatches[0] == weekNum) {
            if (calendarSheet.dateFormat == DateFormat.week_day)
              row = row + date.getDay() - 1;
            else
              row = row + blocks[date.getDay()] - 1;
            
            for (let i = 0; i < calendarSheet.infoColumns.length; i++) {
              output[headers[i]] = calendarSheet.sheet.getRange(row, calendarSheet.infoColumns[i]);
            }
            console.log("| Found events in row with week string " + weekString);
            return output;
          }
        }
      }
      break;
    default:
      break;
  }
  console.warn("| Could not find events on " + calendarSheet.name);
  return {};
}

function getRecipients(grade: number, day: string, time: string): string {
  let timeColumn = timeColumns[time];
  let sheet = timeSheets[day][grade];
  let range = sheet.getRange(2,timeColumn,sheetHeight,1);
  let values = range.getDisplayValues();
  let recipients = [];
  for (let i of values) {
    for (let j of i) {
      if (j != "") {
        recipients.push(j);
      }
    }
  }
  return recipients.join(",");
}

function dateMatches(calendarSheet, row, month, date) {
  
}
