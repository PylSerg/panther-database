import {
	REPORT_MATERIALS_URL,
	REPORT_ADVANCES_AND_SALARIES_URL,
	REPORT_FUEL_URL,
	REPORT_FOR_CLOSED_OBJECTS_URL,
	REPORT_OFFICE_URL,
	CURRENT_OBJECTS_LIST_URL,
	CLOSED_OBJECTS_LIST_URL,
	STAGES_LIST_URL,
	MATERIALS_LIST_URL,
	ADVANCES_AND_SALARIES_LIST_URL,
} from "./urls";

const reportsList = [
	{
		type: "MATERIALS",
		title: "Матеріали",
		reportUrl: REPORT_MATERIALS_URL,
		objectsUrl: CURRENT_OBJECTS_LIST_URL,
		stagesUrl: STAGES_LIST_URL,
		positionsUrl: MATERIALS_LIST_URL,
	},

	{
		type: "ADVANCES_AND_SALARIES",
		title: "Аванси та зарплати",
		reportUrl: REPORT_ADVANCES_AND_SALARIES_URL,
		objectsUrl: CURRENT_OBJECTS_LIST_URL,
		stagesUrl: STAGES_LIST_URL,
		positionsUrl: ADVANCES_AND_SALARIES_LIST_URL,
	},

	{
		type: "FUEL",
		title: "Паливо",
		reportUrl: REPORT_FUEL_URL,
		objectsUrl: CURRENT_OBJECTS_LIST_URL,
		stagesUrl: STAGES_LIST_URL,
		positionsUrl: null,
	},

	{
		type: "CLOSED_OBJECTS",
		title: "Закриті обʼєкти",
		reportUrl: REPORT_FOR_CLOSED_OBJECTS_URL,
		objectsUrl: CLOSED_OBJECTS_LIST_URL,
		stagesUrl: STAGES_LIST_URL,
		positionsUrl: MATERIALS_LIST_URL,
	},

	{
		type: "OFFICE",
		title: "Офіс",
		reportUrl: REPORT_OFFICE_URL,
		objectsUrl: null,
		stagesUrl: null,
		positionsUrl: null,
	},
];

export default reportsList;
