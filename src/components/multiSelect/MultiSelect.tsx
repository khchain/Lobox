'use client';

import React, {useEffect, useRef, useState} from 'react';
import styles from './MultiSelect.module.scss';
import {MultiSelectProps} from './type';
import {Check, ChevronDown} from "lucide-react";

const MultiSelect: React.FC<MultiSelectProps> = ({defaultOptions}) => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<string[]>(defaultOptions);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleSelect = (item: string) => {
        if (selectedItems.includes(item)) {
            const newSelection = selectedItems.filter(i => i !== item);
            setSelectedItems(newSelection);
            return
        } else {
            const newSelection = [...selectedItems, item];
            setSelectedItems(newSelection);
        }
        setInputValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            const newItem = inputValue.trim();

            if (!options.includes(newItem)) {
                setOptions(prev => [...prev, newItem]);
            }

            if (!selectedItems.includes(newItem)) {
                setSelectedItems(prev => [...prev, newItem]);
            }

            setInputValue('');
        }
    };


    const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            setIsOpen(false)
            setInputValue("")
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className={styles.dropdownContainer} ref={containerRef}>
            <div
                className={`${styles.inputContainer} ${isOpen ? styles.inputFocused : ''}`}
                onClick={() => setIsOpen(true)}
            >
                <div className={styles.selectedText}>
                    {selectedItems.length ?
                        selectedItems.map((item, index) => (
                            <span key={index}>
                                {item}
                            </span>
                        ))
                        : <span className={styles.selectPlaceholder}>
                            Select options
                          </span>
                    }
                </div>
                <div className={styles.arrow}>
                    <ChevronDown size={14}/>
                </div>
            </div>

            {isOpen && (
                <div className={styles.dropdownList}>
                    <div className={styles.inputContainerInDropdown}>
                        <input
                            className={styles.input}
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type and press Enter"
                        />
                    </div>
                    <div className={styles.containerDropdownItems}>
                        {filteredOptions.map((option, index) => (
                            <div
                                key={option + index}
                                onClick={() => handleSelect(option)}
                                className={`${styles.option} ${selectedItems.includes(option) ? styles.selected : ''}`}
                            >
                                {option}
                                {selectedItems.includes(option) && (
                                    <span className={styles.checkmark}>
                                        <Check size={14}/>
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
