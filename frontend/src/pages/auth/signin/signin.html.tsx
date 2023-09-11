import { Button } from "@/components/ui/button";
import Email from "@/components/ui/email";
import { Label } from "@/components/ui/label";
import Password from "@/components/ui/password";
import { Link } from "react-router-dom";


function SignInHTML(props: any) {

    const { form } = props;

    return (<>
        <section className="flex min-h-screen flex-col items-center justify-center">
            <div className="w-[40rem] border p-8">
                <div className="flex flex-col gap-y-4">
                    <h3 className="text-3xl">
                        Sign In
                    </h3>
                    <p className="text-xl text-gray-400">
                        Welcome back
                    </p>
                </div>
                <form className="mt-8 flex flex-col gap-y-8">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Label> Email</Label>
                        <Email value={form?.value?.email} />
                    </div>
                    <div className="flex flex-col gap-y-4 w-full">
                        <Label> Password</Label>
                        <Password />
                        <Link to="/forgot-password" className="ms-auto text-slate-400">
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="w-full flex">
                        <Button className="w-full" onClick={(e) => { form.handleSubmit(e) }}>
                            <b>
                                Sign In
                            </b>
                        </Button>
                    </div>
                </form>
            </div>
            <div className="mt-8">
                <p>
                    Don't have an account? <Link className="font-bold" to="/signup">Sign Up</Link>
                </p>
            </div>
        </section>
    </>)
}

export default SignInHTML;