import { useEffect, useRef, useState } from 'react';

const createGUID = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

const useGuid = () => {
    const [guid] = useState(createGUID());
    return guid;
};

const useTSIChartComponentRender = (component, params: any[]) => {
    const chartContainerGUID = useGuid();
    const chart = useRef(null);

    useEffect(() => {
        if (chart.current === null) {
            chart.current = new component(
                document.getElementById(chartContainerGUID)
            );
        }
        //@ts-ignore
        chart.current.render(...params);
    }, [component, params]);

    return chartContainerGUID;
};

export default useTSIChartComponentRender;
