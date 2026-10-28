import { fileDownload, jsonDownload, rawPaging, getJson } from '../samples';

// Dataset downloads on the new addresses: one endpoint per product, file type in `format`.

const REPLACE = (date) => `Replace ${date} with a current Publication Date before running.`;

const CADENCE = {
  futures: "Publication Date. Electricity futures update daily by 9:00 AM ET, reflecting the prior business day's close.",
  gas: "Publication Date. Natural gas futures update daily by 9:00 AM ET, reflecting the prior business day's close.",
  monthly: 'Publication Date. Updated by the first business day of each month; the Publication Date is the last business day of the month just ended.',
  ptc: 'Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.',
};

const formatParam = {
  name: 'format', type: 'string', required: false,
  description: '<code>xlsx</code> (default), <code>csv</code> or <code>json</code>.',
};
const startPub = {
  name: 'start_publication_date', type: 'date', required: true,
  description: "The dataset's Publication Date (YYYY-MM-DD). With <code>end_publication_date</code>, the first date of the range.",
};
const endPub = {
  name: 'end_publication_date', type: 'date', required: false,
  description: 'Last Publication Date of a range (YYYY-MM-DD). <strong>Excel only</strong>: CSV and JSON return <code>400</code> when you send it.',
};
const deliveryWindow = [
  { name: 'start_date', type: 'date', required: false, description: 'Keep prices for delivery months from this date on (YYYY-MM-DD).' },
  { name: 'end_date', type: 'date', required: false, description: 'Keep prices for delivery months up to this date (YYYY-MM-DD).' },
];
const paging = [
  { name: 'raw', type: 'boolean', required: false, description: 'JSON only. <code>true</code> returns one page of rows inline, with paging fields, instead of the whole dataset as a file.' },
  { name: 'skip', type: 'integer', required: false, description: 'With <code>raw=true</code>: rows to skip before the page starts. Default 0.' },
  { name: 'limit', type: 'integer', required: false, description: 'With <code>raw=true</code>: rows per page, 1 to 1000. Default 100.' },
];
const controlArea = (values) => ({
  name: 'control_area', type: 'string', required: true,
  description: `Control area, in capitals: ${values.map((v) => `<code>${v}</code>`).join(', ')}.`,
});

const fileResponse = (prefix, iso) => `Excel, CSV and JSON come back as a file download with <code>Content-Disposition: attachment; filename="EPD_${prefix}_${iso}_MMDDYYYY.xlsx"</code>, using the file type's extension. A range names the file after its last Publication Date. A JSON file holds the object below. With <code>raw=true</code> the same object comes back inline, with <code>skip</code>, <code>limit</code>, <code>total</code>, <code>page</code> and <code>size</code> added.`;

const rowFields = [
  { name: 'publication_date', type: 'string', description: 'The Publication Date you asked for.' },
  { name: 'operating_date', type: 'string', description: 'Same value as <code>publication_date</code>. Kept for older clients; read <code>publication_date</code>.' },
  { name: 'data[]', type: 'array', description: 'One object per price.' },
  { name: 'data[].control_area', type: 'string', description: 'Control area.' },
  { name: 'data[].state, load_zone, capacity_zone, utility', type: 'string', description: 'Where the price applies. <code>ALL</code> means every value.' },
  { name: 'data[].block_type', type: 'string', description: 'Delivery block, for example <code>7x24</code> or <code>5x16</code>.' },
  { name: 'data[].cost_group, cost_component', type: 'string', description: 'What the price covers.' },
  { name: 'data[].uom', type: 'string', description: 'Unit of the price, for example <code>$/MWh</code>.' },
  { name: 'data[].price_date', type: 'string', description: 'Delivery month, <code>MM-DD-YYYY</code>.' },
  { name: 'data[].price', type: 'number', description: 'The price.' },
  { name: 'data[].contract', type: 'string', description: 'Contract code, or <code>null</code>.' },
];

