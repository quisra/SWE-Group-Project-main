const data: locationType[] = [
  {
    number: "UNF",
    name: "University of North Florida",
    coordinates: { lat: 30.2661340813742, lng: -81.50719579077145 },
    images: [
      {
        floor: "Campus Map",
        shorthand: "MAP",
        image: "https://www.unf.edu/ehs/images/vehicle-safety-cart-map.jpeg",
      },
    ],
  },
  {
    number: "51",
    name: "Building 51 - Social Sciences",
    coordinates: { lat: 30.26957709945413, lng: -81.50628133740905 },
    images: [
      {
        floor: "Floor 1",
        shorthand: "F1",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069662101934710794/20230130_115142.jpg",
      },
      {
        floor: "Floor 2",
        shorthand: "F2",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069662541824925796/20230130_115419.jpg",
      },
      {
        floor: "Floor 3",
        shorthand: "F3",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069662831991066654/20230130_115636.jpg",
      },
      {
        floor: "Floor Directory",
        shorthand: "DIR",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069662891130753154/20230130_115107.jpg",
      },
    ],
  },
  {
    number: "58",
    name: "Building 58 - Student Union",
    coordinates: { lat: 30.271890435799264, lng: -81.50923390523664 },
    images: [
      {
        floor: "East Building",
        shorthand: "EAST",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069677109582250084/20230130_125414.jpg",
      },
      {
        floor: "West Building",
        shorthand: "WEST",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069677109351551006/20230130_125307.jpg",
      },
    ],
  },
  {
    number: "12",
    name: "Building 12 - Thomas G. Carpenter Library",
    coordinates: { lat: 30.269504032957066, lng: -81.50865484296324 },
    images: [
      {
        floor: "Floor 1",
        shorthand: "F1",
        image:
          "https://cdn.discordapp.com/attachments/608139184347152405/1098449481852256266/1stfloor_catalog__2020_.png",
      },
      {
        floor: "Floor 2",
        shorthand: "F2",
        image:
          "https://cdn.discordapp.com/attachments/608139184347152405/1098449533156982784/2ndfloor_catalog_2018.png",
      },
      {
        floor: "Floor 3",
        shorthand: "F3",
        image:
          "https://cdn.discordapp.com/attachments/608139184347152405/1098449552262037504/3rdfloor_catalog__2020_.png",
      },
      {
        floor: "Floor 4",
        shorthand: "F4",
        image:
          "https://cdn.discordapp.com/attachments/608139184347152405/1098449567357349999/4thfloor_catalog__2020_.png",
      },
    ],
  },
  // {
  //   number: "41",
  //   name: "Building 41 - Police Building",
  //   coordinates: { lat: 30.26714525333742, lng: -81.51225882517198 },
  //   images: [
  //     {
  //       floor: "",
  //       shorthand: "",
  //       image: "",
  //     },
  //   ],
  // },
  {
    number: "15",
    name: "Building 15 - John E. Mathews Jr. Computer Science Building",
    coordinates: { lat: 30.268807185718103, lng: -81.50684544735205 },
    images: [
      {
        floor: "Floor 1",
        shorthand: "F1",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069659282691325953/20230130_114048.jpg",
      },
      {
        floor: "Floor 2",
        shorthand: "F2",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069659333362716803/20230130_114056.jpg",
      },
      {
        floor: "Floor 3",
        shorthand: "F3",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069659374118785024/20230130_114104.jpg",
      },
    ],
  },
  {
    number: "59",
    name: "Building 59 - Biological Sciences Building",
    coordinates: { lat: 30.270307112540355, lng: -81.50624548917119 },
    images: [
      {
        floor: "Floor 1",
        shorthand: "F1",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069664913942925342/20230130_120457.jpg",
      },
      {
        floor: "Floor 2",
        shorthand: "F2",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069665083778666547/20230130_120457.jpg",
      },
      {
        floor: "Floor 3",
        shorthand: "F3",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069665116158693557/20230130_120505.jpg",
      },
      {
        floor: "Floor 4",
        shorthand: "F4",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069665490076717117/20230130_120505.jpg",
      },
      {
        floor: "DO NOT OPEN - OPHIOCORDYCEPS UNILATERALIS INSIDE",
        shorthand: "DEAD",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069666148246896740/20230130_120044.jpg",
      },
    ],
  },
  {
    number: "4",
    name: "Building 4 - Skinner - Jones Hall",
    coordinates: { lat: 30.270872018394005, lng: -81.50726045294674 },
    images: [
      {
        floor: "Floor 1",
        shorthand: "F1",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069669976216178828/20230130_121809.jpg",
      },
      {
        floor: "Floor 2",
        shorthand: "F2",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069669952853909694/20230130_121607.jpg",
      },
      {
        floor: "Floor 3",
        shorthand: "F3",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069670006335488141/20230130_122020.jpg",
      },
      {
        floor: "Floor 4",
        shorthand: "F4",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069670039717937162/20230130_122151.jpg",
      },
    ],
  },
  {
    number: "39A",
    name: "Building 39A - J. Brooks Brown Hall Addition",
    coordinates: { lat: 30.270946037349983, lng: -81.50781980531323 },
    images: [
      {
        floor: "Floor 1",
        shorthand: "F1",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069673453134815374/20230130_123104.jpg",
      },
      {
        floor: "Floor 2",
        shorthand: "F2",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069673504439537734/20230130_123959.jpg",
      },
      {
        floor: "Floor 3",
        shorthand: "F3",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069673586786308266/20230130_123525.jpg",
      },
      {
        floor: "Floor 4",
        shorthand: "F4",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069673682156400871/20230130_123743.jpg",
      },
    ],
  },
  {
    number: "39",
    name: "Building 39 - J. Brooks Brown Hall",
    coordinates: { lat: 30.27150703942272, lng: -81.50786491648992 },
    images: [
      {
        floor: "Floor 1",
        shorthand: "F1",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069675814091767818/20230130_124932.jpg",
      },
      {
        floor: "Floor 2",
        shorthand: "F2",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069675885231341698/20230130_124347.jpg",
      },
      {
        floor: "Floor 3",
        shorthand: "F3",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069675941170786384/20230130_124635.jpg",
      },
      {
        floor: "Floor 4",
        shorthand: "F4",
        image:
          "https://cdn.discordapp.com/attachments/1068603528051966022/1069675986767052911/20230130_124757.jpg",
      },
    ],
  },
];

export default data;

export type locationType = {
  number: string;
  name: string;
  coordinates: { lat: number; lng: number };
  images: {
    floor: string;
    shorthand: string;
    image: string;
  }[];
};
