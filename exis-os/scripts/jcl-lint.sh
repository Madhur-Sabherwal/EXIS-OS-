#!/usr/bin/env bash
# jcl-lint.sh — cheap structural sanity check for a JCL file before
# we hand it to `zowe zos-jobs submit`. This is not a full parser;
# it catches the common mistakes that waste a submit round-trip.
#
# Usage: jcl-lint.sh <file.jcl>
# Exit 0 = looks plausible. Exit 1 = structural problem. Exit 2 = usage.

set -u

if [[ $# -ne 1 ]]; then
  echo "usage: $0 <file.jcl>" >&2
  exit 2
fi

f="$1"
if [[ ! -f "$f" ]]; then
  echo "jcl-lint: file not found: $f" >&2
  exit 2
fi

fail=0
warn() { echo "jcl-lint: $*" >&2; fail=1; }

# Rule 1: first non-blank line must be a JOB card.
first="$(grep -m1 -E '^[^[:space:]]' "$f" || true)"
if ! [[ "$first" =~ ^//[A-Z@#\$][A-Z0-9@#\$]{0,7}[[:space:]]+JOB ]]; then
  warn "first statement is not a valid JOB card: $first"
fi

# Rule 2: every data line must start with '//' or '/*' (or be blank).
lineno=0
while IFS= read -r line || [[ -n "$line" ]]; do
  lineno=$((lineno+1))
  # allow blank
  [[ -z "${line//[[:space:]]/}" ]] && continue
  if ! [[ "$line" =~ ^(//|/\*) ]]; then
    warn "line $lineno does not start with // or /*: $line"
  fi
done < "$f"

# Rule 3: warn on lines longer than 80 cols — z/OS readers truncate.
long=$(awk 'length > 80 { print NR": "length" cols" }' "$f" || true)
if [[ -n "$long" ]]; then
  while IFS= read -r L; do warn "line too long ($L)"; done <<<"$long"
fi

# Rule 4: hint if the job touches obviously sensitive datasets.
if grep -qiE 'DSN=(PROD|SYS1)\.' "$f"; then
  warn "references PROD.* or SYS1.* dataset — will require explicit approval"
fi

if [[ $fail -eq 0 ]]; then
  echo "jcl-lint: $f looks structurally OK"
fi
exit $fail
