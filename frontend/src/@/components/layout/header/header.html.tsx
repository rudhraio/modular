import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function HeaderHTML() {
    const navigate = useNavigate();
    return (<>
        <section className="px-8 py-4 border-b-2">
            <div className="flex justify-between items-center">
                <div>
                    <p>
                        Home
                    </p>
                </div>
                <div>
                    <Button
                        className=" w-full"
                        onClick={() => {
                            localStorage.clear();
                            navigate("/signin")
                        }}>
                        Logout
                    </Button>
                </div>
            </div>
        </section>
    </>)
}

export default HeaderHTML;