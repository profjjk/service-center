export const CustomerTable = ({ customers, setSelectedCustomer }) => {

    return (
        <section>
            <table>
                <thead>
                <tr className={'tr-customer'}>
                    <th>Business Name</th>
                    <th>Address</th>
                    <th className={'text-center'}>Contact</th>
                    <th className={'text-center'}>Phone #</th>
                </tr>
                </thead>

                <tbody>
                {customers.map((c) => (
                    <tr className={'table-item tr-customer clickable'} key={c._id} onClick={() => {
                        setSelectedCustomer(c);
                    }}>
                        <td>{c.businessName}</td>
                        <td>
                            {c.address.street1}
                            {c.address.street2 !== '' ? ', ' + c.address.street2 + ', ' : ', '}
                            {c.address.city}, {c.address.state} {c.address.zipcode}
                        </td>
                        <td className={'text-center'}>{c.contactName ? c.contactName : '--'}</td>
                        <td className={'text-center'}>{c.phone}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {customers.length < 1 ? <p className={'empty'}>** No customers to display **</p> : <></>}
        </section>
    )
}