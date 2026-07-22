import apiImage from './assets/api.png';



export const mockApiData = {
  home: {
    title: "EnerPrice API Documentation",
    description: "Welcome to the Comprehensive EnerPrice API documentation, your gateway to accessing futures Energy Futures data, Ancillary and Uplift charges, REC credits and portfolio standards, Utility Pricing data, and detailed rate structures through our powerful FAST API.",
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
                <td class="py-2 px-3 font-semibold text-gray-1000 dark:text-gray-100">Energy Curves</td>
                <td class="py-2 px-3 text-gray-600 dark:text-gray-300">Uploaded every Morning</td>
              </tr>
              <tr class="border-b dark:border-gray-600">
                <td class="py-2 px-3 font-semibold text-gray-1000 dark:text-gray-100">Ancillary/Uplift Curves</td>
                <td class="py-2 px-3 text-gray-600 dark:text-gray-300">Uploaded every Friday and at month end</td>
              </tr>
              <tr class="border-b dark:border-gray-600">
                <td class="py-2 px-3 font-semibold text-gray-1000 dark:text-gray-100">REC Data</td>
                <td class="py-2 px-3 text-gray-600 dark:text-gray-300">Uploaded at month end</td>
              </tr>
              <tr>
                <td class="py-2 px-3 font-semibold text-gray-1000 dark:text-gray-100">PTC Files</td>
                <td class="py-2 px-3 text-gray-600 dark:text-gray-300">Uploaded prior to the third week of each month</td>
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
    "start_operating_date": "2024-01-15",
    "end_operating_date": "2024-01-15",
    "control_area": "ERCOT",
    "block_types": "7x8,2x16",
    "start_date":"",
    "end_date":"",
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
  start_operating_date: '2024-01-15',
  end_operating_date: '2024-01-15',
  control_area: 'ERCOT',
  block_types: '7x8,2x16',
  start_date: '',
  end_date: ''
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
  start_operating_date: "2024-01-15",
  end_operating_date: "2024-01-15",
  control_area: "ERCOT",
  block_types: "7x8,2x16",
  start_date: "",
  end_date: ""
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
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/energy-futures?start_operating_date=2024-01-15&end_operating_date=2024-01-15&control_area=ERCOT&block_types=7x8,2x16&start_date=&end_date=" \
  -H "X-API-Key: YOUR_API_KEY" \
  --output "EPD_EnergyFutures_ERCOT_2024-01-15.xlsx"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/energy-futures/csv",
        title: "Download Energy Futures (CSV)",
        description: "Download energy futures data in CSV format. Supports single date or date range downloads.",
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
    "start_operating_date": "2024-08-25",
    "control_area": "ERCOT",
    "block_types": "7x8,2x16",
    "start_date":"",
    "end_date":"",
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
  start_operating_date: "2024-01-15",
  end_operating_date: "2024-01-15",
  control_area: "ERCOT",
  block_types: "7x8,2x16",
  start_date: "",
  end_date: ""
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
  start_operating_date: "2024-01-15",
  end_operating_date: "2024-01-15",
  control_area: "ERCOT",
  block_types: "7x8,2x16",
  start_date: "",
  end_date: ""
}

url.query = URI.encode_www_form(params)
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["X-API-Key"] = "YOUR_API_KEY"

response = http.request(request)

if response.code == "200"
  filename = "EPD_EnergyFutures_#{params[:control_area]}_#{params[:end_operating_date]}.csv"
  File.open(filename, "wb") { |file| file.write(response.body) }
  puts "File downloaded successfully and saved as '#{filename}'"
else
  puts "Error #{response.code}: #{response.body}"
end`,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/energy-futures/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  -G \
  --data-urlencode "start_operating_date=2024-01-15" \
  --data-urlencode "end_operating_date=2024-01-15" \
  --data-urlencode "control_area=ERCOT" \
  --data-urlencode "block_types=7x8,2x16" \
  --data-urlencode "start_date=" \
  --data-urlencode "end_date=" \
  -o "EPD_EnergyFutures_ERCOT_2024-01-15.csv"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/energy-futures/json",
        title: "Download Energy Futures (JSON)",
        description: "Download energy futures data as JSON with pagination support.",
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

# Get Energy Futures JSON Data
url = "https://api.enerpricedata.com/datasets/download/energy-futures/json"

headers = {
    "X-API-Key": "YOUR_API_KEY"
}

params = {
    "start_operating_date": "2025-08-25",        # Required
    "control_area": "ERCOT",                     # ERCOT, PJM, ISONE, etc.
    "block_types": "7x8,2x16",                   # Optional: e.g., 7x8,2x16,5x16, etc. e.g., "7x8","2x16","5x16" -- By Default ALL 
    "start_date": "2025-08-01",                  # Optional: filter start
    "end_date": "2030-09-01",                    # Optional: filter end
    "raw": False,                                # Optional: if True, return raw JSON instead of file
    "skip": 0,                                   # Optional: pagination skip
    "limit": 100                                 # Optional: pagination limit (max 1000)
}

response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)

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
    start_operating_date: '2024-01-15',
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
  start_operating_date: "2025-08-25",
  end_operating_date: "2025-08-25",
  control_area: "ERCOT",
  block_types: "",
  start_date: "2025-08-01",
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
  filename = "EPD_EnergyFutures_ERCOT_2025-08-25.json"
  File.write(filename, JSON.pretty_generate(data))
  puts "File downloaded and saved as '#{filename}'"
else
  puts "Error #{response.code}: #{response.body}"
end`,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/energy-futures/json?start_operating_date=2025-08-25&end_operating_date=2025-08-25&control_area=ERCOT&block_types=&start_date=2025-08-01&end_date=2030-09-01" \
  -H "X-API-Key: YOUR_API_KEY" \
  -o "EPD_EnergyFutures_ERCOT_2025-08-25.json"`
        }
      },
      
    ]
  },

  "natgas-energy-futures": {
    title: "Natural Gas Energy Futures Data",
    description: "Access Natural Gas <strong>futures</strong> (forward curve) pricing: monthly baseload gas prices published as a single combined dataset covering all settlement points. Download in Excel, CSV, or JSON.<br/><br/><strong>Data availability:</strong> curves are published on business days. A <code>404 No NG Futures dataset found</code> means that publication date isn't available yet, so retry with the most recent business day.",
    endpoints: [
      {
        method: "GET",
        url: "/datasets/download/naturalgas-futures",
        title: "Download Natural Gas Energy Futures (Excel)",
        description: "Download the natural gas futures curve for a publication date as an Excel workbook.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Publication date of the curve (YYYY-MM-DD)" },
          { name: "settlement_point", type: "string", required: false, description: "Filter to a single settlement point (e.g. Henry Hub). Omit for all points." },
          { name: "start_date", type: "date", required: false, description: "Curve (delivery) start date filter (YYYY-MM-DD)" },
          { name: "end_date", type: "date", required: false, description: "Curve (delivery) end date filter (YYYY-MM-DD)" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/datasets/download/naturalgas-futures"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {
    "start_operating_date": "2025-08-15",   # Required: curve publication date
    "settlement_point": "",                  # Optional: single settlement point; blank = all
    "start_date": "",                        # Optional: curve delivery start filter
    "end_date": "",                          # Optional: curve delivery end filter
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
  'start_operating_date': '2025-08-15'
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
  'start_operating_date' => '2025-08-15'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_NaturalGasFutures_2025-08-15.xlsx"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-futures" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2025-08-15" \
  -o "EPD_NaturalGasFutures_2025-08-15.xlsx"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/naturalgas-futures/csv",
        title: "Download Natural Gas Energy Futures (CSV)",
        description: "Download the natural gas futures curve for a publication date as a CSV file.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Publication date of the curve (YYYY-MM-DD)" },
          { name: "settlement_point", type: "string", required: false, description: "Filter to a single settlement point. Omit for all points." },
          { name: "start_date", type: "date", required: false, description: "Curve (delivery) start date filter (YYYY-MM-DD)" },
          { name: "end_date", type: "date", required: false, description: "Curve (delivery) end date filter (YYYY-MM-DD)" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/datasets/download/naturalgas-futures/csv"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {
    "start_operating_date": "2025-08-15",   # Required: curve publication date
    "settlement_point": "",                  # Optional: single settlement point; blank = all
    "start_date": "",                        # Optional: curve delivery start filter
    "end_date": "",                          # Optional: curve delivery end filter
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
  'start_operating_date': '2025-08-15'
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
  'start_operating_date' => '2025-08-15'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_NaturalGasFutures_2025-08-15.csv"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-futures/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2025-08-15" \
  -o "EPD_NaturalGasFutures_2025-08-15.csv"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/naturalgas-futures/json",
        title: "Download Natural Gas Energy Futures (JSON)",
        description: "Returns the natural gas futures curve as JSON. Set <code>raw=true</code> for an inline, paginated JSON response of the form <code>{ data, total, page, size }</code>.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Publication date of the curve (YYYY-MM-DD)" },
          { name: "settlement_point", type: "string", required: false, description: "Filter to a single settlement point. Omit for all points." },
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
    "start_operating_date": "2025-08-15",   # Required
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
  'start_operating_date': '2025-08-15',
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
  'start_operating_date' => '2025-08-15',
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
    filename = "EPD_NaturalGasFutures_2025-08-15.json"
    File.write(filename, JSON.pretty_generate(data))
    puts "Saved as #{filename}"
  end
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# raw=false (default): save the JSON file:
curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-futures/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2025-08-15" \
  -o "EPD_NaturalGasFutures_2025-08-15.json"

# raw=true: print inline paginated JSON:
# curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-futures/json" \
#   -H "X-API-Key: YOUR_API_KEY" \
#   --data-urlencode "raw=true" \
#   --data-urlencode "start_operating_date=2025-08-15" \
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
          { name: "control_area", type: "string", required: true, description: "Control area (ERCOT, ISONE, PJM, NYISO)" },
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
    "start_operating_date": "2025-08-25",        # Required
    "end_operating_date": "2025-08-25",          # Optional, for date range
    "control_area": "PJM",                       # ERCOT, PJM, ISONE, etc.
    "start_date": "2025-08-01",                  # Optional: filter start
    "end_date": "2030-09-01"                     # Optional: filter end
}

response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)

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
  start_operating_date: '2025-08-25',
  end_operating_date: '2025-08-25',
  control_area: 'PJM',
  start_date: '2025-08-01',
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
  start_operating_date: '2025-08-25',
  end_operating_date: '2025-08-25',
  control_area: 'PJM',
  start_date: '2025-08-01',
  end_date: '2030-09-01'
}
uri.query = URI.encode_www_form(params)

