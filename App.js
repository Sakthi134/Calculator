import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import InputNumberButton from './InputNumberButton';

const buttons = [
  ['AC', '⌫ ', '²', '%'],
  ['7', '8', '9', '/'],
  ['4', '5', '6', 'x'],
  ['1', '2', '3', '-'],
  ['.', '0', '=', '+'],
];

export default class App extends Component {
  constructor() {
    super();
    this.initialState = {
      displayValue: '',
      operator: null,
      firstValue: '',
      secondValue: '',
      nextValue: false,
    };
    this.state = this.initialState;
  }

  renderButtons() {
    let layouts = buttons.map((buttonsRows, index) => {
      let rowItem = buttonsRows.map((buttonsIteams, buttonIndex) => {
        return (
          <InputNumberButton
            value={buttonsIteams}
            handleOnPress={this.handleInput.bind(this.buttonsIteams)}
            key={'btn-' + buttonIndex}
          />
        );
      });
      return (
        <View style={styles.inputRow} key={'row-' + index}>
          {rowItem}
        </View>
      );
    });
    return layouts;
  }

  handleInput = input => {
    const {displayValue, operator, firstValue, secondValue, nextValue} =
      this.state;

    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.setState({
          displayValue: displayValue === '0' ? input : displayValue + input,
        });
        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input,
          });
        } else {
          this.setState({
            secondValue: secondValue + input,
          });
        }
        break;
      case '+':
      case '-':
      case 'x':
      case '/':
      case '²':
      case '%':
        this.setState({
          nextValue: true,
          operator: input,
          displayValue:
            (operator !== null
              ? displayValue.substring(0, displayValue.length - 1)
              : displayValue) + input,
        });
        break;

      case '.':
        let dot = displayValue.toString().slice(-1);
        this.setState({
          displayValue: dot !== '.' ? displayValue + input : displayValue,
        });
        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input,
          });
        } else {
          this.setState({
            secondValue: secondValue + input,
          });
        }
        break;
      case '=':
        let formatOperator =
          operator == 'x'
            ? '*'
            : operator == '/'
            ? '/' //Q
            : operator == '²'
            ? '**'
            : operator == '%'
            ? '%' //R
            : operator;
        let result = eval(firstValue + formatOperator + secondValue);
        let temp = result;

        this.setState({
          displayValue: temp,
          firstValue: result,
          secondValue: '',
          operator: null,
          nextValue: false,
        });

        break;
      case 'AC':
        this.setState(this.initialState);
        break;

      case '⌫ ':
        let string = displayValue.toString();
        let deletestring = string.substring(0, string.length - 1);
        let length = string.length;
        this.setState({
          displayValue: length == 1 ? '' : deletestring,
          firstValue: length == 1 ? '' : deletestring,
        });
        break;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{this.state.displayValue}</Text>
        </View>

        <View style={styles.inputContainer}>{this.renderButtons()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultContainer: {
    flex: 5,
    justifyContent: 'flex-end',
    backgroundColor: 'black',
  },
  inputContainer: {
    flex: 8,
    backgroundColor: '#73C750',
  },
  resultText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
  },
});
