/*<style>.container {display: flex; flex-wrap: wrap;} .child {flex-grow: 1; width: 300px; margin: 10px; background-color: gainsboro; padding: 10px;} h3 {font-size: 1.3em;}</style>*/

// Constants

const date_tomorrow = new Date();
date_tomorrow.setDate(date_tomorrow.getDate()+1);

const flexChildStyle = "style=\"display: inline-block; vertical-align: top; width: 300px; margin: 10px; background-color: whitesmoke; padding: 10px;\""

const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

const categoryNames = ["Main Calendar", "Algebra 2", "Chemistry", "English 10", "Spanish 2", "Spanish 2 Native", "PBS", "World History"];

const trackerSpreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1XhQqAfjMGV8Q4Mtxbh4wfi8xjbZ3Au3uftDxjt_4498/edit#gid=1140462569");

// Deployment

function remind() {
  sendRemindEmail("10th-daily-tracker-list@student.davincischools.org,josiah_fu@student.davincischools.org", trackerSpreadsheet);
}

function testRemind() {
  sendRemindEmail("josiah_fu@student.davincischools.org", trackerSpreadsheet);
}

function test() {
  console.log(formatTrackerEvents(getEvents(0,23,trackerSpreadsheet),false));
}

// Main

function getEvents(month, date, spreadsheet) {
  console.log("Collecting events on "+(month+1)+"/"+date);
  let mainCalendar = spreadsheet.getSheets()[0];
  let sheets = spreadsheet.getSheets().slice(2,9);

  // let mainContents = ;
  let allSheetContents = [parseMainCalendar(mainCalendar, month, date)]

  // console.log(output);

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
    let categoryArray = []
    for (let section of category) {
      let sectionContentsArray = section.match(/[^\r\n]+/g); // Split by lines
      
      if (sectionContentsArray == null) {
        categoryArray.push([section.trim()]);
      } else {
        // sectionContentsArray = trimArray(sectionContentsArray);
        for (let k = 0; k < sectionContentsArray.lengh; k++) sectionContentsArray[k] = sectionContentsArray[k].trim()
        categoryArray.push(sectionContentsArray);
      }    
    }
    
    if (categoryArray.length == 1) {
      if (categoryArray[0][0].length == 0) {
        output.push(null);
      } else {
        output.push(categoryArray);
      }
    } else if(categoryArray.length == 2) {
      if (categoryArray[0][0].length == 0 && categoryArray[1][0].length == 0) {
        output.push(null);
      } else {
        output.push(categoryArray);
      }
    } else {
      output.push(null);
    }
  }

  console.log(output);
  
  return output;
}

function sendRemindEmail(recipient, spreadsheet) {
  sendRemindEmail(recipient, spreadsheet, false);
}

function sendRemindEmail(recipient, spreadsheet, isCopy) {
  let contents = getEvents(date_tomorrow.getMonth(), date_tomorrow.getDate(), spreadsheet);
  // console.log(contents);
  let contentFormatted = formatTrackerEvents(contents, isCopy);

  if (contentFormatted == null) {
    console.log("No events were found");
  } else {
    GmailApp.sendEmail(recipient, "Daily Tracker Notifications " + monthNames[date_tomorrow.getMonth()] + " " + date_tomorrow.getDate(), "", {htmlBody: contentFormatted});
  }
}

function formatTrackerEvents(contents, isCopy) {
    // let contentRaw = "Tracker Events on " + monthNames[date_now.getMonth()] + " " + date_now.getDate() + ":\n"+contentArray.join("\n");
  // let contentRaw = ""
  let empty = true;

  let contentFormatted = "<h1>Tracker Events on " + monthNames[date_tomorrow.getMonth()] + " " + date_tomorrow.getDate() + "</h1>" + (isCopy ? "<p style=\"color:red; font-size:1.2em;\">Disclaimer: This is currently a beta  being tested on a copy of the tracker. Not all information will be up-to-date.</p>" : "") +"<p>Note: Block schedule classes apply to both days, so if it says a homework is due in the Thursday announcement but you have that class Friday, it's probably due on Friday.</p><div style=\"width:100%;\">";

  let mainCalendar = contents.shift();
  if (mainCalendar != null) {  
    contentFormatted += htmlFormat(categoryNames[0], mainCalendar);
    empty = false;
  }
  
  for (let i = 0; i < contents.length; i++) {
    contentFormatted += htmlFormat2(categoryNames[i+1], ["Agenda", "Pre-Work"], contents[i]);
    if (contents[i] != null) {
      empty = false;
    }
  }

  if (empty) {
    return null;
  }

  contentFormatted +=
    "</div><p><a href=\"https://docs.google.com/spreadsheets/d/1XhQqAfjMGV8Q4Mtxbh4wfi8xjbZ3Au3uftDxjt_4498\" target=\"_blank\">Link to the daily tracker</a></p>" +
    "<p><a href=\"mailto:josiah_fu@student.davincischools.org\">Feedback/Bug Reports</a></p>" +
    "<p>Disclaimer: I cannot guarantee that every email will have up-to-date information, or that it is even sent. Sometimes code just breaks, there can be untested edge cases, or even Google could go down. It is your responsibility to know when your assignments are due. These notifications are provided as a convenience, not to replace the tracker.</p>";

  return contentFormatted;
}

function parseMainCalendar(sheet, currentMonth, currentDate) {
  let range = sheet.getRange("B4:F")
  let p_date;
  let month = 7; // calendar begins in August

  for (let row = 0; row < range.getHeight(); row++) {
    for (let column = 0; column < range.getWidth(); column++) {
      let cell = range.getCell(row+1, column+1);

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

        if(month == currentMonth && date == currentDate) {
          content = value.substring(split + 2);
          return [content];
        }
        
        p_date = date;
      }
    }
  }
  return [];
}

function parseSubjectCalendar(sheet, currentMonth, currentDate) {
  let range = sheet.getRange("C4:E");

  for (let row = 0; row < range.getHeight(); row++) {
    dateString = range.getCell(row+1,1).getDisplayValue().toString();
    dates = dateString.split(',');
    for (let i = 0; i < dates.length; i++) dates[i] = dates[i].trim();
    if (dates.includes((currentMonth+1)+"/"+currentDate)){
      return [range.getCell(row+1,2).getValue(), range.getCell(row+1,3).getValue()];
    }
  }
  return [];
}

// utils

function trimArray(array) {
  for (let i = 0; i < array.length; i++) if (array[i].trim().length == 0) array.splice(i,i);
  return array;
}

function htmlFormat(title, content) {
  let output = "<div " + flexChildStyle + "><h2>" + title + "</h2>";
  if (content == null) {
    output += "<p style=\"color: gray;\"><em>No events listed</em></p>";
  } else {
    output += "<ul><li>"+content.join("</li><li>")+"</li></ul>";
  }
  output += "</div>";

  return output;
}

function htmlFormat2(title, subtitles, contents) {
  let output = "<div " + flexChildStyle + "><h2>" + title + "</h2>";
  if (contents == null) {
    output += "<p style=\"color: gray;\"><em>No events listed</em></p>";
  } else {
    for (let i = 0; i < contents.length; i++) {
      if (contents[i][0] != '') {
        output += "<h3>" + subtitles[i] + "</h3>" +
          "<ul><li>"+contents[i].join("</li><li>")+"</li></ul>"
      }
    }
  }
  output += "</div>";
  return output; // TODO: Add "none"
}