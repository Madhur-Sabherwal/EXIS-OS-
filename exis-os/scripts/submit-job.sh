#!/usr/bin/env bash
# submit-job.sh — guarded wrapper around `zowe zos-jobs submit local-file`.
# Enforces the Exis-OS safety gates:
#   * runs jcl-lint.sh first and refuses to submit on lint failure
#   * refuses PROD.* / SYS1.* datasets without --approved
#   * reports the job's return code (RC), not just "submitted"
#
# Usage: submit-job.sh [--approved] <file.jcl>

set -u
here="$(cd "$(dirname "$0")" && pwd)"

approved=0
if [[ "${1:-}" == "--approved" ]]; then
  approved=1; shift
fi

if [[ $# -ne 1 ]]; then
  echo "usage: $0 [--approved] <file.jcl>" >&2
  exit 2
fi
f="$1"

if ! command -v zowe >/dev/null 2>&1; then
  echo "submit-job: zowe CLI not found — cannot reach Node-M" >&2
  exit 3
fi

if ! "$here/jcl-lint.sh" "$f"; then
  echo "submit-job: refusing to submit — lint failed" >&2
  exit 1
fi

if grep -qiE 'DSN=(PROD|SYS1)\.' "$f" && [[ $approved -ne 1 ]]; then
  echo "submit-job: refusing to submit — job touches PROD/SYS1 and --approved was not passed" >&2
  exit 1
fi

echo "submit-job: submitting $f ..."
# --wait-for-output blocks until the job finishes and returns its RC,
# which is what the reporting contract wants.
if ! out="$(zowe zos-jobs submit local-file "$f" --wait-for-output --rfj 2>&1)"; then
  echo "submit-job: zowe failed:" >&2
  echo "$out" >&2
  exit 4
fi

echo "$out"
# Extract return code if the JSON response is intact.
rc="$(echo "$out" | sed -n 's/.*"retcode"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n1)"
jobid="$(echo "$out" | sed -n 's/.*"jobid"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n1)"

if [[ -n "$rc" ]]; then
  echo "submit-job: jobid=$jobid retcode=$rc"
else
  echo "submit-job: submitted but could not parse retcode"
fi
