import { useLocation } from 'react-router';
import { sortPendingToTop } from '../../utils';
import dayjs from 'dayjs';
import './style.scss';
import { sortByStockStatus } from '../../utils/sort';

export const Table = ({ setSelected, setShowForm, setSubmitType, headers, rows }) => {
    const { pathname } = useLocation();
    if (pathname === '/jobs') rows = sortPendingToTop(rows);
    if (pathname === '/inventory') rows = sortByStockStatus(rows);

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
                    className={`
                            tr-${pathname.slice(1)} 
                            clickable
                            ${r?.status === 'Pending' ? 'pending' : ''}
                            ${r?.stock <= r?.minimum ? 'low-stock' : ''}
                        `}
                    key={r._id}
                    onClick={() => {
                        setSelected({
                            job: pathname === '/jobs' ? r : null,
                            customer: pathname === '/customers' ? r : r?.customer,
                            part: pathname === '/inventory' ? r : null
                        });
                        setSubmitType('edit');
                        setShowForm(true);
                    }}
                >
                    {pathname === '/customers' && <CustomerDataRow customer={r}/>}
                    {pathname === '/jobs' && <JobDataRow job={r}/>}
                    {pathname === '/inventory' && <PartDataRow part={r}/>}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

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
    );
};

const JobDataRow = ({ job }) => {
    return (
        <>
            <td>{job?.serviceDate ? dayjs(job?.serviceDate).format('MMM D, YYYY') : '--'}</td>
            <td>{job?.customer?.businessName}</td>
            <td>{job?.customer?.address?.city}</td>
            <td>{job?.invoiceNumber ? job?.invoiceNumber : '--'}</td>
            <td>{job?.status}</td>
        </>
    );
};

const PartDataRow = ({ part }) => {
    return (
        <>
            <td>{part?.partNumber}</td>
            <td>{part?.description}</td>
            <td>{part?.stock}</td>
        </>
    );
};

// const PartDataRow = ({ setSelected, setShowForm, decreaseStock, increaseStock, part }) => {
//     return (
//         <>
//             <td>{part?.partNumber}</td>
//             <td>{part?.description}</td>
//             <td className={'stock-buttons'}>
//                 <div className={'quantity'} onClick={decreaseStock}>&#8722;</div>
//                 {part?.stock}
//                 <div className={'quantity'} onClick={increaseStock}>&#43;</div>
//             </td>
//             <td>
//                 <FontAwesomeIcon
//                     className={'edit'}
//                     onClick={() => {
//                         setSelected
//                     }}
//                     icon={faEdit}
//                 />
//             </td>
//         </>
//     )
// }