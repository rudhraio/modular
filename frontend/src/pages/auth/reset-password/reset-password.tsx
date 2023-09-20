import { FormValues, useFormHook } from "@/lib/form";
import ResetPasswordHTML from "./reset-password.html";
import { PASSWORD_REGEX } from "../../../utility/regex";
import { useEffect, useState } from "react";
import resetPasswordAPI from "../../../api-client/auth/reset-password.api";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function ResetPassword() {


    const location = useLocation();
    const navigate = useNavigate();

    const initialValues: FormValues = {
        password: {
            value: '',
            required: true,
            pattern: PASSWORD_REGEX,
            errorMessage: 'Please enter valid data'
        },
        confirm_password: {
            value: '',
            required: true,
            pattern: PASSWORD_REGEX,
            errorMessage: 'Please enter valid data'
        }
    }
    const formHandler = useFormHook(initialValues);
    const { id } = useParams();
    const [apiError, setApiError] = useState("");
    const [showError, setShowError] = useState(false);

    const [apiSuccess, setApiSuccess] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [code, setCode] = useState("false");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tempCode: string = queryParams.get('code') || "";
        setCode(tempCode);
    }, []);


    const onSubmit = async (values: any) => {
        setShowError(false);
        setShowSuccess(false);
        console.log("Values", values);

        if (!formHandler.isFormValid()) {
            setErrorMessage("Please fill all fields");
            return;
        }
        const response = await resetPasswordAPI({ ...values, id, otp: code });
        const { data } = response;
        if (data.status === 200) {
            setApiSuccess(`Password reset successful. Redirecting to sign in page... `);
            setShowSuccess(true);
            setTimeout(() => {
                navigate("/signin")
            }, 5000);
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


    return <ResetPasswordHTML
        formHandler={formHandler}
        onSubmit={onSubmit}
        apiError={apiError}
        showError={showError}
        setShowError={setShowError}
        apiSuccess={apiSuccess}
        showSuccess={showSuccess}
    />
}

export default ResetPassword;