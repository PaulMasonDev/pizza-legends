class SubmissionMenu {
  constructor({ caster, enemy, onComplete }) {
    this.caster = caster;
    this.enemy = enemy;
    this.onComplete = onComplete;
  }

  getPages() {
    const backOption = {
      label: "Go Back",
      description: "Return to previous page",
      handler: () => {
        this.keyboardMenu.setOptions(this.getPages().root);
      },
    };
    return {
      root: [
        {
          label: "Attack",
          description: "Choose an attack",
          handler: () => {
            //Do something when chosen
            this.keyboardMenu.setOptions(this.getPages().attacks);
          },
        },
        {
          label: "Items",
          description: "Choose an item",
          // disabled: true,
          handler: () => {
            //Go to items page
            this.keyboardMenu.setOptions(this.getPages().items);
          },
        },
        {
          label: "Swap",
          description: "Change to another pizza",
          handler: () => {
            //See pizza options
            console.log("GO TO PIZZAS PAGE");
          },
        },
      ],
      attacks: [
        ...this.caster.actions.map((key) => {
          const action = Actions[key];
          return {
            label: action.name,
            description: action.description,
            handler: () => {
              this.menuSubmit(action);
            },
          };
        }),
        backOption,
      ],
      items: [
        //Starting
        backOption,
      ],
    };
  }

  menuSubmit(action, instanceId = null) {
    this.keyboardMenu?.end();
    this.onComplete({
      action,
      target: action.targetType === "friendly" ? this.caster : this.enemy,
    });
  }

  decide() {
    //TODO: Enemies should randomly decide what to do
    this.menuSubmit(Actions[this.caster.actions[0]]);
  }

  showMenu(container) {
    this.keyboardMenu = new KeyboardMenu();
    this.keyboardMenu.init(container);
    this.keyboardMenu.setOptions(this.getPages().root);
  }

  init(container) {
    if (this.caster.isPlayerControlled) {
      //Show some ui
      this.showMenu(container);
    } else {
      this.decide();
    }
  }
}
