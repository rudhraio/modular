import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import FormItem from "@/components/ui/form/form-item";
import FormMessage from "@/components/ui/form/form-message";
import Password from "@/components/ui/password";
import { Label } from "@radix-ui/react-label";
import { AlertCircle, Loader2, Terminal } from "lucide-react";

function ResetPasswordHTML(props: any) {

    const { formHandler, onSubmit, apiError, showError, setShowError, showSuccess, apiSuccess } = props;


    return (
        <>
            <section className="flex min-h-screen flex-col items-center justify-center">

                <div className="w-[40rem] border p-8">
                    <div className="flex flex-col gap-y-4">
                        <h3 className="text-3xl">
                            Reset Password
                        </h3>
                        <p className="text-lg text-gray-400">
                            Please enter your password
                        </p>
                    </div>
                    {
                        showSuccess && <Alert className="mt-8 border-green-400">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle className=" text-green-500">Success</AlertTitle>
                            <AlertDescription className=" text-green-500">
                                {apiSuccess}
                            </AlertDescription>
                        </Alert>
                    }
                    {
                        showError && <Alert variant="destructive" className="mt-4">
                            <div className="flex row justify-between">
                                <div className="flex row gap-x-4">

                                    <AlertCircle className="h-4 w-4" />
                                    <div>
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>
                                            {apiError}
                                        </AlertDescription>
                                    </div>
                                </div>
                                <div className="cursor-pointer" onClick={() => { setShowError(false) }}>
                                    <p className="flex border p-1 px-2 rounded-md bg-red-400 text-white border-red-400">
                                        X
                                    </p>
                                </div>
                            </div>
                        </Alert>
                    }
                    <div className="mt-8 flex flex-col gap-y-8">
                        <FormItem>
                            <Label> Password </Label>
                            <Password
                                id="password"
                                value={formHandler.values.password.value}
                                onChange={(e) => formHandler.handleChange('password', e.target.value)}
                                onBlur={() => formHandler.handleBlur('password')}
                                isvalid={formHandler.values.password?.isvalid}
                            />
                            <FormMessage formHandler={formHandler} field_name="password" />
                        </FormItem>
                        <FormItem>
                            <Label> Confirm Password </Label>
                            <Password
                                id="confirm_password"
                                value={formHandler.values.confirm_password.value}
                                onChange={(e) => formHandler.handleChange('confirm_password', e.target.value)}
                                onBlur={() => formHandler.handleBlur('confirm_password')}
                                isvalid={formHandler.values.confirm_password?.isvalid}
                            />
                            <FormMessage formHandler={formHandler} field_name="confirm_password" />
                        </FormItem>
                        <div className="w-full flex">
                            <Button className="w-full font-bold"
                                disabled={formHandler.isSubmitting}
                                onClick={() => formHandler.handleSubmit(onSubmit)}
                            >
                                {
                                    formHandler.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                }
                                Reset Password
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ResetPasswordHTML;