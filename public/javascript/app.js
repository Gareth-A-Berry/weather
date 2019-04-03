console.log('Client side js file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input'   )

const loading = document.querySelector('#loading')
const weather = document.querySelector('#weather')
const failure = document.querySelector('#failure')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    loading.textContent = 'loading...'
    weather.textContent = ''
    failure.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                loading.textContent = ''
                failure.textContent = data.error
            } else {
                loading.textContent = ''
                failure.textContent = ''
                weather.textContent = data.weather
            }
        })
    })
})