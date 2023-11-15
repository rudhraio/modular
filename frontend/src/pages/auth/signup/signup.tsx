import { FormValues, useFormHook } from "@/lib/form";
import { EMAIL_REGEX, PASSWORD_REGEX } from "./../../../utility/regex";
import SignUpHTML from "./signup.html";
import signUpAPI from "../../../api-client/auth/signup.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const navigate = useNavigate();

    const initialValues: FormValues = {
        first_name: {
            value: '',
            required: true,
            pattern: "",
            errorMessage: 'Please enter valid data'
        },
        last_name: {
            value: '',
            required: true,
            pattern: "",
            errorMessage: 'Please enter valid data'
        },
        email: {
            value: '',
            required: true,
            pattern: EMAIL_REGEX,
            errorMessage: 'Please enter a valid email'
        },
        password: {
            value: '',
            required: true,
            pattern: PASSWORD_REGEX,
            errorMessage: 'Please enter valid data'
        },
        business: {
            value: '',
            required: true,
            pattern: "",
            errorMessage: 'Please enter valid data'
        },
        agree_to_terms: {
            value: true,
            required: true,
            pattern: "",
            errorMessage: 'Please enter valid data'
        }
    }

    const [apiError, setApiError] = useState("");
    const [showError, setShowError] = useState(false);

    const formHandler = useFormHook(initialValues);


    const onSubmit = async (values: any) => {
        if (!formHandler.isFormValid()) {
            setErrorMessage("Please fill all fields");
            return;
        }

        const response = await signUpAPI(values);
        const { data } = response;
        if (data.status !== 201) {
            setErrorMessage(data.message)
            return;
        }
        
        localStorage.setItem("access", data?.access);
        localStorage.setItem("refresh", data?.refresh);
        navigate("/dashboard");
    }

    const setErrorMessage = (message: string = "error") => {
        setApiError(message);
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, 7000);
    }

    return <SignUpHTML
        formHandler={formHandler}
        onSubmit={onSubmit}
        apiError={apiError}
        showError={showError}
        setShowError={setShowError}
    />
}

export default SignUp;