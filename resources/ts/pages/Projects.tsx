import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import ProjectModal from "../components/project/ProjectModal";
import PageHeader from "../components/common/PageHeader";
import Table from "../components/common/Table";
import DeleteConfirmationDialog from '../components/common/modals/DeleteConfirmationDialog';
import { createProject, deleteProject, findProject, getProjects, updateProject } from '../features/project/projectActions';
import { Project, ProjectPayload } from '../features/project/projectTypes';
import { AppDispatch, RootState } from '../store';

const Projects = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); 
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  const headers: TableHeader[] = [
    { name: 'ID', key: 'id' },
    { name: 'NAME', key: 'name' },
    { name: 'DESCRIPTION', key: 'description' },
    { name: 'STATUS', key: 'status' },
    { name: 'DUE DATE', key: 'due_date' },
    { name: 'CREATE DATE', key: 'created_at' },
    { name: '', key: 'actions' },
  ];
  const projects = useSelector((state: RootState) => state.project.projects);
  const projectToEdit = useSelector((state: RootState) => state.project.selectedProject);
  const transformedProjects = (projects as Project[]).map((project: Project) => ({
    id: project.id,
    name: project.name,
    description: project.description,
    status: project.status,
    due_date: format(project.due_date, 'M-dd-yyyy'),
    created_at: format(project.created_at, 'M-dd-yyyy'),
  }));

  const openModal = (id: number | null = null) => {
    if (id) {
      dispatch(findProject(id)); 
    } else {
      setSelectedProject(null);
    }
    setIsEditMode(!!id);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setIsEditMode(false);
  };

  const openDeleteDialog =  (id: number) => {
    setDeleteItemId(id);
    setIsDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (projectToEdit) {
      setSelectedProject(projectToEdit);
      console.log(selectedProject)
    }
  }, [projectToEdit]);

  const handleSubmit = async (projectData: ProjectPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      if (isEditMode && selectedProject) {
        await dispatch(updateProject(selectedProject.id, projectData));
      } else {
        await dispatch(createProject(projectData));
      }

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

  const handleConfirmDelete = () => {
    if (deleteItemId) {
      dispatch(deleteProject(deleteItemId));
    } else {
      console.error('Unable to find project id.')
    }
    setIsDialogOpen(false);
  };

  useEffect(() => {
    dispatch(getProjects);
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        title="Projects"
        emitAddNew={() => openModal()}
      />
      <ProjectModal
        isOpen={isModalOpen}
        isLoading={isLoading}
        error={error}
        onClose={closeModal}
        onSubmit={handleSubmit}
        projectToEdit={selectedProject}
        isEditMode={isEditMode}
      />
      <DeleteConfirmationDialog
        isOpen={isDialogOpen}
        dialogHeader="Delete Project"
        dialogText="Deleting this project will also delete all project tasks"
        onCancel={closeDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
      <div className="lg:max-w-[75%] mx-auto py-4">
        <Table headers={headers} rows={transformedProjects} onUpdate={openModal} onDelete={openDeleteDialog} />
      </div>
    </div>
  )
}

export default Projects;