import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import PageHeader from "@/components/common/PageHeader";
import Table from '@/components/common/table/Table';
import { getUsers, setUserModalVisibility } from '@/features/user/userActions';
import { User } from '@/features/user/userTypes';
import { TableHeader } from '@/features/table/tableTypes';
import { AppDispatch, RootState } from '@/store';

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [transformedUsers, setTransformedUsers] = useState<any[]>([]);;

  const users = useSelector((state: RootState) => state.user.users);

  // Transform the users when the users array changes
  useEffect(() => {
    if (users) {
      const updatedUsers = (users as User[]).map((user: User) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: format(user.created_at, 'M-dd-yyyy'),
      }));
      setTransformedUsers(updatedUsers);
    }
  }, [users]);
  
  // Table headers
  const headers: TableHeader[] = [
    { name: 'ID', key: 'id' },
    { name: 'NAME', key: 'name', width: 25 },
    { name: 'EMAIL', key: 'email' },
    { name: 'CREATED', key: 'created_at' },
  ];

  const openUserModal = () => dispatch(setUserModalVisibility(true));

  // Fetch users on component mount
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Users" emitAddNew={openUserModal} />
      <div className="lg:max-w-[75%] mx-auto py-4">
        <Table headers={headers} rows={transformedUsers} dataType="user" />
      </div>
    </div>
  )
}
  
export default Users
  