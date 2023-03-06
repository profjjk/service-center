import { useNavigate } from 'react-router-dom';
import { useUser } from '../../components';
import { useJobs } from './hooks/useJobs';
import { withFilter } from '../../components';
import { Searchbar, Dropdown } from '../../features';
import { Table } from '../../layouts';

const Jobs = ({ filter, setFilter }) => {
    const { user } = useUser();
    const { jobs, createJob, editJob, deleteJob } = useJobs();
    const navigate = useNavigate();

    if (!user) navigate('/auth');

    const applyFilter = (jobs) => {
        return jobs.filter((j) => (
            j?.customer?.businessName.toLowerCase().includes(filter.toLowerCase()) ||
            j?.customer?.address?.city.toLowerCase().includes(filter.toLowerCase()) ||
            (j?.serviceDate !== null && j?.serviceDate.includes(filter)) ||
            (j?.invoiceNumber !== null && j?.invoiceNumber.includes(filter)) ||
            j?.status.includes(filter)
        ))
    }

    console.log(typeof filter)

    return (
        <main>
            <h1>Service Jobs Page</h1>
            {typeof filter !== 'object' && jobs &&
                <section>
                    <div>
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
            }

            {/*{selectedJob && <JobForm*/}
            {/*    customer={selectedJob}*/}
            {/*    setSelectedCustomer={setSelectedJob}*/}
            {/*/>}*/}
        </main>

    )
}

export default withFilter(Jobs);