import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";


export interface ITransactionForm {
    name: string;
    email: string;
    address: string;
    phone: number;
    possCode: number
}

const UseTransactionValidate = () => {
    const initialValue: ITransactionForm = {
        address: "",
        email: "",
        name: "",
        phone: 0,
        possCode: 0,
    }

    const schema = yup.object().shape({
        address: yup.string().required("please enter your address"),
        email: yup.string().required("please enter your email").email(),
        name: yup.string().required("please enter your name").min(5, "name requiered minimal 5 character"),
        phone: yup.number().required("please enter your number phone").min(8, "your phone is invalid number"),
        possCode: yup.number().required()
    })

    return useForm<ITransactionForm>({
        defaultValues: initialValue,
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: yupResolver(schema)
    })
}

export default UseTransactionValidate