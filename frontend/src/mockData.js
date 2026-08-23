import apiImage from './assets/api.png';



export const mockApiData = {
  home: {
    title: "EnerPrice API Documentation",
    description: "Welcome to the Comprehensive EnerPrice API documentation, your gateway to accessing Energy Futures data, Ancillary and Uplift charges, REC credits and portfolio standards, Utility Pricing data, and detailed rate structures through our powerful API.",
    content: `
      <div class="space-y-6">
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Getting Started</h3>
          <p class="text-blue-800 dark:text-blue-200">
          Begin by obtaining your API key through
          <a
            href="https://app.enerpricedata.com"
            target="_blank"
            rel="noopener noreferrer"
            class="underline text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
          >
            app.enerpricedata.com
          </a>
        </p>
        <p class="text-sm text-blue-800 dark:text-blue-200 mt-3">
          All dataset date parameters use <strong>start_operating_date</strong>, which refers to the <strong>Publication Date</strong> of the dataset.
        </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Base URL</h4>
            <code class="text-sm bg-gray-100 dark:bg-gray-900 px-3 py-1 rounded">https://api.enerpricedata.com</code>
          </div>
          
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Rate Limits</h4>
            <p class="text-sm text-gray-600 dark:text-gray-300">All endpoints are limited to <strong>60 requests/minute per API key</strong>. Exceeding the limit returns <code class="text-xs">HTTP 429</code> with a <code class="text-xs">Retry-After</code> header indicating how many seconds to wait before retrying.</p>
          </div>
        </div>

        <!-- Publishing Schedule Table -->
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mt-6">
          <h4 class="font-bold text-gray-900 dark:text-white mb-4">Publishing Schedule</h4>
          <table class="w-full text-sm text-left border-collapse">
            <thead>
              <tr class="border-b dark:border-gray-600">
                <th class="py-2 px-3 font-large text-gray-900 dark:text-gray-100">Curve Type</th>
                <th class="py-2 px-3 font-large text-gray-1000 dark:text-gray-100">Schedule</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:border-gray-600">
                <td class="py-2 px-3 font-semibold text-gray-1000 dark:text-gray-100">Electricity &amp; Natural Gas Futures</td>
                <td class="py-2 px-3 text-gray-600 dark:text-gray-300">Updated daily by 9:00 AM ET, reflecting the prior business day's close.</td>
              </tr>
              <tr class="border-b dark:border-gray-600">
                <td class="py-2 px-3 font-semibold text-gray-1000 dark:text-gray-100">Ancillary/Uplift</td>
                <td class="py-2 px-3 text-gray-600 dark:text-gray-300">All markets updated on the first business day of each month. The NYISO dataset is additionally updated on the first business day of each week.</td>
              </tr>
              <tr class="border-b dark:border-gray-600">
                <td class="py-2 px-3 font-semibold text-gray-1000 dark:text-gray-100">REC/RPS</td>
                <td class="py-2 px-3 text-gray-600 dark:text-gray-300">All markets updated on the first business day of each month.</td>
              </tr>
              <tr>
                <td class="py-2 px-3 font-semibold text-gray-1000 dark:text-gray-100">PTC Files</td>
                <td class="py-2 px-3 text-gray-600 dark:text-gray-300">Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  },

auth: {
    title: "Authentication & API Keys",
    content: `
    <div class="space-y-6">
      <p class="text-gray-800 dark:text-gray-300">
        Secure your API access with API key authentication. Each user can maintain one active API key.
      </p>
      <div class="flex justify-center">
        <img src="${apiImage}" alt="API Key Screenshot" class="w-full max-w-3xl h-auto rounded-md border shadow-md"/>
      </div>
      <ol class="list-decimal list-inside text-gray-700 dark:text-gray-200 space-y-2">
        <li>Login to your account at <a href="https://app.enerpricedata.com" class="text-blue-600 dark:text-blue-400 underline">app.enerpricedata.com</a></li>
        <li>Click on your profile icon at the top right corner.</li>
        <li>Click on <strong>Create new API Key</strong>, give it a name, and click <strong>Create</strong>.</li>
        <li><em>(Optional)</em> Click <strong>Regenerate API Key</strong> if you lost the previous one.</li>
      </ol>
    </div>
  `
},
  "energy-futures": {
    title: "Energy Futures Data",
    description: "Access comprehensive energy futures pricing data across multiple control areas and block types. Download data in Excel, CSV, or JSON formats.",
    endpoints: [
      {
        method: "GET",
        url: "/datasets/download/energy-futures",
        title: "Download Energy Futures (Excel)",
        description: "Download energy futures data in Excel format. Supports single date or date range downloads.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Start date for download (YYYY-MM-DD)" },
          { name: "end_operating_date", type: "date", required: false, description: "End date for bulk download (YYYY-MM-DD)" },
          { name: "control_area", type: "string", required: true, description: "Control area (ERCOT, ISONE, PJM, NYISO, MISO)" },
          { name: "block_types", type: "string", required: false, description: "Block types, comma-separated (7x8,2x16,5x16)" },
          { name: "start_date", type: "date", required: false, description: "Start date filter (YYYY-MM-DD)" },
          { name: "end_date", type: "date", required: false, description: "End date filter (YYYY-MM-DD)" }
        ],
        examples: {
          python: `
import requests

# Download Energy Futures Data
url = "https://api.enerpricedata.com/datasets/download/energy-futures"

headers = {
    "X-API-Key": "YOUR_API_KEY"
}

params = {
    # Publication Date. Electricity futures update daily by 9:00 AM ET, reflecting the prior business day's close.
    # Replace 2026-08-17 with a current Publication Date before running.
    "start_operating_date": "2026-08-17",
    "end_operating_date": "2026-08-17",
    "control_area": "ERCOT",
    "block_types": "7x8,2x16",
    # "start_date": "2026-09-01",             # Optional: delivery window start
    # "end_date": "2031-09-01",               # Optional: delivery window end
}

response = requests.get(url, headers=headers, params=params)

control_area = params["control_area"]
end_op_date = params.get("end_operating_date", params["start_operating_date"])
filename = f"EPD_EnergyFutures_{control_area}_{end_op_date}.xlsx"


if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"File downloaded successfully and saved as '{filename}'")
else:
    # If an error occurs, print status and response text
    print(f"Error {response.status_code}: {response.text}")
    
print("Energy futures data downloaded successfully!")`,
          javascript: `// Download Energy Futures Data
const params = new URLSearchParams({
  // Publication Date. Electricity futures update daily by 9:00 AM ET, reflecting the prior business day's close.
  // Replace 2026-08-17 with a current Publication Date before running.
  start_operating_date: '2026-08-17',
  end_operating_date: '2026-08-17',
  control_area: 'ERCOT',
  block_types: '7x8,2x16',
  // start_date: '2026-09-01',   // Optional: delivery window start
  // end_date: '2031-09-01'      // Optional: delivery window end
});

const controlArea = params.get("control_area");
const endDate = params.get("end_operating_date") || params.get("start_operating_date");
const filename = \`EPD_EnergyFutures_\${controlArea}_\${endDate}.xlsx\`;

const response = await fetch(\`https://api.enerpricedata.com/datasets/download/energy-futures?\${params}\`, {
  headers: {
    'X-API-Key': 'YOUR_API_KEY'
  }
});

const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = filename;
a.click();`,
          ruby: `require 'net/http'

uri = URI('https://api.enerpricedata.com/datasets/download/energy-futures')
params = {
  # Publication Date. Electricity futures update daily by 9:00 AM ET, reflecting the prior business day's close.
  # Replace 2026-08-17 with a current Publication Date before running.
  start_operating_date: "2026-08-17",
  end_operating_date: "2026-08-17",
  control_area: "ERCOT",
  block_types: "7x8,2x16",
  # start_date: "2026-09-01",   # Optional: delivery window start
  # end_date: "2031-09-01"      # Optional: delivery window end
}
uri.query = URI.encode_www_form(params)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.code.to_i == 200
  filename = "EPD_EnergyFutures_#{params[:control_area]}_#{params[:end_operating_date]}.xlsx"
  File.open(filename, 'wb') { |file| file.write(res.body) }
  puts "File downloaded successfully and saved as '#{filename}'"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. Electricity futures update daily by 9:00 AM ET, reflecting the prior business day's close.
# Replace 2026-08-17 with a current Publication Date before running.
curl -X GET "https://api.enerpricedata.com/datasets/download/energy-futures?start_operating_date=2026-08-17&end_operating_date=2026-08-17&control_area=ERCOT&block_types=7x8,2x16" \
  -H "X-API-Key: YOUR_API_KEY" \
  --output "EPD_EnergyFutures_ERCOT_2026-08-17.xlsx"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/energy-futures/csv",
        title: "Download Energy Futures (CSV)",
        description: "Download energy futures data in CSV format. Accepts a single Publication Date; date ranges are Excel-only.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Start date for download (YYYY-MM-DD)" },
          { name: "control_area", type: "string", required: true, description: "Control area (ERCOT, ISONE, PJM, NYISO, MISO)" },
          { name: "block_types", type: "string", required: false, description: "Block types, comma-separated (7x8,2x16,5x16)" },
          { name: "start_date", type: "date", required: false, description: "Start date filter (YYYY-MM-DD)" },
          { name: "end_date", type: "date", required: false, description: "End date filter (YYYY-MM-DD)" }
        ],
        examples: {
          python: `import requests

# Download Energy Futures Data
url = "https://api.enerpricedata.com/datasets/download/energy-futures/csv"

headers = {
    "X-API-Key": "YOUR_API_KEY"
}

params = {
    # Publication Date. Electricity futures update daily by 9:00 AM ET, reflecting the prior business day's close.
    # Replace 2026-08-17 with a current Publication Date before running.
    "start_operating_date": "2026-08-17",
    "control_area": "ERCOT",
    "block_types": "7x8,2x16",
    # "start_date": "2026-09-01",             # Optional: delivery window start
    # "end_date": "2031-09-01",               # Optional: delivery window end
}

response = requests.get(url, headers=headers, params=params)

control_area = params["control_area"]
start_op_date = params["start_operating_date"]
filename = f"EPD_EnergyFutures_{control_area}_{start_op_date}.csv"

if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"File downloaded successfully and saved as '{filename}'")
else:
    # status and response text
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `// Download Energy Futures Data
const params = new URLSearchParams({
  // Publication Date. Electricity futures update daily by 9:00 AM ET, reflecting the prior business day's close.
  // Replace 2026-08-17 with a current Publication Date before running.
  start_operating_date: "2026-08-17",
  end_operating_date: "2026-08-17",
  control_area: "ERCOT",
  block_types: "7x8,2x16",
  // start_date: "2026-09-01",   // Optional: delivery window start
  // end_date: "2031-09-01"      // Optional: delivery window end
});

const controlArea = params.get("control_area");
const endOpDate = params.get("end_operating_date") || params.get("start_operating_date");
const filename = \`EPD_EnergyFutures_\${controlArea}_\${endOpDate}.csv\`;

fetch(\`https://api.enerpricedata.com/datasets/download/energy-futures/csv?\${params.toString()}\`, {
  method: "GET",
  headers: {
    "X-API-Key": "YOUR_API_KEY"
  }
})
  .then(response => {
    if (!response.ok) throw new Error(\`Error \${response.status}: \${response.statusText}\`);
    return response.blob();
  })
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    console.log(\`Downloaded: \${filename}\`);
  })
  .catch(err => console.error("Download failed:", err));`,
          ruby: `require 'net/http'

uri = URI('https://api.enerpricedata.com/datasets/download/energy-futures/csv')
params = {
  # Publication Date. Electricity futures update daily by 9:00 AM ET, reflecting the prior business day's close.
  # Replace 2026-08-17 with a current Publication Date before running.
  start_operating_date: "2026-08-17",
  end_operating_date: "2026-08-17",
  control_area: "ERCOT",
  block_types: "7x8,2x16",
  # start_date: "2026-09-01",   # Optional: delivery window start
  # end_date: "2031-09-01"      # Optional: delivery window end
}

uri.query = URI.encode_www_form(params)
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request["X-API-Key"] = "YOUR_API_KEY"

response = http.request(request)

if response.code == "200"
  filename = "EPD_EnergyFutures_#{params[:control_area]}_#{params[:end_operating_date]}.csv"
  File.open(filename, "wb") { |file| file.write(response.body) }
  puts "File downloaded successfully and saved as '#{filename}'"
else
  puts "Error #{response.code}: #{response.body}"
end`,
          curl: `# Publication Date. Electricity futures update daily by 9:00 AM ET, reflecting the prior business day's close.
# Replace 2026-08-17 with a current Publication Date before running.
# Optional delivery-window filters: add --data-urlencode "start_date=2026-09-01" and "end_date=2031-09-01". Empty values are rejected with HTTP 422.
curl -X GET "https://api.enerpricedata.com/datasets/download/energy-futures/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  -G \
  --data-urlencode "start_operating_date=2026-08-17" \
  --data-urlencode "end_operating_date=2026-08-17" \
  --data-urlencode "control_area=ERCOT" \
  --data-urlencode "block_types=7x8,2x16" \
  -o "EPD_EnergyFutures_ERCOT_2026-08-17.csv"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/energy-futures/json",
        title: "Download Energy Futures (JSON)",
        description: "Download energy futures data as JSON with pagination support. Accepts a single Publication Date; date ranges are Excel-only.",
        parameters: [
            { name: "start_operating_date", type: "date", required: true, description: "Date for data download (YYYY-MM-DD)" },
            { name: "control_area", type: "string", required: true, description: "Control area (ERCOT, ISONE, PJM, NYISO, MISO)" },
            { name: "block_types", type: "string", required: false, description: "Block types, Comma-separated (7x8,2x16,5x16) if not specified." },
            { name: "start_date", type: "date", required: false, description: "Start date filter (YYYY-MM-DD)" },
            { name: "end_date", type: "date", required: false, description: "End date filter (YYYY-MM-DD)" },
            { name: "raw", type: "boolean", required: false, description: "Return raw JSON response instead of file download" },
            { name: "skip", type: "integer", required: false, description: "Pagination offset for results" },
            { name: "limit", type: "integer", required: false, description: "Maximum number of results to return (max 1000)" }
        ],
        examples: {
          python: `import requests
import json

# Get Energy Futures JSON Data
url = "https://api.enerpricedata.com/datasets/download/energy-futures/json"

headers = {
    "X-API-Key": "YOUR_API_KEY"
}

params = {
    # Publication Date. Electricity futures update daily by 9:00 AM ET, reflecting the prior business day's close.
    # Replace 2026-08-17 with a current Publication Date before running.
    "start_operating_date": "2026-08-17",        # Required
    "control_area": "ERCOT",                     # ERCOT, PJM, ISONE, etc.
    "block_types": "7x8,2x16",                   # Optional: e.g., 7x8,2x16,5x16, etc. e.g., "7x8","2x16","5x16" -- By Default ALL 
    "start_date": "2026-09-01",                  # Optional: filter start
    "end_date": "2030-09-01",                    # Optional: filter end
    "raw": False,                                # Optional: if True, return raw JSON instead of file
    "skip": 0,                                   # Optional: pagination skip
    "limit": 100                                 # Optional: pagination limit (max 1000)
}

response = requests.get(url, headers=headers, params=params)

