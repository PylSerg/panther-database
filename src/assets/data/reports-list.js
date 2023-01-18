import {
  REPORT_UNC_MATERIALS_URL,
  REPORT_UNC_ADVANCES_AND_SALARIES_URL,
  REPORT_UNC_FUEL_URL,
  REPORT_UNC_FOR_CLOSED_OBJECTS_URL,
  REPORT_UNC_OFFICE_URL,
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
    reportUrl: REPORT_UNC_MATERIALS_URL,
    objectsUrl: CURRENT_OBJECTS_LIST_URL,
    stagesUrl: STAGES_LIST_URL,
    positionsUrl: MATERIALS_LIST_URL,
  },

  {
    type: "ADVANCES_AND_SALARIES",
    title: "Аванси та зарплати",
    reportUrl: REPORT_UNC_ADVANCES_AND_SALARIES_URL,
    objectsUrl: CURRENT_OBJECTS_LIST_URL,
    stagesUrl: STAGES_LIST_URL,
    positionsUrl: ADVANCES_AND_SALARIES_LIST_URL,
  },

  {
    type: "FUEL",
    title: "Паливо",
    reportUrl: REPORT_UNC_FUEL_URL,
    objectsUrl: CURRENT_OBJECTS_LIST_URL,
    stagesUrl: STAGES_LIST_URL,
    positionsUrl: null,
  },

  {
    type: "CLOSED_OBJECTS",
    title: "Закриті обʼєкти",
    reportUrl: REPORT_UNC_FOR_CLOSED_OBJECTS_URL,
    objectsUrl: CLOSED_OBJECTS_LIST_URL,
    stagesUrl: STAGES_LIST_URL,
    positionsUrl: MATERIALS_LIST_URL,
  },

  {
    type: "OFFICE",
    title: "Офіс",
    reportUrl: REPORT_UNC_OFFICE_URL,
    objectsUrl: null,
    stagesUrl: null,
    positionsUrl: null,
  },
];

export default reportsList;
