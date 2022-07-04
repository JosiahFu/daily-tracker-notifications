function testRemind(): void {
  sendRemindEmail("josiah_fu@student.davincischools.org", 10, date_today);
}

function test(): void {
  console.log(parseSubjectCalendar(trackerSpreadsheetsData[9].subjects[0], date_today.getMonth(), date_today.getDate())); // TOTEST

}

function remindMidnight(): void {
  sendRemindEmails(midnight)
}

function remindMorning(): void {
  sendRemindEmails(morning);
}

function remindNoon(): void {
  sendRemindEmails(noon);
}

function remindAfternoon(): void {
  sendRemindEmails(afternoon);
}

function remindEvening(): void {
  sendRemindEmails(evening);
}


function sendRemindEmails(time): void {
  for (let i of [9,10,11,12])
    sendRemindEmail(getRecipients(i,"today",time), i, date_today);
  for (let i of [9,10,11,12])
    sendRemindEmail(getRecipients(i,"tomorrow",time), i, date_tomorrow);
}

function sendRemindEmail(recipient, grade, date): void {
  let trackerSpreadsheet = trackerSpreadsheetsData[grade];
  let contents = getEvents(date, trackerSpreadsheet);
  let contentFormatted = formatEventsAsEmail(contents, trackerSpreadsheet.spreadsheet.getUrl(), grade, date);

  if (contentFormatted == null) {
    console.warn("No events were found");
  } else {
    console.log("Sending email to grade " + grade + " on " + (date.getMonth() + 1) + "/" + date.getDate());
    MailApp.sendEmail(recipient, "Daily Tracker Notifications " + monthNames[date.getMonth()] + " " + date.getDate(), "", { htmlBody: contentFormatted });
  }
}
