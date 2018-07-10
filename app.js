var fs = require('fs');

// 1, 1, 3, 4, 9, 12, 23, 31, 54, 73

// first ask for the degree to be computed
// print out what is asked from the user
console.log("\n" + "Input degree of polynomial: ");
console.log("═══════════════════════════");
// allow input
var stdin = process.openStdin();
// listen for input
stdin.addListener("data", function(input) {
	// make data type an integer and a constant
	const polynomialDegree = Number(input.toString().trim());
	// check if input is equal to zero
	if (polynomialDegree === 0) {
		console.log(1);
		console.log("═══════════════════════════");
	}
	// otherwise just compute
	else {
		compute(polynomialDegree);
	}
});

// is the degree odd or even?
const checkParity = function (number) {
	if (isNaN(number) === false) {
		// check if remainder after dividing input by 2 is not 0
		if (number % 2 !== 0) {
			return 'odd';
		}
		// check if remainder after dividing input by 2 is 0
		else if (number % 2 === 0) {
			return 'even';
		}
	}
	// it's not a number
	else {
		throw "Parameter is not a number!";
	}
};

// create all possible combinations for a given polynomial degree
const createMasterArray = function (degree) {
	let array = [];
	let integers = [];
	// generate integers to use to create combinatorics set
	for (let i = 0; i <= degree; i++) {
		integers.push(i);
	}

	// create the combinatorics set
	for (let i = 0; i < integers.length; i++) {
		// push Ur
		array.push([integers[i], 0, 0, 0]);
		for (let j = 0; j < integers.length; j++) {
			if (j !== 0) {
				// push Rr
				array.push([integers[i], integers[j], 0, 0]);
			}
			for (let k = 0; k < integers.length; k++) {
				if (k !== 0) {
					// push Ui
					array.push([integers[i], integers[j], integers[k], 0]);
				}
				for (let m = 0; m < integers.length; m++) {
					if (m !== 0) {
						// push Ur
						array.push([integers[i], integers[j], integers[k], integers[m]]);
					}
				}
			}
		}
	}
	//write all combinations to a file
	// var file = fs.createWriteStream('array.txt');
	// file.on('error', function(err) { /* error handling */ });
	// array.forEach(function(numberSet) {
	// 	file.write('[' + numberSet.join(', ') + '],' + '\n');
	// });
	// file.write(array.length)
	// file.end();
	return array;
};

const filterArray = function (array, degree) {
	// count down from highest number down to 0
	// to ignore any indexing problems from splicing
	for (let i = array.length - 1; i > -1; i--) {
		if (
			// check if all elements added together
			// are not equal the polynomial degree
			(array[i][0] + array[i][1] + array[i][2] + array[i][3] !== degree)
			// check if all elements are zeros (which would suggest no roots which is invalid)
		) {
			array.splice(i, 1);
		}
	}
	// set different filters for different polynomial degree parity
	for (let i = array.length - 1; i > -1; i--) {
		if (checkParity(degree) === 'even') {
			if (checkParity(array[i][0] + array[i][1]) !== 'even') {
				array.splice(i, 1);
			}
		}
		else if (checkParity(degree) === 'odd') {
			if (checkParity(array[i][0] + array[i][1]) !== 'odd') {
				array.splice(i, 1);
			}
		}
	}
	return array;
}

// find the answer
const compute = function (degree) {

	// keep parity as a local constant
	let parity = checkParity(degree);
	let masterArray = createMasterArray(degree);
	nasterArray = filterArray(masterArray, degree);

	// print out the answer
	console.log(masterArray);
	console.log(masterArray.length);
	console.log("═══════════════════════════");

	// clear arrays after computation
	masterArray = [];
};

// NOTE:
//	Ur_x	|	Rr_x	|	Ui_x	|	Ri_x
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
// Ur_x : x unique real roots
// Rr_x : x repeated real roots
// Ui_x : x unique imaginary roots
// Ur_x : x repeated imaginary roots
