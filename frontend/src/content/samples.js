// Builders for the code samples on the new (v1) address pages. Every sample is a complete
// program that runs as pasted once YOUR_API_KEY is replaced.

export const BASE_URL = 'https://api.enerpricedata.com';

const pyValue = (v) => (typeof v === 'string' ? `"${v}"` : v === true ? 'True' : v === false ? 'False' : String(v));
const jsValue = (v) => (typeof v === 'string' ? `'${v}'` : String(v));
const rbValue = (v) => (typeof v === 'string' ? `"${v}"` : String(v));

const withComment = (line, comment) => (comment ? `${line}  # ${comment}` : line);
const withJsComment = (line, comment) => (comment ? `${line}  // ${comment}` : line);
const commentBlock = (lines, mark) => lines.map((l) => `${mark} ${l}`).join('\n');

// params: [{ key, value, comment }] ; note: lines printed above the params as comments.
const pyParams = (params) => params.map((p, i) => `    ${withComment(`"${p.key}": ${pyValue(p.value)}${i < params.length - 1 ? ',' : ''}`, p.comment)}`).join('\n');
const jsParams = (params) => params.map((p, i) => `    ${withJsComment(`${p.key}: ${jsValue(p.value)}${i < params.length - 1 ? ',' : ''}`, p.comment)}`).join('\n');
const rbParams = (params) => params.map((p, i) => `  ${withComment(`${p.key}: ${rbValue(p.value)}${i < params.length - 1 ? ',' : ''}`, p.comment)}`).join('\n');
const curlQuery = (params) => params.map((p) => `${p.key}=${encodeURIComponent(String(p.value)).replace(/%2C/g, ',')}`).join('&');

// GET a file (Excel, CSV or ZIP) and save it.
export const fileDownload = ({ path, params, filename, note = [] }) => ({
  python: `import requests

url = "${BASE_URL}${path}"
headers = {"X-API-Key": "YOUR_API_KEY"}

${commentBlock(note, '#')}
params = {
${pyParams(params)}
}

response = requests.get(url, headers=headers, params=params)

if response.status_code == 200:
    with open("${filename}", "wb") as f:
        f.write(response.content)
    print("Saved as ${filename}")
else:
    print(f"Error {response.status_code}: {response.text}")`,
  javascript: `const fs = require('fs');

async function main() {
${commentBlock(note, '  //')}
  const params = new URLSearchParams({
${jsParams(params)}
  });

  const response = await fetch(\`${BASE_URL}${path}?\${params}\`, {
    headers: { 'X-API-Key': 'YOUR_API_KEY' }
  });

  if (!response.ok) {
    console.error(\`Error \${response.status}: \${await response.text()}\`);
    return;
  }

  fs.writeFileSync('${filename}', Buffer.from(await response.arrayBuffer()));
  console.log('Saved as ${filename}');
}

main();`,
  ruby: `require 'net/http'
require 'uri'

uri = URI('${BASE_URL}${path}')
${commentBlock(note, '#')}
params = {
${rbParams(params)}
}
uri.query = URI.encode_www_form(params)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.code.to_i == 200
  File.open('${filename}', 'wb') { |file| file.write(res.body) }
  puts 'Saved as ${filename}'
else
  puts "Error #{res.code}: #{res.body}"
end`,
  curl: `${commentBlock(note, '#')}
curl -G "${BASE_URL}${path}?${curlQuery(params)}" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  --fail-with-body \\
  --output "${filename}"`,
});

