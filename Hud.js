class Hud {
  constructor() {
    this.scoreboards = [];
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Hud");
    const { playerState } = window;
    playerState.lineUp.forEach((key) => {
      const pizza = playerState.pizzas[key];
      const scoreboard = new Combatant(
        {
          id: key,
          ...Pizzas[pizza.pizzaId],
          ...pizza,
        },
        null
      );
      scoreboard.createElement();
      this.scoreboards.push(scoreboard);
      this.element.appendChild(scoreboard.hudElement);
    });
    this.update();
  }

  update() {
    this.scoreboards.forEach((scoreboard) => {
      scoreboard.update(window.playerState.pizzas[scoreboard.id]);
    });
  }

  init(container) {
    this.createElement();
    container.appendChild(this.element);
    document.addEventListener("PlayerStateUpdated", () => {
      this.update();
    });
  }
}
