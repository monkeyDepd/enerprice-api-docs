import { mockApiData as legacy } from '../legacy';
import { templateSamples, uploadSamples, statusSamples, resultSamples, jobsSamples } from '../batch';

// Fair Market Pricing on the new addresses. Single pricing keeps the legacy request and
// response bodies (the same server code answers both addresses), so the legacy text and
// samples are reused with the addresses swapped. Batch pricing is new to the docs.

const BASE = '/api/v1/electricity/fair-market-pricing';

// Longest first, so /pricing/download/excel is swapped before /pricing.
const SWAPS = [
  ['/pricing/download/excel', `${BASE}/download?format=xlsx`],
  ['/pricing/download/csv', `${BASE}/download?format=csv`],
  ['/pricing/options', `${BASE}/options`],
  ['/pricing/calculate', `${BASE}/calculate`],
];

// House style drops dashes; reword the few the legacy text carries.
const DASHES = [
  [' &mdash; in <code>', ', in <code>'],
  ['information &mdash; rates are rounded', 'information. Rates are rounded'],
];

const swap = (value) => {
  if (typeof value === 'string') return [...SWAPS, ...DASHES].reduce((s, [from, to]) => s.split(from).join(to), value);
  if (Array.isArray(value)) return value.map(swap);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, typeof v === 'function' ? v : swap(v)]));
  }
  return value;
};

const old = legacy['fair-market-pricing'];
const [oldOptions, oldCalculate, oldExcel, oldCsv] = old.endpoints;

const td = 'py-3 px-3 text-gray-600 dark:text-gray-300';
const tdHead = 'py-3 px-3 font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap';

const LIMITS_ROW = /<tr class="border-b dark:border-gray-600 align-top">\s*<td[^>]*>Limits<\/td>[\s\S]*?<\/tr>\s*/;
const PORTFOLIO_BOX = /<div class="mt-4 bg-blue-50[^"]*"[^>]*>\s*<p[^>]*>Pricing a portfolio<\/p>[\s\S]*?<\/div>/;

const limitsRow = `<tr class="border-b dark:border-gray-600 align-top">
              <td class="${tdHead}">Limits</td>
              <td class="${td}">
                <strong>60 requests/minute</strong> per API key, the same as every other endpoint. A <code>429</code> carries <code>Retry-After</code>.
                <ul class="list-disc list-inside mt-2 space-y-1">
                  <li>Batch pricing adds <strong>600 rows per day</strong> and <strong>2 jobs at a time</strong> per user. Those two <code>429</code> responses carry no <code>Retry-After</code>: wait for a running job to finish, or for the next day.</li>
                </ul>
              </td>
            </tr>
            `;

const portfolioBox = `<div class="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p class="font-semibold text-blue-900 dark:text-blue-100 mb-2">One account or many</p>
        <table class="w-full text-sm text-left border-collapse">
          <thead><tr class="border-b border-blue-200 dark:border-blue-800">
            <th class="py-2 px-3 text-blue-900 dark:text-blue-100"></th>
            <th class="py-2 px-3 text-blue-900 dark:text-blue-100">Single pricing</th>
            <th class="py-2 px-3 text-blue-900 dark:text-blue-100">Batch pricing</th>
          </tr></thead>
          <tbody class="text-blue-800 dark:text-blue-200">
            <tr class="border-b border-blue-200 dark:border-blue-800"><td class="py-2 px-3 font-semibold">You send</td><td class="py-2 px-3">One account as JSON to <code>/calculate</code></td><td class="py-2 px-3">Up to 200 accounts in the Excel template to <code>/batch-upload</code></td></tr>
            <tr class="border-b border-blue-200 dark:border-blue-800"><td class="py-2 px-3 font-semibold">You get</td><td class="py-2 px-3">The full pricing report as JSON, in the response</td><td class="py-2 px-3">A <code>batch_id</code>. When the job finishes, a results workbook</td></tr>
            <tr class="border-b border-blue-200 dark:border-blue-800"><td class="py-2 px-3 font-semibold">Calls</td><td class="py-2 px-3">One per account</td><td class="py-2 px-3">Template, upload, status until done, download</td></tr>
            <tr><td class="py-2 px-3 font-semibold">Best for</td><td class="py-2 px-3">Systems that store results as data</td><td class="py-2 px-3">Spreadsheet workflows and large portfolios</td></tr>
          </tbody>
        </table>
        <p class="text-sm text-blue-800 dark:text-blue-200 mt-3">Batch jobs and their results expire <strong>2 hours</strong> after upload. Download the results before then.</p>
      </div>`;

