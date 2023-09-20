import { ReactNode } from 'react';

interface FormItemProps {
    children: ReactNode;
    isvalid?: boolean
}

const FormDescription: React.FC<FormItemProps> = ({
    children,
    isvalid = true
}) => {
    return (<>
        {
            isvalid ? <p className="-mt-2 text-sm">
                {children}
            </p> : null
        }
    </>)

}

export default FormDescription;