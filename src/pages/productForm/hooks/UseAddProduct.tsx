import { useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { IProductForm } from "../../../lib/validation/useProductVadation";
import { toast } from "react-toastify";
import { API } from "../../../lib/api";
import { AllProductAsync } from "../../../redux/Async/allProductAsync";

interface IProps {
    reset: () => void;
    imageFile: File | null;
}

const UseAddProduct = ({ reset, imageFile }: IProps) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IProductForm> = async (data) => {
        if (imageFile === null) {
            toast.warning("Please input your product image", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("stock", data.stock!.toString());
        formData.append("price", data.price!.toString());
        formData.append("description", data.descriptionsProduct);
        formData.append("files", imageFile!);
        console.log(formData);
        try {

            setLoading(true);
            const response = await API.post("/product", formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, },
                onUploadProgress(progressEvent) {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total!
                    );
                    setUploadProgress(progress);
                },
            });
            dispatch(AllProductAsync());
            navigate("/seller");
            toast.success(
                "Success Add Product",
                {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                }
            );
            return response.data;
        } catch (error) {
            toast.warning("Please check your inputs and try again.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const onErrorSubmit: SubmitErrorHandler<IProductForm> = (data) => {
        console.log(data);
        toast.warning("Please check your inputs and try again.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    return {
        onSubmit,
        onErrorSubmit,
        loading,
        uploadProgress,
        setLoading,
    };
};

export default UseAddProduct;
