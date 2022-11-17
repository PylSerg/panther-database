// Clears data
export default function clearData(data, setData, setRows) {
	setRows({ indx: [0] });

	for (const key in data) {
		const currentKey = data[key];

		if (typeof currentKey === "object") {
			currentKey.splice(0, currentKey.length);
			currentKey.splice(0, 0, "");

			setData({ ...data, [key]: currentKey });
		}
	}
}
