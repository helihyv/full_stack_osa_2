import React from 'react';
import './App.css'

class App extends React.Component {
  constructor(props) {
    super (props)
    this.state = {
      persons: [
        {name: 'Arto Hellas'}
      ],
      newName: ''
    }
  }

  isDuplicate = (element) => {
    return element.name === this.state.newName
  }

  addName = (event) => {
    event.preventDefault()

    if (!this.state.persons.some(this.isDuplicate))
    {
      const personObject = {
        name: this.state.newName
      }

      const persons = this.state.persons.concat(personObject)
      this.setState({
        persons,
        newName: ' '
      })
    }
  }

  handleNameChange = (event) => {
    this.setState({newName: event.target.value})
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input
                    value={this.state.newName}
                    onChange={this.handleNameChange}
                  />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
          <h2>Numerot</h2>
          <ul>
            {this.state.persons.map((person ) =>
              <li key={person.name}>
                {person.name}
              </li>)}
          </ul>

      </div>

    )
  }
}

export default App;
