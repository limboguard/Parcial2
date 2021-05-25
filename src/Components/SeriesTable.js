import React from "react";
import Table from "react-bootstrap/Table";

const header = ["Name", "Channel", "Seasons", "Episodes", "Release Date"];

function SeriesTable(props) {
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>#</th>
          {header.map((h) => (
            <th>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.series.map((s, i) => (
          <tr onClick={(ev) => props.setSelected(i)}>
            <td>
              <b>{i + 1}</b>
            </td>
            {header.map((h) => (
              <td>{s[h.toLowerCase().split(" ")[0]]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default SeriesTable;