const description = swap(old.description)
  .replace(LIMITS_ROW, limitsRow)
  .replace(PORTFOLIO_BOX, portfolioBox);

const download = {
  ...swap(oldExcel),
  url: `${BASE}/download`,
  title: 'Download Single Pricing Report',
  description: 'Same JSON request body as <code>/calculate</code>. Returns the pricing report as a file: an Excel workbook with an FMP vs Utility Price chart, or a CSV with three stacked sections (Summary, Component Breakdown and Monthly Breakdown). <code>unit</code> carries through to the file: values and column headers follow the basis you asked for.',
  parameters: [
    { name: 'format', type: 'string', required: false, description: 'Query parameter: <code>xlsx</code> (default) or <code>csv</code>.' },
    { name: 'JSON body', type: 'object', required: true, description: 'The whole request body, same schema as <code>/calculate</code> including <code>unit</code>.' },
  ],
  moreExamples: [{ title: 'Example: CSV', examples: swap(oldCsv).examples }],
  response: {
    summary: 'A file download named <code>pricing_report_{iso}_{utility_name}_{start_date}.xlsx</code> (or <code>.csv</code>), with spaces in the utility name replaced by underscores.',
  },
};

const BATCH = {
  base: BASE,
  templateRoute: 'batch-template',
  templateQuery: [['unit', 'kWh']],
  templateFile: 'EPD_FMP_Batch_Pricing_Template_kWh.xlsx',
  uploadRoute: 'batch-upload',
  uploadFile: 'EPD_FMP_Batch_Pricing_Template_kWh.xlsx',
  uploadPrintPy: '    print(f"{job[\'valid_rows\']} of {job[\'total_rows\']} rows accepted")\n    for error in job["validation_errors"]:\n        print("Rejected:", error)',
  uploadPrintJs: '  console.log(`${job.valid_rows} of ${job.total_rows} rows accepted`);\n  job.validation_errors.forEach((error) => console.log(\'Rejected:\', error));',
  uploadPrintRb: '    puts "#{job[\'valid_rows\']} of #{job[\'total_rows\']} rows accepted"\n    job[\'validation_errors\'].each { |error| puts "Rejected: #{error}" }',
  statusRoute: 'batch-status',
  statusPrintPy: '        print(f"{job[\'completed\']} of {job[\'valid_rows\']} rows priced, {job[\'errors_count\']} failed")',
  statusPrintJs: '      console.log(`${job.completed} of ${job.valid_rows} rows priced, ${job.errors_count} failed`);',
  statusPrintRb: '    puts "#{job[\'completed\']} of #{job[\'valid_rows\']} rows priced, #{job[\'errors_count\']} failed"',
  downloadRoute: 'batch-download',
  resultFile: 'fmp_batch_results.xlsx',
  jobsRoute: 'batch-jobs',
  jobsKey: 'jobs',
};

