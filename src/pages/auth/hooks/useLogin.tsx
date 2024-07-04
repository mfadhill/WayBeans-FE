import { useAppDispatch } from '../../../redux/store';
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { ILogin } from '../../../lib/validation/UseLoginValidation';
import { loginAsync } from '../../../redux/Async/authAsync';
import { toast } from 'react-toastify';

interface IProps {
    reset: () => void
}

const UseLogin = ({ reset }: IProps) => {
    const dispatch = useAppDispatch()
    const onSubmit: SubmitHandler<ILogin> = (data) => {
        dispatch(loginAsync(data))
        reset()
    }

    const onErrorSubmit: SubmitErrorHandler<ILogin> = (data) => {
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
    }

    return {
        onSubmit,
        onErrorSubmit
    }
}


export default UseLogin;
