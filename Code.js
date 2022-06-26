/*<style>.container {display: flex; flex-wrap: wrap;} .child {flex-grow: 1; width: 300px; margin: 10px; background-color: gainsboro; padding: 10px;} h3 {font-size: 1.3em;}</style>*/

// Constants

const date_today = new Date();
const date_tomorrow = new Date();
date_tomorrow.setDate(date_today.getDate()+1);

const flexChildStyle = "style=\"display: inline-block; vertical-align: top; width: 300px; margin: 10px; background-color: whitesmoke; padding: 10px;\"";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// const categoryNames = ["Main Calendar", "Algebra 2", "Chemistry", "English 10", "Spanish 2", "Spanish 2 Native", "PBS", "World History"];

const trackerSpreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1XhQqAfjMGV8Q4Mtxbh4wfi8xjbZ3Au3uftDxjt_4498/edit#gid=1140462569");

// Deployment

function testRemind() {
  sendRemindEmail("josiah_fu@student.davincischools.org", null, trackerSpreadsheet);
}

function test() {
  console.log(formatEventsAsEmail(getEvents(0, 23, trackerSpreadsheet), false));
}

function remindMorning() {
  sendRemindEmail("10th-daily-tracker-list-morning@student.davincischools.org","josiah_fu@student.davincischools.org", trackerSpreadsheet);
}

function remindEvening() {
  sendRemindEmail("10th-daily-tracker-list-evening@student.davincischools.org","josiah_fu@student.davincischools.org", trackerSpreadsheet);
}

// Main

function getEvents(month, date, spreadsheet) {
  console.log("Collecting events on " + (month + 1) + "/" + date);
  let mainCalendar = spreadsheet.getSheets()[0];
  let sheets = spreadsheet.getSheets().slice(2, 9);

  // let mainContents = ;
  let allSheetContents = {}
  allSheetContents[mainCalendar.getName()] = parseMainCalendar(mainCalendar, month, date);

  console.log(allSheetContents[mainCalendar.getName()]);

  for (let i of sheets) {
    let sheetContentArray = parseSubjectCalendar(i, month, date);
    console.log(sheetContentArray)

    allSheetContents[i.getName()] = sheetContentArray;
  }

  // if (content.trim().length > 0) {
  // for (let i of )
  console.log(allSheetContents);

  // let output = {}
  // for (let category of Object.keys(allSheetContents)) {
  //   let categoryDictionary = {};
  //   for (let section of Object.keys(allSheetContents[category])) {
  //     let sectionContentsArray = allSheetContents[category][section].match(/[^\r\n]+/g); // Split by lines

  //     if (sectionContentsArray == null) {
  //       categoryDictionary[section] = [allSheetContents[category][section].trim()];
  //     } else {
  //       // sectionContentsArray = trimArray(sectionContentsArray);
  //       for (let k = 0; k < sectionContentsArray.lengh; k++) sectionContentsArray[k] = sectionContentsArray[k].trim()
  //       categoryDictionary[section] = sectionContentsArray;
  //     }
  //   }

  //   output[category] = categoryDictionary;
  // }

  // console.log(output);

  // return output;
  return allSheetContents;
}

function sendRemindEmail(recipient, bccRecipient, spreadsheet) {
  let contents = getEvents(date_tomorrow.getMonth(), date_tomorrow.getDate(), spreadsheet);
  // console.log(contents);
  let contentFormatted = formatEventsAsEmail(contents);

  if (contentFormatted == null) {
    console.log("No events were found");
  } else {
    MailApp.sendEmail(recipient, "Daily Tracker Notifications " + monthNames[date_today.getMonth()] + " " + date_today.getDate(), "", { htmlBody: contentFormatted, bcc: bccRecipient });
  }
}

