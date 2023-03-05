import { useCustomers } from './hooks/useCustomers';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUser, withSearch, CustomerForm } from '../../components';
import { Table } from '../../layouts';
import { Searchbar } from '../../features';
import './style.scss';

const Customers = ({ search, setSearch }) => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const { user } = useUser();
    const { data: customers } = useCustomers();
    const navigate = useNavigate();

    if (!user) navigate('/auth');

    const tableHeaders = ['Business Name', 'Address', 'Contact', 'Phone #'];

    const applySearchFilter = (customers) => {
        return customers.filter((c) => (
            c?.businessName.toLowerCase().includes(search.toLowerCase()) ||
            c?.address?.city.toLowerCase().includes(search.toLowerCase()) ||
            c?.phone.includes(search)
        ))
    }

    return (
        <main>
            <h1>Customers Page</h1>
            {!selectedCustomer && customers &&
                <section>
                    <Searchbar
                        placeholder={'Search business name, city, or phone #'}
                        setSearch={setSearch}
                    />
                    <Table
                        headers={tableHeaders}
                        rows={applySearchFilter(customers)}
                        type={'customer'}
                    />
                </section>
            }

            {selectedCustomer && <CustomerForm
                customer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
            />}
        </main>

    )
}

export default withSearch(Customers);