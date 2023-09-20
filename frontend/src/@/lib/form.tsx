import { useState } from 'react';

type FieldConfig = {
    value: string | boolean;
    required?: boolean;
    pattern?: any;
    errorMessage?: string;
    isvalid?: boolean;
};

export type FormValues = {
    [key: string]: FieldConfig;
};

export type Values = {
    [key: string]: string;
};

type Errors = {
    [key: string]: string;
};

type Touched = {
    [key: string]: boolean;
};

type FormProps = {
    values: FormValues;
    errors: Errors;
    touched: Touched;
    isSubmitting: boolean;
    handleChange: (fieldName: string, value: string) => void;
    handleBlur: (fieldName: string) => void;
    handleSubmit: (onSubmit: (values: Values) => void) => Promise<void>;
    getFormValues: () => FormValues;
    isFormValid: () => boolean;
};

export function useFormHook(initialValues: FormValues): FormProps {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<Errors>({});
    const [touched, setTouched] = useState<Touched>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


    const handleChange = (fieldName: string, value: string) => {
        setValues({
            ...values,
            [fieldName]: {
                ...values[fieldName],
                value,
            },
        });
    };

    const handleBlur = (fieldName: string) => {
        setTouched({
            ...touched,
            [fieldName]: true,
        });
        validateForm();

        // Trigger field validation and update isvalid
        const fieldErrors = validateField(fieldName);
        const isvalid = Object.keys(fieldErrors).length === 0;
        updateFieldValidity(fieldName, isvalid);
    };

    const validateField = (fieldName: string) => {
        const field = values[fieldName];
        const fieldErrors: Errors = {};

        if (field.required && (typeof field.value === "string" && !field.value.trim())) {
            fieldErrors.message = field.errorMessage || 'Field is required';
        } else if (field.pattern && (typeof field.value === "string" && !new RegExp(field.pattern).test(field.value))) {
            fieldErrors.message = field.errorMessage || 'Invalid value provided';
        }

        return fieldErrors;
    };

    const validateForm = () => {
        const newErrors: Errors = {};

        for (const fieldName in values) {
            const fieldErrors = validateField(fieldName);
            if (Object.keys(fieldErrors).length > 0) {
                newErrors[fieldName] = fieldErrors.message;
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getFormValues = () => {

        let returnValue: any = {}
        for (const fieldName in values) {
            returnValue[fieldName] = values[fieldName].value;
        }
        return returnValue;

    };

    const updateFieldValidity = (fieldName: string, isvalid: boolean) => {
        setValues({
            ...values,
            [fieldName]: {
                ...values[fieldName],
                isvalid,
            },
        });
    };

    const isFormValid = () => {
        if (!validateForm()) {
            return false;
        } else {
            return true
        }
    };

    const setAllTouched = () => {
        const touchedFields: Touched = {};
        for (const fieldName in values) {
            touchedFields[fieldName] = true;

            const fieldErrors = validateField(fieldName);
            const isvalid = Object.keys(fieldErrors).length === 0;
            updateFieldValidity(fieldName, isvalid);
        }
        setTouched(touchedFields);
    };

    const handleSubmit = async (onSubmit: (values: Values) => void) => {
        setIsSubmitting(true);
        try {
            validateForm();
            setAllTouched();
            await onSubmit(getFormValues());
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        getFormValues,
        isFormValid,
    };
}
