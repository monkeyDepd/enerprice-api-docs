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