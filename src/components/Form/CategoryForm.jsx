import React from "react";

export const CategoryForm = ({handleSubmit,value,setValue,btn}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" placeholder="Enter New Category Name" className="form-control" value={value} onChange={(e)=>setValue(e.target.value)} />
        </div>
       

        <button type="submit" className="btn btn-primary">
          {btn}
        </button>
      </form>
    </div>
  );
};
export default CategoryForm;
