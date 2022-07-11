import {
  MobilityInputPopupParamType,
  MobilityPathType,
  MobilityValidationStatus,
} from "../enums";

import {
  IMobilityAnalysisResponse,
  IMobilityPathParams,
  IMobilityPointParams,
  IMobilityValidationErrors,
} from "../interfaces/mobilityInterfaces";

export const generateLocationString = (point: IMobilityPointParams): string => {
  const locationArray = [
    point.subdistrict,
    point.district,
    point.city,
    point.province,
  ];
  return locationArray.filter(Boolean).join(", ");
};

export const validateInputPopupInput = (
  target: IMobilityPointParams
): MobilityValidationStatus => {
  for (let member in target) {
    if (
      member === "subdistrict" ||
      // member === MobilityInputPopupParamType.CITY || // Enable when there are more than 1 province
      member === MobilityInputPopupParamType.DISTRICT
    )
      continue;
    if (target[member] === null || target[member] === "")
      return MobilityValidationStatus.DATA_NOT_FULL;
  }
  if (target.startDateTime && target.endDateTime) {
    if (target.startDateTime > target.endDateTime)
      return MobilityValidationStatus.START_DATE_IS_GREATER_THAN_END_DATE;
    else if (target.startDateTime === target.endDateTime)
      return MobilityValidationStatus.START_DATE_IS_EQUAL_TO_END_DATE;
  }

  return MobilityValidationStatus.VALID;
};

const generateValidationError = (
  path: number,
  point: number,
  status: MobilityValidationStatus,
  paramType?: MobilityInputPopupParamType,
  pathErrorMessage?: string,
  pointErrorMessage?: string
): IMobilityValidationErrors => {
  return {
    path,
    point,
    status: status,
    paramType,
    pathErrorMessage,
    pointErrorMessage,
  };
};

export const validateAnalysisForm = (
  target: Array<IMobilityPathParams>
): Array<IMobilityValidationErrors> => {
  let errorList: Array<IMobilityValidationErrors> = [];
  for (let i = 0; i < target.length; i++) {
    for (let j = 0; j < target[i].points.length; j++) {
      errorList = isFieldsEmptyValidation(target, i, j, errorList);
      // errorList = startEndDateValidationInSamePoint(target, i, j, errorList);

      // If one to many, no need to check next validation
      if (target[i].type === MobilityPathType.ONE_TO_MANY) continue;

      // Check whether path(i) point(N)'s endDateTime is GREATER than path(i)point(N + 1)'s startDateTime
      if (j === target[i].points.length - 1) break;
      // if (
      //   new Date(target[i].points[j].endDateTime!) >
      //   new Date(target[i].points[j + 1].startDateTime!)
      // ) {
      //   errorList.push(
      //     generateValidationError(
      //       i,
      //       j,
      //       MobilityValidationStatus.NEXT_DEST_START_DATE_LESS_THAN_PREVIOUS_DEST_DATE,
      //       MobilityInputPopupParamType.END_DATE_TIME,
      //       "Please enter correct date-time range in Path " +
      //         (i + 1) +
      //         ". For one-to-one path, " +
      //         (j === 0 ? "origin point's" : "destination " + j + " point's") +
      //         " start date-time must be less than destination " +
      //         j +
      //         " point's start date-time",
      //       "Should be less than destination " + (j + 1) + " start date-time"
      //     )
      //   );
      //   errorList.push(
      //     generateValidationError(
      //       i,
      //       j + 1,
      //       MobilityValidationStatus.NEXT_DEST_START_DATE_LESS_THAN_PREVIOUS_DEST_DATE,
      //       MobilityInputPopupParamType.START_DATE_TIME,
      //       "Please enter correct date-time range in Path " +
      //         (i + 1) +
      //         ". For one-to-one path, " +
      //         (j === 0 ? "origin point's" : "destination " + j + " point's") +
      //         " start date-time must be less than destination " +
      //         j +
      //         " point's start date-time",
      //       "Should be greater than " +
      //         (j === 0 ? "origin" : "destination " + j) +
      //         " end date-time"
      //     )
      //   );
      // }
    }
  }
  return errorList;
};

export const isFieldsEmptyValidation = (
  analysisParams: Array<IMobilityPathParams>,
  i: number,
  j: number,
  errorList: Array<IMobilityValidationErrors>
): Array<IMobilityValidationErrors> => {
  for (let member in analysisParams[i].points[j]) {
    if (
      member === "subdistrict" ||
      // member === MobilityInputPopupParamType.CITY || // Enable when there are more 1 provinces
      member === MobilityInputPopupParamType.DISTRICT
    )
      continue; // no subdistrict empty validation
    if (analysisParams[i].points[j][member] === "")
      errorList.push(
        generateValidationError(
          i,
          j,
          MobilityValidationStatus.DATA_IS_EMPTY,
          member as MobilityInputPopupParamType,
          "Please fill all parameters in Path " + (i + 1),
          "Please fill " + member
        )
      );
  }
  return errorList;
};

// Check whether startDateTime in path i, point j is GREATER or EQUAL to endDateTime in the same path & point
export const startEndDateValidationInSamePoint = (
  analysisParams: Array<IMobilityPathParams>,
  i: number,
  j: number,
  errorList: Array<IMobilityValidationErrors>
): Array<IMobilityValidationErrors> => {
  if (
    analysisParams[i].points[j].startDateTime &&
    analysisParams[i].points[j].endDateTime
  ) {
    if (
      analysisParams[i].points[j].startDateTime! >
      analysisParams[i].points[j].endDateTime!
    ) {
      errorList.push(
        generateValidationError(
          i,
          j,
          MobilityValidationStatus.START_DATE_IS_GREATER_THAN_END_DATE,
          MobilityInputPopupParamType.START_DATE_TIME,
          "Please enter correct date-time range in Path " +
            (i + 1) +
            " - " +
            (j === 0 ? "Origin " : "Destination " + j),
          "Must be less than end date-time"
        )
      );
      errorList.push(
        generateValidationError(
          i,
          j,
          MobilityValidationStatus.START_DATE_IS_GREATER_THAN_END_DATE,
          MobilityInputPopupParamType.END_DATE_TIME,
          "Please enter correct date-time range in Path " +
            (i + 1) +
            " - " +
            "Destination " +
            j,
          "Must be greater than start date-time"
        )
      );
    }
    if (
      analysisParams[i].points[j].startDateTime! ===
      analysisParams[i].points[j].endDateTime!
    ) {
      errorList.push(
        generateValidationError(
          i,
          j,
          MobilityValidationStatus.START_DATE_IS_EQUAL_TO_END_DATE,
          MobilityInputPopupParamType.START_DATE_TIME,
          "Please enter correct date-time range in Path " +
            (i + 1) +
            " - " +
            (j === 0 ? "Origin " : "Destination " + j),
          "Must be less than end date-time"
        )
      );
      errorList.push(
        generateValidationError(
          i,
          j,
          MobilityValidationStatus.START_DATE_IS_EQUAL_TO_END_DATE,
          MobilityInputPopupParamType.END_DATE_TIME,
          "Please enter correct date-time range in Path " +
            (i + 1) +
            " - " +
            (j === 0 ? "Origin " : "Destination " + j),
          "Must be greater than start date-time"
        )
      );
    }
  }
  return errorList;
};

export const nextDestStartDateLessThanPreviousDestEndDateValidation = (
  target: Array<IMobilityPathParams>,
  i: number,
  j: number,
  errorList: Array<IMobilityValidationErrors>
): Array<IMobilityValidationErrors> => {
  // If one to many, no need to check next validation
  if (target[i].type === MobilityPathType.ONE_TO_MANY) return errorList;

  if (
    new Date(target[i].points[j].endDateTime!) >
    new Date(target[i].points[j + 1].startDateTime!)
  ) {
    errorList.push(
      generateValidationError(
        i,
        j,
        MobilityValidationStatus.NEXT_DEST_START_DATE_LESS_THAN_PREVIOUS_DEST_DATE,
        MobilityInputPopupParamType.END_DATE_TIME,
        "Please enter correct date-time range in Path " +
          (i + 1) +
          ". For one-to-one path, " +
          (j === 0 ? "origin " : "destination " + j) +
          "start date-time must be less than destination " +
          j +
          "start date-time",
        "Should be less than destination " + j + " start date-time"
      )
    );
    errorList.push(
      generateValidationError(
        i,
        j + 1,
        MobilityValidationStatus.NEXT_DEST_START_DATE_LESS_THAN_PREVIOUS_DEST_DATE,
        MobilityInputPopupParamType.START_DATE_TIME,
        "Please enter correct date-time range in Path " +
          (i + 1) +
          ". For one-to-one path, " +
          (j === 0 ? "origin " : "destination " + j) +
          "start date-time must be less than destination " +
          j +
          "start date-time",
        "Should be greater than " +
          (j === 0 ? "origin" : "destination " + j) +
          " end date-time"
      )
    );
  }
  return errorList;
};

export const mobilityConvertMultipleArrayofResultsToOne = (
  data: IMobilityAnalysisResponse[]
): IMobilityAnalysisResponse => {
  let finalData = data[0];

  finalData.mapResult.colors![0] = generateRandomHsl(0);
  data.forEach((el, i) => {
    el.mapResult.markerPoints.mobilityPathPoints?.[0].forEach((elz) => {
      elz.mobilityPathIndex = i;
    });

    if (i !== 0) {
      // Params
      finalData.params.push(el.params[0]);

      // Result
      finalData.analysisResult.push(el.analysisResult[0]);

      // Map
      finalData.mapResult.markerPoints.mobilityPathPoints?.push(
        el.mapResult.markerPoints.mobilityPathPoints![0]
      );
      finalData.mapResult.colors?.push(generateRandomHsl(i));
      finalData.mapResult.polyLines.push(el.mapResult.polyLines[0]);

      // Statistics
      finalData.statistics.maxTotal =
        finalData.statistics.maxTotal > el.statistics.maxTotal
          ? finalData.statistics.maxTotal
          : el.statistics.maxTotal;
    }
  });

  return finalData;
};

const generateRandomHsl = (i: number): string => {
  switch (i) {
    case 0:
      return "#00ff4a";
    case 1:
      return "#ffdf00";
    case 2:
      return "#9500ff";
    case 3:
      return "#00d4ff";
    case 4:
      return "#ff0000";
    default:
      return "#00ff4a";
  }
};
