import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@components/ui/form.tsx";
import {Input} from "@components/ui/input.tsx";
import {Eye, EyeOff} from "lucide-react";
import {useState} from "react";
import {useApp} from "@/context/AppContext.tsx";
import {useNavigate} from "react-router-dom";

const FormSchema = z.object({
    email: z.string()
        .min(2, {
            message: "Email must be at least 2 characters.",
        })
        .email({
            message: "This is not a Email",
        }),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),
})

export default function TravelManagerLogin() {
    const navigate = useNavigate();
    const {login} = useApp();
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit(data: z.output<typeof FormSchema>) {
        fetch("http://localhost:3005/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Erreur de chargement')
                }
                return res.json()
            })
            .then((data) => {
                login({name: "Admin", email: data.email})
                navigate("/dashboard")

            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4">
            <div className="w-full max-w-sm">

                {/* Formulaire de connexion */}
                <Form {...form}>
                    <form noValidate onSubmit={form.handleSubmit(onSubmit)}>

                        {/* Titre Connexion */}
                        <div className="text-center mb-12">
                            <h2 className="text-2xl font-normal text-gray-900">
                                Connexion
                            </h2>
                        </div>

                        <div className="space-y-6">

                            <FormField
                                control={form.control}
                                render={({field}) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="block text-sm font-normal text-gray-700 mb-2">
                                                Adresse e-mail
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder="exemple@email.com"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-smfocus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                }} name={"email"}/>

                            <FormField
                                control={form.control}
                                render={({field}) => {

                                    return (
                                        <FormItem>
                                            <FormLabel className="block text-sm font-normal text-gray-700 mb-2">
                                                Mot de passe
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        {...field}
                                                        id="password"
                                                        name="password"
                                                        type={showPassword ? "text" : "password"}
                                                        required
                                                        placeholder="Entrez votre mot de passe"
                                                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:border-0 focus:border-0"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff
                                                                className="h-5 w-5 text-gray-400 hover:text-gray-600"/>
                                                        ) : (
                                                            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600"/>
                                                        )}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )
                                }} name={"password"}/>

                            <div className="text-left">
                                <button
                                    type="submit"
                                    className="text-sm text-blue-600 hover:text-blue-700 focus:outline-none"
                                >
                                    Mot de passe oublié ?
                                </button>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
                                >
                                    Connexion
                                </button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}