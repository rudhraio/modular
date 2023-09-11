import { Button } from "@/components/ui/button";
import Email from "@/components/ui/email";
import { Label } from "@radix-ui/react-label";
import { Link } from "react-router-dom";

function ForgotPassordHTML() {
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
                <div className="mt-8 flex flex-col gap-y-8">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Label> Email</Label>
                        <Email />
                    </div>
                    <div className="w-full flex">
                        <Button className="w-full">
                            <b>
                                Send Reset Link
                            </b>
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