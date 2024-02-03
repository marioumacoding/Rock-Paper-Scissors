    const moves = ["✊","✋","✌️"];
    // Default score object, initialized from local storage if available
    let score = JSON.parse(localStorage.getItem('score')) || {
      Wins: 0,
      Loses: 0,
      Ties: 0
    };

    // Display the updated score on page load
    updateScore();

    // Function to handle a game round
    function playGame(userMove) {
      // Determine the computer's move randomly
      const computerMove = pickComputerMove();

      // Determine the winner of the round
      let winner = '';
      if (computerMove === userMove) {
        winner = 'Tie';
        score.Ties++;
      } else if (
        (computerMove === '✊' && userMove === '✋') ||
        (computerMove === '✋' && userMove === '✌️') ||
        (computerMove === '✌️' && userMove === '✊')
      ) {
        winner = 'You';
        score.Wins++;
      } else {
        winner = 'Computer';
        score.Loses++;
      }
      // Display the game result and moves
      const result = winner === 'You' ? 'You win!' : winner === 'Computer' ? 'You lose.' : 'Tie.';
      const moves = `You${userMove}${computerMove}Computer`;
      document.querySelector('.js-result').innerHTML = result;
      document.querySelector('.js-moves').classList.add('move');
      document.querySelector('.js-moves').innerHTML = moves;

      // Store the updated score in local storage
      localStorage.setItem('score', JSON.stringify(score));

      // Update the displayed score
      updateScore();
    }

    // Function to reset the score and clear local storage
    function resetScore() {
      score = { Wins: 0, Loses: 0, Ties: 0 };
      localStorage.removeItem('score');
      updateScore();
    }

    // Function to update the displayed score
    function updateScore() {
      document.querySelector('.js-score').innerHTML = `Wins: ${score.Wins}, Loses: ${score.Loses}, Ties: ${score.Ties}`;
    }

    // Function to randomly generate the computer's move
    function pickComputerMove() {
      const randomIndex = Math.floor(Math.random() * moves.length);
      return moves[randomIndex];
    }
  