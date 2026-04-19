# Integration

## OpenHands + Devstral

Exis-OS is written for CodeActAgent. It works with any model that
OpenHands supports, but the policy was tuned against Devstral Small —
which has strong tool-use but can drift without a tight policy
envelope. That's the gap this repo fills.

Set Devstral as the model:

```bash
export LLM_MODEL="mistral/devstral-small-latest"
export LLM_API_KEY="$MISTRAL_API_KEY"
```

## Zowe (Node-M)

For the agent to actually reach a mainframe, the sandbox needs:

1. The Zowe CLI installed inside the runtime. You can bake this into
   a custom sandbox image, or install on first run:

   ```bash
   npm install -g @zowe/cli
   ```

2. A profile. The simplest approach is to create it outside the
   container and mount `~/.zowe/` read-only into the sandbox:

   ```bash
   docker run ... \
     -v $HOME/.zowe:/root/.zowe:ro \
     ...
   ```

3. Verify with `scripts/preflight.sh` — it reports Node-M as
   `available` only when both the CLI and a profile are present.

If you don't have a real z/OS to talk to, the
[Z Trial / Z Xplore sandbox](https://www.ibm.com/z/resources/zxplore)
gives you credentials you can plug into a Zowe profile for testing.

## Cloud / apps (Node-C)

There is no single integration for Node-C because "cloud" is not one
thing. The pattern Exis-OS expects:

- Credentials live in environment variables, not on disk
  (`AWS_ACCESS_KEY_ID`, `GH_TOKEN`, etc.)
- SDKs or `curl` are used directly; the agent reads the response and
  reports the HTTP status or SDK return
- The browser tool is only used when a UI flow is genuinely required
  (OAuth consent screens, cloud consoles without an API for the task)

Passing credentials into the sandbox:

```bash
docker run ... \
  -e AWS_ACCESS_KEY_ID \
  -e AWS_SECRET_ACCESS_KEY \
  -e AWS_DEFAULT_REGION \
  ...
```

Note the bare `-e VAR` form — Docker forwards the value from your
host environment without writing it into a file the agent can read
back later. This cooperates with Gate 5 (no credential leakage).

## Verifying the microagent loaded

After starting OpenHands with this repo mounted, the simplest check
is to ask the agent:

> what triggers activate your exis-os policy?

A correctly-loaded microagent will answer with the trigger list from
the frontmatter (`exis`, `exis-os`, `mainframe`, `zowe`, `jcl`). If
it answers with something generic, the microagent isn't loaded — the
usual cause is that the repo wasn't mounted at `/workspace`, so
OpenHands never saw `.openhands/microagents/`.
