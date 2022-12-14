/*** X-CONSOLE ***/

/*
	Quick Start:
? 	import xc

	Get list of all methods:
?	xc.help()
*/
/*
 *	Version
 */

const version = "1.1.0";

/*

 !	CLASS 

*/

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

	 !	METHODS

	 */

	/*

	 * Alternative to "console.log()"

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

	 * Alternative to "console.table()"

	 */

	t(...args) {
		console.table(...args);
	}

	/*

	 * Alternative to "console.dir()"

	 */

	d(...args) {
		console.dir(...args);
	}

	/*

	 * Alternative to "console.count()"

	 */

	// DEFAULT
	c(...args) {
		return console.count(...args);
	}

	// BLACK
	cd(...args) {
		const data = args.join(" ");

		return console.count(`${this.BLACK}${data}`);
	}

	// RED
	cr(...args) {
		const data = args.join(" ");

		return console.count(`${this.RED}${data}`);
	}

	// GREEN
	cg(...args) {
		const data = args.join(" ");

		console.count(`${this.GREEN}${data}`);
	}

	// YELLOW
	cy(...args) {
		const data = args.join(" ");

		console.count(`${this.YELLOW}${data}`);
	}

	// BLUE
	cb(...args) {
		const data = args.join(" ");

		console.count(`${this.BLUE}${data}`);
	}

	// MAGENTA
	cm(...args) {
		const data = args.join(" ");

		console.count(`${this.MAGENTA}${data}`);
	}

	// CYAN
	cc(...args) {
		const data = args.join(" ");

		console.count(`${this.CYAN}${data}`);
	}

	// WHITE
	cw(...args) {
		const data = args.join(" ");

		console.count(`${this.WHITE}${data}`);
	}

	/*

	 * Alternative to "console.error()"

	 */

	e(...args) {
		console.error(...args);
	}

	/*

	 * Alternative to "console.warn()"

	 */

	w(...args) {
		console.warn(...args);
	}

	/*

	 * Alternative to "console.trace()"

	 */

	trc(...args) {
		console.trace(...args);
	}

	/*

	 * Alternative to "console.clear()"

	 */

	clr() {
		console.clear();
	}

	/*

	 * Creates group

	 */

	// DEFAULT
	grp(groupName = "GROUP") {
		console.group(`${groupName.toUpperCase()}`);
	}

	// BLACK
	grpd(groupName = "GROUP") {
		console.group(`${this.BLACK}${groupName.toUpperCase()}`);
	}

	// RED
	grpr(groupName = "GROUP") {
		console.group(`${this.RED}${groupName.toUpperCase()}`);
	}

	// GREEN
	grpg(groupName = "GROUP") {
		console.group(`${this.GREEN}${groupName.toUpperCase()}`);
	}

	// YELLOW
	grpy(groupName = "GROUP") {
		console.group(`${this.YELLOW}${groupName.toUpperCase()}`);
	}

	// BLUE
	grpb(groupName = "GROUP") {
		console.group(`${this.BLUE}${groupName.toUpperCase()}`);
	}

	// MAGENTA
	grpm(groupName = "GROUP") {
		console.group(`${this.MAGENTA}${groupName.toUpperCase()}`);
	}

	// CYAN
	grpc(groupName = "GROUP") {
		console.group(`${this.CYAN}${groupName.toUpperCase()}`);
	}

	// WHITE
	grpw(groupName = "GROUP") {
		console.group(`${this.WHITE}${groupName.toUpperCase()}`);
	}

	/*

	 * Closes group

	 */

	gcl() {
		console.groupEnd();
	}

	/*

	 * Logs the rendering of the component

	 */

	// DEFAULT
	rnd(componentName = "Component") {
		const log = componentRenderingLog(componentName, "");

		console.log(log);
	}

	// BLACK
	rndd(componentName = "Component") {
		const log = componentRenderingLog(componentName, this.BLACK);

		console.log(log);
	}

	// RED
	rndr(componentName = "Component") {
		const log = componentRenderingLog(componentName, this.RED);

		console.log(log);
	}

	// GREEN
	rndg(componentName = "Component") {
		const log = componentRenderingLog(componentName, this.GREEN);

		console.log(log);
	}

	// YELLOW
	rndy(componentName = "Component") {
		const log = componentRenderingLog(componentName, this.YELLOW);

		console.log(log);
	}

	// BLUE
	rndb(componentName = "Component") {
		const log = componentRenderingLog(componentName, this.BLUE);

		console.log(log);
	}

	// MAGENTA
	rndm(componentName = "Component") {
		const log = componentRenderingLog(componentName, this.MAGENTA);

		console.log(log);
	}

	// CYAN
	rndc(componentName = "Component") {
		const log = componentRenderingLog(componentName, this.CYAN);

		console.log(log);
	}

	// WHITE
	rndw(componentName = "Component") {
		const log = componentRenderingLog(componentName, this.WHITE);

		console.log(log);
	}

	/*
	 * HELP
	 */

	help() {
		console.log(helper());
	}
}

/*
 !	Functions
 */

function componentRenderingLog(componentName, textColor) {
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

function helper() {
	return `\n *** X-CONSOLE v${version} by PylSerg *** \n\n\n METHODS: \n\n xc.l()    - alternative to "console.log()" \n xc.t()    - alternative to "console.table()" \n xc.d()    - alternative to "console.dir()" \n xc.c()    - alternative to "console.count()" \n xc.e()    - alternative to "console.error()" \n xc.w()    - alternative to "console.warn()" \n xc.trc()  - alternative to "console.trace()" \n xc.clr()  - alternative to "console.clear()" \n xc.grp()  - creates group \n xc.gcl()  - closes group \n xc.rnd()  - logs the rendering of the component \n\n\n COLORS: \n\n d  - BLACK \n r  - RED \n g  - GREEN \n y  - YELLOW \n b  - BLUE \n m  - MAGENTA \n c  - CYAN \n w  - WHITE \n\n Example: xc.lr("test") - text color will be red \n\n Exception: color doesn't apply to objects and arrays \n\n`;
}

/*
 !	EXPORT
 */

const xc = new X_CONSOLE();
export default xc;
