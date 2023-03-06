import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const Dropdown = ({ setFilter }) => {

    const applyFilter = (e) => {
        const filter = e.target.value;
        if (filter !== 'Filter by status') {
            setFilter(filter);
        } else {
            setFilter('');
        }
    }

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
    )
}