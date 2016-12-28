
var today;

$(function () {
	today = m_getToday();
	m_initEventListeners();
});

function m_initEventListeners() {
	
}

function m_getToday() {
    let today = new Date();
    let day = days[today.getDay()];
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return day + ', ' + mm + '.' + dd + '.' + yyyy;
}
