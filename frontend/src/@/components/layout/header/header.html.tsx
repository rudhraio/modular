import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Settings } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

function HeaderHTML() {
    const navigate = useNavigate();
    return (<>
        <section className="px-6 py-2 border-b-2 fixed bg-white w-full">
            <div className="flex justify-between items-center min-h-[1rem]">
                <div>
                    <p>
                        Home
                    </p>
                </div>
                <div>
                    <Popover>
                        <PopoverTrigger>
                            <div className="border-2 border-transparent hover:border-gray-100 rounded-sm">

                                <Settings className="m-1" />
                            </div>

                        </PopoverTrigger>
                        <PopoverContent align="end" className="p-0">
                            <Link to="/settings/general" >
                                <p className="m-2 p-2 hover:bg-gray-100 hover:rounded-sm cursor-pointer font-light">

                                    Business Settings
                                </p>
                            </Link>
                            <Link to="/settings/profile" >
                                <p className="m-2 p-2 hover:bg-gray-100 hover:rounded-sm cursor-pointer font-light">

                                    Profile Settings
                                </p>
                            </Link>
                            <DropdownMenuSeparator />
                            <p className="m-2 p-2 hover:bg-gray-100 hover:rounded-sm cursor-pointer font-light"
                                onClick={() => {
                                    localStorage.clear();
                                    navigate("/signin")
                                }}>
                                Log out
                            </p>
                        </PopoverContent>
                    </Popover>

                </div>
            </div>
        </section>
    </>)
}

export default HeaderHTML;