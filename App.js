/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { questions } from './Question';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    paddingTop: 20,
    height: 60,
    backgroundColor: '#E4F1FE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      randQuestions: [],
      seletedAnswer: [],
      isanswered: false,
    }
  }

  componentDidMount() {
    this.randomQuestions();
  }

  submitAnswer() {
    let cntAns = 0;
    let cntPoint = 0;
    this.state.randQuestions.map((question) => {
      if (question.seleted != -1) {
        cntAns++;
      }

      rs = question.answer[question.seleted];
      if (rs != undefined) {
        if (question.answer[question.seleted].result == true) {
          cntPoint++;
        }
      }

    });

    if (cntAns == 10) {
      alert(`คุณทำได้ ${cntPoint} คะแนน`);
      this.setState({ isanswered: true });
    }
    else {
      alert('กรุณาตอบให้ครบทุกข้อ');
    }
  }

  randomQuestions() {
    let arr = this.shuffleArray(questions.sample);
    // reset answer selected
    arr.map((q) => {
      q.seleted = -1;
    })
    this.setState({ isanswered: false, randQuestions: arr.slice(0, 10) });
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  renderQuestions = () => {
    let listQuestion = this.state.randQuestions.map((question, index) => {
      return (
        <View key={`qa-${index}`} >
          <Question title={question.title} index={index} />
          <View style={{ flexDirection: 'column', padding: 5 }}>
            {this.renderAnswers(index, question.answer, question.seleted)}
          </View>
        </View>
      )
    });

    return listQuestion;
  }

  onquestionchech(questionIndex, answersIndex) {

    this.state.randQuestions[questionIndex].seleted = answersIndex;
    this.setState({ ...this.state.randQuestions, [questionIndex]: this.state.randQuestions[questionIndex] });

  }

  renderAnswers = (questionIndex, answers, seleted) => {

    let listAnswers = answers.map((answer, index) => {
      return (
        <TouchableOpacity key={`ans-${index}`} onPress={() => this.onquestionchech(questionIndex, index)}>
          <View style={{ padding: 10 }}>
            <Text style={{ color: answer.result && this.state.isanswered ? 'green' : 'black' }}>[{seleted == index ? 'X' : ' '}]{answer.title}</Text>
          </View>
        </TouchableOpacity>
      )
    });

    return listAnswers;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ fontSize: 16 }}>10 Questions</Text>
        </View>
        <Button title={'reset question'} onPress={this.randomQuestions.bind(this)} />
        <ScrollView style={{ flex: 1 }}>
          <View>
            {this.renderQuestions()}
          </View>
          <Button title={'submit answer'} onPress={this.submitAnswer.bind(this)} />
        </ScrollView>
      </View>
    );
  }
}

class Question extends Component {
  render() {
    return (<View style={{ backgroundColor: '#eee' }}>
      <Text style={{ color: '#000', padding: 10, fontWeight: 'bold' }}>{this.props.index + 1}) {this.props.title}</Text>
    </View>
    );
  }
}


