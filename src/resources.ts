//TODO: Implement multilingual support (very low priority)

import { autocompleteLibNew } from "./autocompletelib/lib";
import { MapGenerator } from "./components/Map/MapGenerator";
import { MapResultType, MobilityPathType } from "./enums";
import { addHours } from "./helpers/common";

import {
  IMobilityAnalysisResponse,
  IMobilityPathParams,
  IMobilityPointParams,
} from "./interfaces/mobilityInterfaces";

export const resources = {
  strings: {
    en: {
      LOGIN: {
        HEADING_LOGIN: "Login",
        INPUT_PLACEHOLDER_EMAIL: "Write your username",
        INPUT_PLACEHOLDER_PASS: "Write your password",
      },
    },
    id: {
      LOGIN: {
        HEADING_LOGIN: "Masuk",
        INPUT_PLACEHOLDER_EMAIL: "Masukkan username",
        INPUT_PLACEHOLDER_PASS: "Masukkan kata sandi",
      },
    },
  },
  provinces: [
    "Aceh",
    "Bali",
    "Banten",
    "Bengkulu",
    "Daerah Istimewa Yogyakarta",
    "Daerah Khusus Ibukota Jakarta",
    "Gorontalo",
    "Jambi",
    "Jawa Barat",
    "Jawa Tengah",
    "Jawa Timur",
    "Kalimantan Barat",
    "Kalimantan Selatan",
    "Kalimantan Tengah",
    "Kalimantan Timur",
    "Kalimantan Utara",
    "Kepulauan Bangka Belitung",
    "Kepulauan Riau",
    "Lampung",
    "Maluku",
    "Maluku Utara",
    "Nusa Tenggara Barat",
    "Nusa Tenggara Timur",
    "Papua",
    "Papua Barat",
    "Riau",
    "Sulawesi Barat",
    "Sulawesi Selatan",
    "Sulawesi Tengah",
    "Sulawesi Tenggara",
    "Sulawesi Utara",
    "Sumatera Barat",
    "Sumatera Selatan",
    "Sumatera Utara",
  ],
  cities: [
    "Semarang",
    "Kota Yogyakarta",
    "Jakarta Pusat",
    "Kota Bogor",
    "Surakarta",
    "Bandung",
    "Surabaya",
  ],
  districts: [
    "Semarang Selatan",
    "Jetis",
    "Gambir",
    "Bogor Utara",
    "Ps. Kliwon",
    "Bandung Wetan",
    "Genteng",
  ],
  subdistricts: [
    "Lamper Lor",
    "Gowongan",
    "Gambir",
    "Tanah Baru",
    "Gajahan",
    "Citarum",
    "Ketabang",
  ],
  tracingInitialParams: {
    hashNumber: "",
    date: "",
    lowerLimit: "",
    upperLimit: "",
  },
};

export const mobilityInitialPointParams = (): IMobilityPointParams => {
  let startDateTime = new Date("2020-03-31T00:00:00.000Z").toISOString();
  let endDateTime = addHours(2, new Date("2020-04-03T00:00:00.000Z")).toISOString();

  return {
    isCompleted: false,
    province: autocompleteLibNew.provinces[0].name,
    city: "",
    district: "",
    // subdistrict: null,
    startDateTime: startDateTime,
    endDateTime: endDateTime,
  };
};

