import {Button} from "@components/ui/button.tsx";
import {DialogClose, DialogFooter} from "@components/ui/dialog.tsx";
import {instanceQuiz} from "@/lib/axiosInstance.ts";


export default function FormDeleteFly({defaultValues, onSuccess,}: {
    defaultValues?: { id: number }, onSuccess?: () => void
}) {

    function deleteFly() {
        instanceQuiz(`trip-transportation/${defaultValues?.id}`, {
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
            <Button onClick={() => deleteFly()}>Save changes</Button>
        </DialogFooter>
    )
}
