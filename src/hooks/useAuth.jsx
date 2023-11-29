import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';

const useAuth = () => {

    const authInfo = useContext(AuthContext);
    console.log(authInfo);
    return authInfo;
};

export default useAuth;