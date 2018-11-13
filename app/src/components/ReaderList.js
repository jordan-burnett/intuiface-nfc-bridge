import React from 'react';

function empty() {
    return (
        <div className="card card--empty">
            <div className="card__content">
                None detected
            </div>
        </div>
    )
}

function readerList(readers) {
    return readers.map(reader => (
        <div className="card" key={reader}>
            <div className="card__content">
                { reader }
            </div>
        </div>
    ));
}

export default (props) => {
    return (
        <React.Fragment>
            { props.readers.length ? readerList(props.readers) : empty() }
        </React.Fragment>
    )
}