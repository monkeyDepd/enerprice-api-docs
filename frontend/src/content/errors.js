// Errors reference: RFC 9457 Problem Details, the same on old and new addresses.

const card = 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6';
const th = 'py-2 px-3 text-gray-900 dark:text-gray-100';
const td = 'py-2 px-3 text-gray-600 dark:text-gray-300 align-top';
const tdCode = 'py-2 px-3 font-mono text-sm text-blue-600 dark:text-blue-400 align-top whitespace-nowrap';
const pre = 'text-sm bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto whitespace-pre';

const CODES = [
  [400, 'VALIDATION_FAILED', 'A parameter is missing or has a value the endpoint does not accept, for example a date range on a CSV download. <code>detail</code> names the parameter.'],
  [400, 'PRICING_INPUT_INVALID', 'A Fair Market Pricing request names a combination that does not exist, or the engine cannot price it. <code>detail</code> lists each problem.'],
  [401, 'UNAUTHORIZED', 'The <code>X-API-Key</code> header is missing or the key is not valid.'],
  [403, 'FORBIDDEN', 'Your account does not include this product, or the batch job belongs to another user.'],
  [403, 'REGION_ACCESS_DENIED', 'Your account does not include the requested control area. Region values are case sensitive.'],
  [404, 'DATASET_NOT_FOUND', 'No dataset exists for the Publication Date you sent. Check the <a href="#/v1/home" class="underline text-blue-600 dark:text-blue-300">publishing schedule</a>.'],
  [404, 'NOT_FOUND', 'The dataset exists but no rows match your filters, or the resource does not exist.'],
  [404, 'BATCH_NOT_FOUND', 'The batch ID is unknown, or the job expired. Batch jobs expire 2 hours after upload.'],
  [413, 'PAYLOAD_TOO_LARGE', 'The uploaded file is larger than 100 MiB.'],
  [422, 'REQUEST_VALIDATION_ERROR', 'A value has the wrong type or format, for example a date that is not YYYY-MM-DD. <code>errors</code> lists each field.'],
  [429, 'RATE_LIMIT_EXCEEDED', 'You sent too many requests, or a batch upload went over its daily row quota or job limit. Wait for the number of seconds in <code>Retry-After</code> when the header is present.'],
  [500, 'INTERNAL_ERROR', 'Something failed on our side. Retry later, and send the <code>request_id</code> to support if it continues.'],
  [503, 'SERVICE_UNAVAILABLE', 'A service the API depends on is unavailable. Retry after a short delay.'],
];

const codeRows = CODES.map(([status, code, meaning]) => `
  <tr class="border-b dark:border-gray-600">
    <td class="${td}">${status}</td>
    <td class="${tdCode}">${code}</td>
    <td class="${td}">${meaning}</td>
  </tr>`).join('');

export const errorsPage = {
  title: 'Errors',
  description: 'Every error response uses one format, RFC 9457 Problem Details, on the new and the old addresses.',
  content: `
    <div class="space-y-6">
      <div class="${card}">
        <h4 class="font-bold text-gray-900 dark:text-white mb-3">Error format</h4>
        <p class="text-gray-700 dark:text-gray-300 mb-3">An error returns a 4xx or 5xx status with <code>Content-Type: application/problem+json</code> and a body like this:</p>
        <pre class="${pre}">{
  "type": "https://api.enerpricedata.com/problems/dataset-not-found",
  "title": "Not Found",
  "status": 404,
  "detail": "No Electricity Futures dataset found for 2026-08-23",
  "code": "DATASET_NOT_FOUND",
  "instance": "/api/v1/electricity/futures/download",
  "request_id": "e7f350f4-2c32-4e2a-abc4-d5363f9325f9"
}</pre>
        <div class="overflow-x-auto mt-4">
          <table class="w-full text-sm text-left border-collapse">
            <thead><tr class="border-b dark:border-gray-600"><th class="${th}">Field</th><th class="${th}">Meaning</th></tr></thead>
            <tbody>
              <tr class="border-b dark:border-gray-600"><td class="${tdCode}">code</td><td class="${td}">A stable, machine-readable error code from the table below. Branch on this field.</td></tr>
              <tr class="border-b dark:border-gray-600"><td class="${tdCode}">detail</td><td class="${td}">A human-readable explanation of this occurrence. The wording can change, so show it to people and do not parse it.</td></tr>
              <tr class="border-b dark:border-gray-600"><td class="${tdCode}">status</td><td class="${td}">The HTTP status code.</td></tr>
              <tr class="border-b dark:border-gray-600"><td class="${tdCode}">title</td><td class="${td}">A short summary of the status.</td></tr>
              <tr class="border-b dark:border-gray-600"><td class="${tdCode}">type</td><td class="${td}">An identifier for the error class. It matches <code>code</code>.</td></tr>
              <tr class="border-b dark:border-gray-600"><td class="${tdCode}">instance</td><td class="${td}">The path you called.</td></tr>
              <tr class="border-b dark:border-gray-600"><td class="${tdCode}">request_id</td><td class="${td}">The same value as the <code>X-Request-ID</code> response header. Quote it when you contact support.</td></tr>
              <tr><td class="${tdCode}">errors</td><td class="${td}">Present on <code>422</code> responses: one entry per invalid field, each with <code>loc</code>, <code>msg</code> and <code>type</code>.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="${card}">
        <h4 class="font-bold text-gray-900 dark:text-white mb-3">Error codes</h4>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left border-collapse">
            <thead><tr class="border-b dark:border-gray-600"><th class="${th}">Status</th><th class="${th}">Code</th><th class="${th}">Meaning</th></tr></thead>
            <tbody>${codeRows}</tbody>
          </table>
        </div>
      </div>

      <div class="${card}">
        <h4 class="font-bold text-gray-900 dark:text-white mb-3">Handling errors</h4>
        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Retry <code>429</code>, <code>500</code> and <code>503</code> with a growing delay. On <code>429</code>, wait at least the seconds in <code>Retry-After</code>.</li>
          <li>Do not retry other <code>4xx</code> responses unchanged. Fix the request first.</li>
          <li>Log <code>request_id</code> with every error.</li>
          <li>Accept both <code>application/problem+json</code> and <code>application/json</code> when you parse an error body.</li>
        </ul>
        <pre class="${pre} mt-4">response = requests.get(url, headers=headers, params=params)
if not response.ok:
    problem = response.json()
    print(f"{problem['status']} {problem['code']}: {problem['detail']}")
    print(f"request_id: {problem['request_id']}")</pre>
      </div>
    </div>
  `,
};
