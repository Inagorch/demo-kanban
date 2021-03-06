import React from 'react';
import ReactDOM from 'react-dom';
import {Kanban, Toolbar} from './view.js'
import {Model} from './model.js'

const e = React.createElement;

class App extends React.Component {
    constructor(pars) {
        super(pars)
        this.model = new Model()
        this.state = this.model.getdata()
    }

    moveCard = (srcColumnId, srcIndex, destColumnId, destIndex) => {
        let srcColumn = this.model.getColumnById(srcColumnId);
        let card = srcColumn.cards[srcIndex];
        this.model.removeCardFromColumn(card.id);
        this.model.addCardToColumn(destColumnId, card, destIndex);
        this.setState(this.model.getdata())
    }

    createColumn = (name) => {
        this.model.createColumn(name);
        this.setState(this.model.getdata())
    }

    createCard = (name, column) => {
        this.model.createCard(name, column);
        this.setState(this.model.getdata())
    }

    removeCardFromColumn = (name) => {
        this.model.removeCardFromColumn(name);
        this.setState(this.model.getdata())
    }

    removeColumn = (columnId) => {
        this.model.removeColumn(columnId)
        this.setState(this.model.getdata())
    }

    render() {
        return [
            e(Toolbar, {key: 'toolbar', name:"Randomize", action: ()=>{
                    this.model.randomize()
                    this.setState(this.model.getdata())
                }}),
            e(Kanban, {key: 'kanban', state: this.state, moveCard: this.moveCard,
                createColumn: this.createColumn,
                createCard: this.createCard, removeCardFromColumn: this.removeCardFromColumn,
                removeColumn: this.removeColumn})
        ]
    }
}

const domContainer = document.querySelector('.kanban');
ReactDOM.render(e(App), domContainer);