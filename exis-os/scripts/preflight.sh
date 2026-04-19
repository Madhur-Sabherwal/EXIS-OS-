#!/usr/bin/env bash
# preflight.sh — detect which Exis-OS nodes are reachable from here.
# Non-destructive. Prints a short JSON-ish summary to stdout.
# Exits 0 even if some nodes are unreachable — absence is data.

set -u

report() {
  local node="$1" status="$2" detail="$3"
  printf '  %-8s %-12s %s\n' "$node" "$status" "$detail"
}

echo "exis-os preflight $(date -u +%FT%TZ)"
echo "--------------------------------------"

# Node-L: always present, but characterise it
kernel="$(uname -s 2>/dev/null || echo unknown)"
host="$(hostname 2>/dev/null || echo unknown)"
report "Node-L" "available" "$kernel on $host"

# Node-M: mainframe via Zowe
if command -v zowe >/dev/null 2>&1; then
  zver="$(zowe --version 2>/dev/null | head -n1 || echo 'unknown version')"
  if zowe config list --gc >/dev/null 2>&1; then
    report "Node-M" "available" "zowe $zver (profile configured)"
  else
    report "Node-M" "degraded" "zowe $zver present, no profile configured"
  fi
else
  report "Node-M" "absent" "zowe CLI not installed"
fi

# Node-C: cloud/app reach — we only prove *something* can egress.
# We don't assume any particular cloud is in scope.
if command -v curl >/dev/null 2>&1; then
  if curl -fsS --max-time 3 -o /dev/null https://example.com 2>/dev/null; then
    report "Node-C" "available" "curl + egress OK"
  else
    report "Node-C" "degraded" "curl present, egress failed or blocked"
  fi
else
  report "Node-C" "absent" "curl not installed"
fi

echo "--------------------------------------"
echo "done."
