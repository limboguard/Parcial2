import React, { useEffect } from "react";
import * as d3 from "d3";
import { useIntl } from "react-intl";

const margin = { top: 10, right: 30, bottom: 30, left: 60 };

function Graph(props) {
  const intl = useIntl();

  useEffect(() => {
    function renderGraph() {
      const width = 700 - margin.left - margin.right;
      const height = 500 - margin.top - margin.bottom;

      document.getElementById("scatterplot").innerHTML = "";

      // append the svg object to the body of the page
      let svg = d3
        .select("#scatterplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Add X axis
      let x = d3
        .scaleLinear()
        .domain([0, d3.max(props.data.map((d) => d.episodes)) + 71])
        .range([0, width]);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      let y = d3
        .scaleLinear()
        .domain([0, d3.max(props.data.map((d) => d.seasons))])
        .range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Add dots
      svg
        .append("g")
        .selectAll("dot")
        .data(props.data)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return x(d.episodes);
        })
        .attr("cy", function (d) {
          return y(d.seasons);
        })
        .attr("r", 7)
        .style("fill", "#FFA52B");

      svg
        .append("g")
        .selectAll("text")
        .data(props.data)
        .enter()
        .append("text")
        .attr("x", function (d) {
          return x(d.episodes) + 10;
        })
        .attr("y", function (d) {
          return y(d.seasons) + 4;
        })
        .text(function (d) {
          return d.name;
        })
        .attr("font-size", "10px");

      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + margin.top + 20)
        .text(
          intl.formatMessage({
            id: "x-axis",
            defaultMessage: "Episodes",
          })
        );

      // Y axis label:
      svg
        .append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 30)
        .attr("x", -margin.top)
        .text(
          intl.formatMessage({
            id: "y-axis",
            defaultMessage: "Seasons",
          })
        );
    }

    if (props.data) renderGraph();
  }, [props.data]);

  return <div id="scatterplot"></div>;
}

export default Graph;
