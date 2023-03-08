import { useLocation } from 'react-router';
import { AutoComplete } from '../../features';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faDollarSign, faHashtag } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

export const Form = ({ submitHandler, deleteHandler, setShowForm, setSelected, job, customer }) => {
    const { pathname } = useLocation();

    const validateForm = (e) => {
        const formData = Object.fromEntries(new FormData(e.target));
        if (
            formData.businessName === '' ||
            formData.phone === '' ||
            formData.street1 === '' ||
            formData.city === ''
        ) return;
        submitHandler(e, formData);
    }

    return (
        <form
            id={(job || pathname === '/jobs') ? 'job-form' : 'customer-form'}
            data-customer={customer && customer?._id}
            data-job={job && job?._id}
            onSubmit={validateForm}
        >
            {(job || pathname === '/jobs') && <JobData job={job} />}

            <CustomerData
                setSelected={setSelected}
                pathname={pathname}
                customer={customer}
            />

            {(job || pathname === '/jobs')  ? <JobNotes job={job} /> : <CustomerNotes customer={customer} />}

            <ButtonArea
                setShowForm={setShowForm}
                deleteHandler={deleteHandler}
                job={job}
                customer={customer}
            />
        </form>
    )
}

const JobData = ({ job }) => {
    return (
        <div className={'job-area'}>
            <label>
                Service Date
                <input type={'date'} name={'serviceDate'}
                       defaultValue={job ? job.serviceDate : ''}/>
            </label>

            <label>
                Status
                <div className={'dropdown'}>
                    <FontAwesomeIcon className={'faChevronDown'} icon={faChevronDown}/>

                    <select name={'status'}>
                        {job ? <option>{job.status}</option> : <></>}
                        {job && job.status === 'Pending' ? '' : <option>Pending</option>}
                        {job && job.status === 'Scheduled' ? '' : <option>Scheduled</option>}
                        {job && job.status === 'Completed' ? '' : <option>Completed</option>}
                        {job && job.status === 'Canceled' ? '' : <option>Canceled</option>}
                    </select>
                </div>
            </label>

            <label>
                Invoice
                <div className={'invoiceInput'}>
                    <FontAwesomeIcon className={'faHashtag'} icon={faHashtag}/>
                    <input type={'text'} name={'invoiceNumber'}
                           defaultValue={job ? job.invoiceNumber : ''}/>
                </div>

            </label>

            <label>
                Total Bill
                <div className={'dollarInput'}>
                    <FontAwesomeIcon className={"faDollarSign"} icon={faDollarSign}/>
                    <input type={"text"} name={"totalBill"}
                           defaultValue={job && job.totalBill }/>
                </div>
            </label>

            <label className={'text-center'}>
                Paid?
                <input className={'checkbox'} type={'checkbox'} name={'isPaid'}
                       defaultChecked={job && job.isPaid === true ? 'on' : undefined}/>
            </label>
        </div>
    )
}

const CustomerData = ({ setSelected, customer, pathname }) => {
    return (
        <div className={'customer-area'}>
            <div>
                <label>
                    Contact Information
                    {(!customer && pathname === '/jobs') ? (
                        <AutoComplete setSelected={setSelected} />
                    ) : (
                        <input type={'text'} name={'businessName'} placeholder={'Business Name'}
                               defaultValue={customer ? customer.businessName : ''} />
                    )}

                    <input type={'text'} name={'contactName'} placeholder={'Contact Person'}
                           defaultValue={customer ? customer.contactName : ''} />
                    <input type={'text'} name={'phone'} placeholder={'Phone #'}
                           defaultValue={customer ? customer.phone : ''} />
                </label>
            </div>

            <div>
                <label className={'address'}>
                    Address
                    <input type={'text'} name={'street1'} placeholder={'Street Address'} 
                           defaultValue={customer ? customer.address.street1 : ''} />
                    <input type={'text'} name={'street2'} placeholder={'Unit or Building #'}
                           defaultValue={customer ? customer.address.street2 : ''} />

                    <div>
                        <input type={'text'} name={'city'} placeholder={'City'} 
                               defaultValue={customer ? customer.address.city : ''}/>
                        <input className={'text-center'} type={'text'} name={'state'} defaultValue={'CA'} />
                        <input type={'text'} name={'zipcode'} placeholder={'Zip Code'} 
                               defaultValue={customer ? customer.address.zipcode : ''}/>
                    </div>
                </label>
            </div>
        </div>
    )
}

const JobNotes = ({ job }) => {
    return (
        <div className={'notes-area'}>
            <label>
                Description of Problem
                <textarea name={'issueNotes'} defaultValue={job ? job.issueNotes : ''} />
            </label>

            <label>
                Service Notes
                <textarea name={'serviceNotes'} defaultValue={job ? job.serviceNotes : ''} />
            </label>
        </div>
    )
}

const CustomerNotes = ({ customer }) => {
    return (
        <div className={'notes-area'}>
            <label>
                Notes
                <textarea name={'notes'} defaultValue={customer ? customer.notes : ''}/>
            </label>
        </div>
    )
}

const ButtonArea = ({ deleteHandler, setShowForm, job, customer }) => {
    return (
        <div className={'button-area'}>
            <button className={'btn-form'} type={'submit'}>
                Save
            </button>

            <button className={'btn-form'} onClick={() => setShowForm(false)}>
                Cancel
            </button>

            {(job || customer) &&
                (<button
                    className={'btn-form delete'}
                    data-id={job ? job._id : customer._id}
                    onClick={deleteHandler}
                >
                    Delete
                </button>)
            }
        </div>
    )
}