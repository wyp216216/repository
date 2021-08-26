class Msg {
  constructor() {
    this.name = "empry";
  }
  static getInstance(name) {
    if (this[name]) {
      this[name] = new Msg();
      return this[name];
    }
    return this[name];
  }
}

export default Msg.getInstance;
