const choices = document.querySelectorAll(".choice");
const userChoiceDisplay = document.getElementById("user-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const winnerText = document.getElementById("winner-text");
const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const resetBtn = document.getElementById("reset-btn");

let playerScore = 0;
let computerScore = 0;

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("data-choice");
    playGame(userChoice);
  });
});

function playGame(userChoice) {
  const computerChoice = getComputerChoice();
  const result = getWinner(userChoice, computerChoice);

  userChoiceDisplay.textContent = userChoice.toUpperCase();
  computerChoiceDisplay.textContent = computerChoice.toUpperCase();
  displayResult(result);
}

function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * 3)];
}

function getWinner(player, computer) {
  if (player === computer) return "draw";

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "player";
  } else {
    return "computer";
  }
}

function displayResult(result) {
  if (result === "player") {
    playerScore++;
    playerScoreDisplay.textContent = playerScore;
    winnerText.textContent = "🎉 You Win!";
    winnerText.style.color = "#28a745";
  } else if (result === "computer") {
    computerScore++;
    computerScoreDisplay.textContent = computerScore;
    winnerText.textContent = "💻 Computer Wins!";
    winnerText.style.color = "#ff3b3b";
  } else {
    winnerText.textContent = "🤝 It's a Draw!";
    winnerText.style.color = "#333";
  }
}

resetBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;
  playerScoreDisplay.textContent = 0;
  computerScoreDisplay.textContent = 0;
  userChoiceDisplay.textContent = "-";
  computerChoiceDisplay.textContent = "-";
  winnerText.textContent = "Make your move!";
  winnerText.style.color = "#333";
});
