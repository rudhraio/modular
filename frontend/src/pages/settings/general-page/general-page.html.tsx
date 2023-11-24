import { Button } from "@/components/ui/button";
import FormItem from "@/components/ui/form/form-item";
import SelectSearch from "@/components/ui/select-search";
import { Label } from "@radix-ui/react-label";
import { country } from "../../../utility/data/country";
import { date_format, time_format } from "../../../utility/data/formats";

function GeneralPageHTML() {
    const COUNTRY = country.map((item: any) => {
        return { value: item.code, label: item.name }
    })
    return (<>
        <div className="flex flex-col mx-32 mt-5">
            <div className="">
                <h3 className="text-3xl">
                    General
                </h3>
            </div>
            <div className="flex flex-col p-14 mt-8 w-full gap-x-12 rounded-sm shadow">
                <div className="flex flex-row gap-6">
                    <FormItem>
                        <Label>Country</Label>
                        <SelectSearch options={COUNTRY} placeholder="Select country" />
                    </FormItem>
                    <FormItem>
                        <Label>Date Format</Label>
                        <SelectSearch options={date_format} placeholder="Select date format" />


                    </FormItem>
                </div>
                <div className="mt-6 flex flex-row gap-6">
                    <FormItem>
                        <Label>Time Format</Label>
                        <SelectSearch options={time_format} placeholder="Select time format" />

                    </FormItem>
                    <FormItem> </FormItem>
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

export default GeneralPageHTML;