request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'YOUR_API_KEY'`
,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/ancillary-uplift?start_operating_date=2025-08-25&end_operating_date=2025-08-25&control_area=PJM&start_date=2025-08-01&end_date=2030-09-01" \
  -H "X-API-Key: YOUR_API_KEY" \
  -o EPD_AncillaryUplift_PJM_2025-08-25.xlsx`

        }
      },
      {
        method: "GET",
        url: "/datasets/download/ancillary-uplift/csv",
        title: "Download Ancillary Uplift Curves (CSV)",
        description: "Download energy futures data in CSV format. Supports single date or date range downloads.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Start date for download (YYYY-MM-DD)" },
          { name: "control_area", type: "string", required: true, description: "Control area (ERCOT, ISONE, PJM, NYISO, MISO)" },
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
    "start_operating_date": "2025-08-25",        # Required
    "control_area": "PJM",                       # ERCOT, PJM, ISONE, etc.
    "start_date": "2025-08-01",                  # Optional: filter start
    "end_date": "2030-09-01"                     # Optional: filter end
}
response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)

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
  start_operating_date: "2025-08-25",
  end_operating_date: "2025-08-25",
  control_area: "PJM",
  start_date: "2025-08-01",
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

url = URI('https://api.enerpricedata.com/datasets/download/ancillary-uplift/csv')
params = {
  start_operating_date: "2025-08-25",
  end_operating_date: "2025-08-25",
  control_area: "PJM",
  start_date: "2025-08-01",
  end_date: "2030-09-01"
}

url.query = URI.encode_www_form(params)
http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["X-API-Key"] = "YOUR_API_KEY"

response = http.request(request)

if response.code == "200"
  filename = "EPD_AncillaryUplift_#{params[:control_area]}_#{params[:start_operating_date]}.csv"
  File.open(filename, "wb") { |file| file.write(response.body) }
  puts "File downloaded successfully and saved as '#{filename}'"
else
  puts "Error #{response.code}: #{response.body}"
end`,
          curl: `START_OP_DATE="2025-08-25"
CONTROL_AREA="PJM"

curl -X GET "https://api.enerpricedata.com/datasets/download/ancillary-uplift/csv" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -G \\
  --data-urlencode "start_operating_date=\${START_OP_DATE}" \\
  --data-urlencode "end_operating_date=\${START_OP_DATE}" \\
  --data-urlencode "control_area=\${CONTROL_AREA}" \\
  --data-urlencode "start_date=2025-08-01" \\
  --data-urlencode "end_date=2030-09-01" \\
  -o "EPD_AncillaryUplift_\${CONTROL_AREA}_\${START_OP_DATE}.csv"`
}
      },
      {
        method: "GET",
        url: "/datasets/download/ancillary-uplift/json",
        title: "Download Ancillary Uplift  (JSON)",
        description: "Download ancillary uplift data as JSON with pagination support.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Date for data download (YYYY-MM-DD)" },
          { name: "control_area", type: "string", required: true, description: "Control area (ERCOT, ISONE, PJM, NYISO)" },
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
    "start_operating_date": "2025-08-29",        # Required
    "control_area": "ERCOT",                     # ERCOT, ISONE, NYISO, PJM
    "start_date": "2025-08-01",                  # Optional: filter start
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
    start_operating_date: '2025-08-29',
    control_area: 'ERCOT',
    start_date: '2025-08-01',
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
  start_operating_date: "2025-08-25",
  control_area: "ERCOT",
  start_date: "2025-08-01",
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
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/ancillary-uplift/json?start_operating_date=2025-08-25&control_area=ERCOT&start_date=2025-08-01&end_date=2030-09-01" \
  -H "X-API-Key: YOUR_API_KEY" \
  -o "EPD_AncillaryUplift_ERCOT_2025-08-25.json"`
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
    "start_operating_date": "2025-08-01",        # Required
    "control_area": "ERCOT",                     # ERCOT, PJM, ISONE, etc.
    "start_date": "2025-08-01",                  # Optional: filter start
    "end_date": "2030-09-01"                     # Optional: filter end
}

response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)

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
  'start_operating_date': '2025-08-01',
  'control_area': 'ERCOT',
  'start_date': '2025-08-01',
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
  'start_operating_date' => '2025-08-01',
  'control_area' => 'ERCOT',
  'start_date' => '2025-08-01',
  'end_date' => '2030-09-01'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_REC_RPS_ERCOT_2025-08-01.xlsx"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `curl -G "https://api.enerpricedata.com/datasets/download/rec-rps" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2025-08-01" \
  --data-urlencode "control_area=ERCOT" \
  --data-urlencode "start_date=2025-08-01" \
  --data-urlencode "end_date=2030-09-01" \
  -o "EPD_REC_RPS_ERCOT_2025-08-01.xlsx"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/rec-rps/csv",
        title: "Download REC/RPS Data (CSV)",
        description: "Download REC/RPS data in CSV format.",
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
    "start_operating_date": "2025-08-01",        # Required
    "control_area": "ERCOT",                     # ERCOT, PJM, ISONE, etc.
    "start_date": "2025-08-01",                  # Optional: filter start
    "end_date": "2030-09-01"                     # Optional: filter end
}

