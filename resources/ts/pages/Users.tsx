import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import UserModal from "../components/user/UserModal";
import PageHeader from "../components/common/PageHeader";
import Table from '../components/common/table/Table';
import { createUser, getUsers } from '../features/user/userActions';
import { User, UserPayload } from '../features/user/userTypes';
import { AppDispatch, RootState } from '../store';
import { TableHeader } from '@/features/common/table/tableTypes';

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const headers: TableHeader[] = [
    { name: 'ID', key: 'id' },
    { name: 'NAME', key: 'name', width: 25 },
    { name: 'EMAIL', key: 'email' },
    { name: 'CREATED', key: 'created_at' },
  ];
  const users = useSelector((state: RootState) => state.user.users);
  const transformedUsers = (users as User[]).map((user: User) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: format(user.created_at, 'M-dd-yyyy'),
  }));

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCreateUser = async (userData: UserPayload) => {
    setIsLoading(true);
    setError(null);

    try {
      await dispatch(createUser(userData));
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
    dispatch(getUsers);
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        title="Users"
        emitAddNew={openModal}
      />
      <UserModal
        isOpen={isModalOpen}
        isLoading={isLoading} 
        error={error}
        onClose={closeModal}
        onSubmit={handleCreateUser}
      />
      <div className="lg:max-w-[75%] mx-auto py-4">
        <Table headers={headers} rows={transformedUsers} dataType="user" />
      </div>
    </div>
  )
}
  
export default Users
  