control_area = params["control_area"]
start_op_date = params["start_operating_date"]
filename = f"EPD_EnergyFutures_{control_area}_{start_op_date}.json"

if response.status_code == 200:
    if params.get("raw"):
        # If raw=True, response is JSON data directly
        data = response.json()
        print(f" Raw JSON data received: {len(data)} records")
        print(f"Sample record: {data[0] if data else 'No data'}")
    else:
        # If raw=False or not specified, response is a file
        data = response.json()
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f" File downloaded successfully and saved as '{filename}'")
else:
    print(f" Error {response.status_code}: {response.text}")`,
          javascript: `// Get Energy Futures JSON Data
const params = new URLSearchParams({
    // Publication Date. Electricity futures update daily by 9:00 AM ET, reflecting the prior business day's close.
    // Replace 2026-08-17 with a current Publication Date before running.
    start_operating_date: '2026-08-17',
    control_area: 'ERCOT',
    raw: 'true'
});

const response = await fetch(\`https://api.enerpricedata.com/datasets/download/energy-futures/json?\${params}\`, {
    headers: {
        'X-API-Key': 'YOUR_API_KEY'
    }
});

const data = await response.json();
console.log('Retrieved energy futures records');
console.log('Sample data structure available');`,
          ruby: `require 'net/http'
require 'json'

base_url = "https://api.enerpricedata.com"
endpoint = "/datasets/download/energy-futures/json"

params = {
  # Publication Date. Electricity futures update daily by 9:00 AM ET, reflecting the prior business day's close.
  # Replace 2026-08-17 with a current Publication Date before running.
  start_operating_date: "2026-08-17",
  end_operating_date: "2026-08-17",
  control_area: "ERCOT",
  block_types: "",
  start_date: "2026-09-01",
  end_date: "2030-09-01"
}

uri = URI("#{base_url}#{endpoint}")
uri.query = URI.encode_www_form(params)

request = Net::HTTP::Get.new(uri)
request["X-API-Key"] = "YOUR_API_KEY"

response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
  http.request(request)
end

if response.is_a?(Net::HTTPSuccess)
  data = JSON.parse(response.body)
  filename = "EPD_EnergyFutures_ERCOT_2026-08-17.json"
  File.write(filename, JSON.pretty_generate(data))
  puts "File downloaded and saved as '#{filename}'"
else
  puts "Error #{response.code}: #{response.body}"
end`,
          curl: `# Publication Date. Electricity futures update daily by 9:00 AM ET, reflecting the prior business day's close.
# Replace 2026-08-17 with a current Publication Date before running.
curl -X GET "https://api.enerpricedata.com/datasets/download/energy-futures/json?start_operating_date=2026-08-17&end_operating_date=2026-08-17&control_area=ERCOT&block_types=&start_date=2026-09-01&end_date=2030-09-01" \
  -H "X-API-Key: YOUR_API_KEY" \
  -o "EPD_EnergyFutures_ERCOT_2026-08-17.json"`
        }
      },
      
    ]
  },

  "natgas-energy-futures": {
    title: "Natural Gas Energy Futures Data",
    description: "Access Natural Gas <strong>futures</strong> (forward curve) pricing: monthly baseload gas prices published as a single combined dataset covering all settlement points. Download in Excel, CSV, or JSON.<br/><br/><strong>Data availability:</strong> curves are published on business days.",
    endpoints: [
      {
        method: "GET",
        url: "/datasets/download/naturalgas-futures",
        title: "Download Natural Gas Energy Futures (Excel)",
        description: "Download the natural gas futures curve for a Publication Date as an Excel workbook.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Publication Date of the curve (YYYY-MM-DD)" },
          { name: "settlement_point", type: "string", required: false, description: "Filter to a single settlement point. Case sensitive; must be passed exactly. Omit for all points." },
          { name: "start_date", type: "date", required: false, description: "Curve (delivery) start date filter (YYYY-MM-DD)" },
          { name: "end_date", type: "date", required: false, description: "Curve (delivery) end date filter (YYYY-MM-DD)" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/datasets/download/naturalgas-futures"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {
    # Publication Date. Natural gas futures update daily by 9:00 AM ET, reflecting the prior business day's close.
    # Replace 2026-08-17 with a current Publication Date before running.
    "start_operating_date": "2026-08-17",   # Required: curve Publication Date
    "settlement_point": "",                  # Optional: single settlement point; blank = all
    # "start_date": "2026-09-01",             # Optional: curve delivery start filter
    # "end_date": "2031-09-01",               # Optional: curve delivery end filter
}

response = requests.get(url, headers=headers, params=params)

filename = f"EPD_NaturalGasFutures_{params['start_operating_date']}.xlsx"

if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"File downloaded successfully and saved as '{filename}'")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const url = new URL('https://api.enerpricedata.com/datasets/download/naturalgas-futures');
const params = {
  // Publication Date. Natural gas futures update daily by 9:00 AM ET, reflecting the prior business day's close.
  // Replace 2026-08-17 with a current Publication Date before running.
  'start_operating_date': '2026-08-17'
};
Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const filename = \`EPD_NaturalGasFutures_\${params.start_operating_date}.xlsx\`;
const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync(filename, buffer);
console.log(\`Saved as \${filename}\`);`,
          ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.enerpricedata.com/datasets/download/naturalgas-futures')
uri.query = URI.encode_www_form(
  # Publication Date. Natural gas futures update daily by 9:00 AM ET, reflecting the prior business day's close.
  # Replace 2026-08-17 with a current Publication Date before running.
  'start_operating_date' => '2026-08-17'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_NaturalGasFutures_2026-08-17.xlsx"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. Natural gas futures update daily by 9:00 AM ET, reflecting the prior business day's close.
# Replace 2026-08-17 with a current Publication Date before running.
curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-futures" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2026-08-17" \
  -o "EPD_NaturalGasFutures_2026-08-17.xlsx"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/naturalgas-futures/csv",
        title: "Download Natural Gas Energy Futures (CSV)",
        description: "Download the natural gas futures curve for a Publication Date as a CSV file. Accepts a single Publication Date; date ranges are Excel-only.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Publication Date of the curve (YYYY-MM-DD)" },
          { name: "settlement_point", type: "string", required: false, description: "Filter to a single settlement point. Case sensitive; must be passed exactly. Omit for all points." },
          { name: "start_date", type: "date", required: false, description: "Curve (delivery) start date filter (YYYY-MM-DD)" },
          { name: "end_date", type: "date", required: false, description: "Curve (delivery) end date filter (YYYY-MM-DD)" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/datasets/download/naturalgas-futures/csv"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {
    # Publication Date. Natural gas futures update daily by 9:00 AM ET, reflecting the prior business day's close.
    # Replace 2026-08-17 with a current Publication Date before running.
    "start_operating_date": "2026-08-17",   # Required: curve Publication Date
    "settlement_point": "",                  # Optional: single settlement point; blank = all
    # "start_date": "2026-09-01",             # Optional: curve delivery start filter
    # "end_date": "2031-09-01",               # Optional: curve delivery end filter
}

response = requests.get(url, headers=headers, params=params)

filename = f"EPD_NaturalGasFutures_{params['start_operating_date']}.csv"

if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"File downloaded successfully and saved as '{filename}'")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const url = new URL('https://api.enerpricedata.com/datasets/download/naturalgas-futures/csv');
const params = {
  // Publication Date. Natural gas futures update daily by 9:00 AM ET, reflecting the prior business day's close.
  // Replace 2026-08-17 with a current Publication Date before running.
  'start_operating_date': '2026-08-17'
};
Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const filename = \`EPD_NaturalGasFutures_\${params.start_operating_date}.csv\`;
const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync(filename, buffer);
console.log(\`Saved as \${filename}\`);`,
          ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.enerpricedata.com/datasets/download/naturalgas-futures/csv')
uri.query = URI.encode_www_form(
  # Publication Date. Natural gas futures update daily by 9:00 AM ET, reflecting the prior business day's close.
  # Replace 2026-08-17 with a current Publication Date before running.
  'start_operating_date' => '2026-08-17'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_NaturalGasFutures_2026-08-17.csv"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. Natural gas futures update daily by 9:00 AM ET, reflecting the prior business day's close.
# Replace 2026-08-17 with a current Publication Date before running.
curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-futures/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2026-08-17" \
  -o "EPD_NaturalGasFutures_2026-08-17.csv"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/naturalgas-futures/json",
        title: "Download Natural Gas Energy Futures (JSON)",
        description: "Returns the natural gas futures curve as JSON. Set <code>raw=true</code> for an inline, paginated JSON response of the form <code>{ data, total, page, size }</code>. Accepts a single Publication Date; date ranges are Excel-only.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Publication Date of the curve (YYYY-MM-DD)" },
          { name: "settlement_point", type: "string", required: false, description: "Filter to a single settlement point. Case sensitive; must be passed exactly. Omit for all points." },
          { name: "start_date", type: "date", required: false, description: "Curve (delivery) start date filter (YYYY-MM-DD)" },
          { name: "end_date", type: "date", required: false, description: "Curve (delivery) end date filter (YYYY-MM-DD)" },
          { name: "raw", type: "boolean", required: false, description: "If true, returns inline paginated JSON instead of a file download" },
          { name: "skip", type: "integer", required: false, description: "Pagination offset. Only applies when raw=true" },
          { name: "limit", type: "integer", required: false, description: "Page size (1–1000, default 100). Only applies when raw=true" }
        ],
        examples: {
          python: `import json
import requests

url = "https://api.enerpricedata.com/datasets/download/naturalgas-futures/json"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {
    # Publication Date. Natural gas futures update daily by 9:00 AM ET, reflecting the prior business day's close.
    # Replace 2026-08-17 with a current Publication Date before running.
    "start_operating_date": "2026-08-17",   # Required
    "settlement_point": "",                  # Optional
    "raw": False,                            # Optional: True returns inline paginated JSON
    "skip": 0,                               # Optional: only used when raw=True
    "limit": 100                             # Optional: only used when raw=True (max 1000)
}

response = requests.get(url, headers=headers, params=params)

filename = f"EPD_NaturalGasFutures_{params['start_operating_date']}.json"

if response.status_code == 200:
    if params.get("raw"):
        data = response.json()
        print(f"Page {data['page']}: {data['size']} of {data['total']} records")
        print(f"Sample record: {data['data'][0] if data['data'] else 'No data'}")
    else:
        data = response.json()
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f"File downloaded successfully and saved as '{filename}'")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const url = new URL('https://api.enerpricedata.com/datasets/download/naturalgas-futures/json');
const params = {
  // Publication Date. Natural gas futures update daily by 9:00 AM ET, reflecting the prior business day's close.
  // Replace 2026-08-17 with a current Publication Date before running.
  'start_operating_date': '2026-08-17',
  'raw': 'false',
  'skip': 0,
  'limit': 100
};
Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const data = await response.json();
if (params.raw === 'true') {
  console.log(\`Page \${data.page}: \${data.size} of \${data.total} records\`);
} else {
  const filename = \`EPD_NaturalGasFutures_\${params.start_operating_date}.json\`;
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(\`Saved as \${filename}\`);
}`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('https://api.enerpricedata.com/datasets/download/naturalgas-futures/json')
uri.query = URI.encode_www_form(
  # Publication Date. Natural gas futures update daily by 9:00 AM ET, reflecting the prior business day's close.
  # Replace 2026-08-17 with a current Publication Date before running.
  'start_operating_date' => '2026-08-17',
  'raw' => false,
  'skip' => 0,
  'limit' => 100
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  data = JSON.parse(res.body)
  if data.is_a?(Hash) && data.key?('data')
    puts "Page #{data['page']}: #{data['size']} of #{data['total']} records"
  else
    filename = "EPD_NaturalGasFutures_2026-08-17.json"
    File.write(filename, JSON.pretty_generate(data))
    puts "Saved as #{filename}"
  end
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. Natural gas futures update daily by 9:00 AM ET, reflecting the prior business day's close.
# Replace 2026-08-17 with a current Publication Date before running.
# raw=false (default): save the JSON file:
curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-futures/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2026-08-17" \
  -o "EPD_NaturalGasFutures_2026-08-17.json"

# raw=true: print inline paginated JSON:
# curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-futures/json" \
#   -H "X-API-Key: YOUR_API_KEY" \
#   --data-urlencode "raw=true" \
#   --data-urlencode "start_operating_date=2026-08-17" \
#   --data-urlencode "limit=100"`
        }
      }
    ]
  },

  ancillary: {
    title: "Ancillary Uplift Data",
    description: "Access ancillary services uplift data across different control areas. Download in Excel, CSV, or JSON formats with comprehensive filtering options.",
    endpoints: [
      {
        method: "GET",
        url: "/datasets/download/ancillary-uplift",
        title: "Download Ancillary Uplift (Excel)",
        description: "Download ancillary uplift data in Excel format.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Start date for download (YYYY-MM-DD)" },
          { name: "end_operating_date", type: "date", required: false, description: "End date for bulk download" },
          { name: "control_area", type: "string", required: true, description: "Control area (ERCOT, PJM, ISONE, NYISO)" },
          { name: "start_date", type: "date", required: false, description: "Start date filter (YYYY-MM-DD)" },
          { name: "end_date", type: "date", required: false, description: "End date filter (YYYY-MM-DD)" },
        ],
        examples: {
          python: `import requests

# Download Ancillary Uplift Data
url = "https://api.enerpricedata.com/datasets/download/ancillary-uplift"
headers = {
    "X-API-Key": "YOUR_API_KEY"
}
params = {
    # Publication Date. Ancillary/Uplift updates on the first business day of each month (2026-07-31 for ERCOT, PJM and ISONE).
    # The NYISO dataset is additionally updated on the last business day of each week - for NYISO pass control_area=NYISO with a weekly date such as 2026-08-14.
    # Replace with a current Publication Date before running.
    "start_operating_date": "2026-07-31",        # Required
    "end_operating_date": "2026-07-31",          # Optional, for date range
    "control_area": "ERCOT",                       # ERCOT, PJM, ISONE, etc.
    "start_date": "2026-09-01",                  # Optional: filter start
    "end_date": "2030-09-01"                     # Optional: filter end
}

response = requests.get(url, headers=headers, params=params)

control_area = params["control_area"]
end_op_date = params.get("end_operating_date", params["start_operating_date"])
filename = f"EPD_AncillaryUplift_{control_area}_{end_op_date}.xlsx"

if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f" File downloaded successfully and saved as '{filename}'")
else:
    print(f" Error {response.status_code}: {response.text}")`,
          javascript: `const params = new URLSearchParams({
  // Publication Date. Ancillary/Uplift updates on the first business day of each month (2026-07-31 for ERCOT, PJM and ISONE).
  // The NYISO dataset is additionally updated on the last business day of each week - for NYISO pass control_area=NYISO with a weekly date such as 2026-08-14.
  // Replace with a current Publication Date before running.
  start_operating_date: '2026-07-31',
  end_operating_date: '2026-07-31',
  control_area: 'ERCOT',
  start_date: '2026-09-01',
  end_date: '2030-09-01'
});

const response = await fetch(\`https://api.enerpricedata.com/datasets/download/ancillary-uplift?\${params}\`, {
  headers: {
    'X-API-Key': 'YOUR_API_KEY'
  }
});

const blob = await response.blob();
// Handle file download...
const controlArea = params.get('control_area');
const endOpDate = params.get('end_operating_date') || params.get('start_operating_date');
const filename = \`EPD_AncillaryUplift_\${controlArea}_\${endOpDate}.xlsx\`;

const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = filename;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
console.log(\`File downloaded successfully and saved as '\${filename}'\`);`,
          ruby: `require 'net/http'

uri = URI('https://api.enerpricedata.com/datasets/download/ancillary-uplift')
params = {
  # Publication Date. Ancillary/Uplift updates on the first business day of each month (2026-07-31 for ERCOT, PJM and ISONE).
  # The NYISO dataset is additionally updated on the last business day of each week - for NYISO pass control_area=NYISO with a weekly date such as 2026-08-14.
  # Replace with a current Publication Date before running.
  start_operating_date: '2026-07-31',
  end_operating_date: '2026-07-31',
  control_area: 'ERCOT',
  start_date: '2026-09-01',
  end_date: '2030-09-01'
}
uri.query = URI.encode_www_form(params)

request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'YOUR_API_KEY'

response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(request) }

if response.is_a?(Net::HTTPSuccess)
  filename = "EPD_AncillaryUplift_#{params[:control_area]}_#{params[:end_operating_date]}.xlsx"
  File.binwrite(filename, response.body)
  puts "File downloaded successfully and saved as '#{filename}'"
else
  puts "Error #{response.code}: #{response.body}"
end`,
          curl: `# Publication Date. Ancillary/Uplift updates on the first business day of each month (2026-07-31 for ERCOT, PJM and ISONE).
# The NYISO dataset is additionally updated on the last business day of each week - for NYISO pass control_area=NYISO with a weekly date such as 2026-08-14.
# Replace with a current Publication Date before running.
curl -X GET "https://api.enerpricedata.com/datasets/download/ancillary-uplift?start_operating_date=2026-07-31&end_operating_date=2026-07-31&control_area=ERCOT&start_date=2026-09-01&end_date=2030-09-01" \
  -H "X-API-Key: YOUR_API_KEY" \
  -o EPD_AncillaryUplift_ERCOT_2026-07-31.xlsx`

        }
      },
      {
        method: "GET",
        url: "/datasets/download/ancillary-uplift/csv",
        title: "Download Ancillary Uplift Curves (CSV)",
        description: "Download ancillary uplift data in CSV format. Accepts a single Publication Date; date ranges are Excel-only.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Start date for download (YYYY-MM-DD)" },
          { name: "control_area", type: "string", required: true, description: "Control area (ERCOT, PJM, ISONE, NYISO)" },
          { name: "start_date", type: "date", required: false, description: "Start date filter (YYYY-MM-DD)" },
          { name: "end_date", type: "date", required: false, description: "End date filter (YYYY-MM-DD)" }
        ],
        examples: {
          python: `import requests

# Download Ancillary Uplift Data (CSV)
url = "https://api.enerpricedata.com/datasets/download/ancillary-uplift/csv"

headers = {
    "X-API-Key": "YOUR_API_KEY"
}

params = {
    # Publication Date. Ancillary/Uplift updates on the first business day of each month (2026-07-31 for ERCOT, PJM and ISONE).
    # The NYISO dataset is additionally updated on the last business day of each week - for NYISO pass control_area=NYISO with a weekly date such as 2026-08-14.
    # Replace with a current Publication Date before running.
    "start_operating_date": "2026-07-31",        # Required
    "control_area": "ERCOT",                       # ERCOT, PJM, ISONE, etc.
    "start_date": "2026-09-01",                  # Optional: filter start
    "end_date": "2030-09-01"                     # Optional: filter end
}
response = requests.get(url, headers=headers, params=params)

control_area = params["control_area"]
start_op_date = params["start_operating_date"]
filename = f"EPD_AncillaryUplift_{control_area}_{start_op_date}.csv"

if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f" File downloaded successfully and saved as '{filename}'")
else:
    print(f" Error {response.status_code}: {response.text}")`,
          javascript: `const params = new URLSearchParams({
  // Publication Date. Ancillary/Uplift updates on the first business day of each month (2026-07-31 for ERCOT, PJM and ISONE).
  // The NYISO dataset is additionally updated on the last business day of each week - for NYISO pass control_area=NYISO with a weekly date such as 2026-08-14.
  // Replace with a current Publication Date before running.
  start_operating_date: "2026-07-31",
  end_operating_date: "2026-07-31",
  control_area: "ERCOT",
  start_date: "2026-09-01",
  end_date: "2030-09-01"
});

const controlArea = params.get("control_area");
const endOpDate = params.get("end_operating_date") || params.get("start_operating_date");
const filename = \`EPD_AncillaryUplift_\${controlArea}_\${endOpDate}.csv\`;

fetch(\`https://api.enerpricedata.com/datasets/download/ancillary-uplift/csv?\${params.toString()}\`, {
  method: "GET",
  headers: {
    "X-API-Key": "YOUR_API_KEY"
  }
})
  .then(response => {
    if (!response.ok) throw new Error(\`Error \${response.status}: \${response.statusText}\`);
    return response.blob();
  })
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    console.log(\`Downloaded: \${filename}\`);
  })
  .catch(err => console.error("Download failed:", err));`,
            ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.enerpricedata.com/datasets/download/ancillary-uplift/csv')
params = {
  # Publication Date. Ancillary/Uplift updates on the first business day of each month (2026-07-31 for ERCOT, PJM and ISONE).
  # The NYISO dataset is additionally updated on the last business day of each week - for NYISO pass control_area=NYISO with a weekly date such as 2026-08-14.
  # Replace with a current Publication Date before running.
  start_operating_date: "2026-07-31",
  end_operating_date: "2026-07-31",
  control_area: "ERCOT",
  start_date: "2026-09-01",
  end_date: "2030-09-01"
}

uri.query = URI.encode_www_form(params)
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)
request["X-API-Key"] = "YOUR_API_KEY"

