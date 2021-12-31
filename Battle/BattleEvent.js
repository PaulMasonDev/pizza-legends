class BattleEvent {
  constructor(event, battle) {
    this.event = event;
    this.battle = battle;
  }

  textMessage(resolve) {
    const text = this.event.text
      .replace("{CASTER}", this.event.caster?.name)
      .replace("{TARGET}", this.event.target?.name)
      .replace("{ACTION}", this.event.action?.name);

    const message = new TextMessage({
      text,
      onComplete: () => {
        resolve();
      },
    });

    message.init(this.battle.element);
  }

  submissionMenu(resolve) {
    const menu = new SubmissionMenu({
      caster: this.event.caster,
      enemy: this.event.enemy,
      onComplete: (submission) => {
        //what move to use, and who to use it on
        resolve(submission);
      },
    });
    menu.init(this.battle.element);
  }

  async stateChange(resolve) {
    const { caster, target, damage } = this.event;
    if (damage) {
      //modify the target to have less hp
      target.update({
        hp: target.hp - damage,
      });
      //start blinking
      target.pizzaElement.classList.add("battle-damage-blink");
      //   caster.pizzaElement.classList.add("battle-spin-right");
    }

    //wait a little bit
    //stop blinking
    await utils.wait(600);
    target.pizzaElement.classList.remove("battle-damage-blink");
    // caster.pizzaElement.classList.remove("battle-spin-right");

    resolve();
  }

  animation(resolve) {
    const fn = BattleAnimations[this.event.animation];
    console.log({ fn });
    fn(this.event, resolve);
  }

  init(resolve) {
    this[this.event.type](resolve);
  }
}
