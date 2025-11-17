import { useState } from "react";
export default function EventObejct() {
    const [event, setEvent] = useState(null);
    const handleCLick = (e: any) => {
        e.target = e.target.outerHTML;
        delete e.view;
        setEvent(e);
    };
    return (
        <div>
            <h2>Event Object</h2>
            <button onClick={(e) => handleCLick(e)} className="btn btn-primary" id="wd-display-event-obj-click">
                Display Event Object
            </button>
            <pre>{JSON.stringify(event, null, 2)}</pre>
            <hr />
        </div>
    );
}