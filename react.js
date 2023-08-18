import React from 'react'
import PropTypes from 'prop-types'

import { Table } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

import { Speed, Distance, Time } from './speed-time-distance'

class SpeedUI extends React.Component {
  constructor (props) {
    super(props)
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleChangeUnits = this.handleChangeUnits.bind(this)
    this.state = {
      speed: this.props.speed !== undefined ? this.props.speed : new Speed(1, Speed.speedUnits[0])
    }
  }

  handleChangeValue (event) {
    const target = event.target
    const value = target.value

    this.setState(function (oldState) {
      oldState.speed.speed = value
      if (this.props.updateSpeed !== undefined) {
        this.props.updateSpeed(oldState.speed)
      }
      return {
        speed: oldState.speed
      }
    })
  }

  handleChangeUnits (event) {
    const target = event.target
    const value = target.value
    this.setState(function (oldState) {
      oldState.speed.currentUnits = value
      if (this.props.updateSpeed !== undefined) {
        this.props.updateSpeed(oldState.speed)
      }
      return {
        speed: oldState.speed
      }
    })
  }

  render () {
    const units = []
    for (const key in Speed.speedUnits) {
      units.push((<option key={key} value={key}>{key}</option>))
    }
    return (
      <>
        <Form.Control type='number' onChange={this.handleChangeValue} value={this.state.speed.speed} disabled={this.props.locked} />
        <Form.Select onChange={this.handleChangeUnits} defaultValue={this.state.speed.currentUnits}>
          {units}
        </Form.Select>
      </>
    )
  }
}
SpeedUI.propTypes = {
  speed: PropTypes.object,
  updateSpeed: PropTypes.func,
  locked: PropTypes.bool
}

class DistanceUI extends React.Component {
  constructor (props) {
    super(props)
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleChangeUnits = this.handleChangeUnits.bind(this)
    this.state = {
      distance: this.props.distance !== undefined ? this.props.distance : new Distance('1', 'm')
    }
  }

  handleChangeValue (event) {
    const target = event.target
    const value = target.value

    this.setState(function (oldState) {
      oldState.distance.distance = value
      if (this.props.updateDistance !== undefined) {
        this.props.updateDistance(oldState.distance)
      }
      return {
        distance: oldState.distance
      }
    })
  }

  handleChangeUnits (event) {
    const target = event.target
    const value = target.value
    this.setState(function (oldState) {
      oldState.distance.currentUnits = value
      if (this.props.updateDistance !== undefined) {
        this.props.updateDistance(oldState.distance)
      }
      return {
        distance: oldState.distance
      }
    })
  }

  render () {
    const units = []
    for (const key in Distance.distanceUnits) {
      units.push((<option key={key} value={key}>{key}</option>))
    }

    return (
      <>
        <Form.Control type='number' onChange={this.handleChangeValue} value={this.state.distance.distance} disabled={this.props.locked} />
        <Form.Select onChange={this.handleChangeUnits}>
          {units}
        </Form.Select>
      </>
    )
  }
}
DistanceUI.propTypes = {
  distance: PropTypes.object,
  updateDistance: PropTypes.func,
  locked: PropTypes.bool
}

class TimeUI extends React.Component {
  constructor (props) {
    super(props)
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleChangeUnits = this.handleChangeUnits.bind(this)
    this.state = {
      time: this.props.time !== undefined ? this.props.time : new Time(1)
    }
  }

  handleChangeValue (event) {
    const target = event.target
    const value = target.value

    this.setState(function (oldState) {
      oldState.time.time = value
      if (this.props.updateTime !== undefined) {
        this.props.updateTime(oldState.time)
      }
      return {
        time: oldState.time
      }
    })
  }

  handleChangeUnits (event) {
    const target = event.target
    const value = target.value
    this.setState(function (oldState) {
      oldState.time.currentUnits = value
      if (this.props.updateTime !== undefined) {
        this.props.updateTime(oldState.time)
      }
      return {
        time: oldState.time
      }
    })
  }

  render () {
    const units = []
    for (const key in Time.timeUnits) {
      units.push((<option key={key} value={key}>{key}</option>))
    }

    return (
      <>
        <Form.Control type='number' onChange={this.handleChangeValue} value={this.state.time.time} disabled={this.props.locked} />
        <Form.Select onChange={this.handleChangeUnits} defaultValue={this.state.time.currentUnits}>
          {units}
        </Form.Select>
      </>
    )
  }
}
TimeUI.propTypes = {
  time: PropTypes.object,
  updateTime: PropTypes.func,
  locked: PropTypes.bool
}

