
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"

const invoices = [
    {
        id: "INV001",
        age: "5",
        name: 'john doe'
    },
    {
        id: "INV002",
        age: "2",
        name: 'john doe'
    }
]

const ChildTable = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <h1 className="text-center w-full text-xl my-7 font-semibold">Manage Your Child</h1>
            <Table className="w-[50%] mx-auto">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell className="font-medium">{invoice.id}</TableCell>
                            <TableCell>{invoice.age}</TableCell>
                            <TableCell>{invoice.name}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="secondary">Edit</Button>
                                <Button variant="destructive" className="mx-1">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}


export default ChildTable