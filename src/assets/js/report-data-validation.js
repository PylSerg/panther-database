export default function reportDataValidation(e, list, data, setData) {
	const key = e.currentTarget.name;
	const indx = e.currentTarget.id;

	const currentValue = data[`${key}`][indx];

	const validationResult = list.includes(currentValue);

	if (!validationResult) {
		const newArray = data[`${key}`];

		newArray.splice(indx, 1);
		newArray.splice(indx, 0, "");

		setData({ ...data, key: newArray });
	}
}
