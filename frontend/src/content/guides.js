import { mockApiData as legacy } from './legacy';
import { DEPRECATION_DATE, SUNSET_DATE, SUNSET_HTTP_DATE, DEPRECATION_HEADER, SUCCESSORS } from './migration';
import { errorsPage } from './errors';

// Shared pages: the same text shows whichever address toggle is active.

const card = 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6';
const th = 'py-2 px-3 text-gray-900 dark:text-gray-100';
const td = 'py-2 px-3 text-gray-600 dark:text-gray-300 align-top';
const tdStrong = 'py-2 px-3 font-semibold text-gray-900 dark:text-gray-100 align-top';
const pre = 'text-sm bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto whitespace-pre';
const link = 'underline text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100';

const notice = `
  <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-800 rounded-lg p-6">
    <h3 class="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">New addresses from ${DEPRECATION_DATE}</h3>
    <p class="text-amber-900 dark:text-amber-100">Every product now has one address under <code>/api/v1/</code>. The old addresses keep working until <strong>${SUNSET_DATE}</strong> and return <code>410 Gone</code> after that. The <a href="#/v1/migration" class="${link}">migration guide</a> lists every old address with its replacement.</p>
  </div>`;

const publishingSchedule = `
  <div class="${card}">
    <h4 class="font-bold text-gray-900 dark:text-white mb-4">Publishing Schedule</h4>
    <table class="w-full text-sm text-left border-collapse">
      <thead>
        <tr class="border-b dark:border-gray-600"><th class="${th}">Curve Type</th><th class="${th}">Schedule</th></tr>
      </thead>
      <tbody>
        <tr class="border-b dark:border-gray-600"><td class="${tdStrong}">Electricity &amp; Natural Gas Futures</td><td class="${td}">Updated daily by 9:00 AM ET, reflecting the prior business day's close.</td></tr>
        <tr class="border-b dark:border-gray-600"><td class="${tdStrong}">Ancillary/Uplift</td><td class="${td}">All markets updated by the first business day of each month. The NYISO dataset is additionally updated by the first business day of each week.</td></tr>
        <tr class="border-b dark:border-gray-600"><td class="${tdStrong}">REC/RPS</td><td class="${td}">All markets updated by the first business day of each month.</td></tr>
        <tr><td class="${tdStrong}">PTC Files</td><td class="${td}">Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.</td></tr>
      </tbody>
    </table>
  </div>`;

const home = {
  title: 'EnerPrice API Documentation',
  description: 'The EnerPrice API serves Energy Futures, Natural Gas Futures, Ancillary/Uplift, REC/RPS and Utility Price datasets, and runs Fair Market Pricing and Comparative Savings calculations.',
  content: `
    <div class="space-y-6">
      ${notice}
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Getting Started</h3>
        <p class="text-blue-800 dark:text-blue-200">Create an API key at <a href="https://app.enerpricedata.com" target="_blank" rel="noopener noreferrer" class="${link}">app.enerpricedata.com</a> and send it in the <code>X-API-Key</code> header on every request. <a href="#/v1/auth" class="${link}">Authentication</a> shows where to find it.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="${card}">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Base URL</h4>
          <code class="text-sm bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded">https://api.enerpricedata.com</code>
        </div>
        <div class="${card}">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Address pattern</h4>
          <code class="text-sm bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded break-all">/api/v1/{commodity}/{product}/download?format=xlsx|csv|json</code>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-2"><code>{commodity}</code> is <code>electricity</code> or <code>natural-gas</code>.</p>
        </div>
        <div class="${card}">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Dates</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">Pass the dataset's <strong>Publication Date</strong> in <code>start_publication_date</code>. Excel downloads also take <code>end_publication_date</code> for a range. CSV and JSON take one date.</p>
        </div>
        <div class="${card}">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Rate Limits</h4>
          <p class="text-sm text-gray-600 dark:text-gray-300">Most product endpoints are limited to <strong>60 requests/minute per API key</strong>. Exceeding that returns <code class="text-xs">HTTP 429</code> with a <code class="text-xs">Retry-After</code> header giving the seconds to wait. Some products add further limits, listed on the product page. For example, <a href="#/v1/fair-market-pricing" class="${link}">Fair Market Pricing</a> batch pricing allows 600 rows per day and 2 jobs at a time.</p>
        </div>
      </div>

      <div class="${card}">
        <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Your first request</h4>
        <pre class="${pre}">curl -G "https://api.enerpricedata.com/api/v1/electricity/futures/download" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  --data-urlencode "format=xlsx" \\
  --data-urlencode "control_area=PJM" \\
  --data-urlencode "start_publication_date=2026-08-24" \\
  --output "EPD_EnergyFutures_PJM_08242026.xlsx"</pre>
      </div>

      ${publishingSchedule}
    </div>
  `,
};

