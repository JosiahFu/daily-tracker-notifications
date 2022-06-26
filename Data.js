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

function parseMainCalendar(sheet, currentMonth, currentDate) {
  let range = sheet.getRange("B4:F")
  let p_date;
  let month = 7; // calendar begins in August

  for (let row = 0; row < range.getHeight(); row++) {
    for (let column = 0; column < range.getWidth(); column++) {
      let cell = range.getCell(row + 1, column + 1);

      let value = cell.getValue().toString();

      let dateMatches = /\d+/g.exec(value); // Get the first sequence of digits

      if (dateMatches != null) {
        let date = parseInt(dateMatches[0]);
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