const batchEndpoints = [
  {
    method: 'GET',
    url: `${BASE}/batch-template`,
    title: 'Batch Pricing: Download the Template',
    description: 'Step 1 of batch pricing. Returns the Excel template to fill in, one account per row on the <strong>Batch Pricing</strong> sheet. The template lists the valid State, Utility, Load Profile and voltage combinations so you can pick values from it. Keep the column headers as they are: the upload checks them.',
    parameters: [
      { name: 'unit', type: 'string', required: false, description: '<code>kWh</code> (default) or <code>MWh</code>: the basis for the usage columns. Demand tags stay in kW on both.' },
      { name: 'iso', type: 'string', required: false, description: '<code>PJM</code> (default). Currently PJM only.' },
    ],
    examples: templateSamples(BATCH),
    response: { summary: 'A file download named <code>EPD_FMP_Batch_Pricing_Template_kWh.xlsx</code> or <code>EPD_FMP_Batch_Pricing_Template_MWh.xlsx</code>.' },
  },
  {
    method: 'POST',
    url: `${BASE}/batch-upload`,
    title: 'Batch Pricing: Upload a File',
    description: 'Step 2. Upload the completed template as <code>multipart/form-data</code>. The API checks every row, starts pricing the valid ones and returns a <code>batch_id</code>. Rows that fail the check come back in <code>validation_errors</code> and are not priced.',
    parameters: [
      { name: 'file', type: 'file', required: true, description: 'The completed template: <code>.xlsx</code> with a <strong>Batch Pricing</strong> sheet, or <code>.csv</code> with the same columns. Up to <strong>200</strong> rows and 100 MiB.' },
    ],
    examples: uploadSamples(BATCH),
    response: {
      body: JSON.stringify({ batch_id: '39f55d00c992', total_rows: 189, valid_rows: 189, validation_errors: [] }, null, 2),
      summary: 'Each user can price <strong>600 rows per day</strong> and run <strong>2 jobs at a time</strong>. Going over either returns <code>429</code>. A file with no valid rows returns <code>400</code>.',
    },
  },
  {
    method: 'GET',
    url: `${BASE}/batch-status/{batch_id}`,
    title: 'Batch Pricing: Check Status',
    description: 'Step 3. Call until <code>status</code> is <code>completed</code> or <code>failed</code>. A 200-row job takes a few minutes.',
    parameters: [{ name: 'batch_id', type: 'string', required: true, description: 'Path parameter: the ID from the upload response.' }],
    examples: statusSamples(BATCH),
    response: {
      body: JSON.stringify({ batch_id: '39f55d00c992', status: 'completed', filename: 'my_accounts.xlsx', total: 189, valid_rows: 189, completed: 189, errors_count: 0, error_details: [], validation_errors: [] }, null, 2),
    },
    responseFields: [
      { name: 'status', type: 'string', description: '<code>processing</code>, <code>completed</code> or <code>failed</code>.' },
      { name: 'completed', type: 'integer', description: 'Rows finished so far.' },
      { name: 'errors_count, error_details', type: 'integer, array', description: 'Rows the engine could not price, with the reason for each.' },
    ],
  },
  {
    method: 'GET',
    url: `${BASE}/batch-download/{batch_id}`,
    title: 'Batch Pricing: Download the Results',
    description: 'Step 4. For a completed job, returns a temporary download URL for the results workbook. The URL works for <strong>15 minutes</strong> and needs no API key. Call this endpoint again for a fresh URL.',
    parameters: [{ name: 'batch_id', type: 'string', required: true, description: 'Path parameter: a completed job\'s ID.' }],
    examples: resultSamples(BATCH),
    response: {
      body: JSON.stringify({ download_url: 'https://…', expires_in: 900 }, null, 2),
      summary: 'The workbook holds a Summary sheet with every account and one sheet per account with its component breakdown. A job that has not finished returns <code>400</code>.',
    },
  },
  {
    method: 'GET',
    url: `${BASE}/batch-jobs`,
    title: 'Batch Pricing: List Your Jobs',
    description: 'Lists your batch jobs from the last 2 hours, newest first.',
    parameters: [{ name: 'limit', type: 'integer', required: false, description: 'Jobs to return, 1 to 100. Default 20.' }],
    examples: jobsSamples(BATCH),
    response: {
      body: JSON.stringify({ jobs: [{ batch_id: '39f55d00c992', status: 'completed', created_at: '2026-10-28T14:33:51.047112', total_rows: 189, filename: 'my_accounts.xlsx' }] }, null, 2),
    },
  },
];

export const v1Pricing = {
  'fair-market-pricing': {
    title: old.title,
    description,
    endpoints: [swap(oldOptions), swap(oldCalculate), download, ...batchEndpoints],
  },
};
