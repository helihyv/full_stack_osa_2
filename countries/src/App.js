import React, { Component } from 'react';
import axios from 'axios';
import './App.css'

const CountryFilterInput = ({text,onChange}) =>

  <div>
    find countries:   <input
                        value={text}
                        onChange={onChange}
                      />
  </div>


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allCountries: [],
      findText: ''

    }
  }

  componentDidMount() {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
        this.setState({allCountries: response.data})
    })
  }

  handleFindTextChange = (event) => {
    this.setState({findText: event.target.value })
  }

    render() {

    const shownCountries = this.state.allCountries.filter((country) => {
      return country.name.toLowerCase()
        .includes(this.state.findText.toLowerCase())
    })

    if (shownCountries.length > 10) {
      return(
        <div>
          <CountryFilterInput
            text={this.state.findText}
            onChange={this.handleFindTextChange}
          />
          too many matches, specify another filter
        </div>

      )
    }

    if (shownCountries.length > 1) {
      return (
        <div>
          <CountryFilterInput
            text={this.state.findText}
            onChange={this.handleFindTextChange}
          />

          <ul>
            {shownCountries.map(country =>
            <li key={country.name}>{country.name}</li>)}
          </ul>
        </div>
      )
    }

    if (shownCountries.length === 1) {
      return (
        <div>
          <CountryFilterInput
            text={this.state.findText}
            onChange={this.handleFindTextChange}
          />
          <h1>{shownCountries[0].name} {shownCountries[0].nativeName}</h1>
          <p> capital: {shownCountries[0].capital}</p>
          <p> population: {shownCountries[0].population} </p>
          <img src={shownCountries[0].flag} alt='flag'/>
        </div>
      )
    }

    return (
      <div>
        <CountryFilterInput
          text={this.state.findText}
          onChange={this.handleFindTextChange}
        />
      </div>
    )



  }
}

export default App;
