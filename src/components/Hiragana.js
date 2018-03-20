import React, { Component } from 'react';
import Practice from './Practice.js';

const gojuon = [["あ", "い", "う", "え", "お"], ["か", "き", "く", "け", "こ"], ["さ", "し", "す", "せ", "そ"], ["た", "ち", "つ", "て", "と"], ["な", "に", "ぬ", "ね", "の"], ["は", "ひ", "ふ", "へ", "ほ"], ["ま", "み", "む", "め", "も"], ["や", "*", "ゆ", "*", "よ"], ["ら", "り", "る", "れ", "ろ"], ["わ", "*", "*", "*", "を"], ["ん"]];
const gojuonEng = [["a", "i", "u", "e", "o"], ["ka", "ki", "ku", "ke", "ko"], ["sa", "shi", "su", "se", "so"], ["ta", "chi", "tsu", "te", "to"], ["na", "ni", "nu", "ne", "no"], ["ha", "hi", "fu", "he", "ho"], ["ma", "mi", "mu", "me", "mo"], ["ya", "*", "yu", "*", "yo"], ["ra", "ri", "ru", "re", "ro"], ["wa", "*", "*", "*", "wo"], ["n"]];

const dakuon = [["が", "ぎ", "ぐ", "げ", "ご"], ["ざ", "じ", "ず", "ぜ", "ぞ"], ["だ", "じ", "ず", "で", "ど"], ["ば", "び", "ぶ", "べ", "ぼ"]];
const dakuonEng = [["ga", "gi", "gu", "ge", "go"], ["za", "ji", "zu", "ze", "zo"], ["da", "ji", "zu", "de", "do"], ["ba", "bi", "bu", "be", "bo"]];

const yoon = [["きゃ", "きゅ", "きょ"], ["しゃ", "しゅ", "しょ"], ["ちゃ", "ちゅ", "ちょ"], ["にゃ", "にゅ", "にょ"], ["ひゃ", "ひゅ", "ひょ"], ["みゃ", "みゅ", "みょ"], ["りゃ", "りゅ", "りょ"], ["ぎゃ", "ぎゅ", "ぎょ"], ["じゃ", "じゅ", "じょ"], ["ざや", "ぢゅ", "ぢょ"], ["びゃ", "びゅ", "びょ"], ["ぴあ", "ぴゅ", "ぴょ"]];
const yoonEng = [["kya", "kyu", "kyo"], ["sha", "shu", "sho"], ["cha", "chu", "cho"], ["nya", "nyu", "nyo"], ["hya", "hyu", "hyo"], ["mya", "myu", "myo"], ["rya", "ryu", "ryo"], ["gya", "gyu", "gyo"], ["ja", "ju", "jo"], ["ja", "ju", "jo"], ["bya", "byu", "byo"], ["pya", "pyu", "pyo"]];

const hanDokuon = ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"];
const hanDokuonEng = ["pa", "pi", "pu", "pe", "po"];

const gojuonRows = ["a", "ka", "sa", "ra", "na", "ha", "ma", "ya", "ra", "wa"];

var correct = 0;
var wrong = 0;
var progress = 0;
var maxProgress;

var userHiraganaData;

var greenPercent, yellowPercent, redPercent;
var select;
function getHiraganaCount() {
    return userHiraganaData.length;
}

class Hiragana extends Component {
    constructor(props) {
        super();
        this.props = props;
        console.log("Hiragana component");
        console.log(this.props);
        userHiraganaData = this.props.userHiraganaData;
        this.greenPercent = props.greenPercent;
        this.yellowPercent = props.yellowPercent;
        this.redPercent = props.redPercent;
    }

    callback = (newerView) => {
        this.props.callback(newerView);
    }


