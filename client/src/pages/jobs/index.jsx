import { useNavigate } from 'react-router-dom';
import { useUser, withFilter } from '../../components';
import { useJobs } from './hooks/useJobs';
import { Searchbar, Dropdown } from '../../features';
import { Table, Form } from '../../layouts';
import './style.scss';

const Jobs = ({ filter, setFilter }) => {
    const { user } = useUser();
    const { jobs } = useJobs();
    const navigate = useNavigate();

    // CHECK AUTHORIZATION
    if (!user) navigate('/auth');

    // APPLY FILTER TO DATA RESULTS
    const applyFilter = (jobs) => {
        return jobs.filter((j) => (
            j?.customer?.businessName.toLowerCase().includes(filter.toLowerCase()) ||
            j?.customer?.address?.city.toLowerCase().includes(filter.toLowerCase()) ||
            (j?.serviceDate !== null && j?.serviceDate.includes(filter)) ||
            (j?.invoiceNumber !== null && j?.invoiceNumber.includes(filter)) ||
            j?.status.includes(filter)
        ))
    }

    // EVENT HANDLERS
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        console.log(formData);
    }

    return (
        <main>
            <h1>Service Jobs Page</h1>
            {(typeof filter !== 'object' && jobs) ?
                (
                    <section>
                        <div className={'search-div'}>
                            <Searchbar
                                setFilter={setFilter}
                                placeholder={'Search by name, city, date, or invoice'}
                            />
                            <Dropdown setFilter={setFilter} />
                        </div>
                        <Table
                            setFilter={setFilter}
                            headers={['Service Date', 'Business Name', 'City', 'Invoice #', 'Status']}
                            rows={applyFilter(jobs)}
                            type={'job'}
                        />
                        {jobs.length < 1 && <p className={'empty-list'}>** No jobs to display **</p>}
                    </section>
                ) : (
                    <section>
                        <Form
                            submit={handleSubmit}
                            job={filter}
                            customer={filter.customer}
                            setFilter={setFilter}
                        />
                    </section>
                )
            }
        </main>
    )
}

export default withFilter(Jobs);