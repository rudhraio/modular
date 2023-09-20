import { FormValues, useFormHook } from "@/lib/form";
import { EMAIL_REGEX } from "../../../utility/regex";
import ForgotPassordHTML from "./forgot-password.html";
import { useState } from "react";
import forgotPasswordAPI from "../../../api-client/auth/forgot-password.api";

function ForgotPassord() {

    const initialValues: FormValues = {
        email: {
            value: '',
            required: true,
            pattern: EMAIL_REGEX,
            errorMessage: 'Please enter a valid email'
        }
    }

    const [apiError, setApiError] = useState("");
    const [showError, setShowError] = useState(false);

    const [apiSuccess, setApiSuccess] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const formHandler = useFormHook(initialValues);

    const onSubmit = async (values: any) => {
        setShowError(false);
        setShowSuccess(false);
        console.log("Values", values);

        if (!formHandler.isFormValid()) {
            setErrorMessage("Please fill all fields");
            return;
        }
        const response = await forgotPasswordAPI(values);
        const { data } = response;
        if (data.status === 200) {
            setApiSuccess(`Reset link has been emailed to ${formHandler?.values?.email?.value}.`);
            setShowSuccess(true);
            return;
        } else {
            setErrorMessage(data.message)
        }
    }

    const setErrorMessage = (message: string = "error") => {
        setApiError(message);
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, 7000);
    }

    return <ForgotPassordHTML
        formHandler={formHandler}
        onSubmit={onSubmit}
        apiError={apiError}
        showError={showError}
        setShowError={setShowError}
        apiSuccess={apiSuccess}
        showSuccess={showSuccess}
    />
}

export default ForgotPassord;