// Guest Desk: logs every request into the Google Sheet this script is attached to.
// Sheet ke andar Extensions > Apps Script me paste karo.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Time", "Room", "Type", "Note", "Guest name", "Status"]);
  }
  var d = {};
  try { d = JSON.parse(e.postData.contents); } catch (err) {}
  sheet.appendRow([
    new Date(),
    String(d.room || ""),
    String(d.type || "").slice(0, 60),
    String(d.note || "").slice(0, 300),
    String(d.name || "").slice(0, 60),
    "New"
  ]);
  return ContentService.createTextOutput("ok");
}

function doGet() {
  return ContentService.createTextOutput("Guest Desk is running");
}
