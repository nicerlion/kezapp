import React from 'react';

const EntryDetail = props => {

    return props.entry && props.exp ?
        <div>
            <div className="mini-box-pay-container">
                <div className="mini-box-pay">
                    <div className="image-box-pay">
                        <img src="http://kezandu.com/wp-content/uploads/2018/11/boxing-small.jpg" />
                    </div>
                    <div className="mini-box-pay-content">
                        <h4 className="pay-title blue-color">You, a friend, and the<br />
                            MMA legend.<br />
                            Who will stand?
                        </h4>
                        <p className="number-pay light-blue">{ props.entry.entries }</p>
                        <h4 className="one-predet-text blue-color">entries</h4>
                        <p className="pay-text">You will receive <br />{ props.entry.entries } entries to win!</p>
                        <h4 className="pay-total blue-color">Total ${ props.entry.price }</h4>
                        <div className="pay-button">
                            <a href="#">SUBMIT PAYMENT!</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mini-box-pay-text">   
                <p>By continuing, you agree to our <a href="#">Term of Use</a><br />
                Our <a href="#">Privacy Policy</a>, and our <a href="#">Refund Policy</a></p>
            </div>
        </div> :
    null
}

export default EntryDetail;
