import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TaskTable from '@/components/task/TaskTable';
import PageHeader from '@/components/common/PageHeader';
import { getProjectTasks } from '@/features/task/taskActions';
import { TableHeader } from '@/features/table/tableTypes';
import { findProject } from '@/features/project/projectActions';
import { AppDispatch, RootState } from '@/store';
import { format } from 'date-fns';

const ProjectDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const project = useSelector((state: RootState) => state.project.selectedProject);
  const projectTasks = useSelector((state: RootState) => state.task.projectTasks);

  if (!id) {
    return <div>Error: Project ID is missing</div>;
  }

  useEffect(() => {
    dispatch(findProject(id));
    dispatch(getProjectTasks(id));
  }, [id, dispatch]);
  
  if (!project) {
    return <div className="lg:max-w-[75%] mx-auto mt-8">Loading...</div>;
  }

  const headers: TableHeader[] = [
    { name: 'ID', key: 'id', width: 10 },
    { name: 'NAME', key: 'name', width: 40 },
    { name: 'STATUS', key: 'status' },
    { name: 'DUE DATE', key: 'due_date' },
    { name: '', key: 'actions'}
  ];

  const formatStatus = (status: string) => status.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase());

  const formatDate = (date: Date) => format(date, 'M-dd-yyyy');

  return (
    <div>
      <PageHeader title={project.name} />
      <div className="mx-auto mt-8">
        <div className="flex justify-center items-center bg-white p-6 rounded-lg shadow-lg lg:max-w-[75%] text-black mx-auto">
          <div className="w-full">
            <h2 className="text-xl font-bold">Project Details</h2>
            <div className="mt-4">
              <p className="my-2"><strong>Name:</strong> { project.name }</p>
              <p className="my-2"><strong>Description:</strong> { project.description }</p>
              <p className="flex items-center">
                <strong>Status:</strong>
                <button
                  className={`px-2 py-1 ml-2 rounded-full text-center text-white cursor-default
                    ${ project.status === 'pending' ? 'bg-yellow' : project.status === 'in_progress' ? 'bg-blue' : 'bg-green' }`}
                >
                  { formatStatus(project.status) }
                </button>
              </p>
              <p className="my-2"><strong>Due Date:</strong> { formatDate(project.due_date) }</p>
              { project.created_by?.name && <p className="my-2"><strong>Created By:</strong> { project.created_by.name }</p> }
              { project.updated_by?.name && <p className="my-2"><strong>Updated By:</strong> { project.updated_by.name }</p> }
              <p className="my-2"><strong>Created At:</strong> { formatDate(project.created_at) }</p>
              { project.updated_at && <p className="my-2"><strong>Updated At:</strong> { formatDate(project.updated_at) }</p> }
            </div>
          </div>
        </div>

        <div className="mt-8 bg-darkBlue">
          <TaskTable
            pageTitle="Project Tasks"
            headers={headers}
            tasks={projectTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail