import React from 'react'

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

export default Kurssi
