import { removeAllChild } from "./utils.js";
import { codeToName } from "./utils.js";
import { getCountries } from "./country.js";

window.buildDetails = function (selected) {
  //function that will build the text of the container according to what country is selected
  document
    .querySelectorAll("li")
    .forEach(
      (el) =>
        (el.style.backgroundColor = el.id === selected.id ? "#aaa" : "#ddd")
    );
  getCountries().then((countries) => {
    for (let i = 0; i < countries.length; i++) {
      //we go through all the countries in the database (here the list of 'Country' objects)
      if (selected.id === countries[i].name) {
        document.getElementById("name").innerHTML =
          "Name : " + countries[i].name;
        document.getElementById("capital").innerHTML =
          "Capital : " + countries[i].capital;
        document.getElementById("flag").src = countries[i].flag;
        document.getElementById("nativeName").innerHTML =
          "Native Name : " + countries[i].nativeName;
        document.getElementById("population").innerHTML =
          "Population : " + String(countries[i].population);
        document.getElementById("languages").innerHTML =
          "Languages : " + countries[i].languages[0]["name"];
        for (let j = 1; j < countries[i].languages.length; j++) {
          document.getElementById("languages").innerHTML +=
            ", " + countries[i].languages[j]["name"];
        }
        document.getElementById("currencies").innerHTML =
          "Currencies : " + countries[i].currencies[0]["name"];
        for (let j = 1; j < countries[i].currencies.length; j++) {
          document.getElementById("currencies").innerHTML +=
            ", " + countries[i].currencies[j]["name"];
        }
        document.getElementById("borders").innerHTML =
          "Borders : " + codeToName(countries[i].borders[0], countries);
        for (let j = 1; j < countries[i].borders.length; j++) {
          document.getElementById("borders").innerHTML +=
            ", " + codeToName(countries[i].borders[j], countries);
        }
        if (codeToName(countries[i].borders, countries) === []) {
          document.getElementById("borders").innerHTML = "Borders : None";
        }
        document.getElementById("timezones").innerHTML =
          "Times Zones : " + countries[i].timezones[0];
        for (let j = 1; j < countries[i].timezones.length; j++) {
          document.getElementById("timezones").innerHTML +=
            ", " + countries[i].timezones[j];
        }
      }
    }
  });
};

window.buildListCountry = function () {
  //function that will build the list of resulting countries according to the input submitted
  //we get the data from the rest api and we convert it into a list of 'Country' objects
  var input;
  getCountries().then((countries) => {
    var list = document.getElementById("list"); //we store the parent element of the list in a variable called list
    removeAllChild(list);
    if (document.getElementById("searchCountry").value == null) {
      return window.buildListCountry();
    } else {
      input = document.getElementById("searchCountry").value;
    }
    for (let i = 0; i < countries.length; i++) {
      //we go through all the countries in the database (here the list of 'Country' objects)
      if (
        countries[i].name.toLowerCase().startsWith(input.toLowerCase())
        //input.toLowerCase() in chop(input.length, countries[i].name.toLowerCase())
      ) {
        //if the name of the country starts with the input then we create a 'li' element that will be part of the resulting list
        var item = document.createElement("li");
        //this element will hold a text with the name and ISO 3166-1 Code of the country
        item.innerHTML =
          "<h2>" + countries[i].name + "<h2> \n " + countries[i].alpha2Code;
        item.id = countries[i].name;
        item.onclick = function () {
          window.buildDetails(this);
        };
        list.appendChild(item);
      }
    }
  });
};