const rowsBody = (pub, rows) => JSON.stringify({ publication_date: pub, operating_date: pub, data: rows }, null, 2)
  .replace(/\n  \]\n\}$/, ',\n    ...\n  ]\n}');

// Builds the single endpoint card shared by the futures, ancillary and REC/RPS products.
const rowsProduct = ({ path, title, intro, params, single, range, cadence, filePrefix, iso, fileParams, jsonFields, sampleRows }) => ({
  method: 'GET',
  url: path,
  title,
  description: intro,
  parameters: params,
  examples: fileDownload({
    path,
    params: [{ key: 'format', value: 'xlsx' }, ...fileParams, { key: 'start_publication_date', value: single }],
    filename: `EPD_${filePrefix}_${iso}_${single}.xlsx`,
    note: [cadence, REPLACE(single)],
  }),
  moreExamples: [
    {
      title: 'Example: a range of Publication Dates (Excel)',
      description: 'The workbook holds every Publication Date in the range.',
      examples: fileDownload({
        path,
        params: [{ key: 'format', value: 'xlsx' }, ...fileParams, { key: 'start_publication_date', value: range[0] }, { key: 'end_publication_date', value: range[1] }],
        filename: `EPD_${filePrefix}_${iso}_${range[0]}_to_${range[1]}.xlsx`,
        note: [cadence, REPLACE(`${range[0]} and ${range[1]}`).replace('a current Publication Date', 'current Publication Dates')],
      }),
    },
    {
      title: 'Example: JSON',
      examples: jsonDownload({
        path,
        params: [{ key: 'format', value: 'json' }, ...fileParams, { key: 'start_publication_date', value: single }],
        note: [cadence, REPLACE(single)],
        fields: jsonFields,
      }),
    },
    {
      title: 'Example: page through raw JSON',
      description: 'Use <code>raw=true</code> to read a large dataset in pages instead of one file.',
      examples: rawPaging({
        path,
        params: [...fileParams, { key: 'start_publication_date', value: single }],
        note: [cadence, REPLACE(single)],
      }),
    },
  ],
  response: { summary: fileResponse(filePrefix, iso), body: rowsBody(single, sampleRows) },
  responseFields: rowFields,
});

const PJM_ROW = { control_area: 'PJM', state: 'ALL', load_zone: 'NI HUB', block_type: '2x16', cost_group: 'Energy', cost_component: 'Energy', uom: '$/MWh', price_date: '08-01-2026', price: 45.446654467028296, capacity_zone: 'NI HUB', utility: 'ALL', contract: 'NIQ' };
const ERCOT_ANC_ROW = { control_area: 'ERCOT', state: 'TX', load_zone: 'ALL', block_type: '7x24', cost_group: 'Ancillaries', cost_component: 'RUC', uom: '$/MWh', price_date: '01-01-2001', price: 0.0, capacity_zone: 'ALL', utility: 'ALL', contract: null };
const ERCOT_REC_ROW = { control_area: 'ERCOT', state: 'TX', load_zone: 'ALL', block_type: '7X24', cost_group: 'RPS Total Cost', cost_component: 'Total Cost per MWh', uom: '$/MWh', price_date: '01-01-2025', price: 0.07893517650000001, capacity_zone: 'ALL', utility: 'ALL', contract: null };
const NG_ROW = { settlement_point: 'Algonquin', state: 'All', utility: 'All', cost_group: 'NG Futures', cost_component: 'NG Futures', uom: '$/MMBtu', price_date: '08-01-2026', price: 2.55 };

