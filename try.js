const obj = { foo: "bar", baz: 42, check: null };
var newObj = {};

for (var key in obj) {
  var value = obj[key];
  // console.log("key: ", key);
  if (value != null) {
    newObj[key] = value;
    // objCopy.push(value);
    // console.log("value: ", value);
  }
}
console.log(newObj);

// console.log(objCopy);
// let results = [
//   [
//     {
//       entityId: "/m/06cd7",
//       score: 1.4680436849594116,
//       description: "Rosemary"
//     },
//     {
//       entityId: "/g/121_5m9m",
//       score: 0.45509999990463257,
//       description: "herb garden"
//     },
//     {
//       entityId: "/m/06p35",
//       score: 0.382099986076355,
//       description: "Spice"
//     },
//     {
//       entityId: "/m/05s2s",
//       score: 0.3774000108242035,
//       description: "Plants"
//     },
//     {
//       entityId: "/m/08jcd3",
//       score: 0.32908201217651367,
//       description: "Southernwood"
//     },
//     {
//       entityId: "/g/11j123bc02",
//       score: 0.3043000102043152,
//       description: "Rosmarin Rosmarinus officinalis"
//     },
//     {
//       entityId: "/m/011b86cq",
//       score: 0.2289000004529953,
//       description: "Subshrub"
//     },
//     {
//       entityId: "/m/0gqbt",
//       score: 0.19776466488838196,
//       description: "Shrub"
//     },
//     {
//       entityId: "/m/076_jj",
//       score: 0.19670000672340393,
//       description: "Cutting"
//     },
//     {
//       entityId: "/t/29cqm860kk63f",
//       score: 0.18729999661445618,
//       description: ""
//     }
//   ]
// ];
//
// let getTrefle = [
//   {
//     slug: "poliomintha",
//     scientific_name: "Poliomintha",
//     link: "http://trefle.io/api/plants/169056",
//     id: 169056,
//     complete_data: false,
//     common_name: "rosemary-mint"
//   },
//   {
//     slug: "poliomintha-glabrescens",
//     scientific_name: "Poliomintha glabrescens",
//     link: "http://trefle.io/api/plants/169057",
//     id: 169057,
//     complete_data: false,
//     common_name: "leafy rosemary-mint"
//   },
//   {
//     slug: "rosmarinus",
//     scientific_name: "Rosmarinus",
//     link: "http://trefle.io/api/plants/175919",
//     id: 175919,
//     complete_data: false,
//     common_name: "rosemary"
//   },
//   {
//     slug: "conradina-canescens",
//     scientific_name: "Conradina canescens",
//     link: "http://trefle.io/api/plants/122746",
//     id: 122746,
//     complete_data: false,
//     common_name: "false rosemary"
//   },
//   {
//     slug: "helianthemum-rosmarinifolium",
//     scientific_name: "Helianthemum rosmarinifolium",
//     link: "http://trefle.io/api/plants/141476",
//     id: 141476,
//     complete_data: false,
//     common_name: "rosemary frostweed"
//   },
//   {
//     slug: "limonium-californicum",
//     scientific_name: "Limonium californicum",
//     link: "http://trefle.io/api/plants/150277",
//     id: 150277,
//     complete_data: false,
//     common_name: "marsh rosemary"
//   },
//   {
//     slug: "andromeda",
//     scientific_name: "Andromeda",
//     link: "http://trefle.io/api/plants/104911",
//     id: 104911,
//     complete_data: false,
//     common_name: "bog rosemary"
//   },
//   {
//     slug: "argusia-gnaphalodes",
//     scientific_name: "Argusia gnaphalodes",
//     link: "http://trefle.io/api/plants/107121",
//     id: 107121,
//     complete_data: false,
//     common_name: "sea rosemary"
//   },
//   {
//     slug: "argusia",
//     scientific_name: "Argusia",
//     link: "http://trefle.io/api/plants/107120",
//     id: 107120,
//     complete_data: false,
//     common_name: "sea rosemary"
//   },
//   {
//     slug: "argusia-sibirica",
//     scientific_name: "Argusia sibirica",
//     link: "http://trefle.io/api/plants/107124",
//     id: 107124,
//     complete_data: false,
//     common_name: "Siberian sea rosemary"
//   },
//   {
//     slug: "conradina",
//     scientific_name: "Conradina",
//     link: "http://trefle.io/api/plants/122745",
//     id: 122745,
//     complete_data: false,
//     common_name: "false rosemary"
//   },
//   {
//     slug: "conradina-etonia",
//     scientific_name: "Conradina etonia",
//     link: "http://trefle.io/api/plants/122750",
//     id: 122750,
//     complete_data: false,
//     common_name: "Etoniah rosemary"
//   },
//   {
//     slug: "conradina-grandiflora",
//     scientific_name: "Conradina grandiflora",
//     link: "http://trefle.io/api/plants/122752",
//     id: 122752,
//     complete_data: false,
//     common_name: "largeflower false rosemary"
//   },
//   {
//     slug: "conradina-verticillata",
//     scientific_name: "Conradina verticillata",
//     link: "http://trefle.io/api/plants/122753",
//     id: 122753,
//     complete_data: false,
//     common_name: "Cumberland false rosemary"
//   },
//   {
//     slug: "conradina-glabra",
//     scientific_name: "Conradina glabra",
//     link: "http://trefle.io/api/plants/122751",
//     id: 122751,
//     complete_data: false,
//     common_name: "Apalachicola false rosemary"
//   },
//   {
//     slug: "rosmarinus-officinalis",
//     scientific_name: "Rosmarinus officinalis",
//     link: "http://trefle.io/api/plants/175920",
//     id: 175920,
//     complete_data: true,
//     common_name: "rosemary"
//   },
//   {
//     slug: "andromeda-×jamesiana",
//     scientific_name: "Andromeda ×jamesiana",
//     link: "http://trefle.io/api/plants/104912",
//     id: 104912,
//     complete_data: false,
//     common_name: "bog rosemary"
//   },
//   {
//     slug: "andromeda-polifolia",
//     scientific_name: "Andromeda polifolia",
//     link: "http://trefle.io/api/plants/104914",
//     id: 104914,
//     complete_data: false,
//     common_name: "bog rosemary"
//   },
//   {
//     slug: "merremia-quinquefolia",
//     scientific_name: "Merremia quinquefolia",
//     link: "http://trefle.io/api/plants/155934",
//     id: 155934,
//     complete_data: false,
//     common_name: "rock rosemary"
//   }
// ];
//
// results.push(getTrefle);
// console.log("results: ", results);
