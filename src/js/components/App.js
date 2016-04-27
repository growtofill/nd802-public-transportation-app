import { Component, DOM, createFactory } from 'react';
import AppBarComponent from 'material-ui/lib/app-bar';
import AutoCompleteComponent from 'material-ui/lib/auto-complete';

const AppBar = createFactory(AppBarComponent);
const AutoComplete = createFactory(AutoCompleteComponent);

export default class App extends Component {
    render() {
        return (
            DOM.div(null, [
                AppBar({
                    title: 'Public Transportation App',
                    showMenuIconButton: false
                }),
                AutoComplete({
                    floatingLabelText: 'From',
                    dataSource: []
                }),
                AutoComplete({
                    floatingLabelText: 'To',
                    dataSource: []
                })
            ])
        );
    }
}
