import { useNavigate } from 'react-router-dom';
import { useCustomers } from './hooks/useCustomers';
import { useUser, withFilter } from '../../components';
import { Table } from '../../layouts';
import { Searchbar } from '../../features';
import './style.scss';

const Customers = ({ filter, setFilter }) => {
    const { user } = useUser();
    const { data: customers } = useCustomers();
    const navigate = useNavigate();

    if (!user) navigate('/auth');

    const applyFilter = (customers) => {
        return customers.filter((c) => (
            c?.businessName.toLowerCase().includes(filter.toLowerCase()) ||
            c?.address?.city.toLowerCase().includes(filter.toLowerCase()) ||
            c?.phone.includes(filter)
        ))
    }

    return (
        <main>
            <h1>Customers Page</h1>
            {typeof filter !== 'object' && customers &&
                <section className={'table'}>
                    <Searchbar
                        setFilter={setFilter}
                        placeholder={'Search business name, city, or phone #'}
                    />
                    <Table
                        setFilter={setFilter}
                        headers={['Business Name', 'Address', 'Contact', 'Phone #']}
                        rows={applyFilter(customers)}
                        type={'customer'}
                    />
                    {customers.length < 1 && <p className={'empty-list'}>** No customers to display **</p>}
                </section>
            }

            {/*{selectedCustomer && <CustomerForm*/}
            {/*    customer={selectedCustomer}*/}
            {/*    setSelectedCustomer={setSelectedCustomer}*/}
            {/*/>}*/}
        </main>

    )
}

export default withFilter(Customers);