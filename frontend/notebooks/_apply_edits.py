"""One-shot editor for demo.ipynb.

Applies these changes (no FMP cells added; bulk cells left in place):
  #1  Delete /openapi.json discovery cell (id fcae40a2)
  #2  Delete /me test cell (id 4baf2990) and its preceding 'Default:' markdown (b6ea8728)
  #3  Strip all cell outputs + execution counts (privacy + reproducibility)
  #5  Rewrite the broken Pagination Example cell (id 67b505ae)
  #6  Fix Ancillary Uplift JSON filename leftover (id 3ad6d3b3)
  #7  Remove duplicate Ancillary Uplift JSON cell (id 9ed79d99)
  #9  Add empty-key guard to headers cell (id 83e7c122)
"""
import json
from pathlib import Path

NB_PATH = Path(__file__).with_name("demo.ipynb")

CELLS_TO_DELETE = {
    "fcae40a2",  # #1 openapi discovery
    "b6ea8728",  # #2 'Default:' markdown leading into /me
    "4baf2990",  # #2 /me cell
    "9ed79d99",  # #7 duplicate Ancillary Uplift JSON
}

# #9 — empty-key guard injected into headers cell
HEADERS_SRC = '''assert api_key, "Set api_key on the previous cell before continuing."

headers = {
    "X-API-Key": api_key  # FastAPI expects the key in this custom header
}
'''

# #5 — fixed pagination example
PAGINATION_SRC = '''## Pagination Example: Getting All Records
#
# `skip` and `limit` only take effect when `raw=true`. The response shape is
# {"data": [...], "total": N, "page": p, "size": s}, so we paginate on
# payload["data"], not the top-level object.

import requests

endpoint = "/datasets/download/energy-futures/json"
all_records = []
skip = 0
limit = 100  # max 1000

while True:
    params = {
        "start_operating_date": "2025-08-25",
        "control_area": "ERCOT",
        "raw": True,       # required for skip/limit to apply
        "skip": skip,
        "limit": limit,
    }

    response = requests.get(f"{base_url}{endpoint}", headers=headers, params=params)
    if response.status_code != 200:
        print(f"Error: {response.status_code} - {response.text}")
        break

    payload = response.json()
    page = payload.get("data", [])

    if not page:
        print(f"Pagination complete. Total records collected: {len(all_records)}")
        break

    all_records.extend(page)
    print(
        f"Page {payload.get('page', skip // limit + 1)}: "
        f"retrieved {len(page)} records "
        f"(total: {len(all_records)} of {payload.get('total', '?')})"
    )

    if len(page) < limit:
        print(f"Reached end of data. Total records: {len(all_records)}")
        break

    skip += limit

print(f"\\nFinal Result: Collected {len(all_records)} total records")
'''


def src_to_lines(text: str):
    """Notebook 'source' is a list of lines, each ending with \\n except the last."""
    lines = text.splitlines(keepends=True)
    return lines


def fix_ancillary_filename(src_lines):
    """#6 — replace EPD_REC_RPS_ prefix with EPD_AncillaryUplift_ in cell 3ad6d3b3."""
    return [
        ln.replace('EPD_REC_RPS_{control_area}', 'EPD_AncillaryUplift_{control_area}')
        for ln in src_lines
    ]


def main():
    nb = json.loads(NB_PATH.read_text(encoding="utf-8"))

    original_count = len(nb["cells"])
    new_cells = []
    edits = []

    for cell in nb["cells"]:
        cid = cell.get("id", "")

        # #1 + #2 + #7 — drop cells
        if cid in CELLS_TO_DELETE:
            edits.append(f"deleted cell {cid}")
            continue

        # #9 — overwrite headers cell with key guard
        if cid == "83e7c122":
            cell["source"] = src_to_lines(HEADERS_SRC)
            edits.append(f"#9 added empty-key guard to {cid}")

        # #5 — overwrite pagination example cell
        elif cid == "67b505ae":
            cell["source"] = src_to_lines(PAGINATION_SRC)
            edits.append(f"#5 rewrote pagination example {cid}")

        # #6 — fix Ancillary JSON filename leftover
        elif cid == "3ad6d3b3":
            cell["source"] = fix_ancillary_filename(cell["source"])
            edits.append(f"#6 fixed Ancillary JSON filename in {cid}")

        # #3 — strip outputs from every code cell
        if cell.get("cell_type") == "code":
            if cell.get("outputs"):
                edits.append(f"#3 stripped outputs from {cid}")
            cell["outputs"] = []
            cell["execution_count"] = None

        new_cells.append(cell)

    nb["cells"] = new_cells

    NB_PATH.write_text(json.dumps(nb, indent=1, ensure_ascii=False) + "\n",
                       encoding="utf-8")

    print(f"cells: {original_count} -> {len(new_cells)} ({original_count - len(new_cells)} removed)")
    for e in edits:
        print(" -", e)


if __name__ == "__main__":
    main()
