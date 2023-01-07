export default function nowTime() {
	let time = ``;

	const date = new Date();

	let HH = date.getHours();
	let MM = date.getMinutes();
	let SS = date.getSeconds();
	let MS = date.getMilliseconds();

	if (HH < 10) HH = `0${HH}`;
	if (MM < 10) MM = `0${MM}`;
	if (SS < 10) SS = `0${SS}`;
	if (MS < 10) MS = `00${MS}`;
	if (MS >= 10 && MS < 100) MS = `0${MS}`;

	time = `${HH}:${MM}:${SS}:${MS}`;

	return time;
}
