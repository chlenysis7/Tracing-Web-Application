import L from "leaflet";
import { hslToHex } from "../../helpers/common";
import { IMarkerPoints } from "../../interfaces/mapsInterfaces";

export abstract class MapGenerator {
  static ellipse = new L.Icon({
    iconUrl: require("../../images/ellipse.png"),
    iconSize: [10, 10],
  });

  private static defaultMarker = new L.Icon({
    iconUrl: require("../../images/ic-upper-limit.png"),
    iconSize: [30, 42],
  });

  // TRACING MARKER ICONS
  private static tracingStartIcon = new L.Icon({
    iconUrl: require("../../images/v-start-point.png"),
    iconSize: [50, 58],
  });

  private static tracingStopIcon = new L.Icon({
    iconUrl: require("../../images/v-stop-point.png"),
    iconSize: [50, 58],
  });

  private static tracingTransitIcon = new L.Icon({
    iconUrl: require("../../images/v-transit-point.png"),
    iconSize: [50, 58],
  });

  private static tracingLowerLimitIcon = new L.Icon({
    iconUrl: require("../../images/v-lower-point.png"),
    iconSize: [30, 42],
  });

  private static tracingUpperLimitIcon = new L.Icon({
    iconUrl: require("../../images/v-upper-point.png"),
    iconSize: [30, 42],
  });
  // END TRACING MARKER ICONS

  public static generateMarker(
    point: IMarkerPoints,
    color: string = "#00ff4a"
  ) {
    let icon: L.Icon<L.IconOptions> | L.DivIcon = this.defaultMarker;
    if (point.tracingMarkerType) {
      switch (point?.tracingMarkerType) {
        case "START_POINT":
          icon = L.divIcon({
          className: "custom-div-icon",
          html:
            "<div style='background-color:" +
            "#FD7E14" +
            ";' class='tracing-marker-pin'></div><span class='tracing-marker-text'>" +
            point.tracingMarkerText +
            "</span>",
          iconSize: [30, 42],
          iconAnchor: [15, 42],
          });
          break;
        case "STOP_POINT":
          icon = L.divIcon({
          className: "custom-div-icon",
          html:
              "<div style='background-color:" +
              "#FFC107" +
              ";' class='tracing-marker-pin'></div><span class='tracing-marker-text'>" +
              point.tracingMarkerText +
              "</span>",
          iconSize: [30, 42],
          iconAnchor: [15, 42],
          });
          break;
        case "TRANSIT_POINT":
          icon = L.divIcon({
          className: "custom-div-icon",
          html:
              "<div style='background-color:" +
              "#DC3545" +
              ";' class='tracing-marker-pin'></div><span class='tracing-marker-text'>" +
              point.tracingMarkerText +
              "</span>",
          iconSize: [30, 42],
          iconAnchor: [15, 42],
          });
          break;
        case "LOWER_POINT":
          icon = L.divIcon({
            className: "custom-div-icon",
            html:
                "<div style='background-color:" +
                "#0D6EFD" +
                ";' class='tracing-surrounding-pin'></div>",
          iconSize: [30, 42],
          iconAnchor: [15, 42],
          });
          break;
        case "UPPER_POINT":
          icon = L.divIcon({
            className: "custom-div-icon",
            html:
                "<div style='background-color:" +
                "#1AA179" +
                ";' class='tracing-surrounding-pin'></div>",
          iconSize: [30, 42],
          iconAnchor: [15, 42],
          });
          break;
        default:
          icon = this.defaultMarker;
          break;
      }
    } else if (point.mobilityMarkerText) {
      icon = L.divIcon({
        className: "custom-div-icon",
        html:
          "<div style='background-color:" +
          color +
          ";' class='mobility-marker-pin'></div><span class='mobility-marker-text'>" +
          point.mobilityMarkerText +
          "</span>",
        iconSize: [30, 42],
        iconAnchor: [15, 42],
      });
    }
    return icon;
  }

  public static generateRandomHex() {
    const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D"];

    let hex = "#";

    for (let i = 0; i < 6; i++) {
      const index = Math.floor(Math.random() * hexValues.length);
      hex += hexValues[index];
    }

    return hex;
  }

  public static generateRandomHsl(number: number) {
    const hue = number * 137.508;
    return hslToHex(hue, 100, 50);
  }
}
