const PageHeader = ({ title, emitAddNew }: PageHeaderProps)=> {
  return (
    <div className="bg-darkBlue text-white w-full">
      <div className="flex justify-between items-center py-4 px-4 lg:px-0 w-full lg:w-[75%] mx-auto">
        <h1 className="text-xl font-semibold">{ title }</h1>
        {emitAddNew && (
          <button onClick={emitAddNew} className="bg-green text-white py-2 px-4 rounded">
            Add New
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;