# Exis-OS

An agentic operating policy for [OpenHands](https://github.com/All-Hands-AI/OpenHands)
running on Devstral (or any CodeActAgent-compatible model). Exis-OS turns
the agent into a disciplined cross-environment operator that works against
three kinds of hosts: the local sandbox, a z/OS mainframe via Zowe, and
cloud/app APIs via curl, SDKs, or the browser.

The policy is delivered as a **repo-scoped microagent** that OpenHands
loads automatically when this repo is mounted. It does not replace
CodeActAgent — it constrains how it behaves.

## Why this exists

Out-of-the-box agentic coders will happily hallucinate JCL return codes,
invent dataset names, and `rm -rf` their way out of a bad state. Exis-OS
adds four things on top of CodeActAgent:

1. A **resource model** (Node-L / Node-M / Node-C) so the agent picks the
   right tool before it starts typing.
2. A **verify-before-mutate** loop, so every destructive action is
   grounded in real observed state.
3. **Safety gates** that stop the agent before destructive operations
   it was not explicitly asked to perform.
4. A **reporting contract** — no fake terminal banners, just what
   actually happened and the RC.

## Quick start

### 1. Clone or copy this repo into your workspace

```bash
git clone <this-repo> my-exis-workspace
cd my-exis-workspace
```

### 2. Point OpenHands at it

OpenHands auto-loads microagents from `.openhands/microagents/` in any
mounted workspace. Start OpenHands with this directory mounted:

```bash
docker run -it --rm --pull=always \
  -e SANDBOX_RUNTIME_CONTAINER_IMAGE=docker.all-hands.dev/all-hands-ai/runtime:latest \
  -e SANDBOX_VOLUMES=$(pwd):/workspace:rw \
  -e LLM_MODEL="mistral/devstral-small-latest" \
  -e LLM_API_KEY="$MISTRAL_API_KEY" \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v ~/.openhands:/.openhands \
  -p 3000:3000 \
  --add-host host.docker.internal:host-gateway \
  --name openhands-app \
  docker.all-hands.dev/all-hands-ai/openhands:latest
```

Open `http://localhost:3000`. The microagent activates on any prompt
mentioning one of its triggers (`exis`, `mainframe`, `zowe`, `jcl`) or
when `.openhands/microagents/exis-os.md` is present as a repo-scoped
agent.

### 3. Verify it's loaded

In the OpenHands chat, say:

> exis, what environments can you reach right now?

The agent should run `uname -a`, check for `zowe --version`, and report
which of Node-L / Node-M / Node-C are available — rather than
hallucinating a capability list.

## Layout

```
.
├── .openhands/
│   └── microagents/
│       └── exis-os.md         # the operating policy (THE policy)
├── scripts/
│   ├── preflight.sh            # detects what's reachable
│   ├── jcl-lint.sh             # local JCL sanity check
│   └── submit-job.sh           # safe wrapper around zowe zos-jobs submit
├── examples/
│   ├── hello.jcl               # minimal valid JCL for smoke tests
│   └── prompts.md              # example prompts that exercise the policy
└── docs/
    ├── resource-model.md       # Node-L / Node-M / Node-C explained
    ├── safety-gates.md         # full list + rationale
    └── integration.md          # hooking up Zowe, cloud creds, etc.
```

## Safety model

Exis-OS does not try to sandbox the underlying tools — OpenHands already
runs inside a sandboxed runtime. What it does is force the agent to
**pause and ask** before a short list of high-blast-radius operations,
and to **verify before it mutates**. The full list lives in
[docs/safety-gates.md](docs/safety-gates.md).

## License

MIT. Use it, fork it, tighten the gates for your own environment.

---

## Built by Madhur Sabherwal

Data Engineer · Perth, Australia.

- **Connect** — [LinkedIn](https://www.linkedin.com/in/madhur-sabherwal)
- **Support** — [Buy me a coffee](https://buymeacoffee.com/MaadhurSabherwal)

If Exis-OS saved you a submit round-trip or a destroyed dataset, a coffee
is appreciated.
