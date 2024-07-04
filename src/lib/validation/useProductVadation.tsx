import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export interface IProductForm {
    name: string;
    stock: number;
    price: number;
    descriptionsProduct: string;
}

const UseProductValidate = () => {
    const initialState: IProductForm = {
        name: "",
        stock: 0,
        price: 0,
        descriptionsProduct: ""
    }

    const schema = yup.object().shape({
        name: yup.string().required(),
        stock: yup.number().required().min(10),
        price: yup.number().required().min(1000),
        descriptionsProduct: yup.string().required().min(10)
    })

    return useForm<IProductForm>({
        defaultValues: initialState,
        mode: "onBlur",
        reValidateMode: "onBlur",
        resolver: yupResolver(schema)
    })
}

export default UseProductValidate