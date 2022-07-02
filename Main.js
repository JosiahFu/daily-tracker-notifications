// Testing changes

function testRemind() {
  sendRemindEmail("josiah_fu@student.davincischools.org", 10, date_today);
}

function test() {
  console.log(parseSubjectCalendar(trackerSpreadsheetsData[9].subjects[0], dates.today.getMonth(), dates.today.getDate())); // TOTEST

}

function remindMidnight() {
  sendRemindEmails(midnight)
}

function remindMorning() {
  sendRemindEmails(morning);
}

function remindNoon() {
  sendRemindEmails(noon);
}

function remindAfternoon() {
  sendRemindEmails(afternoon);
}

function remindEvening() {
  sendRemindEmails(evening);
}


function sendRemindEmails(time) {
  for (let i of [9,10,11,12])
    sendRemindEmail(getRecipients(i,"today",time), i, date_today);
  for (let i of [9,10,11,12])
    sendRemindEmail(getRecipients(i,"tomorrow",time), i, date_tomorrow);
}

function sendRemindEmail(recipient, grade, date) {
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