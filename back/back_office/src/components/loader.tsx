import React from 'react';

// Types pour les props du composant Loader
interface LoaderProps {
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    color?: 'blue' | 'green' | 'red' | 'purple' | 'orange' | 'gray' | 'white';
    text?: string;
    fullScreen?: boolean;
    className?: string;
}

// Types pour les configurations de style
type SizeConfig = Record<LoaderProps['size'] & string, string>;
type ColorConfig = Record<LoaderProps['color'] & string, string>;

const Loader: React.FC<LoaderProps> = ({
                                           size = "medium",
                                           color = "blue",
                                           text = "",
                                           fullScreen = false,
                                           className = ""
                                       }) => {
    // Tailles disponibles avec types stricts
    const sizes: SizeConfig = {
        small: "w-4 h-4",
        medium: "w-8 h-8",
        large: "w-12 h-12",
        xlarge: "w-16 h-16"
    };

    // Couleurs disponibles avec types stricts
    const colors: ColorConfig = {
        blue: "border-blue-500",
        green: "border-green-500",
        red: "border-red-500",
        purple: "border-purple-500",
        orange: "border-orange-500",
        gray: "border-gray-500",
        white: "border-white"
    };

    const spinnerClasses: string = `
    ${sizes[size]} 
    border-4 
    ${colors[color]} 
    border-t-transparent 
    rounded-full 
    animate-spin
    ${className}
  `.trim();

    const containerClasses: string = fullScreen
        ? "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        : "flex items-center justify-center p-4";

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center space-y-3">
                <div className={spinnerClasses}></div>
                {text && (
                    <p className={`text-sm font-medium ${fullScreen ? 'text-white' : 'text-gray-600'}`}>
                        {text}
                    </p>
                )}
            </div>
        </div>
    );
};
export default Loader