class SpeedTimeDistanceUI extends React.Component {
  constructor (props) {
    super(props)
    this.onChangeSpeed = this.onChangeSpeed.bind(this)
    this.onChangeTime = this.onChangeTime.bind(this)
    this.onChangeDistance = this.onChangeDistance.bind(this)
    this.handleChangeCalculation = this.handleChangeCalculation.bind(this)
    this.state = {
      speed: this.props.speed !== undefined ? this.props.speed : new Speed(1, Speed.speedUnits[0]),
      time: this.props.time !== undefined ? this.props.time : new Time(1),
      distance: this.props.distance !== undefined ? this.props.distance : new Distance(1, Distance.distanceUnits[0]),
      calculate: this.props.calculate !== undefined ? this.props.calculate : 'distance'
    }
  }

  onChangeSpeed (newSpeed) {
    this.setState(function (oldState) {
      if (this.props.updateSpeed !== undefined) {
        this.props.updateSpeed(newSpeed)
      }
      if (oldState.calculate === 'distance') {
        oldState.distance.setDistance(newSpeed.getSpeed('m/s') * oldState.time.getTime('seconds'), 'm')
        if (this.props.updateDistance !== undefined) {
          this.props.updateDistance(oldState.distance)
        }
      } else if (oldState.calculate === 'time') {
        oldState.time.setTime(oldState.distance.getDistance('m') / oldState.speed.getSpeed('m/s'), 'seconds')
        if (this.props.updateTime !== undefined) {
          this.props.updateTime(oldState.time)
        }
      }
      return {
        speed: newSpeed,
        time: oldState.time,
        distance: oldState.distance
      }
    })
  }

  onChangeTime (newTime) {
    this.setState(function (oldState) {
      if (this.props.updateTime !== undefined) {
        this.props.updateTime(newTime)
      }
      if (oldState.calculate === 'distance') {
        oldState.distance.setDistance(oldState.speed.getSpeed('m/s') * oldState.time.getTime('seconds'), 'm')
        if (this.props.updateDistance !== undefined) {
          this.props.updateDistance(oldState.distance)
        }
      } else if (oldState.calculate === 'speed') {
        oldState.speed.setSpeed(oldState.distance.getDistance('m') / newTime.getTime('seconds'), 'm/s')
        if (this.props.updateSpeed !== undefined) {
          this.props.updateSpeed(oldState.speed)
        }
      }
      return {
        speed: oldState.speed,
        time: newTime,
        distance: oldState.distance
      }
    })
  }

  onChangeDistance (newDistance) {
    this.setState(function (oldState) {
      if (this.props.updateDistance !== undefined) {
        this.props.updateDistance(newDistance)
      }
      if (oldState.calculate === 'time') {
        oldState.time.setTime(newDistance.getDistance('m') / oldState.speed.getSpeed('m/s'), 'seconds')
        if (this.props.updateTime !== undefined) {
          this.props.updateTime(oldState.time)
        }
      } else if (oldState.calculate === 'speed') {
        oldState.speed.setSpeed(newDistance.getDistance('m') / oldState.time.getTime('seconds'), 'm/s')
        if (this.props.updateSpeed !== undefined) {
          this.props.updateSpeed(oldState.speed)
        }
      }
      return {
        speed: oldState.speed,
        time: oldState.time,
        distance: newDistance
      }
    })
  }

  handleChangeCalculation (event) {
    const target = event.target
    const value = target.value
    this.setState({
      calculate: value
    })
  }

  render () {
    let selector = null
    if (!this.props.lockSelector) {
      selector = (
        <tr>
          <td><Form.Label>Calculate</Form.Label></td>
          <td>
            <Form.Select onChange={this.handleChangeCalculation} defaultValue={this.state.calculate}>
              <option key='speed' value='speed'>Speed</option>
              <option key='time' value='time'>Time</option>
              <option key='distance' value='distance'>Distance</option>
            </Form.Select>
          </td>
        </tr>
      )
    }

    return (
      <Table>
        <tbody>
          {selector}
          <tr><td><Form.Label>Speed</Form.Label></td><td><SpeedUI speed={this.state.speed} updateSpeed={this.onChangeSpeed} locked={this.props.lockSpeed || this.state.calculate === 'speed'} /></td></tr>
          <tr><td><Form.Label>Time</Form.Label></td><td><TimeUI time={this.state.time} updateTime={this.onChangeTime} locked={this.props.lockTime || this.state.calculate === 'time'} /></td></tr>
          <tr><td><Form.Label>Distance</Form.Label></td><td><DistanceUI distance={this.state.distance} updateDistance={this.onChangeDistance} locked={this.props.lockDistance || this.state.calculate === 'distance'} /></td></tr>
        </tbody>
      </Table>
    )
  }
}
SpeedTimeDistanceUI.propTypes = {
  calculate: PropTypes.string,
  lockSelector: PropTypes.bool,
  lockSpeed: PropTypes.bool,
  lockTime: PropTypes.bool,
  lockDistance: PropTypes.bool,
  speed: PropTypes.object,
  time: PropTypes.object,
  distance: PropTypes.object,
  updateSpeed: PropTypes.func,
  updateTime: PropTypes.func,
  updateDistance: PropTypes.func
}

export { SpeedUI, DistanceUI, TimeUI, SpeedTimeDistanceUI }
