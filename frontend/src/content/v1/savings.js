import { mockApiData as legacy } from '../legacy';
import { templateSamples, uploadSamples, statusSamples, resultSamples, jobsSamples } from '../batch';

// Comparative Savings on the new addresses. The JSON pair answers on both addresses from the
// same server code, so the legacy text and samples are reused with the address swapped.
// The file-upload flow is new to the docs.

const BASE = '/api/v1/electricity/utility-price';

const swap = (value) => {
  if (typeof value === 'string') {
    // House style drops dashes; reword the one the legacy text carries.
    return value.split('/api/v1/utility-price').join(BASE).split('</strong> &mdash; the only zone').join('</strong>: the only zone');
  }
  if (Array.isArray(value)) return value.map(swap);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, swap(v)]));
  return value;
};

const old = legacy['comparative-savings'];
const [oldOptions, oldAnalysis] = old.endpoints;

const LIMITS_BOX = /<div class="mt-4 bg-blue-50[^"]*"[^>]*>\s*<p[^>]*>Limits, per API key<\/p>[\s\S]*?<\/table>\s*<p[^>]*>[\s\S]*?<\/p>\s*<\/div>/;

const limitsBox = `<div class="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Limits, per API key</p>
        <table class="w-full text-sm text-left border-collapse">
          <tbody>
            <tr class="border-b border-blue-200 dark:border-blue-800"><td class="py-2 px-3 text-blue-800 dark:text-blue-200">Requests per minute</td><td class="py-2 px-3 text-blue-800 dark:text-blue-200">60</td></tr>
            <tr class="border-b border-blue-200 dark:border-blue-800"><td class="py-2 px-3 text-blue-800 dark:text-blue-200">Reads per request</td><td class="py-2 px-3 text-blue-800 dark:text-blue-200">200</td></tr>
            <tr><td class="py-2 px-3 text-blue-800 dark:text-blue-200">Reads per uploaded file</td><td class="py-2 px-3 text-blue-800 dark:text-blue-200">200</td></tr>
          </tbody>
        </table>
        <p class="text-sm text-blue-800 dark:text-blue-200 mt-3">A <code>429</code> carries a <code>Retry-After</code> header.</p>
      </div>
      <div class="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p class="font-semibold text-blue-900 dark:text-blue-100 mb-2">JSON or file upload</p>
        <p class="text-blue-800 dark:text-blue-200">Send reads as JSON to <code>/comparative-analysis</code> and get the results in the response. Or fill in the Excel template, upload it to <code>/savings-upload</code>, and download a results workbook when the job finishes. Both take up to 200 reads and use the same pricing. They validate differently: any invalid read fails a JSON request with <code>422</code> and prices nothing, while an upload skips the bad rows and prices the rest. Upload jobs and their results expire <strong>2 hours</strong> after upload.</p>
      </div>`;

const description = swap(old.description)
  .replace(LIMITS_BOX, limitsBox)
  .replace('<strong>Two calls, in this order.</strong>', '<strong>For JSON, two calls in this order.</strong>');

const options = swap(oldOptions);
options.description = options.description.replace('Response is <code>{ operating_date,', 'Response is <code>{ publication_date, operating_date,');
// publication_date is the canonical field; operating_date is a deprecated echo of it.
options.examples = Object.fromEntries(Object.entries(options.examples).map(([lang, code]) => [lang, code
  .split("data['operating_date']").join("data['publication_date']")
  .split('data.operating_date').join('data.publication_date')]));

const analysis = swap(oldAnalysis);
analysis.description = analysis.description
  .replace('<strong>Response:</strong> <code>{ operating_date, accounts, warnings }</code>', '<strong>Response:</strong> <code>{ publication_date, operating_date, accounts, warnings }</code>')
  .replace('<strong>Response:</strong>', 'Any validation error, including reads for one <code>account_id</code> that disagree on state, utility, rate class or load zone, fails the whole request with <code>422</code> and prices nothing.<br/><br/><strong>Response:</strong>');

const BATCH = {
  base: BASE,
  templateRoute: 'savings-template',
  templateQuery: null,
  templateFile: 'comparative_savings_template.xlsx',
  uploadRoute: 'savings-upload',
  uploadFile: 'comparative_savings_template.xlsx',
  uploadPrintPy: '    print(f"{job[\'accepted_reads\']} reads accepted")\n    for error in job["errors"]:\n        print("Rejected:", error)',
  uploadPrintJs: '  console.log(`${job.accepted_reads} reads accepted`);\n  job.errors.forEach((error) => console.log(\'Rejected:\', error));',
  uploadPrintRb: '    puts "#{job[\'accepted_reads\']} reads accepted"\n    job[\'errors\'].each { |error| puts "Rejected: #{error}" }',
  statusRoute: 'savings-status',
  statusPrintPy: '        print(f"{len(job[\'accounts\'])} accounts priced")\n        if job["error"]:\n            print("Error:", job["error"])',
  statusPrintJs: '      console.log(`${job.accounts.length} accounts priced`);\n      if (job.error) console.log(\'Error:\', job.error);',
  statusPrintRb: '    puts "#{job[\'accounts\'].length} accounts priced"\n    puts "Error: #{job[\'error\']}" if job[\'error\']',
  downloadRoute: 'savings-download',
  resultFile: 'comparative_savings_results.xlsx',
  jobsRoute: 'savings-jobs',
  jobsKey: 'jobs',
};

