class Node {
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


export default class Memory {
  constructor() {
    this.current = new Node();
    this.outputBuffer = [];
  }

  moveRight() {
    if (this.current.next === null) {
    	const rightNode = new Node();
    	rightNode.prev = this.current
      this.current.next = rightNode;
    }
    this.current = this.current.next;
  }

  moveLeft() {
    if (this.current.prev === null) {
    	const leftNode = new Node()
	    leftNode.next = this.current;
      this.current.prev = leftNode;
    }
    this.current = this.current.prev;
  }

  increment() {
    this.current.increment();
  }

  decrement() {
    this.current.decrement();
  }

  print() {
  	this.outputBuffer.push(String.fromCharCode(this.current.value));
  }

  input(ch) {
    this.current.value = ch.charCodeAt(0);
  }
}
