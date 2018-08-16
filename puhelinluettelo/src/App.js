import React from 'react';
import './index.css'
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

const Notification = ({ message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filterText: '',
      notification: null
    }
  }

  componentDidMount() {

    personService
      .getAll()
      .then(response => {
        this.setState({persons: response.data})
      })

  }

  isDuplicate = (element) => {
    return element.name === this.state.newName
  }

  addPerson = (event) => {
    event.preventDefault()

    const indexOfPersonToReplace = this.state.persons.findIndex(this.isDuplicate)


    if (indexOfPersonToReplace === -1) { //Ei samannimistä, luodaan uusi henkilö
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
            newNumber: '',
            notification: `lisättiin ${response.data.name}`
          })
          setTimeout(() => {
            this.setState({notification: null})
          },5000)

        })

    }

    else {
      const personToReplace = this.state.persons[indexOfPersonToReplace]
      if (window.confirm(`${personToReplace.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        personToReplace.number = this.state.newNumber
        personService
          .update(personToReplace.id,personToReplace)
          .then(response => {
            let persons = this.state.persons
            this.state.persons.splice(indexOfPersonToReplace,1,response.data)
            this.setState({
              persons,
              newName: '',
              newNumber: '',
              notification: `muutettiin henkilön ${response.data.name} puhelinnumero`
            })
            setTimeout(() => {
              this.setState({notification: null})
            },5000)

          })

          .catch(error => { //henkiloä ei löytynytkään palvelimelta
            //...joten lisätään hänet uudelleen
            personService
              .create(personToReplace)
              .then(response => {
                let persons = this.state.persons
                persons.splice(indexOfPersonToReplace,1,response.data)
                this.setState({
                  persons,
                  newName: '',
                  newNumber: '',
                  notification: `lisättiin uudelleen henkilö ${response.data.name}`
                })
                setTimeout(() => {
                  this.setState({notification: null})
                }, 5000)
              })
          })

      }
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
            this.setState({
              persons,
              notification: `poistettiin  ${name}`
            })
            setTimeout(() => {
              this.setState({notification: null})
            }, 5000)
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

        <Notification message={this.state.notification} />

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
