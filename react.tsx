import React from 'react'

import { Table } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

import { Speed, Distance, Time } from './speed-time-distance'

interface SpeedUIProps {
  speed?: Speed
  updateSpeed?: (speed: Speed) => void
  locked?: boolean
}

interface SpeedUIState {
  speed: Speed
}

class SpeedUI extends React.Component<SpeedUIProps, SpeedUIState> {
  constructor(props: SpeedUIProps) {
    super(props)
    this.updateState = this.updateState.bind(this)
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleChangeUnits = this.handleChangeUnits.bind(this)
    this.state = {
      speed: this.props.speed !== undefined ? this.props.speed : new Speed(1, 'm/s')
    }
  }

  updateState() {
    if (this.props.updateSpeed !== undefined) {
      this.props.updateSpeed(this.state.speed)
    }
  }

  handleChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target
    const value = target.value

    this.setState(function (oldState) {
      oldState.speed.speed = Number(value)
      return {
        speed: oldState.speed
      }
    }, this.updateState)
  }

  handleChangeUnits(event: React.ChangeEvent<HTMLSelectElement>) {
    const target = event.target
    const value = target.value
    this.setState(function (oldState) {
      oldState.speed.currentUnits = value
      return {
        speed: oldState.speed
      }
    })
  }

  render() {
    const units = []
    for (const key in Speed.speedUnits) {
      units.push(
        <option key={key} value={key}>
          {key}
        </option>
      )
    }
    return (
      <>
        <Form.Control type="number" onChange={this.handleChangeValue} value={this.state.speed.speed} disabled={this.props.locked} />
        <Form.Select onChange={this.handleChangeUnits} defaultValue={this.state.speed.currentUnits}>
          {units}
        </Form.Select>
      </>
    )
  }
}

interface DistanceUIProps {
  distance?: Distance
  updateDistance?: (distance: Distance) => void
  locked: boolean
}

interface DistanceUIState {
  distance: Distance
}

class DistanceUI extends React.Component<DistanceUIProps, DistanceUIState> {
  constructor(props: DistanceUIProps) {
    super(props)
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleChangeUnits = this.handleChangeUnits.bind(this)
    this.updateState = this.updateState.bind(this)
    this.state = {
      distance: this.props.distance !== undefined ? this.props.distance : new Distance(1, 'm')
    }
  }

  updateState() {
    if (this.props.updateDistance !== undefined) {
      this.props.updateDistance(this.state.distance)
    }
  }

  handleChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target
    const value = target.value

    this.setState(function (oldState) {
      oldState.distance.distance = Number(value)
      return {
        distance: oldState.distance
      }
    }, this.updateState)
  }

  handleChangeUnits(event: React.ChangeEvent<HTMLSelectElement>) {
    const target = event.target
    const value = target.value
    this.setState(function (oldState) {
      oldState.distance.currentUnits = value
      return {
        distance: oldState.distance
      }
    }, this.updateState)
  }

  render() {
    const units = []
    for (const key in Distance.distanceUnits) {
      units.push(
        <option key={key} value={key}>
          {key}
        </option>
      )
    }

    return (
      <>
        <Form.Control type="number" onChange={this.handleChangeValue} value={this.state.distance.distance} disabled={this.props.locked} />
        <Form.Select onChange={this.handleChangeUnits}>{units}</Form.Select>
      </>
    )
  }
}

interface TimeUIProps {
  time?: Time
  updateTime?: (time: Time) => void
  locked?: boolean
}

interface TimeUIState {
  time: Time
}

class TimeUI extends React.Component<TimeUIProps, TimeUIState> {
  constructor(props: TimeUIProps) {
    super(props)
    this.updateState = this.updateState.bind(this)
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleChangeUnits = this.handleChangeUnits.bind(this)
    this.state = {
      time: this.props.time !== undefined ? this.props.time : new Time(1, 'seconds')
    }
  }

  updateState() {
    if (this.props.updateTime !== undefined) {
      this.props.updateTime(this.state.time)
    }
  }

  handleChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target
    const value = target.value

    this.setState(function (oldState) {
      oldState.time.time = Number(value)
      return {
        time: oldState.time
      }
    }, this.updateState)
  }

  handleChangeUnits(event: React.ChangeEvent<HTMLSelectElement>) {
    const target = event.target
    const value = target.value
    this.setState(function (oldState) {
      oldState.time.currentUnits = value
      return {
        time: oldState.time
      }
    }, this.updateState)
  }

  render() {
    const units = []
    for (const key in Time.timeUnits) {
      units.push(
        <option key={key} value={key}>
          {key}
        </option>
      )
    }

    return (
      <>
        <Form.Control type="number" onChange={this.handleChangeValue} value={this.state.time.time} disabled={this.props.locked} />
        <Form.Select onChange={this.handleChangeUnits} defaultValue={this.state.time.currentUnits}>
          {units}
        </Form.Select>
      </>
    )
  }
}

