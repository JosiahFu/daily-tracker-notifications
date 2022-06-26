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
