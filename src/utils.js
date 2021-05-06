export function chop(n, str) {
  //function to chop chunks of the names of countries that could be the researched country
  let chopped = [];
  for (let i = 0; i < str.length - n; i++) {
    //we go through the string
    chopped.push(str.substring(i, i + n)); //we put every chunks of the size n of the input that are in the string
  }
  return chopped;
}
export function codeToName(code, countries) {
  //function that returns the name of a country by associating it with its alpha3Code
  for (let i = 0; i < countries.length; i++) {
    if (code === countries[i].alpha3Code) {
      return countries[i].name;
    }
  }
  return "";
}
export function removeAllChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
