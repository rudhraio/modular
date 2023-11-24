import { Link, Outlet } from "react-router-dom";

function SettingsPageHTML() {

    const menu_css_class = "text-xl pt-2 pb-4 px-2";
    const menu_item_css_class = "text-[1.1rem] hover:bg-gray-100 rounded-sm p-2 cursor-pointer font-light";

    return (<>
        <div className="flex gap-x-6 min-h-full ">
            <div className="border-r-2 border-gray-500 min-h-screen pt-16 w-72">

                <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col px-2">
                        <h4 className={menu_css_class}>
                            Organisation Settings
                        </h4>
                        <Link to="general" className={menu_item_css_class}>
                            General
                        </Link>
                        <Link to="info" className={menu_item_css_class}>
                            Information
                        </Link>

                        <Link to="members" className={menu_item_css_class}>
                            Members
                        </Link>
                    </div>

                    <hr />
                    <div className="flex flex-col px-2">
                        <h4 className={menu_css_class}>
                            Profile Settings
                        </h4>
                        <Link to="profile" className={menu_item_css_class}>
                            User Information
                        </Link>
                        <Link to="change-password" className={menu_item_css_class}>
                            Change Password
                        </Link>
                    </div>
                </div>

            </div>
            <div className="pt-16 w-full">

                <Outlet />
            </div>
        </div>
    </>)
}

export default SettingsPageHTML;