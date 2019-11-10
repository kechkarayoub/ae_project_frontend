import React from 'react';
import './FeedbackServer.css';

const FeedbackServer = ({showFeedback, feedback_success, feedback_messages, handleCloseFeedback}) => (
    
    <div className={showFeedback ? "feedback" : "feedback hidden"}>
    <button className="close_feedback" onClick={handleCloseFeedback}>X</button>
    <div className="content_">
        <div className="message" style={{color: feedback_success ? "#05b305" : "#d7362d"}}>
            {feedback_messages.map((message, idx) => (
                <p key={idx}>{message}</p>
            ))}
        </div>
        <div className="action">
            <button className="default-btn" onClick={handleCloseFeedback}>Ok</button>
        </div>
    </div>
</div>
)

export default FeedbackServer;