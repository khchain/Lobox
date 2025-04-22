"use client"

import React from 'react';
import MultiSelect from "@/components/multiSelect/MultiSelect";

function HomePage() {
    const options = ['Education', 'Science', 'Art', 'Sport', 'Games'];

    return (
        <div>
            <MultiSelect defaultOptions={options}/>
        </div>
    );
}

export default HomePage;