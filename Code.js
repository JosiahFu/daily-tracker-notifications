/*<style>.container {display: flex; flex-wrap: wrap;} .child {flex-grow: 1; width: 300px; margin: 10px; background-color: gainsboro; padding: 10px;} h3 {font-size: 1.3em;}</style>*/

// Constants

const date_tomorrow = new Date();
date_tomorrow.setDate(date_tomorrow.getDate()+1);

const flexChildStyle = "style=\"display: inline-block; vertical-align: top; width: 300px; margin: 10px; background-color: whitesmoke; padding: 10px;\"";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const categoryNames = ["Main Calendar", "Algebra 2", "Chemistry", "English 10", "Spanish 2", "Spanish 2 Native", "PBS", "World History"];

const trackerSpreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1XhQqAfjMGV8Q4Mtxbh4wfi8xjbZ3Au3uftDxjt_4498/edit#gid=1140462569");

// Deployment

function remindMorning() {
  sendRemindEmail("10th-daily-tracker-list-morning@student.davincischools.org,josiah_fu@student.davincischools.org", trackerSpreadsheet);
}

function remindEvening() {
  sendRemindEmail("10th-daily-tracker-list-evening@student.davincischools.org,josiah_fu@student.davincischools.org", trackerSpreadsheet);
}

function testRemind() {
  sendRemindEmail("josiah_fu@student.davincischools.org", trackerSpreadsheet);
}

function test() {
  console.log(formatEventsAsEmail(getEvents(0, 23, trackerSpreadsheet), false));
}

// Main

function getEvents(month, date, spreadsheet) {
  console.log("Collecting events on " + (month + 1) + "/" + date);
  let mainCalendar = spreadsheet.getSheets()[0];
  let sheets = spreadsheet.getSheets().slice(2, 9);

  // let mainContents = ;
  let allSheetContents = [parseMainCalendar(mainCalendar, month, date)];

  console.log(allSheetContents[0]);

  for (let i of sheets) {
    let sheetContentArray = parseSubjectCalendar(i, month, date);
    console.log(sheetContentArray)

    allSheetContents.push(sheetContentArray);
  }

  // if (content.trim().length > 0) {
  // for (let i of )
  console.log(allSheetContents);

  let output = []
  for (let category of allSheetContents) {
    let categoryDictionary = {};
    for (let section of Object.keys(category)) {
      let sectionContentsArray = category[section].match(/[^\r\n]+/g); // Split by lines

      if (sectionContentsArray == null) {
        categoryDictionary[section] = [category[section].trim()];
      } else {
        // sectionContentsArray = trimArray(sectionContentsArray);
        for (let k = 0; k < sectionContentsArray.lengh; k++) sectionContentsArray[k] = sectionContentsArray[k].trim()
        categoryDictionary[section] = sectionContentsArray;
      }
    }

    output.push(categoryDictionary)
  }

  console.log(output);

  return output;
}

function sendRemindEmail(recipient, spreadsheet) {
  let contents = getEvents(date_tomorrow.getMonth(), date_tomorrow.getDate(), spreadsheet);
  // console.log(contents);
  let contentFormatted = formatEventsAsEmail(contents);

  if (contentFormatted == null) {
    console.log("No events were found");
  } else {
    GmailApp.sendEmail(recipient, "Daily Tracker Notifications " + monthNames[date_tomorrow.getMonth()] + " " + date_tomorrow.getDate(), "", { htmlBody: contentFormatted });
  }
}

