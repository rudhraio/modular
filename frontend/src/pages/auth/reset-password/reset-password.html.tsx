import { Button } from "@/components/ui/button";
import Password from "@/components/ui/password";
import { Label } from "@radix-ui/react-label";

function ResetPasswordHTML() {
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
                    <div className="mt-8 flex flex-col gap-y-8">
                        <div className="flex flex-col gap-y-4 w-full">
                            <Label> Password</Label>
                            <Password type="password" />
                        </div>
                        <div className="flex flex-col gap-y-4 w-full">
                            <Label>Confirm Password</Label>
                            <Password type="password" />
                        </div>
                        <div className="w-full flex">
                            <Button className="w-full font-bold">
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