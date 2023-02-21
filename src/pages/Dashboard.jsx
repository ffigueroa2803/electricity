import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { useSelector } from "react-redux";

import { Button } from "../components";
import { earningData } from "../data/dummy";

const Dashboard = () => {
  const { currentColor } = useSelector((state) => state?.theme);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex flex-wrap lg:flex-nowrap justify-center"></div>
    </div>
  );
};

export default Dashboard;