export const sampleTracingAnalysisResponse = {
  analysisId: "abc123xyz",
  timeStampStartAnalysis: "2022-03-29T08:54:00.037Z",
  timeStampResultReceived: "2022-03-29T09:00:27.815Z",
  userId: "",
  params: [
    {
      hashNo: "536835fgdgh890",
      date: "04/06/2022",
      lowerLim: "3",
      upperLim: "8",
    },
  ],
  analysisResult: [
    {
      id: "abc123xyz-0",
      start_time: "2022-03-29T08:54:00.037Z",
      end_time: "2022-03-29T08:54:00.037Z",
      point_sequence: 1,
      hash_number: "536835fgdgh890",
      surrounding_number: "-",
      surrounding_class: "-",
    },
    {
      id: "abc123xyz-1",
      start_time: "2022-03-29T08:54:00.037Z",
      end_time: "2022-03-29T08:54:00.037Z",
      point_sequence: 2,
      hash_number: "536835fgdgh890",
      surrounding_number: "4535fgegr8997",
      surrounding_class: "lower limit",
    },
    {
      id: "abc123xyz-2",
      start_time: "2022-03-29T08:54:00.037Z",
      end_time: "2022-03-29T08:54:00.037Z",
      point_sequence: 2,
      hash_number: "536835fgdgh890",
      surrounding_number: "5636352feg890",
      surrounding_class: "lower limit",
    },
    {
      id: "abc123xyz-3",
      start_time: "2022-03-29T08:54:00.037Z",
      end_time: "2022-03-29T08:54:00.037Z",
      point_sequence: 3,
      hash_number: "536835fgdgh890",
      surrounding_number: "-",
      surrounding_class: "-",
    },
    {
      id: "abc123xyz-4",
      start_time: "2022-03-29T08:54:00.037Z",
      end_time: "2022-03-29T08:54:00.037Z",
      point_sequence: 4,
      hash_number: "536835fgdgh890",
      surrounding_number: "5636352feg890",
      surrounding_class: "upper limit",
    },
    {
      id: "abc123xyz-5",
      start_time: "2022-03-29T08:54:00.037Z",
      end_time: "2022-03-29T08:54:00.037Z",
      point_sequence: 5,
      hash_number: "536835fgdgh890",
      surrounding_number: "-",
      surrounding_class: "-",
    },
  ],

  mapResult: {
    type: MapResultType.TRACING,
    polyLines: [
      {
        popup: "",
        points: [
          [-7.765141, 110.372482],
          [-7.740769, 110.373418],
          [-7.7308972631472, 110.39924344884675],
          [-7.7489536154446546, 110.41931249689337],
          [-7.71380105472953, 110.4484239818],
        ],
      },
    ],
    markerPoints: {
      tracingPoints: [
        {
          coordinates: [-7.765141, 110.372482],
          tracingMarkerType: "START_POINT",
          popup:
          "<div class='mobility-popup'><span>Hash Number</span><b>Tracing Start Point</b></br>Id: <h3>536835fgdgh890</h3></div>",
          tracingMarkerText: 1,
        },
        {
          coordinates: [-7.740769, 110.373418],
          tracingMarkerType: "TRANSIT_POINT",
          popup: "Tracing Transit Point",
          tracingMarkerText: 2,
        },
        {
          coordinates: [-7.738594196395475, 110.36997185200116],
          tracingMarkerType: "LOWER_POINT",
          popup: "Tracing Surrounding (Lower Limit)",
        },
        {
          coordinates: [-7.738907110819831, 110.37353259942356],
          tracingMarkerType: "LOWER_POINT",
          popup: "Tracing Surrounding (Lower Limit)",
        },
        {
          coordinates: [-7.7308972631472, 110.39924344884675],
          tracingMarkerType: "TRANSIT_POINT",
          popup: "Tracing Transit Point",
          tracingMarkerText: 3,
        },
        {
          coordinates: [-7.7489536154446546, 110.41931249689337],
          tracingMarkerType: "TRANSIT_POINT",
          popup: "Tracing Transit Point",
          tracingMarkerText: 4,
        },
        {
          coordinates: [-7.748822365519548, 110.41828956991066],
          tracingMarkerType: "UPPER_POINT",
          popup: "Tracing Surrounding (Upper Limit)",
        },
        {
          coordinates: [-7.71380105472953, 110.4484239818],
          tracingMarkerType: "STOP_POINT",
          popup: "Tracing Stop Point",
          tracingMarkerText: 5,
        },
      ],
    },
  },

  traceHistory: [
    {
      id: 1,
      hashNo: "536835fgdgh890",
      date: "04/06/2022",
      lowerLim: "3",
      upperLim: "8",
    },
    {
      id: 2,
      hashNo: "576356gfd79979",
      date: "05/08/2022",
      lowerLim: "2",
      upperLim: "3",
    },
  ],
};