const energyFutures = {
  title: 'Energy Futures Data',
  description: 'Electricity futures prices by control area, load zone and block type. One address serves Excel, CSV and JSON.',
  endpoints: [
    rowsProduct({
      path: '/api/v1/electricity/futures/download',
      title: 'Download Electricity Futures',
      intro: 'Returns the futures curve for one control area on a Publication Date. Excel also accepts a range of Publication Dates.',
      params: [
        formatParam,
        controlArea(['ERCOT', 'ISONE', 'MISO', 'NYISO', 'PJM']),
        startPub,
        endPub,
        { name: 'block_types', type: 'string', required: false, description: 'Comma-separated block types, spelled exactly, for example <code>7x8,2x16,5x16</code>. Omit for every block.' },
        ...deliveryWindow,
        ...paging,
      ],
      single: '2026-08-24',
      range: ['2026-08-20', '2026-08-24'],
      cadence: CADENCE.futures,
      filePrefix: 'EnergyFutures',
      iso: 'PJM',
      fileParams: [{ key: 'control_area', value: 'PJM' }, { key: 'block_types', value: '7x8,2x16,5x16' }],
      jsonFields: ['load_zone', 'block_type', 'price_date', 'price'],
      sampleRows: [PJM_ROW],
    }),
  ],
};

const settlementPoints = {
  method: 'GET',
  url: '/api/v1/natural-gas/futures/settlement-points',
  title: 'List Settlement Points',
  description: 'Lists the settlement points in a Natural Gas Futures dataset. Use these values, exactly as returned, for <code>settlement_point</code>.',
  parameters: [
    { name: 'publication_date', type: 'date', required: false, description: 'Publication Date (YYYY-MM-DD). Omit it to get the points in the newest dataset.' },
  ],
  examples: getJson({
    path: '/api/v1/natural-gas/futures/settlement-points',
    params: [{ key: 'publication_date', value: '2026-08-24' }],
    note: [CADENCE.gas, REPLACE('2026-08-24')],
    printPy: 'for point in data["settlement_points"]:\n    print(point)',
    printJs: "data.settlement_points.forEach((point) => console.log(point));",
    printRb: "data['settlement_points'].each { |point| puts point }",
  }),
  response: {
    body: JSON.stringify({
      success: true,
      settlement_points: ['Algonquin', 'Chicago', 'Henry', 'Iroquois-Z2', 'Michcon', 'TCO', 'TETCO-ELA', 'TETCO-M3', 'TETCO-STX', 'TETCO-WLA', 'TGP-500L', 'TGP-800L', 'TGP-Z4 200L', 'Transco-Z5', 'Transco-Z5 South', 'Transco-Z6  (non NY)', 'Transco-Z6 (NY)'],
      publication_date: '2026-08-24',
      error: null,
      operating_date: '2026-08-24',
    }, null, 2),
  },
  responseFields: [
    { name: 'settlement_points', type: 'string[]', description: 'Settlement points, sorted. Some names contain spaces, including a double space in <code>Transco-Z6  (non NY)</code>. Send them unchanged.' },
    { name: 'publication_date', type: 'string', description: 'The dataset the list came from.' },
    { name: 'success', type: 'boolean', description: '<code>false</code> when the list could not be read. <code>error</code> then holds the reason.' },
  ],
};

const natgasFutures = {
  title: 'Natural Gas Energy Futures Data',
  description: 'Natural gas futures (forward curve) prices: monthly baseload gas prices for every settlement point, published as one dataset. One address serves Excel, CSV and JSON.<br/><br/><strong>Settlement points are case sensitive.</strong> Get the valid values from <code>GET /api/v1/natural-gas/futures/settlement-points</code>.',
  endpoints: [
    settlementPoints,
    {
      ...rowsProduct({
        path: '/api/v1/natural-gas/futures/download',
        title: 'Download Natural Gas Futures',
        intro: 'Returns the natural gas futures curve on a Publication Date. An Excel range returns one sheet per Publication Date, named <code>MM-DD-YYYY</code>.',
        params: [
          formatParam,
          startPub,
          endPub,
          { name: 'settlement_point', type: 'string', required: false, description: 'One settlement point, exactly as the settlement-points endpoint returns it. Case sensitive. Omit for every point.' },
          ...deliveryWindow,
          ...paging,
        ],
        single: '2026-08-24',
        range: ['2026-08-20', '2026-08-24'],
        cadence: CADENCE.gas,
        filePrefix: 'NaturalGasFutures',
        iso: 'ALL',
        fileParams: [{ key: 'settlement_point', value: 'Algonquin' }],
        jsonFields: ['settlement_point', 'price_date', 'price', 'uom'],
        sampleRows: [NG_ROW],
      }),
      responseFields: [
        { name: 'publication_date', type: 'string', description: 'The Publication Date you asked for.' },
        { name: 'operating_date', type: 'string', description: 'Same value as <code>publication_date</code>. Kept for older clients.' },
        { name: 'data[].settlement_point', type: 'string', description: 'Settlement point.' },
        { name: 'data[].cost_group, cost_component', type: 'string', description: '<code>NG Futures</code>.' },
        { name: 'data[].uom', type: 'string', description: '<code>$/MMBtu</code>.' },
        { name: 'data[].price_date', type: 'string', description: 'Delivery month, <code>MM-DD-YYYY</code>.' },
        { name: 'data[].price', type: 'number', description: 'The price.' },
      ],
    },
  ],
};

