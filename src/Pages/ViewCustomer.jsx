// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import {TrashIcon } from "@heroicons/react/16/solid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Navbar from "../Components/Navbar";
import Alert from "../Components/Alert";

function ViewCustomer() {
  const [selectedCustomer, setSelectedCustomer] = useState({
    id: "",
    name: "",
    age: "",
    email: "",
    // imgURL:null,
  });
  const [customer, SetCustomer] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: "" });
  const onCloseAlert = () => {
    setAlert({ show: false, message: "" });
  }
  useEffect(() => {
    fetchCustomer();
  }, []);
  const fetchCustomer = async () => {
    const baseURL = "http://localhost:8081/getCustomer";
    const res = await axios.get(baseURL);
    SetCustomer(res.data);
    console.log("Fetched customers",res.data);
  };
  const deleteCustomer = async (id) => {
    const baseURL = "http://localhost:8081/deleteCustomer/" + id;
    await axios.get(baseURL);
    fetchCustomer();
  };
  const handleUpdate = (customer) => {
    setSelectedCustomer(customer);
    setIsFormOpen(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer({ ...selectedCustomer, [name]: value });
    setErrors({...errors, [e.target.name] : ""});
  };
  const UpdateCustomer = async (e) => {
    e.preventDefault();
    const baseURL = "http://localhost:8081/updateCustomer";
    try {
      await axios.post(baseURL, selectedCustomer);
      setAlert({show:true,message:"Customer Updated Successfully"});
      setIsFormOpen(false);
      fetchCustomer();
    } catch (err) {
      console.log(err);
      if(err.response && err.response.status === 400){
        setErrors(err.response.data);
      } else if(err.response && err.response.status === 409){
        setAlert({show:true,message:err.response.data.errorCode+" : "+err.response.data.message})
      } else if(err.response && err.response.status === 500){
        console.log(err.response.data);
        setAlert({show:true,message:err.response.data.errorCode+" : "+err.response.data.message});
      } else{
        setAlert({ show: true, message: err.message+" : "+"Failed to update" });
      }
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      {alert.show && <Alert message={alert.message} onClose={onCloseAlert}/>}
      <div className="flex items-center justify-center py-15.5 bg-[#161633] h-screen">
        <div className="max-w-3xl w-full bg-transparent rounded-lg p-10">
          <h2 className="text-center text-2xl font-bold text-amber-200 mb-6">
            Customer Data
          </h2>
          <div className="overflow-y-scroll max-h-96 hide-scrollbar">
            <ul role="list" className="divide-y divide-gray-100 max-w-3xl pr-5">
              {customer.map((customer) => (
                <li
                  key={customer.email}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div className="flex min-w-0 gap-x-4">
                    <img
                      alt={customer.name}
                      src={`http://localhost:8081${customer.imgURL}`}
                      className="size-12 flex-none rounded-full bg-gray-50"
                    />
                    <div className="min-w-0 flex-auto">
                      {/* <p className="text-sm/6 font-semibold text-amber-200">{customer.id}</p> */}
                      <p className="text-sm/6 font-semibold text-amber-200">
                        {customer.name}
                      </p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        {customer.age} years old
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:items-end  justify-between items-center space-x-10 space-y-0.5">
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      {customer.email}
                    </p>
                    <div className="flex flex-row space-x-2">
                      <button
                        onClick={() => deleteCustomer(customer.id)}
                        className="mt-1 truncate text-xs/5 text-gray-500 hover: pr-1 pl-1 "
                      >
                        <TrashIcon className="size-6 hover:fill-red-400"/>
                        
                      </button>
                      <button
                        onClick={() => handleUpdate(customer)}
                        className="mt-1 truncate text-xs/5 text-gray-500 pr-1 pl-1"
                      >
                        <PencilSquareIcon className="size-6 hover:fill-green-500"/>
                      </button>
                      {/* <FontAwesomeIcon icon="fa-regular fa-pen-to-square" /> */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
          <div className="bg-[#161633] rounded-lg shadow-lg w-full max-w-sm px-6 py-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-amber-200">
                Update Customer
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                method="POST"
                onSubmit={UpdateCustomer}
                className="space-y-6"
              >
                
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm/6 font-medium text-amber-200"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name"
                      value={selectedCustomer.name}
                      // required
                      onChange={handleChange}
                      className="block w-full rounded-md bg-transparent px-3 py-1.5 text-base text-amber-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="age"
                      className="block text-sm/6 font-medium text-amber-200"
                    >
                      Age
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="Age"
                      value={selectedCustomer.age}
                      // required
                      onChange={handleChange}
                      className="block w-full rounded-md bg-transparent px-3 py-1.5 text-base text-amber-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    {errors.age && <p className="text-red-500">{errors.age}</p>}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-amber-200"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={selectedCustomer.email}
                      // required
                      autoComplete="email"
                      onChange={handleChange}
                      className="block w-full rounded-md bg-transparent px-3 py-1.5 text-base text-amber-100 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}
                  </div>
                </div>
                {/* <div>
              <label
                htmlFor="file"
                className="block text-sm/6 font-medium text-amber-200"
              >
                image
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  type="file"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-amber-200 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div> */}

                <div>
                  <button
                    type="submit"
                    value={"submit"}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ViewCustomer;
