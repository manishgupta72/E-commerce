import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Button, Modal } from "antd";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState([]);
  const [updatedName, setUpdatedName] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/category/create-category",
        { name }
      );
      if (data) {
        toast.success(`${name} category is created`);
        setName("");
        setVisible2(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong to create category!");
    }
  };
  //update category
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data) {
        toast.success(`${name} category is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong to updated category!");
    }
  };
  //delete category
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/category/delete-category/${pid}`
      );
      if (data) {
        console.log("dleete", data);
        toast.success(`${data.Category.name} category is deleted`);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong to deleted category!");
    }
  };
  //get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/category/get-category"
      );
      console.log(data.Category);
      if (data) {
        setCategories(data.Category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong to getting category!");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  console.log(categories);
  return (
    <Layout title="Dashboard - Create Category">
      <div className="row  m-3 p-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Manage Category</h1>
          <div className="p-3 w-50">
            <div>
              <Button type="primary" onClick={() => setVisible2(true)}>
                Create Categories
              </Button>
              <Modal
                title="Create Categories"
                onCancel={() => setVisible2(false)}
                footer={null}
                open={visible2}
              >
                
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                  btn={"Create"}
                />
              </Modal>
            </div>
          </div>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <>
                    <tr>
                      <td key={c._id}>{c.name}</td>
                      <td key={c._id}>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            title="Update Categories"
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <CategoryForm
              handleSubmit={handleUpdateSubmit}
              value={updatedName}
              setValue={setUpdatedName}
              btn={"Updated"}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
