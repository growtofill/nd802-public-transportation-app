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

export default class App extends Component {
    render() {
        return (
            DOM.div({ className: 'App' }, [
                AppBar({
                    title: 'Public Transportation App',
                    showMenuIconButton: false
                }),
                DOM.div({ className: 'App-body' }, [
                    DOM.div({ className: 'App-body-aside' }, [
                        AutoComplete({
                            floatingLabelText: 'From',
                            dataSource: []
                        }),
                        AutoComplete({
                            floatingLabelText: 'To',
                            dataSource: []
                        }),
                        RaisedButton({
                            primary: true,
                            label: 'Search'
                        })
                    ]),
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
        );
    }
}
