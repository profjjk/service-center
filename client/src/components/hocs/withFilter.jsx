import { useState } from 'react';

export const withSearch = (Component) => (props) => {
    const [search, setSearch] = useState('');

    return (
        <Component
            {...props}
            search={search}
            setSearch={setSearch}
        />
    )
}