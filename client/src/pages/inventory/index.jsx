import { useState } from 'react';
import { useUser, withMutation } from '../../components';
import { useParts } from './hooks/useParts';
import { Searchbar } from '../../features';
import { Form, Table } from '../../layouts';

const Inventory = ({ mutatePart }) => {
    const [ showForm, setShowForm ] = useState(false);
    const [ search, setSearch ] = useState('');
    const [ selected, setSelected ] = useState({ job: null, customer: null, part: null });
    const [ submitType, setSubmitType ] = useState('new');
    const { user } = useUser();
    const { parts } = useParts();

    // APPLY FILTER TO DATA RESULTS
    const applyFilter = (parts) => {
        return parts.filter((p) => (
            p?.partNumber.toLowerCase().includes(search.toLowerCase()) ||
            p?.description.toLowerCase().includes(search.toLowerCase())
        ));
    };

    // EVENT HANDLERS
    const submitHandler = async (e, formData) => {
        e.preventDefault();

    };

    const deleteHandler = async (e) => {
        e.preventDefault();

    };

    const increaseStock = async (e) => {
        e.preventDefault();
    };

    const decreaseStock = async (e) => {
        e.preventDefault();
    };

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
                            placeholder={'Search part # or description'}
                        />
                        <Table
                            setSelected={setSelected}
                            setShowForm={setShowForm}
                            setSubmitType={setSubmitType}
                            decreaseStock={decreaseStock}
                            increaseStock={increaseStock}
                            headers={[ 'Part #', 'Description', 'In Stock' ]}
                            rows={applyFilter(parts)}
                        />
                        {parts.length < 1 && <p className={'empty-list'}>** No parts to display **</p>}
                    </section>
                ) : (
                    <section>
                        <Form
                            setSelected={setSelected}
                            submitHandler={submitHandler}
                            deleteHandler={deleteHandler}
                            setShowForm={setShowForm}
                            part={selected?.part}
                        />
                    </section>
                )
            }
        </main>
    );
};

export default withMutation(Inventory);

// TODO: Add a checkbox that will filter parts to only show those that are low stock.