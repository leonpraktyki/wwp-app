import "./App.css";
import axios from "axios";
import React from "react";

function App() {
  const [results, setResults] = React.useState([]);

  const [city, setCity] = React.useState("");
  const [objectType, setObjectType] = React.useState("");
  const [radius, setRadius] = React.useState("");

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/find?type=restaurant&longtitude=20.4987767&latitude=53.76849109915039&radius=1500")
      .then((res) => {
        setResults(res.data.data);
      });
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:3000/find?type=${objectType}&longtitude=${city.split(" ")[1]}&latitude=${
          city.split(" ")[0]
        }&radius=${radius}`
      )
      .then((res) => {
        setResults(res.data.data);
      });
  };

  return (
    <div className="App">
      <header className="App-header">Wyszukaj w pobliżu</header>
      <section class="selection">
        <form onSubmit={submitForm}>
          <article class="choice city">
            <label>Wybór miasta:</label>
            <select name="longtitude" onChange={(e) => setCity(e.target.value)}>
              <option value=""></option>
              <option value="53.7799500 20.4941600">Olsztyn</option>
              <option value="53.1333300 23.1643300">Białystok</option>
              <option value="52.2297700 21.0117800">Warszawa</option>
              <option value="39.9075000 116.3972300">Lublin</option>
              <option value="50.8703300 20.6275200">Kielce</option>
              <option value="50.0413200 21.9990100">Rzeszów</option>
              <option value="50.0614300 19.9365800">Kraków</option>
              <option value="50.2584100 19.0275400">Katowice</option>
              <option value="51.7500000 19.4666700">Łódź</option>
              <option value="53.1235000 18.0076200">Bydgoszcz</option>
              <option value="54.3520500 18.6463700">Gdańsk</option>
              <option value="53.4289400 14.5530200">Szczecin</option>
              <option value="52.4069200 16.9299300">Poznań</option>
              <option value="51.1000000 17.0333300">Wrocław</option>
              <option value="51.9354800 15.5064300">Zielona Góra</option>
              <option value="51.1000000 17.0333300">Wrocław</option>
            </select>
          </article>
          <article class="choice object">
            <label>Wybór obiektu:</label>
            <select name="type" onChange={(e) => setObjectType(e.target.value)}>
              <option value=""></option>
              <option value="restaurant">restauracja</option>
              <option value="school">szkoła</option>
              <option value="option2c">Option 2c</option>
              <option value="option2b">Option 2d</option>
              <option value="option2c">Option 2e</option>
            </select>
          </article>
          <article class="choice radius">
            <label>Promień (km):</label>
            <select name="radius" onChange={(e) => setRadius(e.target.value)}>
              <option value=""></option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="250">250</option>
            </select>
          </article>
          <div class="send">
            <input type="submit" value="Szukaj" />
          </div>
          <div>
            {results.map((result) => {
              return (
                <div>
                  {result.name}
                  <div>{result.location.split("(")[1].split(" ")[0]}</div>
                </div>
              );
            })}
          </div>
        </form>
      </section>
      <hr class="wall" />
      <section class="results">
        <article class="city-name"></article>
        <article class="address"></article>
        <article class="distance"></article>
      </section>
    </div>
  );
}

export default App;