// GET JSON and print a short summary of the records.
export const jsonDownload = ({ path, params, note = [], fields = [] }) => {
  const pyFields = fields.map((f) => `row["${f}"]`).join(', ');
  const jsFields = fields.map((f) => `row.${f}`).join(', ');
  const rbFields = fields.map((f) => `row['${f}']`).join(', ');
  return {
    python: `import requests

url = "${BASE_URL}${path}"
headers = {"X-API-Key": "YOUR_API_KEY"}

${commentBlock(note, '#')}
params = {
${pyParams(params)}
}

response = requests.get(url, headers=headers, params=params)

if response.status_code == 200:
    body = response.json()
    rows = body["data"]
    print(f"Publication Date {body['publication_date']}: {len(rows)} rows")
    for row in rows[:3]:
        print(${pyFields})
else:
    print(f"Error {response.status_code}: {response.text}")`,
    javascript: `async function main() {
${commentBlock(note, '  //')}
  const params = new URLSearchParams({
${jsParams(params)}
  });

  const response = await fetch(\`${BASE_URL}${path}?\${params}\`, {
    headers: { 'X-API-Key': 'YOUR_API_KEY' }
  });

  if (!response.ok) {
    console.error(\`Error \${response.status}: \${await response.text()}\`);
    return;
  }

  const body = await response.json();
  console.log(\`Publication Date \${body.publication_date}: \${body.data.length} rows\`);
  body.data.slice(0, 3).forEach((row) => console.log(${jsFields}));
}

main();`,
    ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('${BASE_URL}${path}')
${commentBlock(note, '#')}
params = {
${rbParams(params)}
}
uri.query = URI.encode_www_form(params)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.code.to_i == 200
  body = JSON.parse(res.body)
  puts "Publication Date #{body['publication_date']}: #{body['data'].length} rows"
  body['data'].first(3).each { |row| puts [${rbFields}].join(' ') }
else
  puts "Error #{res.code}: #{res.body}"
end`,
    curl: `${commentBlock(note, '#')}
curl -G "${BASE_URL}${path}?${curlQuery(params)}" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  --fail-with-body`,
  };
};

// Page through raw JSON with skip/limit until every row is read.
export const rawPaging = ({ path, params, note = [], pageSize = 1000 }) => {
  const all = [...params, { key: 'format', value: 'json' }, { key: 'raw', value: 'true' }];
  return {
    python: `import requests

url = "${BASE_URL}${path}"
headers = {"X-API-Key": "YOUR_API_KEY"}

${commentBlock(note, '#')}
params = {
${pyParams(all)},
    "limit": ${pageSize},
    "skip": 0
}

rows = []
while True:
    response = requests.get(url, headers=headers, params=params)
    if response.status_code != 200:
        print(f"Error {response.status_code}: {response.text}")
        break
    page = response.json()
    rows.extend(page["data"])
    print(f"Page {page['page']}: {len(rows)} of {page['total']} rows")
    if len(rows) >= page["total"] or not page["data"]:
        break
    params["skip"] += params["limit"]`,
    javascript: `async function main() {
${commentBlock(note, '  //')}
  const params = new URLSearchParams({
${jsParams(all)},
    limit: '${pageSize}',
    skip: '0'
  });

  const rows = [];
  while (true) {
    const response = await fetch(\`${BASE_URL}${path}?\${params}\`, {
      headers: { 'X-API-Key': 'YOUR_API_KEY' }
    });
    if (!response.ok) {
      console.error(\`Error \${response.status}: \${await response.text()}\`);
      return;
    }
    const page = await response.json();
    rows.push(...page.data);
    console.log(\`Page \${page.page}: \${rows.length} of \${page.total} rows\`);
    if (rows.length >= page.total || page.data.length === 0) break;
    params.set('skip', String(Number(params.get('skip')) + Number(params.get('limit'))));
  }
}

main();`,
    ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('${BASE_URL}${path}')
${commentBlock(note, '#')}
params = {
${rbParams(all)},
  limit: ${pageSize},
  skip: 0
}

rows = []
loop do
  uri.query = URI.encode_www_form(params)
  req = Net::HTTP::Get.new(uri)
  req['X-API-Key'] = 'YOUR_API_KEY'
  res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
  unless res.code.to_i == 200
    puts "Error #{res.code}: #{res.body}"
    break
  end
  page = JSON.parse(res.body)
  rows.concat(page['data'])
  puts "Page #{page['page']}: #{rows.length} of #{page['total']} rows"
  break if rows.length >= page['total'] || page['data'].empty?
  params[:skip] += params[:limit]
end`,
    curl: `${commentBlock(note, '#')}
# First page. Add limit to skip for each next page until you have read "total" rows.
curl -G "${BASE_URL}${path}?${curlQuery(all)}&limit=${pageSize}&skip=0" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  --fail-with-body`,
  };
};

// GET JSON and print it.
export const getJson = ({ path, params = [], printPy, printJs, printRb, note = [] }) => ({
  python: `import requests

url = "${BASE_URL}${path}"
headers = {"X-API-Key": "YOUR_API_KEY"}
${note.length ? `\n${commentBlock(note, '#')}` : ''}
params = {
${pyParams(params)}
}

response = requests.get(url, headers=headers, params=params)

if response.status_code == 200:
    data = response.json()
${printPy.split('\n').map((l) => `    ${l}`).join('\n')}
else:
    print(f"Error {response.status_code}: {response.text}")`,
  javascript: `async function main() {
${note.length ? `${commentBlock(note, '  //')}\n` : ''}  const params = new URLSearchParams({
${jsParams(params)}
  });

  const response = await fetch(\`${BASE_URL}${path}?\${params}\`, {
    headers: { 'X-API-Key': 'YOUR_API_KEY' }
  });

  if (!response.ok) {
    console.error(\`Error \${response.status}: \${await response.text()}\`);
    return;
  }

  const data = await response.json();
${printJs.split('\n').map((l) => `  ${l}`).join('\n')}
}

main();`,
  ruby: `require 'net/http'
require 'uri'
require 'json'

uri = URI('${BASE_URL}${path}')
${note.length ? `${commentBlock(note, '#')}\n` : ''}params = {
${rbParams(params)}
}
uri.query = URI.encode_www_form(params)

req = Net::HTTP::Get.new(uri)
req['X-API-Key'] = 'YOUR_API_KEY'

res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }

if res.code.to_i == 200
  data = JSON.parse(res.body)
${printRb.split('\n').map((l) => `  ${l}`).join('\n')}
else
  puts "Error #{res.code}: #{res.body}"
end`,
  curl: `${note.length ? `${commentBlock(note, '#')}\n` : ''}curl -G "${BASE_URL}${path}${params.length ? `?${curlQuery(params)}` : ''}" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  --fail-with-body`,
});
