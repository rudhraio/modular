import { Button } from "@/components/ui/button";
import FormItem from "@/components/ui/form/form-item";
import Password from "@/components/ui/password";
import { Label } from "@radix-ui/react-label";

function ChangePasswordPageHTML() {
    return (<>
        <div className="flex flex-col mx-32 mt-5">
            <div className="">
                <h3 className="text-3xl">
                    Change Password
                </h3>
            </div>
            <div className="flex flex-row p-14 mt-8 w-full gap-x-12 rounded-sm shadow">
                <div className="w-full">
                    <div className="flex flex-col gap-y-10 ">
                        <FormItem>
                            <Label> Old Password </Label>
                            <Password />

                        </FormItem>
                        <FormItem>
                            <Label> New Password </Label>

                            <Password />

                        </FormItem>
                        <FormItem>
                            <Label> Confirm New Password </Label>

                            <Password />

                        </FormItem>
                    </div>

                    <div className="flex flex-row-reverse mt-14">
                        <Button>
                            Save
                        </Button>
                    </div>
                </div>
                <div>
                    <div className="w-[28rem]"> </div>
                </div>
            </div>
        </div>
    </>);
}

export default ChangePasswordPageHTML;