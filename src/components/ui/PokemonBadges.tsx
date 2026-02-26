import React from 'react';

export const TypeBadge: React.FC<{ type: string }> = ({ type }) => {
    return (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-gray-200 dark:bg-gray-700">
            {type}
        </span>
    );
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    return (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-100 text-red-700">
            {status}
        </span>
    );
};

export const PokemonBadges: React.FC<{ types: string[] }> = ({ types }) => {
    return (
        <div className="flex gap-1">
            {types.map(t => (
                <TypeBadge key={t} type={t} />
            ))}
        </div>
    );
};
