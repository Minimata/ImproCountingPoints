
var pages = document.getElementById('Pages');
var nodes = [];
for(var i = 0; i < pages.children.length; i++){
    nodes.push(pages.children.item(i));
}
while(pages.children.length > 0){
    pages.removeChild(pages.children.item(0));
}
pages.appendChild(nodes[0]);
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
    for(var i = 0; i < pages.children.length; i++){
        pages.removeChild(pages.children.item(i));
    }
    pages.appendChild(nodes[page]);
}