export const sampleMobilityAnalysisResponse: IMobilityAnalysisResponse = {
  statistics: {
    maxTotal: 20,
  },
  params: [
    {
      type: MobilityPathType.ONE_TO_ONE, // ONE_TO_MANY or ONE_TO_ONE
      points: [
        {
          isCompleted: true,
          province: "Jawa Tengah",
          city: "Semarang",
          district: "Semarang Selatan",
          subdistrict: "Lamper Lor",
          startDateTime: "2022-03-20T08:54:00.037Z",
          endDateTime: "2022-03-21T09:17:58.477Z",
        },
        {
          isCompleted: true,
          province: "Daerah Istimewa Yogyakarta",
          city: "Kota Yogyakarta",
          district: "Jetis",
          subdistrict: "Gowongan",
          startDateTime: "2022-03-22T08:54:00.037Z",
          endDateTime: "2022-03-23T09:17:58.477Z",
        },
        {
          isCompleted: true,
          province: "Daerah Khusus Ibukota Jakarta",
          city: "Jakarta Pusat",
          district: "Gambir",
          subdistrict: "Gambir",
          startDateTime: "2022-03-26T08:54:00.037Z",
          endDateTime: "2022-03-27T09:17:58.477Z",
        },
        {
          isCompleted: true,
          province: "Jawa Barat",
          city: "Kota Bogor",
          district: "Bogor Utara",
          subdistrict: "Tanah Baru",
          startDateTime: "2022-03-30T08:54:00.037Z",
          endDateTime: "2022-03-30T09:17:58.477Z",
        },
      ],
    },
    {
      type: MobilityPathType.ONE_TO_MANY, // ONE_TO_MANY or ONE_TO_ONE
      points: [
        {
          isCompleted: true,
          province: "Jawa Tengah",
          city: "Surakarta",
          district: "Ps. Kliwon",
          subdistrict: "Gajahan",
          startDateTime: "2022-03-29T08:54:00.037Z",
          endDateTime: "2022-03-29T09:17:58.477Z",
        },
        {
          isCompleted: true,
          province: "Daerah Istimewa Yogyakarta",
          city: "Kota Yogyakarta",
          district: "Jetis",
          subdistrict: "Gowongan",
          startDateTime: "2022-04-29T08:54:00.037Z",
          endDateTime: "2022-04-29T09:17:58.477Z",
        },
        {
          isCompleted: true,
          province: "Jawa Barat",
          city: "Bandung",
          district: "Bandung Wetan",
          subdistrict: "Citarum",
          startDateTime: "2022-03-20T08:54:00.037Z",
          endDateTime: "2022-03-21T09:17:58.477Z",
        },
        {
          isCompleted: true,
          province: "Jawa Timur",
          city: "Surabaya",
          district: "Genteng",
          subdistrict: "Ketabang",
          startDateTime: "2022-03-20T08:54:00.037Z",
          endDateTime: "2022-03-21T09:17:58.477Z",
        },
      ],
    },
  ],
  analysisResult: [
    {
      pathNo: 1, // Path Number
      type: MobilityPathType.ONE_TO_ONE, // ONE_TO_MANY or ONE_TO_ONE
      timeAtLocation: [
        // Consists of time for every destinations of a path
        {
          id: "abc123xyz-0-0",
          origin_name: "Semarang", // Reverse Geocoding Result, maybe more field will be added (kelurahan, kecamatan, etc)
          origin_latLon: [-6.990342998688523, 110.42279429892773], // Location coordinate for map (THIS IS NOT SINGLE MSISDN LATITUDE)
          destination_name: "Yogyakarta",
          destination_latLon: [-7.782925124128602, 110.36706867658292], // Location coordinate for map (THIS IS NOT SINGLE MSISDN LATITUDE)
          origin_startDateTime: "2022-03-20T08:54:00.037Z",
          origin_endDateTime: "2022-03-21T09:17:58.477Z",
          destination_startDateTime: "2022-03-22T08:54:00.037Z",
          destination_endDateTime: "2022-03-23T09:17:58.477Z",
          count: 10,
        },
        {
          id: "abc123xyz-0-1",
          origin_name: "Yogyakarta",
          origin_latLon: [-7.782925124128602, 110.36706867658292],
          destination_name: "Jakarta",
          destination_latLon: [-6.175288868758478, 106.82704966346586],
          origin_startDateTime: "2022-03-22T08:54:00.037Z",
          origin_endDateTime: "2022-03-23T09:17:58.477Z",
          destination_startDateTime: "2022-03-26T08:54:00.037Z",
          destination_endDateTime: "2022-03-27T09:17:58.477Z",
          count: 10,
        },
        {
          id: "abc123xyz-0-2",
          origin_name: "Jakarta",
          origin_latLon: [-6.175288868758478, 106.82704966346586],
          destination_name: "Bogor",
          destination_latLon: [-6.595038, 106.816635],
          origin_startDateTime: "2022-03-26T08:54:00.037Z",
          origin_endDateTime: "2022-03-27T09:17:58.477Z",
          destination_startDateTime: "2022-03-28T08:54:00.037Z",
          destination_endDateTime: "2022-03-29T09:17:58.477Z",
          count: 10,
        },
      ],
    },
    {
      pathNo: 2, // Path Number
      type: MobilityPathType.ONE_TO_MANY, // ONE_TO_MANY or ONE_TO_ONE
      timeAtLocation: [
        // Consists of time for every destinations of a path
        {
          id: "abc123xyz-1-0",
          origin_name: "Surakarta",
          origin_latLon: [-7.575760822956045, 110.82405204544408],
          destination_name: "Yogyakarta",
          destination_latLon: [-7.782925124128602, 110.36806867658292],
          origin_startDateTime: "2022-03-29T08:54:00.037Z",
          origin_endDateTime: "2022-03-29T09:17:58.477Z",
          destination_startDateTime: "2022-04-29T08:54:00.037Z",
          destination_endDateTime: "2022-04-29T09:17:58.477Z",
          count: 10,
        },
        {
          id: "abc123xyz-1-1",
          origin_name: "Surakarta",
          origin_latLon: [-7.575760822956045, 110.82405204544408],
          destination_name: "Bandung",
          destination_latLon: [-6.902357684244036, 107.61872828430037],
          origin_startDateTime: "2022-03-29T08:54:00.037Z",
          origin_endDateTime: "2022-03-29T09:17:58.477Z",
          destination_startDateTime: "2022-04-29T08:54:00.037Z",
          destination_endDateTime: "2022-04-29T09:17:58.477Z",
          count: 15,
        },
        {
          id: "abc123xyz-1-2",
          origin_name: "Surakarta",
          origin_latLon: [-7.575760822956045, 110.82405204544408],
          destination_name: "Surabaya",
          destination_latLon: [-7.2574719, 112.7520883],
          origin_startDateTime: "2022-03-29T08:54:00.037Z",
          origin_endDateTime: "2022-03-29T09:17:58.477Z",
          destination_startDateTime: "2022-04-29T08:54:00.037Z",
          destination_endDateTime: "2022-04-29T09:17:58.477Z",
          count: 20,
        },
      ],
    },
  ],
  mapResult: {
    type: MapResultType.MOBILITY,
    colors: [
      MapGenerator.generateRandomHsl(1),
      MapGenerator.generateRandomHsl(3),
    ],
    polyLines: [
      {
        points: [
          [-6.990342998688523, 110.42279429892773],
          [-7.782925124128602, 110.36706867658292],
          [-6.175288868758478, 106.82704966346586],
          [-6.595038, 106.816635],
        ],
      },
      {
        points: [
          [
            [-7.575760822956045, 110.82405204544408],
            [-7.782925124128602, 110.36806867658292],
          ],
          [
            [-7.575760822956045, 110.82405204544408],
            [-6.902357684244036, 107.61872828430037],
          ],
          [
            [-7.575760822956045, 110.82405204544408],
            [-7.2574719, 112.7520883],
          ],
        ],
      },
    ],
    markerPoints: {
      mobilityPathPoints: [
        [
          {
            mobilityPathIndex: 0,
            coordinates: [-6.990342998688523, 110.42279429892773],
            mobilityMarkerText: "O",
          },
          {
            mobilityPathIndex: 0,
            coordinates: [-7.782925124128602, 110.36706867658292],
            mobilityMarkerText: "D1",
          },
          {
            mobilityPathIndex: 0,
            coordinates: [-6.175288868758478, 106.82704966346586],
            mobilityMarkerText: "D2",
          },
          {
            mobilityPathIndex: 0,
            coordinates: [-6.595038, 106.816635],
            mobilityMarkerText: "D3",
          },
        ],
        [
          {
            mobilityPathIndex: 1,
            coordinates: [-7.575760822956045, 110.82405204544408],
            mobilityMarkerText: "O",
          },
          {
            mobilityPathIndex: 1,
            coordinates: [-7.782925124128602, 110.36806867658292],
            mobilityMarkerText: "D1",
          },
          {
            mobilityPathIndex: 1,
            coordinates: [-6.902357684244036, 107.61872828430037],
            mobilityMarkerText: "D2",
          },
          {
            mobilityPathIndex: 1,
            coordinates: [-7.2574719, 112.7520883],
            mobilityMarkerText: "D3",
          },
        ],
      ],
    },
  },
};

