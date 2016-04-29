import { DOM } from 'react';
const { label, span, input, datalist, option, select } = DOM;

export default function ({ type = 'text', placeHolder, labelText, errorText, list = [] }) {
    const dataListId = Math.random().toString(36).substr(2);

    return (
        span(null, [
            label(null, [
                span(null, labelText),
                input(
                    { type, placeHolder, list: dataListId }
                ),
                span(null, errorText)
            ]),
            datalist(
                { id: dataListId },
                Array.from(list).map((key, value) =>
                    option({ value: key }, value)
                )
            )
        ])
    );
}
