import ReactDOM from 'react-dom';
import React from 'react';
import { NFC } from 'nfc-pcsc';
import fetch from 'node-fetch';

import ReaderList from './ReaderList';
import CardList from './CardList';

import './index.scss';

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            readers: [],
            cards: {},
            cardIds: [],
            url: 'http://localhost:8000'
        }
        this.onInputChange = this.onInputChange.bind(this);
    }

    componentWillMount() {
        const nfc = new NFC();
        nfc.on('reader', (reader) => {
            this.handleReaderOn(reader);
            reader.on('card', (card) => {
                this.handleCardOn(reader, card);
            });
            reader.on('card.off', (card) => {
                this.handleCardOff(card);
            })
            reader.on('end', () => {
                this.handleReaderOff(reader);
            })
        })
    }

    handleReaderOn(reader) {
        if(!this.state.readers.includes(reader.reader.name)) {
            this.setState({
                readers: [...this.state.readers, reader.reader.name]
            })
        }
    }

    handleReaderOff(reader) {
        this.setState({
            readers: this.state.readers.filter(r => r !== reader.reader.name)
        })
    }

    async handleCardOn(reader, card) {
        let cardData = { id: card.uid };
        try {
            // Attempt to extract text from the card
            const data = await reader.read(7, 100);
            const text = data.toString('utf8').replace(/\uFFFD/g, '').substr(2);
            cardData.data = text;
        } catch(e) {}
        if(!this.state.cardIds.includes(cardData.id)) {
            this.setState({
                cardIds: [...this.state.cardIds, cardData.id],
                cards: {
                    ...this.state.cards,
                    [cardData.id]: cardData
                }
            });
            const url = `${this.state.url}/intuiface/sendMessage?message=removed&parameter1=${cardData.id}&parameter2=${cardData.data}`;
            fetch(url);
        }
    }

    handleCardOff(card) {
        let cards = {};
        Object.keys(this.state.cards).forEach(id => {
            if(id !== card.uid) {
                cards[id] = this.state.cards[id];
            }
        })
        this.setState({
            cardIds: this.state.cardIds.filter(id => id !== card.uid),
            cards
        })
    }

    onInputChange(e) {
        this.setState({
            url: e.target.value
        });
    }

    render() {
        return (
            <div className="container">
                <div className="container__top">
                    <div className="section">
                        <h4>Connected readers</h4>
                        <ReaderList readers={this.state.readers} />
                    </div>
                    <div className="section">
                        <h4>Detected cards</h4>
                        <CardList ids={this.state.cardIds} data={this.state.cards} />
                    </div>
                </div>
                <div className="container__bottom">
                    <h4>Intuiface server</h4>
                    <input type="text" onChange={this.onInputChange} value={this.state.url} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));