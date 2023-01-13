import { scrollingSpeed } from "../data/variables";

// Scrolling to top
export function toTop() {
	document.querySelector("html").style.scrollBehavior = "auto";

	let t = 0;

	let top = document.documentElement.scrollTop;

	if (top > 0) {
		window.scrollBy(0, -scrollingSpeed);

		t = setTimeout(() => toTop(), 10);
	} else clearTimeout(t);

	document.querySelector("html").style.scrollBehavior = "smooth";

	return;
}

// Scrolling to bottom
export function toBottom() {
	document.querySelector("html").style.scrollBehavior = "auto";

	let t;

	const top = document.documentElement.scrollTop;
	const height = document.documentElement.scrollHeight;
	const screenHeight = document.documentElement.clientHeight;

	if (height - top > screenHeight) {
		window.scrollBy(0, scrollingSpeed);

		t = setTimeout(() => toBottom(), 10);
	} else clearTimeout(t);

	document.querySelector("html").style.scrollBehavior = "smooth";

	return;
}
