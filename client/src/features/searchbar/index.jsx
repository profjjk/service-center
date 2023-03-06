import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

export const Searchbar = ({ placeholder, setFilter }) => {
    const searchJobs = (e) => {
        e.preventDefault();
        setFilter(e.currentTarget.value);
    }

    return (
        <div className={"searchbar"}>
            <FontAwesomeIcon className={"faSearch"} icon={faSearch} />
            <input
                className={"search"}
                name={"search"}
                onChange={searchJobs}
                type={"search"}
                placeholder={placeholder}
            />
        </div>
    )
}