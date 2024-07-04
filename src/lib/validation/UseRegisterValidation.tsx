import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface IRegister {
    fullname: string;
    email: string;
    password: string;
}

const UseRegisterValidate = () => {
    const initialValue: IRegister = {
        email: "",
        fullname: "",
        password: "",
    };
    const schema = yup.object().shape({
        fullname: yup.string().required("please input your username").min(5, "enter your fullname minimal 5 character"),
        email: yup.string().required("please input your email").email(),
        password: yup.string().required("please input your password").min(8, "input your password minimal 8 character")
    })

    return useForm<IRegister>({
        defaultValues: initialValue,
        mode: "onBlur",
        reValidateMode: 'onBlur',
        resolver: yupResolver(schema)
    })
};

export default UseRegisterValidate