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
            <p class="text-sm text-gray-600 dark:text-gray-300">10 requests/minute on Fair Market Pricing endpoints (<code class="text-xs">/pricing/calculate</code>, <code class="text-xs">/pricing/download/excel</code>, <code class="text-xs">/pricing/download/csv</code>) for API-key users. Batch endpoints are throttled by daily row quota (600/day) and concurrency (max 2 jobs). No rate limit on dataset download endpoints currently.</p>
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
            { name: "control_area", type: "string", required: false, description: "Control area filter (e.g., ERCOT, PJM, ISONE)" },
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
          { name: "control_area", type: "string", required: false, description: "Control area (ERCOT, ISONE, PJM)" },
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
          { name: "control_area", type: "string", required: false, description: "Control area filter (e.g., ERCOT, PJM, ISONE)" },
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
        { name: "control_area", type: "string", required: false, description: "Control area filter (e.g., ERCOT, PJM, ISONE)" },
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
          /*javascript: `const response = await fetch('https://api.enerpricedata.com/datasets/download/rec-rps?start_operating_date=2024-01-15', {
    headers: { 'X-API-Key': 'YOUR_API_KEY' }
});`,
          ruby: `uri = URI('https://api.enerpricedata.com/datasets/download/rec-rps')
request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'YOUR_API_KEY'`,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/rec-rps?start_operating_date=2024-01-15" \\
  -H "X-API-Key: YOUR_API_KEY"`*/
        }
      },
      {
        method: "GET",
        url: "/datasets/download/rec-rps/csv",
        title: "Download REC/RPS Data (CSV)",
        description: "Download REC/RPS data in CSV format.",
        parameters: [
        { name: "start_operating_date", type: "date", required: true, description: "Start date for download" },
        { name: "control_area", type: "string", required: false, description: "Control area filter (e.g., ERCOT, PJM, ISONE)" },
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
          /*javascript: `const response = await fetch('https://api.enerpricedata.com/datasets/download/rec-rps?start_operating_date=2024-01-15', {
    headers: { 'X-API-Key': 'YOUR_API_KEY' }
});`,
          ruby: `uri = URI('https://api.enerpricedata.com/datasets/download/rec-rps')
request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'YOUR_API_KEY'`,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/rec-rps?start_operating_date=2024-01-15" \\
  -H "X-API-Key: YOUR_API_KEY"`*/
        }
      },
      {
        method: "GET",
        url: "/datasets/download/rec-rps/json",
        title: "Download REC/RPS Data (JSON)",
        description: "Download REC/RPS data in JSON format.",
        parameters: [
        { name: "start_operating_date", type: "date", required: true, description: "Date for data download (YYYY-MM-DD)" },
          { name: "control_area", type: "string", required: false, description: "Control area filter (e.g., ERCOT, PJM, ISONE)" },
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
          /*javascript: `const response = await fetch('https://api.enerpricedata.com/datasets/download/rec-rps?start_operating_date=2024-01-15', {
    headers: { 'X-API-Key': 'YOUR_API_KEY' }
});`,
          ruby: `uri = URI('https://api.enerpricedata.com/datasets/download/rec-rps')
request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'YOUR_API_KEY'`,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/rec-rps?start_operating_date=2024-01-15" \\
  -H "X-API-Key: YOUR_API_KEY"`*/
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
          /*javascript: `const response = await fetch('https://api.enerpricedata.com/datasets/download/utility-price?start_operating_date=2024-01-15', {
    headers: { 'X-API-Key': 'YOUR_API_KEY' }
});`,
          ruby: `uri = URI('https://api.enerpricedata.com/datasets/download/utility-price')
request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'YOUR_API_KEY'`,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/utility-price?start_operating_date=2024-01-15" \\
  -H "X-API-Key: YOUR_API_KEY"`*/
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
          /*javascript: `const response = await fetch('https://api.enerpricedata.com/datasets/download/utility-price?start_operating_date=2024-01-15', {
    headers: { 'X-API-Key': 'YOUR_API_KEY' }
});`,
          ruby: `uri = URI('https://api.enerpricedata.com/datasets/download/utility-price')
request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'YOUR_API_KEY'`,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/utility-price?start_operating_date=2024-01-15" \\
  -H "X-API-Key: YOUR_API_KEY"`*/
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
          /*javascript: `const response = await fetch('https://api.enerpricedata.com/datasets/download/utility-price?start_operating_date=2024-01-15', {
    headers: { 'X-API-Key': 'YOUR_API_KEY' }
});`,
          ruby: `uri = URI('https://api.enerpricedata.com/datasets/download/utility-price')
request = Net::HTTP::Get.new(uri)
request['X-API-Key'] = 'YOUR_API_KEY'`,
          curl: `curl -X GET "https://api.enerpricedata.com/datasets/download/utility-price?start_operating_date=2024-01-15" \\
  -H "X-API-Key: YOUR_API_KEY"`*/
        }
      }


    ]
  },

  "fair-market-pricing": {
    title: "Fair Market Pricing",
    description: `<p>Run the Fair Price Engine to calculate $/MWh pricing for a given utility, load zone, and term. Endpoints support real-time calculation, Excel/CSV exports, and batch uploads for bulk pricing.</p>
<p>All endpoints live under the <code>/pricing</code> prefix. Access requires the permission for the requested ISO region in Fair Market Pricing.</p>
<p><strong>Rate limits</strong></p>
<ul>
  <li><strong>10 requests/minute</strong> for API-key users on <code>/pricing/calculate</code>, <code>/pricing/download/excel</code>, and <code>/pricing/download/csv</code>. JWT/UI users are unthrottled.</li>
  <li><code>/pricing/batch-upload</code>: <strong>600 valid rows/day</strong> per user, max <strong>2 concurrent batch jobs</strong>.</li>
  <li><code>/pricing/options</code>, <code>/pricing/batch-template</code>, <code>/pricing/batch-status</code>, and <code>/pricing/batch-download</code> have no rate limit.</li>
</ul>
<p><strong>Batch lifecycle</strong></p>
<ul>
  <li>Batch metadata and results expire <strong>2 hours</strong> after upload.</li>
  <li>The presigned download URL itself expires <strong>15 minutes</strong> after issue.</li>
</ul>`,
    endpoints: [
      {
        method: "POST",
        url: "/pricing/calculate",
        title: "Calculate Fair Market Price",
        description: `<p>Execute the Fair Price Engine pipeline. Returns a full pricing report with component breakdown, monthly aggregation, and weighted-average $/MWh.</p>
<p>Body is JSON. <strong>Rate limit: 10 requests/minute</strong> for API-key users; JWT/UI users are unthrottled. Use <code>/pricing/batch-upload</code> for higher volumes.</p>`,
        parameters: [
          { name: "curve_date", type: "date", required: true, description: "Forward curve date (YYYY-MM-DD)" },
          { name: "start_date", type: "date", required: true, description: "Contract start date — must be the first day of a month (YYYY-MM-DD)" },
          { name: "term_months", type: "integer", required: true, description: "Contract length in months (1–60)" },
          { name: "iso", type: "string", required: true, description: "ISO region: PJM, ISONE, NYISO, ERCOT, MISO, SPP, or CAISO" },
          { name: "utility_name", type: "string", required: true, description: "Utility name (validate via /pricing/options)" },
          { name: "load_zone", type: "string", required: true, description: "Load zone within the ISO" },
          { name: "capacity_zone", type: "string", required: false, description: "Capacity zone (NYISO/ISONE)" },
          { name: "state", type: "string", required: true, description: "State (e.g., PA, NJ, MA)" },
          { name: "load_profile", type: "string", required: true, description: "Load profile name (e.g., \"Residential Service (R)\")" },
          { name: "voltage", type: "string", required: true, description: "Voltage class (e.g., \"Secondary\")" },
          { name: "plc_kw", type: "number", required: true, description: "Peak Load Contribution in kW-mo (≥ 0)" },
          { name: "nspl_kw", type: "number", required: true, description: "Network Service Peak Load in kW-mo (≥ 0)" },
          { name: "monthly_usage", type: "array<number>", required: true, description: "Exactly 12 monthly usage values in MWh (Jan–Dec); total must be > 0" },
          { name: "margin", type: "number", required: false, description: "Margin adder in $/MWh (default 0)" },
          { name: "sleeve_fee", type: "number", required: false, description: "Sleeve fee in $/MWh (default 0)" },
          { name: "utility_billing_surcharge", type: "number", required: false, description: "UBS adder in $/MWh (default 0)" },
          { name: "other1", type: "number", required: false, description: "Other adder #1 in $/MWh (default 0)" },
          { name: "other2", type: "number", required: false, description: "Other adder #2 in $/MWh (default 0)" },
          { name: "price_to_compare", type: "number", required: false, description: "Comparison price ($/MWh) — response includes delta vs. this value" },
          { name: "account_name", type: "string", required: false, description: "Account label (echoed in response)" },
          { name: "account_address", type: "string", required: false, description: "Account address (echoed in response)" },
          { name: "account_number", type: "string", required: false, description: "Account number (echoed in response)" },
          { name: "display_mode", type: "string", required: false, description: "\"dollars\" or \"per_mwh\" — affects download endpoints only (default \"dollars\")" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/pricing/calculate"
headers = {
    "X-API-Key": "YOUR_API_KEY",
    "Content-Type": "application/json"
}

payload = {
    "curve_date": "2025-08-25",
    "start_date": "2026-01-01",
    "term_months": 12,
    "iso": "PJM",
    "utility_name": "PECO ENERGY CO",
    "load_zone": "PECO",
    "state": "PA",
    "load_profile": "Residential Service (R)",
    "voltage": "Secondary",
    "plc_kw": 5.2,
    "nspl_kw": 5.0,
    "monthly_usage": [1.2, 1.1, 1.0, 0.9, 1.0, 1.4, 1.6, 1.7, 1.5, 1.2, 1.1, 1.3],
    "margin": 2.0,
    "price_to_compare": 78.50
}

response = requests.post(url, headers=headers, json=payload)

if response.status_code == 200:
    result = response.json()
    print(f"Total FR Price: \${result['total_fr_price']} /MWh")
    print(f"Delta vs PTC:   \${result.get('utility_price_delta')} /MWh")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `// Calculate Fair Market Price
const payload = {
  curve_date: '2025-08-25',
  start_date: '2026-01-01',
  term_months: 12,
  iso: 'PJM',
  utility_name: 'PECO ENERGY CO',
  load_zone: 'PECO',
  state: 'PA',
  load_profile: 'Residential Service (R)',
  voltage: 'Secondary',
  plc_kw: 5.2,
  nspl_kw: 5.0,
  monthly_usage: [1.2, 1.1, 1.0, 0.9, 1.0, 1.4, 1.6, 1.7, 1.5, 1.2, 1.1, 1.3],
  margin: 2.0,
  price_to_compare: 78.5
};

const response = await fetch('https://api.enerpricedata.com/pricing/calculate', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
});

const result = await response.json();
console.log('Total FR Price ($/MWh):', result.total_fr_price);`,
          ruby: `require 'net/http'
require 'json'

uri = URI('https://api.enerpricedata.com/pricing/calculate')

payload = {
  curve_date: '2025-08-25',
  start_date: '2026-01-01',
  term_months: 12,
  iso: 'PJM',
  utility_name: 'PECO ENERGY CO',
  load_zone: 'PECO',
  state: 'PA',
  load_profile: 'Residential Service (R)',
  voltage: 'Secondary',
  plc_kw: 5.2,
  nspl_kw: 5.0,
  monthly_usage: [1.2, 1.1, 1.0, 0.9, 1.0, 1.4, 1.6, 1.7, 1.5, 1.2, 1.1, 1.3],
  margin: 2.0,
  price_to_compare: 78.5
}

req = Net::HTTP::Post.new(uri, 'X-API-Key' => 'YOUR_API_KEY', 'Content-Type' => 'application/json')
req.body = payload.to_json

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  result = JSON.parse(res.body)
  puts "Total FR Price ($/MWh): #{result['total_fr_price']}"
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `curl -X POST "https://api.enerpricedata.com/pricing/calculate" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "curve_date": "2025-08-25",
    "start_date": "2026-01-01",
    "term_months": 12,
    "iso": "PJM",
    "utility_name": "PECO ENERGY CO",
    "load_zone": "PECO",
    "state": "PA",
    "load_profile": "Residential Service (R)",
    "voltage": "Secondary",
    "plc_kw": 5.2,
    "nspl_kw": 5.0,
    "monthly_usage": [1.2,1.1,1.0,0.9,1.0,1.4,1.6,1.7,1.5,1.2,1.1,1.3],
    "margin": 2.0,
    "price_to_compare": 78.50
  }'`
        }
      },
      {
        method: "GET",
        url: "/pricing/options",
        title: "Get Cascading Dropdown Options",
        description: `<p>Populate dependent dropdowns for the pricing form. Returns the available <strong>utilities</strong>, <strong>load zones</strong>, <strong>load profiles</strong>, <strong>voltages</strong>, <strong>states</strong>, and <strong>capacity zones</strong> for a given ISO, narrowing further when you pass <code>state</code> and/or <code>utility_name</code>.</p>`,
        parameters: [
          { name: "iso", type: "string", required: true, description: "ISO region. Allowed values: PJM, ISONE, NYISO, ERCOT, MISO, SPP, CAISO." },
          { name: "state", type: "string", required: false, description: "State filter (e.g. PA, NJ, MA). Narrows utilities, load zones, capacity zones, and load profiles." },
          { name: "utility_name", type: "string", required: false, description: "Utility filter. Narrows load profiles to that utility's tariff classes." },
          { name: "load_profile", type: "string", required: false, description: "Load profile to validate against the available list" },
          { name: "voltage", type: "string", required: false, description: "Voltage class to validate against the available list" },
          { name: "curve_date", type: "date", required: false, description: "Curve date (YYYY-MM-DD). Currently used only for warnings about missing datasets." },
          { name: "load_zone", type: "string", required: false, description: "Load zone (passed through; not validated)" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/pricing/options"
headers = {"X-API-Key": "YOUR_API_KEY"}
params = {
    "iso": "PJM",
    "state": "PA",
    "utility_name": "PECO ENERGY CO"
}

response = requests.get(url, headers=headers, params=params)
data = response.json()

print("Valid:", data["valid"])
print("Errors:", data["errors"])
print("Warnings:", data["warnings"])
print("Utilities:", data["available_utilities"])
print("Load zones:", data["available_load_zones"])
print("Capacity zones:", data["available_capacity_zones"])
print("Load profiles:", data["available_profiles"])
print("Voltages:", data["available_voltages"])`,
          javascript: `const params = new URLSearchParams({
  iso: 'PJM',
  state: 'PA',
  utility_name: 'PECO ENERGY CO'
});

const response = await fetch(\`https://api.enerpricedata.com/pricing/options?\${params}\`, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

const data = await response.json();
console.log('Utilities:', data.available_utilities);
console.log('Load zones:', data.available_load_zones);
console.log('Capacity zones:', data.available_capacity_zones);
console.log('Load profiles:', data.available_profiles);
console.log('Voltages:', data.available_voltages);`,
          ruby: `require 'net/http'
require 'json'

uri = URI('https://api.enerpricedata.com/pricing/options')
uri.query = URI.encode_www_form(iso: 'PJM', state: 'PA', utility_name: 'PECO ENERGY CO')

req = Net::HTTP::Get.new(uri, 'X-API-Key' => 'YOUR_API_KEY')
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

data = JSON.parse(res.body)
puts "Utilities: #{data['available_utilities']}"
puts "Load zones: #{data['available_load_zones']}"
puts "Capacity zones: #{data['available_capacity_zones']}"
puts "Load profiles: #{data['available_profiles']}"
puts "Voltages: #{data['available_voltages']}"`,
          curl: `curl -X GET "https://api.enerpricedata.com/pricing/options?iso=PJM&state=PA&utility_name=PECO%20ENERGY%20CO" \
  -H "X-API-Key: YOUR_API_KEY"`
        }
      },
      {
        method: "POST",
        url: "/pricing/download/excel",
        title: "Download Pricing Report (Excel)",
        description: `<p>Run the pricing engine and stream a formatted Excel report (with chart). Body is the same <code>PricingRequest</code> as <code>/pricing/calculate</code>.</p>
<p>The <code>display_mode</code> field controls whether the Component and Monthly Breakdown show total dollars or weighted-average $/MWh.</p>
<p><strong>Rate limit: 10 requests/minute</strong> for API-key users.</p>`,
        parameters: [
          { name: "(body)", type: "PricingRequest", required: true, description: "Same JSON body as /pricing/calculate. Use display_mode: \"dollars\" or \"per_mwh\"." }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/pricing/download/excel"
headers = {
    "X-API-Key": "YOUR_API_KEY",
    "Content-Type": "application/json"
}

payload = {
    "curve_date": "2025-08-25",
    "start_date": "2026-01-01",
    "term_months": 12,
    "iso": "PJM",
    "utility_name": "PECO ENERGY CO",
    "load_zone": "PECO",
    "state": "PA",
    "load_profile": "Residential Service (R)",
    "voltage": "Secondary",
    "plc_kw": 5.2,
    "nspl_kw": 5.0,
    "monthly_usage": [1.2,1.1,1.0,0.9,1.0,1.4,1.6,1.7,1.5,1.2,1.1,1.3],
    "display_mode": "dollars"
}

response = requests.post(url, headers=headers, json=payload)

if response.status_code == 200:
    filename = f"pricing_report_{payload['iso']}_{payload['utility_name']}_{payload['start_date']}.xlsx".replace(" ", "_")
    with open(filename, "wb") as f:
        f.write(response.content)
    print(f"Saved: {filename}")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const payload = { /* same shape as /calculate */ display_mode: 'dollars' };

const response = await fetch('https://api.enerpricedata.com/pricing/download/excel', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
});

const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'pricing_report.xlsx';
a.click();`,
          ruby: `require 'net/http'
require 'json'

uri = URI('https://api.enerpricedata.com/pricing/download/excel')
payload = { /* same shape as /calculate */ display_mode: 'dollars' }

req = Net::HTTP::Post.new(uri, 'X-API-Key' => 'YOUR_API_KEY', 'Content-Type' => 'application/json')
req.body = payload.to_json

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.is_a?(Net::HTTPSuccess)
  File.open('pricing_report.xlsx', 'wb') { |f| f.write(res.body) }
  puts 'Saved: pricing_report.xlsx'
else
  puts "Error #{res.code}: #{res.body}"
end`,
          curl: `curl -X POST "https://api.enerpricedata.com/pricing/download/excel" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d @pricing_request.json \
  -o pricing_report.xlsx`
        }
      },
      {
        method: "POST",
        url: "/pricing/download/csv",
        title: "Download Pricing Report (CSV)",
        description: `<p>Same as <code>/pricing/download/excel</code> but returns a CSV mirroring the three Excel sections — Summary, Component Breakdown, and Monthly Breakdown — stacked vertically with a blank line between sections.</p>
<p><strong>Rate limit: 10 requests/minute</strong> for API-key users.</p>`,
        parameters: [
          { name: "(body)", type: "PricingRequest", required: true, description: "Same JSON body as /pricing/calculate." }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/pricing/download/csv"
headers = {
    "X-API-Key": "YOUR_API_KEY",
    "Content-Type": "application/json"
}

with open("pricing_request.json") as f:
    payload = f.read()

response = requests.post(url, headers=headers, data=payload)

if response.status_code == 200:
    with open("pricing_report.csv", "wb") as f:
        f.write(response.content)
    print("Saved: pricing_report.csv")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const response = await fetch('https://api.enerpricedata.com/pricing/download/csv', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)   // same shape as /calculate
});

const blob = await response.blob();
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = 'pricing_report.csv';
link.click();`,
          ruby: `require 'net/http'
require 'json'

uri = URI('https://api.enerpricedata.com/pricing/download/csv')
req = Net::HTTP::Post.new(uri, 'X-API-Key' => 'YOUR_API_KEY', 'Content-Type' => 'application/json')
req.body = payload.to_json   # same shape as /calculate

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
File.open('pricing_report.csv', 'wb') { |f| f.write(res.body) } if res.is_a?(Net::HTTPSuccess)`,
          curl: `curl -X POST "https://api.enerpricedata.com/pricing/download/csv" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d @pricing_request.json \
  -o pricing_report.csv`
        }
      },
      {
        method: "GET",
        url: "/pricing/batch-template",
        title: "Download Batch Pricing Template (Excel)",
        description: "Download an empty Excel template with the expected columns and a sample row. Fill it in and upload via /pricing/batch-upload. Not rate-limited and does not consume your daily row quota or concurrency slot.",
        parameters: [],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/pricing/batch-template"
headers = {"X-API-Key": "YOUR_API_KEY"}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    with open("batch_pricing_template.xlsx", "wb") as f:
        f.write(response.content)
    print("Saved: batch_pricing_template.xlsx")
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const response = await fetch('https://api.enerpricedata.com/pricing/batch-template', {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

const blob = await response.blob();
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = 'batch_pricing_template.xlsx';
link.click();`,
          ruby: `require 'net/http'

uri = URI('https://api.enerpricedata.com/pricing/batch-template')
req = Net::HTTP::Get.new(uri, 'X-API-Key' => 'YOUR_API_KEY')

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
File.open('batch_pricing_template.xlsx', 'wb') { |f| f.write(res.body) } if res.is_a?(Net::HTTPSuccess)`,
          curl: `curl -X GET "https://api.enerpricedata.com/pricing/batch-template" \
  -H "X-API-Key: YOUR_API_KEY" \
  -o batch_pricing_template.xlsx`
        }
      },
      {
        method: "POST",
        url: "/pricing/batch-upload",
        title: "Upload Batch Pricing File",
        description: `<p>Upload a filled CSV or XLSX file (<code>multipart/form-data</code>, field name <code>file</code>). Returns a <code>batch_id</code> immediately; processing runs asynchronously.</p>
<p><strong>Polling flow</strong></p>
<ul>
  <li>Use <code>/pricing/batch-status/{batch_id}</code> to poll progress.</li>
  <li>Use <code>/pricing/batch-download/{batch_id}</code> once <code>status === "completed"</code>.</li>
</ul>
<p><strong>Limits</strong></p>
<ul>
  <li><strong>600 valid rows/day</strong> per user (HTTP 429 if exceeded; counter resets daily).</li>
  <li><strong>2 concurrent batch jobs</strong> per user (HTTP 429 if exceeded).</li>
  <li>The 10/min API-key rate limit on <code>/pricing/calculate</code> does <strong>not</strong> apply here.</li>
</ul>
<p><strong>Region access</strong> is checked for every distinct ISO present in the file before dispatch. If you lack permission for any ISO in the batch in Fair Market Pricing, the entire upload is rejected with HTTP 403.</p>`,
        parameters: [
          { name: "file", type: "file (multipart)", required: true, description: "CSV or XLSX file matching the batch template schema" }
        ],
        examples: {
          python: `import requests

url = "https://api.enerpricedata.com/pricing/batch-upload"
headers = {"X-API-Key": "YOUR_API_KEY"}

with open("my_batch.xlsx", "rb") as f:
    files = {"file": ("my_batch.xlsx", f,
                       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")}
    response = requests.post(url, headers=headers, files=files)

if response.status_code == 200:
    data = response.json()
    print(f"Batch ID: {data['batch_id']}")
    print(f"Valid rows: {data['valid_rows']}/{data['total_rows']}")
    if data["validation_errors"]:
        print("Validation errors:", data["validation_errors"])
else:
    print(f"Error {response.status_code}: {response.text}")`,
          javascript: `const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('https://api.enerpricedata.com/pricing/batch-upload', {
  method: 'POST',
  headers: { 'X-API-Key': 'YOUR_API_KEY' },
  body: formData
});

const data = await response.json();
console.log('Batch ID:', data.batch_id);
console.log(\`Valid rows: \${data.valid_rows}/\${data.total_rows}\`);`,
          ruby: `require 'net/http'
require 'json'

uri = URI('https://api.enerpricedata.com/pricing/batch-upload')

File.open('my_batch.xlsx', 'rb') do |io|
  req = Net::HTTP::Post.new(uri, 'X-API-Key' => 'YOUR_API_KEY')
  form_data = [['file', io, { filename: 'my_batch.xlsx',
                              content_type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }]]
  req.set_form(form_data, 'multipart/form-data')

  res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
  data = JSON.parse(res.body)
  puts "Batch ID: #{data['batch_id']}"
  puts "Valid rows: #{data['valid_rows']}/#{data['total_rows']}"
end`,
          curl: `curl -X POST "https://api.enerpricedata.com/pricing/batch-upload" \
  -H "X-API-Key: YOUR_API_KEY" \
  -F "file=@my_batch.xlsx"`
        }
      },
      {
        method: "GET",
        url: "/pricing/batch-status/{batch_id}",
        title: "Check Batch Status",
        description: `<p>Poll the progress of a batch pricing job. <code>status</code> is one of <code>"processing"</code>, <code>"completed"</code>, or <code>"failed"</code>.</p>
<p><strong>Response fields</strong></p>
<ul>
  <li><code>completed</code> — rows processed so far</li>
  <li><code>valid_rows</code> — target row count</li>
  <li><code>errors_count</code> — number of failed rows</li>
  <li><code>error_details</code> — per-row error messages</li>
</ul>
<p>Returns HTTP 404 if the batch has expired (metadata lives for 2 hours after upload). Not rate-limited; safe to poll every few seconds. Only the user who created the batch — or an admin — can read it.</p>`,
        parameters: [
          { name: "batch_id", type: "string (path)", required: true, description: "ID returned by /batch-upload" }
        ],
        examples: {
          python: `import time
import requests

batch_id = "abc123def456"
url = f"https://api.enerpricedata.com/pricing/batch-status/{batch_id}"
headers = {"X-API-Key": "YOUR_API_KEY"}

while True:
    response = requests.get(url, headers=headers)
    data = response.json()
    print(f"Status: {data['status']} — {data['completed']}/{data['valid_rows']}")
    if data["status"] in ("completed", "failed"):
        break
    time.sleep(5)`,
          javascript: `const batchId = 'abc123def456';

const response = await fetch(\`https://api.enerpricedata.com/pricing/batch-status/\${batchId}\`, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
});

const data = await response.json();
console.log(\`Status: \${data.status} — \${data.completed}/\${data.valid_rows}\`);`,
          ruby: `require 'net/http'
require 'json'

batch_id = 'abc123def456'
uri = URI("https://api.enerpricedata.com/pricing/batch-status/#{batch_id}")

req = Net::HTTP::Get.new(uri, 'X-API-Key' => 'YOUR_API_KEY')
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

data = JSON.parse(res.body)
puts "Status: #{data['status']} — #{data['completed']}/#{data['valid_rows']}"`,
          curl: `curl -X GET "https://api.enerpricedata.com/pricing/batch-status/abc123def456" \
  -H "X-API-Key: YOUR_API_KEY"`
        }
      },
      {
        method: "GET",
        url: "/pricing/batch-download/{batch_id}",
        title: "Download Batch Results",
        description: `<p>Get a presigned S3 URL for the completed batch result Excel file.</p>
<p><strong>Status codes</strong></p>
<ul>
  <li><code>400</code> — batch not yet completed</li>
  <li><code>404</code> — batch expired (2-hour TTL after upload)</li>
</ul>
<p>The presigned URL itself expires <strong>15 minutes</strong> after issue (configurable via <code>BATCH_PRESIGNED_URL_EXPIRY</code>); fetch the file promptly. Not rate-limited. Only the batch owner — or an admin — can download.</p>`,
        parameters: [
          { name: "batch_id", type: "string (path)", required: true, description: "ID returned by /batch-upload (must be in 'completed' state)" }
        ],
        examples: {
          python: `import requests

batch_id = "abc123def456"
url = f"https://api.enerpricedata.com/pricing/batch-download/{batch_id}"
headers = {"X-API-Key": "YOUR_API_KEY"}

response = requests.get(url, headers=headers)
data = response.json()

print(f"Download URL (expires in {data['expires_in']}s):")
print(data["download_url"])

# Follow the presigned URL to fetch the actual Excel file
file_response = requests.get(data["download_url"])
with open(f"batch_results_{batch_id}.xlsx", "wb") as f:
    f.write(file_response.content)
print(f"Saved: batch_results_{batch_id}.xlsx")`,
          javascript: `const batchId = 'abc123def456';

const meta = await fetch(\`https://api.enerpricedata.com/pricing/batch-download/\${batchId}\`, {
  headers: { 'X-API-Key': 'YOUR_API_KEY' }
}).then(r => r.json());

console.log(\`Expires in \${meta.expires_in}s\`);

// Follow the presigned URL
const file = await fetch(meta.download_url).then(r => r.blob());
const link = document.createElement('a');
link.href = URL.createObjectURL(file);
link.download = \`batch_results_\${batchId}.xlsx\`;
link.click();`,
          ruby: `require 'net/http'
require 'json'

batch_id = 'abc123def456'
uri = URI("https://api.enerpricedata.com/pricing/batch-download/#{batch_id}")

req = Net::HTTP::Get.new(uri, 'X-API-Key' => 'YOUR_API_KEY')
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

meta = JSON.parse(res.body)
puts "Expires in #{meta['expires_in']}s"

file_uri = URI(meta['download_url'])
file_res = Net::HTTP.get_response(file_uri)
File.open("batch_results_#{batch_id}.xlsx", 'wb') { |f| f.write(file_res.body) }`,
          curl: `# 1) Get the presigned URL
curl -X GET "https://api.enerpricedata.com/pricing/batch-download/abc123def456" \
  -H "X-API-Key: YOUR_API_KEY"

# 2) Then follow the returned download_url:
curl -L "<download_url-from-step-1>" -o batch_results_abc123def456.xlsx`
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
              <tr><td class="px-6 py-4 font-mono text-red-600 dark:text-red-400">429</td><td class="px-6 py-4 text-gray-600 dark:text-gray-300">Too Many Requests — You've hit the rate limit. Please wait and try again.</td></tr>
              <tr><td class="px-6 py-4 font-mono text-red-600 dark:text-red-400">500</td><td class="px-6 py-4 text-gray-600 dark:text-gray-300">Internal Server Error — Something went wrong on our end.</td></tr>
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
          <a href="https://colab.research.google.com/github/santoshepd/enerprice-api-docs/blob/main/frontend/notebooks/demo.ipynb
" target="_blank" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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