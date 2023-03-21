import { useState } from 'react';
import { useCustomers } from './hooks/useCustomers';
import { useUser, withMutation } from '../../components';
import { Form, Table } from '../../layouts';
import { Searchbar } from '../../features';
import { formatCustomer } from '../../utils';
import './style.scss';

const Customers = ({ mutateCustomer, mutateJob }) => {
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState({ customer: null });
    const [submitType, setSubmitType] = useState('new');
    const { user } = useUser();
    const { customers } = useCustomers();

    // APPLY FILTER TO DATA RESULTS
    const applyFilter = (customers) => {
        return customers.filter((c) => (
            c?.businessName.toLowerCase().includes(search.toLowerCase()) ||
            c?.address?.city.toLowerCase().includes(search.toLowerCase()) ||
            c?.phone.includes(search)
        ))
    }

    // EVENT HANDLERS
    const submitHandler = async (e, formData) => {
        e.preventDefault();
        const customerId = e.target.dataset.customer;
        const customer = formatCustomer(formData);

        if (submitType === 'edit') {
            await mutateCustomer.edit.mutate({ id: customerId, data: customer });
        }
        if (submitType === 'new') {
            customer.company = user.company;
            await mutateCustomer.add.mutate(customer);
        }

        setSelected({ customer: null });
        setShowForm(false);
    }

    const deleteHandler = async (e) => {
        e.preventDefault();
        const customerId = e.target.dataset.id;
        const confirmation = window.confirm(
            "Are you sure you want to delete?" +
            "\nThis cannot be undone."
        );
        if (confirmation) {
            await mutateJob.clear.mutate(customerId);
            await mutateCustomer.remove.mutate(customerId);
            setSelected({ customer: null });
            setShowForm(false);
        }
    }

    return (
        <main>
            <div className={'action-btns'}>
                <button onClick={(e) => {
                    e.preventDefault();
                    setSubmitType('new');
                    setShowForm(true);
                }}>
                    Create New
                </button>
            </div>

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
                            setSubmitType={setSubmitType}
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
                            setShowForm={setShowForm}
                            customer={selected.customer}
                        />
                    </section>
                )
            }
        </main>
    )
}

export default withMutation(Customers);