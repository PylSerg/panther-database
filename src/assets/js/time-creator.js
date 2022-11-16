export default function createTime() {
	const dateNow = new Date();

	let hours = dateNow.getHours();
	let minutes = dateNow.getMinutes();

	if (hours < 10) hours = `0${hours}`;
	if (minutes < 10) minutes = `0${minutes}`;

	return `${hours}:${minutes}`;
}
