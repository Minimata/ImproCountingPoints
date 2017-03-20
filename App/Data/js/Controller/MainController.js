var scoreT1Val = document.getElementById('actualScoreT1');
var scoreT2Val = document.getElementById('actualScoreT2');
var scoreT2Span = document.getElementById('scoreT2');
var scoreT1Span = document.getElementById('scoreT1');
var pages = document.getElementById('Pages');
var quickTimers = document.getElementById('homeQuickTimers');
var periodSpan = document.getElementById('period');
var scoreT1 = 0;
var scoreT2 = 0;
var periods = ['1','2','3','4','première','dernière'];
var teamColors = ['#000066','#0000ff','#0099ff','#00ffff','#003300','#00cc00','#ffcc00','#ff6600','#cc6600','#ff0000','#ff66ff',
    '#993399','#660066','#7c7c7c','#000000'];
var colorIncrement = 0;
var period = 0;
var nodes = [].slice.call(pages.children);
var timerNodes = [].slice.call(quickTimers.children);
pages.innerHTML = "";
quickTimers.innerHTML = "";
pages.appendChild(nodes[0]);
quickTimers.appendChild(timerNodes[0]);

function mouseovertitle(title){
    var text = document.getElementById("titletext"+title);
    var img = document.getElementById("titleimg"+title);
    if(text.getAttribute("hidden")!=null){
        text.removeAttribute("hidden");
        img.setAttribute("hidden", "true");
    }else
    {
        img.removeAttribute("hidden");
        text.setAttribute("hidden", "true");
    }
}

function hideUnhidePage(page)
{
    pages.innerHTML = "";
    pages.appendChild(nodes[page]);
    var s = nodes[page].children[0].children[0].src;
    nodes[page].children[0].children[0].src = "";
    nodes[page].children[0].children[0].src = s + "?a=" + Math.random();
}

function showQuickTimerStarter()
{
    quickTimers.innerHTML = "";
    quickTimers.appendChild(timerNodes[0]);
}

function showQuickTimerSelector()
{
    quickTimers.innerHTML = "";
    quickTimers.appendChild(timerNodes[1]);
}

function showQuickTimerButtons()
{
    quickTimers.innerHTML = "";
    quickTimers.appendChild(timerNodes[2]);
}

function updateScore(increment, team){
    if(increment){
        if(team == 1){
            scoreT1++;
            scoreT1Val.innerHTML = scoreT1;
        }
        else{
            scoreT2++;
            scoreT2Val.innerHTML = scoreT2;
        }
    }
    else {
        if(team == 1){
            scoreT1--;
            if(scoreT1 <0){scoreT1 = 0}
            scoreT1Val.innerHTML = scoreT1;
        }
        else{
            scoreT2--;
            if(scoreT2 <0){scoreT2 = 0}
            scoreT2Val.innerHTML = scoreT2;
        }
    }
}

function updatePeriod(increment){
    if(increment){
        period++;
    }
    else{
        period = (period + 5) % 6;
    }
    periodSpan.innerHTML = periods[period%periods.length];
}

function checkUncheck(callerId) {
    if (document.getElementById(callerId).getAttribute('src') == 'Data/assets/emptysadthingy.png') {
        document.getElementById(callerId).setAttribute('src', 'Data/assets/sadthingy.png');
    }
    else {
        document.getElementById(callerId).setAttribute('src', 'Data/assets/emptysadthingy.png');
    }
}

function changeTeamColor(team)
{
    colorIncrement++;
    if(team == scoreT1Span.id){
        scoreT1Span.style.backgroundColor = teamColors[colorIncrement%teamColors.length];
    }
    else{
        scoreT2Span.style.backgroundColor = teamColors[colorIncrement%teamColors.length];
    }
}

var minutes = 0;
var timer = 0;
var timer_running = false;
var spike = null;

function incrementMinutes()
{
    minutes = (minutes + 1) % 16;
    updateMinutes();
}

function decrementMinutes()
{
    minutes = (minutes + 15) % 16;
    updateMinutes();
}

