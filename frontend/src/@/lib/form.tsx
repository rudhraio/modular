import { useState } from 'react';

interface FormValues {
    [key: string]: any;
}

interface FieldProps {
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
}

interface FormBag {
    formValid: boolean;
    values: FormValues;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (name: string) => void;
    isFormValid: () => boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    getFieldProps: (name: string) => FieldProps;
    errors: FormValues;
    touched: FormValues;
}

function Form(initialValues: FormValues, onSubmit: (values: FormValues, isFormValid: boolean) => void) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<FormValues>({});
    const [touched, setTouched] = useState<FormValues>({});
    const [formValid, setFormValid] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: { ...values[name], value } });
    };

    const handleBlur = (name: string) => {
        setTouched({ ...touched, [name]: true });
        validateForm();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateForm();
        if (Object.keys(errors).length === 0) {
            onSubmit(values, formValid);
        }
    };

    const getFieldProps = (name: string) => ({
        name,
        value: values[name] || '',
        onChange: handleChange,
        onBlur: () => handleBlur(name),
    });

    const validateForm = () => {
        const newErrors: FormValues = {};
        let count = 0;
        for (const key in initialValues) {
            if (initialValues.hasOwnProperty(key) && !values[key]) {
                newErrors[key] = 'Field is required';
                count++
            }
        }
        setErrors(newErrors);
        if (count === 0) {
            setFormValid(true);
        } else {
            setFormValid(false);

        }
    };

    const isFormValid = () => {
        return formValid;
    }

    return {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        getFieldProps,
        errors,
        touched,
        isFormValid
    } as FormBag;
}

export default Form;
