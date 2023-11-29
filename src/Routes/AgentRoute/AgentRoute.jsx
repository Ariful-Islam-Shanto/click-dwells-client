import React from "react";
import useRole from "../../hooks/useRole";
import { Vortex } from "react-loader-spinner";
import { Navigate } from "react-router-dom";

const AgentRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Vortex
          visible={true}
          height="80"
          width="80"
          ariaLabel="vortex-loading"
          wrapperStyle={{}}
          wrapperClass="vortex-wrapper"
          colors={["red", "green", "blue", "yellow", "orange", "purple"]}
        />
      </div>
    );
  }

  if (role === 'agent') {
    return children;
  }
  
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AgentRoute;
