class Sorting {
	#ifMore;
	#ifLess;

	changeSort(adesc) {
		if (adesc === "ASC") {
			this.ifMore = 1;
			this.ifLess = -1;
		}

		if (adesc === "DESC") {
			this.ifMore = -1;
			this.ifLess = 1;
		}
	}

	positions(positions, adesc) {
		if (adesc === "ASC" || adesc === "DESC") {
			this.changeSort(adesc);
		} else {
			this.changeSort("ASC");
		}

		const sorted = positions.sort((first, second) => {
			/*
			 * First
			 */
			const firstObject = first.object;
			const firstStage = first.stage;
			const firstPosition = first.position;

			/*
			 * Second
			 */
			const secondObject = second.object;
			const secondStage = second.stage;
			const secondPosition = second.position;

			/*
			 * Sort
			 */

			// Sort by Object
			if (firstObject > secondObject) return this.ifMore;
			if (firstObject < secondObject) return this.ifLess;

			// Sort by Stage
			if (firstStage > secondStage) return this.ifMore;
			if (firstStage < secondStage) return this.ifLess;

			// Sort by Position
			if (firstPosition > secondPosition) return this.ifMore;
			if (firstPosition < secondPosition) return this.ifLess;
		});

		return sorted;
	}

	reports(reports, adesc) {
		if (adesc === "ASC" || adesc === "DESC") {
			this.changeSort(adesc);
		} else {
			this.changeSort("DESC");
		}

		const sorted = reports.sort((first, second) => {
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
			if (firstYear > secondYear) return this.ifMore;
			if (firstYear < secondYear) return this.ifLess;

			// Sorts by Month
			if (firstMonth > secondMonth) return this.ifMore;
			if (firstMonth < secondMonth) return this.ifLess;

			// Sorts by Day
			if (firstDay > secondDay) return this.ifMore;
			if (firstDay < secondDay) return this.ifLess;

			// Sorts by Hours
			if (firstHours > secondHours) return this.ifMore;
			if (firstHours < secondHours) return this.ifLess;

			// Sorts by Minutes
			if (firstMinutes > secondMinutes) return this.ifMore;
			if (firstMinutes < secondMinutes) return this.ifLess;

			return false;
		});

		return sorted;
	}
}

const sorting = new Sorting();

export default sorting;
