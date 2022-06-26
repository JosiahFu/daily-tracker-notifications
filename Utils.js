function trimArray(array) {
  for (let i = 0; i < array.length; i++) if (array[i].trim().length == 0) array.splice(i, i);
  return array;
}

function htmlFormat(title, contents, isMain) {
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
