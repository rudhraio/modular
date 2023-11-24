import { Button } from "@/components/ui/button";
import FormItem from "@/components/ui/form/form-item";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select-search";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";

function InfoPageHTML() {
    return (<>
        <div className="flex flex-col mx-32 mt-5">
            <div className="">
                <h3 className="text-3xl">
                    Info
                </h3>
            </div>
            <div className="flex flex-col p-14 mt-8 w-full gap-x-12 rounded-sm shadow">
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-col gap-6 basis-2/3">
                        <FormItem>
                            <Label>Display Name</Label>
                            <Input  placeholder="Enter organisation display name"/>
                        </FormItem>

                        <FormItem>
                            <Label>Email (will be public)</Label>
                            <Input placeholder="Enter Email" />
                        </FormItem>
                        <FormItem>
                            <Label>Description</Label>
                            <Textarea placeholder="Enter Description" />
                        </FormItem>
                        <FormItem>
                            <Label>Url</Label>
                            <Input disabled value="https://hello.trihox.com" />
                        </FormItem>

                    </div>
                    <div className="basis-1/3 mx-auto flex justify-center">
                        <div>
                            <p className="mb-5">
                                Logo
                            </p>
                            <div className="h-48 w-48 bg-gray-300 rounded-sm relative">
                                <div className="w-12 h-12 rounded-full bg-gray-500 absolute -bottom-5 -right-5 cursor-pointer"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row-reverse mt-14">
                    <Button>
                        Save
                    </Button>
                </div>


            </div>

        </div>
    </>);
}

export default InfoPageHTML;