import React from "react";
import useAuth from "../../../hooks/useAuth";

const UserProfile = () => {
  const { user } = useAuth();

  const bg = {
    backgroundImage: `url('https://i.ibb.co/wrKJtvH/Astral-Symphony.jpg')`,
    backgroundSize: "cover",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  };
  return (
    <div className="bg-[#141627] min-h-screen space-y-6 flex items-center justify-center">
        <div className="bg-[#F4F8EE] flex flex-col items-center p-6 rounded-lg gap-3">
            <div className="space-y-6 flex-1 items-center flex">
       <div className="space-y-4">
       <h1 className="text-4xl text-black font-bold">
        Hello {user?.displayName}!
      </h1>
        <h1 className="text-sm text-gray-700 font-bold">Enjoy your first home</h1>
       </div>
      
         <div className="h-full w-full flex-1 rounded-md">
         <img src="https://i.ibb.co/zHYJZjs/home-png-1.png" alt=""  className="object-cover"/>
         </div>
        </div>

        <div style={bg} className="bg-black my-auto rounded-lg drop-shadow-md h-full w-full mx-auto flex flex-col items-start justify-center p-10">
        <div className="w-20 h-20 rounded-full">
          <img src={user?.photoURL} alt="" className="h-full w-full rounded-full object-cover" />
        </div>
        <div>
        <h1 className="text-sm text-white py-2 font-bold">
          Name : {user?.displayName}
        </h1>
        <h1 className="text-sm text-white font-bold">Email : {user?.email}</h1>
        </div>
      </div>
        </div>
   {/* <div className="bg-[#1C1F37] my-auto rounded-lg drop-shadow-md h-full mx-auto flex items-center justify-start p-10 flex-row space-y-6">
        <div className="w-20 h-20 rounded-full">
          <img src={user?.photoURL} alt="h-full w-full rounded-full" />
        </div>
        <div>
        <h1 className="text-2xl text-white font-bold">
          Name : {user?.displayName}
        </h1>
        <h1 className="text-2xl text-white font-bold">Email : {user?.email}</h1>
        </div>
      </div> */}
     
  
    </div>
  );
};

export default UserProfile;
