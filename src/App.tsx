import React, { useState } from 'react';
import './App.css';
// UMD import
import TsiClient from 'tsiclient';

// Direct imports
import LineChart from 'tsiclient/LineChart';
import AvailabilityChart from 'tsiclient/AvailabilityChart';
import PieChart from 'tsiclient/PieChart';
import ScatterPlot from 'tsiclient/ScatterPlot';
import GroupedBarChart from 'tsiclient/GroupedBarChart';
import Slider from 'tsiclient/Slider';
import Heatmap from 'tsiclient/Heatmap';
import EventsTable from 'tsiclient/EventsTable';
import DateTimePicker from 'tsiclient/DateTimePicker';
import SingleDateTimePicker from 'tsiclient/SingleDateTimePicker';
import DateTimeButtonSingle from 'tsiclient/DateTimeButtonSingle';
import DateTimeButtonRange from 'tsiclient/DateTimeButtonRange';
import ColorPicker from 'tsiclient/ColorPicker';

import 'tsiclient/tsiclient.css';
import useTSIChartComponentRender from './useTSIChartComponentRender';
import generateMockLineChartData, { defaultSearchSpan } from './mockData';

enum ImportType {
    direct,
    umd
}

function App() {
    const client = new TsiClient();
    const [importType, setImportType] = useState(ImportType.direct);

    // DateTimePicker
    const toMillis = 1567904097008; // 17:54 Pacific
    const fromMillis = toMillis - 1000 * 60 * 60 * 24 * 10;
    const dateTimePickerGuid = useTSIChartComponentRender(
        importType === ImportType.umd
            ? client.ux.DateTimePicker
            : DateTimePicker,
        [
            { theme: 'light', offset: 'Local' },
            0,
            toMillis,
            fromMillis,
            toMillis,
            () => null,
            () => null
        ]
    );

    // PieChart
    const pieChartGuid = useTSIChartComponentRender(
        importType === ImportType.umd ? client.ux.PieChart : PieChart,
        [generateMockLineChartData()]
    );

    // Scatterplot
    const scatterplotGuid = useTSIChartComponentRender(
        importType === ImportType.umd ? client.ux.ScatterPlot : ScatterPlot,
        [generateMockLineChartData(), { spMeasures: ['avg', 'temp'] }]
    );

    // Barchart
    const barchartGuid = useTSIChartComponentRender(
        importType === ImportType.umd ? client.ux.BarChart : GroupedBarChart,
        [generateMockLineChartData()]
    );

    // Linechart
    const linechartGuid = useTSIChartComponentRender(
        importType === ImportType.umd ? client.ux.LineChart : LineChart,
        [generateMockLineChartData(), {}]
    );

    // Availability chart
    const from = new Date();
    const availabilityChartGuid = useTSIChartComponentRender(
        importType === ImportType.umd
            ? client.ux.AvailabilityChart
            : AvailabilityChart,
        [
            [{ availabilityCount: { '': {} } }],
            {
                legend: 'hidden',
                theme: 'light',
                color: 'purple',
                brushMoveEndAction: () => null,
                offset: 'Local',
                isCompact: false
            },
            {
                range: {
                    from: from.toISOString(),
                    to: new Date(
                        from.valueOf() + 1000 * 60 * 60 * 60
                    ).toISOString()
                },
                intervalSize: '1h'
            }
        ]
    );

    // Slider
    const sliderGuid = useTSIChartComponentRender(
        importType === ImportType.umd ? client.ux.Slider : Slider,
        [
            [
                { label: 'a', action: () => null },
                { label: 'b', action: () => null }
            ],
            { theme: 'light', throttleSlider: true },
            300,
            '2m'
        ]
    );

    // Single DateTimePicker
    const singleDateTimePickerGuid = useTSIChartComponentRender(
        importType === ImportType.umd
            ? client.ux.SingleDateTimePicker
            : SingleDateTimePicker,
        [
            { theme: 'light', offset: 'Local' },
            0,
            toMillis,
            fromMillis,
            () => null,
            () => null
        ]
    );

    // Heatmap
    const heatmapData = generateMockLineChartData();
    const heatmapGuid = useTSIChartComponentRender(
        importType === ImportType.umd ? client.ux.Heatmap : Heatmap,
        [
            heatmapData,
            {},
            heatmapData.map((d) => {
                return {
                    measureTypes: ['avg', 'temp'],
                    searchSpan: {
                        from: defaultSearchSpan.from.toISOString(),
                        to: defaultSearchSpan.to.toISOString(),
                        bucketSize: defaultSearchSpan.bucketSize
                    }
                };
            })
        ]
    );

    // Events table
    const eventsTableGuid = useTSIChartComponentRender(
        importType === ImportType.umd ? client.ux.EventsTable : EventsTable,
        [generateMockLineChartData(), {}]
    );

    // DateTime Button Single
    const now = new Date().getMilliseconds();
    const dateTimeButtonSingleGuid = useTSIChartComponentRender(
        importType === ImportType.umd
            ? client.ux.DateTimeButtonSingle
            : DateTimeButtonSingle,
        [
            { offset: 'Local', theme: 'dark', dateLocale: 'es' },
            now - 1000 * 60 * 60 * 1000,
            now,
            now - 24 * 60 * 60 * 1000,
            () => {}
        ]
    );

    // Datetime button range
    const dateTimeButtonRangeGuid = useTSIChartComponentRender(
        importType === ImportType.umd
            ? client.ux.DateTimeButtonRange
            : DateTimeButtonRange,
        [
            { offset: 'Local', theme: 'light' },
            now - 1000 * 60 * 60 * 1000,
            now,
            now - 24 * 60 * 60 * 1000,
            now - 1 * 60 * 60 * 1000,
            () => {},
            () => {}
        ]
    );

    // Color picker
    const colorPickerGuid = useTSIChartComponentRender(
        importType === ImportType.umd ? client.ux.ColorPicker : ColorPicker,
        []
    );

    return (
        <div className="App">
            <h1>Choose import type</h1>
            <button
                onClick={() =>
                    setImportType((prevImportType) =>
                        prevImportType === ImportType.umd
                            ? ImportType.direct
                            : ImportType.umd
                    )
                }
            >
                Change import type
            </button>
            <h3>
                Current type:{' '}
                {importType === ImportType.umd ? 'UMD' : 'Direct imports'}
            </h3>
            <h1>Date time picker</h1>
            <div id={dateTimePickerGuid} style={{ position: 'relative' }}></div>

            <h1>Piechart</h1>
            <div id={pieChartGuid}></div>

            <h1>Scatterplot</h1>
            <div id={scatterplotGuid}></div>

            <h1>Barchart</h1>
            <div id={barchartGuid}></div>

            <h1>Linechart</h1>
            <div id={linechartGuid}></div>

            <h1>Availability chart</h1>
            <div id={availabilityChartGuid}></div>

            <h1>Slider</h1>
            <div id={sliderGuid}></div>

            <h1>Single date time picker</h1>
            <div id={singleDateTimePickerGuid}></div>

            <h1>Heatmap</h1>
            <div id={heatmapGuid}></div>

            <h1>Events table</h1>
            <div id={eventsTableGuid}></div>

            <h1>Date time button single</h1>
            <div
                id={dateTimeButtonSingleGuid}
                style={{ position: 'relative' }}
            ></div>

            <h1>Date time button range</h1>
            <div
                id={dateTimeButtonRangeGuid}
                style={{ position: 'relative' }}
            ></div>

            <h1>Color picker</h1>
            <div id={colorPickerGuid}></div>
        </div>
    );
}

export default App;
