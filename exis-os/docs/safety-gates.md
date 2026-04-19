# Safety gates

Exis-OS defines a short list of operations the agent must pause and
confirm before performing. The gates are deliberately few — one per
irreversible blast-radius class — because a long list of rules is a
list the agent will quietly start ignoring.

## The gates

### 1. Local destructive shell

- `rm -rf <path>` where `<path>` is not inside the current workspace
- `dd`, `mkfs`, `shutdown`, `reboot`
- `kill -9` on a PID the agent did not itself spawn

**Rationale:** these operations are not reversible and the agent's
confidence in a target path is often wrong.

### 2. Unbounded SQL mutation

- `DELETE` / `UPDATE` without a `WHERE` clause
- `DROP` / `TRUNCATE` on any table
- Any DML against a schema named `prod*` or `production*`

**Rationale:** "delete from users" is one missing line away from
wiping a table. Forcing an explicit confirmation costs one chat turn
and saves a restore.

### 3. Mainframe production datasets

- Any `zowe zos-jobs submit` or `zowe zos-files` write targeting
  `PROD.*` or `SYS1.*`

**Rationale:** these are the conventional names for system and
production datasets on z/OS. The submit wrapper (`scripts/submit-job.sh`)
enforces this at the tool level as well as the policy level.

### 4. Shared git history rewrites

- `git push --force` / `git push -f` to any branch that isn't the
  agent's own scratch branch
- `git branch -D` of a branch the agent didn't just create
- `git reset --hard` that would discard uncommitted user work

**Rationale:** force-pushes on shared branches silently destroy other
people's commits. Exis-OS treats them as a destructive operation, not
a tidiness one.

### 5. Credential leakage

- Writing API keys, tokens, passwords, or private keys to disk
- Echoing them into a log, a commit message, or a PR body

**Rationale:** credentials in logs end up in backups, error
aggregators, and screenshots. The gate is: if it looks like a secret,
don't persist it.

## How the agent is expected to respond

When a request would trip a gate, the expected response is:

1. State which gate would be tripped.
2. Describe what it *would* do if the gate were lifted.
3. Ask for explicit confirmation, in plain language.

It is explicitly **not** expected to debate the gate or be apologetic
about it. Gates are boring; tripping one is a one-sentence exchange.

## Tuning

If your environment has different danger zones (say, a team where
`main` really is a scratch branch, or where `SYS1.*` is a dev alias),
edit `.openhands/microagents/exis-os.md` directly. The gates are
policy, not code — change them to match your blast radius, not
someone else's.
