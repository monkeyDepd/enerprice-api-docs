import { BASE_URL } from './samples';

// Code samples for the file-upload batch flow shared by Fair Market Pricing and
// Comparative Savings: template -> upload -> status -> download, plus the job list.
// `p` = { base, templateQuery, templateFile, uploadFile, acceptedField, resultFile }

export const templateSamples = (p) => ({
  python: `import requests

url = "${BASE_URL}${p.base}/${p.templateRoute}"
headers = {"X-API-Key": "YOUR_API_KEY"}
${p.templateQuery ? `params = {${p.templateQuery.map(([k, v]) => `"${k}": "${v}"`).join(', ')}}\n` : 'params = {}\n'}
response = requests.get(url, headers=headers, params=params)

if response.status_code == 200:
    with open("${p.templateFile}", "wb") as f:
        f.write(response.content)
    print("Saved as ${p.templateFile}")
else:
    print(f"Error {response.status_code}: {response.text}")`,
  javascript: `const fs = require('fs');

async function main() {
  const params = new URLSearchParams({${p.templateQuery ? ` ${p.templateQuery.map(([k, v]) => `${k}: '${v}'`).join(', ')} ` : ''}});

  const response = await fetch(\`${BASE_URL}${p.base}/${p.templateRoute}?\${params}\`, {
    headers: { 'X-API-Key': 'YOUR_API_KEY' }
  });

  if (!response.ok) {
    console.error(\`Error \${response.status}: \${await response.text()}\`);
    return;
  }

  fs.writeFileSync('${p.templateFile}', Buffer.from(await response.arrayBuffer()));
  console.log('Saved as ${p.templateFile}');
}

main();`,
  ruby: `require 'net/http'
require 'uri'

uri = URI('${BASE_URL}${p.base}/${p.templateRoute}')
${p.templateQuery ? `uri.query = URI.encode_www_form(${p.templateQuery.map(([k, v]) => `'${k}' => '${v}'`).join(', ')})\n` : ''}
req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.code.to_i == 200
  File.binwrite('${p.templateFile}', res.body)
  puts 'Saved as ${p.templateFile}'
else
  puts "Error #{res.code}: #{res.body}"
end`,
  curl: `curl -G "${BASE_URL}${p.base}/${p.templateRoute}${p.templateQuery ? `?${p.templateQuery.map(([k, v]) => `${k}=${v}`).join('&')}` : ''}" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  --fail-with-body \\
  --output "${p.templateFile}"`,
});

