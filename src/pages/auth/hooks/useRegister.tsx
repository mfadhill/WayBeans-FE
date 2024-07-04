import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../../../lib/api";
import { IRegister } from "../../../lib/validation/UseRegisterValidation";
import { toast } from "react-toastify";

interface IProps {
    reset: () => void;
}

export const UseRegister = ({ reset }: IProps) => {
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IRegister> = async (data) => {
        try {
            const res = await API.post("/auth/register", data);
            toast.success("🎉 Registration successful!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => navigate("/auth/login"),
            });
        } catch (error) {
            toast.error(
                "Registration failed.Please check your inputs and try again.",
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
        }
    };
    const onErrorSubmit: SubmitErrorHandler<IRegister> = (data) => {
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
        onErrorSubmit
    }
};
