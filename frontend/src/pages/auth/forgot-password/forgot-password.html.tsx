import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Email from "@/components/ui/email";
import FormItem from "@/components/ui/form/form-item";
import FormMessage from "@/components/ui/form/form-message";
import { Label } from "@radix-ui/react-label";
import { AlertCircle, Loader2, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

function ForgotPassordHTML(props: any) {

    const { formHandler, onSubmit, apiError, showError, setShowError, showSuccess, apiSuccess } = props;

    return (<>
        <section className="flex min-h-screen flex-col items-center justify-center">
            <div className="w-[40rem] border p-8">
                <div className="flex flex-col gap-y-4">
                    <h3 className="text-3xl">
                        Forgot Password
                    </h3>
                    <p className="text-xl text-gray-400">
                        Don't worry we cover you.
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
                        <Label> Email </Label>
                        <Email
                            id="email"
                            value={formHandler.values.email.value}
                            onChange={(e) => formHandler.handleChange('email', e.target.value)}
                            onBlur={() => formHandler.handleBlur('email')}
                            isvalid={formHandler.values.email?.isvalid}
                        />
                        <FormMessage formHandler={formHandler} field_name="email" />
                    </FormItem>
                    <div className="w-full flex">
                        <Button className="w-full"
                            disabled={formHandler.isSubmitting}
                            onClick={() => formHandler.handleSubmit(onSubmit)}
                        >
                            {
                                formHandler.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            }
                            Send Reset Link
                        </Button>
                    </div>
                </div>

            </div>
            <div className="mt-8">
                <p>
                    Back to <Link className="font-bold" to="/signin">Sign In</Link>
                </p>
            </div>
        </section>
    </>)
}

export default ForgotPassordHTML;