// Old-to-new table built from the same map the legacy badges use.
const mappingRows = Object.entries(SUCCESSORS).map(([oldKey, newPath]) => {
  const [method, oldPath] = oldKey.split(' ');
  return `<tr class="border-b dark:border-gray-600"><td class="${td} whitespace-nowrap">${method}</td><td class="${td}"><code class="break-all">${oldPath}</code></td><td class="${td}"><code class="break-all">${newPath}</code></td></tr>`;
}).join('');

const migration = {
  title: 'Migration guide',
  description: `On ${DEPRECATION_DATE} every product moved to one address under <code>/api/v1/</code>. The old addresses keep working until ${SUNSET_DATE}. From that date they return <code>410 Gone</code>, so move your integration before then.`,
  content: `
    <div class="space-y-6">
      <div class="${card}">
        <h4 class="font-bold text-gray-900 dark:text-white mb-4">Timeline</h4>
        <table class="w-full text-sm text-left border-collapse">
          <thead><tr class="border-b dark:border-gray-600"><th class="${th}">Date</th><th class="${th}">What happens</th></tr></thead>
          <tbody>
            <tr class="border-b dark:border-gray-600"><td class="${tdStrong} whitespace-nowrap">${DEPRECATION_DATE}</td><td class="${td}">The new addresses go live. The old addresses still return the same data, and every response from them carries <code>Deprecation</code>, <code>Sunset</code> and <code>Link</code> headers naming the new address.</td></tr>
            <tr><td class="${tdStrong} whitespace-nowrap">${SUNSET_DATE}</td><td class="${td}">The old addresses return <code>410 Gone</code>.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="${card}">
        <h4 class="font-bold text-gray-900 dark:text-white mb-4">What changes for your code</h4>
        <ol class="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>One address per product.</strong> The file type moves from the path to the <code>format</code> parameter: <code>xlsx</code>, <code>csv</code> or <code>json</code>. Utility Price adds <code>variant</code> for the summary and details CSV files.</li>
          <li><strong>Parameters use their real names.</strong> <code>start_operating_date</code> becomes <code>start_publication_date</code>, <code>end_operating_date</code> becomes <code>end_publication_date</code>, and <code>offset</code> becomes <code>skip</code>. The values mean the same thing. Change the address and the parameter names in the same release.</li>
          <li><strong>JSON downloads return an object.</strong> For futures, Ancillary/Uplift and REC/RPS, the old addresses return a bare list of rows. The new addresses wrap the rows: <code>{"publication_date": ..., "operating_date": ..., "data": [...]}</code>. Read the rows from <code>data</code>. Utility Price JSON keeps its <code>summary</code> and <code>details</code> lists and adds <code>publication_date</code> and <code>operating_date</code> next to them.</li>
          <li><strong>Raw JSON pages put paging fields at the top level.</strong> A <code>raw=true</code> page carries <code>publication_date</code>, <code>skip</code>, <code>limit</code>, <code>total</code>, <code>page</code> and <code>size</code> next to the rows. Utility Price pages used to nest these in a <code>pagination</code> object.</li>
          <li><strong>Errors use Problem Details on every address, old ones included.</strong> Error bodies now follow RFC 9457 with <code>Content-Type: application/problem+json</code>. The <code>detail</code> field you read today is still there, and new fields add a stable <code>code</code> and a <code>request_id</code>. If your code checks for <code>Content-Type: application/json</code> on errors, accept <code>application/problem+json</code> too. See <a href="#/v1/errors" class="${link}">Errors</a>.</li>
          <li><strong>Every response carries <code>X-Request-ID</code>.</strong> Quote it when you contact support.</li>
          <li><strong>Fair Market Pricing has one download address.</strong> <code>/pricing/download/excel</code> and <code>/pricing/download/csv</code> become <code>/api/v1/electricity/fair-market-pricing/download?format=xlsx|csv</code>. Request bodies and responses stay the same.</li>
          <li><strong>Comparative Savings moves under electricity.</strong> <code>/api/v1/utility-price/...</code> becomes <code>/api/v1/electricity/utility-price/...</code>. Request bodies and responses stay the same.</li>
        </ol>
      </div>

      <div class="${card}">
        <h4 class="font-bold text-gray-900 dark:text-white mb-4">Before and after</h4>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Electricity futures as JSON, old address:</p>
        <pre class="${pre}">response = requests.get(
    "https://api.enerpricedata.com/datasets/download/energy-futures/json",
    headers={"X-API-Key": "YOUR_API_KEY"},
    params={"control_area": "PJM", "start_operating_date": "2026-08-24"},
)
rows = response.json()</pre>
        <p class="text-sm text-gray-600 dark:text-gray-300 mt-4 mb-2">New address:</p>
        <pre class="${pre}">response = requests.get(
    "https://api.enerpricedata.com/api/v1/electricity/futures/download",
    headers={"X-API-Key": "YOUR_API_KEY"},
    params={"format": "json", "control_area": "PJM", "start_publication_date": "2026-08-24"},
)
rows = response.json()["data"]</pre>
      </div>

      <div class="${card}">
        <h4 class="font-bold text-gray-900 dark:text-white mb-4">Find the old addresses you still call</h4>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Responses from an old address carry a <code>Deprecation</code> header, and the <code>Link</code> header holds the replacement. Log them from your HTTP client to find every call left to move:</p>
        <pre class="${pre}">response = requests.get(url, headers=headers, params=params)
if "Deprecation" in response.headers:
    print(f"Deprecated: {response.url}")
    print(f"  Sunset: {response.headers['Sunset']}")
    print(f"  Replace with: {response.headers['Link']}")</pre>
      </div>

      <div class="${card}">
        <h4 class="font-bold text-gray-900 dark:text-white mb-4">Every old address and its replacement</h4>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">Keep your other query parameters. Rename <code>start_operating_date</code> and <code>end_operating_date</code> as described above.</p>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left border-collapse">
            <thead><tr class="border-b dark:border-gray-600"><th class="${th}">Method</th><th class="${th}">Old address</th><th class="${th}">New address</th></tr></thead>
            <tbody>${mappingRows}</tbody>
          </table>
        </div>
      </div>

      <div class="${card}">
        <h4 class="font-bold text-gray-900 dark:text-white mb-4">Checklist</h4>
        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Every request uses an address from the table above.</li>
          <li>Date parameters are <code>start_publication_date</code> and <code>end_publication_date</code>.</li>
          <li>JSON readers take rows from <code>data</code>.</li>
          <li>Error handling accepts <code>application/problem+json</code> and logs <code>request_id</code>.</li>
          <li>No response in your logs carries a <code>Deprecation</code> header.</li>
        </ul>
      </div>
    </div>
  `,
};

