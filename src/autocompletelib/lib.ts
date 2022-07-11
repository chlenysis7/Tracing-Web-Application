import { IAutocompleteLibrary } from "../interfaces/mapsInterfaces";
import { bantulLib } from "./bantul";
import { gunungKidulLib } from "./gunungKidul";
import { kotaYogyakartaLib } from "./kotayogyakarta";
import { kulonProgoLib } from "./kulonProgo";
import { slemanLib } from "./sleman";

export const autocompleteLib: IAutocompleteLibrary = {
  provinces: [
    {
      id: "34",
      name: "Daerah Istimewa Yogyakarta",
      coordinates: [-7.782925124128602, 110.36706867658292],
      cities: [
        bantulLib,
        gunungKidulLib,
        kulonProgoLib,
        slemanLib,
        kotaYogyakartaLib,
      ],
    },
  ],
};

export const autocompleteLibNew: IAutocompleteLibrary = JSON.parse(`{
  "provinces": [
    {
      "id": "34",
      "name": "DAERAH ISTIMEWA YOGYAKARTA",
      "coordinates": [-7.782925124128602, 110.36706867658292],
      "cities": [
        {
          "id": "34.02",
          "name": "BANTUL",
          "coordinates": [-7.886517766958319, 110.32770793820241],
          "districts": [
            {
              "id": "34.71.07",
              "name": "WIROBRAJAN",
              "coordinates": [-7.8129123, 110.3206659]
            },
            {
              "id": "34.02.03",
              "name": "KRETEK",
              "coordinates": [-7.94497, 110.31758]
            },
            {
              "id": "34.02.02",
              "name": "SANDEN",
              "coordinates": [-7.9553099, 110.265831]
            },
            {
              "id": "34.02.01",
              "name": "SRANDAKAN",
              "coordinates": [-7.938721, 110.253601]
            },
            {
              "id": "34.02.07",
              "name": "PAJANGAN",
              "coordinates": [-7.8844, 110.2706]
            },
            {
              "id": "34.02.06",
              "name": "PANDAK",
              "coordinates": [-7.91059941106, 110.294293104]
            },
            {
              "id": "34.02.05",
              "name": "BAMBANG LIPURO",
              "coordinates": [-7.84628739, 110.4140528]
            },
            {
              "id": "34.02.04",
              "name": "PUNDONG",
              "coordinates": [-7.958405, 110.323265]
            },
            {
              "id": "34.02.14",
              "name": "PIYUNGAN",
              "coordinates": [-7.823169915, 110.425995935]
            },
            {
              "id": "34.02.13",
              "name": "PLERET",
              "coordinates": [-7.86757256098, 110.397327226]
            },
            {
              "id": "34.02.12",
              "name": "BANGUNTAPAN",
              "coordinates": [-7.828627459, 110.409692436]
            },
            {
              "id": "34.02.11",
              "name": "DLINGO",
              "coordinates": [-7.9402412, 110.4679176]
            },
            {
              "id": "34.02.17",
              "name": "SEDAYU",
              "coordinates": [-7.79727, 110.32554]
            },
            {
              "id": "34.02.16",
              "name": "KASIHAN",
              "coordinates": [-7.82615550563, 110.316256604]
            },
            {
              "id": "34.02.15",
              "name": "SEWON",
              "coordinates": [-7.85603, 110.35707]
            },
            {
              "id": "34.02.10",
              "name": "IMOGIRI",
              "coordinates": [-7.90988135, 110.38292364]
            },
            {
              "id": "34.02.09",
              "name": "JETIS",
              "coordinates": [-7.83569, 110.39312]
            },
            {
              "id": "34.02.08",
              "name": "BANTUL",
              "coordinates": [-7.881713219944743, 110.33260835560971]
            }
          ]
        },
        {
          "id": "34.03",
          "name": "GUNUNGKIDUL",
          "coordinates": [-7.964669073045371, 110.60132929587375],
          "districts": [
            {
              "id": "34.03.15",
              "name": "SAPTOSARI",
              "coordinates": [-8.03308225269, 110.517593839]
            },
            {
              "id": "34.03.14",
              "name": "GEDANGSARI",
              "coordinates": [-7.839744, 110.596994]
            },
            {
              "id": "34.03.13",
              "name": "NGAWEN",
              "coordinates": [-7.83925, 110.70212]
            },
            {
              "id": "34.03.12",
              "name": "SEMIN",
              "coordinates": [-7.70175333333, 110.783266667]
            },
            {
              "id": "34.03.18",
              "name": "PURWOSARI",
              "coordinates": [-8.000099064, 110.381448141]
            },
            {
              "id": "34.03.17",
              "name": "TANJUNGSARI",
              "coordinates": [-8.0839642, 110.5811363]
            },
            {
              "id": "34.03.16",
              "name": "GIRISUBO",
              "coordinates": [-8.168714, 110.7360863]
            },
            {
              "id": "34.03.11",
              "name": "RONGKOP",
              "coordinates": [-8.134746, 110.57667]
            },
            {
              "id": "34.03.10",
              "name": "PONJONG",
              "coordinates": [-7.998882, 110.708259]
            },
            {
              "id": "34.03.09",
              "name": "KARANGMOJO",
              "coordinates": [-7.81798, 110.41722]
            },
            {
              "id": "34.03.04",
              "name": "PATUK",
              "coordinates": [-7.86479, 110.51]
            },
            {
              "id": "34.03.03",
              "name": "PLAYEN",
              "coordinates": [-7.9311271, 110.5453816]
            },
            {
              "id": "34.03.02",
              "name": "NGLIPAR",
              "coordinates": [-7.882361, 110.61695]
            },
            {
              "id": "34.03.01",
              "name": "WONOSARI",
              "coordinates": [-7.3696042, 110.550602]
            },
            {
              "id": "34.03.08",
              "name": "SEMANU",
              "coordinates": [-7.993037, 110.641427]
            },
            {
              "id": "34.03.07",
              "name": "TEPUS",
              "coordinates": [-8.12840605, 110.64459103]
            },
            {
              "id": "34.03.06",
              "name": "PANGGANG",
              "coordinates": [-8.0131342, 110.4205214]
            },
            {
              "id": "34.03.05",
              "name": "PALIYAN",
              "coordinates": [-7.99294928571, 110.505206623]
            }
          ]
        },
        {
          "id": "34.01",
          "name": "KULON PROGO",
          "coordinates": [-7.8581564155955546, 110.15960397487595],
          "districts": [
            {
              "id": "34.01.02",
              "name": "WATES",
              "coordinates": [-7.86526650277, 110.154245204]
            },
            {
              "id": "34.01.01",
              "name": "TEMON",
              "coordinates": [-7.8878421, 110.0747439]
            },
            {
              "id": "34.01.06",
              "name": "SENTOLO",
              "coordinates": [-7.8291727, 110.2176941]
            },
            {
              "id": "34.01.05",
              "name": "LENDAH",
              "coordinates": [-7.9113594, 110.2508208]
            },
            {
              "id": "34.01.04",
              "name": "GALUR",
              "coordinates": [-7.9468924, 110.2004539]
            },
            {
              "id": "34.01.03",
              "name": "PANJATAN",
              "coordinates": [-7.9201073, 110.1521719]
            },
            {
              "id": "34.01.12",
              "name": "KALIBAWANG",
              "coordinates": [-7.67792323788, 110.26123336]
            },
            {
              "id": "34.01.11",
              "name": "SAMIGALUH",
              "coordinates": [-7.661341, 110.15413184]
            },
            {
              "id": "34.01.10",
              "name": "NANGGULAN",
              "coordinates": [-7.79688, 110.17526]
            },
            {
              "id": "34.01.09",
              "name": "GIRIMULYO",
              "coordinates": [-7.753982, 110.1759975]
            },
            {
              "id": "34.01.08",
              "name": "KOKAP",
              "coordinates": [-7.797832, 110.118734]
            },
            {
              "id": "34.01.07",
              "name": "PENGASIH",
              "coordinates": [-7.855954, 110.173794]
            }
          ]
        },
        {
          "id": "34.04",
          "name": "SLEMAN",
          "coordinates": [-7.716224426126768, 110.35566572655573],
          "districts": [
            {
              "id": "34.04.01",
              "name": "GAMPING",
              "coordinates": [-7.79893813, 110.32573711]
            },
            {
              "id": "34.04.16",
              "name": "PAKEM",
              "coordinates": [-7.670897, 110.383576]
            },
            {
              "id": "34.04.15",
              "name": "TURI",
              "coordinates": [-7.6987862, 110.3526336]
            },
            {
              "id": "34.04.14",
              "name": "TEMPEL",
              "coordinates": [-7.70159792665, 110.292824319]
            },
            {
              "id": "34.04.13",
              "name": "SLEMAN",
              "coordinates": [-7.696612413103882, 110.3463081623045]
            },
            {
              "id": "34.04.17",
              "name": "CANGKRINGAN",
              "coordinates": [-7.680651, 110.44372]
            },
            {
              "id": "34.04.12",
              "name": "NGAGLIK",
              "coordinates": [-7.710072, 110.436234]
            },
            {
              "id": "34.04.11",
              "name": "NGEMPLAK",
              "coordinates": [-7.7041738, 110.4560006]
            },
            {
              "id": "34.04.10",
              "name": "KALASAN",
              "coordinates": [-7.75939753056, 110.456523716]
            },
            {
              "id": "34.04.05",
              "name": "SEYEGAN",
              "coordinates": [-7.7221047, 110.3010938]
            },
            {
              "id": "34.04.04",
              "name": "MINGGIR",
              "coordinates": [-7.725549, 110.235003]
            },
            {
              "id": "34.04.03",
              "name": "MOYUDAN",
              "coordinates": [-7.7710497, 110.2474787]
            },
            {
              "id": "34.04.02",
              "name": "GODEAN",
              "coordinates": [-7.766990185835517, 110.29109819000801]
            },
            {
              "id": "34.04.09",
              "name": "PRAMBANAN",
              "coordinates": [-7.752024803646974, 110.49132061948086]
            },
            {
              "id": "34.04.08",
              "name": "BERBAH",
              "coordinates": [-7.80373, 110.43981]
            },
            {
              "id": "34.04.07",
              "name": "DEPOK",
              "coordinates": [-7.76501902835, 110.38250752]
            },
            {
              "id": "34.04.06",
              "name": "MLATI",
              "coordinates": [-7.73415716674, 110.32847435]
            }
          ]
        },
        {
          "id": "34.71",
          "name": "KOTA YOGYAKARTA",
          "coordinates": [-7.782925124128602, 110.36706867658292],
          "districts": [
            {
              "id": "34.71.10",
              "name": "GONDOMANAN",
              "coordinates": [-7.7998, 110.3681]
            },
            {
              "id": "34.71.09",
              "name": "KRATON",
              "coordinates": [-7.809, 110.3636]
            },
            {
              "id": "34.71.08",
              "name": "MANTRIJERON",
              "coordinates": [7.8196, 110.3577]
            },
            {
              "id": "34.71.03",
              "name": "GONDOKUSUMAN",
              "coordinates": [-7.7831, 110.3792]
            },
            {
              "id": "34.71.02",
              "name": "JETIS",
              "coordinates": [-7.7833, 110.3636]
            },
            {
              "id": "34.71.01",
              "name": "TEGALREJO",
              "coordinates": [-7.78484218, 110.35406967]
            },
            {
              "id": "34.71.07",
              "name": "WIROBRAJAN",
              "coordinates": [-7.8129123, 110.3206659]
            },
            {
              "id": "34.71.06",
              "name": "NGAMPILAN",
              "coordinates": [-7.807006, 110.355775]
            },
            {
              "id": "34.71.05",
              "name": "GEDONGTENGEN",
              "coordinates": [-7.7924, 110.3622]
            },
            {
              "id": "34.71.04",
              "name": "DANUREJAN",
              "coordinates": [-7.7933, 110.3696]
            },
            {
              "id": "34.71.14",
              "name": "KOTAGEDE",
              "coordinates": [-7.8188912, 110.3979074]
            },
            {
              "id": "34.71.13",
              "name": "UMBULHARJO",
              "coordinates": [-7.8195003, 110.3897823]
            },
            {
              "id": "34.71.12",
              "name": "MERGANGSAN",
              "coordinates": [-7.81329679247, 110.373681707]
            },
            {
              "id": "34.71.11",
              "name": "PAKUALAMAN",
              "coordinates": [-7.8, 110.367]
            }
          ]
        }
      ]
    }
  ]
}
`);
