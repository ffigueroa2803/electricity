import React from "react";

import { Header } from "../components";

const Profile = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      {/* Header */}
      <Header title="Mi Perfil" />
      <div className="flex flex-wrap lg:flex-nowrap justify-center"></div>
    </div>
  );
};

export default Profile;
