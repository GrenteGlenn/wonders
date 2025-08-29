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
    first_name: z.string()
        .min(2, {
            message: "First name must be at least 2 characters.",
        }),
    last_name: z.string().min(2, {
        message: "Last name must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "Email must be at least 2 characters.",
    }).email({
        message: "Email must be a email.",
    }),
    birth_date: z.string()
})

type FormValues = z.infer<typeof FormSchema>

export default function FormEditUser({
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
                const data = res.data;
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
                    name={"first_name"}
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
                                        id="first_name"
                                        type="text"
                                        placeholder="New First Name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                                        required
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }}/>

                <FormField
                    name={"last_name"}
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
                                        id="last_name"
                                        type="text"
                                        placeholder="New Last Name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                                        required
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }}/>

                <FormField
                    name={"email"}
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
                                        id="email"
                                        type="email"
                                        placeholder="New Last Name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                                        required
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )
                    }}/>

                <FormField
                    name={"birth_date"}
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
                                        id="birth_date"
                                        type="date"
                                        placeholder="New Last Name"
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
