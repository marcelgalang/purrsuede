import React from 'react';
import Header from './components/header'
import Form from './components/form'
import Weather from './components/weather'

const Api_Key = "11ad8d59c1ee2b70b252d426d3c7555c";
  class App extends React.Component {
    state = {
      city: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    }

    getWeather = async (e) => {

      const city = e.target.elements.city.value;
      e.preventDefault();   
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}`);
      const response = await api_call.json();
      console.log(response);
      if(city){
        this.setState({
          city: response.name,
          humidity: response.main.humidity,
          description: response.weather[0].description,
          error: ""
        })
      }else{
        this.setState({
          error: "Please input search values..."
        })
      }
    }

  render() {
    return (
      <div>
        <Header/>
        <Form loadWeather={this.getWeather} />
        <Weather
          city={this.state.city}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
     </div>
     
    ) 
  }
}
export default App;