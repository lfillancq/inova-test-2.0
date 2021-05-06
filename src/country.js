class Country {
  //object Country that match the database attribute
  constructor(
    //constructor to associate object attributes to attributes of the instances of the database
    name,
    alpha2Code,
    alpha3Code,
    flag,
    nativeName,
    capital,
    population,
    languages,
    timezones,
    currencies,
    borders
  ) {
    this.name = name;
    this.alpha2Code = alpha2Code;
    this.alpha3Code = alpha3Code;
    this.flag = flag;
    this.nativeName = nativeName;
    this.capital = capital;
    this.population = population;
    this.languages = languages;
    this.timezones = timezones;
    this.currencies = currencies;
    this.borders = borders;
  }
}

export function getCountries() {
  // we are gonna get the data stored on the rest api
  return (
    fetch("https://restcountries.eu/rest/v2/all")
      // the JSON body is taken from the response
      .then((res) => res.json())
      .then((res) => {
        // The response has an 'any' type, so we need to cast
        // it to the 'Country' type, and return it from the promise
        return res;
      })
  );
}
