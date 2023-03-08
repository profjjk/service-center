import { useNavigate } from 'react-router-dom';
import { useCustomers } from './hooks/useCustomers';
import { useUser, withFilter } from '../../components';
import { Form, Table } from '../../layouts';
import { Searchbar } from '../../features';
import './style.scss';

const Customers = ({ filter, setFilter }) => {
    const { user } = useUser();
    const { data: customers } = useCustomers();
    const navigate = useNavigate();

    // CHECK AUTHORIZATION
    if (!user) navigate('/auth');

    // APPLY FILTER TO DATA RESULTS
    const applyFilter = (customers) => {
        return customers.filter((c) => (
            c?.businessName.toLowerCase().includes(filter.toLowerCase()) ||
            c?.address?.city.toLowerCase().includes(filter.toLowerCase()) ||
            c?.phone.includes(filter)
        ))
    }

    // EVENT HANDLERS
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        console.log(formData);
    }

    return (
        <main>
            <h1>Customers Page</h1>
            {(typeof filter !== 'object' && customers) ?
                (
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
                ) : (
                    <section>
                        <Form
                            submit={handleSubmit}
                            customer={filter}
                            setFilter={setFilter}
                        />
                    </section>
                )
            }
        </main>
    )
}

export default withFilter(Customers);