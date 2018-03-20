import React, { Component } from 'react';
import Home from './Home.js';
import Game from './Game.js';
import Hiragana from './Hiragana.js';
import Katakana from './Katakana.js';

//h = hiragana
//mono = monograph
//diac = diactric
//diag = diagraph
var hmonoLength, hdiacLength, hdiagLength;

var selectedAmount;
var selected;

var monograph, diactric, diagraph;
var userHiraganaData;

var greenPercent = 0.75;
var yellowPercent = 0.5;
var redPercent = 0.25;

class Practice extends Component {

    constructor(props) {
        super();
        this.props = props;
        userHiraganaData = this.props.userHiraganaData;
        this.state = {
            b: false,
            view: '',
            selectedAmount: 0,
            maxAmount: 0,
            selected: {
                hiragana: {
                    monograph: true,
                    diactric: true,
                    diagraph: true
                },
                katakana: {
                    monograph: false,
                    diactric: false,
                    diagraph: false
                }
            }
        }

        this.hmonoLength = userHiraganaData[0].gojuon.length;
        this.hdiacLength = userHiraganaData[1].dakoon.length + userHiraganaData[3].hanDokuon.length; //diactric = dakoon+hanDokuon
        this.hdiagLength = userHiraganaData[2].yoon.length;

        this.monograph = userHiraganaData[0].gojuon;
        this.diactric = userHiraganaData[1].dakoon;
        this.diagraph = userHiraganaData[2].yoon;

        for (var i = 0; i < userHiraganaData[3].hanDokuon.length; i++) {
            this.diactric.push(userHiraganaData[3].hanDokuon[i]);
        }

        this.state.maxAmount = this.hmonoLength + this.hdiacLength + this.hdiagLength
        this.state.selectedAmount = this.state.maxAmount;
        //this.setMode.bind = this.setMode(this);
    }

    callback = (newerView) => {
        this.props.callback(newerView);
    }

    /*
       setSelected = (selections) => {
           console.log(selections);
       }
   */
    componentDidMount() {
        var mode = this.props.mode;
        //this.props.mode should be a string
        //if statement needs to be true
        //if is not a number(string) is false will return true
        if (!isNaN(this.props.mode)) {
            mode = parseInt(mode);
        }
        this.setMode(mode);
        this.setState({ b: true });
        document.getElementById('time_range').value = 0;
    }

    setMode(mode) {
        this.setState({ b: false });
        switch (mode) {
            case 0:
                this.view = <Hiragana greenPercent={greenPercent} yellowPercent={yellowPercent} redPercent={redPercent} userHiraganaData={userHiraganaData}/>
                document.getElementById('amount_range').max = this.state.maxAmount;
                document.getElementById('amount_range').value = this.state.maxAmount;
                var selects = document.getElementById('select_practice_settings_hiragana').getElementsByTagName('input');
                for (var i = 0; i < selects.length; i++) {
                    selects[i].checked = true;
                }
                break;
            case 1:
                this.view = <Katakana greenPercent={greenPercent} yellowPercent={yellowPercent} redPercent={redPercent} />
                break;
            default:
                break;
        }

    }

    setSelectedAmount() {
        this.setState({ selectedAmount: document.getElementById('amount_range').value });
        //this.state.selectedAmount = document.getElementById('amount_range').value;
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
        for (var i = 1; i < select.length; i++) {
            var select_children = select[i].getElementsByClassName('selectable_single');
            for (var j = 0; j < select_children.length; j++) {
                if (select_children[j].getElementsByClassName('character')[0].innerHTML != '&nbsp;') {
                    select_children[j].classList.remove('selected_character');
                }
            }
        }
    }

    setSelected(selection) {
        var hiragana_boxes = document.getElementById('select_practice_settings_hiragana').getElementsByTagName('input');
        var katakana_boxes = document.getElementById('select_practice_settings_katakana').getElementsByTagName('input');

        var select;

        switch (selection) {
            case 0:
                select = document.getElementById('gojuon_table').getElementsByTagName('tr');
                if (hiragana_boxes[0].checked == true) {
                    this.setState({ selectedAmount: this.state.selectedAmount += this.hmonoLength, maxAmount: this.state.maxAmount += this.hmonoLength });
                    this.state.selected.hiragana.monograph = true;
                    this.addSelectHighlightGroup(select);
                } else {
                    this.setState({ selectedAmount: this.state.selectedAmount -= this.hmonoLength, maxAmount: this.state.maxAmount -= this.hmonoLength });
                    this.state.selected.hiragana.monograph = false;
                    this.removeSelectHightightGroup(select);
                }
                break;
            case 1:
                select = document.getElementById('dakuon_table').getElementsByTagName('tr');
                if (hiragana_boxes[1].checked == true) {
                    this.setState({ selectedAmount: this.state.selectedAmount += this.hdiacLength, maxAmount: this.state.maxAmount += this.hdiacLength });
                    this.state.selected.hiragana.diactric = true;
                    this.addSelectHighlightGroup(select);
                } else {
                    this.setState({ selectedAmount: this.state.selectedAmount -= this.hdiacLength, maxAmount: this.state.maxAmount -= this.hdiacLength });
                    this.state.selected.hiragana.diactric = false;
                    this.removeSelectHightightGroup(select);
                }
                break;
            case 2:
                select = document.getElementById('yoon_table').getElementsByTagName('tr');
                if (hiragana_boxes[2].checked == true) {
                    this.setState({ selectedAmount: this.state.selectedAmount += this.hdiagLength, maxAmount: this.state.maxAmount += this.hdiagLength });
                    this.state.selected.hiragana.diagraph = true;
                    this.addSelectHighlightGroup(select);
                } else {
                    this.setState({ selectedAmount: this.state.selectedAmount -= this.hdiagLength, maxAmount: this.state.maxAmount -= this.hdiagLength });
                    this.state.selected.hiragana.diactric = false;
                    this.removeSelectHightightGroup(select);
                }
                break;
            case 3:
                if (katakana_boxes[0].checked == true) {
                    this.setState({ selectedAmount: this.state.selectedAmount += this.hmonoLength, maxAmount: this.state.maxAmount += this.hmonoLength });
                    this.state.selected.hiragana.monograph = true;
                } else {
                    this.setState({ selectedAmount: this.state.selectedAmount -= this.hmonoLength, maxAmount: this.state.maxAmount -= this.hmonoLength });
                    this.state.selected.hiragana.monograph = false;
                }
                break;
            case 4:
                break;
            case 5:
                break;
            default:
                break;

        }

        if (this.state.selectedAmount < 0) {
            this.setState({ selectedAmount: 0 });
        }
        if (this.state.selectedAmount > this.state.maxAmount) {
            this.setState({ selectedAmount: this.state.maxAmount })
        }
        document.getElementById('amount_range').value = this.state.selectedAmount;
    }

