import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SeriesTable from "./Components/SeriesTable";
import DetailCard from "./Components/DetailCard";
import { FormattedMessage } from "react-intl";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Graph from "./Components/Graph";

const EN_URL =
  "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json";
const ES_URL =
  "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json";

function App() {
  const [series, setSeries] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const lang = navigator.language.includes("en") ? "en" : "es";
    if (!navigator.onLine) {
      if (localStorage.getItem(lang + "-series") !== null) {
        setSeries(JSON.parse(localStorage.getItem(lang + "-series")));
      }
    } else {
      axios
        .get(lang === "en" ? EN_URL : ES_URL)
        .then((res) => {
          setSeries(res.data);
          localStorage.setItem(lang + "-series", JSON.stringify(res.data));
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    <Container>
      <h1>
        <FormattedMessage id="app.title" defaultMessage="T.V Series" />
      </h1>
      <hr />
      <Row>
        <Col xs={selected !== null ? 8 : 12}>
          <SeriesTable
            series={series}
            setSelected={(i) => setSelected((s) => (s === i ? null : i))}
          />
        </Col>
        {selected !== null && (
          <Col xs={4}>
            <DetailCard data={selected !== null ? series[selected] : null} />
          </Col>
        )}
      </Row>
      <Row>
        <Graph data={series} />
      </Row>
    </Container>
  );
}

export default App;
