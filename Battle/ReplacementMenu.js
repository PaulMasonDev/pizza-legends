class ReplacementMenu {
  constructor({ replacements, onComplete }) {
    this.replacements = replacements;
    this.onComplete = onComplete;
  }

  decide() {
    //AI decides
    this.menuSubmit(this.replacements[0]);
  }

  menuSubmit(replacement) {
    this.keyboardMenu?.end();
    this.onComplete(replacement);
  }

  showMenu(container) {
    this.keyboardMenu = new KeyboardMenu();
    this.keyboardMenu.init(container);
    this.keyboardMenu.setOptions(
      this.replacements.map((replacement) => {
        return {
          label: replacement.name,
          description: replacement.description,
          handler: () => {
            this.menuSubmit(replacement);
          },
        };
      })
    );
  }

  init(container) {
    if (this.replacements[0].isPlayerControlled) {
      this.showMenu(container);
    } else {
      this.decide();
    }
  }
}
