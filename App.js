/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,

} from 'react-native';




export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      board: [['', '', ''], ['', '', ''], ['', '', '']],
      player_turn: 'X',
      available: []
    };
  }


  calculateWinner = (squares) => {
    let winner = null;
    let board = this.state.board
    for (let i = 0; i < 3; i++) {
      if (board[i][0] != '' && board[i][0] == board[i][1] && board[i][0] == board[i][2]) {

        winner = `Winner is:${board[i][0]}`
      }
    }
    for (let i = 0; i < 3; i++) {
      if (board[0][i] != '' && board[0][i] == board[1][i] && board[0][i] == board[2][i]) {
        winner = `Winner is:${board[0][i]}`
      }
    }
    if (board[0][0] != '' && board[0][0] == board[1][1] && board[2][2] == board[0][0]) {

      winner = `Winner is:${board[0][0]}`
    }
    if (board[2][0] != '' &&board[2][0] == board[1][1] && board[1][1] == board[0][2]) {

      winner = `Winner is:${board[0][2]}`
    }
    if (winner == null && this.state.available.length == 9) {
      winner = 'Its a tie'
    }
    return winner
  }
  onBoxClicked = (i, j) => {
    let board = this.state.board
    let player_turn = this.state.player_turn;
    let available = this.state.available
    if (board[i][j] == '') {
      board[i][j] = player_turn
      player_turn = player_turn === 'X' ? 'O' : 'X'
      available.push(board[i][j])
      this.setState({ board: board, player_turn: player_turn, available: available })
    }
  }
  newGame = () => {
    this.setState({
      board: [['', '', ''], ['', '', ''], ['', '', '']],
      player_turn: 'X',
      available: []

    })
  }

  render() {
    let result = this.calculateWinner();

    return (
      <View style={styles.main}>
        <Text style={{ fontSize: 40, marginBottom: 10,color:result?'yellow':'white' }}>{result != null ? result : `Next player is:${this.state.player_turn}`}</Text>
        <View style={{ backgroundColor: 'white', height: 300, width: 300 }}>
          <View style={{ flexDirection: 'row', flex: 1, flexWrap: 'wrap' }}>
            {this.state.board.map((item, index) => {
              return (
                item.map((innerItem, innerIndex) => {
                  return (<TouchableOpacity onPress={(item, innerItem) => this.onBoxClicked(index, innerIndex)}
                    style={{ borderColor: 'black', borderWidth: 3, height: 100, width: 100, justifyContent: 'center', alignItems: 'center' }}
                    activeOpacity={1}
                    disabled={result!=null}
                  >
                    <Text style={{ fontSize: 40 }}>{innerItem}</Text>
                  </TouchableOpacity>
                  )
                }))
            })}

          </View>

        </View>
        <TouchableOpacity onPress={this.newGame} style={{ marginTop: 30, backgroundColor: 'white', borderWidth: 3, height: 60, width: 200, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}><Text>New game</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#6565fc',
    alignItems: 'center'
  },

});