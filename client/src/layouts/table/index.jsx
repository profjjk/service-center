import dayjs from 'dayjs';
import './style.scss';

export const Table = ({ headers, rows, type }) => {
    return (
        <table>
            <thead>
                <tr className={`th-${type}`}>
                    {headers.map((header) => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>

            <tbody className={type}>
                {rows.map((row) => (
                    <tr className={`tr-${type} clickable`} key={row._id}>
                        {type === 'customer' && <CustomerDataRow customer={row} />}
                        {type === 'job' && <JobDataRow job={row} />}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const CustomerDataRow = ({ customer }) => {
    return (
        <>
            <td>{customer.businessName}</td>
            <td>
                {customer.address.street1}
                {customer.address.street2 !== '' ? ', ' + customer.address.street2 + ', ' : ', '}
                {customer.address.city}, {customer.address.state} {customer.address.zipcode}
            </td>
            <td>{customer.contactName ? customer.contactName : '--'}</td>
            <td>{customer.phone}</td>
        </>
    )
}

const JobDataRow = ({ job }) => {
    return (
        <>
            <td>{job.serviceDate ? dayjs(job.serviceDate).format('MMM D, YYYY') : '--'}</td>
            <td>{job.customer.businessName}</td>
            <td>{job.customer.address.city}</td>
            <td>{job.invoiceNumber ? job.invoiceNumber : '--'}</td>
            <td>{job.status}</td>
        </>
    )
}