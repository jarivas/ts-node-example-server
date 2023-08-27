enum WeatherTypes {
    SUNNY = 'Sunny / Clear',
    PARTIALLY_CLOUDY = 'Partially cloudy',
    CLOUDY = 'cloudy',
    OVERCAST = 'Overcast',
    RAIN = 'Rain',
    DRIZZLE = 'Drizzle',
    SNOW = 'Snow',
    STORMY = 'Stormy',
    TORNADOES = 'Tornadoes',
    THUNDERSNOWS = 'Thundersnows',
    FOG = 'Fog',
    HURRICANES = 'Hurricanes',
    SAND_STORMS = 'Sand storms'
}


export default class Weather {
    dateTime: string
    type: string
    temperature: number
    isCelsius: boolean
    
    private static getType(): string {
        const values = Object.values(WeatherTypes)

        return values[Math.floor(Math.random() * values.length)]
    }

    constructor(dateTime: string, isCelsius = true) {
        this.dateTime = dateTime
        this.type = Weather.getType()
        this.temperature = Math.floor(Math.random() * 35)
        this.isCelsius = isCelsius
    }
}