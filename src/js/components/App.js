import { Component, DOM, createFactory } from 'react';
import AppBarComponent from 'material-ui/lib/app-bar';
import AutoCompleteComponent from 'material-ui/lib/auto-complete';
import TableComponent from 'material-ui/lib/table/table';
import TableHeaderColumnComponent from 'material-ui/lib/table/table-header-column';
import TableRowComponent from 'material-ui/lib/table/table-row';
import TableHeaderComponent from 'material-ui/lib/table/table-header';
import TableRowColumnComponent from 'material-ui/lib/table/table-row-column';
import TableBodyComponent from 'material-ui/lib/table/table-body';
import RaisedButtonComponent from 'material-ui/lib/raised-button';
import stations from '../data/stations';

const [
    AppBar,
    AutoComplete,
    Table,
    TableHeaderColumn,
    TableRow,
    TableHeader,
    TableRowColumn,
    TableBody,
    RaisedButton
] = [
    AppBarComponent,
    AutoCompleteComponent,
    TableComponent,
    TableHeaderColumnComponent,
    TableRowComponent,
    TableHeaderComponent,
    TableRowColumnComponent,
    TableBodyComponent,
    RaisedButtonComponent
].map(createFactory);

const stationNames = Array.from(stations.keys());

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            from: '',
            to: ''
        };
    }
    render() {
        return (
            DOM.div({ className: 'App' }, [
                AppBar({
                    title: 'Public Transportation App',
                    showMenuIconButton: false
                }),
                DOM.div({ className: 'App-body' }, [
                    DOM.form({ className: 'App-body-aside' }, [
                        AutoComplete({
                            floatingLabelText: 'From',
                            dataSource: stationNames,
                            filter: AutoCompleteComponent.caseInsensitiveFilter,
                            onUpdateInput: v => this.updateDirection('from', v),
                            onNewRequest: v => this.updateDirection('from', v)
                        }),
                        AutoComplete({
                            floatingLabelText: 'To',
                            dataSource: stationNames,
                            filter: AutoCompleteComponent.caseInsensitiveFilter,
                            onUpdateInput: v => this.updateDirection('to', v),
                            onNewRequest: v => this.updateDirection('to', v)
                        }),
                        RaisedButton({
                            primary: true,
                            label: 'Search',
                            onMouseUp: () => this.submit()
                        })
                    ]),
                    DOM.div({ className: 'App-body-main' }, [
                        Table({ selectable: false }, [
                            TableBody(null, [
                                TableRow(null, [
                                    TableHeaderColumn(null, '#'),
                                    TableHeaderColumn(null, 'Departure'),
                                    TableHeaderColumn(null, 'Arrival')
                                ]),
                                TableRow(null, [
                                    TableRowColumn(null, '1'),
                                    TableRowColumn(null, 'Kyiv'),
                                    TableRowColumn(null, 'Dnipro')
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        );
    }
    updateDirection(direction, value) {
        const stationCode = stations.get(value);
        this.setState({ [direction]: stationCode });
    }
    submit() {
        const { from, to } = this.state;

        console.debug(from, to);
    }
}
