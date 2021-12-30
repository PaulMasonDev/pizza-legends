class KeyPressListener {
  //This class is used to make sure that if a non-arrow key is pressed, then
  //it doesn't repeat fire the key.  For example the enter key.
  constructor(keycode, callback) {
    let keySafe = true;
    this.keydownFunction = function (event) {
      if (event.code === keycode) {
        if (keySafe) {
          keySafe = false;
          callback();
        }
      }
    };
    this.keyupFunction = function (event) {
      if (event.code === keycode) {
        keySafe = true;
      }
    };
    document.addEventListener("keydown", this.keydownFunction);
    document.addEventListener("keyup", this.keyupFunction);
  }

  unbind() {
    document.removeEventListener("keydown", this.keydownFunction);
    document.removeEventListener("keyup", this.keyupFunction);
  }
}
