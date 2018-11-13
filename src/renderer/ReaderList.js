import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ReaderIcon from '@material-ui/icons/FilterTiltShift'
import ErrorIcon from '@material-ui/icons/Error'

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