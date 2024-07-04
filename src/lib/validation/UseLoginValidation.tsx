import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
export interface ILogin {
    email: string;
    password: string
}


const UseLoginValidate = () => {
    const initialValue: ILogin = {
        email: "",
        password: ""
    }

    const schema = yup.object().shape({
        email: yup.string().required("please input your email"),
        password: yup.string().required("please input your password")
    })

    return useForm<ILogin>({
        defaultValues: initialValue,
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: yupResolver(schema)
    })
}

export default UseLoginValidate