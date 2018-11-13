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

function readerList(ids, data) {
    return ids.map(id => (
        <div className="card" key={id}>
            <div className="card__header">#{id}</div>
            <div className="card__content">
                { data[id].data ? data[id].data : 'Unable to read data' }
            </div>
        </div>
    ));
}

export default (props) => {
    return (
        <React.Fragment>
            { props.ids.length ? readerList(props.ids, props.data) : empty() }
        </React.Fragment>
    )
}