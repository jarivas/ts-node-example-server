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
        let avg = 0

        this.city = name
        this.today = new Weather()
        this.nextDays = []

        avg += this.today.temperature

        for(let i = 0; i < City.days; ++i) {
            const weather = new Weather()

            this.nextDays.push(weather)

            avg += weather.temperature
        }

        this.averageTemperature = Math.floor(avg / (City.days + 1))
    }
}
