import { createElement } from 'react';
import { render } from 'react-dom';
import App from './components/App';
import stations from './data/stations';
import { depart } from './apis/bart';

document.addEventListener('DOMContentLoaded', () => {
    render(
        createElement(App, { stations, api: { depart } }),
        document.getElementById('root')
    );
});

