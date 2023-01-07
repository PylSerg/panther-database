class X_CONSOLE {
	/*
	 * Text style
	 */

	RESET = "\x1b[0m";
	BRIGHT = "\x1b[1m";
	DIM = "\x1b[2m";
	UNDERSCORE = "\x1b[4m";
	BLINK = "\x1b[5m";
	REVERSE = "\x1b[7m";
	HIDDEN = "\x1b[8m";

	/*
	 * Text colors
	 */

	BLACK = "\x1b[30m";
	RED = "\x1b[31m";
	GREEN = "\x1b[32m";
	YELLOW = "\x1b[33m";
	BLUE = "\x1b[34m";
	MAGENTA = "\x1b[35m";
	CYAN = "\x1b[36m";
	WHITE = "\x1b[37m";

	/*
	 * Background colors
	 */

	BLACK_BG = "\x1b[40m";
	RED_BG = "\x1b[41m";
	GREEN_BG = "\x1b[42m";
	YELLOW_BG = "\x1b[43m";
	BLUE_BG = "\x1b[44m";
	MAGENTA_BG = "\x1b[45m";
	CYAN_BG = "\x1b[46m";
	WHITE_BG = "\x1b[47m";

	/*
	  ! METHODS
	 */

	/*
	 * Alternative to "console.log"
	 */

	// DEFAULT
	l(...args) {
		return console.log(...args);
	}

	// BLACK
	ld(...args) {
		const data = args.join(" ");

		return console.log(`${this.BLACK}${data}`);
	}

	// RED
	lr(...args) {
		const data = args.join(" ");

		return console.log(`${this.RED}${data}`);
	}

	// GREEN
	lg(...args) {
		const data = args.join(" ");

		console.log(`${this.GREEN}${data}`);
	}

	// YELLOW
	ly(...args) {
		const data = args.join(" ");

		console.log(`${this.YELLOW}${data}`);
	}

	// BLUE
	lb(...args) {
		const data = args.join(" ");

		console.log(`${this.BLUE}${data}`);
	}

	// MAGENTA
	lm(...args) {
		const data = args.join(" ");

		console.log(`${this.MAGENTA}${data}`);
	}

	// CYAN
	lc(...args) {
		const data = args.join(" ");

		console.log(`${this.CYAN}${data}`);
	}

	// WHITE
	lw(...args) {
		const data = args.join(" ");

		console.log(`${this.WHITE}${data}`);
	}

	/*
	 * Logs the rendering of the component
	 */

	// DEFAULT
	rnd(component) {
		const log = componentRenderingLog(component, "");

		return console.log(log);
	}

	// RED
	rndd(component) {
		const log = componentRenderingLog(component, this.BLACK);

		return console.log(log);
	}

	// RED
	rndr(component) {
		const log = componentRenderingLog(component, this.RED);

		return console.log(log);
	}

	// GREEN
	rndg(component) {
		const log = componentRenderingLog(component, this.GREEN);

		return console.log(log);
	}

	// YELLOW
	rndy(component) {
		const log = componentRenderingLog(component, this.YELLOW);

		return console.log(log);
	}

	// BLUE
	rndb(component) {
		const log = componentRenderingLog(component, this.BLUE);

		return console.log(log);
	}

	// MAGENTA
	rndm(component) {
		const log = componentRenderingLog(component, this.MAGENTA);

		return console.log(log);
	}

	// CYAN
	rndc(component) {
		const log = componentRenderingLog(component, this.CYAN);

		return console.log(log);
	}

	// WHITE
	rndw(component) {
		const log = componentRenderingLog(component, this.WHITE);

		return console.log(log);
	}

	/*
	  ! HELP
	 */

	help() {
		console.log(` *** X-CONSOLE METHODS: *** \n\n l    - alternative to "console.log()" \n rnd  - logs the rendering of the component \n`);
	}
}

/*
 * Functions
 */

function componentRenderingLog(component, textColor) {
	let componentName;

	if (component === undefined) {
		componentName = "Component";
	} else {
		componentName = component.toUpperCase();
	}

	return `${textColor}${Time()} - ${componentName} rendering...`;
}

function Time() {
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

const xc = new X_CONSOLE();
export default xc;
