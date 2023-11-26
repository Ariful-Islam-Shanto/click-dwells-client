
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const {user, loading} = useAuth()
    const axiosSecure = useAxiosSecure();

    const {data : role, isLoading} = useQuery({
        enabled : !loading && !!user,
        queryKey : ['role'],
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/getRole/${user?.email}`);
            return data.role;
        }
    })

    return [role, isLoading];
};

export default useRole;