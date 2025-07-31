import {Button} from "@components/ui/button.tsx";
import {DialogClose, DialogFooter} from "@components/ui/dialog.tsx";


export default function FormDeleteUser({
                                           defaultValues,
                                           onSuccess,
                                       }: {
    defaultValues?: { id: number };
    onSuccess?: () => void
}) {

    function deleteUser() {
        fetch(`http://localhost:3005/api/users/${defaultValues?.id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Erreur de chargement')
                }
                onSuccess?.()
            })
            .catch((error) => console.log(error));
    }

    return (
        <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => deleteUser()}>Save changes</Button>
        </DialogFooter>
    )
}