response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)

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
  'start_operating_date': '2025-08-01',
  'control_area': 'ERCOT',
  'start_date': '2025-08-01',
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
  'start_operating_date' => '2025-08-01',
  'control_area' => 'ERCOT',
  'start_date' => '2025-08-01',
  'end_date' => '2030-09-01'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_REC_RPS_ERCOT_2025-08-01.csv"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `curl -G "https://api.enerpricedata.com/datasets/download/rec-rps/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2025-08-01" \
  --data-urlencode "control_area=ERCOT" \
  --data-urlencode "start_date=2025-08-01" \
  --data-urlencode "end_date=2030-09-01" \
  -o "EPD_REC_RPS_ERCOT_2025-08-01.csv"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/rec-rps/json",
        title: "Download REC/RPS Data (JSON)",
        description: "Download REC/RPS data in JSON format.",
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

url = "https://api.enerpricedata.com/datasets/download/rec-rps/json"
headers = {"X-API-Key": "YOUR_API_KEY"}
params = {
    "start_operating_date": "2025-08-25",        # Required
    "control_area": "ERCOT",                     # ERCOT, PJM, ISONE, etc.
    "start_date": "2025-08-01",                  # Optional: filter start
    "end_date": "2030-09-01",                    # Optional: filter end
    "raw": False,                                # Optional: if True, return raw JSON instead of file
    "skip": 0,                                   # Optional: pagination skip
    "limit": 100                                 # Optional: pagination limit (max 1000)
}

response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)

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
  'start_operating_date': '2025-08-25',
  'control_area': 'ERCOT',
  'raw': False,
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

uri = URI('https://api.enerpricedata.com/datasets/download/rec-rps/json')
uri.query = URI.encode_www_form(
  'start_operating_date' => '2025-08-25',
  'control_area' => 'ERCOT',
  'raw' => False,
  'skip' => 0,
  'limit' => 100
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  data = JSON.parse(res.body)
  if params[:raw] || params['raw']
    puts "Raw JSON received: #{data.is_a?(Array) ? data.size : data.keys} records"
  else
    filename = "EPD_REC_RPS_ERCOT_2025-08-25.json"
    File.write(filename, JSON.pretty_generate(data))
    puts "Saved as #{filename}"
  end
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# raw=false (default) — save the JSON file:
curl -G "https://api.enerpricedata.com/datasets/download/rec-rps/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2025-08-25" \
  --data-urlencode "control_area=ERCOT" \
  --data-urlencode "raw=False" \
  --data-urlencode "skip=0" \
  --data-urlencode "limit=100" \
  -o "EPD_REC_RPS_ERCOT_2025-08-25.json"

# raw=true — print inline JSON:
# curl -G "https://api.enerpricedata.com/datasets/download/rec-rps/json" \
#   -H "X-API-Key: YOUR_API_KEY" \
#   --data-urlencode "raw=true" \
#   --data-urlencode "start_operating_date=2025-08-15"`
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
          { name: "start_operating_date", type: "date", required: true, description: "Operating date for download" },
          { name: "end_operating_date", type: "date", required: false, description: "Operating End date for download" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/datasets/download/utility-price"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {
    "start_operating_date": "2025-08-15",        # Required in YYYY-MM-DD format
    "end_operating_date": "2025-08-15",          # Optional, for date range
}

response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)

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
  'start_operating_date': '2025-08-15',
  'end_operating_date': '2025-08-15'
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
  'start_operating_date' => '2025-08-15',
  'end_operating_date' => '2025-08-15'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_UtilityPrice_2025-08-15.xlsx"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `curl -G "https://api.enerpricedata.com/datasets/download/utility-price" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2025-08-15" \
  --data-urlencode "end_operating_date=2025-08-15" \
  -o "EPD_UtilityPrice_2025-08-15.xlsx"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/utility-price/csv",
        title: "Download Utility Price (CSV)",
        description: "Download utility price data in CSV format.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Operating date for download" },
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/datasets/download/utility-price/csv"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {
    "start_operating_date": "2025-08-15",        # Required in YYYY-MM-DD format
}

