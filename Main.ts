function testRemind(): void {
  sendRemindEmail("josiah_fu@student.davincischools.org", 10, date_today);
}

function test(): void {
  console.log(parseSubjectCalendar(trackerSpreadsheetsData[9].subjects[0], date_today)); // TOTEST

}

function remindMidnight(): void {
  sendRemindEmails(timeColumns.midnight)
}

function remindMorning(): void {
  sendRemindEmails(timeColumns.morning);
}

function remindNoon(): void {
  sendRemindEmails(timeColumns.noon);
}

function remindAfternoon(): void {
  sendRemindEmails(timeColumns.afternoon);
}

function remindEvening(): void {
  sendRemindEmails(timeColumns.evening);
}


function sendRemindEmails(column: number): void {
  for (let i of [9,10,11,12])
    sendRemindEmail(getRecipients(i, timeSheets.today, column), i, date_today);
  for (let i of [9,10,11,12])
    sendRemindEmail(getRecipients(i, timeSheets.tomorrow, column), i, date_tomorrow);
}

function sendRemindEmail(recipient: string, grade: number, date: Date): void {
  let trackerSpreadsheet: TrackerSpreadsheet = trackerSpreadsheetsData[grade.toString()];
  let contents = getEvents(date, trackerSpreadsheet);
  let contentFormatted = formatEventsAsEmail(contents, trackerSpreadsheet.spreadsheet.getUrl(), grade, date);

  if (contentFormatted == null) {
    console.warn("No events were found");
  } else {
    console.log("Sending email to grade " + grade + " on " + (date.getMonth() + 1) + "/" + date.getDate());
    MailApp.sendEmail(recipient, "Daily Tracker Notifications " + monthNames[date.getMonth()] + " " + date.getDate(), "", { htmlBody: contentFormatted });
  }
}
