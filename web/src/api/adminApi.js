import axios from "axios";
import axiosClient from "./axiosClient";

const adminApi = {
    getBlog: function () {
        return axiosClient.get("/admin/blogs");
    },
    createBlog: function (data) {
        return axiosClient.post("/admin/blog", data);
    },
    updateBlog: function (data) {
        return axiosClient.put("/admin/blog", data);
    },
    deleteBlog: function (data) {
        return axiosClient.delete("/admin/blog?id=" + data)
    },
    getUser: function () {
        return axiosClient.get("/admin/users");
    },
    updateUser: function (data) {
        return axiosClient.put("/admin/user?id=" + data);
    },
    getVehicle: function () {
        return axiosClient.get("/admin/vehicles");
    },
    updateVehicle: function (data) {
        return axiosClient.put("/admin/vehicle?id=" + data);
    },
    getTransaction: function () {
        return axiosClient.get("/admin/transactions");
    },
    uploadImageBlog: function (data) {
        return axios.post("http://localhost:8080/api/uploadFile", data, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
    },
    getBrand: function () {
        return axiosClient.get('/admin/brands');
    },
    createBrand: function (data) {
        return axiosClient.post('/admin/brand', data);
    },
    getModel: function () {
        return axiosClient.get('/admin/models');
    },
    createModel: function (data) {
        return axiosClient.post('/admin/model', data);
    }
}
export default adminApi;