
var today;
var pages = document.getElementById('Pages').childNodes;

// $(function () {
// 	today = m_getToday();
// 	m_initEventListeners();
// });

// function m_initEventListeners() {
//
// }

// function m_getToday() {
//     var today = new Date();
//     var day = days[today.getDay()];
//     var dd = today.getDate();
//     var mm = today.getMonth() + 1; //January is 0!
//     var yyyy = today.getFullYear();
//
//     if (dd < 10) dd = '0' + dd;
//     if (mm < 10) mm = '0' + mm;
//
//     return day + ', ' + mm + '.' + dd + '.' + yyyy;
// }

function hideUnhidePage(page){
    for(var i = 1; i < pages.length; i+=2){
        if (pages.item(i) == pages.item(page)){
            pages.item(i).style.visibility = 'visible';
        }
        else{
            pages.item(i).style.visibility = 'hidden';
        }
    }
}