    componentDidMount() {
        //gojuon
        var gojuonChars = document.getElementById('gojuon_table').getElementsByClassName('character');
        var gojuonCharsEng = document.getElementsByClassName('character_eng');
        var gojuonTable = document.getElementById('gojuon_table');
        for (var i = 0; i < gojuonChars.length; i++) {
            if (gojuonChars[i].innerHTML === '*') {
                gojuonChars[i].innerHTML = '&nbsp';
                gojuonCharsEng[i].innerHTML = '&nbsp';
            }
            var correct = userHiraganaData[0].gojuon[i].timesCorrect;
            var wrong = userHiraganaData[0].gojuon[i].timesWrong;
            var percent;

            if(wrong <= 0 && (correct>0)){
                //if never gotten wrong but HAVE GOTTEN CORRECT AT LEAST ONCE
                percent = 1;
            } else if(correct===0 && (wrong>correct)) {
                //if gotten correct 0 times, but have gotten wrong, mark as yellow
                percent = 0.5;
            } else {
                //else just calculate percent
                percent = (wrong / correct).toFixed(2);
            }
            
            var gojuonChar = gojuonTable.getElementsByClassName('character');

            if (percent >= this.greenPercent) {
                gojuonChar[i].classList.add('good');
            } else if (this.greenPercent >= percent >= this.yellowPercent) {
                gojuonChar[i].classList.add('weak');
            } else if (percent <= this.redPercent) {
                gojuonChar[i].classList.add('bad');
            } else {
                //do not add a class, ie in the case of a 0 right 0 wrong score
                // 0/0
            }
        }
        select = document.getElementById('gojuon_table').getElementsByTagName('tr');
        this.addSelectHighlightGroup(select);
        select = document.getElementById('dakuon_table').getElementsByTagName('tr');
        this.addSelectHighlightGroup(select);
        select = document.getElementById('yoon_table').getElementsByTagName('tr');
        this.addSelectHighlightGroup(select);

        //dakuon
    }
    addSelectHighlightGroup(select) {
        //row 0 is <th>, disregard/Do not highlight
        for (var i = 1; i < select.length; i++) {
            var select_children = select[i].getElementsByClassName('selectable_single');
            for (var j = 0; j < select_children.length; j++) {
                if (select_children[j].getElementsByClassName('character')[0].innerHTML != '&nbsp;') {
                    select_children[j].classList.add('selected_character');
                }
            }
        }
    }
    removeSelectHightightGroup(select) {
        //row 0 is <th>, disregard/Do not highlight
        console.log("remove");
        for (var i = 1; i < select.length; i++) {
            var select_children = select[i].getElementsByClassName('selectable_single');
            for (var j = 0; j < select_children.length; j++) {
                if (select_children[j].getElementsByClassName('character')[0].innerHTML != '&nbsp;') {
                    select_children[j].classList.remove('selected_character');
                }
            }
        }
    }
    /*
                                    {gojuon.map(gojuon => (
                                    <td className='selectable_single' key={gojuon}>
                                        {gojuon}
                                    </td>
                                ))}
                                */

    render() {
        return (
            <div className='col-xl-12'>
                <table className='select_table' id='gojuon_table'>
                    <tbody>
                        <tr>
                            <th className='select_table_header' colSpan="5">Monograph</th>
                        </tr>
                        {gojuon.map((gojuon, index) => (
                            <tr key={index}>
                                {gojuon.map((gojuon, sIndex) => (
                                    <td className='selectable_single' key={gojuon}><span className='character'>{gojuon}</span><br /><span className='character_eng'>{gojuonEng[index][sIndex]}</span></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <table className='select_table' id='dakuon_table'>
                    <tbody>
                        <tr>
                            <th className='select_table_header' colSpan="5">Diactric</th>
                        </tr>
                        {dakuon.map((dakuon, index) => (
                            <tr key={index}>
                                {dakuon.map((dakuon, sIndex) => (
                                    <td className='selectable_single' key={dakuon}><span className='character'>{dakuon}</span><br /><span className='character_eng'>{dakuonEng[index][sIndex]}</span></td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td className='selectable_single' ><span className='character'>{hanDokuon[0]}</span><br /><span className='character_eng'>{hanDokuonEng[0]}</span></td>
                            <td className='selectable_single' ><span className='character'>{hanDokuon[1]}</span><br /><span className='character_eng'>{hanDokuonEng[1]}</span></td>
                            <td className='selectable_single' ><span className='character'>{hanDokuon[2]}</span><br /><span className='character_eng'>{hanDokuonEng[2]}</span></td>
                            <td className='selectable_single' ><span className='character'>{hanDokuon[3]}</span><br /><span className='character_eng'>{hanDokuonEng[3]}</span></td>
                            <td className='selectable_single' ><span className='character'>{hanDokuon[4]}</span><br /><span className='character_eng'>{hanDokuonEng[4]}</span></td>
                        </tr>
                    </tbody>
                </table>

                <table className='select_table' id='yoon_table'>
                    <tbody>
                        <tr>
                            <th className='select_table_header' colSpan="5">Diagraph</th>
                        </tr>
                        {yoon.map((yoon, index) => (
                            <tr key={index}>
                                {yoon.map((yoon, sIndex) => (
                                    <td className='selectable_single' key={yoon}><span className='character'>{yoon}</span><br /><span className='character_eng'>{yoonEng[index][sIndex]}</span></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>


        )
    }
}


export default Hiragana;