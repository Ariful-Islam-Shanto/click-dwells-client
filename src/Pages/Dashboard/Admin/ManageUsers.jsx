import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const ManageUsers = () => {

    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data : allUsers , isLoading, refetch } = useQuery({
        enabled : !loading && !!user,
        queryKey : ['allProperty'],
        queryFn : async () => {
            const { data } = await axiosSecure.get(`/allUsers/${user?.email}`);
            return data;
        }
    })

    console.log(allUsers);


    const { mutate } = useMutation({
        mutationKey : ['updateUserRole'],
        mutationFn : async (role) => {
            const { data } = await axiosSecure.patch(`/updateUserRole/${role.id}?role=${role.role}`);
            console.log(data);
        },
        onSuccess : () => {
            toast.success('Successfully updated the status.')
            refetch();
        } 
      })

    const { mutate : deleteUser } = useMutation({
        mutationKey : ['deleteUser'],
        mutationFn : async (id) => {
            const { data } = await axiosSecure.delete(`/deleteUser/${id}`);
            console.log(data);
        },
        onSuccess : () => {
            toast.success('Successfully deleted user.')
            refetch();
        } 
      })
    
      const handleUpdateStatus = (role, id) => {
        console.log(role, id);
        mutate({role, id})
      }

      const handleDeleteUser = (id) => {
        deleteUser(id);
      }

    return (
        <div className="space-y-4 py-8 ">
      <h1 className="text-4xl text-center text-white font-bold">
        Manage Users
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Update Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          
            {allUsers?.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-bold">{user?.name}</div>
                  </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                      <div className="font-bold">{user?.email}</div>
                  </div>
                </td>
                <td>
                <div className="flex items-center gap-3">
                      <div className="font-bold">{user?.role}</div>
                  </div>
                </td>
                <th className='flex items-center justify-center flex-col md:flex-col lg:flex-col xl:flex-row md:static lg:static xl:static'>
                 <button onClick={() => handleUpdateStatus('admin', user?._id)} className="btn ml-3 bg-[#37607e] btn-xs text-white">Admin</button>
                  <button onClick={() => handleUpdateStatus('agent', user?._id)} className="btn bg-[#3c8e7f] btn-xs text-white">Agent</button>
                  <button onClick={() => handleUpdateStatus('fraud', user?._id)} className="btn bg-[#d45a5a] btn-xs text-white">Fraud</button>

                </th>
                <th>
                <button onClick={() => handleDeleteUser(user?._id)} className="btn bg-[#d45a5a] btn-xs">Delete</button>

                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default ManageUsers;