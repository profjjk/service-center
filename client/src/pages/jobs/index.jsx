import { useState } from 'react';
import { useUser, withMutation } from '../../components';
import { useJobs } from './hooks/useJobs';
import { Dropdown, Searchbar } from '../../features';
import { Form, Table } from '../../layouts';
import { formatCustomer, formatJob } from '../../utils';
import './style.scss';
import { useQueryClient } from 'react-query';

const Jobs = ({ mutateJob, mutateCustomer }) => {
    const qc = useQueryClient();
    const [ search, setSearch ] = useState('');
    const [ selected, setSelected ] = useState({
        job: qc.getQueryData('selectedJob'),
        customer: qc.getQueryData('selectedCustomer'),
        part: null
    });
    const [ submitType, setSubmitType ] = useState(qc.getQueryData('submissionType') || '');
    const [ showForm, setShowForm ] = useState(selected.job);
    const { user } = useUser();
    const { jobs } = useJobs();

    // APPLY FILTER TO DATA RESULTS
    const applyFilter = (jobs) => {
        return jobs.filter((j) => (
            j?.customer?.businessName.toLowerCase().includes(search.toLowerCase()) ||
            j?.customer?.address?.city.toLowerCase().includes(search.toLowerCase()) ||
            (j?.serviceDate !== null && j?.serviceDate.includes(search)) ||
            (j?.invoiceNumber !== null && j?.invoiceNumber.includes(search)) ||
            j?.status.includes(search)
        ));
    };

    // EVENT HANDLERS
    const submitHandler = async (e, formData) => {
        e.preventDefault();
        const jobId = e.target.dataset.job;
        const customerId = e.target.dataset.customer;
        const job = formatJob(formData);
        const customer = formatCustomer(formData);

        if (submitType === 'add') {
            await mutateCustomer.edit.mutate({ id: customerId, data: customer });
            job.company = user.company;
            job.customer = customerId;
            await mutateJob.add.mutate(job);
        }
        if (submitType === 'edit') {
            await mutateCustomer.edit.mutate({ id: customerId, data: customer });
            job.customer = customerId;
            await mutateJob.edit.mutate({ id: jobId, data: job });
        }
        if (submitType === 'new') {
            customer.company = user.company;
            const newCustomer = await mutateCustomer.add.mutate(customer);
            job.company = user.company;
            job.customer = newCustomer._id;
            await mutateJob.add.mutate(job);
        }

        setSelected({ job: null, customer: null, part: null });
        setShowForm(false);
    };

    const deleteHandler = async (e) => {
        e.preventDefault();
        const jobId = e.target.dataset.id;
        const confirmation = window.confirm(
            'Are you sure you want to delete?' +
            '\nThis cannot be undone.'
        );
        if (confirmation) {
            await mutateJob.remove.mutate(jobId);
            setSelected({ job: null, customer: null, part: null });
            setShowForm(false);
        }
    };

    return (
        <main>
            <div className={'action-btns'}>
                <button onClick={(e) => {
                    e.preventDefault();
                    setSubmitType('new');
                    setShowForm(true);
                }}>
                    Create New
                </button>
            </div>

            {(!showForm) ?
                (
                    <section>
                        <div className={'search-div'}>
                            <Searchbar
                                setSearch={setSearch}
                                placeholder={'Search by name, city, date, or invoice'}
                            />
                            <Dropdown setSearch={setSearch}/>
                        </div>
                        <Table
                            setSelected={setSelected}
                            setShowForm={setShowForm}
                            setSubmitType={setSubmitType}
                            headers={[ 'Service Date', 'Business Name', 'City', 'Invoice #', 'Status' ]}
                            rows={applyFilter(jobs)}
                        />
                        {jobs.length < 1 && <p className={'empty-list'}>** No jobs to display **</p>}
                    </section>
                ) : (
                    <section>
                        <Form
                            submitHandler={submitHandler}
                            deleteHandler={deleteHandler}
                            setShowForm={setShowForm}
                            setSelected={setSelected}
                            setSubmitType={setSubmitType}
                            job={selected?.job}
                            customer={selected?.customer}
                        />
                    </section>
                )
            }
        </main>
    );
};

export default withMutation(Jobs);