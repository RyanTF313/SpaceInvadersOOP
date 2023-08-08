class Game {
  constructor() {
    this.user = null;
    this.enemies = [];
    this.currEnemy = null;
    this.gameOver = false;
    this.winner = "";
    this.turn = true;
    this.userRetreat = false;
  }

  start() {
    const playerStats = document.querySelectorAll(".playerStats")[0];
    const enemyStats = document.querySelectorAll(".enemyStats")[0];
    this.user = new UserShip();
    this.createEnemies();
    this.currEnemy = this.enemies[0];

    playerStats.innerText = this.updatePlayerStats(this.user);
    enemyStats.innerText = this.updateEnemyStats(this.currEnemy);

    console.log("The battle has begun!!");
    this.attackCurrEnenmy();
    return this;
  }

  createEnemies() {
    for (let i = 0; i < 6; i++) {
      const hull = Math.floor(Math.random() * (6 - 3 + 1) + 3);
      const firepower = Math.floor(Math.random() * (4 - 2 + 1) + 2);
      const accuracy = Number(Math.random() * (0.8 - 0.6) + 0.6).toFixed(1);
      this.enemies.push(new AlienShip(hull, firepower, accuracy));
    }
    return this;
  }

  destroyEnemy() {
    this.enemies.shift();
    this.currEnemy = this.enemies[0];
    return this;
  }

  attackCurrEnenmy() {
    if (this.user.attack()) {
      console.log("You got a hit on the enemy!");
      this.currEnemy.hull -= this.user.firepower;
      const continueBattle = window.prompt(
        "Would you like to retreat? Y/N (must be capital Y)"
      );
      if (continueBattle === "Y") {
        this.winner = "invaders";
        this.gameOver = true;
        console.log(`${this.winner} has won the battle!!`);
        return;
      }
    } else {
      console.log("You missed!!");
    }
    this.checkWin();
  }

  attackFromCurrEnenmy() {
    if (!this.currEnemy) return;
    if (this.currEnemy.attack()) {
      console.log("You have been hit by the enemy!");
      this.user.hull -= this.currEnemy.firepower;
    } else {
      console.log("The enemy missed!!");
    }
    this.checkWin();
  }

  updatePlayerStats(player) {
    return `Hull : ${player.hull} \n FirePower : ${player.firepower} \n Accuracy: ${player.accuracy}`;
  }
  updateEnemyStats(enemy) {
    return `Hull : ${enemy.hull} \n FirePower : ${enemy.firepower} \n Accuracy: ${enemy.accuracy}`;
  }

  checkWin() {
    const enemyStats = document.querySelectorAll(".enemyStats")[0];
    const playerStats = document.querySelectorAll(".playerStats")[0];
    enemyStats.innerText = this.updateEnemyStats(this.currEnemy);
    playerStats.innerText = this.updatePlayerStats(this.user);

    if (this.gameOver) {
      console.log(`${this.winner} has won the battle!!`);
    }

    if (!this.enemies.length) {
      this.gameOver = true;
      this.winner = "you";
      console.log(`${this.winner} has won the battle!!`);
      return;
    } else {
      if (this.currEnemy.hull < 1) {
        this.destroyEnemy();
      }

      this.turn = !this.turn;
      if (this.turn) {
        this.attackCurrEnenmy();
      } else {
        this.attackFromCurrEnenmy();
      }
    }

    if (this.user.hull < 1) {
      this.gameOver = true;
      this.winner = "invaders";
      console.log(`${this.winner} has won the battle!!`);
      return;
    }
  }
}

class AlienShip {
  constructor(hull, firepower, accuracy) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
  attack() {
    return Math.random() < this.accuracy;
  }
}

class UserShip {
  constructor() {
    this.hull = 20;
    this.firepower = 5;
    this.accuracy = 0.7;
  }
  attack() {
    return Math.random() < this.accuracy;
  }
}

const game = new Game();
game.start();
