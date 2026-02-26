import React from 'react';

interface AutocompleteProps {
    value: string;
    options: string[];
    onChange: (val: string) => void;
    placeholder?: string;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({ value, options, onChange, placeholder }) => {
    return (
        <input 
            type="text" 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            placeholder={placeholder}
            className="w-full p-2 border rounded"
        />
    );
};
