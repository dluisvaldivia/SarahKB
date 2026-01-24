import React, { useState } from 'react';

export default function Pricing() {
    const [date, setDate] = useState(new Date())

    const oneYearFromNow = new Date(date);
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    const validUntilDate = oneYearFromNow.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="container my-4">

            <div className="row justify-content-center">
                <div className="col-10 col-md-8 my-3 ">
                    <h1>Pricing</h1>
                </div>

                <div className="row justify-content-center">
                    <div>
                        <h3 className="fw-light">How does it work?</h3>
                    </div>
                </div>

                <div className='row justify-content-center'>
                    <div className="col-lg-8 col-md-10 ms-5 px-5 text-start">
                        <div><h4>· Purchase a single session or a pack.</h4></div>
                        <div><h4>· schedule an appointment with me!</h4></div>
                        <div><h4>· use it whenever! it expires 1 year from the purchase date.</h4></div>
                    </div>
                </div>

            </div>

            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="p-3 m-1 rounded-3" id="card1">
                        <h2>1 session</h2>
                        <p className="mb-2">€95 (Standard price)</p>
                        <p>valid until: {validUntilDate}</p>
                        <stripe-buy-button
                            buy-button-id="buy_btn_1Qk68rJJ348INgpDYdwNztnp"
                            publishable-key="pk_live_51QhtYjJJ348INgpDxRtCPvgZMsdMYh3nPtGdCaqZxeKC1895w0GCIlk4vobLLC2UeCwQqXqx5si9qRf3F6Dw8cwD00YJ28S2nw"                      >
                        </stripe-buy-button>
                    </div>
                </div>

                <div className='col-12 col-md-6'>
                    <div className="p-3 m-1 border rounded-3" id="card2">
                        <h2>4-session pack</h2>
                        <p className="mb-2">Soon to be available{/* €360 (€90 per session, 5% discount) */}</p>
                        <p>{/* valid until: {validUntilDate} */}‎</p>
                        <stripe-buy-button
                            buy-button-id="buy_btn_1QgUpCJ7yLUxkVnSG2aOLHJK"
                            publishable-key="pk_test_51QgUfiJ7yLUxkVnS9jvSW6eIWuwpGb8Afh04V8WZWKdSEuJ7y3mhojCon5jIDPmnUgTtHkwAR1nEIW1mhi601JUM00ykBBZDHy"
                        >
                        </stripe-buy-button>
                    </div>
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-12 col-md-6">
                    <div className="p-4 m-1 border rounded-3" id="card3">
                        <h2>8-session pack</h2>
                        <p className="mb-2">Soon to be available{/* €680 (€85 per session, 10% discount) */}</p>
                        <p>{/* valid until: {validUntilDate} */}‎</p>
                        <stripe-buy-button
                            buy-button-id="buy_btn_1QgUpCJ7yLUxkVnSG2aOLHJK"
                            publishable-key="pk_test_51QgUfiJ7yLUxkVnS9jvSW6eIWuwpGb8Afh04V8WZWKdSEuJ7y3mhojCon5jIDPmnUgTtHkwAR1nEIW1mhi601JUM00ykBBZDHy"
                        >
                        </stripe-buy-button>
                    </div>
                </div>


                <div className="col-12 col-md-6">
                    <div className="p-4 m-1 rounded-3" id="card4">
                        <h2>12-session pack</h2>
                        <p className="mb-2">Soon to be available{/* €960 (€80 per session, 15% discount) */}</p>
                        <p>{/* valid until: {validUntilDate} */}‎</p>
                        <stripe-buy-button
                            buy-button-id="buy_btn_1QgUpCJ7yLUxkVnSG2aOLHJK"
                            publishable-key="pk_test_51QgUfiJ7yLUxkVnS9jvSW6eIWuwpGb8Afh04V8WZWKdSEuJ7y3mhojCon5jIDPmnUgTtHkwAR1nEIW1mhi601JUM00ykBBZDHy"
                        >
                        </stripe-buy-button>
                    </div>
                </div>
            </div>
        </div>

    )
}