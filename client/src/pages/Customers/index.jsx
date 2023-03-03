import { useCustomers } from '../../react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser, CustomerForm } from '../../components';
import { Table } from '../../layouts';
import './style.scss';

export const Customers = () => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const { user } = useUser();
    const { data: customers } = useCustomers();
    const navigate = useNavigate();

    if (!user) navigate('/auth');

    const tableHeaders = ['Business Name', 'Address', 'Contact', 'Phone #'];

    return (
        <main>
            <h1>Customers Page</h1>
            {!selectedCustomer && customers &&
                <Table
                    headers={tableHeaders}
                    rows={customers}
                    type={'customer'}
                />
            }

            {selectedCustomer && <CustomerForm
                customer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
            />}
        </main>

    )
}