const uploadEndpoints = [
  {
    method: 'GET',
    url: `${BASE}/savings-template`,
    title: 'File Upload: Download the Template',
    description: 'Step 1 of the file-upload flow. Returns the Excel template, one meter read per row on the <strong>Utility Price Template</strong> sheet. The columns carry the same fields as a JSON read. Keep the column headers as they are: the upload checks them.',
    examples: templateSamples(BATCH),
    response: { summary: 'A file download named <code>comparative_savings_template.xlsx</code>.' },
  },
  {
    method: 'POST',
    url: `${BASE}/savings-upload`,
    title: 'File Upload: Upload a File',
    description: 'Step 2. Upload the completed template as <code>multipart/form-data</code>. The API checks every read, starts pricing the valid ones and returns a <code>batch_id</code>. Reads that fail the check come back in <code>errors</code> and are not priced. <code>errors</code> can also hold account consistency warnings, for example one <code>account_id</code> with two utilities. Those do not stop the job: every read counted in <code>accepted_reads</code> is priced.',
    parameters: [
      { name: 'file', type: 'file', required: true, description: 'The completed template as <code>.xlsx</code>. Up to <strong>200</strong> reads and 100 MiB.' },
    ],
    examples: uploadSamples(BATCH),
    response: {
      body: JSON.stringify({ batch_id: 'a1b2c3d4e5f6', accepted_reads: 200, errors: [] }, null, 2),
      summary: 'A file with no valid reads returns <code>400</code>.',
    },
  },
  {
    method: 'GET',
    url: `${BASE}/savings-status/{batch_id}`,
    title: 'File Upload: Check Status',
    description: 'Step 3. Call until <code>status</code> is <code>completed</code> or <code>failed</code>. A completed job also returns every account\'s results, in the same shape as <code>/comparative-analysis</code>.',
    parameters: [{ name: 'batch_id', type: 'string', required: true, description: 'Path parameter: the ID from the upload response.' }],
    examples: statusSamples(BATCH),
    response: {
      body: JSON.stringify({ batch_id: 'a1b2c3d4e5f6', status: 'completed', filename: 'my_reads.xlsx', accounts: ['…'], error: null }, null, 2),
    },
    responseFields: [
      { name: 'status', type: 'string', description: '<code>processing</code>, <code>completed</code> or <code>failed</code>.' },
      { name: 'accounts', type: 'array', description: 'Per-account results once the job completes.' },
      { name: 'error', type: 'string', description: 'Why the job failed, or <code>null</code>.' },
    ],
  },
  {
    method: 'GET',
    url: `${BASE}/savings-download/{batch_id}`,
    title: 'File Upload: Download the Results',
    description: 'Step 4. For a completed job, returns a temporary download URL for the results workbook. The URL works for <strong>15 minutes</strong> and needs no API key. Call this endpoint again for a fresh URL.',
    parameters: [{ name: 'batch_id', type: 'string', required: true, description: 'Path parameter: a completed job\'s ID.' }],
    examples: resultSamples(BATCH),
    response: {
      body: JSON.stringify({ download_url: 'https://…', expires_in: 900 }, null, 2),
      summary: 'A job that has not finished returns <code>400</code>.',
    },
  },
  {
    method: 'GET',
    url: `${BASE}/savings-jobs`,
    title: 'File Upload: List Your Jobs',
    description: 'Lists your upload jobs, newest first. A job older than 2 hours shows <code>status: "expired"</code> with <code>created_at</code> and <code>filename</code> set to <code>null</code>.',
    parameters: [{ name: 'limit', type: 'integer', required: false, description: 'Jobs to return, 1 to 100. Default 20.' }],
    examples: jobsSamples(BATCH),
    response: {
      body: JSON.stringify({ jobs: [{ batch_id: 'a1b2c3d4e5f6', status: 'completed', created_at: '2026-10-28T14:33:51.047112', accepted_reads: 200, filename: 'my_reads.xlsx' }] }, null, 2),
    },
  },
];

export const v1Savings = {
  'comparative-savings': {
    title: old.title,
    description,
    endpoints: [options, analysis, ...uploadEndpoints],
    content: swap(old.content),
  },
};
