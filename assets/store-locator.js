class StoreLocator extends HTMLElement {
  constructor() {
    super();
    // this.button = document.querySelector(".store-locator__button");
    this.category = this.querySelector(".category");
    this.state = this.querySelector(".state");
    this.city = this.querySelector(".city");
    this.stores = this.querySelector(".store-locator__locator-stores");

    // Check if data is already available in local storage, if yes, then use it.
    // Otherwise fetch the data from google sheets.
    this.data =
      JSON.parse(sessionStorage.getItem("storeLocatorData")) ||
      this.fetchSheetsData();

    const rows = this.data.values;
    const [header, ...dataRows] = rows;
    // console.log(header.indexOf("Category"));
    this.categoryIndex = header.indexOf("Category");
    this.stateIndex = header.indexOf("State");
    this.cityIndex = header.indexOf("City");
    this.nameIndex = header.indexOf("Name");
    this.addressIndex = header.indexOf("Address");
    this.zipIndex = header.indexOf("Zip code");
    this.openingIndex = header.indexOf("Opening");
    this.closingIndex = header.indexOf("Closing");
    this.phoneIndex = header.indexOf("Phone");

    // console.log(dataRows);
    var categoryValues = dataRows.map((row) => row[this.categoryIndex]);
    // console.log(dataRows[1][1]);
    // console.log(uniqueValues);
    let uniqueCategories = this.getUniqueValues(categoryValues);
    // console.log(uniqueCategories);
    // Porpulating the category options.
    this.populateOptions(uniqueCategories, "category");

    // console.log(stateValues);

    this.getValueOnCategoryChange(dataRows);
    // this.getValueOnStateChange(dataRows);
  }

  getValueOnCategoryChange(dataRows) {
    this.category.addEventListener("change", (e) => {
      console.log(e.target.value);

      let stateValues = dataRows.filter(
        (row) => row[this.categoryIndex] == e.target.value
      );
      console.log(stateValues);
      let reqStateValues = stateValues.map((value) => value[this.stateIndex]);
      let uniqueStateValues = this.getUniqueValues(reqStateValues);
      // console.log(uniqueStateValues);

      // Populating the state options
      this.populateOptions(uniqueStateValues, "state");
      this.getValueOnStateChange(stateValues);
    });
  }

  getValueOnStateChange(stateValues) {
    this.state.addEventListener("change", (e) => {
      // console.log(e.target.value);

      let cityValues = stateValues.filter(
        (row) => row[this.stateIndex] == e.target.value
      );
      console.log(cityValues);
      let reqCityValues = cityValues.map((value) => value[this.cityIndex]);
      let uniqueCityValues = this.getUniqueValues(reqCityValues);
      // console.log(unique);
      // Populating the state options
      this.populateOptions(uniqueCityValues, "city");

      this.getValueOnCityChange(cityValues);
    });
  }

  getValueOnCityChange(cityValues) {
    this.city.addEventListener("change", (e) => {
      let reqValue = cityValues.filter(
        (row) => row[this.cityIndex] == e.target.value
      );
      console.log(reqValue);
      //   document
      //     .querySelector(".store-locator__button")
      //     .addEventListener("click", () => {
      //       this.showData(reqValue);
      //     });

      this.showData(reqValue);
    });
  }

  showData(data) {
    let productCards = "";
    data.forEach((item) => {
      // console.log(item[this.addressIndex]);
      productCards += `<div class="store-card">
        <div class="store-card__title uppercase">${item[this.nameIndex]}</div>
        <div class=""store-card__address>${item[this.addressIndex]} - <span>${
        item[this.zipIndex]
      }</span></div>
        <div class="store-card__opening-closing">
        
        <span>Mon to Sun:</span> ${item[this.openingIndex]}am to ${
        this.closingIndex
      }pm</div>
        <div class="store-card__phone-number">
        : 
        <span class="phone-number">${item[this.phoneIndex]}</span>

        </div>
        <button class="button--secondary store-locator__button">Call Store</button>
      </div> `;
    });

    this.stores.innerHTML = productCards;
  }

  populateOptions(array, idValue) {
    var select = document.getElementById(idValue);
    array.forEach(function (value) {
      var option = document.createElement("option");
      option.text = value;
      option.value = value;
      select.appendChild(option);
    });
  }

  getUniqueValues(values) {
    return [...new Set(values)];
  }

  fetchSheetsData() {
    if (this.data) return this.data;

    const API_KEY = "AIzaSyAL2YkurNhj27304NxBULceq2NvqgosQWw";
    const SPREADSHEET_ID = "1Rg769-994bMl3q9fimHAoP6OKxPOTsxIXs0D_3DFIjU";
    const RANGE = "Sheet-1";
    const BASE_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}`;
    const queryString = `?key=${API_KEY}&majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING`;

    const url = `${BASE_URL}${queryString}`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Store the data in local storage
        console.log(data);
        sessionStorage.setItem("storeLocatorData", JSON.stringify(data));
        return data;
      })
      .catch((error) => console.error(error));
  }
}

customElements.define("store-locator", StoreLocator);

// <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="2048" height="2048" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;fill-rule:evenodd;clip-rule:evenodd"><defs><style>.fil0{fill:none}.fil1{fill:#212121;fill-rule:nonzero}</style></defs><g id="Layer_x0020_1"><g id="_393450736"><path id="_393570144" class="fil0" d="M0 0h2048v2048H0z"/><path id="_393570696" class="fil0" d="M255.999 255.999h1536v1536h-1536z"/></g><path class="fil1" d="M1024 223.999c220.91 0 420.911 89.544 565.684 234.318 144.774 144.773 234.318 344.773 234.318 565.684 0 220.91-89.544 420.911-234.318 565.684-144.773 144.774-344.773 234.318-565.684 234.318-220.91 0-420.911-89.544-565.684-234.318-144.774-144.773-234.318-344.773-234.318-565.684 0-220.91 89.544-420.911 234.318-565.684C603.089 313.543 803.089 223.999 1024 223.999zm520.433 279.568C1411.246 370.379 1227.244 288 1024 288c-203.244 0-387.246 82.378-520.433 215.567C370.379 636.754 288 820.756 288 1024c0 203.244 82.378 387.246 215.567 520.433C636.754 1677.621 820.756 1760 1024 1760c203.244 0 387.246-82.378 520.433-215.567C1677.621 1411.246 1760 1227.244 1760 1024c0-203.244-82.378-387.246-215.567-520.433z"/><path class="fil1" d="M1056 319.999v96h-64v-96zM1056 1632v96h-64v-96zM1728 1056h-96v-64.001h96zM416.001 1056h-96v-64.001h96zM1024 927.999c26.506 0 50.508 10.748 67.88 28.12 17.373 17.374 28.121 41.375 28.121 67.881 0 26.507-10.748 50.508-28.12 67.88-17.373 17.373-41.375 28.122-67.881 28.122s-50.508-10.748-67.88-28.121c-17.373-17.373-28.121-41.374-28.121-67.88 0-26.507 10.748-50.508 28.12-67.881 17.373-17.373 41.375-28.121 67.881-28.121zm22.63 73.371A31.905 31.905 0 0 0 1024 992a31.904 31.904 0 0 0-22.63 9.37A31.905 31.905 0 0 0 992 1024c0 8.84 3.583 16.843 9.37 22.63A31.905 31.905 0 0 0 1024 1056c8.84 0 16.842-3.583 22.63-9.37A31.905 31.905 0 0 0 1056 1024c0-8.84-3.583-16.842-9.37-22.63z"/><path class="fil1" d="M1056 543.998c0-17.673-14.328-32-32-32-17.674 0-32.002 14.327-32.002 32v398.814c0 17.673 14.328 32 32.001 32s32.001-14.327 32.001-32V543.998zM1472 1056c17.673 0 32-14.328 32-32 0-17.674-14.327-32.002-32-32.002h-366.813c-17.673 0-32 14.328-32 32.001s14.327 32.001 32 32.001H1472z"/></g></svg>

// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.314 28.323" style="enable-background:new 0 0 28.314 28.323" xml:space="preserve"><path d="m27.728 20.384-4.242-4.242a1.982 1.982 0 0 0-1.413-.586h-.002c-.534 0-1.036.209-1.413.586L17.83 18.97l-8.485-8.485 2.828-2.828c.78-.78.78-2.05-.001-2.83L7.929.585A1.986 1.986 0 0 0 6.516 0h-.001C5.98 0 5.478.209 5.101.587L.858 4.83C.729 4.958-.389 6.168.142 8.827c.626 3.129 3.246 7.019 7.787 11.56 6.499 6.499 10.598 7.937 12.953 7.937 1.63 0 2.426-.689 2.604-.867l4.242-4.242c.378-.378.587-.881.586-1.416 0-.534-.208-1.037-.586-1.415zm-5.656 5.658c-.028.028-3.409 2.249-12.729-7.07C-.178 9.452 2.276 6.243 2.272 6.244L6.515 2l4.243 4.244-3.535 3.535a.999.999 0 0 0 0 1.414l9.899 9.899a.999.999 0 0 0 1.414 0l3.535-3.536 4.243 4.244-4.242 4.242z"/></svg>
