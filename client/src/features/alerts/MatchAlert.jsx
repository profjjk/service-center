import { useQueryClient } from 'react-query';
import './style.scss';

export const MatchAlert = ({ match, setIsMatch }) => {
    const qc = useQueryClient();
    return (
        <section>
            <div className={'use-existing-customer'}>
                <h4>The address matches an existing customer:</h4>

                <p className={'match'}>
                    <strong>{match.businessName}</strong><br/>
                    {match.address.street1} {match.address.street2 ? (', ' + match.address.street2) : <></>}<br/>
                    {match.address.city}, {match.address.state} {match.address.zipcode}
                </p>

                <div>
                    <p>Add this job to <strong>{match.businessName}</strong>?</p>
                    <button onClick={setIsMatch}>Yes</button>
                    <button onClick={() => qc.setQueryData('existingCustomer', null)}>No</button>
                </div>
            </div>
        </section>
    );
};