import React, { Component } from 'react';
import Practice from './Practice.js';
import hiraganaData from './hiragana.json';

const gojuon = [["あ", "い", "う", "え", "お"], ["か", "き", "く", "け", "こ"], ["さ", "し", "す", "せ", "そ"], ["た", "ち", "つ", "て", "と"], ["な", "に", "ぬ", "ね", "の"], ["は", "ひ", "ふ", "へ", "ほ"], ["ま", "み", "む", "め", "も"], ["や", "*", "ゆ", "*", "よ"], ["ら", "り", "る", "れ", "ろ"], ["わ", "*", "*", "*", "を"], ["ん"]];
const gojuonEng = [["a", "i", "u", "e", "o"], ["ka", "ki", "ku", "ke", "ko"], ["sa", "shi", "su", "se", "so"], ["ta", "chi", "tsu", "te", "to"], ["na", "ni", "nu", "ne", "no"], ["ha", "hi", "fu", "he", "ho"], ["ma", "mi", "mu", "me", "mo"], ["ya", "*", "yu", "*", "yo"], ["ra", "ri", "ru", "re", "ro"], ["wa", "*", "*", "*", "wo"], ["n"]];

const dakuon = [["が", "ぎ", "ぐ", "げ", "ご"], ["ざ", "じ", "ず", "ぜ", "ぞ"], ["だ", "じ", "ず", "で", "ど"], ["ば", "び", "ぶ", "べ", "ぼ"]];
const dakuonEng = [["ga", "gi", "gu", "ge", "go"], ["za", "ji", "zu", "ze", "zo"], ["da", "ji", "zu", "de", "do"], ["ba", "bi", "bu", "be", "bo"]];

const yoon = [["きゃ", "きゅ", "きょ"], ["しゃ", "しゅ", "しょ"], ["ちゃ", "ちゅ", "ちょ"], ["にゃ", "にゅ", "にょ"], ["ひゃ", "ひゅ", "ひょ"], ["みゃ", "みゅ", "みょ"], ["りゃ", "りゅ", "りょ"], ["ぎゃ", "ぎゅ", "ぎょ"], ["じゃ", "じゅ", "じょ"], ["ざや", "ぢゅ", "ぢょ"], ["びゃ", "びゅ", "びょ"], ["ぴあ", "ぴゅ", "ぴょ"]];
const yoonEng = [["kya", "kyu", "kyo"], ["sha", "shu", "sho"], ["cha", "chu", "cho"], ["nya", "nyu", "nyo"], ["hya", "hyu", "hyo"], ["mya", "myu", "myo"], ["rya", "ryu", "ryo"], ["gya", "gyu", "gyo"], ["ja", "ju", "jo"], ["ja", "ju", "jo"], ["bya", "byu", "byo"], ["pya", "pyu", "pyo"]];

const hanDokuon = ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"];
const hanDokuonEng = ["pa", "pi", "pu", "pe", "po"];
/*
var allJson = [];
var gojuonJson = [];
var dakuonJson = [];
var yoonJson = [];
var hanDokuonJson = [];
for(var i=0; i<gojuon.length; i++){
    for(var j=0; j<gojuon[i].length; j++){
        var dataItem = {hiragana:gojuon[i][j],eng:gojuonEng[i][j],timesCorrect:0,timesWrong:0};
        gojuonJson.push(dataItem);
    }
}
for(var i=0; i<dakuon.length; i++){
    for(var j=0; j<dakuon[i].length; j++){
        var dataItem = {hiragana:dakuon[i][j],eng:dakuonEng[i][j],timesCorrect:0,timesWrong:0};
        dakuonJson.push(dataItem);
    }
}
for(var i=0; i<yoon.length; i++){
    for(var j=0; j<yoon[i].length; j++){
        var dataItem = {hiragana:yoon[i][j],eng:yoonEng[i][j],timesCorrect:0,timesWrong:0};
        yoonJson.push(dataItem);
    }
}
for(var i=0; i<hanDokuon.length; i++){
    for(var j=0; j<hanDokuon[i].length; j++){
        var dataItem = {hiragana:hanDokuon[i][j],eng:hanDokuonEng[i][j],timesCorrect:0,timesWrong:0};
        hanDokuonJson.push(dataItem);
    }
}
allJson.push({gojuon:gojuonJson});
allJson.push({dakoon:dakuonJson});
allJson.push({yoon:yoonJson});
allJson.push({hanDokuon:hanDokuonJson});
console.log(allJson);
*/

