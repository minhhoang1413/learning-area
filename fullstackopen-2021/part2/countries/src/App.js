import React, { useState, useEffect } from "react";

import Countries from "./components/Countries";

function App() {
  const [newInput, setNewInput] = useState("");
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setAllCountries(data);
      })
  }, []);

  const handleNewInput = (ev) => setNewInput(ev.target.value);
  const showCountry = (name) => setNewInput(name);

  const countriesFilter = allCountries.filter(country => country.name.common.toLowerCase().includes(newInput.toLowerCase()))
  return (
    <div className="">
      find countries
      <input value={newInput} onChange={handleNewInput} />
      <Countries newInput={newInput} countries={countriesFilter} showCountry={showCountry} />
    </div>
  );
}

export default App;
