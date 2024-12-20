class Speed {
  speed_m_s: number
  currentUnits: string
  constructor(speed: number, units: string) {
    this.speed_m_s = 0.0
    this.currentUnits = units
    this.setSpeed(speed, units)
  }

  static speedUnits: { [key: string]: number } = {
    'm/s': 1 / 1,
    'km/hr': 1000 / 3600,
    knots: 1852 / 3600,
    mph: 1609.344 / 3600
  }

  speed_to_m_s(units: string) {
    if (units in Speed.speedUnits) {
      return Speed.speedUnits[units]
    }
    return 1
  }

  get speed(): number {
    return this.getSpeed(this.currentUnits)
  }

  set speed(value: number) {
    this.setSpeed(value, this.currentUnits)
  }

  getSpeed(units: string): number {
    return this.speed_m_s / this.speed_to_m_s(units)
  }

  setSpeed(speed: number, units: string) {
    this.speed_m_s = speed * this.speed_to_m_s(units)
  }
}

class Distance {
  distance_m: number
  currentUnits: string

  constructor(distance: number, units: string) {
    this.distance_m = 0
    this.currentUnits = units
    this.setDistance(distance, units)
  }

  static distanceUnits: { [key: string]: number } = {
    m: 1,
    cm: 1 / 100,
    mm: 1 / 1000,
    km: 1000,
    mi: 1609.344,
    NM: 1852
  }

  distance_units_to_m(units: string) {
    if (units in Distance.distanceUnits) {
      return Distance.distanceUnits[units]
    }
    return 1
  }

  get distance(): number {
    return this.distance_m / this.distance_units_to_m(this.currentUnits)
  }

  set distance(value: number) {
    this.setDistance(value, this.currentUnits)
  }

  getDistance(units: string): number {
    return this.distance_m / this.distance_units_to_m(units)
  }

  setDistance(distance: number, units: string): void {
    this.distance_m = distance * this.distance_units_to_m(units)
  }
}

class Time {
  timeSeconds: number
  currentUnits: string

  constructor(value: number, units: string) {
    this.timeSeconds = 0
    this.currentUnits = units
    this.setTime(value, units)
  }

  static timeUnits: { [key: string]: number } = {
    seconds: 1,
    minutes: 60,
    hours: 3600,
    days: 86400
  }

  get time(): number {
    return this.getTime(this.currentUnits)
  }

  set time(value: number) {
    this.setTime(value, this.currentUnits)
  }

  timeUnitsToSeconds(units: string) {
    if (units in Time.timeUnits) {
      return Time.timeUnits[units]
    }
    return 1
  }

  getTime(units: string): number {
    return this.timeSeconds / this.timeUnitsToSeconds(units)
  }

  setTime(value: number, units: string) {
    this.timeSeconds = value * this.timeUnitsToSeconds(units)
  }
}

export { Speed, Time, Distance }
