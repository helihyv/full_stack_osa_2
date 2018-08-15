import React from 'react';
import './App.css'
import personService from './services/persons'

const FilterForm = ({filterText, onChange}) => {
  return(
    <div>
      rajaa näytettäviä nimiä:  <input
                                    value={filterText}
                                    onChange={onChange}
                                  />
    </div>

  )
}

const Person = ({person}) => {
  return(
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
    </tr>
  )
}


class App extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filterText: ''
    }
  }

  componentDidMount() {

    personService
      .getAll()
      .then(response => {
        this.setState({persons: response.data})
      })
      .catch(error => {
        alert(`Puhelinluettelon lataaminen tietokannasta epäonnistui: ${error}`)
      })
  }

  isDuplicate = (element) => {
    return element.name === this.state.newName
  }

  addPerson = (event) => {
    event.preventDefault()

    if (!this.state.persons.some(this.isDuplicate))
    {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }

      personService
        .create(personObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNumber: ''
          })
        })
        .catch(error => {
          alert(`Henkilön lisääminen tietokantaan epäonnistui: ${error}`)
        })
    }
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({newNumber: event.target.value})
  }

  handleFilterChange = (event) => {
    this.setState({filterText: event.target.value})
  }

  render() {

    const shownPersons = this.state.persons.filter((person) =>
      {
        return person.name.toLowerCase()
          .includes(this.state.filterText.toLowerCase())
      })

    return (
      <div>
        <h2>Puhelinluettelo</h2>

        <FilterForm
          filterText={this.state.filtertext}
          onChange={this.handleFilterChange}
        />

        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input
                    value={this.state.newName}
                    onChange={this.handleNameChange}
                  />
          </div>
          <div>
            numero: <input
                    value={this.state.newNumber}
                    onChange={this.handleNumberChange}
                    />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
          <h2>Numerot</h2>
          <table>
            <tbody>
              {shownPersons.map((person ) =>
                <Person key={person.name} person={person} />)}
            </tbody>
          </table>

      </div>

    )
  }
}

export default App;
