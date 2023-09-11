import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Email from "@/components/ui/email";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Password from "@/components/ui/password";
import { Link } from "react-router-dom";

function SignUpHTML() {
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
                <div className="mt-8 flex flex-col gap-y-8">
                    <div className="flex justify-between gap-x-4">
                        <div className="flex flex-col gap-y-4 w-full">
                            <Label> First Name</Label>
                            <Input />
                        </div>
                        <div className="flex flex-col gap-y-4 w-full">
                            <Label> Last Name</Label>
                            <Input />
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 w-full">
                        <Label> Email</Label>
                        <Email />
                    </div>
                    <div className="flex flex-col gap-y-4 w-full">
                        <Label> Password</Label>
                        <Password />
                    </div>
                    <div className="flex flex-col gap-y-4 w-full">
                        <Label> Business Name</Label>
                        <Input />
                    </div>
                    <div className="items-top flex space-x-2">
                        <Checkbox id="terms1" />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="terms1"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Accept terms and conditions
                            </label>
                            <p className="text-sm text-muted-foreground">
                                You agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex">
                        <Button className="w-full">
                            <b>
                                Sign Up
                            </b>
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