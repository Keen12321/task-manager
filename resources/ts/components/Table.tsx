const Table = <RowData extends { [key: string]: React.ReactNode }>({ headers, rows }: TableProps<RowData>) => {
  const renderCell = (row: RowData , headerKey: string) => {
    let value = row[headerKey as keyof RowData];

    return value ?? '';
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-600">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3 text-left">{ header.name }</th>
            ))}
          </tr>
        </thead>

        <tbody className="text-gray-900 bg-gray-50">
          {rows.map((row, index) => (
            <tr key={index}>
              {headers.map((header, colIndex) => (
                <td className="px-6 py-3" key={colIndex}>{ renderCell(row, header.key) }</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;