const ancillary = {
  title: 'Ancillary Uplift Data',
  description: 'Ancillary services and uplift costs by control area. One address serves Excel, CSV and JSON.<br/><br/><strong>NYISO</strong> also publishes weekly: its Publication Dates fall on Fridays.',
  endpoints: [
    rowsProduct({
      path: '/api/v1/electricity/ancillary-uplift/download',
      title: 'Download Ancillary Uplift',
      intro: 'Returns ancillary and uplift costs for one control area on a Publication Date. Excel also accepts a range of Publication Dates.',
      params: [formatParam, controlArea(['ERCOT', 'ISONE', 'NYISO', 'PJM']), startPub, endPub, ...deliveryWindow, ...paging],
      single: '2026-08-31',
      range: ['2026-08-31', '2026-09-30'],
      cadence: CADENCE.monthly,
      filePrefix: 'AncillaryUplift',
      iso: 'ERCOT',
      fileParams: [{ key: 'control_area', value: 'ERCOT' }],
      jsonFields: ['cost_component', 'price_date', 'price', 'uom'],
      sampleRows: [ERCOT_ANC_ROW],
    }),
  ],
};

const recRps = {
  title: 'REC/RPS Data',
  description: 'Renewable Energy Certificate (REC) and Renewable Portfolio Standard (RPS) costs by control area. One address serves Excel, CSV and JSON.',
  endpoints: [
    rowsProduct({
      path: '/api/v1/electricity/rec-rps/download',
      title: 'Download REC/RPS',
      intro: 'Returns REC/RPS costs and compliance obligations for one control area on a Publication Date. Excel also accepts a range of Publication Dates.',
      params: [formatParam, controlArea(['ERCOT', 'ISONE', 'NYISO', 'PJM']), startPub, endPub, ...deliveryWindow, ...paging],
      single: '2026-08-31',
      range: ['2026-08-31', '2026-09-30'],
      cadence: CADENCE.monthly,
      filePrefix: 'RECRPS',
      iso: 'ERCOT',
      fileParams: [{ key: 'control_area', value: 'ERCOT' }],
      jsonFields: ['cost_group', 'cost_component', 'price_date', 'price'],
      sampleRows: [ERCOT_REC_ROW],
    }),
  ],
};