response = http.request(request)

if response.code == "200"
  filename = "EPD_AncillaryUplift_#{params[:control_area]}_#{params[:start_operating_date]}.csv"
  File.open(filename, "wb") { |file| file.write(response.body) }
  puts "File downloaded successfully and saved as '#{filename}'"
else
  puts "Error #{response.code}: #{response.body}"
end`,
          curl: `# Publication Date. Ancillary/Uplift updates on the first business day of each month (2026-07-31 for ERCOT, PJM and ISONE).
# The NYISO dataset is additionally updated on the last business day of each week - for NYISO pass control_area=NYISO with a weekly date such as 2026-08-14.
# Replace with a current Publication Date before running.
START_OP_DATE="2026-07-31"
CONTROL_AREA="ERCOT"

curl -X GET "https://api.enerpricedata.com/datasets/download/ancillary-uplift/csv" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -G \\
  --data-urlencode "start_operating_date=\${START_OP_DATE}" \\
  --data-urlencode "end_operating_date=\${START_OP_DATE}" \\
  --data-urlencode "control_area=\${CONTROL_AREA}" \\
  --data-urlencode "start_date=2026-09-01" \\
  --data-urlencode "end_date=2030-09-01" \\
  -o "EPD_AncillaryUplift_\${CONTROL_AREA}_\${START_OP_DATE}.csv"`
}
      },
      {
        method: "GET",
        url: "/datasets/download/ancillary-uplift/json",
        title: "Download Ancillary Uplift  (JSON)",
        description: "Download ancillary uplift data as JSON with pagination support. Accepts a single Publication Date; date ranges are Excel-only.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Date for data download (YYYY-MM-DD)" },
          { name: "control_area", type: "string", required: true, description: "Control area (ERCOT, PJM, ISONE, NYISO)" },
          { name: "start_date", type: "date", required: false, description: "Start date filter (YYYY-MM-DD)" },
          { name: "end_date", type: "date", required: false, description: "End date filter (YYYY-MM-DD)" },
          { name: "raw", type: "boolean", required: false, description: "Return raw JSON response instead of file download" },
          { name: "skip", type: "integer", required: false, description: "Pagination offset for results" },
          { name: "limit", type: "integer", required: false, description: "Maximum number of results to return (max 1000)" }
],
        examples: {
          python: `import json
import requests

# Get Ancillary Uplift JSON Data
url = "https://api.enerpricedata.com/datasets/download/ancillary-uplift/json"

headers = {
    "X-API-Key": "YOUR_API_KEY"
}

params = {
    # Publication Date. Ancillary/Uplift updates on the first business day of each month (2026-07-31 for ERCOT, PJM and ISONE).
    # The NYISO dataset is additionally updated on the last business day of each week - for NYISO pass control_area=NYISO with a weekly date such as 2026-08-14.
    # Replace with a current Publication Date before running.
    "start_operating_date": "2026-07-31",        # Required
    "control_area": "ERCOT",                     # ERCOT, ISONE, NYISO, ERCOT
    "start_date": "2026-09-01",                  # Optional: filter start
    "end_date": "2030-09-01",                    # Optional: filter end
    "raw": False,                                # Optional: if True, return raw JSON instead of file
    "skip": 0,                                   # Optional: pagination skip
    "limit": 100                                 # Optional: pagination limit (max 1000)
}

response = requests.get(url, headers=headers, params=params)

control_area = params["control_area"]
start_op_date = params["start_operating_date"]
filename = f"EPD_AncillaryUplift_{control_area}_{start_op_date}.json"

if response.status_code == 200:
    if params.get("raw"):
        # If raw=True, response is JSON data directly
        data = response.json()
        print(f" Raw JSON data received: {len(data)} records")
        print(f"Sample record: {data[0] if data else 'No data'}")
    else:
        # If raw=False or not specified, response is a file
        data = response.json()
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f" File downloaded successfully and saved as '{filename}'")
else:
    print(f" Error {response.status_code}: {response.text}")`,
          javascript: `// Get Ancillary Uplift JSON Data
const params = new URLSearchParams({
    // Publication Date. Ancillary/Uplift updates on the first business day of each month (2026-07-31 for ERCOT, PJM and ISONE).
    // The NYISO dataset is additionally updated on the last business day of each week - for NYISO pass control_area=NYISO with a weekly date such as 2026-08-14.
    // Replace with a current Publication Date before running.
    start_operating_date: '2026-07-31',
    control_area: 'ERCOT',
    start_date: '2026-09-01',
    end_date: '2030-09-01',
    raw: 'false',
    skip: '0',
    limit: '100'
});


