import React from 'react';
import './App.css'

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
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filterText: ''
    }
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

      const persons = this.state.persons.concat(personObject)
      this.setState({
        persons,
        newName: '',
        newNumber: ''
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
