# Resource model

Exis-OS classifies every task into exactly one of three environments
before acting. The point is not to be exhaustive — it's to force the
agent to pick the right tool up front instead of fumbling between them.

## Node-L — Local (the OpenHands sandbox)

This is the container the CodeActAgent runs inside. Its bash tool, file
editor, and IPython tool all operate here by default. Anything the
sandbox can see — filesystem, processes, installed CLIs, localhost
ports — is Node-L.

**Default assumption:** if a task doesn't clearly need Node-M or Node-C,
it's Node-L. Don't escalate unnecessarily.

**Detect with:** `uname -a`, `ls`, `ps`, `command -v <tool>`.

## Node-M — Mainframe (z/OS via Zowe)

Reached exclusively through the Zowe CLI: `zowe zos-jobs`,
`zowe zos-files`, `zowe zos-tso`, `zowe zos-console`. If `zowe --version`
fails, Node-M is **unreachable** and the agent must say so — it must
not fabricate JCL output, jobids, or return codes.

**Detect with:** `zowe --version` and `zowe config list --gc`.

**Default profile:** OpenHands does not ship one. The user must have
configured `~/.zowe/` (or mounted it into the sandbox) for Node-M to
be useful. `scripts/preflight.sh` reports this as `degraded` vs.
`available` vs. `absent`.

## Node-C — Cloud / Apps

Everything else reachable over the network: REST APIs, SaaS SDKs,
cloud consoles via the browser tool. This is deliberately fuzzy — the
agent is expected to pick the right sub-tool (`curl`, an installed SDK,
or the browser) based on the task.

**Detect with:** `curl` + a known endpoint; or `<sdk> --version`; or
the browser tool for anything that requires a UI login flow.

## Why only three?

Because the *interesting* policy decisions happen at the boundary
between these three, not within them. A prompt like "deploy my build
to prod" almost always means "this task is Node-C, but verify Node-L
artifacts first, and never cross into Node-M without approval." The
three-node model makes that boundary thinking explicit.
