import React from "react";

const NotFound = ({ title, colSpan }) => {
  return (
    <>
      <tr>
        <td colSpan={colSpan} className="text-center py-6">
          {title}
        </td>
      </tr>
    </>
  );
};

export default NotFound;