const deprecationPolicy = {
  title: 'Deprecation policy',
  description: 'How EnerPrice retires an address, and how your code can tell.',
  content: `
    <div class="space-y-6">
      <div class="${card}">
        <h4 class="font-bold text-gray-900 dark:text-white mb-3">The 90-day window</h4>
        <p class="text-gray-700 dark:text-gray-300">When we retire an address, it keeps working for 90 days from the deprecation date. During that window every response from it carries the three headers below. When the window closes, the address returns <code>410 Gone</code> with a Problem Details body. We announce each retirement in the <a href="#/v1/changelog" class="${link}">Changelog</a>.</p>
        <p class="text-gray-700 dark:text-gray-300 mt-3">The current window runs from <strong>${DEPRECATION_DATE}</strong> to <strong>${SUNSET_DATE}</strong> and covers every address listed in the <a href="#/v1/migration" class="${link}">migration guide</a>.</p>
      </div>

      <div class="${card}">
        <h4 class="font-bold text-gray-900 dark:text-white mb-3">Deprecation headers</h4>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left border-collapse">
            <thead><tr class="border-b dark:border-gray-600"><th class="${th}">Header</th><th class="${th}">Example</th><th class="${th}">Meaning</th></tr></thead>
            <tbody>
              <tr class="border-b dark:border-gray-600"><td class="${tdStrong}">Deprecation</td><td class="${td}"><code>${DEPRECATION_HEADER}</code></td><td class="${td}">The address is deprecated. The value is the deprecation time as a Unix timestamp (RFC 9745).</td></tr>
              <tr class="border-b dark:border-gray-600"><td class="${tdStrong}">Sunset</td><td class="${td}"><code>${SUNSET_HTTP_DATE}</code></td><td class="${td}">When the address starts returning <code>410 Gone</code> (RFC 8594).</td></tr>
              <tr><td class="${tdStrong}">Link</td><td class="${td}"><code class="break-all">&lt;/api/v1/electricity/futures/download?format=csv&amp;control_area=PJM&gt;; rel="successor-version", &lt;https://docs.enerpricedata.com/&gt;; rel="deprecation"; type="text/html"</code></td><td class="${td}">The <code>successor-version</code> link is the new address with your query string carried over. The <code>deprecation</code> link points to these docs.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="${card}">
        <h4 class="font-bold text-gray-900 dark:text-white mb-3">What we change without notice</h4>
        <p class="text-gray-700 dark:text-gray-300">We may add endpoints, optional parameters, response fields and error codes at any time. Write clients that ignore fields they do not recognise. Removing or renaming an address, a parameter or a response field goes through a deprecation window.</p>
      </div>
    </div>
  `,
};

