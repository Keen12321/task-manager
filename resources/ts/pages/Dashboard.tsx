import PageHeader from "../components/PageHeader";
import Table from "../components/Table";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const headers: TableHeader[] = [
    { name: 'ID', key: 'id' },
    { name: 'PROJECT NAME', key: 'title' },
    { name: 'NAME', key: 'description' },
    { name: 'STATUS', key: 'status' },
    { name: 'DUE DATE', key: 'date' },
  ];

  const rows: TableRow[] =  [ 
    { 
      id: 4,
      title: 'Voluptatem dicta magnam dolores omnis',
      description: 'Autem iste vero qui sit ipsum ipsum omnis voluptatem.',
      status: 'Pending',
      date: '2024-02-20' 
    },
    {
      id: 6,
      title: 'Voluptatem dicta magnam dolores omnis',
      description: 'Sed nihil deleniti minima occaecati dignissimos commodi omnis.',
      status: 'In Progress',
      date: '2024-06-02'
    },
    {
      id: 9,
      title: 'Voluptatem dicta magnam dolores omnis',
      description: 'Aut ut sed sint earum nihil.',
      status: 'Pending',
      date: '2024-12-20'
    }
  ];

  return (
    <div>
      <PageHeader
        title="Dashboard"
      />
      <div className="lg:max-w-[75%] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between w-full py-4">
          <TaskCard
            title="Pending Tasks"
            titleColor="text-yellow-500"
            userTasks={3}
            totalTasks={5}
          />
          <TaskCard
            title="In Progress Tasks"
            titleColor="text-blue-500"
            userTasks={3}
            totalTasks={5}
          />
          <TaskCard
            title="Completed Tasks"
            titleColor="text-green-500"
            userTasks={3}
            totalTasks={5}
          />
        </div>
        <div className="w-full p-6 bg-gray-800">
          <h2 className="text-xl mb-4">My Active Tasks</h2>
          <Table headers={headers} rows={rows} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;