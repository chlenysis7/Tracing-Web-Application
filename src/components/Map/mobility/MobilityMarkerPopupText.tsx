//CSS
import styled from "styled-components";

// Interface
import { IMobilityPointParams } from "../../../interfaces/mobilityInterfaces";

export const MobilityMarkerPopupText = (
  pathIndex: number,
  mobilityMarkerText?: string,
  color?: string | undefined,
  point?: IMobilityPointParams
) => (
  <MobilityMarkerPopupTextStyle>
    <span>
      <div className="color-box" style={{ background: color }} />
      Path {pathIndex + 1} Marker
    </span>

    <h4 className="blue">
      {mobilityMarkerText?.charAt(0) === "O" ? "Origin" : "Destination"}{" "}
      {mobilityMarkerText?.substring(1)}
      {" Location"}
    </h4>

    {point?.province ? (
      <>
        <blockquote className="blue">{"Province (Provinsi)"}</blockquote>
        <h3>{point.province}</h3>
      </>
    ) : (
      ""
    )}
    {point?.city ? (
      <>
        <blockquote className="blue">{"City (Kota/Kabupaten)"}</blockquote>
        <h3>{point.city}</h3>
      </>
    ) : (
      ""
    )}
    {point?.district ? (
      <>
        <blockquote className="blue">{"District (Kecamatan)"}</blockquote>
        <h3>{point.district}</h3>
      </>
    ) : (
      ""
    )}
  </MobilityMarkerPopupTextStyle>
);

const MobilityMarkerPopupTextStyle = styled.div`
  text-align: left;
  white-space: nowrap;
  display: flex;
  flex-direction: column;

  span {
    font-size: 1.5em;
    font-weight: 600;
    color: var(--color-blue);
    display: flex;
    gap: 0.5em;
  }

  .color-box {
    width: 24px;
    border-radius: 5px;
    height: 24px;
    background: blue;
    box-shadow: 0px 8px 24px rgba(176, 190, 197, 0.32),
      0px 3px 5px rgba(176, 190, 197, 0.32);
  }

  h4 {
    margin-top: 1em;
    margin-bottom: 0.5em;
  }

  blockquote {
    margin-top: 0.5em;
  }

  h3 {
    overflow: hidden;
    display: inline-block;
    text-overflow: ellipsis;
    width: 100%;
  }

  span + div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-weight: bold;
    margin-top: 1em;
    gap: 1em;
    border-radius: 10px;
  }

  .orange {
    color: var(--color-orange);
  }
  .blue {
    color: var(--color-blue);
  }
`;

export default MobilityMarkerPopupText;