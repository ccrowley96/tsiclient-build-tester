import Utils from 'tsiclient/Utils';

class SearchSpan {
    public from: Date;
    public to: Date;
    public bucketSize: string;
    public bucketSizeMillis: number;

    constructor(from: Date, to: Date, bucketSize: string = null) {
        this.from = from;
        this.to = to;
        this.bucketSize = bucketSize;
        if (bucketSize) {
            this.bucketSizeMillis = Utils.parseTimeInput(bucketSize);
        }
    }
}

export const defaultSearchSpan = new SearchSpan(
    new Date(),
    new Date(new Date().valueOf() + 100000),
    '100ms'
);

const generateMockLineChartData = (
    searchSpan: SearchSpan = defaultSearchSpan,
    properties: string[] = ['foo', 'bar', 'baz']
) => {
    const data = [];
    const from = searchSpan.from;
    const to = searchSpan.to;
    const bucketSizeMillis =
        searchSpan.bucketSizeMillis ||
        Math.ceil((to.valueOf() - from.valueOf()) / 100);
    for (let i = 0; i < properties.length; i++) {
        const lines = {};
        data.push({ [properties[i]]: lines });
        for (let j = 0; j < 1; j++) {
            const values = {};
            lines[''] = values;
            for (let k = 0; k < 60; k++) {
                if (!(k % 2 && k % 3)) {
                    // if check is to create some sparseness in the data
                    const to = new Date(from.valueOf() + bucketSizeMillis * k);
                    const val = Math.random();
                    const temp = Math.random();
                    values[to.toISOString()] = { avg: val, temp };
                }
            }
        }
    }
    return data;
};

export default generateMockLineChartData;
