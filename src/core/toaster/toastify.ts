import {toast} from "react-toastify";

export const toastifySuccess = async (message) => {
    toast.success(message, {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: true,
    });
};

export const toastifyError = async (message) => {
    toast.error(message, {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: true,
    });
};

export const toastifyWarn = async (message) => {
    toast.warn(message, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    });
};

