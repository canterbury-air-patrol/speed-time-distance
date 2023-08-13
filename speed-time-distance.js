class Speed {
  constructor (speed, units) {
    this.speed_m_s = 0.0
    this.setSpeed(speed, units)
  }

  static speedUnits = {
    'm/s': 1 / 1,
    'km/hr': 1000 / 3600,
    knots: 1852 / 3600,
    mph: 1609.344 / 3600
  }

  speed_to_m_s (units) {
    if (units in this.speedUnits) {
      return this.speedUnits[units]
    }
    return 1
  }

  getSpeed (units) {
    return this.speed_m_s / this.speed_to_m_s(units)
  }

  setSpeed (speed, units) {
    this.speed_m_s = speed * this.speed_to_m_s(units)
  }
}

class Distance {
  constructor (distance, units) {
    this.distance_m = 0
    this.setDistance(distance, units)
  }

  static distanceUnits = {
    m: 1,
    cm: 1 / 100,
    mm: 1 / 1000,
    km: 1000,
    mi: 1609.344,
    NM: 1852
  }

  distance_units_to_m (units) {
    if (units in this.distanceUnits) {
      return this.distanceUnits[units]
    }
    return 1
  }

  getDistance (units) {
    return this.distance_m / this.distance_units_to_m(units)
  }

  setDistance (distance, units) {
    this.distance_m = distance * this.distance_units_to_m(units)
  }
}

class Time {
  constructor (timeSeconds) {
    this.timeSeconds = timeSeconds
  }

  get seconds () {
    return this.timeSeconds
  }

  set seconds (timeSeconds) {
    this.time_s = timeSeconds
  }

  get minutes () {
    return this.timeSeconds / 60
  }

  set minutes (timeMinutes) {
    this.timeSeconds = timeMinutes * 60
  }

  get hours () {
    return this.timeSeconds / 3600
  }

  set hours (timeHours) {
    this.timeSeconds = timeHours * 3600
  }
}

export { Speed, Time, Distance }
