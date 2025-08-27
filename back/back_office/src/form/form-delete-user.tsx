import {Button} from "@components/ui/button.tsx";
import {DialogClose, DialogFooter} from "@components/ui/dialog.tsx";
import {instanceUser} from "@/lib/axiosInstance.ts";


export default function FormDeleteUser({
                                           defaultValues,
                                           onSuccess,
                                       }: {
    defaultValues?: { id: number };
    onSuccess?: () => void
}) {

    function deleteUser() {
        instanceUser(`users/${defaultValues?.id}`, {
            method: "DELETE"
        })
            .then((res) => {
                const data = res?.data;
                if (!data.ok) {
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