interface SpeedTimeDistanceUIProps {
  speed?: Speed
  time?: Time
  distance?: Distance
  calculate?: string
  lockSelector?: boolean
  lockSpeed?: boolean
  lockTime?: boolean
  lockDistance?: boolean
  updateSpeed?: (speed: Speed) => void
  updateTime?: (time: Time) => void
  updateDistance?: (distance: Distance) => void
}

interface SpeedTimeDistanceUIState {
  speed: Speed
  time: Time
  distance: Distance
  calculate: string
}

class SpeedTimeDistanceUI extends React.Component<SpeedTimeDistanceUIProps, SpeedTimeDistanceUIState> {
  constructor(props: SpeedTimeDistanceUIProps) {
    super(props)
    this.updateState = this.updateState.bind(this)
    this.onChangeSpeed = this.onChangeSpeed.bind(this)
    this.onChangeTime = this.onChangeTime.bind(this)
    this.onChangeDistance = this.onChangeDistance.bind(this)
    this.handleChangeCalculation = this.handleChangeCalculation.bind(this)
    this.state = {
      speed: this.props.speed !== undefined ? this.props.speed : new Speed(1, 'm/s'),
      time: this.props.time !== undefined ? this.props.time : new Time(1, 'seconds'),
      distance: this.props.distance !== undefined ? this.props.distance : new Distance(1, 'm'),
      calculate: this.props.calculate !== undefined ? this.props.calculate : 'distance'
    }
  }

  updateState() {
    if (this.props.updateSpeed !== undefined) {
      this.props.updateSpeed(this.state.speed)
    }
    if (this.props.updateDistance !== undefined) {
      this.props.updateDistance(this.state.distance)
    }
    if (this.props.updateTime !== undefined) {
      this.props.updateTime(this.state.time)
    }
  }

  onChangeSpeed(newSpeed: Speed) {
    this.setState(function (oldState) {
      if (oldState.calculate === 'distance') {
        oldState.distance.setDistance(newSpeed.getSpeed('m/s') * oldState.time.getTime('seconds'), 'm')
      } else if (oldState.calculate === 'time') {
        oldState.time.setTime(oldState.distance.getDistance('m') / oldState.speed.getSpeed('m/s'), 'seconds')
      }
      return {
        speed: newSpeed,
        time: oldState.time,
        distance: oldState.distance
      }
    }, this.updateState)
  }

  onChangeTime(newTime: Time) {
    this.setState(function (oldState) {
      if (oldState.calculate === 'distance') {
        oldState.distance.setDistance(oldState.speed.getSpeed('m/s') * oldState.time.getTime('seconds'), 'm')
      } else if (oldState.calculate === 'speed') {
        oldState.speed.setSpeed(oldState.distance.getDistance('m') / newTime.getTime('seconds'), 'm/s')
      }
      return {
        speed: oldState.speed,
        time: newTime,
        distance: oldState.distance
      }
    }, this.updateState)
  }

  onChangeDistance(newDistance: Distance) {
    this.setState(function (oldState) {
      if (oldState.calculate === 'time') {
        oldState.time.setTime(newDistance.getDistance('m') / oldState.speed.getSpeed('m/s'), 'seconds')
      } else if (oldState.calculate === 'speed') {
        oldState.speed.setSpeed(newDistance.getDistance('m') / oldState.time.getTime('seconds'), 'm/s')
      }
      return {
        speed: oldState.speed,
        time: oldState.time,
        distance: newDistance
      }
    }, this.updateState)
  }

  handleChangeCalculation(event: React.ChangeEvent<HTMLSelectElement>) {
    const target = event.target
    const value = target.value
    this.setState({
      calculate: value
    })
  }

  render() {
    let selector = null
    if (!this.props.lockSelector) {
      selector = (
        <tr>
          <td>
            <Form.Label>Calculate</Form.Label>
          </td>
          <td>
            <Form.Select onChange={this.handleChangeCalculation} defaultValue={this.state.calculate}>
              <option key="speed" value="speed">
                Speed
              </option>
              <option key="time" value="time">
                Time
              </option>
              <option key="distance" value="distance">
                Distance
              </option>
            </Form.Select>
          </td>
        </tr>
      )
    }

    return (
      <Table>
        <tbody>
          {selector}
          <tr>
            <td>
              <Form.Label>Speed</Form.Label>
            </td>
            <td>
              <SpeedUI speed={this.state.speed} updateSpeed={this.onChangeSpeed} locked={this.props.lockSpeed || this.state.calculate === 'speed'} />
            </td>
          </tr>
          <tr>
            <td>
              <Form.Label>Time</Form.Label>
            </td>
            <td>
              <TimeUI time={this.state.time} updateTime={this.onChangeTime} locked={this.props.lockTime || this.state.calculate === 'time'} />
            </td>
          </tr>
          <tr>
            <td>
              <Form.Label>Distance</Form.Label>
            </td>
            <td>
              <DistanceUI distance={this.state.distance} updateDistance={this.onChangeDistance} locked={this.props.lockDistance || this.state.calculate === 'distance'} />
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export { SpeedUI, DistanceUI, TimeUI, SpeedTimeDistanceUI }
