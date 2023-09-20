import { ReactNode } from 'react';

interface FormItemProps {
    children: ReactNode;
}

const FormItem: React.FC<FormItemProps> = ({ children }) => {
    return (
        <div className="flex flex-col gap-y-4 w-full">
            {children}
        </div>
    );
};

export default FormItem;