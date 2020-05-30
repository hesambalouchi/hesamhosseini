import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Typography, Button } from '@material-ui/core';



function Cell(props) {
  return (
    <Button onClick={props.click} variant="contained" color="primary" style={{ margin: '4px' }}>
      {props.b[props.i] || '.'}
    </Button>
  )
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      board: ['', '', '', '', '', '', '', '', ''],
      xIsNext: true,
      winner: false
    };
  }

  handle(index) {
    if (this.state.board[index] || this.state.winner)
      return;

    let board = this.state.board.slice();
    board[index] = this.state.xIsNext ? 'O' : 'X';

    let winner = CheckEnd(board);

    this.setState({
      board: board,
      xIsNext: !this.state.xIsNext,
      winner: winner
    });

    return board[index];
  }

  render() {
    return (
      <Grid container alignItems="center" justify="center" direction="column" style={{ minHeight: "100vh" }}>

        <div style={{ width: '220px' }}>
          <Cell i={0} b={this.state.board} click={() => this.handle(0)} />
          <Cell i={1} b={this.state.board} click={() => this.handle(1)} />
          <Cell i={2} b={this.state.board} click={() => this.handle(2)} />
          <Cell i={3} b={this.state.board} click={() => this.handle(3)} />
          <Cell i={4} b={this.state.board} click={() => this.handle(4)} />
          <Cell i={5} b={this.state.board} click={() => this.handle(5)} />
          <Cell i={6} b={this.state.board} click={() => this.handle(6)} />
          <Cell i={7} b={this.state.board} click={() => this.handle(7)} />
          <Cell i={8} b={this.state.board} click={() => this.handle(8)} />
        </div>

        <Typography variant="h4" component="h4">
          {this.state.winner ? `${this.state.winner} won the game` : 'Tik Tak Teo'}
        </Typography>

      </Grid>
    );
  }
}

function CheckEnd(board) {
  let lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  }
}

function render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}

render();