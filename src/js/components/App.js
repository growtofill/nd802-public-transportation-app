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
import CircularProgressComponent from 'material-ui/lib/circular-progress';

const [
    AppBar,
    AutoComplete,
    Table,
    TableHeaderColumn,
    TableRow,
    TableHeader,
    TableRowColumn,
    TableBody,
    RaisedButton,
    CircularProgress
] = [
    AppBarComponent,
    AutoCompleteComponent,
    TableComponent,
    TableHeaderColumnComponent,
    TableRowComponent,
    TableHeaderComponent,
    TableRowColumnComponent,
    TableBodyComponent,
    RaisedButtonComponent,
    CircularProgressComponent
].map(createFactory);

function filter(searchText, key) {
    return key.toLowerCase().startsWith(searchText.toLowerCase());
}

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trains: []
        };
    }
    render() {
        const { trains, isRequestInProgress } = this.state;
        const { stations } = this.props;
        const stationNames = Array.from(stations.keys());

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
                            filter,
                            onUpdateInput: v => this.updateDirection('orig', v),
                            onNewRequest: v => this.updateDirection('orig', v)
                        }),
                        AutoComplete({
                            floatingLabelText: 'To',
                            dataSource: stationNames,
                            filter,
                            onUpdateInput: v => this.updateDirection('dest', v),
                            onNewRequest: v => this.updateDirection('dest', v)
                        }),
                        RaisedButton({
                            primary: true,
                            label: 'Search',
                            onMouseUp: () => this.submit()
                        })
                    ]),
                    DOM.div({ className: 'App-body-main' }, [
                            isRequestInProgress
                                ? CircularProgress({ style: { margin: 'auto' } })
                                : trains.length ? (
                                    Table(null, [
                                        TableBody({ displayRowCheckbox: false }, [
                                            TableRow(null, [
                                                TableHeaderColumn(null, 'Train #'),
                                                TableHeaderColumn(null, 'Departure'),
                                                TableHeaderColumn(null, 'Arrival')
                                            ]),
                                            ...trains.map(train =>
                                                TableRow(null, [
                                                    TableRowColumn(null, train.route.join(' → ')),
                                                    TableRowColumn(null, train.departureTime),
                                                    TableRowColumn(null, train.arrivalTime)
                                                ])
                                            )
                                        ])
                                    ])
                                ) : null
                    ])
                ])
            ])
        );
    }
    updateDirection(direction, value) {
        const { stations } = this.props;
        const stationCode = stations.get(value);
        this.setState({ [direction]: stationCode });
    }
    submit() {
        const { depart } = this.props.api;
        const { orig, dest } = this.state;

        const storageKey = `${orig}-${dest}`;
        const storedTrains = localStorage.getItem(storageKey);
        const nextState = storedTrains
            ? { trains: JSON.parse(storedTrains) }
            : { isRequestInProgress: true };

        this.setState(nextState);

        depart({ orig, dest })
            .then(trains => {
                localStorage.setItem(storageKey, JSON.stringify(trains));
                this.setState({trains, isRequestInProgress: false});
            })
            .catch(error => console.error(error));

    }
}
