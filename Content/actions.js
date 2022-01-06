window.Actions = {
  damage1: {
    name: "Whomp!",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION} on {TARGET}" },
      { type: "animation", animation: "spin" },
      { type: "stateChange", damage: 10 },
    ],
  },
  saucyStatus: {
    name: "Tomato squeeze",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}" },
      {
        type: "stateChange",
        status: { type: "saucy", expiresIn: 3 },
      },
    ],
  },
  clumsyStatus: {
    name: "Olive Oil",
    success: [
      { type: "textMessage", text: "{CASTER} uses {ACTION}" },
      { type: "animation", animation: "glob", color: "#dafd2a" },
      {
        type: "stateChange",
        status: { type: "clumsy", expiresIn: 3 },
      },
      { type: "textMessage", text: "{TARGET} is slipping all around!" },
    ],
  },
  //Items
  item_recoverStatus: {
    name: "Heating Lamp",
    description: "feeling fresh and warm",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} uses a {ACTION}" },
      {
        type: "stateChange",
        status: null,
      },
      { type: "textMessage", text: "Feeling fresh!" },
    ],
  },
  item_recoverHP: {
    name: "Parmesan",
    targetType: "friendly",
    success: [
      { type: "textMessage", text: "{CASTER} sprinkles on some {ACTION}" },
      {
        type: "stateChange",
        recover: 10,
      },
      { type: "textMessage", text: "{CASTER} recovers HP!" },
    ],
  },
};
