import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit } from "lucide-react";


function MembersPageHTML() {


    const members = [
        {
            name: "Admin",
            email: "admin@zub.app",
            role: "ADMIN",
            status: "Active"
        },
        {
            name: "Manager",
            email: "manager@zub.app",
            role: "MANAGER",
            status: "Active"
        },
        {
            name: "Staff",
            email: "staff@zub.app",
            role: "STAFF",
            status: "Inactive"
        }
    ]

    const invoices = [
        {
            invoice: "admin@zhub.app",
            paymentStatus: "Paid",
            totalAmount: "$250.00",
            paymentMethod: "Credit Card",
        },
        {
            invoice: "INV002",
            paymentStatus: "Pending",
            totalAmount: "$150.00",
            paymentMethod: "PayPal",
        },
        {
            invoice: "INV003",
            paymentStatus: "Unpaid",
            totalAmount: "$350.00",
            paymentMethod: "Bank Transfer",
        },
        {
            invoice: "INV004",
            paymentStatus: "Paid",
            totalAmount: "$450.00",
            paymentMethod: "Credit Card",
        },
        {
            invoice: "INV005",
            paymentStatus: "Paid",
            totalAmount: "$550.00",
            paymentMethod: "PayPal",
        },
        {
            invoice: "INV006",
            paymentStatus: "Pending",
            totalAmount: "$200.00",
            paymentMethod: "Bank Transfer",
        },
        {
            invoice: "INV007",
            paymentStatus: "Unpaid",
            totalAmount: "$300.00",
            paymentMethod: "Credit Card",
        },
    ]

    return (<>
        <div className="flex flex-col mx-32 mt-5">
            <div className="">
                <h3 className="text-3xl">
                    Members
                </h3>
            </div>
            <div className="flex flex-col px-14 pb-14 mt-8 w-full gap-x-12 rounded-sm shadow">
                <h4 className="mt-10 mb-4 text-lg font-medium">
                    List of Members
                </h4>
                <div className="mb-5 flex flex-row justify-between items-center">
                    <div className="basis-3/5">
                        <Input className="h-10 text-md rounded-sm" placeholder="Search for a member" />
                    </div>
                    <div>
                        <Button className="h-10 rounded-sm text-md">Add Member</Button>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50%]">Members</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members.map((member) => (
                            <TableRow key={member.email}>
                                <TableCell>
                                    <div className="flex flex-row gap-x-6">
                                        <div className="h-10 w-10 bg-gray-100 rounded-full"></div>
                                        <p>
                                            <span className="text-base">
                                                {member.name}
                                            </span>
                                            <br />{member.email}
                                        </p>
                                    </div>

                                </TableCell>
                                <TableCell>{member.role}</TableCell>
                                <TableCell>{member.status}</TableCell>
                                <TableCell className="text-right float-right me-auto">
                                    <Edit className="h-5 w-5 mt-3 cursor-pointer" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    {/* <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter> */}
                </Table>
            </div>

        </div >
    </>);
}

export default MembersPageHTML;