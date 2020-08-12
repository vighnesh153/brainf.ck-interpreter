export default class Node {
  constructor() {
    this.value = 0;
    this.next = null;
    this.prev = null;
  }

  increment() {
    this.value++;
  }

  decrement() {
    this.value--;
  }
}
