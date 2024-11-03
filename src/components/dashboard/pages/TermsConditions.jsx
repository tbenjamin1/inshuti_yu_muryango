import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAcceptTermsConditions, selectAcceptTerms } from '../../../redux/transactions/TransactionSlice';

function TermsConditions() {
    const dispatch = useDispatch();
    const acceptTermsState = useSelector(selectAcceptTerms);

    const [acceptTerms, setAcceptTerms] = useState(false);
    const HandletermsChange = () => {
        setAcceptTerms(!acceptTerms);
        dispatch(setAcceptTermsConditions(!acceptTermsState));
    }
    const handleAcceptBusinessTerms = () => {

    }

    return (
        <div className='flex justify-center items-center border terms-container' >
            <div className='flex flex-col justify-center w-1/2 bg-white p-3 rounded-lg terms-condition ' >
                <span className='terms-title' >Terms and Conditions</span>
                <span className='terms-sub-title py-3' >Your Agreement</span>
                <div className='terms-description' >
                    By proceeding with the registration process for Koipay's Entities Cashback Donation Program, entities acknowledge and agree to comply with the following terms and conditions:

                    Entities registering for the Cashback Donation Program must confirm their eligibility, falling within social groups categories such as churches, NGOs, clubs, and any other communal organizations. Providing accurate and up-to-date information during the registration process is paramount, with Koipay reserving the right to verify the legitimacy and eligibility of each registered entity.

                    Upon registration, entities are authorized to receive cashback donations from Koipay users who opt to direct their earned cash back towards supporting a cause. Entities commit to utilizing these funds for the stated purpose and in alignment with their missions. Transparency is expected, with entities providing regular updates on fund utilization and impact to supporters.
                    Entities must maintain an accurate and up-to-date profile, including details about their activities, goals, and contact information. This profile will be visible to Koipay users expressing interest in supporting the entity's cause.
                    Encouraged to engage with donors respectfully and promptly, entities commit to expressing gratitude and providing relevant information about their initiatives. This open communication fosters a sense of connection between supporters and entities.
                    Entities are expected to adhere to Koipay's community guidelines, policies, and all applicable laws and regulations. Respecting donor privacy and adhering to Koipay's privacy policy are integral to the program.
                    Entities must furnish accurate and valid account details to receive funds from Koipay users. Financial transparency is paramount, requiring entities to maintain accurate records of funds received and disbursed.
                    In the event of disputes between entities and donors, Koipay reserves the right to mediate and facilitate a resolution aligning with the principles of fairness and transparency.
                    Koipay retains the right to terminate the registration of entities found in violation of these terms and conditions. Such actions will be taken judiciously to uphold the integrity of the program.
                    To accommodate evolving needs and circumstances, Koipay may update these terms and conditions, with entities promptly informed of any changes.
                    By proceeding with the registration process, entities affirm their understanding and commitment to these terms and conditions. Koipay reserves the right to take necessary actions, including the termination of entity accounts, to address any violations.

                </div>
                <div className='flex justify-between items-center  pt-2 terms-footer' >
                    <div className='flex justify-start items-center'> <input className='checkbox border cursor-pointer' checked={acceptTermsState} value={acceptTerms} onChange={HandletermsChange} type="checkbox" />  <span className='mx-2 remeber_forgot' >I confirm that I have read and accept the terms and conditions and privacy</span>  </div>
                    <div className='flex justify-between items-center terms-footer-btn' >
                        <button className='border mx-3 px-4 py-1 rounded-md terms-Cancel' > <Link to="/register-business">Cancel</Link></button>
                        <button disabled={!acceptTermsState} className={acceptTermsState == true ? ' px-4 py-1 rounded-md terms-accept ' : ' px-4 py-1 rounded-md terms-accept-disabled cursor-not-allowed'} onClick={() => handleAcceptBusinessTerms()} ><Link to="/register-business">Accept</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TermsConditions