// Utility Price (electricity and natural gas): summary and details, with a CSV variant.
const utilityProduct = ({ path, title, intro, filePrefix, zipNames, summaryRow, detailRow, detailFields, summaryFields, rawNote }) => {
  const single = '2026-10-20';
  const note = [CADENCE.ptc, REPLACE(single)];
  return {
    method: 'GET',
    url: path,
    title,
    description: intro,
    parameters: [
      formatParam,
      { name: 'variant', type: 'string', required: false, description: '<code>full</code> (default), <code>summary</code> or <code>details</code>. <code>summary</code> and <code>details</code> need <code>format=csv</code>. With <code>format=csv</code>, <code>full</code> returns a ZIP holding both CSV files.' },
      startPub,
      endPub,
      ...paging.map((p) => (p.name === 'raw' ? { ...p, description: 'JSON only. <code>true</code> returns the rows inline with paging fields instead of a file.' } : p)),
    ],
    examples: fileDownload({
      path,
      params: [{ key: 'format', value: 'xlsx' }, { key: 'start_publication_date', value: single }],
      filename: `EPD_${filePrefix}_ALL_${single}.xlsx`,
      note,
    }),
    moreExamples: [
      {
        title: 'Example: summary CSV',
        description: 'Use <code>variant=details</code> for the details file. Both CSV files arrive with the same suggested file name, so save them under names of your own.',
        examples: fileDownload({
          path,
          params: [{ key: 'format', value: 'csv' }, { key: 'variant', value: 'summary' }, { key: 'start_publication_date', value: single }],
          filename: `EPD_${filePrefix}_Summary_${single}.csv`,
          note,
        }),
      },
      {
        title: 'Example: summary and details in one ZIP',
        description: `The ZIP holds <code>${zipNames[0]}</code> and <code>${zipNames[1]}</code>.`,
        examples: fileDownload({
          path,
          params: [{ key: 'format', value: 'csv' }, { key: 'start_publication_date', value: single }],
          filename: `EPD_${filePrefix}_ALL_${single}.zip`,
          note,
        }),
      },
      {
        title: 'Example: JSON',
        examples: getJson({
          path,
          params: [{ key: 'format', value: 'json' }, { key: 'start_publication_date', value: single }],
          note,
          printPy: 'print(f"Publication Date {data[\'publication_date\']}")\nprint(f"{len(data[\'summary\'])} utilities, {len(data[\'details\'])} rate classes")',
          printJs: 'console.log(`Publication Date ${data.publication_date}`);\nconsole.log(`${data.summary.length} utilities, ${data.details.length} rate classes`);',
          printRb: 'puts "Publication Date #{data[\'publication_date\']}"\nputs "#{data[\'summary\'].length} utilities, #{data[\'details\'].length} rate classes"',
        }),
      },
    ],
    response: {
      summary: `Excel, CSV, ZIP and JSON come back as a file download named <code>EPD_${filePrefix}_ALL_MMDDYYYY</code> with the file type's extension. The JSON file holds the object below. With <code>raw=true</code> the object comes back inline with <code>skip</code>, <code>limit</code>, <code>total</code>, <code>page</code> and <code>size</code> added. ${rawNote}`,
      body: JSON.stringify({ publication_date: single, operating_date: single, summary: [summaryRow], details: [detailRow] }, null, 2),
    },
    responseFields: [
      { name: 'publication_date', type: 'string', description: 'The Publication Date you asked for.' },
      { name: 'operating_date', type: 'string', description: 'Same value as <code>publication_date</code>. Kept for older clients.' },
      ...summaryFields,
      ...detailFields,
    ],
  };
};