const changelog = {
  title: 'Changelog',
  description: 'Changes to the API that affect integrations, newest first.',
  content: `
    <div class="space-y-6">
      <div class="${card}">
        <h4 class="font-bold text-gray-900 dark:text-white mb-1">${DEPRECATION_DATE}</h4>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">New <code>/api/v1</code> addresses</p>
        <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>Every product has one address under <code>/api/v1/{commodity}/{product}</code>, with the file type in <code>format</code>. The old addresses are deprecated and return <code>410 Gone</code> from ${SUNSET_DATE}. See the <a href="#/v1/migration" class="${link}">migration guide</a>.</li>
          <li>Date parameters are named <code>start_publication_date</code> and <code>end_publication_date</code>, and the paging offset is <code>skip</code>.</li>
          <li>JSON downloads on the new addresses return <code>{"publication_date", "operating_date", "data"}</code>. Utility Price JSON adds the two dates next to <code>summary</code> and <code>details</code>.</li>
          <li>Fair Market Pricing and Comparative Savings use the default <strong>60 requests/minute per API key</strong>. Batch pricing keeps <strong>600 rows per day</strong> and <strong>2 jobs at a time</strong>.</li>
          <li>Errors on every address use RFC 9457 Problem Details with a stable <code>code</code> and a <code>request_id</code>.</li>
          <li>Every response carries <code>X-Request-ID</code>.</li>
          <li>A CSV or JSON request with <code>end_publication_date</code> returns <code>400</code> and points to Excel, which supports ranges.</li>
          <li>A Natural Gas Futures Excel range returns one sheet per Publication Date. The old address returned the first date only.</li>
          <li>New: <code>GET /api/v1/natural-gas/futures/settlement-points</code> lists valid settlement points.</li>
          <li>Documented: batch pricing for Fair Market Pricing and batch upload for Comparative Savings.</li>
        </ul>
      </div>
    </div>
  `,
};

