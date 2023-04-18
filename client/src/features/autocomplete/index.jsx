import { useState } from 'react';
import { useCustomers } from '../../pages/customers/hooks/useCustomers';
import './style.scss';

export const AutoComplete = ({ setSelected, setSubmitType }) => {
    const [ activeSuggestion, setActiveSuggestion ] = useState(0);
    const [ filteredSuggestions, setFilteredSuggestions ] = useState([]);
    const [ showSuggestions, setShowSuggestions ] = useState(false);
    const [ userInput, setUserInput ] = useState('');
    const { customers } = useCustomers();

    const onChange = (e) => {
        const suggestions = customers;
        const userInput = e.target.value;
        const filtered = suggestions.filter((suggestion) => (
            suggestion.businessName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        ));

        setActiveSuggestion(0);
        setFilteredSuggestions(filtered);
        setShowSuggestions(true);
        setUserInput(e.target.value);
    };

    const selectCustomer = (e, customer) => {
        e.preventDefault();
        setUserInput(customer.businessName);
        setActiveSuggestion(0);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setSelected({ customer });
        setSubmitType('add');
    };

    return (
        <>
            <input
                type="text"
                placeholder="Business Name"
                name={'businessName'}
                onChange={onChange}
                // onKeyDown={onKeyDown}
                value={userInput}
                required
            />
            {filteredSuggestions.length >= 1 && showSuggestions && userInput &&
                <SuggestionList
                    selectCustomer={selectCustomer}
                    suggestions={filteredSuggestions}
                    activeSuggestion={activeSuggestion}
                />
            }
        </>
    );
};

const SuggestionList = ({ selectCustomer, suggestions, activeSuggestion }) => {
    return (
        <ul className="suggestions">
            {suggestions.map((s, index) => {
                let className;

                if (index === activeSuggestion) {
                    className = 'suggestion-active';
                }

                return (
                    <li className={className}
                        key={s._id}
                        onClick={(e) => selectCustomer(e, s)}
                    >
                        {s.businessName} - {s.address.street1}, {s.address.city}
                    </li>
                );
            })}
        </ul>
    );
};