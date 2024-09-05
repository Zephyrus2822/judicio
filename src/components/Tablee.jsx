import 'ka-table/style.css';

import React from 'react';

import { Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';

const dataArray = Array(10)
  .fill(undefined)
  .map((_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }));

const Tablee = () => {
  return (
    <div style={{ marginLeft: '250px', marginRight: '50px', marginBottom: '500px', marginTop: '300px;' }}> {/* Adjust the margin as needed */}
      <Table
        columns={[
          { key: 'column1', title: 'Name', dataType: DataType.String },
          { key: 'column2', title: 'Aadhar Number', dataType: DataType.String },
          { key: 'column3', title: 'Number of Prisonments', dataType: DataType.String },
          { key: 'column4', title: 'Address', dataType: DataType.String },
        ]}
        data={dataArray}
        editingMode={EditingMode.Cell}
        rowKeyField={'id'}
        sortingMode={SortingMode.Single}
      />
    </div>
  );
};

export default Tablee;
