import { useEffect, useState } from "react";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase"; // Ensure `db` is Firestore instance
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "./ui/button";
import { MdEdit, MdDelete } from "react-icons/md";
import { checkAndSendVaccineReminderSms } from "@/lib/sendSms";

// Define a Child type
interface Child {
  id: string;
  age: number; // Adjust type based on your Firestore data structure
  childName: string; // Adjust type based on your Firestore data structure
}

const ChildTable = () => {
  const [children, setChildren] = useState<Child[]>([]); // Specify the state type as Child[]

  useEffect(() => {
    const fetchChildren = async () => {
      const user = auth.currentUser; // Get the logged-in user
      if (user) {
        const q = query(collection(db, "children"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedChildren: Child[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Child[]; // Ensure correct typing
        setChildren(fetchedChildren);
      }
    };

    fetchChildren();

    checkAndSendVaccineReminderSms();
  }, []);

  const deleteChild = async (id: string) => { // Specify the parameter type
    await deleteDoc(doc(db, "children", id));
    setChildren(children.filter(child => child.id !== id));
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-center w-full text-xl my-7 font-semibold">
        Manage Your Child
      </h1>
      <Table className="w-[80%] mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {children.map((child) => (
            <TableRow key={child.id}>
              <TableCell className="font-medium">{child.id}</TableCell>
              <TableCell>{child.age}</TableCell>
              <TableCell>{child.childName}</TableCell>
              <TableCell className="text-right">
                <Button variant="destructive" className="mx-1" onClick={() => deleteChild(child.id)}>
                  Delete <MdDelete className="text-lg" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ChildTable;
