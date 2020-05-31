import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Typography, Button, Fab } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';


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

  reset() {
    this.setState({
      board: ['', '', '', '', '', '', '', '', ''],
      xIsNext: true,
      winner: false
    });
  }

  render() {
    return (
      <Grid container alignItems="center" justify="center" direction="column" style={{ minHeight: "100vh" }}>
        <Fab onClick={() => { this.reset(); }} color="primary" aria-label="add" style={{ position: "absolute", bottom: '15px', left: '15px' }}>
          <RefreshIcon />
        </Fab>
        <Typography variant="h6" component="h6">
          {this.state.winner ? `${this.state.winner} won the game` : this.state.xIsNext ? "O turn :" : "X turn :"}
        </Typography>
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
