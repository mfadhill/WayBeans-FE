import { useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { ITransactionForm } from "../../../lib/validation/UseTransactionValidation";
import { toast } from "react-toastify";
import { API } from "../../../lib/api";
import { useNavigate } from "react-router-dom";
import {
    allTransactionByUser,
    alltransaction,
} from "../../../redux/Async/allTransactionByUser";
import { authCheckAsync } from "../../../redux/Async/authAsync";
import { allCartByUser } from "../../../redux/Async/cartAsync";

interface IProps {
    reset: () => void;
    imageFile: File | null;
    id: string;
}

const UseTransactionForm = ({ reset, imageFile, id }: IProps) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<ITransactionForm> = async (data) => {
        try {
            if (imageFile === null) {
                toast.warning("Please input your payment proof.", {
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
            setLoading(true);
            const formdata = new FormData();
            formdata.append("name", data.name);
            formdata.append("email", data.email);
            formdata.append("address", data.address);
            formdata.append("phone", data.phone.toString());
            formdata.append("possCode", data.possCode.toString());
            formdata.append("paymentProof", imageFile!);
            const transaction = await API.post(`/transaction/${id}`, formdata, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                onUploadProgress(progressEvent) {
                    const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total!
                    );
                    setUploadProgress(progress);
                },
            });
            dispatch(alltransaction());
            dispatch(allCartByUser());
            dispatch(authCheckAsync());
            dispatch(allTransactionByUser());
            setLoading(false);
            navigate("/");
            toast.success(
                "Thank you for ordering in us, please wait 1 x 24 hours to verify you order",
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
            return transaction;
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

    const onErrorSubmit: SubmitErrorHandler<ITransactionForm> = (data) => {
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

export default UseTransactionForm;
