// Get date
export function getDate() {
	const dateNow = new Date();

	let date = dateNow.getDate();
	let month = dateNow.getMonth() + 1;
	let year = dateNow.getFullYear();

	if (date < 10) date = `0${date}`;
	if (month < 10) month = `0${month}`;

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
