import { useUser, useCustomers } from '../../react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CustomerTable, CustomerForm } from '../../components';
import { Routes, Route } from 'react-router-dom';
import './style.scss';

export const Customers = () => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const { user } = useUser();
    const { data: customers } = useCustomers();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(selectedCustomer)
        // if (!user) navigate("/auth")
    }, [user, selectedCustomer]);

    return (
        <main>
            <h1>Customers Page</h1>
            {!selectedCustomer && <CustomerTable
                customers={customers ? customers : []}
                setSelectedCustomer={setSelectedCustomer}
            />}

            {selectedCustomer && <CustomerForm
                customer={selectedCustomer}
                setSelectedCustomer={setSelectedCustomer}
            />}
        </main>

    )
}