function formatEventsAsEmail(contents) {
  // let contentRaw = "Tracker Events on " + monthNames[date_now.getMonth()] + " " + date_now.getDate() + ":\n"+contentArray.join("\n");
  // let contentRaw = ""
  let empty = true;

  let contentFormatted = "<h1>Tracker Events on " + monthNames[date_tomorrow.getMonth()] + " " + date_tomorrow.getDate() + "</h1>" + "<p>Note: Block schedule classes apply to both days, so if it says a homework is due in the Thursday announcement but you have that class Friday, it's probably due on Friday.</p><div style=\"width:100%;\">";

  for (let i = 0; i < contents.length; i++) {
    contentFormatted += htmlFormat(categoryNames[i], contents[i], i == 0);

    if (Object.keys(contents[i]).length > 0) {
      empty = false;
    }
  }

  if (empty) {
    return null;
  }

  contentFormatted +=
    "</div><p><a href=\"https://docs.google.com/spreadsheets/d/1XhQqAfjMGV8Q4Mtxbh4wfi8xjbZ3Au3uftDxjt_4498\" target=\"_blank\">Link to the daily tracker</a></p>" +
    "<p><a href=\"mailto:josiah_fu@student.davincischools.org\">Feedback/Bug Reports</a></p>" +
    "<p>Invite more people: <a href=\"https://groups.google.com/a/student.davincischools.org/g/10th-daily-tracker-list-morning\" target=\"_blank\">Morning Notifications</a> | <a href=\"https://groups.google.com/a/student.davincischools.org/g/10th-daily-tracker-list-evening\" target=\"_blank\">Evening Notifications</a>" +
    "<p>Disclaimer: I cannot guarantee that every email will have up-to-date information, or that it is even sent. Sometimes code just breaks, there can be untested edge cases, or even Google could go down. It is your responsibility to know when your assignments are due. These notifications are provided as a convenience, not to replace the tracker.</p>";

  return contentFormatted;
}

function parseMainCalendar(sheet, currentMonth, currentDate) {
  let range = sheet.getRange("B4:F")
  let p_date;
  let month = 7; // calendar begins in August

  for (let row = 0; row < range.getHeight(); row++) {
    for (let column = 0; column < range.getWidth(); column++) {
      let cell = range.getCell(row + 1, column + 1);

      let value = cell.getValue().toString();

      let split = value.indexOf('|')

      let dateString = value.substring(0, split - 1);
      let date = parseInt(dateString);
      // let date = 0;

      if (!isNaN(date)) {
        if (p_date > date) {
          month = (month + 1) % 12;
        }

        // console.log(month + ' ' + date);

        if (month == currentMonth && date == currentDate) {
          content = value.substring(split + 2);
          return {"main": content};
        }

        p_date = date;
      }
    }
  }
  return {};
}

function parseSubjectCalendar(sheet, currentMonth, currentDate) {
  let headers = sheet.getRange("C3:F3");
  let range = sheet.getRange("C4:F");

  let output = {};

  for (let row = 0; row < range.getHeight(); row++) {
    dateString = range.getCell(row + 1, 1).getDisplayValue().toString();
    let dates = dateString.split(',');
    for (let i = 0; i < dates.length; i++) dates[i] = dates[i].trim();
    if (dates.includes((currentMonth + 1) + "/" + currentDate)) {
      output[headers.getCell(1, 2).getValue()] = range.getCell(row + 1, 2).getValue();
      output[headers.getCell(1, 3).getValue()] = range.getCell(row + 1, 3).getValue();
      output[headers.getCell(1, 4).getValue()] = range.getCell(row + 1, 4).getValue();
      return output;
    }
  }
  return {};
}

// utils

function trimArray(array) {
  for (let i = 0; i < array.length; i++) if (array[i].trim().length == 0) array.splice(i, i);
  return array;
}

function htmlFormat(title, contents, isMain) {
  let output = "<div " + flexChildStyle + "><h2>" + title + "</h2>";
  
  let hasContent = false;
  for (let i of Object.keys(contents)) {
    if (contents[i] != '') {
      output += isMain ? "" : ("<h3>" + i + "</h3>") +
        "<ul><li>" + contents[i].join("</li><li>") + "</li></ul>"
      hasContent = true;
    }
  }
  if (!hasContent)
      output += "<p style=\"color: gray;\"><em>No events listed</em></p>";
  output += "</div>";
  return output;
}