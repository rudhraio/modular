import { ReactNode } from 'react';

interface FormItemProps {
    children: ReactNode;
    className?: string
}

const FormItem: React.FC<FormItemProps> = ({ children, className }) => {
    return (
        <div className={`${className} flex flex-col gap-y-4 w-full`}>
            {children}
        </div>
    );
};

export default FormItem;