//set user's data to defaults if local storage does not exist
if (localStorage.getItem('hiraganaData') === null) {
    localStorage.setItem('hiraganaData', JSON.stringify(hiraganaData));
}
//set user data from local storage
var userHiraganaData = JSON.parse(localStorage.getItem('hiraganaData'));
console.log(userHiraganaData);
var userGojuonData = userHiraganaData[0];

var hiraganaProgress = 0;
var katakanaProgress = 0;

var greenPercent = 0.75;
var yellowPercent = 0.5;
var redPercent = 0.25;

var gojuonProgress = 0;
var dakuonProgress = 0;
var yoonProgress = 0;
var hanDokuonPrgress = 0;

var percents = [];
for (var i = 0; i < userGojuonData.gojuon.length; i++) {
    var timesCorrect = userGojuonData.gojuon[i].timesCorrect;
    var timesWrong = userGojuonData.gojuon[i].timesWrong;
    var percent;
    if (timesWrong === 0 && timesCorrect === 0) {
        percent = 0;
    } else if (timesWrong === 0 && timesCorrect > 0) {
        percent = 1;
    } else {
        //round to 2 decimal places
        percent = (timesWrong / timesCorrect).toFixed(2);
        if (percent >= greenPercent) {
            percent = 1;
        } else if (greenPercent >= percent >= yellowPercent) {
            percent = 0.5;
        } else {
            percent = percent;
        }
        console.log(percent);
    }
    percents.push(percent);
}
var sum = 0;
for (var i = 0; i < percents.length; i++) {
    sum += parseFloat(percents[i]);
}
gojuonProgress = (sum / percents.length).toFixed(2);
console.log(gojuonProgress);


hiraganaProgress = (((gojuonProgress + dakuonProgress + yoonProgress + hanDokuonPrgress) / 4) * 100).toFixed(2);


class Home extends Component {


    constructor(props) {
        super();
        this.props = props;
    }

    callback = (newerView) => {
        this.props.callback(newerView);
    }

    resetScores(){
        localStorage.setItem('hiraganaData', JSON.stringify(hiraganaData));
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xl-12"><h1>Home</h1></div>
                </div>
                <div className="row" id="progressInfo">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-3">
                        <div className="progressInfo" id="leftProgress" onClick={e => this.props.callback(<Practice callback={this.callback} mode='0' greenPercent={greenPercent} yellowPercent={yellowPercent} redPercent={redPercent} userHiraganaData={userHiraganaData}/>)}>Hiragana
                                 <div className="Progress">
                                <progress max="100" value={hiraganaProgress} className="Progress-main">
                                    <div className="Progress-bar" role="presentation">
                                        <span className="Progress-value" > </span>
                                    </div>
                                </progress>
                                <span className="Progress-label">Progress: <strong>{hiraganaProgress}%</strong></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className = "progressInfo" id="rightProgress" onClick={e => this.props.callback(<Practice callback={this.callback}  mode='1' greenPercent={greenPercent} yellowPercent={yellowPercent} redPercent={redPercent} userHiraganaData={userHiraganaData}/>)}>Katakana
                            <div className="Progress">
                                <progress max="100" value={katakanaProgress} className="Progress-main">
                                    <div className="Progress-bar" role="presentation">
                                        <span className="Progress-value" > </span>
                                    </div>
                                </progress>
                                <span className="Progress-label">Progress: <strong>{katakanaProgress}%</strong></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
                <div className="row" id="devRow">
                    <div className="col-xs-12">
                        <button onclick={this.resetScores()} >RESET SCORES</button>
                    </div>
                </div>
            </div>

        );
    }
}

export default Home;