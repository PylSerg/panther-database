class MoneyFormatter {
	toString(number) {
		const stringNumber = String(number);

		if (stringNumber.includes(".")) {
			const fractionalNumberArray = stringNumber.split(".");

			const integerPart = fractionalNumberArray[0];
			const fractionalPart = fractionalNumberArray[1];

			return `${addDigs(integerPart)},${fractionalPart}`;
		}

		const integerNumberArray = stringNumber;

		return `${addDigs(integerNumberArray)},00`;

		function addDigs(integerNumber) {
			const numberArray = integerNumber.split("");

			if (numberArray.length > 3) numberArray.splice(numberArray.length - 3, 0, " ");
			if (numberArray.length > 7) numberArray.splice(numberArray.length - 7, 0, " ");
			if (numberArray.length > 11) numberArray.splice(numberArray.length - 11, 0, " ");

			return numberArray.join("");
		}
	}

	toNumber(number) {
		const numberArray = number.split(",");

		const integerPart = numberArray[0].split(" ").join("");
		const fractionalPart = numberArray[1];

		return Number(`${integerPart}.${fractionalPart}`);
	}
}

const Money = new MoneyFormatter();

export default Money;
