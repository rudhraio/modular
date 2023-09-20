import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Email from "@/components/ui/email";
import FormItem from "@/components/ui/form/form-item";
import FormMessage from "@/components/ui/form/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Password from "@/components/ui/password";
import { AlertCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

function SignUpHTML(props: any) {
    const { formHandler, onSubmit, apiError, showError, setShowError } = props;
    return (<>
        <section className="flex min-h-screen flex-col items-center justify-center">
            <div className="w-[40rem] border p-8">
                <div className="flex flex-col gap-y-4">
                    <h3 className="text-3xl">
                        Sign Up
                    </h3>
                    <p className="text-lg">
                        Try it for free
                    </p>
                </div>
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

                <div className="mt-8 flex flex-col gap-y-4">
                    <div className="flex justify-between gap-x-4">
                        <FormItem>
                            <Label> First Name </Label>
                            <Input
                                id="first_name"
                                value={formHandler.values.first_name.value}
                                onChange={(e) => formHandler.handleChange('first_name', e.target.value)}
                                onBlur={() => formHandler.handleBlur('first_name')}
                                isvalid={formHandler.values.first_name?.isvalid}
                            />
                            <FormMessage formHandler={formHandler} field_name="first_name" />
                        </FormItem>
                        <FormItem>
                            <Label> Last Name</Label>
                            <Input
                                id="last_name"
                                value={formHandler.values.last_name.value}
                                onChange={(e) => formHandler.handleChange('last_name', e.target.value)}
                                onBlur={() => formHandler.handleBlur('last_name')}
                                isvalid={formHandler.values.last_name?.isvalid}
                            />
                            <FormMessage formHandler={formHandler} field_name="last_name" />
                        </FormItem>
                    </div>
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
                        <Label> Business Name </Label>
                        <Input
                            id="domain"
                            value={formHandler.values.domain.value}
                            onChange={(e) => formHandler.handleChange('domain', e.target.value)}
                            onBlur={() => formHandler.handleBlur('domain')}
                            isvalid={formHandler.values.domain?.isvalid}
                        />
                        <FormMessage formHandler={formHandler} field_name="domain" />
                    </FormItem>
                    <div className="items-top flex space-x-2">
                        <Checkbox id="agree_to_terms"
                            value={formHandler.values.agree_to_terms.value}
                            onChange={(e) => {
                                console.log("target", e.target);
                            }}

                            checked={formHandler.values.agree_to_terms.value}
                            onCheckedChange={(e) => { formHandler.handleChange('agree_to_terms', e) }}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <Label>
                                Accept terms and conditions
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                You agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex">
                        <Button className="w-full font-bold"
                            disabled={formHandler.isSubmitting}
                            onClick={() => formHandler.handleSubmit(onSubmit)}
                        >
                            {
                                formHandler.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            }
                            Sign Up
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <p>
                    Already have an account? <Link className="font-bold" to="/signin">Sign In</Link>
                </p>
            </div>
        </section>
    </>)
}

export default SignUpHTML;