// React
import { ChangeEvent } from "react";

// Redux
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { mapTypeActions } from "../../store/global/mapType";

// CSS
import styled from "styled-components";

// Enums & Interfaces
import { MapType } from "../../enums";
import { IMapControlsProps } from "../../interfaces/mapsInterfaces";

export const MapControls = ({
  children,
  isFromMobileBelowControls,
}: IMapControlsProps) => {
  
  const dispatch = useDispatch();

  const mapType: MapType = useSelector<RootState, MapType>((state) => state.mapType);
  
  const setMapType = (state: MapType) => {
    dispatch(mapTypeActions.setAll(state));
  };

  const handleMapTypeChange = (e: ChangeEvent<any>) => {
    setMapType(e.target.value);
  };

  let child = (
    <>
      <span>Map Layer</span>
      <div className="maptype-controls">
        <div>
          <input
            type="radio"
            value={MapType.STREET}
            id="maptype-street"
            onChange={(e) => handleMapTypeChange(e)}
            name="maptype"
            checked={mapType === MapType.STREET}
          />
          <label htmlFor="maptype-street">Street</label>
        </div>
        <div>
          <input
            type="radio"
            value={MapType.SATELITE}
            id="maptype-satelite"
            onChange={(e) => handleMapTypeChange(e)}
            checked={mapType === MapType.SATELITE}
            name="maptype"
          />
          <label htmlFor="maptype-satelite">Satelite</label>
        </div>
        <div>
          <input
            type="radio"
            value={MapType.HYBRID}
            id="maptype-hybrid"
            onChange={(e) => handleMapTypeChange(e)}
            checked={mapType === MapType.HYBRID}
            name="maptype"
          />
          <label htmlFor="maptype-hybrid">Hybrid</label>
        </div>
      </div>
      <div className="specific-control">{children}</div>
    </>
  );

  if (!isFromMobileBelowControls)
    return <MapControlsStyle>{child}</MapControlsStyle>;
  else return <MobileMapControlsStyle>{child}</MobileMapControlsStyle>;

};

const MapControlsStyle = styled.div`
  position: absolute;
  max-height: calc(12vh + 10em);
  right: var(--px-xs);
  background: white;
  z-index: 1;
  top: 6em;
  padding: var(--px-m);
  border-radius: 10px;
  width: 10.5em;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }

  > span {
    color: var(--color-blue);
    font-weight: 800;
    font-size: 1.2em;
    margin-bottom: 2em;
  }
  .maptype-controls {
    margin-top: 1em;
    margin-bottom: 1em;
    input {
      margin-right: 0.6em;
    }
    > div {
      margin-bottom: 0.5em;
    }
    label {
      cursor: pointer;
    }
  }

  @media screen and (max-width: 892px) {
    top: 7em;
  }

  @media screen and (max-width: 768px) {
    top: 7.5em;
  }

  @media only screen and (max-width: 516px) {
    top: 8.5em;
  }
`;

const MobileMapControlsStyle = styled.div`
  max-height: calc(12vh + 10em);
  z-index: 1000;
  padding: var(--px-m);
  border-radius: 10px;
  width: 10.5em;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }

  > span {
    color: var(--color-blue);
    font-weight: 800;
    font-size: 1.2em;
    margin-bottom: 2em;
  }
  .maptype-controls {
    margin-top: 1em;
    margin-bottom: 1em;
    input {
      margin-right: 0.6em;
    }
    > div {
      margin-bottom: 0.5em;
    }
    label {
      cursor: pointer;
    }
  }
`;

export default MapControls;