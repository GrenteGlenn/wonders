import {useState, useRef, useEffect} from 'react';
import {LogOut} from 'lucide-react';
import {useApp} from "@/context/AppContext.tsx";
import {Switch} from "@components/ui/switch.tsx";
import {Label} from "@components/ui/label.tsx"


export default function IconProfil() {
    // const navigate = useNavigate();
    const {logout, theme, toggleTheme} = useApp()
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // Fermer le menu quand on clique à l'extérieur
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as HTMLElement) &&
                buttonRef.current && !buttonRef.current.contains(event.target as HTMLButtonElement)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    console.log("theme", theme)

    return (
        <div className="relative">
            {/* Profile Menu */}
            <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2"
            >

                <div
                    className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">JD</span>
                </div>

                <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
            </button>

            {/* Menu déroulant */}
            {isMenuOpen && (
                <div
                    ref={menuRef}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                >
                    {/* Informations utilisateur */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div
                                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-medium">JD</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">John Doe</p>
                                <p className="text-xs text-gray-500">john.doe@example.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Options du menu */}
                    <div className="py-1">
                        {/*<button*/}
                        {/*    onClick={() => navigate('/profile')}*/}
                        {/*    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"*/}
                        {/*>*/}
                        {/*    <User className="w-4 h-4 mr-3"/>*/}
                        {/*    Mon Profil*/}
                        {/*</button>*/}

                        {/*<button*/}
                        {/*    onClick={() => navigate('/settings')}*/}
                        {/*    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"*/}
                        {/*>*/}
                        {/*    <Settings className="w-4 h-4 mr-3"/>*/}
                        {/*    Paramètres*/}
                        {/*</button>*/}

                        <div className={"flex items-center space-x-2 px-4 py-2"}>
                            <Switch onClick={() => toggleTheme()} id={"theme"}/>
                            <Label htmlFor={"theme"}>Theme Dark</Label>
                        </div>

                        {/*<button*/}
                        {/*    onClick={() => navigate('/help')}*/}
                        {/*    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"*/}
                        {/*>*/}
                        {/*    <HelpCircle className="w-4 h-4 mr-3"/>*/}
                        {/*    Aide*/}
                        {/*</button>*/}
                    </div>

                    <div className="border-t border-gray-100"></div>

                    <div className="py-1">
                        <button
                            onClick={() => logout()}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="w-4 h-4 mr-3"/>
                            Déconnexion
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}