// function trimArray(array) {
//   for (let i = 0; i < array.length; i++) if (array[i].trim().length == 0) array.splice(i, i);
//   return array;
// }

function formatEventsAsEmail(contents, url, grade, date) {
  let hasContent = false;

  let contentFormatted = 
    "<!DOCTYPE html><html><head><style>" + style + "</style></head><body>" +
    "<h1>" + grade + "th Grade Tracker Events on " + monthNames[date.getMonth()] + " " + date.getDate() + "</h1>" +
    "<p>Block schedule classes apply to both days, so for example if it says a homework is due in the Thursday announcement but you have that class Friday, it's probably due on Friday.</p>" +
    "<p class=\"link\"><a href=\"" + url + "\" target=\"_blank\">Link to the daily tracker</a></p>" +
    "<div class=\"container\">";

  for (let i of Object.keys(contents)) {
    contentFormatted += htmlFormatSubject(i, contents[i], i == Object.keys(contents)[0]);

    if (Object.keys(contents[i]).length > 0) {
      hasContent = true;
    }
  }

  if (!hasContent) {
    return null;
  }

  contentFormatted +=
    "</div>" +
    "<p><a href=\"" + url + "\" target=\"_blank\">Link to the daily tracker</a></p>" +
    "<p>Something looks wrong here? Have a suggestion? <a href=\"mailto:josiah_fu@student.davincischools.org\">Let me know!</a></p>" +
    "<p><a href=\"https://docs.google.com/forms/d/e/1FAIpQLSeKJgt3rFpeZJNgXbS1eRpiY4NewP5r6ZvVEgMDflHKivxC9A/viewform?usp=sf_link\" target=\"_blank\">Change your settings or sign up someone else</a></p>" +
    "<p>Disclaimer: I cannot guarantee that every email will have up-to-date information, or that it is even sent. Sometimes code just breaks, there can be untested edge cases, or even Google could go down. It is your responsibility to know when your assignments are due. These notifications are provided as a convenience, not a replacement.</p></body></html>";

  return contentFormatted;
}

function htmlFormatSubject(title, contents, isMain) {
  let output = "<div class=\"block\"><h2>" + title + "</h2>";
  
  let hasContent = false;
  for (let i of Object.keys(contents)) {
    let html = richTextToHTML(contents[i])
    if (html != null) {
      hasContent = true;
      output += (isMain ? '' : ("<h3>" + i + "</h3>")) + html;
    }
  }

   if (!hasContent) {
    output += "<p class=\"missing\"><em>No events listed</em></p>";
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
