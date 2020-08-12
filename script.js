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

// +++++ +++++             initialize counter (cell #0) to 10
// [                       use loop to set the next four cells to 70/100/30/10
//     > +++++ ++              add  7 to cell #1
//     > +++++ +++++           add 10 to cell #2
//     > +++                   add  3 to cell #3
//     > +                     add  1 to cell #4
//     <<<< -                  decrement counter (cell #0)
// ]
// > ++ .                  print 'H'
// > + .                   print 'e'
// +++++ ++ .              print 'l'
// .                       print 'l'
// +++ .                   print 'o'
// > ++ .                  print ' '
// << +++++ +++++ +++++ .  print 'W'
// > .                     print 'o'
// +++ .                   print 'r'
// ----- - .               print 'l'
// ----- --- .             print 'd'
// > + .                   print '!'
// > .                     print '\n'
