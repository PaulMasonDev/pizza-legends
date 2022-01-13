class PlayerState {
  constructor() {
    this.pizzas = {
      p1: {
        pizzaId: "s001",
        hp: 50,
        maxHp: 50,
        xp: 0,
        maxXp: 100,
        level: 1,
        status: null,
      },
      // p2: {
      //   pizzaId: "v001",
      //   hp: 50,
      //   maxHp: 50,
      //   xp: 90,
      //   maxXp: 100,
      //   level: 1,
      //   status: null,
      // },
      // p3: {
      //   pizzaId: "f001",
      //   hp: 50,
      //   maxHp: 50,
      //   xp: 90,
      //   maxXp: 100,
      //   level: 1,
      //   status: null,
      // },
    };
    this.lineUp = ["p1"];
    this.items = [
      { actionId: "item_recoverHP", instanceId: "item1" },
      { actionId: "item_recoverHP", instanceId: "item2" },
      { actionId: "item_recoverHP", instanceId: "item3" },
    ];
    this.storyFlags = {};
  }

  swapLineup(oldId, incomingId) {
    const oldIndex = this.lineUp.indexOf(oldId);
    this.lineUp[oldIndex] = incomingId;
    utils.emitEvent("LineupChanged");
  }

  moveToFront(futureFrontId) {
    this.lineUp = this.lineUp.filter((id) => id !== futureFrontId);
    this.lineUp.unshift(futureFrontId);
    utils.emitEvent("LineupChanged");
  }

  addPizza(pizzaId) {
    const newId = `p${Date.now()}` + Math.floor(Math.random() * 99999);
    this.pizzas[newId] = {
      pizzaId,
      hp: 50,
      maxHp: 50,
      xp: 0,
      maxXp: 100,
      level: 1,
      status: null,
    };
    if (this.lineUp.length < 3) {
      this.lineUp.push(newId);
    }
    utils.emitEvent("LineupChanged");
    console.log(this);
  }
}

window.playerState = new PlayerState();
