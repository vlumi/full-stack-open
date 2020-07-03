import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (newPerson) =>
  axios.post(baseUrl, newPerson).then((response) => response.data);

const update = (updatedPerson) =>
  axios
    .put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
    .then((response) => response.data);

const remove = (id) => axios.delete(`${baseUrl}/${id}`);

export default { getAll, create, update, remove };
