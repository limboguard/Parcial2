import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import { FormattedDate, FormattedMessage } from "react-intl";

const header = ["Name", "Channel", "Seasons", "Episodes", "Release Date"];

function SeriesTable(props) {
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>#</th>
          {header.map((h) => (
            <th key={h}>
              <FormattedMessage id={"header." + h} defaultMessage={h} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.series.map((s, i) => (
          <tr onClick={(ev) => props.setSelected(i)} key={s.name}>
            <td>
              <b>{i + 1}</b>
            </td>
            {header.map((h) => (
              <td key={h}>
                {h === "Release Date" ? (
                  <FormattedDate
                    value={moment(
                      s[h.toLowerCase().split(" ")[0]],
                      "DD/MM/YYYY"
                    ).toDate()}
                  />
                ) : (
                  s[h.toLowerCase().split(" ")[0]]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default SeriesTable;
