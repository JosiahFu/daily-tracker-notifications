/*<style>.container {display: flex; flex-wrap: wrap;} .child {flex-grow: 1; width: 300px; margin: 10px; background-color: gainsboro; padding: 10px;} h3 {font-size: 1.3em;}</style>*/

const date_today = new Date();
const date_tomorrow = new Date();
date_tomorrow.setDate(date_today.getDate()+1);

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// const categoryNames = ["Main Calendar", "Algebra 2", "Chemistry", "English 10", "Spanish 2", "Spanish 2 Native", "PBS", "World History"];

const trackerSpreadsheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1XhQqAfjMGV8Q4Mtxbh4wfi8xjbZ3Au3uftDxjt_4498/edit#gid=1140462569");

style = `
/*@import url('https://fonts.googleapis.com/css2?family=Asap+Condensed&display=swap');

body {
    font-family: 'Asap Condensed', sans-serif;
}*/

.missing {
    color: gray;
}

.container {
    width: 100%;
    position: relative;
    column-count: auto;
    column-width: 250px;
    column-gap: 10px;
}

.block {
    background-color: gainsboro;
    padding: 10px;
    /*width: 250px;*/
    width: 100%;
    margin-bottom: 10px;
    box-sizing: border-box;
    display: inline-block;
    border-radius: 10px;
}

h1 {
    text-align: center;
}

h2 {
    margin-top: 0;
}

.link {
    display: none;
}
`