response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)

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
  'start_operating_date': '2025-08-15'
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
  'start_operating_date' => '2025-08-15'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_UtilityPrice_2025-08-15.zip"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `curl -G "https://api.enerpricedata.com/datasets/download/utility-price/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2025-08-15" \
  -o "EPD_UtilityPrice_2025-08-15.zip"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/utility-price/json",
        title: "Download Utility Price (JSON)",
        description: "Download utility price data in JSON format.",
        parameters: [
        { name: "start_operating_date", type: "date", required: true, description: "Operating date for download" },
        { name: "raw", type: "boolean", required: false, description: "If true, returns raw JSON instead of file download" },
        { name: "skip", type: "integer", required: false, description: "Pagination offset for results" },
        { name: "limit", type: "integer", required: false, description: "Maximum number of results to return (max 1000)" }
],
        examples: {
          python: `import json
import requests

endpoint = "/datasets/download/utility-price/json"

params = {
    "start_operating_date": "2025-08-15",        # Required
    "raw": False,                                # Optional: if True, return raw JSON instead of file
    "skip": 0,                                   # Optional: pagination skip
    "limit": 100                                 # Optional: pagination limit (max 1000)
}

response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)

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
  'start_operating_date': '2025-08-15',
  'raw': False,
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

uri = URI('https://api.enerpricedata.com/datasets/download/utility-price/json')
uri.query = URI.encode_www_form(
  'start_operating_date' => '2025-08-15',
  'raw' => False,
  'skip' => 0,
  'limit' => 100
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  data = JSON.parse(res.body)
  if params[:raw] || params['raw']
    puts "Raw JSON received: #{data.is_a?(Array) ? data.size : data.keys} records"
  else
    filename = "EPD_UtilityPrice_2025-08-15.json"
    File.write(filename, JSON.pretty_generate(data))
    puts "Saved as #{filename}"
  end
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# raw=false (default) — save the JSON file:
curl -G "https://api.enerpricedata.com/datasets/download/utility-price/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2025-08-15" \
  --data-urlencode "raw=False" \
  --data-urlencode "skip=0" \
  --data-urlencode "limit=100" \
  -o "EPD_UtilityPrice_2025-08-15.json"

# raw=true — print inline JSON:
# curl -G "https://api.enerpricedata.com/datasets/download/utility-price/json" \
#   -H "X-API-Key: YOUR_API_KEY" \
#   --data-urlencode "raw=true" \
#   --data-urlencode "start_operating_date=2025-08-15"`
        }
      }


    ]
  },

  "natural-gas-utility-price": {
    title: "Natural Gas Utility Price Data",
    description: "Access natural gas utility pricing data — both summary and detailed rows — in Excel, CSV, or JSON format. All endpoints live under the <code>/datasets/download/naturalgas-utility-price</code> prefix and are filtered by operating date.",
    endpoints: [
      {
        method: "GET",
        url: "/datasets/download/naturalgas-utility-price",
        title: "Download Natural Gas Utility Price (Excel)",
        description: "Single workbook with both summary and details sheets for one operating date. If <code>end_operating_date</code> is provided, returns a ZIP of single-date xlsx files for each date in the range.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Operating date (YYYY-MM-DD)" },
          { name: "end_operating_date", type: "date", required: false, description: "End date — when provided, returns a ZIP covering the inclusive range" }
        ],
        examples: {
          python: `import requests

base_url = "https://api.enerpricedata.com"
endpoint = "/datasets/download/naturalgas-utility-price"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {
    "start_operating_date": "2025-08-15",        # Required in YYYY-MM-DD format
    "end_operating_date": "2025-08-15",          # Optional — when set, response is a ZIP of per-date xlsx files
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
  'start_operating_date': '2025-08-15',
  'end_operating_date': '2025-08-15'
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
  'start_operating_date' => '2025-08-15',
  'end_operating_date' => '2025-08-15'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_NaturalGasUtilityPrice_2025-08-15.xlsx"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-utility-price" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2025-08-15" \
  --data-urlencode "end_operating_date=2025-08-15" \
  -o "EPD_NaturalGasUtilityPrice_2025-08-15.xlsx"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/naturalgas-utility-price/summary/csv",
        title: "Download Natural Gas Utility Price — Summary (CSV)",
        description: "Summary rows only, as a single CSV file.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Operating date (YYYY-MM-DD)" }
        ],
        examples: {
          python: `import requests

base_url = "https://api.enerpricedata.com"
endpoint = "/datasets/download/naturalgas-utility-price/summary/csv"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {"start_operating_date": "2025-08-15"}

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
  'start_operating_date': '2025-08-15'
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
  'start_operating_date' => '2025-08-15'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_NaturalGasUtilityPrice_Summary_2025-08-15.csv"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/summary/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2025-08-15" \
  -o "EPD_NaturalGasUtilityPrice_Summary_2025-08-15.csv"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/naturalgas-utility-price/details/csv",
        title: "Download Natural Gas Utility Price — Details (CSV)",
        description: "Details rows only, as a single CSV file.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Operating date (YYYY-MM-DD)" }
        ],
        examples: {
          python: `import requests

base_url = "https://api.enerpricedata.com"
endpoint = "/datasets/download/naturalgas-utility-price/details/csv"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {"start_operating_date": "2025-08-15"}

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
  'start_operating_date': '2025-08-15'
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
  'start_operating_date' => '2025-08-15'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_NaturalGasUtilityPrice_Details_2025-08-15.csv"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/details/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2025-08-15" \
  -o "EPD_NaturalGasUtilityPrice_Details_2025-08-15.csv"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/naturalgas-utility-price/csv",
        title: "Download Natural Gas Utility Price (CSV ZIP)",
        description: "Both summary and details CSVs bundled in a single ZIP archive.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Operating date (YYYY-MM-DD)" }
        ],
        examples: {
          python: `import requests

base_url = "https://api.enerpricedata.com"
endpoint = "/datasets/download/naturalgas-utility-price/csv"

headers = {"X-API-Key": "YOUR_API_KEY"}

params = {"start_operating_date": "2025-08-15"}

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
  'start_operating_date': '2025-08-15'
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
  'start_operating_date' => '2025-08-15'
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  filename = "EPD_NaturalGasUtilityPrice_2025-08-15.zip"
  File.binwrite(filename, res.body)
  puts "Saved as #{filename}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2025-08-15" \
  -o "EPD_NaturalGasUtilityPrice_2025-08-15.zip"`
        }
      },
      {
        method: "GET",
        url: "/datasets/download/naturalgas-utility-price/json",
        title: "Download Natural Gas Utility Price (JSON)",
        description: "Returns the dataset as JSON. By default sends a downloadable .json file; set <code>raw=true</code> for an inline JSON response with paginated details.",
        parameters: [
          { name: "start_operating_date", type: "date", required: true, description: "Operating date (YYYY-MM-DD)" },
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
    "start_operating_date": "2025-08-15",        # Required
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
  'start_operating_date': '2025-08-15',
  'raw': False,
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

uri = URI('https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/json')
uri.query = URI.encode_www_form(
  'start_operating_date' => '2025-08-15',
  'raw' => False,
  'offset' => 0,
  'limit' => 100
)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  data = JSON.parse(res.body)
  if params[:raw] || params['raw']
    puts "Raw JSON received: #{data.is_a?(Array) ? data.size : data.keys} records"
  else
    filename = "EPD_NaturalGasUtilityPrice_2025-08-15.json"
    File.write(filename, JSON.pretty_generate(data))
    puts "Saved as #{filename}"
  end
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `# raw=false (default) — save the JSON file:
curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "start_operating_date=2025-08-15" \
  --data-urlencode "raw=False" \
  --data-urlencode "offset=0" \
  --data-urlencode "limit=100" \
  -o "EPD_NaturalGasUtilityPrice_2025-08-15.json"

# raw=true — print inline JSON:
# curl -G "https://api.enerpricedata.com/datasets/download/naturalgas-utility-price/json" \
#   -H "X-API-Key: YOUR_API_KEY" \
#   --data-urlencode "raw=true" \
#   --data-urlencode "start_operating_date=2025-08-15"`
        }
      }
    ]
  },
  "fair-market-pricing": {
    title: "Fair Market Pricing (FMP)",
    description: `Fair Market Pricing (FMP) runs EnerPrice's Fair Price Engine to produce an all-in, fully-loaded <strong>$/MWh</strong> price for a specific account and contract term — broken down by cost component and by month. Use it two ways: an <strong>on-demand</strong> single calculation, or an <strong>asynchronous batch</strong> for many accounts at once.<br/><br/>
      <strong>Access:</strong> requires the <strong>Fair Market Pricing</strong> permission and access to the requested ISO region (a <code>403</code> is returned otherwise).<br/>
      <strong>Rate limits:</strong> API-key callers are limited to <strong>10 requests/minute</strong> on <code>/pricing/calculate</code> and the download endpoints; batch uploads are capped at <strong>600 rows/day</strong> and <strong>2 concurrent jobs</strong>. Batch state is held for <strong>2 hours</strong>, after which batch endpoints return <code>404</code>.
      <div class="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Batch workflow</p>
        <ol class="list-decimal list-inside text-blue-800 dark:text-blue-200 space-y-1">
          <li>Download the template — <code>GET /pricing/batch-template</code></li>
          <li>Upload your filled file — <code>POST /pricing/batch-upload</code> → returns a <code>batch_id</code></li>
          <li>Poll progress — <code>GET /pricing/batch-status/{batch_id}</code></li>
          <li>Download results — <code>GET /pricing/batch-download/{batch_id}</code> → presigned Excel URL</li>
        </ol>
      </div>`,
    endpoints: [
      {
        method: "GET",
        url: "/pricing/options",
        title: "Get Pricing Options (cascading dropdowns)",
        description: "Discover the valid values for a pricing request. Call as you narrow ISO → State → Utility → Load Profile → Voltage → Load Zone; each response lists what is still available for the remaining fields.",
        parameters: [
          { name: "iso", type: "string", required: true, description: "ISO region (PJM, ISONE, NYISO, ERCOT, MISO, SPP, CAISO)" },
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
    "state": "OH",           # Optional — narrows the remaining options
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
        description: "Run the Fair Price Engine for a single account. <strong>Send parameters as a JSON request body</strong> (not query string). Returns a full pricing report with a component breakdown, month-by-month detail, and the weighted-average <code>total_fr_price</code> ($/MWh). Provide <code>price_to_compare</code> to get a <code>delta</code> vs your current price.",
        parameters: [
          { name: "iso", type: "string", required: true, description: "ISO region (PJM, ISONE, NYISO, ERCOT, MISO, SPP, CAISO)" },
          { name: "state", type: "string", required: true, description: "Account state" },
          { name: "utility_name", type: "string", required: true, description: "Utility name" },
          { name: "load_zone", type: "string", required: true, description: "Load zone" },
          { name: "load_profile", type: "string", required: true, description: "Load profile / rate class" },
          { name: "voltage", type: "string", required: true, description: "Voltage level" },
          { name: "curve_date", type: "date", required: true, description: "Curve publication date (YYYY-MM-DD)" },
          { name: "start_date", type: "date", required: true, description: "Contract start — must be the first of a month (YYYY-MM-01)" },
          { name: "term_months", type: "integer", required: true, description: "Contract length in months (1–60)" },
          { name: "plc_kw", type: "float", required: true, description: "Capacity tag / PLC in kW (≥ 0)" },
          { name: "nspl_kw", type: "float", required: true, description: "Transmission tag / NSPL in kW (≥ 0)" },
          { name: "monthly_usage", type: "float[]", required: true, description: "Exactly 12 monthly usage values (kWh); sum must be > 0" },
          { name: "capacity_zone", type: "string", required: false, description: "Capacity zone (if applicable)" },
          { name: "price_to_compare", type: "float", required: false, description: "Your current $/MWh price; returns a delta vs the fair price" },
          { name: "margin / sleeve_fee / utility_billing_surcharge / other1 / other2", type: "float", required: false, description: "Adders (default 0.0). Each has a matching *_mode of \"usd\" or \"pct\"." },
          { name: "tax_rate", type: "float", required: false, description: "Percent gross-up applied to the total (default 0.0)" },
          { name: "display_mode", type: "string", required: false, description: "\"dollars\" (default) or \"per_mwh\" — affects downloads only" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/pricing/calculate"
headers = {"X-API-Key": "YOUR_API_KEY", "Content-Type": "application/json"}

payload = {
    "iso": "PJM",
    "state": "OH",
    "utility_name": "AEP Ohio",
    "load_zone": "AEP",
    "load_profile": "Commercial",
    "voltage": "Secondary",
    "curve_date": "2025-08-15",     # curve publication date
    "start_date": "2025-09-01",     # must be the first of a month
    "term_months": 12,              # 1–60
    "plc_kw": 150.0,                # capacity tag
    "nspl_kw": 140.0,               # transmission tag
    "monthly_usage": [42000, 38000, 41000, 39000, 45000, 52000,
                      58000, 57000, 50000, 43000, 40000, 44000],  # exactly 12
    "price_to_compare": 78.50       # optional — your current $/MWh
}

response = requests.post(url, headers=headers, json=payload)

if response.status_code == 200:
    data = response.json()
    print(f"Fair market price: \${data['total_fr_price']}/MWh")
    print(f"Delta vs price_to_compare: \${data['delta']}/MWh")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const response = await fetch('https://api.enerpricedata.com/pricing/calculate', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    iso: 'PJM',
    state: 'OH',
    utility_name: 'AEP Ohio',
    load_zone: 'AEP',
    load_profile: 'Commercial',
    voltage: 'Secondary',
    curve_date: '2025-08-15',
    start_date: '2025-09-01',   // first of month
    term_months: 12,
    plc_kw: 150.0,
    nspl_kw: 140.0,
    monthly_usage: [42000, 38000, 41000, 39000, 45000, 52000,
                    58000, 57000, 50000, 43000, 40000, 44000],
    price_to_compare: 78.50
  })
});

if (!response.ok) {
  console.error(\`Error \${response.status}: \${await response.text()}\`);
} else {
  const data = await response.json();
  console.log(\`Fair market price: $\${data.total_fr_price}/MWh (delta $\${data.delta})\`);
}`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('https://api.enerpricedata.com/pricing/calculate')
req = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json', 'X-API-Key' => 'YOUR_API_KEY')
req.body = {
  iso: 'PJM',
  state: 'OH',
  utility_name: 'AEP Ohio',
  load_zone: 'AEP',
  load_profile: 'Commercial',
  voltage: 'Secondary',
  curve_date: '2025-08-15',
  start_date: '2025-09-01',
  term_months: 12,
  plc_kw: 150.0,
  nspl_kw: 140.0,
  monthly_usage: [42000, 38000, 41000, 39000, 45000, 52000,
                  58000, 57000, 50000, 43000, 40000, 44000],
  price_to_compare: 78.50
}.to_json

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  data = JSON.parse(res.body)
  puts "Fair market price: $#{data['total_fr_price']}/MWh (delta $#{data['delta']})"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `curl -X POST "https://api.enerpricedata.com/pricing/calculate" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "iso": "PJM",
    "state": "OH",
    "utility_name": "AEP Ohio",
    "load_zone": "AEP",
    "load_profile": "Commercial",
    "voltage": "Secondary",
    "curve_date": "2025-08-15",
    "start_date": "2025-09-01",
    "term_months": 12,
    "plc_kw": 150.0,
    "nspl_kw": 140.0,
    "monthly_usage": [42000,38000,41000,39000,45000,52000,58000,57000,50000,43000,40000,44000],
    "price_to_compare": 78.50
  }'`
        }
      },
      {
        method: "POST",
        url: "/pricing/download/excel",
        title: "Download Single Pricing Report (Excel)",
        description: "Same JSON request body as <code>/pricing/calculate</code>, but returns a formatted Excel workbook (with an embedded FMP vs Utility Price chart) instead of JSON.",
        parameters: [
          { name: "(request body)", type: "object", required: true, description: "Identical to the /pricing/calculate JSON body. display_mode controls whether values are shown as dollars or $/MWh." }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/pricing/download/excel"
headers = {"X-API-Key": "YOUR_API_KEY", "Content-Type": "application/json"}

payload = {
    "iso": "PJM", "state": "OH", "utility_name": "AEP Ohio",
    "load_zone": "AEP", "load_profile": "Commercial", "voltage": "Secondary",
    "curve_date": "2025-08-15", "start_date": "2025-09-01", "term_months": 12,
    "plc_kw": 150.0, "nspl_kw": 140.0,
    "monthly_usage": [42000, 38000, 41000, 39000, 45000, 52000,
                      58000, 57000, 50000, 43000, 40000, 44000],
    "display_mode": "dollars"
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
  iso: 'PJM', state: 'OH', utility_name: 'AEP Ohio',
  load_zone: 'AEP', load_profile: 'Commercial', voltage: 'Secondary',
  curve_date: '2025-08-15', start_date: '2025-09-01', term_months: 12,
  plc_kw: 150.0, nspl_kw: 140.0,
  monthly_usage: [42000, 38000, 41000, 39000, 45000, 52000,
                  58000, 57000, 50000, 43000, 40000, 44000],
  display_mode: 'dollars'
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
  iso: 'PJM', state: 'OH', utility_name: 'AEP Ohio',
  load_zone: 'AEP', load_profile: 'Commercial', voltage: 'Secondary',
  curve_date: '2025-08-15', start_date: '2025-09-01', term_months: 12,
  plc_kw: 150.0, nspl_kw: 140.0,
  monthly_usage: [42000, 38000, 41000, 39000, 45000, 52000,
                  58000, 57000, 50000, 43000, 40000, 44000],
  display_mode: 'dollars'
}.to_json

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  File.binwrite("pricing_report_PJM_2025-09-01.xlsx", res.body)
  puts "Saved workbook"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `curl -X POST "https://api.enerpricedata.com/pricing/download/excel" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "iso": "PJM", "state": "OH", "utility_name": "AEP Ohio",
    "load_zone": "AEP", "load_profile": "Commercial", "voltage": "Secondary",
    "curve_date": "2025-08-15", "start_date": "2025-09-01", "term_months": 12,
    "plc_kw": 150.0, "nspl_kw": 140.0,
    "monthly_usage": [42000,38000,41000,39000,45000,52000,58000,57000,50000,43000,40000,44000],
    "display_mode": "dollars"
  }' \
  -o "pricing_report_PJM_2025-09-01.xlsx"`
        }
      },
      {
        method: "POST",
        url: "/pricing/download/csv",
        title: "Download Single Pricing Report (CSV)",
        description: "Same JSON request body as <code>/pricing/calculate</code>; returns a CSV with three stacked sections — Summary, Component Breakdown, and Monthly Breakdown.",
        parameters: [
          { name: "(request body)", type: "object", required: true, description: "Identical to the /pricing/calculate JSON body." }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/pricing/download/csv"
headers = {"X-API-Key": "YOUR_API_KEY", "Content-Type": "application/json"}

payload = {
    "iso": "PJM", "state": "OH", "utility_name": "AEP Ohio",
    "load_zone": "AEP", "load_profile": "Commercial", "voltage": "Secondary",
    "curve_date": "2025-08-15", "start_date": "2025-09-01", "term_months": 12,
    "plc_kw": 150.0, "nspl_kw": 140.0,
    "monthly_usage": [42000, 38000, 41000, 39000, 45000, 52000,
                      58000, 57000, 50000, 43000, 40000, 44000]
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
  iso: 'PJM', state: 'OH', utility_name: 'AEP Ohio',
  load_zone: 'AEP', load_profile: 'Commercial', voltage: 'Secondary',
  curve_date: '2025-08-15', start_date: '2025-09-01', term_months: 12,
  plc_kw: 150.0, nspl_kw: 140.0,
  monthly_usage: [42000, 38000, 41000, 39000, 45000, 52000,
                  58000, 57000, 50000, 43000, 40000, 44000]
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
  iso: 'PJM', state: 'OH', utility_name: 'AEP Ohio',
  load_zone: 'AEP', load_profile: 'Commercial', voltage: 'Secondary',
  curve_date: '2025-08-15', start_date: '2025-09-01', term_months: 12,
  plc_kw: 150.0, nspl_kw: 140.0,
  monthly_usage: [42000, 38000, 41000, 39000, 45000, 52000,
                  58000, 57000, 50000, 43000, 40000, 44000]
}.to_json

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
File.binwrite("pricing_report_PJM_2025-09-01.csv", res.body)
puts "Saved CSV"`,
          curl: `curl -X POST "https://api.enerpricedata.com/pricing/download/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "iso": "PJM", "state": "OH", "utility_name": "AEP Ohio",
    "load_zone": "AEP", "load_profile": "Commercial", "voltage": "Secondary",
    "curve_date": "2025-08-15", "start_date": "2025-09-01", "term_months": 12,
    "plc_kw": 150.0, "nspl_kw": 140.0,
    "monthly_usage": [42000,38000,41000,39000,45000,52000,58000,57000,50000,43000,40000,44000]
  }' \
  -o "pricing_report_PJM_2025-09-01.csv"`
        }
      },
      {
        method: "GET",
        url: "/pricing/batch-template",
        title: "Download Batch Template (Excel)",
        description: "Download the empty Excel template for batch pricing — one row per account. Fill it in and submit it to /pricing/batch-upload.",
        parameters: [],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/pricing/batch-template"
headers = {"X-API-Key": "YOUR_API_KEY"}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    with open("batch_pricing_template.xlsx", "wb") as f:
        f.write(response.content)
    print("Saved as 'batch_pricing_template.xlsx'")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const response = await fetch('https://api.enerpricedata.com/pricing/batch-template', {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync('batch_pricing_template.xlsx', buffer);
console.log('Saved template');`,
          ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.enerpricedata.com/pricing/batch-template')
req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
File.binwrite("batch_pricing_template.xlsx", res.body)
puts "Saved template"`,
          curl: `curl -G "https://api.enerpricedata.com/pricing/batch-template" \
  -H "X-API-Key: YOUR_API_KEY" \
  -o "batch_pricing_template.xlsx"`
        }
      },
      {
        method: "POST",
        url: "/pricing/batch-upload",
        title: "Upload Batch Pricing File",
        description: "Upload a filled CSV/XLSX (one row per account, max 200 rows) as multipart form-data under the field name <code>file</code>. Validates rows, dispatches a background job, and returns a <code>batch_id</code> for polling. Daily cap: 600 rows; max 2 concurrent jobs.",
        parameters: [
          { name: "file", type: "file", required: true, description: "Multipart file upload (CSV or XLSX) of account rows" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/pricing/batch-upload"
headers = {"X-API-Key": "YOUR_API_KEY"}

with open("batch_pricing_filled.xlsx", "rb") as f:
    files = {"file": ("batch_pricing_filled.xlsx", f,
             "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")}
    response = requests.post(url, headers=headers, files=files)

if response.status_code == 200:
    data = response.json()
    print(f"batch_id: {data['batch_id']}")
    print(f"{data['valid_rows']}/{data['total_rows']} rows accepted")
    for err in data.get("validation_errors", []):
        print("  ", err)
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const form = new FormData();
form.append('file', new Blob([fs.readFileSync('batch_pricing_filled.xlsx')]), 'batch_pricing_filled.xlsx');

const response = await fetch('https://api.enerpricedata.com/pricing/batch-upload', {
  method: 'POST',
  headers: { 'X-API-Key': 'YOUR_API_KEY' },
  body: form
});

const data = await response.json();
console.log(\`batch_id: \${data.batch_id} — \${data.valid_rows}/\${data.total_rows} accepted\`);`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('https://api.enerpricedata.com/pricing/batch-upload')
req = Net::HTTP::Post.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'
form = [['file', File.open('batch_pricing_filled.xlsx')]]
req.set_form(form, 'multipart/form-data')

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
data = JSON.parse(res.body)
puts "batch_id: #{data['batch_id']} — #{data['valid_rows']}/#{data['total_rows']} accepted"`,
          curl: `curl -X POST "https://api.enerpricedata.com/pricing/batch-upload" \
  -H "X-API-Key: YOUR_API_KEY" \
  -F "file=@batch_pricing_filled.xlsx"`
        }
      },
      {
        method: "GET",
        url: "/pricing/batch-jobs",
        title: "List Batch Jobs",
        description: "List your recent batch pricing jobs, newest first.",
        parameters: [
          { name: "limit", type: "integer", required: false, description: "Max jobs to return, 1–100 (default 20)" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/pricing/batch-jobs"
headers = {"X-API-Key": "YOUR_API_KEY"}

response = requests.get(url, headers=headers, params={"limit": 20})

for job in response.json().get("jobs", []):
    print(f"{job['batch_id']}  {job['status']:11}  {job['total_rows']} rows")`,
          javascript: `const response = await fetch('https://api.enerpricedata.com/pricing/batch-jobs?limit=20', {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

const { jobs } = await response.json();
jobs.forEach(j => console.log(\`\${j.batch_id}  \${j.status}  \${j.total_rows} rows\`));`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('https://api.enerpricedata.com/pricing/batch-jobs')
uri.query = URI.encode_www_form('limit' => 20)
req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
JSON.parse(res.body)['jobs'].each { |j| puts "#{j['batch_id']}  #{j['status']}  #{j['total_rows']} rows" }`,
          curl: `curl -G "https://api.enerpricedata.com/pricing/batch-jobs" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "limit=20"`
        }
      },
      {
        method: "GET",
        url: "/pricing/batch-status/{batch_id}",
        title: "Get Batch Status",
        description: "Detailed status for one batch, including row-level progress and any per-row errors. Poll until <code>status</code> is <code>completed</code> (or <code>failed</code>).",
        parameters: [
          { name: "batch_id", type: "string", required: true, description: "Batch id returned by /pricing/batch-upload (path parameter)" }
        ],
        examples: {
          python: `import requests

batch_id = "a3f8d2e1c4b7"
url = f"https://api.enerpricedata.com/pricing/batch-status/{batch_id}"
headers = {"X-API-Key": "YOUR_API_KEY"}

response = requests.get(url, headers=headers)
data = response.json()
print(f"status: {data['status']}  ({data['completed']}/{data['total']} done, {data['errors_count']} errors)")`,
          javascript: `const batchId = 'a3f8d2e1c4b7';
const response = await fetch(\`https://api.enerpricedata.com/pricing/batch-status/\${batchId}\`, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

const data = await response.json();
console.log(\`status: \${data.status} (\${data.completed}/\${data.total} done)\`);`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

batch_id = "a3f8d2e1c4b7"
uri = URI("https://api.enerpricedata.com/pricing/batch-status/#{batch_id}")
req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
data = JSON.parse(res.body)
puts "status: #{data['status']} (#{data['completed']}/#{data['total']} done)"`,
          curl: `curl -G "https://api.enerpricedata.com/pricing/batch-status/a3f8d2e1c4b7" \
  -H "X-API-Key: YOUR_API_KEY"`
        }
      },
      {
        method: "GET",
        url: "/pricing/batch-download/{batch_id}",
        title: "Download Batch Results",
        description: "Returns a JSON body with a <strong>presigned S3 URL</strong> to the result Excel — <code>{ download_url, expires_in }</code>. The URL is short-lived (<code>expires_in</code> is <strong>900</strong> seconds / 15 minutes) — download it promptly. Only available once the batch <code>status</code> is <code>completed</code>. Admin keys receive the full component breakdown; standard keys receive a rolled-up workbook.",
        parameters: [
          { name: "batch_id", type: "string", required: true, description: "Batch id returned by /pricing/batch-upload (path parameter)" }
        ],
        examples: {
          python: `import requests

batch_id = "a3f8d2e1c4b7"
url = f"https://api.enerpricedata.com/pricing/batch-download/{batch_id}"
headers = {"X-API-Key": "YOUR_API_KEY"}

response = requests.get(url, headers=headers)
if response.status_code == 200:
    download_url = response.json()["download_url"]
    # Follow the presigned URL to fetch the actual file
    xlsx = requests.get(download_url)
    with open(f"batch_pricing_results_{batch_id}.xlsx", "wb") as f:
        f.write(xlsx.content)
    print("Saved results workbook")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const batchId = 'a3f8d2e1c4b7';
const response = await fetch(\`https://api.enerpricedata.com/pricing/batch-download/\${batchId}\`, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

const { download_url } = await response.json();
const file = await fetch(download_url);
fs.writeFileSync(\`batch_pricing_results_\${batchId}.xlsx\`, Buffer.from(await file.arrayBuffer()));
console.log('Saved results workbook');`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

batch_id = "a3f8d2e1c4b7"
uri = URI("https://api.enerpricedata.com/pricing/batch-download/#{batch_id}")
req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
download_url = JSON.parse(res.body)['download_url']
file = Net::HTTP.get(URI(download_url))
File.binwrite("batch_pricing_results_#{batch_id}.xlsx", file)
puts "Saved results workbook"`,
          curl: `# 1) Get the presigned URL
curl -G "https://api.enerpricedata.com/pricing/batch-download/a3f8d2e1c4b7" \
  -H "X-API-Key: YOUR_API_KEY"

# 2) Then download the file from the returned "download_url":
# curl -o "batch_pricing_results.xlsx" "<download_url from step 1>"`
        }
      }
    ]
  },

  "comparative-savings": {
    title: "Comparative Savings Analysis",
    description: `Comparative Savings shows how much an account could save by switching from its current <em>Utility Price</em> to EnerPrice's <em>Fair Market Price (FMP)</em>. Upload a spreadsheet of meter reads (one workbook, up to <strong>200 rows</strong>); the engine prices each account and returns a per-account and summary savings workbook.<br/><br/>
      It follows the same asynchronous pattern as batch pricing — <strong>template → upload → poll status → download</strong> — and jobs are retained for <strong>2 hours</strong>. Requires the <strong>Utility Price</strong> permission.
      <div class="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p class="font-semibold text-blue-900 dark:text-blue-100 mb-2">Workflow</p>
        <ol class="list-decimal list-inside text-blue-800 dark:text-blue-200 space-y-1">
          <li>Download the template — <code>GET /api/v1/utility-price/savings-template</code></li>
          <li>Upload your filled file — <code>POST /api/v1/utility-price/savings-upload</code> → returns a <code>batch_id</code></li>
          <li>Poll progress — <code>GET /api/v1/utility-price/savings-status/{batch_id}</code></li>
          <li>Download results — <code>GET /api/v1/utility-price/savings-download/{batch_id}</code> → presigned Excel URL</li>
        </ol>
      </div>`,
    endpoints: [
      {
        method: "GET",
        url: "/api/v1/utility-price/savings-template",
        title: "Download Savings Template (Excel)",
        description: "Download the empty Excel template for a comparative-savings upload. Fill in one row per meter read.",
        parameters: [],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/api/v1/utility-price/savings-template"
headers = {"X-API-Key": "YOUR_API_KEY"}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    with open("comparative_savings_template.xlsx", "wb") as f:
        f.write(response.content)
    print("Saved as 'comparative_savings_template.xlsx'")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const response = await fetch('https://api.enerpricedata.com/api/v1/utility-price/savings-template', {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync('comparative_savings_template.xlsx', buffer);
console.log('Saved template');`,
          ruby: `require 'net/http'
require 'uri'

uri = URI('https://api.enerpricedata.com/api/v1/utility-price/savings-template')
req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
File.binwrite("comparative_savings_template.xlsx", res.body)
puts "Saved template"`,
          curl: `curl -G "https://api.enerpricedata.com/api/v1/utility-price/savings-template" \
  -H "X-API-Key: YOUR_API_KEY" \
  -o "comparative_savings_template.xlsx"`
        }
      },
      {
        method: "POST",
        url: "/api/v1/utility-price/savings-upload",
        title: "Upload Meter Reads",
        description: "Upload the filled Excel file (up to 200 rows) as multipart form-data under the field name <code>file</code>. Validates rows, starts a background job, and returns a <code>batch_id</code>. A utility-price dataset must be available (else <code>404</code>).",
        parameters: [
          { name: "file", type: "file", required: true, description: "Multipart Excel upload of meter reads" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/api/v1/utility-price/savings-upload"
headers = {"X-API-Key": "YOUR_API_KEY"}

with open("comparative_savings_filled.xlsx", "rb") as f:
    files = {"file": ("comparative_savings_filled.xlsx", f,
             "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")}
    response = requests.post(url, headers=headers, files=files)

if response.status_code == 200:
    data = response.json()
    print(f"batch_id: {data['batch_id']}  ({data['accepted_reads']} reads accepted)")
    for err in data.get("errors", []):
        print("  ", err)
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const form = new FormData();
form.append('file', new Blob([fs.readFileSync('comparative_savings_filled.xlsx')]), 'comparative_savings_filled.xlsx');

const response = await fetch('https://api.enerpricedata.com/api/v1/utility-price/savings-upload', {
  method: 'POST',
  headers: { 'X-API-Key': 'YOUR_API_KEY' },
  body: form
});

const data = await response.json();
console.log(\`batch_id: \${data.batch_id} (\${data.accepted_reads} reads accepted)\`);`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('https://api.enerpricedata.com/api/v1/utility-price/savings-upload')
req = Net::HTTP::Post.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'
req.set_form([['file', File.open('comparative_savings_filled.xlsx')]], 'multipart/form-data')

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
data = JSON.parse(res.body)
puts "batch_id: #{data['batch_id']} (#{data['accepted_reads']} reads accepted)"`,
          curl: `curl -X POST "https://api.enerpricedata.com/api/v1/utility-price/savings-upload" \
  -H "X-API-Key: YOUR_API_KEY" \
  -F "file=@comparative_savings_filled.xlsx"`
        }
      },
      {
        method: "GET",
        url: "/api/v1/utility-price/savings-jobs",
        title: "List Savings Jobs",
        description: "List your recent comparative-savings jobs, newest first.",
        parameters: [
          { name: "limit", type: "integer", required: false, description: "Max jobs to return, 1–100 (default 20)" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/api/v1/utility-price/savings-jobs"
headers = {"X-API-Key": "YOUR_API_KEY"}

response = requests.get(url, headers=headers, params={"limit": 20})

for job in response.json().get("jobs", []):
    print(f"{job['batch_id']}  {job['status']:11}  {job['accepted_reads']} reads")`,
          javascript: `const response = await fetch('https://api.enerpricedata.com/api/v1/utility-price/savings-jobs?limit=20', {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

const { jobs } = await response.json();
jobs.forEach(j => console.log(\`\${j.batch_id}  \${j.status}  \${j.accepted_reads} reads\`));`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('https://api.enerpricedata.com/api/v1/utility-price/savings-jobs')
uri.query = URI.encode_www_form('limit' => 20)
req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
JSON.parse(res.body)['jobs'].each { |j| puts "#{j['batch_id']}  #{j['status']}  #{j['accepted_reads']} reads" }`,
          curl: `curl -G "https://api.enerpricedata.com/api/v1/utility-price/savings-jobs" \
  -H "X-API-Key: YOUR_API_KEY" \
  --data-urlencode "limit=20"`
        }
      },
      {
        method: "GET",
        url: "/api/v1/utility-price/savings-status/{batch_id}",
        title: "Get Savings Status",
        description: "Check progress of a savings job. Once complete, <code>accounts</code> is populated with per-account results — each with a <code>header</code>, priced <code>rows</code>, a <code>summary</code>, and a <code>price_unit</code> (<code>$/kWh</code> for power, <code>$/MMBtu</code> for gas).",
        parameters: [
          { name: "batch_id", type: "string", required: true, description: "Batch id returned by /savings-upload (path parameter)" }
        ],
        examples: {
          python: `import requests

batch_id = "a3f8d2e1c4b7"
url = f"https://api.enerpricedata.com/api/v1/utility-price/savings-status/{batch_id}"
headers = {"X-API-Key": "YOUR_API_KEY"}

response = requests.get(url, headers=headers)
data = response.json()
print(f"status: {data['status']}  ({len(data['accounts'])} accounts)")
for acct in data["accounts"]:
    s = acct.get("summary") or {}
    print(f"  {acct['account_id']}: avg savings {s.get('avg_savings_pct')}%  total \${s.get('total_savings_dollar')}")`,
          javascript: `const batchId = 'a3f8d2e1c4b7';
const response = await fetch(\`https://api.enerpricedata.com/api/v1/utility-price/savings-status/\${batchId}\`, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

const data = await response.json();
console.log(\`status: \${data.status} (\${data.accounts.length} accounts)\`);`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

batch_id = "a3f8d2e1c4b7"
uri = URI("https://api.enerpricedata.com/api/v1/utility-price/savings-status/#{batch_id}")
req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
data = JSON.parse(res.body)
puts "status: #{data['status']} (#{data['accounts'].size} accounts)"`,
          curl: `curl -G "https://api.enerpricedata.com/api/v1/utility-price/savings-status/a3f8d2e1c4b7" \
  -H "X-API-Key: YOUR_API_KEY"`
        }
      },
      {
        method: "GET",
        url: "/api/v1/utility-price/savings-download/{batch_id}",
        title: "Download Savings Results",
        description: "Returns a JSON body with a <strong>presigned S3 URL</strong> to the results Excel — <code>{ download_url, expires_in }</code>. The URL is short-lived (<code>expires_in</code> is <strong>900</strong> seconds / 15 minutes) — download it promptly. Only available once the job <code>status</code> is <code>completed</code>.",
        parameters: [
          { name: "batch_id", type: "string", required: true, description: "Batch id returned by /savings-upload (path parameter)" }
        ],
        examples: {
          python: `import requests

batch_id = "a3f8d2e1c4b7"
url = f"https://api.enerpricedata.com/api/v1/utility-price/savings-download/{batch_id}"
headers = {"X-API-Key": "YOUR_API_KEY"}

response = requests.get(url, headers=headers)
if response.status_code == 200:
    download_url = response.json()["download_url"]
    xlsx = requests.get(download_url)
    with open(f"comparative_savings_{batch_id}.xlsx", "wb") as f:
        f.write(xlsx.content)
    print("Saved results workbook")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const fs = require('fs');

const batchId = 'a3f8d2e1c4b7';
const response = await fetch(\`https://api.enerpricedata.com/api/v1/utility-price/savings-download/\${batchId}\`, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

const { download_url } = await response.json();
const file = await fetch(download_url);
fs.writeFileSync(\`comparative_savings_\${batchId}.xlsx\`, Buffer.from(await file.arrayBuffer()));
console.log('Saved results workbook');`,
          ruby: `require 'net/http'
require 'uri'
require 'json'

batch_id = "a3f8d2e1c4b7"
uri = URI("https://api.enerpricedata.com/api/v1/utility-price/savings-download/#{batch_id}")
req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
download_url = JSON.parse(res.body)['download_url']
file = Net::HTTP.get(URI(download_url))
File.binwrite("comparative_savings_#{batch_id}.xlsx", file)
puts "Saved results workbook"`,
          curl: `# 1) Get the presigned URL
curl -G "https://api.enerpricedata.com/api/v1/utility-price/savings-download/a3f8d2e1c4b7" \
  -H "X-API-Key: YOUR_API_KEY"

# 2) Then download the file from the returned "download_url":
# curl -o "comparative_savings.xlsx" "<download_url from step 1>"`
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
                <th class="py-2 px-3 font-large text-gray-900 dark:text-gray-100">Metric</th>
                <th class="py-2 px-3 font-large text-gray-900 dark:text-gray-100">Formula</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b dark:border-gray-600">
                <td class="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">Savings (per unit)</td>
                <td class="py-2 px-3 text-gray-600 dark:text-gray-300"><code>Utility Price − Fair Market Price</code></td>
              </tr>
              <tr class="border-b dark:border-gray-600">
                <td class="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">Savings (%)</td>
                <td class="py-2 px-3 text-gray-600 dark:text-gray-300"><code>(Utility Price − FMP) / Utility Price × 100</code></td>
              </tr>
              <tr class="border-b dark:border-gray-600">
                <td class="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">Total Savings ($)</td>
                <td class="py-2 px-3 text-gray-600 dark:text-gray-300"><code>(Utility Price − FMP) × Total Usage</code></td>
              </tr>
              <tr>
                <td class="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">Sign convention</td>
                <td class="py-2 px-3 text-gray-600 dark:text-gray-300">Positive savings means the Fair Market Price is cheaper than the utility.</td>
              </tr>
            </tbody>
          </table>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">Prices are expressed per unit — <code>$/kWh</code> for electricity and <code>$/MMBtu</code> for natural gas (see each account's <code>price_unit</code>).</p>
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
              <tr><td class="px-6 py-4 font-mono text-red-600 dark:text-red-400">503</td><td class="px-6 py-4 text-gray-600 dark:text-gray-300">Service Unavailable — Rate-limit backend (Redis) is unreachable; requests fail closed. Retry after a short delay.</td></tr>
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