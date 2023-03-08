import { useState } from 'react';
import { useCustomers } from './hooks/useCustomers';
import { useUser, withMutation } from '../../components';
import { Form, Table } from '../../layouts';
import { Searchbar } from '../../features';
import './style.scss';

const Customers = ({ mutateCustomer }) => {
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState({ job: null, customer: null });
    const { user } = useUser();
    const { data: customers } = useCustomers();

    // APPLY FILTER TO DATA RESULTS
    const applyFilter = (customers) => {
        return customers.filter((c) => (
            c?.businessName.toLowerCase().includes(search.toLowerCase()) ||
            c?.address?.city.toLowerCase().includes(search.toLowerCase()) ||
            c?.phone.includes(search)
        ))
    }

    // EVENT HANDLERS
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        console.log(formData);
    }

    const deleteHandler = async (e) => {

    }

    return (
        <main>
            <h1>Customers Page</h1>
            {(!showForm) ?
                (
                    <section className={'table'}>
                        <Searchbar
                            setSearch={setSearch}
                            placeholder={'Search business name, city, or phone #'}
                        />
                        <Table
                            setSelected={setSelected}
                            setShowForm={setShowForm}
                            headers={['Business Name', 'Address', 'Contact', 'Phone #']}
                            rows={applyFilter(customers)}
                        />
                        {customers.length < 1 && <p className={'empty-list'}>** No customers to display **</p>}
                    </section>
                ) : (
                    <section>
                        <Form
                            submitHandler={submitHandler}
                            deleteHandler={deleteHandler}
                            setSelected={setSelected}
                            customer={selected.customer}
                        />
                    </section>
                )
            }
        </main>
    )
}

export default withMutation(Customers);