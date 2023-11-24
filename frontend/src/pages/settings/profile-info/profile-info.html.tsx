import { Button } from "@/components/ui/button";
import FormItem from "@/components/ui/form/form-item";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

function ProfileInfoPageHTML() {
    return (<>
        <div className="flex flex-col mx-32 mt-5">
            <div className="">
                <h3 className="text-3xl">
                    Profile Information
                </h3>
            </div>
            <div className="mt-8 p-14 rounded-sm shadow">
                <div className="flex flex-row gap-x-20">
                    <div>
                        <div className="w-48 h-48 bg-gray-100 rounded-full border-4 border-dashed relative">
                            <div className="w-12 h-12 rounded-full bg-gray-300 absolute bottom-0 right-0 cursor-pointer"></div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className=" flex flex-row gap-x-10">
                            <FormItem>
                                <Label> First Name </Label>
                                <Input />

                            </FormItem>
                            <FormItem>
                                <Label> Last Name </Label>
                                <Input />

                            </FormItem>
                        </div>
                        <div className="mt-8 flex flex-row gap-x-8">
                            <FormItem>
                                <Label> Phone Number  </Label>
                                <Input />

                            </FormItem>
                            <FormItem>
                                <Label> Email  </Label>
                                <Input value={"sample@example.com"} disabled />
                            </FormItem>
                        </div>
                        <div className="mt-8 flex flex-row gap-x-8">
                            <FormItem>

                                <Label> Account Verified Status  </Label>
                                <div>
                                    <p>
                                        <span className="text-red-600 bg-red-300 w-auto p-1 text-xs rounded-sm mr-1">
                                            Not Verified
                                        </span>
                                    </p>
                                </div>
                                <p className="-mt-2 text-xs font-medium cursor-pointer">Resend Verification link</p>

                            </FormItem>
                        </div>
                        <div className="flex flex-row-reverse mt-14">
                            <Button>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </>);
}

export default ProfileInfoPageHTML;