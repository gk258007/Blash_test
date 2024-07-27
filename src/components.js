

import React from "react";

export const componentsList = [
  { id: "table", label: "Table", html: `<table className="styled-table">
  <thead >
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Row 1 Col 1</td>
      <td>Row 1 Col 2</td>
    </tr>
    <tr>
      <td>Row 2 Col 1</td>
      <td>Row 2 Col 2</td>
    </tr>
  </tbody>
</table>` },
  { id: "input", label: "Input", html: "<input type='text' />" },
  { id: "button", label: "Button", html: "<button>Button</button>" },
];

// Table component rendering a proper HTML table
export const TableComponent = () => (
  <table className="styled-table">
    <thead>
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Row 1 Col 1</td>
        <td>Row 1 Col 2</td>
      </tr>
      <tr>
        <td>Row 2 Col 1</td>
        <td>Row 2 Col 2</td>
      </tr>
    </tbody>
  </table>
);

// Input and Button components
export const InputComponent = () => <input type="text"  />;
export const ButtonComponent = () => <button>Button</button>;
