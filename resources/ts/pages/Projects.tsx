import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import CreateProjectModal from "../components/CreateProjectModal";
import PageHeader from "../components/PageHeader";
import { createProject, getProjects } from '../features/project/projectActions';
import { Project as ProjectType, ProjectPayload } from '../features/project/projectTypes';
import { AppDispatch, RootState } from '../store';
import Table from "../components/Table";

const Project = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const headers: TableHeader[] = [
    { name: 'ID', key: 'id' },
    { name: 'NAME', key: 'name' },
    { name: 'DESCRIPTION', key: 'description' },
    { name: 'STATUS', key: 'status' },
    { name: 'DUE DATE', key: 'due_date' },
    { name: 'CREATE DATE', key: 'created_at' },
  ];
  const projects = useSelector((state: RootState) => state.project.projects || []) as User[];;
  const transformedProjects = (projects).map((project: ProjectType) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    status: project.status,
    due_date: project.due_date,
    created_at: format(project.created_at, 'MM-dd-yyyy'),
  }));


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateProject = async (projectData: ProjectPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      await dispatch(createProject(projectData));
      setIsLoading(false);
      closeModal();
    } catch (err) {
      setIsLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    }
  };

  useEffect(() => {
    dispatch(getProjects);
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        title="Projects"
        emitAddNew={openModal}
      />
      <CreateProjectModal
        isOpen={isModalOpen}
        isLoading={isLoading} 
        error={error}
        onClose={closeModal}
        onSubmit={handleCreateProject}
      />
      <div className="lg:max-w-[75%] mx-auto py-4">
        <Table headers={headers} rows={transformedProjects} />
      </div>
    </div>
  )
}

export default Project;