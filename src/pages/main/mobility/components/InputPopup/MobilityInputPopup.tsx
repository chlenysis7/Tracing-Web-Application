import { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import loadable from "@loadable/component";

// MUI Components
import { Autocomplete, TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  LocalizationProvider,
  DesktopDateTimePicker,
} from "@mui/x-date-pickers";
import idLocale from "date-fns/locale/id";

import IcLocation from "../../../../../images/ic-location.svg";

import "./MobilityInputPopup.css";

// Redux
import { RootState } from "../../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { snackbarActions } from "../../../../../store/global/snackbar";
import { mobilityAnalysisParamsActions } from "../../../../../store/mobility/mobilityAnalysisParams";
import { mobilityAnalysisFormValidationActions } from "../../../../../store/mobility/mobilityAnalysisFormValidation";

// Helpers
import {
  validateInputPopupInput,
} from "../../../../../helpers/mobility";

// Enums & Interfaces
import {
  MobilityInputPopupParamType,
  MobilityValidationStatus,
} from "../../../../../enums";
import {
  IMobilityPathParams,
  IMobilityPointParams,
  IMobilityValidationErrors,
} from "../../../../../interfaces/mobilityInterfaces";
import { ISnackBarState } from "../../../../../interfaces/globalInterfaces";
import {
  IAutocompleteLibrary,
  IUserLocation,
} from "../../../../../interfaces/mapsInterfaces";

const Button = loadable(() => import("../../../../../components/Button"));
const TitledCard = loadable(() => import("../../../../../components/TitledCard"));

export const MobilityInputPopup = ({
  children,
  title,
  pointIndex,
  pathIndex,
  isFromMobileBelowControls,
}: {
  title: string;
  pointIndex: number;
  pathIndex: number;
  children: any;
  isFromMobileBelowControls?: boolean;
}) => {
  const dispatch = useDispatch();

  // Use user's location for parameters
  const isUsingUserLocation = useSelector<RootState, boolean | null>(
    (state) => state.mobilityIsUsingUserLocation
  );

  const userLocation = useSelector<RootState, IUserLocation | null>(
    (state) => state.userLocation
  );

  const fillUserLocationToParams = () => {
    let province = userLocation?.address?.state?.toUpperCase();
    let city = userLocation?.address?.county?.toUpperCase();
    let district = userLocation?.address?.municipality?.toUpperCase();

    // Check whether location exists in autocomplete
    const checkUserLocationInAutocomplete = () => {
      if (autocompleteLib.provinces[0].name !== province) {
        province = "";
        setSnackbarState({
          severity: "error",
          text: "Sorry, your location is currently not supported",
          isOpen: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          autoHideDuration: 1000,
        });
        return;
      }
      if (!autocompleteLib.provinces[0].cities.some((x) => x.name === city)) {
        city = "";
        setSnackbarState({
          severity: "warning",
          text: "Sorry, your city is currently not supported",
          isOpen: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          autoHideDuration: 1000,
        });
        return;
      }
      if (
        !autocompleteLib.provinces[0].cities
          .find((x) => x.name === city)
          ?.districts.some((y) => y.name === district)
      ) {
        district = "";
        setSnackbarState({
          severity: "warning",
          text: "Sorry, your district is currently not supported",
          isOpen: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          autoHideDuration: 1000,
        });
        return;
      }
    };

    checkUserLocationInAutocomplete();

    let newParams = {
      ...pointParams,
      province: province,
      city: city,
      district: district,
    };

    if (newParams.province === "") {
      setCitiesDisabled(true);
      setDistrictsDisabled(true);
      newParams.city = "";
      newParams.district = "";
    } else {
      setCitiesDisabled(false);
      if (newParams.city === "") {
        setDistrictsDisabled(true);
        newParams.district = "";
      } else {
        setDistrictsDisabled(false);
      }
    }

    changePointParams(newParams);
  };
  // End use user's location for parameters

  // Params
  const setAnalysisParams = (state: Array<IMobilityPathParams>) => {
    dispatch(mobilityAnalysisParamsActions.setAll(state));
  };
  const analysisParams = useSelector<RootState, Array<IMobilityPathParams>>(
    (state) => state.mobilityAnalysisParams
  );
  const pathParams: IMobilityPathParams = analysisParams[pathIndex];
  const pointParams: IMobilityPointParams = pathParams.points[pointIndex];
  // End Params

  const autocompleteLib: IAutocompleteLibrary = useSelector<
    RootState,
    IAutocompleteLibrary
  >((state) => state.mobilityAutocomplete);

  // const autocompleteLib: IAutocompleteLibrary = autocompleteLibNew;

  // Get district/city from autocomplete
  const getCityFromAutocomplete = (value: string | null = null) => {
    let province = value ? value : pointParams.province;

    return province
      ? autocompleteLib.provinces
          .filter((e) => e.name === province)[0]
          .cities.map((a) => a.name)
      : [];
  };
  const getDistrictFromAutocomplete = (value: string | null = null) => {
    let city = value ? value : pointParams.city;

    return pointParams.province && city
      ? autocompleteLib.provinces
          .filter((e) => e.name === pointParams.province)[0]
          .cities.filter((e) => e.name === city)[0]
          .districts.map((a) => a.name)
      : [];
  };
  // End get district/city from autocomplete

  // Start autocomplete arrays (better implemented from API, next iteration)
  const provinces = autocompleteLib.provinces.map((a) => a.name);
  const [cities, setCities] = useState<Array<string>>(
    getCityFromAutocomplete()
  );
  const [districts, setDistricts] = useState<Array<string>>(
    getDistrictFromAutocomplete()
  );
  // End autocomplete arrays (temporary)

  // Start Handlers
  const setSnackbarState = (state: ISnackBarState) => {
    dispatch(snackbarActions.setAll(state));
  };

  // Start form disabled states
  const [citiesDisabled, setCitiesDisabled] = useState<boolean>(
    analysisParams[pathIndex].points[pointIndex].city ||
      analysisParams[pathIndex].points[pointIndex].province
      ? false
      : true
  );
  const [districtsDisabled, setDistrictsDisabled] = useState<boolean>(
    analysisParams[pathIndex].points[pointIndex].district ||
      analysisParams[pathIndex].points[pointIndex].city
      ? false
      : true
  );
  // End form disabled states

  const setAnalysisFormValidation = (
    state: Array<IMobilityValidationErrors>
  ) => {
    dispatch(mobilityAnalysisFormValidationActions.setAll(state));
  };
  const analysisFormValidation = useSelector<
    any,
    Array<IMobilityValidationErrors>
  >((state) => state.mobilityAnalysisFormValidation);

  const changePointParams = (newPointParams: IMobilityPointParams) => {
    let newPoints = pathParams.points.slice();
    newPoints[pointIndex] = newPointParams;
    changePathParams({ ...pathParams, points: newPoints });
  };

  /**
   * Set analysis parameters in a path
   * @param {IMobilityPathParams} newPathParams - JSON of new paremeters
   */
  const changePathParams = (newPathParams: IMobilityPathParams) => {
    let newAnalysisParams = [...analysisParams];
    newAnalysisParams[pathIndex] = newPathParams;
    setAnalysisParams([...newAnalysisParams]);
  };

  // Form Change Handler
  const handleProvinceChange = (
    _event: SyntheticEvent,
    value: string | null
  ) => {
    // Clear validation
    const filter: {
      [key: string]: any;
      path: number;
      point: number;
      paramType: MobilityInputPopupParamType;
    } = {
      path: pathIndex,
      point: pointIndex,
      paramType: MobilityInputPopupParamType.PROVINCE,
    };
    let newAnalysisFormValidation = analysisFormValidation.filter((item) => {
      for (let key in filter) {
        if (item[key] === undefined || item[key] !== filter[key]) return true;
      }
      return false;
    });
    setAnalysisFormValidation(newAnalysisFormValidation);

    setDistrictsDisabled(true);

    changePointParams({
      ...pointParams,
      province: value ? value : "",
      city: "",
      district: "",
    });

    setCities(getCityFromAutocomplete(value));
    setCitiesDisabled(value === null);
  };

  const handleCityChange = (_event: SyntheticEvent, value: string | null) => {
    const filter: {
      [key: string]: any;
      path: number;
      point: number;
      paramType: MobilityInputPopupParamType;
    } = {
      path: pathIndex,
      point: pointIndex,
      paramType: MobilityInputPopupParamType.CITY,
    };
    let newAnalysisFormValidation = analysisFormValidation.filter((item) => {
      for (let key in filter) {
        if (item[key] === undefined || item[key] !== filter[key]) return true;
      }
      return false;
    });
    setAnalysisFormValidation(newAnalysisFormValidation);

    setDistrictsDisabled(value === null);
    changePointParams({
      ...pointParams,
      city: value ? value : "",
      district: "",
    });

    // Provide autocomplete
    setDistricts(getDistrictFromAutocomplete(value));
    setDistrictsDisabled(value === null);
  };

  const handleDistrictChange = (
    _event: SyntheticEvent,
    value: string | null
  ) => {
    // TODO: Call API get subdistricts based on district value
    checkWhetherFieldIsEmpty(MobilityInputPopupParamType.DISTRICT, value);
    changePointParams({ ...pointParams, district: value ? value : "" });
  };

  const handleStartDateTimeChange = (value: string | null | undefined) => {
    // Clear validation
    const filter: {
      [key: string]: any;
      path: number;
      point: number;
      paramType: MobilityInputPopupParamType;
    } = {
      path: pathIndex,
      point: pointIndex,
      paramType: MobilityInputPopupParamType.START_DATE_TIME,
    };
    let newAnalysisFormValidation = analysisFormValidation.filter((item) => {
      for (let key in filter) {
        if (item[key] === undefined || item[key] !== filter[key]) return true;
      }
      return false;
    });
    setAnalysisFormValidation(newAnalysisFormValidation);

    let startDateTime = new Date(value!).toISOString();
    checkWhetherFieldIsEmpty(
      MobilityInputPopupParamType.START_DATE_TIME,
      startDateTime
    );
    changePointParams({
      ...pointParams,
      startDateTime,
    });
  };

  const handleEndDateTimeChange = (value: string | null | undefined) => {
    // Clear validation
    const filter: {
      [key: string]: any;
      path: number;
      point: number;
      paramType: MobilityInputPopupParamType;
    } = {
      path: pathIndex,
      point: pointIndex,
      paramType: MobilityInputPopupParamType.END_DATE_TIME,
    };
    let newAnalysisFormValidation = analysisFormValidation.filter((item) => {
      for (let key in filter) {
        if (item[key] === undefined || item[key] !== filter[key]) return true;
      }
      return false;
    });
    setAnalysisFormValidation(newAnalysisFormValidation);

    let endDateTime = new Date(value!).toISOString();
    checkWhetherFieldIsEmpty(
      MobilityInputPopupParamType.END_DATE_TIME,
      endDateTime
    );
    changePointParams({
      ...pointParams,
      endDateTime,
    });
  };

  // End Form Change Handler

  const changeIsCompleted = () => {
    changePointParams({
      ...pointParams,
      isCompleted:
        validateInputPopupInput(pointParams) === MobilityValidationStatus.VALID
          ? true
          : false,
    });
  };

  const handleOkAndCloseButtonClick = (close: () => void) => {
    changeIsCompleted();
    switch (validateInputPopupInput(pointParams)) {
      case MobilityValidationStatus.DATA_NOT_FULL:
        setSnackbarState({
          severity: "error",
          text: "Please fill all required parameters in " + title,
          isOpen: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          autoHideDuration: 1000,
        });
        break;
      case MobilityValidationStatus.START_DATE_IS_GREATER_THAN_END_DATE:
        setSnackbarState({
          severity: "error",
          text: "Start date in " + title + " must be less than end date",
          isOpen: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          autoHideDuration: 1000,
        });
        break;
      case MobilityValidationStatus.START_DATE_IS_EQUAL_TO_END_DATE:
        setSnackbarState({
          severity: "error",
          text: "Start date in " + title + " must be less than end date",
          isOpen: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          autoHideDuration: 1000,
        });
        break;
      default:
        setSnackbarState({
          severity: "success",
          text: "Analysis parameters saved : (" + title + ")",
          isOpen: true,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          autoHideDuration: 1000,
        });
        break;
    }
    close();
  };
  // End Handlers

  let errorArray = analysisFormValidation.filter(
    (e) => e.path === pathIndex && e.point === pointIndex
  );

  let [arrayOfEmptyFields, setArrayOfEmptyFields] = useState<
    Array<{
      type: MobilityInputPopupParamType;
      msg: string;
    }>
  >([]);

  const checkWhetherFieldIsEmpty = (
    type: MobilityInputPopupParamType,
    value?: string | null
  ) => {
    if (
      // type !== MobilityInputPopupParamType.CITY && // Enable when there are more than 1 provinces
      type !== MobilityInputPopupParamType.DISTRICT
    ) {
      let newArr: Array<{
        type: MobilityInputPopupParamType;
        msg: string;
      }> = [];
      newArr.push({
        type: type,
        msg: `Please fill ${type}`,
      });
      if (value) {
        newArr = arrayOfEmptyFields.filter((e) => e.type !== type);
      }
      setArrayOfEmptyFields(newArr);
    }
  };

  const generateIsError = (type: MobilityInputPopupParamType): boolean =>
    arrayOfEmptyFields.filter((e) => e.type === type).length > 0 ||
    (errorArray.length > 0 &&
      errorArray.filter((e) => e.paramType === type).length > 0);

  const generateHelperText = (type: MobilityInputPopupParamType): string => {
    return arrayOfEmptyFields.filter((e) => e.type === type).length > 0
      ? arrayOfEmptyFields[0].msg
      : errorArray.length > 0 &&
        errorArray.filter((e) => e.paramType === type).length > 0
      ? errorArray.filter((e) => e.paramType === type)[0].pointErrorMessage!
      : "";
  };

  return (
    <Popup
      trigger={children}
      modal
      className={
        isFromMobileBelowControls
          ? "modal-a popup-overlay-mobile"
          : "modal-a popup-overlay-desktop"
      }
      closeOnDocumentClick={false}
      closeOnEscape={false}
    >
      {(close: () => void) => (
        <TitledCard
          className={
            isFromMobileBelowControls ? "input-popup-mobile" : "modal-a"
          }
          closable
          close={() => {
            handleOkAndCloseButtonClick(close);
          }}
          title="Enter analysis parameters"
          subtitle={title}
        >
          <PopupContentStyle>
            {isUsingUserLocation && userLocation && userLocation.address ? (
              <Button
                primary
                cta
                className="btn-location"
                onClick={fillUserLocationToParams}
              >
                <img src={IcLocation} alt="Location icon" />
                <span>Use My Location</span>
              </Button>
            ) : null}

            {/* Provinsi */}
            <Autocomplete
              disablePortal
              onChange={handleProvinceChange}
              value={pointParams.province === "" ? null : pointParams.province}
              className="mb"
              options={provinces}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onBlur={(e) =>
                    checkWhetherFieldIsEmpty(
                      MobilityInputPopupParamType.PROVINCE,
                      e.target.value
                    )
                  }
                  error={generateIsError(MobilityInputPopupParamType.PROVINCE)}
                  helperText={generateHelperText(
                    MobilityInputPopupParamType.PROVINCE
                  )}
                  label="*Province (Provinsi)"
                />
              )}
            />
            {/* End Provinsi */}

            {/* Kabupaten/Kota */}
            <Autocomplete
              disablePortal
              onChange={handleCityChange}
              value={pointParams.city === "" ? null : pointParams.city}
              className="mb"
              options={cities}
              disabled={citiesDisabled}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onBlur={(e) =>
                    checkWhetherFieldIsEmpty(
                      MobilityInputPopupParamType.CITY,
                      e.target.value
                    )
                  }
                  error={generateIsError(MobilityInputPopupParamType.CITY)}
                  helperText={generateHelperText(
                    MobilityInputPopupParamType.CITY
                  )}
                  label="*City (Kabupaten/Kota)"
                />
              )}
            />
            {/* End Kabupaten/Kota */}

            {/* Kecamatan */}
            <Autocomplete
              disablePortal
              onChange={handleDistrictChange}
              value={pointParams.district === "" ? null : pointParams.district}
              className="mb"
              options={districts}
              disabled={districtsDisabled}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onBlur={(e) =>
                    checkWhetherFieldIsEmpty(
                      MobilityInputPopupParamType.DISTRICT,
                      e.target.value
                    )
                  }
                  error={generateIsError(MobilityInputPopupParamType.DISTRICT)}
                  helperText={generateHelperText(
                    MobilityInputPopupParamType.DISTRICT
                  )}
                  label="District (Kecamatan)"
                />
              )}
            />
            {/* End Kecamatan */}

            {/* Kelurahan */}
            {/* <Autocomplete
              disablePortal
              onChange={handleSubDistrictChange}
              value={pointParams.subdistrict}
              className="mb"
              options={subdistricts}
              renderInput={(params) => (
                <TextField {...params} label="Subdistrict" />
              )}
            /> */}
            {/* End Kelurahan */}

            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={idLocale}
            >
              {/* Start Date Time */}
              <DesktopDateTimePicker
                renderInput={(props) => (
                  <TextField
                    className="full-width mb"
                    {...props}
                    onBlur={(e) =>
                      checkWhetherFieldIsEmpty(
                        MobilityInputPopupParamType.START_DATE_TIME,
                        e.target.value
                      )
                    }
                    error={generateIsError(
                      MobilityInputPopupParamType.START_DATE_TIME
                    )}
                    helperText={generateHelperText(
                      MobilityInputPopupParamType.START_DATE_TIME
                    )}
                  />
                )}
                label="*Start Date & Time"
                disableMaskedInput
                value={pointParams.startDateTime}
                onChange={(date) => handleStartDateTimeChange(date)}
              />
              {/* Start Date Time */}

              {/* End Date Time */}
              <DesktopDateTimePicker
                disableMaskedInput
                renderInput={(props) => (
                  <TextField
                    className="full-width"
                    {...props}
                    onBlur={(e) =>
                      checkWhetherFieldIsEmpty(
                        MobilityInputPopupParamType.END_DATE_TIME,
                        e.target.value
                      )
                    }
                    error={generateIsError(
                      MobilityInputPopupParamType.END_DATE_TIME
                    )}
                    helperText={generateHelperText(
                      MobilityInputPopupParamType.END_DATE_TIME
                    )}
                  />
                )}
                label="*End Date & Time"
                value={pointParams.endDateTime}
                onChange={handleEndDateTimeChange}
              />
              {/* End Date Time */}
            </LocalizationProvider>
            <p>* Required</p>
            <Button
              green
              cta
              fullwidth
              className="btn-ok"
              onClick={() => handleOkAndCloseButtonClick(close)}
            >
              <span>OK</span>
            </Button>
          </PopupContentStyle>
        </TitledCard>
      )}
    </Popup>
  );
};

const PopupContentStyle = styled.div`
  padding: var(--px-l);
  .mb {
    margin-bottom: var(--px-l);
  }
  .full-width {
    width: 100%;
  }
  .btn-location {
    margin-bottom: var(--px-l);
    padding: 0.6em 1em;
    border-radius: 5px;
  }
  .btn-ok {
    justify-content: center;
    margin-top: var(--px-l);
  }
  p {
    color: var(--color-red);
    margin-top: 1em;
  }
`;

export default MobilityInputPopup;