function updateMinutes()
{
    var top = document.getElementById("minutes-top");
    var bottom = document.getElementById("minutes-bottom");
    top.src = "Data/assets/timer_" + minutes + "_top.png";
    bottom.src = "Data/assets/timer_" + minutes + "_bottom.png";
}

function startTimer(seconds)
{
    timer = 60 * minutes + seconds;
    if(timer > 900 | timer < 1)
    {
        minutes = 0;
        timer = 0;
        updateMinutes();
        showQuickTimerStarter();
    }
    else
    {
        showQuickTimerButtons();
        updateTimer();
    }
}

function updateTimer(blinking)
{
    var timer_text = document.getElementById('quick-timer');
    var m = Math.floor(timer / 60);
    if(m < 10)
        m = '0' + m;
    var s = timer % 60;
    if(s < 10)
        s = '0' + s;
    timer_text.innerHTML = m + ":" + s;
    if(blinking){
        timer_text.style.color = '#FF0000';
        timer_text.setAttribute('class','fat-text blinking');
    }
    else{
        timer_text.style.color = '#333333';
        timer_text.setAttribute('class','fat-text');
    }
}

function runTimer()
{
    if (timer_running)
    {
        if(timer > 1)
        {
            timer--;
            updateTimer(false);
            spike = new SpikeTimer(runTimer, 1000);
        }
        else
        {
            timer = 0;
            updateTimer(true);
            timer_running = false;
        }
    }
}

function SpikeTimer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    this.resume = function() {
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}

// this is hideous, but i'm lazy
var period_timer = 90 * 60;
var period_timer_running = false;
var period_spike = null;

function period_updateTimer()
{
    var timer_text = document.getElementById('period-timer');
    var m = Math.floor(period_timer / 60);
    if(m < 10)
        m = '0' + m;
    var s = period_timer % 60;
    if(s < 10)
        s = '0' + s;
    timer_text.innerHTML = m + ":" + s;
}

function period_runTimer()
{
    if (period_timer_running)
    {
        if(period_timer > 1)
        {
            period_timer--;
            period_updateTimer();
            period_spike = new SpikeTimer(period_runTimer, 1000);
        }
        else
        {
            period_timer = 0;
            period_updateTimer();
            period_timer_running = false;
        }
    }
}

function period_incrementMinutes()
{
    // timerButtonStop('period');
    if(period_timer >= 90 * 60)
    {
        period_timer = period_timer%60;
    }
    else
    {
        period_timer = Math.ceil((period_timer + 1) / 300) * 300 + period_timer%60;

    }
    period_updateTimer();
}

function period_decrementMinutes()
{
    // timerButtonStop('period');
    if(period_timer < 300)
    {
        period_timer = 90 * 60 + period_timer%60;
    }
    else
    {
        period_timer = period_timer - 300;
    }
    period_updateTimer();
}

function timerButtonPlay(timer_id)
{
    if(timer_id == 'period')
    {
        if(!period_timer_running)
        {
            period_timer_running = true;
            period_spike = new SpikeTimer(period_runTimer, 1000);
        }
        else
        {
            period_spike.resume();
        }
    }
    else
    {
        if(!timer_running)
        {
            timer_running = true;
            spike = new SpikeTimer(runTimer, 1000);
        }
        else
        {
            spike.resume();
        }
    }
}

function timerButtonPause(timer_id)
{
    if(timer_id == 'period')
    {
        if(period_timer_running)
        {
            period_spike.pause();
            period_timer_running = false;
        }
    }
    else
    {
        if(timer_running)
        {
            spike.pause();
            timer_running = false;
        }
    }
}

function timerButtonStop(timer_id)
{
    if(timer_id == 'period')
    {
        if(period_timer_running)
        {
            period_spike.pause();
        }
        period_timer_running = false;
        // period_timer = 50 * 60;
        period_updateTimer();
    }
    else
    {
        if(timer_running)
        {
            spike.pause();
        }
        timer_running = false;
        timer = 0;
        updateTimer();
        showQuickTimerStarter();
    }
}
