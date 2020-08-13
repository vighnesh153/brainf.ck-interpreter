import Interpreter from "./interpreter.js";

const interpreter = new Interpreter();

const outputWindow = document.getElementById('output');
const codeWindow = document.getElementById('code');
const input = document.getElementById('input');

document.getElementById("run").addEventListener("click", () => {
	try {
		outputWindow.value = interpreter.interpret(codeWindow.value, input.value);
	} catch (err) {
		outputWindow.value = err.message;
	}
});
