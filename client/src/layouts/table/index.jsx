import { useLocation } from 'react-router';
import { sortPendingToTop } from '../../utils';
import dayjs from 'dayjs';
import './style.scss';

export const Table = ({ setSelected, setShowForm, setSubmitType, headers, rows }) => {
    rows = sortPendingToTop(rows);
    const { pathname } = useLocation();

    return (
        <table>
            <thead>
                <tr className={`tr-${pathname.slice(1)}`}>
                    {headers.map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {rows.map((r) => (
                    <tr
                        className={`tr-${pathname.slice(1)} clickable ${r?.status === 'Pending' ? 'pending' : ''}`}
                        key={r._id}
                        onClick={() => {
                            setSelected({
                                job: pathname === '/jobs' ? r : null,
                                customer: pathname === '/customers' ? r : r?.customer,
                                part: pathname === '/inventory' ? r : null,
                            });
                            setSubmitType('edit');
                            setShowForm(true);
                        }}
                    >
                        {pathname === '/customers' && <CustomerDataRow customer={r} />}
                        {pathname === '/jobs' && <JobDataRow job={r} />}
                        {pathname === '/inventory' && <PartDataRow part={r} />}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const CustomerDataRow = ({ customer }) => {
    return (
        <>
            <td>{customer?.businessName}</td>
            <td>
                {customer?.address?.street1}
                {customer?.address?.street2 !== '' ? ', ' + customer?.address?.street2 + ', ' : ', '}
                {customer?.address?.city}, {customer?.address?.state} {customer?.address?.zipcode}
            </td>
            <td>{customer?.contactName ? customer?.contactName : '--'}</td>
            <td>{customer?.phone}</td>
        </>
    )
}

const JobDataRow = ({ job }) => {
    return (
        <>
            <td>{job?.serviceDate ? dayjs(job?.serviceDate).format('MMM D, YYYY') : '--'}</td>
            <td>{job?.customer?.businessName}</td>
            <td>{job?.customer?.address?.city}</td>
            <td>{job?.invoiceNumber ? job?.invoiceNumber : '--'}</td>
            <td>{job?.status}</td>
        </>
    )
}

const PartDataRow = ({ part }) => {
    console.log(part)
    return (
        <>
            <td>{part?.partNumber}</td>
            <td>{part?.description}</td>
            <td>{part?.stock}</td>
        </>
    )
}
