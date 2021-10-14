import axios from "axios";

// const baseUrl = "http://localhost:3001/api/persons";
const baseUrl = "/api/persons";
const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = (newObj) => axios.post(baseUrl,newObj).then(response => response.data);

const update = (id, newObj) => axios.put(`${baseUrl}/${id}`,newObj).then(response => response.data);

const remove = (id) => axios.delete(`${baseUrl}/${id}`);
export default {getAll, create, remove, update}