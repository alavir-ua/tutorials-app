import http from "./http-common";
import authHeader from "./auth-header";

const getAllTutorials = (params) => {
  return http.get("/tutorials", {params});
};

const findTutorialById = id => {
  return http.get(`/tutorial/${id}`);
};

const getAllAuthors = (params) => {
  return http.get("/authors", {params});
};

const findAuthorById = id => {
  return http.get(`/author/${id}`);
};

const findCommentById = id => {
  return http.get(`/comment/${id}`);
};

const getAllUsersForAdmin = (params) => {
  return http.get(`/admin/users`, {headers: authHeader(), params});
}

const updateUserRoleByAdmin = id => {
  return http.get(`/admin/user/${id}/update`, {headers: authHeader()});
}

const deleteUserByAdmin = id => {
  return http.delete(`/admin/user/${id}/delete`, {headers: authHeader()});
}

const getAllTutorialsForAdmin = (params) => {
  return http.get(`/admin/tutorials`, {headers: authHeader(), params});
}

const updateTutorialStatusByAdmin = id => {
  return http.get(`/admin/tutorial/${id}/update`, {headers: authHeader()});
}

const deleteTutorialByAdmin = id => {
  return http.delete(`/admin/tutorial/${id}/delete`, {headers: authHeader()});
}

const getTutorialsCommentsForAdmin = id => {
  return http.get(`/admin/tutorial/${id}/comments`, {headers: authHeader()});
}

const deleteCommentByAdmin = id => {
  return http.delete(`/admin/comment/${id}/delete`, {headers: authHeader()});
}

const getTutorialsForAuthor = (params) => {
  return http.get(`/authors/tutorials`, {headers: authHeader(), params});
}

const getTutorialForAuthor = id => {
  return http.get(`/author/tutorial/${id}`, {headers: authHeader()});
};

const updateTutorialByAuthor = (id, data) => {
  return http.put(`/author/tutorial/${id}/update`, data, {headers: authHeader()});
};

const deleteTutorialByAuthor = id => {
  return http.delete(`/author/tutorial/${id}/delete`, {headers: authHeader()});
}

const createTutorialByAuthor = (data) => {
  return http.post(`/author/tutorial/create`, data, {headers: authHeader()});
}

const createCommentByUser = (data) => {
  return http.post(`/user/comment/create`, data, {headers: authHeader()});
}

const getUserById = id => {
  return http.get(`/user/${id}`, {headers: authHeader()});
}

const deleteUserByUser = id => {
  return http.delete(`/user/${id}/delete`, {headers: authHeader()});
}

const updateUserByUser = (id, email, password) => {
  return http.put('/user/update', {id, email, password}, {headers: authHeader()})
}

export default {
  getAllTutorials,
  findTutorialById,
  getAllAuthors,
  findAuthorById,
  findCommentById,
  getAllUsersForAdmin,
  updateUserRoleByAdmin,
  deleteUserByAdmin,
  getAllTutorialsForAdmin,
  updateTutorialStatusByAdmin,
  deleteTutorialByAdmin,
  getTutorialsCommentsForAdmin,
  deleteCommentByAdmin,
  getTutorialsForAuthor,
  getTutorialForAuthor,
  updateTutorialByAuthor,
  deleteTutorialByAuthor,
  createTutorialByAuthor,
  createCommentByUser,
  getUserById,
  deleteUserByUser,
  updateUserByUser
};









