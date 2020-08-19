const button = document.getElementById('generate')

const zip = document.getElementById('zip')
const feelings = document.getElementById('feelings')

const date = document.getElementById('date')
const temp = document.getElementById('temp')
const content = document.getElementById('content')

const url = 'https://api.openweathermap.org/data/2.5/weather'
const APIKey = 'd73cbdcabd1acf6f291f4d296e6bf811'

let d = new Date()
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()

const fetchWeather = async(baseURL, zip, apiKey) => {
    try {
        const request = await fetch(
            `${baseURL}?zip=${zip},us&units=metric&APPID=${apiKey}`,
        )
        const result = await request.json()
        const {
            main: { temp },
        } = result
        return temp
    } catch (e) {
        throw e
    }
}

const saveData = async(path, data) => {
    try {
        await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    } catch (e) {
        throw e
    }
}

const updateUI = async(temperature, newDate, feelings) => {
    date.innerText = newDate
    temp.innerText = `${temperature} deg`
    content.innerText = feelings
}

button.addEventListener('click', () => {
    fetchWeather(url, zip.value, APIKey)
        .then(temp => {
            return { date: newDate, temp, content: feelings.value }
        })
        .then(data => {
            saveData('/api/projectdata', data)
            return data
        })
        .then(({ temp, date, content }) => updateUI(temp, date, content))
        .catch(e => {
            console.error(e)
        })
})