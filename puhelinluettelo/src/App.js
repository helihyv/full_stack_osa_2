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

const Person = ({person, removeFunction}) => {
  return(
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button
          type='button'
          onClick={removeFunction}
        >
          Poista
        </button>
      </td>
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
        console.log(this.state.persons)
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

  removePerson = (id) => {
    return () => {
      const name = (this.state.persons.find((person) => {
        return person.id === id
      })).name

      if (window.confirm(`Poistetaanko ${name}?`)) {
        personService
          .deletePerson(id)
          .then(response => {
            const persons = this.state.persons.filter(person =>{
              return (person.id !== id)
              })
            this.setState({persons})
          })
          .catch(error => {
            alert(`Henkilön ${name} poistaminen epäonnistui:  ${error}`)
          })
      }
    }
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
                <Person
                  key={person.name}
                  person={person}
                  removeFunction={this.removePerson(person.id)}
                />
              )}
            </tbody>
          </table>

      </div>

    )
  }
}

export default App;