const response = await fetch(\`https://api.enerpricedata.com/datasets/download/ancillary-uplift/json?\${params}\`, {
    headers: {
        'X-API-Key': 'YOUR_API_KEY'
    }
});

const data = await response.json();
console.log('Retrieved ancillary uplift records');
console.log('Sample data structure available');`,
          ruby: `require 'net/http'
require 'json'

base_url = "https://api.enerpricedata.com"
endpoint = "/datasets/download/ancillary-uplift/json"

params = {
  # Publication Date. Ancillary/Uplift updates on the first business day of each month (2026-07-31 for ERCOT, PJM and ISONE).
  # The NYISO dataset is additionally updated on the last business day of each week - for NYISO pass control_area=NYISO with a weekly date such as 2026-08-14.
  # Replace with a current Publication Date before running.
  start_operating_date: "2026-07-31",
  control_area: "ERCOT",
  start_date: "2026-09-01",
  end_date: "2030-09-01"
}

uri = URI("#{base_url}#{endpoint}")
uri.query = URI.encode_www_form(params)

request = Net::HTTP::Get.new(uri)
request["X-API-Key"] = "YOUR_API_KEY"

response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
  http.request(request)
end

if response.is_a?(Net::HTTPSuccess)
  data = JSON.parse(response.body)
  filename = "EPD_AncillaryUplift_#{params[:control_area]}_#{params[:start_operating_date]}.json"
  File.write(filename, JSON.pretty_generate(data))
  puts "File downloaded and saved as '#{filename}'"
else
  puts "Error #{response.code}: #{response.body}"
end`,
          curl: `# Publication Date. Ancillary/Uplift updates on the first business day of each month (2026-07-31 for ERCOT, PJM and ISONE).
# The NYISO dataset is additionally updated on the last business day of each week - for NYISO pass control_area=NYISO with a weekly date such as 2026-08-14.
# Replace with a current Publication Date before running.
curl -X GET "https://api.enerpricedata.com/datasets/download/ancillary-uplift/json?start_operating_date=2026-07-31&control_area=ERCOT&start_date=2026-09-01&end_date=2030-09-01" \
  -H "X-API-Key: YOUR_API_KEY" \
  -o "EPD_AncillaryUplift_ERCOT_2026-07-31.json"`
        }
      },
      

    ]
  },

  "rec-rps": {
    title: "REC/RPS Data",
    description: "Access Renewable Energy Certificate (REC) and Renewable Portfolio Standard (RPS) data across control areas.",
    endpoints: [
      {
        method: "GET",
        url: "/datasets/download/rec-rps",
        title: "Download REC/RPS Data (Excel)",
        description: "Download REC/RPS data in Excel format.",
        parameters: [
        { name: "start_operating_date", type: "date", required: true, description: "Start date for download (YYYY-MM-DD)" },
        { name: "end_operating_date", type: "date", required: false, description: "End date for bulk download (YYYY-MM-DD)" },
        { name: "control_area", type: "string", required: true, description: "Control area (ERCOT, ISONE, PJM, NYISO)" },
        { name: "start_date", type: "date", required: false, description: "Start date filter for historical data" },
        { name: "end_date", type: "date", required: false, description: "End date filter for historical data" }
],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/datasets/download/rec-rps"
headers = {"X-API-Key": "YOUR_API_KEY"}
params = {
    # Publication Date. REC/RPS updates on the first business day of each month.
    # Replace 2026-07-31 with a current Publication Date before running.
    "start_operating_date": "2026-07-31",        # Required
    "control_area": "ERCOT",                     # ERCOT, PJM, ISONE, etc.
    "start_date": "2026-09-01",                  # Optional: filter start
    "end_date": "2030-09-01"                     # Optional: filter end
}

response = requests.get(url, headers=headers, params=params)

control_area = params["control_area"]
end_op_date = params.get("end_operating_date", params["start_operating_date"])
filename = f"EPD_REC_RPS_{control_area}_{end_op_date}.xlsx"

if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f" File downloaded successfully and saved as '{filename}'")
else:
    print(f" Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const url = new URL('https://api.enerpricedata.com/datasets/download/rec-rps');
const params = {
  // Publication Date. REC/RPS updates on the first business day of each month.
  // Replace 2026-07-31 with a current Publication Date before running.
  'start_operating_date': '2026-07-31',
  'control_area': 'ERCOT',
  'start_date': '2026-09-01',
  'end_date': '2030-09-01'
};
Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const filename = \`EPD_REC_RPS_\${params.control_area}_\${params.end_operating_date || params.start_operating_date}.xlsx\`;
const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync(filename, buffer);
console.log(\`Saved as \${filename}\`);`,
          ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.enerpricedata.com/datasets/download/rec-rps')
uri.query = URI.encode_www_form(
  # Publication Date. REC/RPS updates on the first business day of each month.
  # Replace 2026-07-31 with a current Publication Date before running.
  'start_operating_date' => '2026-07-31',
  'control_area' => 'ERCOT',
  'start_date' => '2026-09-01',
  'end_date' => '2030-09-01'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_REC_RPS_ERCOT_2026-07-31.xlsx"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. REC/RPS updates on the first business day of each month.
# Replace 2026-07-31 with a current Publication Date before running.
curl -G "https://api.enerpricedata.com/datasets/download/rec-rps" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2026-07-31" \
  --data-urlencode "control_area=ERCOT" \
  --data-urlencode "start_date=2026-09-01" \
  --data-urlencode "end_date=2030-09-01" \
  -o "EPD_REC_RPS_ERCOT_2026-07-31.xlsx"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/rec-rps/csv",
        title: "Download REC/RPS Data (CSV)",
        description: "Download REC/RPS data in CSV format. Accepts a single Publication Date; date ranges are Excel-only.",
        parameters: [
        { name: "start_operating_date", type: "date", required: true, description: "Start date for download" },
        { name: "control_area", type: "string", required: true, description: "Control area (ERCOT, ISONE, PJM, NYISO)" },
        { name: "start_date", type: "date", required: false, description: "Start date filter for historical data" },
        { name: "end_date", type: "date", required: false, description: "End date filter for historical data" }
],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/datasets/download/rec-rps/csv"
headers = {"X-API-Key": "YOUR_API_KEY"}
params = {
    # Publication Date. REC/RPS updates on the first business day of each month.
    # Replace 2026-07-31 with a current Publication Date before running.
    "start_operating_date": "2026-07-31",        # Required
    "control_area": "ERCOT",                     # ERCOT, PJM, ISONE, etc.
    "start_date": "2026-09-01",                  # Optional: filter start
    "end_date": "2030-09-01"                     # Optional: filter end
}

response = requests.get(url, headers=headers, params=params)

control_area = params["control_area"]
start_op_date = params["start_operating_date"]
filename = f"EPD_REC_RPS_{control_area}_{start_op_date}.csv"

if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f" File downloaded successfully and saved as '{filename}'")
else:
    print(f" Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const url = new URL('https://api.enerpricedata.com/datasets/download/rec-rps/csv');
const params = {
  // Publication Date. REC/RPS updates on the first business day of each month.
  // Replace 2026-07-31 with a current Publication Date before running.
  'start_operating_date': '2026-07-31',
  'control_area': 'ERCOT',
  'start_date': '2026-09-01',
  'end_date': '2030-09-01'
};
Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const filename = \`EPD_REC_RPS_\${params.control_area}_\${params.start_operating_date}.csv\`;
const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync(filename, buffer);
console.log(\`Saved as \${filename}\`);`,
          ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.enerpricedata.com/datasets/download/rec-rps/csv')
uri.query = URI.encode_www_form(
  # Publication Date. REC/RPS updates on the first business day of each month.
  # Replace 2026-07-31 with a current Publication Date before running.
  'start_operating_date' => '2026-07-31',
  'control_area' => 'ERCOT',
  'start_date' => '2026-09-01',
  'end_date' => '2030-09-01'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_REC_RPS_ERCOT_2026-07-31.csv"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. REC/RPS updates on the first business day of each month.
# Replace 2026-07-31 with a current Publication Date before running.
curl -G "https://api.enerpricedata.com/datasets/download/rec-rps/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2026-07-31" \
  --data-urlencode "control_area=ERCOT" \
  --data-urlencode "start_date=2026-09-01" \
  --data-urlencode "end_date=2030-09-01" \
  -o "EPD_REC_RPS_ERCOT_2026-07-31.csv"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/rec-rps/json",
        title: "Download REC/RPS Data (JSON)",
        description: "Download REC/RPS data in JSON format. Accepts a single Publication Date; date ranges are Excel-only.",
        parameters: [
        { name: "start_operating_date", type: "date", required: true, description: "Date for data download (YYYY-MM-DD)" },
          { name: "control_area", type: "string", required: true, description: "Control area (ERCOT, ISONE, PJM, NYISO)" },
          { name: "start_date", type: "date", required: false, description: "Start date filter (YYYY-MM-DD)" },
          { name: "end_date", type: "date", required: false, description: "End date filter (YYYY-MM-DD)" },
          { name: "raw", type: "boolean", required: false, description: "Return raw JSON response instead of file download" },
          { name: "skip", type: "integer", required: false, description: "Pagination offset for results" },
          { name: "limit", type: "integer", required: false, description: "Maximum number of results to return (max 1000)" }],
        examples: {
          python: `import requests
import json

url = "https://api.enerpricedata.com/datasets/download/rec-rps/json"
headers = {"X-API-Key": "YOUR_API_KEY"}
params = {
    # Publication Date. REC/RPS updates on the first business day of each month.
    # Replace 2026-07-31 with a current Publication Date before running.
    "start_operating_date": "2026-07-31",        # Required
    "control_area": "ERCOT",                     # ERCOT, PJM, ISONE, etc.
    "start_date": "2026-09-01",                  # Optional: filter start
    "end_date": "2030-09-01",                    # Optional: filter end
    "raw": False,                                # Optional: if True, return raw JSON instead of file
    "skip": 0,                                   # Optional: pagination skip
    "limit": 100                                 # Optional: pagination limit (max 1000)
}

response = requests.get(url, headers=headers, params=params)

control_area = params["control_area"]
start_op_date = params["start_operating_date"]
filename = f"EPD_REC_RPS_{control_area}_{start_op_date}.json"

if response.status_code == 200:
    if params.get("raw"):
        # If raw=True, response is JSON data directly
        data = response.json()
        print(f" Raw JSON data received: {len(data)} records")
        print(f"Sample record: {data[0] if data else 'No data'}")
    else:
        # If raw=False or not specified, response is a file
        data = response.json()
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f" File downloaded successfully and saved as '{filename}'")
else:
    print(f" Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const url = new URL('https://api.enerpricedata.com/datasets/download/rec-rps/json');
const params = {
  // Publication Date. REC/RPS updates on the first business day of each month.
  // Replace 2026-07-31 with a current Publication Date before running.
  'start_operating_date': '2026-07-31',
  'control_area': 'ERCOT',
  'raw': false,
  'skip': 0,
  'limit': 100
};
Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const data = await response.json();
if (params.raw) {
  console.log('Raw JSON received:', Array.isArray(data) ? \`\${data.length} records\` : Object.keys(data));
} else {
  const filename = \`EPD_REC_RPS_\${params.control_area}_\${params.start_operating_date}.json\`;
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(\`Saved as \${filename}\`);
}`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

params = {
  # Publication Date. REC/RPS updates on the first business day of each month.
  # Replace 2026-07-31 with a current Publication Date before running.
  'start_operating_date' => '2026-07-31',
  'control_area' => 'ERCOT',
  'raw' => false,
  'skip' => 0,
  'limit' => 100
}

uri = URI('https://api.enerpricedata.com/datasets/download/rec-rps/json')
uri.query = URI.encode_www_form(params)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  data = JSON.parse(res.body)
  if params['raw']
    puts "Raw JSON received: #{data.is_a?(Array) ? data.size : data.keys} records"
  else
    filename = "EPD_REC_RPS_ERCOT_2026-07-31.json"
    File.write(filename, JSON.pretty_generate(data))
    puts "Saved as #{filename}"
  end
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. REC/RPS updates on the first business day of each month.
# Replace 2026-07-31 with a current Publication Date before running.
# raw=false (default) — save the JSON file:
curl -G "https://api.enerpricedata.com/datasets/download/rec-rps/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2026-07-31" \
  --data-urlencode "control_area=ERCOT" \
  --data-urlencode "raw=False" \
  --data-urlencode "skip=0" \
  --data-urlencode "limit=100" \
  -o "EPD_REC_RPS_ERCOT_2026-07-31.json"

# raw=true — print inline JSON:
# curl -G "https://api.enerpricedata.com/datasets/download/rec-rps/json" \
#   -H "X-API-Key: YOUR_API_KEY" \
#   --data-urlencode "raw=true" \
#   --data-urlencode "start_operating_date=2026-07-31"`
        }
      },
      
    ]
  },

  "utility-price": {
    title: "Utility Price Data",
    description: "Access comprehensive utility pricing data including summary and detailed information.",
    endpoints: [
      {
        method: "GET",
        url: "/datasets/download/utility-price",
        title: "Download Utility Price (Excel)",
        description: "Download utility price data in Excel format.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Publication Date for download" },
          { name: "end_operating_date", type: "date", required: false, description: "End Publication Date for download" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/datasets/download/utility-price"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {
    # Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
    # Replace 2026-08-20 with a current Publication Date before running.
    "start_operating_date": "2026-08-20",        # Required in YYYY-MM-DD format
    "end_operating_date": "2026-08-20",          # Optional, for date range
}

response = requests.get(url, headers=headers, params=params)

end_op_date = params.get("end_operating_date", params["start_operating_date"])
filename = f"EPD_UtilityPrice_{end_op_date}.xlsx"


if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"File downloaded successfully and saved as '{filename}'")
else:
    # If an error occurs, print status and response text
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const url = new URL('https://api.enerpricedata.com/datasets/download/utility-price');
const params = {
  // Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  // Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date': '2026-08-20',
  'end_operating_date': '2026-08-20'
};
Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const filename = \`EPD_UtilityPrice_\${params.end_operating_date || params.start_operating_date}.xlsx\`;
const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync(filename, buffer);
console.log(\`Saved as \${filename}\`);`,
          ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.enerpricedata.com/datasets/download/utility-price')
uri.query = URI.encode_www_form(
  # Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  # Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date' => '2026-08-20',
  'end_operating_date' => '2026-08-20'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_UtilityPrice_2026-08-20.xlsx"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
# Replace 2026-08-20 with a current Publication Date before running.
curl -G "https://api.enerpricedata.com/datasets/download/utility-price" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2026-08-20" \
  --data-urlencode "end_operating_date=2026-08-20" \
  -o "EPD_UtilityPrice_2026-08-20.xlsx"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/utility-price/summary/csv",
        title: "Download Utility Price — Summary (CSV)",
        description: "Summary rows only, as a single CSV file. Accepts a single Publication Date; date ranges are Excel-only.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Publication Date (YYYY-MM-DD)" }
        ],
        examples: {
          python: `import requests

base_url = "https://api.enerpricedata.com"
endpoint = "/datasets/download/utility-price/summary/csv"

headers = {"X-API-Key": "YOUR_API_KEY"}

# Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
# Replace 2026-08-20 with a current Publication Date before running.
params = {"start_operating_date": "2026-08-20"}

response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)

filename = f"EPD_UtilityPrice_Summary_{params['start_operating_date']}.csv"

if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"File downloaded successfully and saved as '{filename}'")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const url = new URL('https://api.enerpricedata.com/datasets/download/utility-price/summary/csv');
const params = {
  // Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  // Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date': '2026-08-20'
};
Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const filename = \`EPD_UtilityPrice_Summary_\${params.start_operating_date}.csv\`;
const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync(filename, buffer);
console.log(\`Saved as \${filename}\`);`,
          ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.enerpricedata.com/datasets/download/utility-price/summary/csv')
uri.query = URI.encode_www_form(
  # Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  # Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date' => '2026-08-20'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_UtilityPrice_Summary_2026-08-20.csv"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
# Replace 2026-08-20 with a current Publication Date before running.
curl -G "https://api.enerpricedata.com/datasets/download/utility-price/summary/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2026-08-20" \
  -o "EPD_UtilityPrice_Summary_2026-08-20.csv"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/utility-price/details/csv",
        title: "Download Utility Price — Details (CSV)",
        description: "Details rows only, as a single CSV file. Accepts a single Publication Date; date ranges are Excel-only.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Publication Date (YYYY-MM-DD)" }
        ],
        examples: {
          python: `import requests

base_url = "https://api.enerpricedata.com"
endpoint = "/datasets/download/utility-price/details/csv"

headers = {"X-API-Key": "YOUR_API_KEY"}

# Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
# Replace 2026-08-20 with a current Publication Date before running.
params = {"start_operating_date": "2026-08-20"}

response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)

filename = f"EPD_UtilityPrice_Details_{params['start_operating_date']}.csv"

if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"File downloaded successfully and saved as '{filename}'")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const url = new URL('https://api.enerpricedata.com/datasets/download/utility-price/details/csv');
const params = {
  // Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  // Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date': '2026-08-20'
};
Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const filename = \`EPD_UtilityPrice_Details_\${params.start_operating_date}.csv\`;
const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync(filename, buffer);
console.log(\`Saved as \${filename}\`);`,
          ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.enerpricedata.com/datasets/download/utility-price/details/csv')
uri.query = URI.encode_www_form(
  # Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  # Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date' => '2026-08-20'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_UtilityPrice_Details_2026-08-20.csv"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
# Replace 2026-08-20 with a current Publication Date before running.
curl -G "https://api.enerpricedata.com/datasets/download/utility-price/details/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2026-08-20" \
  -o "EPD_UtilityPrice_Details_2026-08-20.csv"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/utility-price/csv",
        title: "Download Utility Price (CSV)",
        description: "Download utility price data in CSV format. Accepts a single Publication Date; date ranges are Excel-only.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Publication Date for download" },
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/datasets/download/utility-price/csv"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {
    # Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
    # Replace 2026-08-20 with a current Publication Date before running.
    "start_operating_date": "2026-08-20",        # Required in YYYY-MM-DD format
}

response = requests.get(url, headers=headers, params=params)

end_op_date = params.get("end_operating_date", params["start_operating_date"])
filename = f"EPD_UtilityPrice_{end_op_date}.zip"


if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"File downloaded successfully and saved as '{filename}'")
else:
    #status and response text
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const url = new URL('https://api.enerpricedata.com/datasets/download/utility-price/csv');
const params = {
  // Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  // Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date': '2026-08-20'
};
Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const filename = \`EPD_UtilityPrice_\${params.start_operating_date}.zip\`;
const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync(filename, buffer);
console.log(\`Saved as \${filename}\`);`,
          ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.enerpricedata.com/datasets/download/utility-price/csv')
uri.query = URI.encode_www_form(
  # Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  # Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date' => '2026-08-20'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_UtilityPrice_2026-08-20.zip"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
# Replace 2026-08-20 with a current Publication Date before running.
curl -G "https://api.enerpricedata.com/datasets/download/utility-price/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2026-08-20" \
  -o "EPD_UtilityPrice_2026-08-20.zip"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/utility-price/json",
        title: "Download Utility Price (JSON)",
        description: "Download utility price data in JSON format. Accepts a single Publication Date; date ranges are Excel-only.",
        parameters: [
        { name: "start_operating_date", type: "date", required: true, description: "Publication Date for download" },
        { name: "raw", type: "boolean", required: false, description: "If true, returns raw JSON instead of file download" },
        { name: "skip", type: "integer", required: false, description: "Pagination offset for results" },
        { name: "limit", type: "integer", required: false, description: "Maximum number of results to return (max 1000)" }
],
        examples: {
          python: `import json
import requests

url = "https://api.enerpricedata.com/datasets/download/utility-price/json"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {
    # Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
    # Replace 2026-08-20 with a current Publication Date before running.
    "start_operating_date": "2026-08-20",        # Required
    "raw": False,                                # Optional: if True, return raw JSON instead of file
    "skip": 0,                                   # Optional: pagination skip
    "limit": 100                                 # Optional: pagination limit (max 1000)
}

response = requests.get(url, headers=headers, params=params)

start_op_date = params["start_operating_date"]
filename = f"EPD_UtilityPrice_{start_op_date}.json"

if response.status_code == 200:
    if params.get("raw"):
        # If raw=True, response is JSON data directly
        data = response.json()
        print(f" Raw JSON data received: {len(data)} records")
        print(f"Sample record: {data[0] if data else 'No data'}")
    else:
        # If raw=False or not specified, response is a file
        data = response.json()
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f" File downloaded successfully and saved as '{filename}'")
else:
    print(f" Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const url = new URL('https://api.enerpricedata.com/datasets/download/utility-price/json');
const params = {
  // Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  // Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date': '2026-08-20',
  'raw': false,
  'skip': 0,
  'limit': 100
};
Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const data = await response.json();
if (params.raw) {
  console.log('Raw JSON received:', Array.isArray(data) ? \`\${data.length} records\` : Object.keys(data));
} else {
  const filename = \`EPD_UtilityPrice_\${params.start_operating_date}.json\`;
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(\`Saved as \${filename}\`);
}`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

params = {
  # Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  # Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date' => '2026-08-20',
  'raw' => false,
  'skip' => 0,
  'limit' => 100
}

uri = URI('https://api.enerpricedata.com/datasets/download/utility-price/json')
uri.query = URI.encode_www_form(params)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  data = JSON.parse(res.body)
  if params['raw']
    puts "Raw JSON received: #{data.is_a?(Array) ? data.size : data.keys} records"
  else
    filename = "EPD_UtilityPrice_2026-08-20.json"
    File.write(filename, JSON.pretty_generate(data))
    puts "Saved as #{filename}"
  end
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
# Replace 2026-08-20 with a current Publication Date before running.
# raw=false (default) — save the JSON file:
curl -G "https://api.enerpricedata.com/datasets/download/utility-price/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2026-08-20" \
  --data-urlencode "raw=False" \
  --data-urlencode "skip=0" \
  --data-urlencode "limit=100" \
  -o "EPD_UtilityPrice_2026-08-20.json"

# raw=true — print inline JSON:
# curl -G "https://api.enerpricedata.com/datasets/download/utility-price/json" \
#   -H "X-API-Key: YOUR_API_KEY" \
#   --data-urlencode "raw=true" \
#   --data-urlencode "start_operating_date=2026-08-20"`
        }
      }


    ]
  },

  "natural-gas-utility-price": {
    title: "Natural Gas Utility Price Data",
    description: "Access natural gas utility pricing data, both summary and detailed rows, in Excel, CSV, or JSON format.",
    endpoints: [
      {
        method: "GET",
        url: "/datasets/download/naturalgas-utility-price",
        title: "Download Natural Gas Utility Price (Excel)",
        description: "Single workbook with both summary and details sheets for one Publication Date. If <code>end_operating_date</code> is provided, returns a ZIP of single-date xlsx files for each date in the range.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Publication Date (YYYY-MM-DD)" },
          { name: "end_operating_date", type: "date", required: false, description: "End date — when provided, returns a ZIP covering the inclusive range" }
        ],
        examples: {
          python: `import requests

base_url = "https://api.enerpricedata.com"
endpoint = "/datasets/download/naturalgas-utility-price"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {
    # Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
    # Replace 2026-08-20 with a current Publication Date before running.
    "start_operating_date": "2026-08-20",        # Required in YYYY-MM-DD format
    "end_operating_date": "2026-08-20",          # Optional — when set, response is a ZIP of per-date xlsx files
}

response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)

end_op_date = params.get("end_operating_date", params["start_operating_date"])
is_range = params.get("end_operating_date") and params["end_operating_date"] != params["start_operating_date"]
filename = f"EPD_NaturalGasUtilityPrice_{end_op_date}." + ("zip" if is_range else "xlsx")

if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"File downloaded successfully and saved as '{filename}'")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const url = new URL('https://api.enerpricedata.com/datasets/download/naturalgas-utility-price');
const params = {
  // Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  // Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date': '2026-08-20',
  'end_operating_date': '2026-08-20'
};
Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const filename = \`EPD_NaturalGasUtilityPrice_\${params.end_operating_date || params.start_operating_date}.xlsx\`;
const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync(filename, buffer);
console.log(\`Saved as \${filename}\`);`,
          ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.enerpricedata.com/datasets/download/naturalgas-utility-price')
uri.query = URI.encode_www_form(
  # Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  # Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date' => '2026-08-20',
  'end_operating_date' => '2026-08-20'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_NaturalGasUtilityPrice_2026-08-20.xlsx"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
# Replace 2026-08-20 with a current Publication Date before running.
curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-utility-price" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2026-08-20" \
  --data-urlencode "end_operating_date=2026-08-20" \
  -o "EPD_NaturalGasUtilityPrice_2026-08-20.xlsx"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/naturalgas-utility-price/summary/csv",
        title: "Download Natural Gas Utility Price — Summary (CSV)",
        description: "Summary rows only, as a single CSV file. Accepts a single Publication Date; date ranges are Excel-only.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Publication Date (YYYY-MM-DD)" }
        ],
        examples: {
          python: `import requests

base_url = "https://api.enerpricedata.com"
endpoint = "/datasets/download/naturalgas-utility-price/summary/csv"

headers = {"X-API-Key": "YOUR_API_KEY"}

# Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
# Replace 2026-08-20 with a current Publication Date before running.
params = {"start_operating_date": "2026-08-20"}

response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)

filename = f"EPD_NaturalGasUtilityPrice_Summary_{params['start_operating_date']}.csv"

if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"File downloaded successfully and saved as '{filename}'")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const url = new URL('https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/summary/csv');
const params = {
  // Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  // Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date': '2026-08-20'
};
Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const filename = \`EPD_NaturalGasUtilityPrice_Summary_\${params.start_operating_date}.csv\`;
const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync(filename, buffer);
console.log(\`Saved as \${filename}\`);`,
          ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/summary/csv')
uri.query = URI.encode_www_form(
  # Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  # Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date' => '2026-08-20'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_NaturalGasUtilityPrice_Summary_2026-08-20.csv"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
# Replace 2026-08-20 with a current Publication Date before running.
curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/summary/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2026-08-20" \
  -o "EPD_NaturalGasUtilityPrice_Summary_2026-08-20.csv"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/naturalgas-utility-price/details/csv",
        title: "Download Natural Gas Utility Price — Details (CSV)",
        description: "Details rows only, as a single CSV file. Accepts a single Publication Date; date ranges are Excel-only.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Publication Date (YYYY-MM-DD)" }
        ],
        examples: {
          python: `import requests

base_url = "https://api.enerpricedata.com"
endpoint = "/datasets/download/naturalgas-utility-price/details/csv"

headers = {"X-API-Key": "YOUR_API_KEY"}

# Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
# Replace 2026-08-20 with a current Publication Date before running.
params = {"start_operating_date": "2026-08-20"}

response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)

filename = f"EPD_NaturalGasUtilityPrice_Details_{params['start_operating_date']}.csv"

if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"File downloaded successfully and saved as '{filename}'")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const url = new URL('https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/details/csv');
const params = {
  // Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  // Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date': '2026-08-20'
};
Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const filename = \`EPD_NaturalGasUtilityPrice_Details_\${params.start_operating_date}.csv\`;
const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync(filename, buffer);
console.log(\`Saved as \${filename}\`);`,
          ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/details/csv')
uri.query = URI.encode_www_form(
  # Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  # Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date' => '2026-08-20'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_NaturalGasUtilityPrice_Details_2026-08-20.csv"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
# Replace 2026-08-20 with a current Publication Date before running.
curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/details/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2026-08-20" \
  -o "EPD_NaturalGasUtilityPrice_Details_2026-08-20.csv"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/naturalgas-utility-price/csv",
        title: "Download Natural Gas Utility Price (CSV ZIP)",
        description: "Both summary and details CSVs bundled in a single ZIP archive. Accepts a single Publication Date; date ranges are Excel-only.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Publication Date (YYYY-MM-DD)" }
        ],
        examples: {
          python: `import requests

base_url = "https://api.enerpricedata.com"
endpoint = "/datasets/download/naturalgas-utility-price/csv"

headers = {"X-API-Key": "YOUR_API_KEY"}

# Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
# Replace 2026-08-20 with a current Publication Date before running.
params = {"start_operating_date": "2026-08-20"}

response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)

filename = f"EPD_NaturalGasUtilityPrice_{params['start_operating_date']}.zip"

if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"File downloaded successfully and saved as '{filename}'")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const url = new URL('https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/csv');
const params = {
  // Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  // Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date': '2026-08-20'
};
Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const filename = \`EPD_NaturalGasUtilityPrice_\${params.start_operating_date}.zip\`;
const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync(filename, buffer);
console.log(\`Saved as \${filename}\`);`,
          ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/csv')
uri.query = URI.encode_www_form(
  # Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  # Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date' => '2026-08-20'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_NaturalGasUtilityPrice_2026-08-20.zip"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
# Replace 2026-08-20 with a current Publication Date before running.
curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2026-08-20" \
  -o "EPD_NaturalGasUtilityPrice_2026-08-20.zip"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/naturalgas-utility-price/json",
        title: "Download Natural Gas Utility Price (JSON)",
        description: "Returns the dataset as JSON. By default sends a downloadable .json file; set <code>raw=true</code> for an inline JSON response with paginated details. Accepts a single Publication Date; date ranges are Excel-only.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Publication Date (YYYY-MM-DD)" },
          { name: "raw", type: "boolean", required: false, description: "If true, returns inline JSON ({summary, details, pagination}) instead of a file" },
          { name: "offset", type: "integer", required: false, description: "Details-page offset (≥ 0). Only applies when raw=true" },
          { name: "limit", type: "integer", required: false, description: "Details-page size (1–1000, default 100). Only applies when raw=true" }
        ],
        examples: {
          python: `import json
import requests

base_url = "https://api.enerpricedata.com"
endpoint = "/datasets/download/naturalgas-utility-price/json"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {
    # Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
    # Replace 2026-08-20 with a current Publication Date before running.
    "start_operating_date": "2026-08-20",        # Required
    "raw": False,                                # Optional — True returns inline JSON
    "offset": 0,                                 # Optional — only used when raw=True
    "limit": 100                                 # Optional — only used when raw=True (max 1000)
}

response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)

start_op_date = params["start_operating_date"]
filename = f"EPD_NaturalGasUtilityPrice_{start_op_date}.json"

if response.status_code == 200:
    if params.get("raw"):
        data = response.json()
        print(f"Summary rows: {len(data.get('summary', []))}")
        print(f"Details page: {len(data.get('details', []))} of {data.get('pagination', {}).get('total')}")
    else:
        data = response.json()
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f"File downloaded successfully and saved as '{filename}'")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const url = new URL('https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/json');
const params = {
  // Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  // Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date': '2026-08-20',
  'raw': false,
  'offset': 0,
  'limit': 100
};
Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const data = await response.json();
if (params.raw) {
  console.log('Raw JSON received:', Array.isArray(data) ? \`\${data.length} records\` : Object.keys(data));
} else {
  const filename = \`EPD_NaturalGasUtilityPrice_\${params.start_operating_date}.json\`;
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(\`Saved as \${filename}\`);
}`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

params = {
  # Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
  # Replace 2026-08-20 with a current Publication Date before running.
  'start_operating_date' => '2026-08-20',
  'raw' => false,
  'offset' => 0,
  'limit' => 100
}

uri = URI('https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/json')
uri.query = URI.encode_www_form(params)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  data = JSON.parse(res.body)
  if params['raw']
    puts "Raw JSON received: #{data.is_a?(Array) ? data.size : data.keys} records"
  else
    filename = "EPD_NaturalGasUtilityPrice_2026-08-20.json"
    File.write(filename, JSON.pretty_generate(data))
    puts "Saved as #{filename}"
  end
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Publication Date. Published on the 20th of each month, or the next business day when the 20th falls on a weekend or holiday.
# Replace 2026-08-20 with a current Publication Date before running.
# raw=false (default) — save the JSON file:
curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2026-08-20" \
  --data-urlencode "raw=False" \
  --data-urlencode "offset=0" \
  --data-urlencode "limit=100" \
  -o "EPD_NaturalGasUtilityPrice_2026-08-20.json"

# raw=true — print inline JSON:
# curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/json" \
#   -H "X-API-Key: YOUR_API_KEY" \
#   --data-urlencode "raw=true" \
#   --data-urlencode "start_operating_date=2026-08-20"`
        }
      }
    ]
  },
  "fair-market-pricing": {
    title: "Fair Market Pricing (FMP)",
    description: `Fair Market Pricing (FMP) runs EnerPrice's Fair Price Engine to produce an all-in, fully-loaded price, in <strong>$/MWh</strong> or <strong>$/kWh</strong>, for a specific account and contract term, broken down by cost component and by month. Each request prices <strong>one account</strong> and returns the full report in the response body, so there is nothing to poll and no job state to track.
      <div class="mt-4 overflow-x-auto">
        <table class="w-full text-sm text-left border-collapse">
          <tbody>
            <tr class="border-b dark:border-gray-600 align-top">
              <td class="py-3 px-3 font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">Access</td>
              <td class="py-3 px-3 text-gray-600 dark:text-gray-300">Requires the <strong>Fair Market Pricing</strong> permission and access to the requested ISO region. A <code>403</code> is returned otherwise.</td>
            </tr>
            <tr class="border-b dark:border-gray-600 align-top">
              <td class="py-3 px-3 font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">Units</td>
              <td class="py-3 px-3 text-gray-600 dark:text-gray-300">Every request declares a basis with <code>unit</code>: <code>"MWh"</code> (the default, and what the API has always accepted) or <code>"kWh"</code>. Spelling is exact, so <code>"kwh"</code> and <code>"KWH"</code> are rejected with a <code>422</code>. Omit the field and nothing about your integration changes.</td>
            </tr>
            <tr class="border-b dark:border-gray-600 align-top">
              <td class="py-3 px-3 font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">Limits</td>
              <td class="py-3 px-3 text-gray-600 dark:text-gray-300">
                <strong>10 requests/minute</strong>, <strong>600 requests/day</strong>, <strong>3 concurrent</strong>.
                <ul class="list-disc list-inside mt-2 space-y-1">
                  <li><code>/pricing/calculate</code> and the two download endpoints hold separate per-minute counters, so pricing an account and exporting it do not spend each other's slots.</li>
                  <li>Only <code>/pricing/calculate</code> charges the daily quota. <code>/pricing/options</code> is not metered at all.</li>
                  <li>A burst <code>429</code> carries <code>Retry-After</code>. A daily-quota <code>429</code> does not, because the answer is always "tomorrow".</li>
                </ul>
              </td>
            </tr>
            <tr class="align-top">
              <td class="py-3 px-3 font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap">Exports</td>
              <td class="py-3 px-3 text-gray-600 dark:text-gray-300">A calculation stays reusable by the download endpoints for <strong>15 minutes</strong>, so pricing an account and then exporting the same request costs one calculation, not two.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <p class="font-semibold text-amber-900 dark:text-amber-100 mb-3">What <code>unit</code> does and does not change</p>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left border-collapse">
            <thead>
              <tr class="border-b border-amber-300 dark:border-amber-700">
                <th class="py-2 px-3 text-amber-900 dark:text-amber-100">Field</th>
                <th class="py-2 px-3 text-amber-900 dark:text-amber-100 whitespace-nowrap">Follows <code>unit</code>?</th>
                <th class="py-2 px-3 text-amber-900 dark:text-amber-100">Why</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-amber-200 dark:border-amber-800">
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200"><code>monthly_usage</code></td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">Yes</td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">Energy, read as kWh or MWh</td>
              </tr>
              <tr class="border-b border-amber-200 dark:border-amber-800">
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200"><code>margin</code>, <code>sleeve_fee</code>, <code>utility_billing_surcharge</code>, <code>other1</code> &mdash; in <code>usd</code> mode</td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">Yes</td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">Flat rates, read as $/kWh or $/MWh</td>
              </tr>
              <tr class="border-b border-amber-200 dark:border-amber-800">
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">The same four adders &mdash; in <code>pct</code> mode</td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">No</td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">A share of supply cost, so unit-free</td>
              </tr>
              <tr class="border-b border-amber-200 dark:border-amber-800">
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200"><code>price_to_compare</code></td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">Yes</td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">A rate, like the adders</td>
              </tr>
              <tr class="border-b border-amber-200 dark:border-amber-800">
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">Every rate and energy figure in the response</td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">Yes</td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">Reported on the basis you asked for</td>
              </tr>
              <tr class="border-b border-amber-200 dark:border-amber-800">
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">The Excel and CSV exports</td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">Yes</td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">Values and column headers both</td>
              </tr>
              <tr class="border-b border-amber-200 dark:border-amber-800">
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200"><code>plc_kw</code>, <code>nspl_kw</code></td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">No</td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">Demand tags, kW on both bases</td>
              </tr>
              <tr class="border-b border-amber-200 dark:border-amber-800">
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200"><code>tax_rate</code>, <code>savings_pct</code></td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">No</td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">Percentages</td>
              </tr>
              <tr>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200"><code>total_savings</code>, the monthly <code>*_cost</code> fields</td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">No</td>
                <td class="py-2 px-3 text-amber-800 dark:text-amber-200">Absolute dollars</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-sm text-amber-800 dark:text-amber-200 mt-3">The response echoes <code>unit</code> back. Field names keep their historical <code>_per_mwh</code> and <code>_mwh</code> suffixes for backward compatibility and <strong>no longer imply MWh</strong>: read <code>unit</code> to interpret them. Precision follows the basis too, since $/kWh needs more decimals to carry the same information &mdash; rates are rounded to <strong>5</strong> decimals on kWh and <strong>2</strong> on MWh, energy to <strong>1</strong> and <strong>4</strong>.</p>
        <p class="text-sm text-amber-800 dark:text-amber-200 mt-2">Sending usage on the wrong basis is a 1000x error that still prices cleanly, so the engine checks the implied load factor, <code>annual kWh / (PLC kW &times; 8760)</code>. Outside <strong>5-110%</strong> you get a <code>warnings</code> entry naming <code>unit</code> as the likely culprit. The request is still priced, since unusual-but-real accounts exist, but treat it as a prompt to check the basis.</p>
      </div>
      <div class="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Pricing a portfolio</p>
        <p class="text-blue-800 dark:text-blue-200">Loop <code>POST /pricing/calculate</code>, one call per account, paced to 10 requests/minute. The daily quota of <strong>600 requests</strong> is the ceiling that matters, and it is the same 600 whichever way an account gets priced. Every account comes back as structured JSON you can store directly, so there is no bulk endpoint to reach for.</p>
      </div>`,
    endpoints: [
      {
        method: "GET",
        url: "/pricing/options",
        title: "Get Pricing Options (cascading dropdowns)",
        description: "Discover the valid values for a pricing request. Call as you narrow ISO → State → Utility → Load Profile → Load Zone → Capacity Zone → Voltage; each response lists what is still available for the remaining fields.",
        parameters: [
          { name: "iso", type: "string", required: true, description: "ISO region. Currently PJM only; additional ISOs are planned." },
          { name: "state", type: "string", required: false, description: "State filter" },
          { name: "utility_name", type: "string", required: false, description: "Utility name filter" },
          { name: "load_profile", type: "string", required: false, description: "Load profile filter" },
          { name: "voltage", type: "string", required: false, description: "Voltage filter" },
          { name: "load_zone", type: "string", required: false, description: "Load zone filter" },
          { name: "curve_date", type: "date", required: false, description: "Curve date (YYYY-MM-DD)" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/pricing/options"
headers = {"X-API-Key": "YOUR_API_KEY"}

params = {
    "iso": "PJM",            # Required
    "state": "OH",           # Optional, narrows the remaining options
}

response = requests.get(url, headers=headers, params=params)

if response.status_code == 200:
    data = response.json()
    print("Utilities:", data["available_utilities"])
    print("Load zones:", data["available_load_zones"])
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const params = new URLSearchParams({ iso: 'PJM', state: 'OH' });

const response = await fetch(\`https://api.enerpricedata.com/pricing/options?\${params}\`, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

const data = await response.json();
console.log('Utilities:', data.available_utilities);
console.log('Load zones:', data.available_load_zones);`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('https://api.enerpricedata.com/pricing/options')
uri.query = URI.encode_www_form('iso' => 'PJM', 'state' => 'OH')

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
data = JSON.parse(res.body)
puts "Utilities: #{data['available_utilities']}"
puts "Load zones: #{data['available_load_zones']}"`,
          curl: `curl -G "https://api.enerpricedata.com/pricing/options" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "iso=PJM" \
  --data-urlencode "state=OH"`
        }
      },
      {
        method: "POST",
        url: "/pricing/calculate",
        title: "Calculate Fair Market Price",
        description: "Run the Fair Price Engine for a single account. <strong>Send parameters as a JSON request body</strong> (not query string). Returns a full pricing report with a component breakdown, month-by-month detail, and the weighted-average <code>total_fr_price</code>, expressed in whichever <code>unit</code> you asked for. Provide <code>price_to_compare</code> to get a <code>delta</code> vs your current price, on that same basis.",
        parameters: [
          { name: "iso", type: "string", required: true, description: "ISO region. Currently PJM only; additional ISOs are planned." },
          { name: "state", type: "string", required: true, description: "Account state" },
          { name: "utility_name", type: "string", required: true, description: "Utility name" },
          { name: "load_zone", type: "string", required: true, description: "Load zone" },
          { name: "load_profile", type: "string", required: true, description: "Load profile / rate class" },
          { name: "voltage", type: "string", required: true, description: "Voltage level" },
          { name: "curve_date", type: "date", required: true, description: "Curve Publication Date (YYYY-MM-DD)" },
          { name: "start_date", type: "date", required: true, description: "Contract start, must be the first of a month (YYYY-MM-01)" },
          { name: "term_months", type: "integer", required: true, description: "Contract length in months (1–60)" },
          { name: "plc_kw", type: "float", required: true, description: "Capacity tag / PLC in kW (≥ 0)" },
          { name: "nspl_kw", type: "float", required: true, description: "Transmission tag / NSPL in kW (≥ 0)" },
          { name: "unit", type: "string", required: false, description: "Basis for your usage and $ rates: <code>\"MWh\"</code> (default) or <code>\"kWh\"</code>, spelled exactly. Sets how monthly_usage, the usd-mode adders and price_to_compare are read, and the basis every rate and energy figure in the response and the exports is reported in." },
          { name: "monthly_usage", type: "float[]", required: true, description: "Exactly 12 monthly usage values, January through December, in whichever <code>unit</code> you set; sum must be > 0." },
          { name: "capacity_zone", type: "string", required: false, description: "Capacity zone (if applicable)" },
          { name: "price_to_compare", type: "float", required: false, description: "your current supply price on your unit basis; returns a delta vs the fair price" },
          { name: "account_id", type: "string", required: false, description: "Your identifier for the account. Reporting only, echoed back in the response so you can match results to your own records." },
          { name: "account_address", type: "string", required: false, description: "Service address. Reporting only, echoed back in the response." },
          { name: "account_number", type: "string", required: false, description: "Utility account number. Reporting only, echoed back in the response." },
          { name: "margin", type: "float", required: false, description: "Supply margin adder, default 0.0. Paired with <code>margin_mode</code>." },
          { name: "sleeve_fee", type: "float", required: false, description: "Sleeve fee adder, default 0.0. Paired with <code>sleeve_fee_mode</code>." },
          { name: "utility_billing_surcharge", type: "float", required: false, description: "Utility billing surcharge adder, default 0.0. Paired with <code>utility_billing_surcharge_mode</code>." },
          { name: "other1", type: "float", required: false, description: "Free-use adder, default 0.0. Paired with <code>other1_mode</code>." },
          { name: "margin_mode / sleeve_fee_mode / utility_billing_surcharge_mode / other1_mode", type: "string", required: false, description: "How the matching adder is read: <code>\"usd\"</code> (default) treats it as a flat rate on your <code>unit</code> basis, <code>\"pct\"</code> treats it as a percent of the pre-adder supply cost." },
          { name: "tax_rate", type: "float", required: false, description: "Percent gross-up applied to the full pre-tax total (default 0.0): final rate = (COGS + adders + margin) / (1 - tax_rate/100)" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/pricing/calculate"
headers = {"X-API-Key": "YOUR_API_KEY", "Content-Type": "application/json"}

payload = {
    "unit": "MWh",                  # Optional: "MWh" (default) or "kWh"
    "iso": "PJM",
    "state": "OH",
    "utility_name": "Ohio Power Company (AEP)",
    "load_zone": "AEP",
    "load_profile": "General Service Demand Metered Secondary (GS)",
    "voltage": "Secondary",
    # Curve Publication Date. Futures curves update daily by 9:00 AM ET, reflecting the prior business day's close.
    # Replace 2026-08-17 with a current Publication Date before running.
    "curve_date": "2026-08-17",     # Curve Publication Date
    "start_date": "2026-09-01",     # must be the first of a month
    "term_months": 12,              # 1–60
    "plc_kw": 150.0,                # capacity tag
    "nspl_kw": 140.0,               # transmission tag
    "monthly_usage": [42, 38, 41, 39, 45, 52,
                      58, 57, 50, 43, 40, 44],  # exactly 12, in the unit above
    "price_to_compare": 78.50       # optional, your current $/MWh
}

# The same account on a kWh basis: usage x1000, $ rates /1000.
# Both price identically; only the reported basis differs.
# payload = {**payload,
#            "unit": "kWh",
#            "monthly_usage": [42000, 38000, 41000, 39000, 45000, 52000,
#                              58000, 57000, 50000, 43000, 40000, 44000],
#            "price_to_compare": 0.07850}

response = requests.post(url, headers=headers, json=payload)

if response.status_code == 200:
    data = response.json()
    print(f"Fair market price: \${data['total_fr_price']} per {data['unit']}")
    print(f"Delta vs price_to_compare: \${data['delta']} per {data['unit']}")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const response = await fetch('https://api.enerpricedata.com/pricing/calculate', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    unit: 'MWh',                // Optional: 'MWh' (default) or 'kWh'
    iso: 'PJM',
    state: 'OH',
    utility_name: 'Ohio Power Company (AEP)',
    load_zone: 'AEP',
    load_profile: 'General Service Demand Metered Secondary (GS)',
    voltage: 'Secondary',
    // Curve Publication Date. Futures curves update daily by 9:00 AM ET, reflecting the prior business day's close.
    // Replace 2026-08-17 with a current Publication Date before running.
    curve_date: '2026-08-17',
    start_date: '2026-09-01',   // first of month
    term_months: 12,
    plc_kw: 150.0,
    nspl_kw: 140.0,
    monthly_usage: [42, 38, 41, 39, 45, 52,   // exactly 12, in the unit above
                    58, 57, 50, 43, 40, 44],
    price_to_compare: 78.50
  })
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
} else {
  const data = await response.json();
  console.log(\`Fair market price: $\${data.total_fr_price} per \${data.unit} (delta $\${data.delta})\`);
}`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('https://api.enerpricedata.com/pricing/calculate')
req = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json', 'X-API-Key' => 'YOUR_API_KEY')
req.body = {
  iso: 'PJM',
  state: 'OH',
  utility_name: 'Ohio Power Company (AEP)',
  load_zone: 'AEP',
  load_profile: 'General Service Demand Metered Secondary (GS)',
  voltage: 'Secondary',
  # Curve Publication Date. Futures curves update daily by 9:00 AM ET, reflecting the prior business day's close.
  # Replace 2026-08-17 with a current Publication Date before running.
  curve_date: '2026-08-17',
  start_date: '2026-09-01',
  term_months: 12,
  plc_kw: 150.0,
  nspl_kw: 140.0,
  monthly_usage: [42, 38, 41, 39, 45, 52,
                  58, 57, 50, 43, 40, 44],
  price_to_compare: 78.50
}.to_json

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  data = JSON.parse(res.body)
  puts "Fair market price: $#{data['total_fr_price']} per #{data['unit']} (delta $#{data['delta']})"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Curve Publication Date. Futures curves update daily by 9:00 AM ET, reflecting the prior business day's close.
# Replace 2026-08-17 with a current Publication Date before running.
curl -X POST "https://api.enerpricedata.com/pricing/calculate" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "unit": "MWh",
    "iso": "PJM",
    "state": "OH",
    "utility_name": "Ohio Power Company (AEP)",
    "load_zone": "AEP",
    "load_profile": "General Service Demand Metered Secondary (GS)",
    "voltage": "Secondary",
    "curve_date": "2026-08-17",
    "start_date": "2026-09-01",
    "term_months": 12,
    "plc_kw": 150.0,
    "nspl_kw": 140.0,
    "monthly_usage": [42,38,41,39,45,52,58,57,50,43,40,44],
    "price_to_compare": 78.50
  }'`
        }
      },
      {
        method: "POST",
        url: "/pricing/download/excel",
        title: "Download Single Pricing Report (Excel)",
        description: "Same JSON request body as <code>/pricing/calculate</code>, but returns a formatted Excel workbook (with an embedded FMP vs Utility Price chart) instead of JSON. <code>unit</code> carries through to the file: the summary, component and monthly blocks are written on that basis and their headers are labelled to match.",
        parameters: [
          { name: "JSON body", type: "object", required: true, description: "The whole request body, same schema as <code>/pricing/calculate</code> including <code>unit</code>. There are no query parameters. The workbook reports rates on the basis you asked for." }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/pricing/download/excel"
headers = {"X-API-Key": "YOUR_API_KEY", "Content-Type": "application/json"}

payload = {
    "iso": "PJM", "state": "OH", "utility_name": "Ohio Power Company (AEP)",
    "load_zone": "AEP", "load_profile": "General Service Demand Metered Secondary (GS)", "voltage": "Secondary",
    # Curve Publication Date. Futures curves update daily by 9:00 AM ET, reflecting the prior business day's close.
    # Replace 2026-08-17 with a current Publication Date before running.
    "curve_date": "2026-08-17", "start_date": "2026-09-01", "term_months": 12,
    "plc_kw": 150.0, "nspl_kw": 140.0,
    "monthly_usage": [42, 38, 41, 39, 45, 52,
                      58, 57, 50, 43, 40, 44]
}

response = requests.post(url, headers=headers, json=payload)

filename = f"pricing_report_{payload['iso']}_{payload['start_date']}.xlsx"
if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"Saved as '{filename}'")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const payload = {
  iso: 'PJM', state: 'OH', utility_name: 'Ohio Power Company (AEP)',
  load_zone: 'AEP', load_profile: 'General Service Demand Metered Secondary (GS)', voltage: 'Secondary',
  // Curve Publication Date. Futures curves update daily by 9:00 AM ET, reflecting the prior business day's close.
  // Replace 2026-08-17 with a current Publication Date before running.
  curve_date: '2026-08-17', start_date: '2026-09-01', term_months: 12,
  plc_kw: 150.0, nspl_kw: 140.0,
  monthly_usage: [42, 38, 41, 39, 45, 52,
                  58, 57, 50, 43, 40, 44]
};

const response = await fetch('https://api.enerpricedata.com/pricing/download/excel', {
  method: 'POST',
  headers: { 'X-API-Key': 'YOUR_API_KEY', 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
} else {
  const buffer = Buffer.from(await response.arrayBuffer());
  const filename = \`pricing_report_\${payload.iso}_\${payload.start_date}.xlsx\`;
  fs.writeFileSync(filename, buffer);
  console.log(\`Saved as \${filename}\`);
}`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('https://api.enerpricedata.com/pricing/download/excel')
req = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json', 'X-API-Key' => 'YOUR_API_KEY')
req.body = {
  iso: 'PJM', state: 'OH', utility_name: 'Ohio Power Company (AEP)',
  load_zone: 'AEP', load_profile: 'General Service Demand Metered Secondary (GS)', voltage: 'Secondary',
  # Curve Publication Date. Futures curves update daily by 9:00 AM ET, reflecting the prior business day's close.
  # Replace 2026-08-17 with a current Publication Date before running.
  curve_date: '2026-08-17', start_date: '2026-09-01', term_months: 12,
  plc_kw: 150.0, nspl_kw: 140.0,
  monthly_usage: [42, 38, 41, 39, 45, 52,
                  58, 57, 50, 43, 40, 44]
}.to_json

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  File.binwrite("pricing_report_PJM_2026-09-01.xlsx", res.body)
  puts "Saved workbook"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Curve Publication Date. Futures curves update daily by 9:00 AM ET, reflecting the prior business day's close.
# Replace 2026-08-17 with a current Publication Date before running.
curl -X POST "https://api.enerpricedata.com/pricing/download/excel" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "iso": "PJM", "state": "OH", "utility_name": "Ohio Power Company (AEP)",
    "load_zone": "AEP", "load_profile": "General Service Demand Metered Secondary (GS)", "voltage": "Secondary",
    "curve_date": "2026-08-17", "start_date": "2026-09-01", "term_months": 12,
    "plc_kw": 150.0, "nspl_kw": 140.0,
    "monthly_usage": [42,38,41,39,45,52,58,57,50,43,40,44]
  }' \
  -o "pricing_report_PJM_2026-09-01.xlsx"`
        }
      },
      {
        method: "POST",
        url: "/pricing/download/csv",
        title: "Download Single Pricing Report (CSV)",
        description: "Same JSON request body as <code>/pricing/calculate</code>, <code>unit</code> included; returns a CSV with three stacked sections: Summary, Component Breakdown, and Monthly Breakdown, all written on the basis you asked for.",
        parameters: [
          { name: "JSON body", type: "object", required: true, description: "The whole request body, same schema as <code>/pricing/calculate</code> including <code>unit</code>. There are no query parameters." }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/pricing/download/csv"
headers = {"X-API-Key": "YOUR_API_KEY", "Content-Type": "application/json"}

payload = {
    "iso": "PJM", "state": "OH", "utility_name": "Ohio Power Company (AEP)",
    "load_zone": "AEP", "load_profile": "General Service Demand Metered Secondary (GS)", "voltage": "Secondary",
    # Curve Publication Date. Futures curves update daily by 9:00 AM ET, reflecting the prior business day's close.
    # Replace 2026-08-17 with a current Publication Date before running.
    "curve_date": "2026-08-17", "start_date": "2026-09-01", "term_months": 12,
    "plc_kw": 150.0, "nspl_kw": 140.0,
    "monthly_usage": [42, 38, 41, 39, 45, 52,
                      58, 57, 50, 43, 40, 44]
}

response = requests.post(url, headers=headers, json=payload)

filename = f"pricing_report_{payload['iso']}_{payload['start_date']}.csv"
if response.status_code == 200:
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"Saved as '{filename}'")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const payload = {
  iso: 'PJM', state: 'OH', utility_name: 'Ohio Power Company (AEP)',
  load_zone: 'AEP', load_profile: 'General Service Demand Metered Secondary (GS)', voltage: 'Secondary',
  // Curve Publication Date. Futures curves update daily by 9:00 AM ET, reflecting the prior business day's close.
  // Replace 2026-08-17 with a current Publication Date before running.
  curve_date: '2026-08-17', start_date: '2026-09-01', term_months: 12,
  plc_kw: 150.0, nspl_kw: 140.0,
  monthly_usage: [42, 38, 41, 39, 45, 52,
                  58, 57, 50, 43, 40, 44]
};

const response = await fetch('https://api.enerpricedata.com/pricing/download/csv', {
  method: 'POST',
  headers: { 'X-API-Key': 'YOUR_API_KEY', 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});

const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync(\`pricing_report_\${payload.iso}_\${payload.start_date}.csv\`, buffer);
console.log('Saved CSV');`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('https://api.enerpricedata.com/pricing/download/csv')
req = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json', 'X-API-Key' => 'YOUR_API_KEY')
req.body = {
  iso: 'PJM', state: 'OH', utility_name: 'Ohio Power Company (AEP)',
  load_zone: 'AEP', load_profile: 'General Service Demand Metered Secondary (GS)', voltage: 'Secondary',
  # Curve Publication Date. Futures curves update daily by 9:00 AM ET, reflecting the prior business day's close.
  # Replace 2026-08-17 with a current Publication Date before running.
  curve_date: '2026-08-17', start_date: '2026-09-01', term_months: 12,
  plc_kw: 150.0, nspl_kw: 140.0,
  monthly_usage: [42, 38, 41, 39, 45, 52,
                  58, 57, 50, 43, 40, 44]
}.to_json

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
File.binwrite("pricing_report_PJM_2026-09-01.csv", res.body)
puts "Saved CSV"`,
          curl: `# Curve Publication Date. Futures curves update daily by 9:00 AM ET, reflecting the prior business day's close.
# Replace 2026-08-17 with a current Publication Date before running.
curl -X POST "https://api.enerpricedata.com/pricing/download/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "iso": "PJM", "state": "OH", "utility_name": "Ohio Power Company (AEP)",
    "load_zone": "AEP", "load_profile": "General Service Demand Metered Secondary (GS)", "voltage": "Secondary",
    "curve_date": "2026-08-17", "start_date": "2026-09-01", "term_months": 12,
    "plc_kw": 150.0, "nspl_kw": 140.0,
    "monthly_usage": [42,38,41,39,45,52,58,57,50,43,40,44]
  }' \
  -o "pricing_report_PJM_2026-09-01.csv"`
        }
      },
    ]
  },

  "comparative-savings": {
    title: "Comparative Savings Analysis",
    description: `Compare what an account pays its supplier against the utility's <em>Price to Compare</em>, and get the savings back as JSON. Send a portfolio of meter reads and the results come back in the response. Electricity only.<br/><br/>
      <strong>Two calls, in this order.</strong> <code>GET /api/v1/utility-price/options</code> tells you which combinations you may price against, then <code>POST /api/v1/utility-price/comparative-analysis</code> prices your reads.<br/><br/>
      <strong>Access:</strong> requires the <strong>Electricity Utility Price</strong> permission. Both endpoints resolve the newest active price dataset themselves and report which one they used, so there is no Publication Date to pass.
      <div class="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Limits, per API key</p>
        <table class="w-full text-sm text-left border-collapse">
          <tbody>
            <tr class="border-b border-blue-200 dark:border-blue-800"><td class="py-2 px-3 text-blue-800 dark:text-blue-200">Requests per minute</td><td class="py-2 px-3 text-blue-800 dark:text-blue-200">10 per endpoint</td></tr>
            <tr class="border-b border-blue-200 dark:border-blue-800"><td class="py-2 px-3 text-blue-800 dark:text-blue-200">Accounts per day</td><td class="py-2 px-3 text-blue-800 dark:text-blue-200">600, counted in <strong>accounts</strong>, not calls</td></tr>
            <tr class="border-b border-blue-200 dark:border-blue-800"><td class="py-2 px-3 text-blue-800 dark:text-blue-200">Concurrent requests</td><td class="py-2 px-3 text-blue-800 dark:text-blue-200">2</td></tr>
            <tr><td class="py-2 px-3 text-blue-800 dark:text-blue-200">Reads per request</td><td class="py-2 px-3 text-blue-800 dark:text-blue-200">200</td></tr>
          </tbody>
        </table>
        <p class="text-sm text-blue-800 dark:text-blue-200 mt-3">A <code>429</code> carries a <code>Retry-After</code> header. The daily quota is charged <strong>after</strong> validation, so a rejected request costs nothing. One call pricing 50 accounts spends 50 of the 600, so the ceiling is the same whether you send one big request or fifty small ones.</p>
      </div>`,
    endpoints: [
      {
        method: "GET",
        url: "/api/v1/utility-price/options",
        title: "List Priceable Combinations",
        description: `Every State / Utility / Rate Class-Load Profile / Load Zone combination in the current price dataset, each with the range of months published for it. Call this first: <code>/comparative-analysis</code> rejects any read whose combination is not in this list, so this is where you get the exact strings to send.<br/><br/>
          Both filters are optional and independent, and supplying both narrows to rows matching state <strong>and</strong> utility. They are exact matches, not searches, ignoring capitalisation and surrounding whitespace: <code>?utility_name=con edison</code> works, <code>?utility_name=edison</code> returns nothing. A filter that matches nothing returns <strong>200 with <code>count: 0</code></strong>, not a 404.<br/><br/>
          Response is <code>{ operating_date, dataset_created_at, count, combinations }</code>. Each combination carries <code>state</code>, <code>utility_name</code>, <code>rate_class_load_profile</code>, <code>load_zone</code>, and a <code>coverage</code> object with <code>first_month</code> and <code>last_month</code> as <code>YYYY-MM</code>. Send those four strings back verbatim.<br/><br/>
          The full list is a few hundred rows, small enough to fetch once, cache, and filter locally. There is deliberately no filter for rate class or load zone, because those are the long lists you want to search yourself. The set only changes when coverage expands, not on routine price refreshes, though the published months move with every refresh.`,
        parameters: [
          { name: "state", type: "string", required: false, description: "Filter to one state. Exact match, case-insensitive, surrounding whitespace ignored." },
          { name: "utility_name", type: "string", required: false, description: "Filter to one utility. Exact match, case-insensitive, surrounding whitespace ignored." }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/api/v1/utility-price/options"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {
    "state": "MD",              # Optional
    "utility_name": "",         # Optional
}

response = requests.get(url, headers=headers, params=params)

if response.status_code == 200:
    data = response.json()
    print(f"Dataset {data['operating_date']}: {data['count']} combinations")
    for combo in data["combinations"][:5]:
        coverage = combo["coverage"]
        print(f"  {combo['state']} | {combo['utility_name']} | "
              f"{combo['rate_class_load_profile']} | {combo['load_zone']} "
              f"({coverage['first_month']} to {coverage['last_month']})")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const url = new URL('https://api.enerpricedata.com/api/v1/utility-price/options');
url.searchParams.append('state', 'MD');

const response = await fetch(url, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
  return;
}

const data = await response.json();
console.log(\`Dataset \${data.operating_date}: \${data.count} combinations\`);
data.combinations.slice(0, 5).forEach(c => {
  console.log(\`  \${c.state} | \${c.utility_name} | \${c.rate_class_load_profile} | \${c.load_zone} \` +
              \`(\${c.coverage.first_month} to \${c.coverage.last_month})\`);
});`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('https://api.enerpricedata.com/api/v1/utility-price/options')
uri.query = URI.encode_www_form('state' => 'MD')

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  data = JSON.parse(res.body)
  puts "Dataset #{data['operating_date']}: #{data['count']} combinations"
  data['combinations'].first(5).each do |c|
    puts "  #{c['state']} | #{c['utility_name']} | #{c['rate_class_load_profile']} | #{c['load_zone']}"
  end
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `curl -G "https://api.enerpricedata.com/api/v1/utility-price/options" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "state=MD"`
        }
      },
      {
        method: "POST",
        url: "/api/v1/utility-price/comparative-analysis",
        title: "Analyze a Portfolio",
        description: `Send a <code>reads</code> array, one object per meter read, 1 to 200 of them, and get per-read prices and per-account rollups back. <strong>Reads sharing an <code>account_id</code> are analyzed together as one account</strong>, so a year of monthly bills for one meter is twelve reads and one account.<br/><br/>
          Matching on <code>state</code>, <code>utility_name</code>, <code>rate_class_load_profile</code> and <code>load_zone</code> ignores capitalisation and extra internal spaces, so values copied out of <code>/options</code> survive being mangled in transit. It will not guess between genuinely different values: <code>Residential Service (R)</code> and <code>Residential Service (RL)</code> are different rate classes at different prices, so a near-miss returns a <code>Did you mean "..."?</code> error rather than a price.<br/><br/>
          <strong>Response:</strong> <code>{ operating_date, accounts, warnings }</code>, one account entry per distinct <code>account_id</code>.
          <div class="mt-4 bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p class="font-semibold text-gray-900 dark:text-gray-100 mb-3">One account, in full</p>
            <div class="overflow-x-auto">
<pre class="text-xs leading-relaxed font-mono text-gray-200 whitespace-pre">{
  "account_id": "ACCT-1001",
  "header": {                                  the values we resolved, canonically spelled
    "account_id": "ACCT-1001",
    "commodity": "Electric",
    "state": "MD",
    "utility": "Baltimore Gas &amp; Electric",     you send utility_name, we return utility
    "rate_class_load_profile": "Residential Service (R)",
    "load_zone": "BGE"                         the zone actually priced on
  },
  "term_start": "2026-01-15",                  earliest and latest dates across the reads
  "term_end":   "2026-02-14",
  "supported": true,                           false = this account could not be priced
  "reason": null,                              why, when supported is false
  "price_unit": "$/kWh",
  "rows": [                                    one per read, in the order you sent them
    {
      "service_start": "2026-01-15",
      "service_end":   "2026-02-14",
      "usage": 12500.0,                        kWh
      "convention": "READ_START",
      "utility_price": 0.12101,                what the utility would charge
      "ffr": 0.089,                            the supply_price you sent
      "savings_per_kwh": 0.03201,              utility_price - ffr
      "savings_pct": 0.26452,                  a fraction: 0.26452 = 26.5%
      "savings_dollar": 400.13,                savings_per_kwh x usage
      "priced": true                           false = no published price for these dates
    }
  ],
  "summary": {                                 usage-weighted across the account
    "total_usage": 12500.0,
    "avg_utility_price": 0.12101,
    "avg_ffr": 0.089,
    "avg_savings_per_kwh": 0.03201,
    "avg_savings_pct": 0.26452,
    "total_savings_dollar": 400.13,
    "priced_count": 1,
    "unpriced_count": 0
  }
}</pre>
            </div>
          </div>
          <div class="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <ul class="list-disc list-inside text-sm text-amber-800 dark:text-amber-200 space-y-2">
              <li><strong>Leave out <code>load_zone</code> and one gets picked for you</strong> &mdash; the only zone, or the alphabetically first. Seventeen combinations have several (Con Edison NY has <code>ZONE H</code>, <code>I</code> and <code>J</code>) and they price differently, so check <code>header.load_zone</code> to see which one you got.</li>
              <li><strong>A read with no <code>supply_price</code> still prices.</strong> You get <code>utility_price</code>, and the three savings fields come back <code>null</code>. At the account level <code>total_savings_dollar</code> is then <code>0.0</code>, not <code>null</code>.</li>
              <li><strong><code>priced: false</code> and <code>supported: false</code> are not errors</strong>, and both arrive with <code>200</code>. The first means those dates have no published price. The second means the whole account could not be priced, and <code>reason</code> says why. Other accounts are unaffected either way.</li>
              <li><strong>The savings averages cover fewer reads than <code>avg_utility_price</code></strong> in a mixed account. They only count priced reads that carry a <code>supply_price</code>, so the percentage's top and bottom describe the same reads.</li>
            </ul>
            <p class="text-sm text-amber-800 dark:text-amber-200 mt-3"><code>warnings</code> is advisory and arrives on a successful <code>200</code>. Today it carries the <code>LOAD_WEIGHTED</code> usage-mismatch note.</p>
          </div>
          <div class="mt-4 bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <p class="font-semibold text-gray-900 dark:text-gray-100 mb-2">PTC Billing Convention</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">Utility prices can change partway through a meter read. <code>convention</code> tells the engine which month's price to apply. Required on every read.</p>
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left border-collapse">
                <thead>
                  <tr class="border-b dark:border-gray-600">
                    <th class="py-2 px-3 text-gray-900 dark:text-gray-100">Value</th>
                    <th class="py-2 px-3 text-gray-900 dark:text-gray-100">How the read is priced</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b dark:border-gray-700"><td class="py-2 px-3 text-gray-700 dark:text-gray-300"><code>READ_START</code></td><td class="py-2 px-3 text-gray-600 dark:text-gray-300">The entire read at the PTC in effect on the <strong>service start date</strong>.</td></tr>
                  <tr class="border-b dark:border-gray-700"><td class="py-2 px-3 text-gray-700 dark:text-gray-300"><code>READ_END</code></td><td class="py-2 px-3 text-gray-600 dark:text-gray-300">The entire read at the PTC in effect on the <strong>service end date</strong>.</td></tr>
                  <tr class="border-b dark:border-gray-700"><td class="py-2 px-3 text-gray-700 dark:text-gray-300"><code>DAY_WEIGHTED</code></td><td class="py-2 px-3 text-gray-600 dark:text-gray-300">Blends the two months' PTCs by the <strong>number of days</strong> the read spends in each. Derived from your dates, nothing extra to send.</td></tr>
                  <tr><td class="py-2 px-3 text-gray-700 dark:text-gray-300"><code>LOAD_WEIGHTED</code></td><td class="py-2 px-3 text-gray-600 dark:text-gray-300">Blends them by the <strong>usage you assign</strong> to each month. Requires <code>usage_start</code> and <code>usage_end</code>.</td></tr>
                </tbody>
              </table>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-3">For <code>LOAD_WEIGHTED</code>, <code>usage</code> is derived as <code>usage_start + usage_end</code>; send a <code>usage</code> that disagrees and the split wins, with a warning, and the request still succeeds.</p>
          </div>`,
        parameters: [
          { name: "reads", type: "object[]", required: true, description: "1 to 200 meter reads. Fields below are per read." },
          { name: "reads[].account_id", type: "string", required: true, description: "Your identifier for the account. Must not be blank or whitespace-only. Reads sharing this value are analyzed as one account." },
          { name: "reads[].state", type: "string", required: true, description: "State, exactly as listed by /options" },
          { name: "reads[].utility_name", type: "string", required: true, description: "Utility, exactly as listed by /options" },
          { name: "reads[].rate_class_load_profile", type: "string", required: true, description: "Rate class / load profile, exactly as listed by /options" },
          { name: "reads[].load_zone", type: "string", required: false, description: "Load zone. Omit it and one is chosen for you: the only zone, or the alphabetically first. Always read header.load_zone back." },
          { name: "reads[].service_start", type: "date", required: true, description: "Start of the service period (YYYY-MM-DD)" },
          { name: "reads[].service_end", type: "date", required: true, description: "End of the service period (YYYY-MM-DD). Must be strictly after service_start." },
          { name: "reads[].convention", type: "string", required: true, description: "How a read spanning two calendar months is split: READ_START (all usage at the starting month), READ_END (all at the ending month), DAY_WEIGHTED (by days in each month), or LOAD_WEIGHTED (by the usage you report per month)." },
          { name: "reads[].usage", type: "float", required: false, description: "Usage in kWh for the period. Required for every convention except LOAD_WEIGHTED, which derives it as usage_start + usage_end." },
          { name: "reads[].usage_start", type: "float", required: false, description: "Required for LOAD_WEIGHTED only. Usage falling in the starting month." },
          { name: "reads[].usage_end", type: "float", required: false, description: "Required for LOAD_WEIGHTED only. Usage falling in the ending month. Send a usage that disagrees with the split and the split wins, with a warning; the request still succeeds." },
          { name: "reads[].supply_price", type: "float", required: false, description: "The $/kWh you currently pay. Omit it and the utility price is still returned, but savings are not computed for that read." }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/api/v1/utility-price/comparative-analysis"

headers = {"X-API-Key": "YOUR_API_KEY", "Content-Type": "application/json"}

payload = {
    "reads": [
        {
            "account_id": "ACCT-1001",
            "state": "MD",
            "utility_name": "Baltimore Gas & Electric",
            "rate_class_load_profile": "Residential Service (R)",
            "load_zone": "BGE",
            # Service period dates, not Publication Dates - pricing always uses the latest published Utility Price dataset.
            "service_start": "2026-01-15",
            "service_end": "2026-02-14",
            "convention": "READ_START",
            "usage": 12500,             # kWh for the period
            "supply_price": 0.089       # $/kWh you pay today; optional
        }
    ]
}

response = requests.post(url, headers=headers, json=payload, timeout=120)

if response.status_code == 200:
    data = response.json()
    for account in data["accounts"]:
        if not account["supported"]:
            print(f"{account['account_id']}: not priced ({account['reason']})")
            continue
        summary = account["summary"]
        print(f"{account['account_id']} "
              f"(zone used: {account['header']['load_zone']}): "
              f"utility {summary['avg_utility_price']} {account['price_unit']}, "
              f"savings {summary['total_savings_dollar']} total, "
              f"{summary['unpriced_count']} reads unpriced")
elif response.status_code == 422:
    # Two shapes: a framework list for schema errors, or {"errors": [...]}
    # for rule errors. Handle both.
    detail = response.json()["detail"]
    problems = detail["errors"] if isinstance(detail, dict) else detail
    for problem in problems:
        print(f"Rejected: {problem}")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const response = await fetch('https://api.enerpricedata.com/api/v1/utility-price/comparative-analysis', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    reads: [
      {
        account_id: 'ACCT-1001',
        state: 'MD',
        utility_name: 'Baltimore Gas & Electric',
        rate_class_load_profile: 'Residential Service (R)',
        load_zone: 'BGE',
        // Service period dates, not Publication Dates - pricing always uses the latest published Utility Price dataset.
        service_start: '2026-01-15',
        service_end: '2026-02-14',
        convention: 'READ_START',
        usage: 12500,             // kWh for the period
        supply_price: 0.089       // $/kWh you pay today; optional
      }
    ]
  })
});

if (response.status === 422) {
  // Schema errors arrive as a list, rule errors as { errors: [...] }.
  const { detail } = await response.json();
  const problems = Array.isArray(detail) ? detail : detail.errors;
  problems.forEach(p => console.error('Rejected:', p));
} else if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
} else {
  const data = await response.json();
  data.accounts.forEach(a => {
    if (!a.supported) {
      console.log(\`\${a.account_id}: not priced (\${a.reason})\`);
      return;
    }
    console.log(\`\${a.account_id} (zone used: \${a.header.load_zone}): \` +
                \`utility \${a.summary.avg_utility_price} \${a.price_unit}, \` +
                \`savings \${a.summary.total_savings_dollar} total\`);
  });
}`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('https://api.enerpricedata.com/api/v1/utility-price/comparative-analysis')
req = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json', 'X-API-Key' => 'YOUR_API_KEY')
req.body = {
  reads: [
    {
      account_id: 'ACCT-1001',
      state: 'MD',
      utility_name: 'Baltimore Gas & Electric',
      rate_class_load_profile: 'Residential Service (R)',
      load_zone: 'BGE',
      # Service period dates, not Publication Dates - pricing always uses the latest published Utility Price dataset.
      service_start: '2026-01-15',
      service_end: '2026-02-14',
      convention: 'READ_START',
      usage: 12500,
      supply_price: 0.089
    }
  ]
}.to_json

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true, read_timeout: 120) { |http| http.request(req) }

case res.code
when '200'
  JSON.parse(res.body)['accounts'].each do |a|
    unless a['supported']
      puts "#{a['account_id']}: not priced (#{a['reason']})"
      next
    end
    s = a['summary']
    puts "#{a['account_id']} (zone used: #{a['header']['load_zone']}): " \
         "utility #{s['avg_utility_price']} #{a['price_unit']}, " \
         "savings #{s['total_savings_dollar']} total"
  end
when '422'
  detail = JSON.parse(res.body)['detail']
  problems = detail.is_a?(Array) ? detail : detail['errors']
  problems.each { |p| puts "Rejected: #{p}" }
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# Service period dates, not Publication Dates - pricing always uses the latest published Utility Price dataset.
curl -X POST "https://api.enerpricedata.com/api/v1/utility-price/comparative-analysis" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "reads": [
      {
        "account_id": "ACCT-1001",
        "state": "MD",
        "utility_name": "Baltimore Gas & Electric",
        "rate_class_load_profile": "Residential Service (R)",
        "load_zone": "BGE",
        "service_start": "2026-01-15",
        "service_end": "2026-02-14",
        "convention": "READ_START",
        "usage": 12500,
        "supply_price": 0.089
      }
    ]
  }'`
        }
      }
    ],
    content: `
      <div class="space-y-6">
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h4 class="font-bold text-gray-900 dark:text-white mb-4">How savings are calculated</h4>
          <table class="w-full text-sm text-left border-collapse">
            <thead>
              <tr class="border-b dark:border-gray-600">
                <th class="py-2 px-3 font-large text-gray-900 dark:text-gray-100">Field</th>
                <th class="py-2 px-3 font-large text-gray-900 dark:text-gray-100">Formula</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:border-gray-600">
                <td class="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100"><code>savings_per_kwh</code></td>
                <td class="py-2 px-3 text-gray-600 dark:text-gray-300"><code>utility_price − ffr</code></td>
              </tr>
              <tr class="border-b dark:border-gray-600">
                <td class="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100"><code>savings_pct</code></td>
                <td class="py-2 px-3 text-gray-600 dark:text-gray-300"><code>(utility_price − ffr) / utility_price</code>, as a <strong>fraction</strong>: <code>0.30</code> means 30%</td>
              </tr>
              <tr class="border-b dark:border-gray-600">
                <td class="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100"><code>savings_dollar</code></td>
                <td class="py-2 px-3 text-gray-600 dark:text-gray-300"><code>savings_per_kwh × usage</code></td>
              </tr>
              <tr>
                <td class="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">Sign convention</td>
                <td class="py-2 px-3 text-gray-600 dark:text-gray-300">Positive savings means your supply price beats the utility.</td>
              </tr>
            </tbody>
          </table>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">Prices are <code>$/kWh</code>; each account echoes this as <code>price_unit</code>.</p>
        </div>
      </div>
    `
  },

  errors: {
    title: "Error Codes",
    description: "Complete reference of API error codes and their meanings.",
    content: `
      <div class="space-y-6">
        <div class="overflow-x-auto">
          <table class="w-full border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead class="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Error Code</th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Meaning</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr><td class="px-6 py-4 font-mono text-red-600 dark:text-red-400">400</td><td class="px-6 py-4 text-gray-600 dark:text-gray-300">Bad Request — Your request is invalid or missing required parameters.</td></tr>
              <tr><td class="px-6 py-4 font-mono text-red-600 dark:text-red-400">401</td><td class="px-6 py-4 text-gray-600 dark:text-gray-300">Unauthorized — Your API credentials are incorrect or missing.</td></tr>
              <tr><td class="px-6 py-4 font-mono text-red-600 dark:text-red-400">403</td><td class="px-6 py-4 text-gray-600 dark:text-gray-300">Forbidden — You do not have permission to access this resource.</td></tr>
              <tr><td class="px-6 py-4 font-mono text-red-600 dark:text-red-400">404</td><td class="px-6 py-4 text-gray-600 dark:text-gray-300">Not Found — The requested data or endpoint could not be found.</td></tr>
              <tr><td class="px-6 py-4 font-mono text-red-600 dark:text-red-400">429</td><td class="px-6 py-4 text-gray-600 dark:text-gray-300">Too Many Requests — You've exceeded a rate limit. Response includes a <code class="text-xs">Retry-After</code> header (seconds) and a <code class="text-xs">limit</code> field describing the bucket that tripped. See the Rate Limits panel on the Home tab.</td></tr>
              <tr><td class="px-6 py-4 font-mono text-red-600 dark:text-red-400">500</td><td class="px-6 py-4 text-gray-600 dark:text-gray-300">Internal Server Error — Something went wrong on our end.</td></tr>
              <tr><td class="px-6 py-4 font-mono text-red-600 dark:text-red-400">503</td><td class="px-6 py-4 text-gray-600 dark:text-gray-300">Service Unavailable — A backend dependency is unreachable; requests fail closed. Retry after a short delay.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  },

  notebook: {
    title: "Example",
    description: "Interactive Jupyter notebook with comprehensive API usage examples using Python.",
    content: `
      <div class="space-y-6">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Interactive Examples</h3>
          <p class="text-blue-800 dark:text-blue-200 mb-4">Explore our comprehensive Jupyter notebook with examples and best practices.</p>
          <a href="https://colab.research.google.com/github/monkeyDepd/enerprice-api-docs/blob/main/frontend/notebooks/demo.ipynb" target="_blank" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Open in Google Colab
            <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>
    `
  },

  support: {
    title: "Support & Contact",
    description: "Get help with API integration, troubleshooting, and technical queries.",
    content: `
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Technical Support</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Get help with API integration and technical issues.</p>
            <a href="mailto:info@enerpricedata.com" class="text-blue-600 dark:text-blue-400 hover:underline">support@enerpricedata.com</a>
          </div>
          
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Sales & Partnerships</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Discuss enterprise solutions and partnerships.</p>
            <a href="mailto:sales@enerpricedata.com" class="text-blue-600 dark:text-blue-400 hover:underline">info@enerpricedata.com</a>
          </div>
        </div>
        
        <div class="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Documentation Feedback</h3>
          <p class="text-gray-600 dark:text-gray-300">Found an issue with our documentation? Help us improve by reporting it.</p>
          <p class="text-gray-600 dark:text-gray-300">
          We’re continuously enhancing our API docs with broader language support and features—thank you for your patience and feedback.
          </p>
        </div>
      </div>
    `
  }
};