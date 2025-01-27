import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import ProjectModal from "../components/project/ProjectModal";
import PageHeader from "../components/common/PageHeader";
import Table from "../components/common/table/Table";
import DeleteConfirmationDialog from '../components/common/modals/DeleteConfirmationDialog';
import { createProject, deleteProject, findProject, getProjects, updateProject } from '../features/project/projectActions';
import { Project, ProjectPayload } from '../features/project/projectTypes';
import { AppDispatch, RootState } from '../store';
import { TableHeader } from '@/features/common/table/tableTypes';

const Projects = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null); 
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

  const projects = useSelector((state: RootState) => state.project.projects);
  const projectToEdit = useSelector((state: RootState) => state.project.selectedProject);
  
  // Table headers
  const headers: TableHeader[] = [
    { name: 'ID', key: 'id' },
    { name: 'NAME', key: 'header_name', width: 40 },
    { name: 'STATUS', key: 'status'},
    { name: 'DUE DATE', key: 'due_date' },
    { name: 'CREATED', key: 'created_at' },
    { name: '', key: 'actions' },
  ];

  // Transform projects for the table
  const transformedProjects = useMemo(() => 
    projects.map((project: Project) => ({
      id: project.id,
      header_name: project.name,
      status: project.status,
      due_date: format(project.due_date, 'M-dd-yyyy'),
      created_at: format(project.created_at, 'M-dd-yyyy'),
    })), [projects]
  );

  // Open the project modal for edit or create
  const openModal = (id: number | null = null) => {
    if (id) {
      dispatch(findProject(id)); 
    } else {
      setSelectedProject(null);
    }
    setIsEditMode(!!id);
    setIsModalOpen(true);
  };
  
  // Close the project modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setIsEditMode(false);
  };

  // Open the delete confirmation dialog
  const openDeleteDialog =  (id: number) => {
    setDeleteItemId(id);
    setIsDialogOpen(true);
  };

  // Close the delete confirmation dialog
  const closeDeleteDialog = () => {
    setIsDialogOpen(false);
  };

  // Handle submit for create or update
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
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    }
  };

  // Handle confirm project deletion
  const handleConfirmDelete = () => {
    if (deleteItemId) {
      dispatch(deleteProject(deleteItemId));
    } else {
      console.error('Unable to find project id.')
    }
    setIsDialogOpen(false);
  };

  // Sync selected project when projectToEdit changes
  useEffect(() => {
    if (projectToEdit) {
      setSelectedProject(projectToEdit);
      console.log(selectedProject)
    }
  }, [projectToEdit]);

  // Fetch projects on mount
  useEffect(() => {
    dispatch(getProjects);
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Projects" emitAddNew={() => openModal()} />
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
        <Table
          headers={headers}
          rows={transformedProjects}
          dataType="project"
          onUpdate={openModal}
          onDelete={openDeleteDialog}
        />
      </div>
    </div>
  )
}

export default Projects;