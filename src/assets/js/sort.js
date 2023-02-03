class Sorting {
	reports(created, adesc) {
		let ifMore;
		let ifLess;

		if (adesc === "ASC") {
			ifMore = 1;
			ifLess = -1;
		}

		if (adesc === "DESC") {
			ifMore = -1;
			ifLess = 1;
		}

		if (adesc === undefined) {
			ifMore = -1;
			ifLess = 1;
		}

		const sorted = created.sort((first, second) => {
			/*
			 * First
			 */
			const firstCreated = first.reportCreated.split(" - ");

			const firstDate = firstCreated[0];
			const firstDateArray = firstDate.split(".");

			const firstYear = firstDateArray[2];
			const firstMonth = firstDateArray[1];
			const firstDay = firstDateArray[0];

			const firstTime = firstCreated[1];
			const firstTimeArray = firstTime.split(":");

			const firstHours = firstTimeArray[0];
			const firstMinutes = firstTimeArray[1];

			/*
			 * Second
			 */
			const secondCreated = second.reportCreated.split(" - ");

			const secondDate = secondCreated[0];
			const secondDateArray = secondDate.split(".");

			const secondYear = secondDateArray[2];
			const secondMonth = secondDateArray[1];
			const secondDay = secondDateArray[0];

			const secondTime = secondCreated[1];
			const secondTimeArray = secondTime.split(":");

			const secondHours = secondTimeArray[0];
			const secondMinutes = secondTimeArray[1];

			/*
			 * Sort
			 */

			// Sorts by Year
			if (firstYear > secondYear) return ifMore;
			if (firstYear < secondYear) return ifLess;

			// Sorts by Month
			if (firstMonth > secondMonth) return ifMore;
			if (firstMonth < secondMonth) return ifLess;

			// Sorts by Day
			if (firstDay > secondDay) return ifMore;
			if (firstDay < secondDay) return ifLess;

			// Sorts by Hours
			if (firstHours > secondHours) return ifMore;
			if (firstHours < secondHours) return ifLess;

			// Sorts by Minutes
			if (firstMinutes > secondMinutes) return ifMore;
			if (firstMinutes < secondMinutes) return ifLess;

			return false;
		});

		return sorted;
	}
}

const sorting = new Sorting();

export default sorting;
