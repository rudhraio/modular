import React from "react";
import { Input } from "./input";

interface EmailProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isvalid?: boolean
}


const Email = React.forwardRef<HTMLInputElement, EmailProps>(
    (props, ref) => {
        return <Input {...props} type="email" ref={ref} />;
    }
);

export default Email;