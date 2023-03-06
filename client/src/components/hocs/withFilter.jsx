import { useState } from 'react';

export const withFilter = (Component) => (props) => {
    const [filter, setFilter] = useState('');

    return (
        <Component
            {...props}
            filter={filter}
            setFilter={setFilter}
        />
    )
}