import React, { useState, useEffect } from 'react'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then(response => {
          // console.log(response);
          // if (!response.ok) {

          //   return {found: false}
          // }
          return response.json()
        })
        .then(data => {
          // data.found = true
          setCountry(data)
        })
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  console.log('first country', country);
  if (!country) {
    return null
  }
  if (country.message) {
    return (
      <div>
        {country.message}
      </div>
    )
  }
  return (
    <div>
      <h3>{country[0].name.common} </h3>
      <div>capital {country[0].capital[0]} </div>
      <div>population {country[0].population}</div>
      <img src={country[0].flags.svg} height='100' alt={`flag of ${country[0].name.common}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  //console.log(country);
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    //console.log(country);
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App