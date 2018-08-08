import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = (props) => {
  return(
    <div>
      <h1>{props.kurssi}</h1>
    </div>
  )
}

const Osa = (props) => {
  return(
    <div>
      <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    </div>
  )
}

const Sisalto = (props) => {
  return(

    <div>
      {props.osat.map(osa => <Osa key={osa.id} osa={osa} />)}
    </div>
  )
}

const Yhteensa = ({ osat }) => {
  const tehtaviaYhteensa = osat.reduce((yhteensa, osa) => {
    return(
      yhteensa + osa.tehtavia
    )
  },0)
  return (
    <div>
      <p>
        yhteensä {tehtaviaYhteensa} tehtävää
      </p>
    </div>
  )
}

const Kurssi = ({kurssi}) => {
  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat = {kurssi.osat} />
    </div>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />, document.getElementById('root')
)
