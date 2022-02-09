import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'

function App() {
  const [selectedCity, setCity] = useState(0)
  const [lat, setLat] = useState('45.424721')
  const [long, setLong] = useState('-75.695000')
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_URL}/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
        .then(res => res.json())
        .then(result => {
          setData(result)
        })
    }
    fetchData()
  }, [lat, long])

  const calendarStrings = {
    sameDay: '[Today]',
    nextDay: 'ddd',
    nextWeek: 'ddd',
  }

  return (
    <div className='App'>
      {/* header */}
      <header className='appHeader'>
        <div
          onClick={() => {
            setLat('45.424721')
            setLong('-75.695000')
            setCity(0)
          }}
          className={selectedCity !== 0 ? '' : 'selected'}
        >
          Ottawa
        </div>
        <div
          onClick={() => {
            setLat('34.052235')
            setLong('-118.243683')
            setCity(1)
          }}
          className={selectedCity !== 1 ? '' : 'selected'}
        >
          Los Angeles
        </div>
        <div
          onClick={() => {
            setLat('51.509865')
            setLong('-0.118092')
            setCity(2)
          }}
          className={selectedCity !== 2 ? '' : 'selected'}
        >
          London
        </div>
      </header>
      {/* conditional render */}
      {!data ? null : (
        <div className='forecastBlock'>
          <ul>
            {/* todays weather */}
            <li className='todaysWeather' key={data.daily[0].dt}>
              <Moment calendar={calendarStrings} unix>
                {data.daily[0].dt}
              </Moment>
              <div className='leftContent'>
                <img
                  src={`${process.env.REACT_APP_ICON_URL}/${data.daily[0].weather[0].icon}@4x.png`}
                  alt={`${data.daily[0].weather[0].main}`}
                />
              </div>
              <div className='rightContent'>
                <p className='temp'>{Math.round(data.daily[0].feels_like.day)}&deg;</p>{' '}
                <p>{data.daily[0].weather[0].main}</p>
              </div>
            </li>
            {/* future forecast */}
            {data.daily.slice(1, 5).map(day => (
              <li className='futureWeather' key={day.dt}>
                <Moment calendar={calendarStrings} unix>
                  {day.dt}
                </Moment>
                <p>
                  <img
                    src={`${process.env.REACT_APP_ICON_URL}/${day.weather[0].icon}@4x.png`}
                    alt={`${day.weather[0].main}`}
                  />
                </p>
                <p className='temp'>{Math.round(day.feels_like.day)}&deg;</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
