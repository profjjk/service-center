import { useState } from 'react';

export const CustomerForm = ({ customer, setSelectedCustomer }) => {
    const [isNew, setIsNew] = useState(!!customer);

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target));
        console.log(formData)
    }

    return (
        <section>
            <form id={'form-customer'} onSubmit={submitHandler}>
                <div className={'customer-area'}>
                    <div>
                        <label>
                            Contact Information
                            <input type={'text'} name={'businessName'} placeholder={'Business Name'} required
                                   defaultValue={customer ? customer.businessName : ''}/>
                            <input type={'text'} name={'contactName'} placeholder={'Contact Person'}
                                   defaultValue={customer ? customer.contactName : ''}/>
                            <input type={'text'} name={'phone'} placeholder={'Phone #'} required
                                   defaultValue={customer ? customer.phone : ''}/>
                        </label>
                    </div>

                    <div>
                        <label className={'address'}>
                            Address
                            <input type={'text'} name={'street1'} placeholder={'Street Address'} required
                                   defaultValue={customer ? customer.address.street1 : ''}/>
                            <input type={'text'} name={'street2'} placeholder={'Unit or Building #'}
                                   defaultValue={customer ? customer.address.street2 : ''}/>

                            <div>
                                <input type={'text'} name={'city'} placeholder={'City'} required
                                       defaultValue={customer ? customer.address.city : ''}/>
                                <input className={'text-center'} type={'text'} name={'state'} defaultValue={'CA'}
                                       required/>
                                <input type={'text'} name={'zipcode'} placeholder={'Zip Code'} required
                                       defaultValue={customer ? customer.address.zipcode : ''}/>
                            </div>
                        </label>
                    </div>
                </div>

                <div className={'notes-area'}>
                    <label>
                        Notes
                        <textarea name={'notes'} defaultValue={customer ? customer.notes : ''}/>
                    </label>
                </div>

                <div className={'button-area'}>
                    <button className={'btn-form'} type={'submit'}>
                        Save
                    </button>

                    <button className={'btn-form'} onClick={() => setSelectedCustomer(null)}>
                        Cancel
                    </button>

                    {customer && customer._id ?
                        <button className={'btn-form delete'} onClick={() => console.log("deleted")}>
                            Delete
                        </button> : null}
                </div>
            </form>
        </section>
    )
}