export default function createDate() {
	const dateNow = new Date();

	const date = dateNow.getDate();
	const month = dateNow.getMonth() + 1;
	const year = dateNow.getFullYear();

	return `${date}.${month}.${year}`;
}
