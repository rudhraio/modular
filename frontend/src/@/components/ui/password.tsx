import React from "react";
import { Input } from "./input";

interface PasswordProps extends React.InputHTMLAttributes<HTMLInputElement> { }


const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
    (props, ref) => {
        return <Input {...props} type="password" ref={ref} />;
    }
);

export default Password;