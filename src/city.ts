import Weather from "./weather.js"

export default class City {
    private static validNames = ['malaga', 'madrid', 'sevilla']
    private static days = 3

    city: string
    today: Weather
    nextDays: Weather[]
    averageTemperature: number

    static isValid(name :string): boolean{
        return this.validNames.includes(name)
    }
    
    constructor(name: string){
        const now = new Date
        let avg = 0
        let weather: Weather

        this.city = name
        this.today = new Weather(now.toISOString())
        this.nextDays = []

        avg += this.today.temperature

        for(let i = 0; i < City.days; ++i) {
            const day = new Date()
            
            day.setDate(now.getDate() + i + 1)

            weather = new Weather(day.toISOString())

            this.nextDays.push(weather)

            avg += weather.temperature
        }

        this.averageTemperature = Math.floor(avg / (City.days + 1))
    }
}
