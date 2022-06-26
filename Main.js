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

  console.log(contentFormatted);

  if (contentFormatted == null) {
    console.log("No events were found");
  } else {
    MailApp.sendEmail(recipient, "Daily Tracker Notifications " + monthNames[date_tomorrow.getMonth()] + " " + date_tomorrow.getDate(), "", { htmlBody: contentFormatted, bcc: bccRecipient });
  }
}

function formatEventsAsEmail(contents) {
  // let contentRaw = "Tracker Events on " + monthNames[date_now.getMonth()] + " " + date_now.getDate() + ":\n"+contentArray.join("\n");
  // let contentRaw = ""
  let hasContent = false;

  let contentFormatted = 
    "<!DOCTYPE html><html><head><style>" + style + "</style></head><body>" +
    "<h1>Tracker Events on " + monthNames[date_tomorrow.getMonth()] + " " + date_tomorrow.getDate() + "</h1>" +
    "<p>Block schedule classes apply to both days, so if it says a homework is due in the Thursday announcement but you have that class Friday, it's probably due on Friday.</p>" +
    "<p><a href=\"https://docs.google.com/spreadsheets/d/1XhQqAfjMGV8Q4Mtxbh4wfi8xjbZ3Au3uftDxjt_4498\" target=\"_blank\">Link to the daily tracker</a></p>" +
    "<div class=\"container\">";
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
    "</div><p><a href=\"mailto:josiah_fu@student.davincischools.org\">Feedback/Bug Reports</a></p>" +
    "<p>Invite more people: <a href=\"https://groups.google.com/a/student.davincischools.org/g/10th-daily-tracker-list-morning\" target=\"_blank\">Morning Notifications</a> | <a href=\"https://groups.google.com/a/student.davincischools.org/g/10th-daily-tracker-list-evening\" target=\"_blank\">Evening Notifications</a>" +
    "<p>Disclaimer: I cannot guarantee that every email will have up-to-date information, or that it is even sent. Sometimes code just breaks, there can be untested edge cases, or even Google could go down. It is your responsibility to know when your assignments are due. These notifications are provided as a convenience, not a replacement.</p></body></html>";

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
