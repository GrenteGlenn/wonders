import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@components/ui/form.tsx";
import {Input} from "@components/ui/input.tsx";
import {DialogClose, DialogFooter} from "@components/ui/dialog.tsx";
import {instanceUser} from "@/lib/axiosInstance.ts";


const FormSchema = z.object({
    id: z.number(),
    from_date: z.string(),
    to_date: z.string(),
    price: z.number(),
    url: z.string(),
    status: z.string()
})

type FormValues = z.infer<typeof FormSchema>

export default function FormEditFly({
                                        defaultValues,
                                        onSuccess,
                                    }: {
    defaultValues?: FormValues
    onSuccess?: () => void
}) {

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues,
    })

    function onSubmit(data: z.output<typeof FormSchema>) {
        instanceUser(`users/${defaultValues?.id}`, {
            method: "PUT",
            data: data
        })
            .then((res) => {
                const data = res.data
                if (!data.ok) {
                    throw new Error('Erreur de chargement')
                }
                onSuccess?.()
            })
            .catch((error) => console.log(error));

    }

    console.log(defaultValues)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                <FormField
                    name={"from_date"}
                    control={form.control}
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel className="block text-sm font-normal text-gray-700 mb-2">
                                    First Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="from_date"
                                        type="date"
                                        placeholder="From Date"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                                        required
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }}/>

                <FormField
                    name={"to_date"}
                    control={form.control}
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel className="block text-sm font-normal text-gray-700 mb-2">
                                    Last Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="to_date"
                                        type="date"
                                        placeholder="To Date"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                                        required
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }}/>

                <FormField
                    name={"price"}
                    control={form.control}
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel className="block text-sm font-normal text-gray-700 mb-2">
                                    Last Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="price"
                                        type="number"
                                        placeholder="Price"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                                        required
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }}/>

                <FormField
                    name={"url"}
                    control={form.control}
                    render={({field}) => {
                        return (
                            <FormItem>
                                <FormLabel className="block text-sm font-normal text-gray-700 mb-2">
                                    Last Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="url"
                                        type="text"
                                        placeholder="Url"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                                        required
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }}/>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </Form>
    )
}