    //e => this.props.callback(<Katakana callback={this.callback})
    render() {
        return (
            <div className="container-fluid">
                <div className="row top_bar">
                    <div className="col-6">
                        <button onClick={e => this.props.callback(<Home callback={this.callback} />)}>Home</button>
                    </div>
                    <div className="col-6">
                        <button onClick={e => this.props.callback(<Game callback={this.callback} userHiraganaData={userHiraganaData} gameData={this.state.selected} selectedAmount = {this.state.selectedAmount} />)}>Practice</button>
                    </div>
                </div>
                <div className="row select_top">
                    <div className="col-4"></div>
                    <div className="col-2">
                        <div id="select_practice_settings_hiragana">
                            <h2>Hiragana</h2>
                            <div className="row" id="practice_monograph">
                                <div className="col-6 practice_choice_descirpition">
                                    Monograph
                                    </div>
                                <div className="col-6 practice_choice_toggle">
                                    <label className="switch">
                                        <input type="checkbox" onChange={e => this.setSelected(0)} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="row" id="practice_diactric">
                                <div className="col-6 practice_choice_descirpition">
                                    Diactric
                            </div>
                                <div className="col-6 practice_choice_toggle">
                                    <label className="switch">
                                        <input type="checkbox" onChange={e => this.setSelected(1)} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="row" id="practice_Diagraph">
                                <div className="col-6 practice_choice_descirpition">
                                    Diagraph
                            </div>
                                <div className="col-6 practice_choice_toggle">
                                    <label className="switch">
                                        <input type="checkbox" onChange={e => this.setSelected(2)} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div id="select_practice_settings_katakana">
                            <h2>Katakana</h2>
                            <div className="row" id="practice_monograph">
                                <div className="col-6 practice_choice_descirpition">
                                    Monograph
                                    </div>
                                <div className="col-6 practice_choice_toggle">
                                    <label className="switch">
                                        <input type="checkbox" onChange={e => this.setSelected(3)} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="row" id="practice_diactric">
                                <div className="col-6 practice_choice_descirpition">
                                    Diactric
                            </div>
                                <div className="col-6 practice_choice_toggle">
                                    <label className="switch">
                                        <input type="checkbox" onChange={e => this.setSelected(4)} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="row" id="practice_Diagraph">
                                <div className="col-6 practice_choice_descirpition">
                                    Diagraph
                            </div>
                                <div className="col-6 practice_choice_toggle">
                                    <label className="switch">
                                        <input type="checkbox" onChange={e => this.setSelected(5)} />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4"></div>
                </div>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4" id="show_selected">
                        <span id="display_selected_amount">Amount of characters selected: {this.state.selectedAmount}</span>
                        <input id="amount_range" className="input_range" type="range" onChange={e => this.setSelectedAmount()} min="0" max={this.state.maxAmount} value={this.state.selectedAmount} />
                    </div>
                    <div className="col-4"></div>
                </div>
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4" id="show_selected">
                        <input id="time_range" className="input_range" type="range" onChange={e => this.setSelectedAmount()} min="0" max="11" />
                    </div>
                    <div className="col-4"></div>
                </div>
                <div className="row select_middle">
                    <div className="col-6">
                        <div className="select_mode" id="hiragana_select" onClick={e => this.setMode(0)}>Hiragana</div>
                    </div>
                    <div className="col-6">
                        <div className="select_mode" id="katakana_select" onClick={e => this.setMode(1)}>Katakana</div>
                    </div>
                </div>
                {/*Draw hiragana/katakana table*/}
                <div className="row select_bottom">
                    <div className="col-12">
                        {(this.state.b) ? this.view : this.view}
                    </div>
                </div>
                <div className="row select_bottom">
                    <div className="col-12">
                    </div>
                </div>
            </div>
        );
    }
}

export default Practice;