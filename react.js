import React from 'react'
import PropTypes from 'prop-types'

import { Speed } from './speed-time-distance'

class SpeedUI extends React.Component {
  constructor (props) {
    super(props)
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.state = {
      speed: new Speed(this.props.speed, this.props.units)
    }
  }

  handleChangeValue (event) {
    const target = event.target
    const value = target.value

    this.setState(function (oldState) {
      return {
        speed: new Speed(value, oldState.units)
      }
    })
  }

  handleChnageUnits (event) {
    const target = event.target
    const value = target.value

    this.setState(function () {
      return {
        unit: value
      }
    })
  }

  render () {
    const units = []
    for (const key in Speed.speedUnits) {
      units.append((<option key={key} value={key}>{key}</option>))
    }
    return (
      <>
        <input type='number' onChange={this.handleChangeValue} value={this.state.speed.getSpeed(this.state.units)} />
        <select onChange={this.handleChangeUnits}>
          {units}
        </select>
      </>
    )
  }
}
SpeedUI.propTypes = {
  speed: PropTypes.number.optional,
  units: PropTypes.string.optional
}

export { SpeedUI }