const utilityPrice = {
  title: 'Utility Price',
  description: 'Electricity utility Price to Compare (PTC) by utility and rate class, with history and forecast. One address serves Excel, CSV and JSON.',
  endpoints: [
    utilityProduct({
      path: '/api/v1/electricity/utility-price/download',
      title: 'Download Utility Price',
      intro: 'Returns the Utility Price dataset for a Publication Date: a summary per utility and monthly prices per rate class. Excel also accepts a range of Publication Dates.',
      filePrefix: 'UtilityPrice',
      rawNote: 'The page applies to <code>summary</code> and <code>details</code> together, and <code>total_summary</code> and <code>total_details</code> give the full length of each list.',
      zipNames: ['Utility_Price_Summary_YYYYMMDD.csv', 'Utility_Price_Details_YYYYMMDD.csv'],
      summaryRow: { iso: 'ISONE', state: 'MA', utility_code: 'FGE', utility_name: 'Fitchburg Gas & Electric (Unitil)', current_ptc_published_to: '01-31-2027', ptc_schedule: 'Changes twice each year (Jan/Jul)' },
      detailRow: { iso: 'PJM', state: 'DC', utility_code: 'PEPCO', utility_name: 'Potomac Electric Power Company (DC)', load_zone: 'PEPCO', rate_class_load_profile: 'RESIDENTIAL (SCHEDULE MMA)', ptc_forecast_range: '05-31-2027', ptc_change_percent_this_month: 0.0, ptc_change_percent_forecast: 0.022916989175607555, epd_cogs: null, headroom: null, prices: [{ date: '01-01-2023', price: 0.08690800000000001 }, { date: '02-01-2023', price: 0.08690800000000001 }] },
      summaryFields: [
        { name: 'summary[]', type: 'array', description: 'One entry per utility: <code>iso</code>, <code>state</code>, <code>utility_code</code>, <code>utility_name</code>, <code>current_ptc_published_to</code> and <code>ptc_schedule</code>.' },
      ],
      detailFields: [
        { name: 'details[]', type: 'array', description: 'One entry per rate class: utility fields, <code>load_zone</code>, <code>rate_class_load_profile</code>, <code>ptc_forecast_range</code>, <code>ptc_change_percent_this_month</code>, <code>ptc_change_percent_forecast</code>, <code>epd_cogs</code> and <code>headroom</code>.' },
        { name: 'details[].prices[]', type: 'array', description: 'Monthly PTC: <code>date</code> (<code>MM-DD-YYYY</code>) and <code>price</code> in $/kWh.' },
      ],
    }),
  ],
};

const naturalGasUtilityPrice = {
  title: 'Natural Gas Utility Price',
  description: 'Natural gas utility prices by utility and rate class, with history and forecast. One address serves Excel, CSV and JSON.',
  endpoints: [
    utilityProduct({
      path: '/api/v1/natural-gas/utility-price/download',
      title: 'Download Natural Gas Utility Price',
      intro: 'Returns the Natural Gas Utility Price dataset for a Publication Date: a summary per utility and monthly prices per rate class. Excel also accepts a range of Publication Dates.',
      filePrefix: 'NaturalGasUtilityPrice',
      rawNote: 'The page applies to <code>details</code>; <code>summary</code> always comes back in full.',
      zipNames: ['Natural_Gas_Utility_Price_Summary_YYYYMMDD.csv', 'Natural_Gas_Utility_Price_Details_YYYYMMDD.csv'],
      summaryRow: { state: 'DC', utility_code: 'WGL', utility_name: 'Washington Gas & Light', current_price_published_to: '10-31-2026', price_schedule: null },
      detailRow: { state: 'DC', utility_code: 'WGL', utility_name: 'Washington Gas & Light', rate_class_load_profile: 'Residential Service Rate Schedule No. 1', price_forecast_range: '10-31-2026', price_change_pct: 0.035386237012498066, uom: '$/Therm', prices: [{ date: '01-01-2024', price: 0.5993 }, { date: '02-01-2024', price: 0.5055 }] },
      summaryFields: [
        { name: 'summary[]', type: 'array', description: 'One entry per utility: <code>state</code>, <code>utility_code</code>, <code>utility_name</code>, <code>current_price_published_to</code> and <code>price_schedule</code>. Raw pages always return the full summary.' },
      ],
      detailFields: [
        { name: 'details[]', type: 'array', description: 'One entry per rate class: utility fields, <code>rate_class_load_profile</code>, <code>price_forecast_range</code>, <code>price_change_pct</code> and <code>uom</code>.' },
        { name: 'details[].prices[]', type: 'array', description: 'Monthly price: <code>date</code> (<code>MM-DD-YYYY</code>) and <code>price</code> in the row\'s <code>uom</code>.' },
      ],
    }),
  ],
};

export const v1Downloads = {
  'energy-futures': energyFutures,
  'natgas-energy-futures': natgasFutures,
  ancillary,
  'rec-rps': recRps,
  'utility-price': utilityPrice,
  'natural-gas-utility-price': naturalGasUtilityPrice,
};
