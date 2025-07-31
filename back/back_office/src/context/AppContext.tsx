import {createContext, useContext, useState, type ReactNode} from "react";

interface User {
    name: string;
    email: string;
}

type Theme = "light" | "dark";

interface AppContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    theme: Theme;
    toggleTheme: () => void;
    trigger: boolean;
    toggleTrigger: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [theme, setTheme] = useState<Theme>("light");
    const [trigger, setTrigger] = useState<boolean>(false);

    const login = (userData: User) => {
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    const toggleTrigger = () => {
        setTrigger(!trigger);
    }
    return (
        <AppContext.Provider value={{isAuthenticated, user, login, logout, theme, toggleTheme, trigger, toggleTrigger}}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};