export const mobilityInitialParamTest: IMobilityPathParams = {
  type: MobilityPathType.ONE_TO_ONE,
  points: [
    {
      isCompleted: true,
      province: "Daerah Istimewa Yogyakarta",
      city: "",
      district: "",
      subdistrict: null,
      startDateTime: "2020-03-20T08:54:00.037Z",
      endDateTime: "2020-03-21T09:17:58.477Z",
    },
    {
      isCompleted: true,
      province: "Daerah Istimewa Yogyakarta",
      city: "",
      district: "",
      subdistrict: null,
      startDateTime: "2020-03-20T08:54:00.037Z",
      endDateTime: "2020-03-21T09:17:58.477Z",
    },
  ],
};

export const sampleMobilityAnalysisResponseNew: IMobilityAnalysisResponse =
  JSON.parse(`{
  "analysisId": "1bc2d21a-95b6-47f9-a336-904e7981ebe5",
  "timeStampStartAnalysis": "2022-06-20T04:57:30.130000+00:00",
  "timeStampResultReceived": "2022-06-20T04:57:48.102000+00:00",
  "userId": null,
  "params": [
      {
          "type": "ONE_TO_MANY",
          "points": [
              {
                  "isCompleted": true,
                  "province": "Daerah Istimewa Yogyakarta",
                  "city": "",
                  "district": "",
                  "subdistrict": null,
                  "startDateTime": "2020-03-20T08:54:00.037000+00:00",
                  "endDateTime": "2020-03-29T09:17:58.477000+00:00"
              },
              {
                  "isCompleted": true,
                  "province": "Daerah Istimewa Yogyakarta",
                  "city": "Sleman",
                  "district": "Mlati",
                  "subdistrict": null,
                  "startDateTime": "2020-03-20T08:54:00.037000+00:00",
                  "endDateTime": "2020-03-28T09:17:58.477000+00:00"
              },
              {
                  "isCompleted": true,
                  "province": "Daerah Istimewa Yogyakarta",
                  "city": "",
                  "district": "",
                  "subdistrict": null,
                  "startDateTime": "2020-03-20T08:54:00.037000+00:00",
                  "endDateTime": "2020-03-21T09:17:58.477000+00:00"
              }
          ]
      }
  ],
  "analysisResult": [
      {
          "timeAtLocation": [
              {
                  "id": "1bc2d21a-95b6-47f9-a336-904e7981ebe5-1",
                  "origin_name": "Daerah Istimewa Yogyakarta",
                  "destination_name": "Mlati, Sleman, Daerah Istimewa Yogyakarta",
                  "origin_latLon": [
                      -7.782925124128602,
                      110.36706867658292
                  ],
                  "destination_latLon": [
                      -7.73415716674,
                      110.32847435
                  ],
                  "count": 4,
                  "origin_startDateTime": "2020-03-20T08:54:00.037000+00:00",
                  "origin_endDateTime": "2020-03-29T09:17:58.477000+00:00",
                  "destination_startDateTime": "2020-03-20T08:54:00.037000+00:00",
                  "destination_endDateTime": "2020-03-28T09:17:58.477000+00:00"
              },
              {
                  "id": "1bc2d21a-95b6-47f9-a336-904e7981ebe5-2",
                  "origin_name": "Daerah Istimewa Yogyakarta",
                  "destination_name": "Daerah Istimewa Yogyakarta",
                  "origin_latLon": [
                      -7.782925124128602,
                      110.36706867658292
                  ],
                  "destination_latLon": [
                      -7.782925124128602,
                      110.36706867658292
                  ],
                  "count": 608,
                  "origin_startDateTime": "2020-03-20T08:54:00.037000+00:00",
                  "origin_endDateTime": "2020-03-29T09:17:58.477000+00:00",
                  "destination_startDateTime": "2020-03-20T08:54:00.037000+00:00",
                  "destination_endDateTime": "2020-03-21T09:17:58.477000+00:00"
              }
          ],
          "pathNo": 1,
          "type": "ONE_TO_MANY"
      }
  ],
  "mapResult": {
      "colors": [
          "#000000"
      ],
      "type": "MOBILITY",
      "polyLines": [
          {
              "popup": null,
              "points": [
                  [
                      [
                          -7.782925124128602,
                          110.36706867658292
                      ],
                      [
                          -7.73415716674,
                          110.32847435
                      ]
                  ],
                  [
                      [
                          -7.782925124128602,
                          110.36706867658292
                      ],
                      [
                          -7.782925124128602,
                          110.36706867658292
                      ]
                  ]
              ]
          }
      ],
      "markerPoints": {
          "mobilityPathPoints": [
              [
                  {
                      "coordinates": [
                          -7.782925124128602,
                          110.36706867658292
                      ],
                      "mobilityMarkerText": "O",
                      "mobilityPathIndex": 1
                  },
                  {
                      "coordinates": [
                          -7.73415716674,
                          110.32847435
                      ],
                      "mobilityMarkerText": "D1",
                      "mobilityPathIndex": 1
                  },
                  {
                      "coordinates": [
                          -7.782925124128602,
                          110.36706867658292
                      ],
                      "mobilityMarkerText": "D2",
                      "mobilityPathIndex": 1
                  },
                  {
                      "coordinates": [
                          -7.782925124128602,
                          110.36706867658292
                      ],
                      "mobilityMarkerText": "D3",
                      "mobilityPathIndex": 1
                  }
              ]
          ]
      }
  },
  "statistics": {
      "maxTotal": 608
  }
}`);
