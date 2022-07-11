// Redux
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { mobilityMapControlStateActions } from "../../../store/mobility/mobilityMapControlState";

// CSS
import styled from "styled-components";

// Interface
import { IMapState } from "../../../interfaces/mapsInterfaces";

export const MobilityMapControls = () => {
  const dispatch = useDispatch();

  const setControlState = (state: Array<boolean>) => {
    dispatch(mobilityMapControlStateActions.setAll(state));
  };

  const mapState: IMapState | undefined = useSelector<
    RootState,
    IMapState | undefined
  >((state) => state.mobilityAnalysisResult.result?.mapResult);

  const controlState: Array<boolean> | null = useSelector<
    RootState,
    Array<boolean> | null
  >((state) => state.mobilityMapControlState);

  const handleCheckboxChange = (index: number) => {
    let _controlState = [...controlState!];
    _controlState[index] = !_controlState[index];
    setControlState(_controlState);
  };

  return (
    <div>
      {mapState ? <span className="default-header">Other Controls</span> : null}
      {mapState
        ? mapState.colors?.map((color, i) => (
            <MobilityCheckBoxControlStyle
              key={i}
              className="check"
              color={color}
            >
              <input
                type="checkbox"
                id={"cb" + i}
                checked={controlState![i]}
                onChange={() => handleCheckboxChange(i)}
              />
              <label htmlFor={"cb" + i}>{"Path " + (i + 1)}</label>
            </MobilityCheckBoxControlStyle>
          ))
        : null}
    </div>
  );
};

const MobilityCheckBoxControlStyle = styled.p<{ color: string }>`
  margin-top: 0.5em;

  > span {
    color: var(--color-blue);
    font-weight: 800;
    font-size: 1.2em;
    margin-bottom: 2em;
  }

  /* Base for label styling */
  [type="checkbox"]:not(:checked),
  [type="checkbox"]:checked {
    position: absolute;
    left: 0;
    opacity: 0.01;
  }
  [type="checkbox"]:not(:checked) + label,
  [type="checkbox"]:checked + label {
    position: relative;
    padding-left: 2em;
    padding-bottom: 0.2em;
    font-size: 1em;
    line-height: 1.7;
    display: block;
    cursor: pointer;
  }

  /* checkbox aspect */
  [type="checkbox"]:not(:checked) + label:before,
  [type="checkbox"]:checked + label:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 1.4em;
    height: 1.4em;
    border: 1px solid #aaa;
    background: #fff;
    border-radius: 0.2em;
    box-shadow: ${(props, abc = "inset 0 1px 3px rgba(0, 0, 0, 0.1),0 0 0 ") =>
      abc + props.color + "22" || abc + "palevioletred"};
    -webkit-transition: all 0.275s;
    transition: all 0.275s;
  }

  /* checked mark aspect */
  [type="checkbox"]:not(:checked) + label:after,
  [type="checkbox"]:checked + label:after {
    content: "✕";
    position: absolute;
    top: 0.58em;
    left: 0.18em;
    font-size: 1.375em;
    color: ${(props) => props.color || "palevioletred"};
    line-height: 0;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }

  /* checked mark aspect changes */
  [type="checkbox"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0) rotate(45deg);
    transform: scale(0) rotate(45deg);
  }

  [type="checkbox"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1) rotate(0);
    transform: scale(1) rotate(0);
  }

  /* Disabled checkbox */
  [type="checkbox"]:disabled:not(:checked) + label:before,
  [type="checkbox"]:disabled:checked + label:before {
    box-shadow: none;
    border-color: #bbb;
    background-color: #e9e9e9;
  }

  [type="checkbox"]:disabled:checked + label:after {
    color: #777;
  }

  [type="checkbox"]:disabled + label {
    color: #aaa;
  }

  /* Accessibility */
  [type="checkbox"]:checked:focus + label:before,
  [type="checkbox"]:not(:checked):focus + label:before {
    box-shadow: ${(
      props,
      abc = "inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 6px "
    ) => abc + props.color + "22" || abc + "palevioletred"};
  }
`;

export default MobilityMapControls;