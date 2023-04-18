import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

export const Dropdown = ({ setSearch }) => {
    const applyFilter = (e) => {
        const filter = e.target.value;
        if (filter !== 'Filter by status') {
            setSearch(filter);
        } else {
            setSearch('');
        }
    };

    return (
        <div className={'dropdown'}>
            <FontAwesomeIcon className={'faChevronDown'} icon={faChevronDown}/>
            <select onChange={applyFilter}>
                <option>Filter by status</option>
                <option>Pending</option>
                <option>Scheduled</option>
                <option>Completed</option>
                <option>Canceled</option>
            </select>
        </div>
    );
};