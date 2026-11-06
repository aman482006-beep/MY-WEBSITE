from pathlib import Path
from openpyxl import load_workbook
import json
import sys

root = Path("project-qa-artifacts")
original = root / "ModelForge-All-Modules.xlsx"
recalculated = root / "recalculated" / original.name
expected = [
    "Cover", "Inputs", "Historical IS", "Historical BS", "Historical CF",
    "Forecast IS", "Forecast BS", "Forecast CF", "FCF", "Ratios", "DCF",
    "Comparables", "Sensitivity", "Scenario Calc", "Checks",
]
assert original.exists() and original.stat().st_size > 12000, "Original workbook missing or unexpectedly small"
assert recalculated.exists() and recalculated.stat().st_size > 12000, "LibreOffice did not produce a recalculated workbook"

formulas = load_workbook(original, data_only=False, read_only=False)
values = load_workbook(recalculated, data_only=True, read_only=False)
assert sorted(formulas.sheetnames) == sorted(expected), f"Unexpected workbook tabs: {formulas.sheetnames}"
assert formulas["Forecast IS"]["B5"].data_type == "f", "Forecast IS must have a formula linked to history"
assert formulas["FCF"]["G9"].data_type == "f", "FCF NOPAT formula missing"
assert formulas["FCF"]["G13"].data_type == "f", "UFCF formula missing"
assert formulas["Checks"]["D4"].value in ("PASS", "REVIEW"), "Checks must export readable text"
assert "[Red]" in formulas["Inputs"]["B12"].number_format, "Negative percentage number format missing"
assert "[Red]" in formulas["Forecast CF"]["B9"].number_format, "Negative cash outflow format missing"
assert formulas["Inputs"]["B12"].font.color and formulas["Inputs"]["B12"].font.color.rgb.endswith("1F5FBF"), "Editable input font is not blue"
assert formulas["Forecast IS"]["B5"].font.color and formulas["Forecast IS"]["B5"].font.color.rgb.endswith("008000"), "Cross-sheet formula font is not green"
assert "Free cash flow" in str(formulas["FCF"]["A1"].value), "FCF worksheet heading missing"

errors = []
for ws in values.worksheets:
    for row in ws.iter_rows():
        for cell in row:
            if cell.data_type == "e" or (isinstance(cell.value, str) and cell.value.startswith("#")):
                errors.append({"sheet": ws.title, "cell": cell.coordinate, "value": cell.value})
assert not errors, "Spreadsheet engine recalculation produced formula errors: " + json.dumps(errors[:30])

partial = root / "ModelForge-DCF-Only.xlsx"
partial_recalc = root / "recalculated" / partial.name
partial_wb = load_workbook(partial, data_only=False)
assert partial_wb.sheetnames == ["DCF"], f"DCF-only file contains unexpected tabs: {partial_wb.sheetnames}"
assert partial_recalc.exists(), "LibreOffice did not open and resave the DCF-only export"

print(json.dumps({
    "originalWorkbookBytes": original.stat().st_size,
    "recalculatedWorkbookBytes": recalculated.stat().st_size,
    "sheetCount": len(formulas.sheetnames),
    "sheets": formulas.sheetnames,
    "formulaErrorCells": len(errors),
    "libreOffice": "opened, recalculated and saved without formula error cells",
    "formatAssertions": ["blue input font", "green linked formula font", "red negative number formats"],
    "partialExport": "one DCF worksheet; opened and resaved",
}, indent=2))
