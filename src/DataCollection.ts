let weekNum: number;

// TODO: PD Weeks

function getEvents(date: Date, trackerSpreadsheet: TrackerSpreadsheet): TrackerContents {
  console.log("Collecting events on " + (date.getMonth() + 1) + "/" + date.getDate() + " from " + trackerSpreadsheet.spreadsheet.getName());

  let allSheetContents: TrackerContents = {};
  allSheetContents[trackerSpreadsheet.mainName] = parseMainCalendar(trackerSpreadsheet.mainSheet, trackerSpreadsheet.mainHeaderRows, date);

  for (let i of trackerSpreadsheet.subjects) {
    let sheetContentArray = parseSubjectCalendar(i, date);
  
    allSheetContents[i.name] = sheetContentArray;
  }

  console.log("| Searched all calendars");
  console.log();
  return allSheetContents;
}

function parseMainCalendar(sheet: GoogleAppsScript.Spreadsheet.Sheet, headerRows: number, date: Date): {main?: GoogleAppsScript.Spreadsheet.Range} {
  console.log("| Searching main calendar");
  let range = sheet.getRange(headerRows + 1, 1, sheet.getLastRow() - headerRows - 1, 6);
  let p_date = 0;
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

function parseSubjectCalendar(calendarSheet: CalendarSheet, date: Date): CalendarContents {
  console.log("| Searching " + calendarSheet.name);
  let infoRowsCount = calendarSheet.sheet.getLastRow() - calendarSheet.headerRowCount -1;
  let headers: string[] = calendarSheet.headers ?? [];
  let columns: GoogleAppsScript.Spreadsheet.Range[] = [];
  for (let i of calendarSheet.infoColumns) {
    if (calendarSheet.headers == undefined) {
      let headerCell = calendarSheet.sheet.getRange(calendarSheet.columnTitleRow, i);
      headers.push((headerCell.getMergedRanges()[0] ?? headerCell).getDisplayValue());
    }
    columns.push(calendarSheet.sheet.getRange(calendarSheet.headerRowCount + 1, i, infoRowsCount, 1));
  }

  let output: CalendarContents = {};
  let pattern: RegExp;

  switch (calendarSheet.dateFormat) {
    case DateFormat.Date:
      pattern = new RegExp("(?<!\d\d\/)0?" + (date.getMonth() + 1) + "\\/0?" + date.getDate());
      break;
    case DateFormat.DateRange:
      pattern = /(\d{1,2})[.\/](\d{1,2})(?: ?- ?(\d{1,2})[.\/](\d{1,2}))?/;
      break;
    default: // Is a week format
      pattern = /\d+/; // First sequence of digits
  }

  let todayRow: undefined | number;
  let dateString: undefined | string;
  let weekString: undefined | string;

  dateSearch:
  for (let row = calendarSheet.headerRowCount + 1; row <= infoRowsCount; row++) {
    dateString = calendarSheet.sheet.getRange(row, calendarSheet.dateColumn).getDisplayValue().toString();    

    switch(calendarSheet.dateFormat) {
      case DateFormat.Date:
        if (pattern.test(dateString)) {
          todayRow = row;
          break dateSearch;
        }
        break;

      case DateFormat.DateRange:
        let results = pattern.exec(dateString);
        if (results == null)
          break;
        if (results.length == 3) {
          if (parseInt(results[1]) == date.getMonth() && parseInt(results[2]) == date.getDate()) {
            todayRow = row;
            break dateSearch;
          }
        }
        if (/*TODO: If date in range*/ false) {
          todayRow = row;
          break dateSearch;
        }
        break;

      default: // Is a week format
        weekString = calendarSheet.sheet.getRange(row, calendarSheet.dateColumn).getDisplayValue().toString();
        let weekMatches = pattern.exec(weekString);

        if (weekMatches != null) if (weekMatches[0] == weekNum.toString()) {
          let weekHeight = calendarSheet.sheet.getRange(row, calendarSheet.dateColumn).getNumRows();
          
          switch (calendarSheet.dateFormat) {
            case DateFormat.Week:
              todayRow = row;
              break;

            case DateFormat.WeekBlock:
              let dayOffset = (overrideWeeks[weekNum] ?? blocks)[Object.values(WeekDays)[date.getDay()]];
              if (dayOffset < weekHeight)
                todayRow = row + dayOffset - 1;
              break;

            case DateFormat.WeekBlockOnly:
              // TODO: What is this supposed to be???
              break;

            case DateFormat.WeekDay:
              if (date.getDay() < weekHeight && date.getDay() >= 1 && date.getDay() <= 5)
                todayRow = row + date.getDay() - 1;
              break;
            case DateFormat.WeekDayName:
              // TODO
              break;
          }
          
          break dateSearch;
        }
    }
  }

  if (typeof todayRow == "number") {
    for (let i = 0; i < calendarSheet.infoColumns.length; i++)
      output[headers[i]] = calendarSheet.sheet.getRange(todayRow, calendarSheet.infoColumns[i]);

    if (weekString == undefined)
      console.log("| Found events in row with date string " + dateString);
    else
      console.log("| Found events in row with week string " + weekString);
    return output;
  }
  console.warn("| Could not find events on " + calendarSheet.name);
  return {};
}

function getRecipients(grade: Grade, sheets: GradeDict<GoogleAppsScript.Spreadsheet.Sheet>, column: number): string {
  let sheet = sheets[grade];
  let range = sheet.getRange(2, column, signupSheetHeight, 1);
  let values = range.getDisplayValues();
  let recipients: string[] = [];
  for (let i of values)
    for (let j of i)
      if (j != "")
        recipients.push(j);
  return recipients.join(",");
}

// function dateMatches(calendarSheet, row, month, date) {
  
// }
