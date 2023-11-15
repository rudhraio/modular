import { EMAIL_REGEX, PASSWORD_REGEX } from "../../../utility/regex";
import SignInHTML from "./signin.html";
import { FormValues, useFormHook } from "@/lib/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import signInAPI from "../../../api-client/auth/signin.api";

function SignIn() {

    const navigate = useNavigate();

    const initialValues: FormValues = {
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

        const response = await signInAPI(values);
        const { data } = response;
        if (data.status !== 200) {
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

    return <SignInHTML
        formHandler={formHandler}
        onSubmit={onSubmit}
        apiError={apiError}
        showError={showError}
        setShowError={setShowError}
    />
}

export default SignIn;