function formatEventsAsEmail(contents) {
  // let contentRaw = "Tracker Events on " + monthNames[date_now.getMonth()] + " " + date_now.getDate() + ":\n"+contentArray.join("\n");
  // let contentRaw = ""
  let hasContent = false;

  let contentFormatted = 
    "<h1>Tracker Events on " + monthNames[date_tomorrow.getMonth()] + " " + date_tomorrow.getDate() + "</h1>" +
    "<p>Note: Block schedule classes apply to both days, so if it says a homework is due in the Thursday announcement but you have that class Friday, it's probably due on Friday.</p><div style=\"width:100%;\">" +
    "</div><p><a href=\"https://docs.google.com/spreadsheets/d/1XhQqAfjMGV8Q4Mtxbh4wfi8xjbZ3Au3uftDxjt_4498\" target=\"_blank\">Link to the daily tracker</a></p>";
    // "<h1>Tracker Events Today</h1>";

  for (let i of Object.keys(contents)) {
    contentFormatted += htmlFormat(i, contents[i], i == Object.keys(contents)[0]);

    if (Object.keys(contents[i]).length > 0) {
      hasContent = true;
    }
  }

  if (!hasContent) {
    return null;
  }

  contentFormatted +=
    "<p><a href=\"mailto:josiah_fu@student.davincischools.org\">Feedback/Bug Reports</a></p>" +
    "<p>Invite more people: <a href=\"https://groups.google.com/a/student.davincischools.org/g/10th-daily-tracker-list-morning\" target=\"_blank\">Morning Notifications</a> | <a href=\"https://groups.google.com/a/student.davincischools.org/g/10th-daily-tracker-list-evening\" target=\"_blank\">Evening Notifications</a>" +
    "<p>Disclaimer: I cannot guarantee that every email will have up-to-date information, or that it is even sent. Sometimes code just breaks, there can be untested edge cases, or even Google could go down. It is your responsibility to know when your assignments are due. These notifications are provided as a convenience, not a replacement.</p>";

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
          // content = value.substring(split + 2);
          // return {"main": content};
          return {"main": cell};
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
      output[headers.getCell(1, 2).getValue()] = range.getCell(row + 1, 2);
      output[headers.getCell(1, 3).getValue()] = range.getCell(row + 1, 3);
      output[headers.getCell(1, 4).getValue()] = range.getCell(row + 1, 4);
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
    let html = richTextToHTML(contents[i])
    if (html != null) {
      hasContent = true;
      output += (isMain ? '' : ("<h3>" + i + "</h3>")) + html;
    }
  }

   if (!hasContent) {
    output += "<p style=\"color: gray;\"><em>No events listed</em></p>";
  }

  output += "</div>";
  return output;
}

function richTextToHTML(cell) {
  let runs = cell.getRichTextValue().getRuns();
  let output = "";

  if (cell.getRichTextValue().getText().trim() == "") {
    return null;
  }
  
  for (let run of runs) {
    let style = run.getTextStyle();
    let formattedRun = run.getText(); // Fix trailing whitespace?
    let css = "";
    
    formattedRun = formattedRun.replaceAll(/\r?\n/g, "<br>");

    if (style.isBold()) {
      css += "font-weight: bold;";
    }

    if (style.isItalic()) {
      css += "font-style: italic;";
    }

    if (style.isUnderline() && style.isStrikethrough()) {
      css += "text-decoration: underline overline;"
    } else if (style.isUnderline()) {
      css += "text-decoration: underline;";
    } else if (style.isStrikethrough()) {
      css += "text-decoration: line-through;";
    }

    if (style.getForegroundColorObject() != null) {
      css += "color: " + style.getForegroundColorObject().asRgbColor().asHexString() + ";";
    }

    if (css != "") {
      formattedRun = "<span style='" + css + "'>" + formattedRun + "</span>";
    }

    if (run.getLinkUrl() != null) {
      formattedRun = "<a href=\"" + run.getLinkUrl() + "\" target=\"_blank\">" + formattedRun + "</a>"
    }

    output += formattedRun;
  }

  return output;
}	