export const uploadSamples = (p) => ({
  python: `import requests

url = "${BASE_URL}${p.base}/${p.uploadRoute}"
headers = {"X-API-Key": "YOUR_API_KEY"}

# The completed template. Keep the file name ending in .xlsx.
with open("${p.uploadFile}", "rb") as f:
    files = {"file": ("${p.uploadFile}", f, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")}
    response = requests.post(url, headers=headers, files=files)

if response.status_code == 200:
    job = response.json()
    print(f"batch_id: {job['batch_id']}")
${p.uploadPrintPy}
else:
    print(f"Error {response.status_code}: {response.text}")`,
  javascript: `const fs = require('fs');

async function main() {
  // The completed template. Keep the file name ending in .xlsx.
  const form = new FormData();
  form.append('file', new Blob([fs.readFileSync('${p.uploadFile}')]), '${p.uploadFile}');

  const response = await fetch('${BASE_URL}${p.base}/${p.uploadRoute}', {
    method: 'POST',
    headers: { 'X-API-Key': 'YOUR_API_KEY' },
    body: form
  });

  if (!response.ok) {
    console.error(\`Error \${response.status}: \${await response.text()}\`);
    return;
  }

  const job = await response.json();
  console.log(\`batch_id: \${job.batch_id}\`);
${p.uploadPrintJs}
}

main();`,
  ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('${BASE_URL}${p.base}/${p.uploadRoute}')
req = Net::HTTP::Post.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

# The completed template. Keep the file name ending in .xlsx.
File.open('${p.uploadFile}', 'rb') do |file|
  req.set_form([['file', file, { filename: '${p.uploadFile}' }]], 'multipart/form-data')
  res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

  if res.code.to_i == 200
    job = JSON.parse(res.body)
    puts "batch_id: #{job['batch_id']}"
${p.uploadPrintRb}
  else
    puts "Error #{res.code}: #{res.body}"
  end
end`,
  curl: `curl -X POST "${BASE_URL}${p.base}/${p.uploadRoute}" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -F "file=@${p.uploadFile}" \\
  --fail-with-body`,
});

export const statusSamples = (p) => ({
  python: `import time
import requests

batch_id = "YOUR_BATCH_ID"  # from the upload response
url = f"${BASE_URL}${p.base}/${p.statusRoute}/{batch_id}"
headers = {"X-API-Key": "YOUR_API_KEY"}

# Check every 5 seconds until the job leaves "processing".
while True:
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        print(f"Error {response.status_code}: {response.text}")
        break
    job = response.json()
    if job["status"] != "processing":
        print(f"Finished with status {job['status']}")
${p.statusPrintPy}
        break
    time.sleep(5)`,
  javascript: `async function main() {
  const batchId = 'YOUR_BATCH_ID'; // from the upload response
  const url = \`${BASE_URL}${p.base}/${p.statusRoute}/\${batchId}\`;

  // Check every 5 seconds until the job leaves "processing".
  while (true) {
    const response = await fetch(url, { headers: { 'X-API-Key': 'YOUR_API_KEY' } });
    if (!response.ok) {
      console.error(\`Error \${response.status}: \${await response.text()}\`);
      return;
    }
    const job = await response.json();
    if (job.status !== 'processing') {
      console.log(\`Finished with status \${job.status}\`);
${p.statusPrintJs}
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
}

main();`,
  ruby: `require 'net/http'
require 'uri'
require 'json'

batch_id = 'YOUR_BATCH_ID' # from the upload response
uri = URI("${BASE_URL}${p.base}/${p.statusRoute}/#{batch_id}")

# Check every 5 seconds until the job leaves "processing".
loop do
  req = Net::HTTP::Get.new(uri)
  req['X-API-Key'] = 'YOUR_API_KEY'
  res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
  unless res.code.to_i == 200
    puts "Error #{res.code}: #{res.body}"
    break
  end
  job = JSON.parse(res.body)
  if job['status'] != 'processing'
    puts "Finished with status #{job['status']}"
${p.statusPrintRb}
    break
  end
  sleep 5
end`,
  curl: `# Repeat until "status" is no longer "processing".
curl "${BASE_URL}${p.base}/${p.statusRoute}/YOUR_BATCH_ID" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  --fail-with-body`,
});

export const resultSamples = (p) => ({
  python: `import requests

batch_id = "YOUR_BATCH_ID"  # a completed job
url = f"${BASE_URL}${p.base}/${p.downloadRoute}/{batch_id}"
headers = {"X-API-Key": "YOUR_API_KEY"}

response = requests.get(url, headers=headers)
if response.status_code != 200:
    print(f"Error {response.status_code}: {response.text}")
else:
    link = response.json()["download_url"]
    # The link works for 15 minutes and needs no API key.
    result = requests.get(link)
    with open("${p.resultFile}", "wb") as f:
        f.write(result.content)
    print("Saved as ${p.resultFile}")`,
  javascript: `const fs = require('fs');

async function main() {
  const batchId = 'YOUR_BATCH_ID'; // a completed job
  const response = await fetch(\`${BASE_URL}${p.base}/${p.downloadRoute}/\${batchId}\`, {
    headers: { 'X-API-Key': 'YOUR_API_KEY' }
  });

  if (!response.ok) {
    console.error(\`Error \${response.status}: \${await response.text()}\`);
    return;
  }

  const { download_url: link } = await response.json();
  // The link works for 15 minutes and needs no API key.
  const result = await fetch(link);
  fs.writeFileSync('${p.resultFile}', Buffer.from(await result.arrayBuffer()));
  console.log('Saved as ${p.resultFile}');
}

main();`,
  ruby: `require 'net/http'
require 'uri'
require 'json'

batch_id = 'YOUR_BATCH_ID' # a completed job
uri = URI("${BASE_URL}${p.base}/${p.downloadRoute}/#{batch_id}")
req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.code.to_i == 200
  link = URI(JSON.parse(res.body)['download_url'])
  # The link works for 15 minutes and needs no API key.
  result = Net::HTTP.get_response(link)
  File.binwrite('${p.resultFile}', result.body)
  puts 'Saved as ${p.resultFile}'
else
  puts "Error #{res.code}: #{res.body}"
end`,
  curl: `# 1. Get a temporary download link for a completed job.
curl "${BASE_URL}${p.base}/${p.downloadRoute}/YOUR_BATCH_ID" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  --fail-with-body

# 2. Download the file from the "download_url" value within 15 minutes. It needs no API key.
curl "PASTE_DOWNLOAD_URL_HERE" --output "${p.resultFile}"`,
});

export const jobsSamples = (p) => ({
  python: `import requests

url = "${BASE_URL}${p.base}/${p.jobsRoute}"
headers = {"X-API-Key": "YOUR_API_KEY"}

response = requests.get(url, headers=headers, params={"limit": 20})

if response.status_code == 200:
    for job in response.json()${p.jobsKey ? `["${p.jobsKey}"]` : ''}:
        print(job["batch_id"], job["status"], job["created_at"], job["filename"])
else:
    print(f"Error {response.status_code}: {response.text}")`,
  javascript: `async function main() {
  const response = await fetch('${BASE_URL}${p.base}/${p.jobsRoute}?limit=20', {
    headers: { 'X-API-Key': 'YOUR_API_KEY' }
  });

  if (!response.ok) {
    console.error(\`Error \${response.status}: \${await response.text()}\`);
    return;
  }

  const body = await response.json();
  for (const job of body${p.jobsKey ? `.${p.jobsKey}` : ''}) {
    console.log(job.batch_id, job.status, job.created_at, job.filename);
  }
}

main();`,
  ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('${BASE_URL}${p.base}/${p.jobsRoute}')
uri.query = URI.encode_www_form('limit' => 20)
req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'
res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.code.to_i == 200
  JSON.parse(res.body)${p.jobsKey ? `['${p.jobsKey}']` : ''}.each do |job|
    puts [job['batch_id'], job['status'], job['created_at'], job['filename']].join(' ')
  end
else
  puts "Error #{res.code}: #{res.body}"
end`,
  curl: `curl -G "${BASE_URL}${p.base}/${p.jobsRoute}?limit=20" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  --fail-with-body`,
});