const responseHeaders = {
  title: 'Response headers',
  description: 'Headers the API sets that your code may read.',
  content: `
    <div class="${card}">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left border-collapse">
          <thead><tr class="border-b dark:border-gray-600"><th class="${th}">Header</th><th class="${th}">Sent on</th><th class="${th}">Meaning</th></tr></thead>
          <tbody>
            <tr class="border-b dark:border-gray-600"><td class="${tdStrong}">X-Request-ID</td><td class="${td}">Every response</td><td class="${td}">A unique ID the API assigns to each request. Error bodies repeat it as <code>request_id</code>. Quote it when you contact support.</td></tr>
            <tr class="border-b dark:border-gray-600"><td class="${tdStrong}">Content-Type</td><td class="${td}">Every response</td><td class="${td}"><code>application/json</code> for JSON, <code>application/problem+json</code> for errors, and the file's own type for Excel, CSV and ZIP downloads.</td></tr>
            <tr class="border-b dark:border-gray-600"><td class="${tdStrong}">Content-Disposition</td><td class="${td}">File downloads</td><td class="${td}">The suggested file name, for example <code>attachment; filename="EPD_EnergyFutures_PJM_08242026.xlsx"</code>.</td></tr>
            <tr class="border-b dark:border-gray-600"><td class="${tdStrong}">Retry-After</td><td class="${td}"><code>429</code> responses</td><td class="${td}">Seconds to wait before the next request.</td></tr>
            <tr class="border-b dark:border-gray-600"><td class="${tdStrong}">Deprecation</td><td class="${td}">Deprecated addresses</td><td class="${td}">The address is deprecated. See the <a href="#/v1/deprecation-policy" class="${link}">deprecation policy</a>.</td></tr>
            <tr class="border-b dark:border-gray-600"><td class="${tdStrong}">Sunset</td><td class="${td}">Deprecated addresses</td><td class="${td}">The date the address starts returning <code>410 Gone</code>.</td></tr>
            <tr><td class="${tdStrong}">Link</td><td class="${td}">Deprecated addresses</td><td class="${td}">The replacement address (<code>rel="successor-version"</code>) and these docs (<code>rel="deprecation"</code>).</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
};

const colab = (file) => `https://colab.research.google.com/github/monkeyDepd/enerprice-api-docs/blob/main/frontend/notebooks/${file}`;
const colabButton = (file, label, tone) => `
  <a href="${colab(file)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center px-4 py-2 ${tone} text-white rounded-lg transition-colors">
    ${label}
    <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
    </svg>
  </a>`;

const notebook = {
  title: 'Example',
  description: 'Interactive Jupyter notebooks with a working Python example for every endpoint.',
  content: `
    <div class="space-y-6">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">New addresses</h3>
        <p class="text-blue-800 dark:text-blue-200 mb-4">Every example calls a <code>/api/v1</code> address. Start here for new integrations.</p>
        ${colabButton('demo.ipynb', 'Open in Google Colab', 'bg-blue-600 hover:bg-blue-700')}
      </div>
      <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3">Legacy addresses</h3>
        <p class="text-amber-900 dark:text-amber-100 mb-4">The same examples on the old addresses, which return <code>410 Gone</code> from ${SUNSET_DATE}. Use it to compare while you migrate.</p>
        ${colabButton('demo_legacy.ipynb', 'Open legacy notebook in Colab', 'bg-amber-600 hover:bg-amber-700')}
      </div>
    </div>
  `,
};

export const guides = {
  home,
  auth: legacy.auth,
  migration,
  errors: errorsPage,
  'response-headers': responseHeaders,
  'deprecation-policy': deprecationPolicy,
  changelog,
  notebook,
  support: legacy.support,
};
