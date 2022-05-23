import React, { useState } from "react";
import "./App.css";
import MaterialTable from "material-table";
import GetAppIcon from "@material-ui/icons/GetApp";
import AddIcon from "@material-ui/icons/Add";
function App() {
  const [tableData, setTableData] = useState({
    columns: [
      {
        title: "Name",
        field: "name",
        sorting: true,
        filtering: true,
        filterPlaceholder: "Filter Names",
        validate: (rowData) => Boolean(rowData.name),
      },
      {
        title: "Surname",
        field: "surname",
        filterPlaceholder: "Filter Surnames",
        sorting: true,
        filtering: true,
        validate: (rowData) => Boolean(rowData.surname),
      },
      {
        title: "ID",
        field: "ID",
        align: "center",
        grouping: false,
        filterPlaceholder: "Filter IDs",
        sorting: true,
        filtering: true,
        validate: (rowData) => Boolean(rowData.ID),
      },
      {
        title: "Gender",
        field: "gender",
        lookup: {
          M: "Male",
          F: "Female",
        },
        validate: (rowData) => Boolean(rowData.gender),
      },
      {
        title: "Date of Birth",
        field: "dateOfBirth",
        filterPlaceholder: "filter",
        type: "date",
        dateSetting: {
          locale: "en-GB",
        },
        validate: (rowData) => Boolean(rowData.dateOfBirth),
      },
      {
        title: "Place of Birth",
        field: "placeOfBirth",
        filterPlaceholder: "filter",
        validate: (rowData) => Boolean(rowData.placeOfBirth),
      },
      {
        title: "Address",
        field: "address",
        validate: (rowData) => Boolean(rowData.address),
      },
    ],
    data: [
      {
        name: "Aikas",
        surname: "Test",
        ID: 573827095712,
        gender: "F",
        dateOfBirth: new Date("2022-03-02T11:01:54"),
        placeOfBirth: "New York",
        city: "Mumbai",
        address: "TK8",
      },
      {
        name: "Bohan",
        surname: "sdgffd",
        ID: 1234567890123,
        gender: "M",
        dateOfBirth: new Date("2022-03-30T11:01:54"),
        placeOfBirth: "Tbilisi",
        address: "Vake",
      },
      {
        name: "Vikas",
        surname: "OKos",
        ID: 890563789012,
        gender: "M",
        dateOfBirth: new Date("2020-07-30T11:01:54"),
        placeOfBirth: "Berlin",
        address: "LA 90",
      },
      {
        name: "Aikas",
        surname: "Test",
        ID: 462125742334,
        gender: "F",
        dateOfBirth: new Date("2020-03-30T11:01:54"),
        placeOfBirth: "New York",
        city: "Mumbai",
        address: "TK8",
      },
    ],
  });
  return (
    <div className="App">
      <MaterialTable
        columns={tableData.columns}
        data={tableData.data}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              var today = new Date();
              var dd = String(today.getDate()).padStart(2, "0");
              var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
              var yyyy = today.getFullYear();

              today = dd + "/" + mm + "/" + yyyy;

              let importedDate = new Date();
              importedDate = newRow.dateOfBirth
                .toISOString()
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("/");

              ///////////////////////////////////////////////////////////////////////////////
              let newRowIdNumber = parseInt(newRow.ID);

              const checkIfIdExist = tableData.data.some((element) => {
                return element.ID === newRowIdNumber;
              });

              if (
                newRow.ID.length < 11 ||
                today <= importedDate ||
                checkIfIdExist
              ) {
                console.log(
                  "Password length, Birth of Date or ID is not valid"
                );
                reject();
              } else {
                resolve();
                const data = [...tableData.data];
                data.push(newRow);
                setTableData({
                  ...tableData,
                  data,
                });
                console.log("Added");
              }
            }),

          onRowUpdate: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
                const data = [...tableData.data];
                data[data.indexOf(oldRow)] = newRow;
                setTableData({
                  ...tableData,
                  data,
                });
              }, 600);
            }),
        }}
        actions={[
          {
            icon: () => <GetAppIcon />,
            tooltip: "Click me",
            onClick: (e, data) => console.log(data),
          },
        ]}
        options={{
          sorting: true,
          search: true,
          searchFieldAlignment: "right",
          searchAutoFocus: true,
          searchFieldVariant: "standard",
          filtering: true,
          paging: true,
          pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
          pageSize: 5,
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          paginationPosition: "both",
          exportButton: true,
          exportAllData: true,
          exportFileName: "TableData",
          addRowPosition: "first",
          actionsColumnIndex: -1,
          selection: true,
          showSelectAllCheckbox: false,
          showTextRowsSelected: false,
          grouping: true,
          columnsButton: true,
        }}
        title="Data Table"
        icons={{
          Add: () => <AddIcon />,
        }}
      />
    </div>
  );
}

export default App;
