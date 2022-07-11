import { useEffect } from "react";

// import { circle } from "leaflet";
import { useMap } from "react-leaflet";

// import styled from "styled-components";

import { IUserLocation } from "../../interfaces/mapsInterfaces";

import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserLocationAddressAction,
  userLocationActions,
} from "../../store/global/userLocation";

export const MapUserLocationMarker = () => {
  const dispatch = useDispatch();

  const position: IUserLocation | null = useSelector<
    RootState,
    IUserLocation | null
  >((state) => state.userLocation);

  const setPosition = (state: IUserLocation) => {
    dispatch(userLocationActions.setAll(state));
  };

  const mobilityIsUsingUserLocation = useSelector<RootState, boolean | null>(
    (state) => state.mobilityIsUsingUserLocation
  );

  const map = useMap();

  useEffect(() => {
    if (mobilityIsUsingUserLocation)
      map.locate().on("locationfound", function (e) {
        setPosition({
          lat: e.latlng.lat,
          lon: e.latlng.lng,
          bbox: e.bounds.toBBoxString().split(","),
        });
        dispatch(getUserLocationAddressAction());

        // Uncomment when needing user location marker on map
        // const radius = e.accuracy;
        // const circle1 = circle(e.latlng, radius);
        // map.flyTo(e.latlng, 14, {
        //   animate: true,
        //   duration: 1,
        //   easeLinearity: 20,
        // });
        // map.on("zoomend", () => {
        //   circle1.addTo(map);
        // });
      });
  }, [map, dispatch, mobilityIsUsingUserLocation]);

  return position === null ? null : (
    // Uncomment when needing user location marker on map
    // <Marker
    //   position={[position.lat, position.lon]}
    //   icon={
    //     new Icon({
    //       iconUrl: require("../../images/ellipse.png"),
    //       iconSize: [25 - 0.7 * map.getZoom(), 25 - 0.7 * map.getZoom()],
    //     })
    //   }
    // >
    //   <Popup>
    //     <MapUserLocationMarkerStyle>
    //       <span>You are here</span>
    //       {position.address ? (
    //         <>
    //           <h3>{position.address.village}</h3>
    //           <h3>{position.address.municipality}</h3>
    //           <h3>{position.address.county}</h3>
    //           <h3>{position.address.state}</h3>
    //           <h3>{position.address.country}</h3>
    //         </>
    //       ) : (
    //         ""
    //       )}
    //     </MapUserLocationMarkerStyle>
    //   </Popup>
    // </Marker>
    <></>
  );
};

// const MapUserLocationMarkerStyle = styled.div`
//   text-align: left;
//   white-space: nowrap;
//   display: flex;
//   flex-direction: column;

//   span {
//     font-size: 1.5em;
//     font-weight: 600;
//     color: var(--color-blue);
//     display: flex;
//     gap: 0.5em;
//     margin-bottom: 1em;
//   }

//   h3 {
//     overflow: hidden;
//     display: inline-block;
//     text-overflow: ellipsis;
//     width: 100%;
//   }
// `;

export default MapUserLocationMarker;