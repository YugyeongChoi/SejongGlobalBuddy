import React, { useState, useEffect } from 'react';
import './FilterDropdown.css';

const FILTERS = [
    { label: 'All', value: 'All' },
    { label: '23th', value: '23th' },
    { label: '24th', value: '24th' },
    { label: 'OB', value: 'OB' },
    { label: 'International', value: 'International' },
];

const FilterDropdown = ({ selected, setSelected }) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (value) => {
        setSelected(value);
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = () => setOpen(false);
        if (open) document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [open]);

    return (
        <div className="filter-dropdown" onClick={(e) => e.stopPropagation()}>
            <button className="dropdown-toggle" onClick={() => setOpen(!open)}>
                {selected} <span className="arrow">▼</span>
            </button>
            {open && (
                <ul className="dropdown-menu">
                    {FILTERS.map(({ label, value }) => (
                        <li
                            key={value}
                            className={value === selected ? 'active' : ''}
                            onClick={() => handleSelect(value)}
                        >
                            {label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FilterDropdown;
