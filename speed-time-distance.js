class Speed {
  constructor (speed, units) {
    this.speed_m_s = 0.0
    this.currentUnits = units
    this.setSpeed(speed, units)
  }

  static speedUnits = {
    'm/s': 1 / 1,
    'km/hr': 1000 / 3600,
    knots: 1852 / 3600,
    mph: 1609.344 / 3600
  }

  speed_to_m_s (units) {
    if (units in Speed.speedUnits) {
      return Speed.speedUnits[units]
    }
    return 1
  }

  get speed () {
    return this.getSpeed(this.currentUnits)
  }

  set speed (value) {
    this.setSpeed(value, this.currentUnits)
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
    this.currentUnits = units
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
    if (units in Distance.distanceUnits) {
      return Distance.distanceUnits[units]
    }
    return 1
  }

  get distance () {
    return this.distance_m / this.distance_units_to_m(this.currentUnits)
  }

  set distance (value) {
    this.setDistance(value, this.currentUnits)
  }

  getDistance (units) {
    return this.distance_m / this.distance_units_to_m(units)
  }

  setDistance (distance, units) {
    this.distance_m = distance * this.distance_units_to_m(units)
  }
}

class Time {
  constructor (value, units) {
    this.timeSeconds = 0
    this.currentUnits = units
    this.setTime(value, units)
  }

  static timeUnits = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400
  }

  get time () {
    return this.getTime(this.currentUnits)
  }

  set time (value) {
    this.setTime(value, this.currentUnits)
  }

  timeUnitsToSeconds (units) {
    if (units in Time.timeUnits) {
      return Time.timeUnits[units]
    }
    return 1
  }

  getTime (units) {
    return this.timeSeconds / this.timeUnitsToSeconds(units)
  }

  setTime (value, units) {
    this.timeSeconds = value * this.timeUnitsToSeconds(units)
  }
}

export { Speed, Time, Distance }
