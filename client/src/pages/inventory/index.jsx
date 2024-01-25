import { useState } from 'react';
import { useUser, withMutation } from '../../components';
import { useParts } from './hooks/useParts';
import { Searchbar } from '../../features';
import { Form, Table } from '../../layouts';
import { formatPart } from '../../utils/format';

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
        const partId = e.target.dataset.part;
        const part = formatPart(formData);
        const companyId = user.company;

        if (submitType === 'edit') {
            await mutatePart.edit.mutate({ id: partId, data: part });
        } else {
            part.company = companyId;
            await mutatePart.add.mutate(part);
        }
        setSelected({ job: null, customer: null, part: null });
        setShowForm(false);
    };

    const deleteHandler = async (e) => {
        e.preventDefault();
        const partId = e.target.dataset.id;
        const confirmation = window.confirm(
            'Are you sure you want to delete?' +
            '\nThis cannot be undone.'
        );
        if (confirmation) {
            await mutatePart.remove.mutate(partId);
        }
        setSelected({ job: null, customer: null, part: null });
        setShowForm(false);
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