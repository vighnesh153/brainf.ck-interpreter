import Memory from "./memory.js";

export default class Interpreter {
  reset() {
    this.memory = new Memory();
    this.instructionPointer = 0;
    this.inputPointer = 0;
	  this.openingToClosingBrackets = new Map();
	  this.closingToOpeningBrackets = new Map();
  }

  interpret(code, input = "") {
    this.reset();
    this.code = code;
    this.matchSquareBrackets();
    this.input = input;

    while (!this.reachedEOF()) {
      const instruction = this.code[this.instructionPointer];

      switch (instruction) {
        case "+": this.memory.increment(); break;
        case "-": this.memory.decrement(); break;
        case ">": this.memory.moveRight(); break;
        case "<": this.memory.moveLeft(); break;
        case ".": this.memory.print(); break;
        case ",": this.memory.input(this.getNextCharacter()); break;
        case "[": this.loopStart(); break;
        case "]": this.loopEnd(); break;
      }
      this.instructionPointer++;
    }
    return this.memory.outputBuffer.join("");
  }

  reachedEOF() {
    return this.instructionPointer >= this.code.length;
  }

  getNextCharacter() {
    if (this.inputPointer >= this.input.length) {
      throw new Error("EOF. Expected more input characters.");
    }
    return this.input[this.inputPointer];
  }

  loopStart() {
    if (this.memory.current.value !== 0) {
      return;
    }
    this.instructionPointer = this.openingToClosingBrackets.get(
      this.instructionPointer
    );
  }

  loopEnd() {
  	if (this.memory.current.value === 0) {
  		return;
	  }
	  this.instructionPointer = this.closingToOpeningBrackets.get(
		  this.instructionPointer
	  );
  }

  matchSquareBrackets() {
    const openingStack = [];
    for (let i = 0; i < this.code.length; i++) {
      const ch = this.code[i];
      if (ch === "[") {
        openingStack.push(i);
      }
      if (ch === "]") {
        if (openingStack.length === 0) {
          throw new Error("No matching '[' for ']' at index: " + i);
        }
        const openingMatch = openingStack.pop();
        this.openingToClosingBrackets.set(openingMatch, i);
        this.closingToOpeningBrackets.set(i, openingMatch);
      }
    }
    if (openingStack.length > 0) {
      throw new Error(
        "No matching ']' for '[' at indices: " + openingStack.join(", ")
      );
    }
  }
}
