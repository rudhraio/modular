const FormMessage: React.FC<any> = ({ formHandler, field_name }) => {
    return (
        <p className="-mt-2 text-sm">
            {formHandler.touched[field_name] && formHandler.errors[field_name] &&
                <span className="text-red-600">{formHandler.errors[field_name]}</span>}
        </p>
    );
};

export default FormMessage;