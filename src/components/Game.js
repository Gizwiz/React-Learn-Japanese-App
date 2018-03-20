import React, { Component } from 'react';
import Practice from './Practice.js';

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
var hira, kata;
var questions = {};
var questionDisplay = document.getElementById('question_display');
var questionAnswer = "";
var attempts = 0;
var userHiraganaData;
//<button onClick={e => this.props.callback(<Home callback={this.callback} />)}>Home</button>
class Game extends Component {

    constructor(props) {
        super();
        this.props = props;
        this.state = {
            q: 0,
            questions: [],
            correct: 0,
            wrong: 0
        }
        this.buildQuestionSet = this.buildQuestionSet.bind(this);
        userHiraganaData = this.props.userHiraganaData;
        console.log(userHiraganaData);
    }

    callback = (newerView) => {
        this.props.callback(newerView);
    }

    componentDidMount() {
        this.buildQuestionSet(this.props.gameData.hiragana, this.props.gameData.katakana);
        this.startGame();
        //enter key press

        document.getElementById('user_answer').focus();
    }

    buildQuestionSet(hiragana, katakana) {
        var char;
        var engChar;
        if (hiragana.monograph) {
            for (var i = 0; i < this.props.userHiraganaData[0].gojuon.length; i++) {
                char = this.props.userHiraganaData[0].gojuon[i].hiragana;
                engChar = this.props.userHiraganaData[0].gojuon[i].eng;
                if (char === '*') {
                    continue;
                } else {
                    this.state.questions.push({ char: char, engChar: engChar, type: "hiragana", subType: "monograph" });
                }
            }
        }

        if (hiragana.diactric) {

        }

        if (hiragana.diagraph) {

        }

        if (katakana.monograph) {

        }

        if (katakana.diactric) {

        }

        if (katakana.diagraph) {

        }

        //shuffle questions
        this.setState({ questions: this.shuffle(this.state.questions) });

    }

    startGame() {
        console.log(this.state.questions);
        //start timer
        //display first question, starts at q=0 ends at this.state.questions.length-1
        this.displayQuestion(this.state.q);
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.submitAnswer();
        }
    }

    submitAnswer() {
        var userAnswer = document.getElementById('user_answer').value;
        console.log("User gave answer: " + userAnswer + ". Correct answer is: " + questionAnswer);
        if (userAnswer === questionAnswer) {
            var nq = this.state.q + 1
            this.state.q++;
            this.setState({ q: this.state.q });
            this.displayQuestion(this.state.q);
            document.getElementById('ansCheat').innerHTML = "LOL CHEATER";
            document.getElementById('ansCheat').classList.add('hidden');
            this.markCorrect(this.state.questions[this.state.q - 1]);
        } else {
            this.markWrong(this.state.questions[this.state.q]);
        }
        this.saveScores();
        document.getElementById('user_answer').value = "";
        document.getElementById('user_answer').focus();
    }

    displayQuestion(q) {
        if (q < this.state.questions.length) {
            // console.log(this.state.questions[this.state.q]);
            document.getElementById('question_display').innerHTML = this.state.questions[q].char;
            questionAnswer = this.state.questions[this.state.q].engChar;
        }
    }

    displayHelp() {
        if (document.getElementById('ansCheat').classList.contains('hidden')) {
            document.getElementById('ansCheat').innerHTML = this.state.questions[this.state.q].engChar;
            document.getElementById('ansCheat').classList.remove('hidden');
            document.getElementById('user_answer').focus();
            this.markWrong(this.state.questions[this.state.q]);
        }
    }

    markCorrect(question) {
        if (attempts === 0) {
            var cor = this.state.correct + 1;
            this.setState({ correct: cor });
            if (question.type === "hiragana") {
                //if type is hiragana=save to userHiraganaData
                if (question.subType === "monograph") {
                    for (var i = 0; i < userHiraganaData[0].gojuon.length; i++) {
                        if (userHiraganaData[0].gojuon[i].hiragana === question.char) {
                            userHiraganaData[0].gojuon[i].timesCorrect++;
                        }
                    }
                }

            } else if (question.type === "katakana") {
                //else if type is katakan= save to userKatakanaData

            } else {
                console.log("Question " + question + " Does not have a type set");
            }

        } else {

        }
        attempts = 0;
    }

    markWrong(question) {
        console.log("Marking question " + question.char + " as Wrong");
        attempts++;
        //if wrong ONCE, mark the user's data as gotten wrong ONE TIME
        //Multiple wrong guesses will only result in one wrong mark
        if (attempts === 1) {
            var wro = this.state.wrong + 1;
            this.setState({ wrong: wro });

            if (question.type === "hiragana") {
                //if type is hiragana=save to userHiraganaData
                if (question.subType === "monograph") {
                    for (var i = 0; i < userHiraganaData[0].gojuon.length; i++) {
                        if (userHiraganaData[0].gojuon[i].hiragana === question.char) {
                            userHiraganaData[0].gojuon[i].timesWrong++;
                        }
                    }
                }

            } else if (question.type === "katakana") {
                //else if type is katakan= save to userKatakanaData

            } else {
                console.log("Question " + question + " Does not have a type set");
            }
        } else {
            //keep counting the game score. Does not write into into user data
            var wro = this.state.wrong + 1;
            this.setState({ wrong: wro });
        }

    }

    saveScores() {
        localStorage.setItem('hiraganaData', JSON.stringify(userHiraganaData));
    }

    //Fisher-Yates shuffle, randomize question order
    shuffle(questions) {
        var currentIndex = questions.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = questions[currentIndex];
            questions[currentIndex] = questions[randomIndex];
            questions[randomIndex] = temporaryValue;
        }

        return questions;
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xl-12 top_bar">
                        <button onClick={e => this.props.callback(<Practice callback={this.callback} mode={0} userHiraganaData={userHiraganaData} />)}>Back</button>
                    </div>
                </div>
                <div className="row scoreBar">
                    <div className="col-xl-4">
                        <p>Wrong:{this.state.wrong}</p>
                    </div>
                    <div className="col-xl-4">
                        {this.state.q}/{this.state.questions.length}
                    </div>
                    <div className="col-xl-4">
                        <p>Correct:{this.state.correct}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12 q_card">
                        <span id="question_display"></span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12 hidden" id="ansCheat">LOL CHEATER</div>
                </div>
                <div className="row">
                    <div className="col-xl-12 answerInput">
                        <input name="answer" id="user_answer" placeholder="Answer" type="text" onKeyPress={this._handleKeyPress} />
                        <button className="gameButton" id="submit_answer_button" onClick={e => this.submitAnswer()}>Submit</button>
                        <button className="gameButton" id="help_button" onClick={e => this.displayHelp()}>?</button>
                    </div>

                </div>

            </div>
        );
    }
}

export default Game;