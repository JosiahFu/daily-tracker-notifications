function testRemind() {
  sendRemindEmail("josiah_fu@student.davincischools.org", null, trackerSpreadsheet);
}

function test() {
  console.log(parseMainCalendar(trackerSpreadsheet, 4, 30));
}

function remindMorning() {
  sendRemindEmail("10th-daily-tracker-list-morning@student.davincischools.org","josiah_fu@student.davincischools.org", trackerSpreadsheet);
}

function remindEvening() {
  sendRemindEmail("10th-daily-tracker-list-evening@student.davincischools.org","josiah_fu@student.davincischools.org", trackerSpreadsheet);
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