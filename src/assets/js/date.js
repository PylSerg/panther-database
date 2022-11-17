// Get date
export function getDate() {
	const dateNow = new Date();

	const date = dateNow.getDate();
	const month = dateNow.getMonth() + 1;
	const year = dateNow.getFullYear();

	return `${date}.${month}.${year}`;
}

// Get time
export function getTime() {
	const dateNow = new Date();

	let hours = dateNow.getHours();
	let minutes = dateNow.getMinutes();

	if (hours < 10) hours = `0${hours}`;
	if (minutes < 10) minutes = `0${minutes}`;

	return `${hours}:${minutes}`;
}
