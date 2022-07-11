import { IDistrictLibrary } from "./interfaces/mapsInterfaces";

export const AutocompleteGenerator = () => {
  let ori: IDistrictLibrary[] = [];

  let array: { key: string; doc_count: number }[] = JSON.parse(`[]`);

  // Log to console

  let newz = array.map((a) => a.key).sort();
  let oldz = ori.map((a) => a.name).sort();

  console.log(newz);
  console.log(oldz);

  let myArray = newz.filter(function (el) {
    return oldz.indexOf(el) < 0;
  });

  let oldNew = ori.filter(function (el) {
    return newz.indexOf(el.name) >= 0;
  });

  console.log(myArray);
  console.log(oldNew);

  let newAutocomplete: IDistrictLibrary[] = [];
  myArray.forEach((el) => {
    newAutocomplete.push({
      id: "",
      coordinates: null,
      name: el,
    });
  });

  console.log(JSON.stringify([...newAutocomplete, ...oldNew]));
  return <></>;
};
