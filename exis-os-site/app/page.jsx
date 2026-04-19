export default function Page() {
  return (
    <>
      <div className="topbar">
        <span>
          <span className="dot"></span>
          <b>EXIS-OS</b> &nbsp;v0.1.0
        </span>
        <span className="mid">
          ./operating-policy — OpenHands + Devstral
        </span>
        <nav>
          <a href="#policy">policy</a>
          <a href="#nodes">nodes</a>
          <a href="#gates">gates</a>
          <a href="#install">install</a>
        </nav>
      </div>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="eyebrow">
            <span className="pill">OPERATING POLICY</span> MICROAGENT · v0.1
          </div>
          <h1>
            EXIS<span className="slash">/</span>OS
          </h1>
          <div className="bar"></div>
          <p className="lede">
            An operating policy for <em>OpenHands + Devstral</em>. Three
            environments. One discipline. Zero fabricated return codes.
          </p>
          <div className="cta-row">
            <a className="btn" href="#install">
              Install →
            </a>
            <a className="btn ghost" href="#policy">
              Read the policy
            </a>
          </div>

          <div
            className="diagram"
            role="img"
            aria-label="Three-node resource model diagram"
          >
            <pre>
              <span className="c">
                {"// the agent classifies every task into exactly one environment"}
              </span>
              {"\n\n"}
              {"          "}
              <span className="k">{"┌─────────────────────┐"}</span>
              {"\n"}
              {"          "}
              <span className="k">{"│"}</span>
              {"       EXIS-OS       "}
              <span className="k">{"│"}</span>
              {"   "}
              <span className="c">{"policy envelope"}</span>
              {"\n"}
              {"          "}
              <span className="k">{"└──────────┬──────────┘"}</span>
              {"\n"}
              {"                     │\n"}
              {"        "}
              <span className="k">{"┌────────────┼────────────┐"}</span>
              {"\n"}
              {"        │            │            │\n"}
              {"  "}
              <span className="k">{"┌─────┴─────┐  ┌───┴────┐  ┌────┴─────┐"}</span>
              {"\n"}
              {"  "}
              <span className="k">{"│"}</span>
              {"  NODE-L   "}
              <span className="k">{"│"}</span>
              {"  "}
              <span className="k">{"│"}</span>
              {" NODE-M "}
              <span className="k">{"│"}</span>
              {"  "}
              <span className="k">{"│"}</span>
              {"  NODE-C  "}
              <span className="k">{"│"}</span>
              {"\n"}
              {"  "}
              <span className="k">{"│"}</span>
              {"  local    "}
              <span className="k">{"│"}</span>
              {"  "}
              <span className="k">{"│"}</span>
              {"  z/OS  "}
              <span className="k">{"│"}</span>
              {"  "}
              <span className="k">{"│"}</span>
              {"  cloud   "}
              <span className="k">{"│"}</span>
              {"\n"}
              {"  "}
              <span className="k">{"│"}</span>
              {"  sandbox  "}
              <span className="k">{"│"}</span>
              {"  "}
              <span className="k">{"│"}</span>
              {"  zowe  "}
              <span className="k">{"│"}</span>
              {"  "}
              <span className="k">{"│"}</span>
              {"  apis    "}
              <span className="k">{"│"}</span>
              {"\n"}
              {"  "}
              <span className="k">{"└───────────┘  └────────┘  └──────────┘"}</span>
              {"\n"}
              {"     bash         jcl          curl / sdk"}
            </pre>
          </div>
        </section>

        {/* MANIFESTO */}
        <section id="policy">
          <div className="section-num">
            <span className="tag">§01</span> MANIFESTO
          </div>
          <div className="manifesto">
            <p>
              Out of the box, agentic coders will happily hallucinate JCL return
              codes, invent dataset names, and <code>rm -rf</code> their way out
              of a bad state.
            </p>
            <p>
              Exis-OS does not replace the agent. It{" "}
              <strong>constrains</strong> it — with a resource model, a
              verify-before-mutate loop, and a short list of safety gates that
              pause the agent before anything irreversible.
            </p>
          </div>
        </section>

        {/* NODES */}
        <section id="nodes">
          <div className="section-num">
            <span className="tag">§02</span> RESOURCE MODEL
          </div>
          <h2 className="section-h2">
            Three nodes.
            <br />
            Pick <span className="accent">one</span> before you type.
          </h2>
          <p className="nodes-intro">
            The point isn&apos;t to enumerate every environment — it&apos;s to
            force the agent to pick the right tool <em>before</em> it starts
            typing, rather than fumbling between them.
          </p>
          <div className="nodes-grid">
            <div className="node-card">
              <div className="node-head">
                <span>NODE-L</span>
                <span className="idx">01/03</span>
              </div>
              <div className="node-body">
                <h3>
                  Local <span className="sub">/sandbox</span>
                </h3>
                <p>
                  The OpenHands sandbox itself — filesystem, processes,
                  installed CLIs, localhost ports. The bash, editor and IPython
                  tools operate here by default. Default assumption for any
                  task that doesn&apos;t clearly need M or C.
                </p>
                <div className="cmd">
                  <span className="prompt">$</span>uname -a &amp;&amp; ls
                </div>
              </div>
            </div>
            <div className="node-card">
              <div className="node-head">
                <span>NODE-M</span>
                <span className="idx">02/03</span>
              </div>
              <div className="node-body">
                <h3>
                  Mainframe <span className="sub">/z-os</span>
                </h3>
                <p>
                  Reached exclusively through the Zowe CLI. If{" "}
                  <code>zowe --version</code> fails, Node-M is unreachable and
                  the agent must say so — not fabricate a jobid, not guess a
                  return code, not invent JCL output.
                </p>
                <div className="cmd">
                  <span className="prompt">$</span>zowe zos-jobs submit
                  local-file
                </div>
              </div>
            </div>
            <div className="node-card">
              <div className="node-head">
                <span>NODE-C</span>
                <span className="idx">03/03</span>
              </div>
              <div className="node-body">
                <h3>
                  Cloud <span className="sub">/apps</span>
                </h3>
                <p>
                  Everything reachable over the network: REST APIs, SaaS SDKs,
                  cloud consoles via the browser tool. Deliberately fuzzy — the
                  agent picks <em>curl</em>, an installed SDK, or the browser
                  based on what the task actually needs.
                </p>
                <div className="cmd">
                  <span className="prompt">$</span>curl -fsS https://api/...
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section>
          <div className="section-num">
            <span className="tag">§03</span> OPERATING PRINCIPLES
          </div>
          <h2 className="section-h2">
            Four rules.
            <br />
            <span className="accent">No exceptions.</span>
          </h2>
          <div className="principles">
            <div className="principle">
              <div className="num">01</div>
              <div className="body">
                <h4>Observe before mutating</h4>
                <p>
                  Every state change is preceded by a read-only check —{" "}
                  <code>ls</code>, <code>ps</code>, <code>git status</code>,{" "}
                  <code>zowe zos-jobs list</code>. The next step is grounded in
                  real output, not in a plausible-sounding assumption.
                </p>
              </div>
            </div>
            <div className="principle">
              <div className="num">02</div>
              <div className="body">
                <h4>Translate by host</h4>
                <p>
                  Detect the shell once (<code>uname -a</code> or{" "}
                  <code>$PSVersionTable</code>) and use the correct syntax
                  thereafter. No cross-wiring POSIX flags into PowerShell or
                  vice versa.
                </p>
              </div>
            </div>
            <div className="principle">
              <div className="num">03</div>
              <div className="body">
                <h4>Self-correct once</h4>
                <p>
                  On non-zero exit, read stderr, form one concrete hypothesis,
                  retry. If the retry fails, stop and surface the error. No
                  thrashing through five package managers hoping something
                  sticks.
                </p>
              </div>
            </div>
            <div className="principle">
              <div className="num">04</div>
              <div className="body">
                <h4>JCL hygiene</h4>
                <p>
                  Validate JCL locally before submission. Never edit production
                  datasets without explicit approval. The lint is cheap; the
                  submit round-trip is not.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GATES */}
        <section id="gates">
          <div className="section-num">
            <span className="tag">§04</span> SAFETY GATES
          </div>
          <h2 className="section-h2">
            Pause. Ask.
            <br />
            Then <span className="accent">act.</span>
          </h2>
          <div className="gates-wrap">
            <div className="ribbon">⚠ DANGER ZONE</div>
            <p className="intro">
              A short list beats a long one. These are the five classes of
              action the agent must not perform without explicit human
              confirmation.
            </p>
            <ol className="gates-list">
              <li className="gate">
                <span className="mark">×</span>
                <span className="no">GATE 01</span>
                <div>
                  <h5>Local destructive shell</h5>
                  <p>
                    <code>rm -rf</code>, <code>dd</code>, <code>mkfs</code>,{" "}
                    <code>shutdown</code>, or <code>kill -9</code> on a process
                    the agent did not itself spawn.
                  </p>
                </div>
              </li>
              <li className="gate">
                <span className="mark">×</span>
                <span className="no">GATE 02</span>
                <div>
                  <h5>Unbounded SQL mutation</h5>
                  <p>
                    <code>DELETE</code> or <code>UPDATE</code> without a{" "}
                    <code>WHERE</code>; any <code>DROP</code>,{" "}
                    <code>TRUNCATE</code>, or DML against a schema named{" "}
                    <code>prod*</code>.
                  </p>
                </div>
              </li>
              <li className="gate">
                <span className="mark">×</span>
                <span className="no">GATE 03</span>
                <div>
                  <h5>Mainframe production datasets</h5>
                  <p>
                    Any job or file write targeting <code>PROD.*</code> or{" "}
                    <code>SYS1.*</code>. Enforced at tool level by the submit
                    wrapper, not just by prose.
                  </p>
                </div>
              </li>
              <li className="gate">
                <span className="mark">×</span>
                <span className="no">GATE 04</span>
                <div>
                  <h5>Shared git history rewrites</h5>
                  <p>
                    Force-push to non-scratch branches, deletion of branches the
                    agent didn&apos;t create, <code>reset --hard</code> over
                    uncommitted user work.
                  </p>
                </div>
              </li>
              <li className="gate">
                <span className="mark">×</span>
                <span className="no">GATE 05</span>
                <div>
                  <h5>Credential leakage</h5>
                  <p>
                    Writing tokens, API keys, or private keys to disk, a log, a
                    commit message, or a PR body. If it looks like a secret,
                    don&apos;t persist it.
                  </p>
                </div>
              </li>
            </ol>
            <div className="coda">
              When in doubt, ask. Speed is never worth a destroyed dataset.
            </div>
          </div>
        </section>

        {/* INSTALL */}
        <section id="install">
          <div className="section-num">
            <span className="tag">§05</span> INSTALL
          </div>
          <h2 className="section-h2">
            Drop it in.
            <br />
            Start <span className="accent">OpenHands.</span>
          </h2>
          <p className="install-intro">
            Exis-OS ships as a repo-scoped microagent. OpenHands auto-loads any
            file under <code>.openhands/microagents/</code> when the workspace
            is mounted.
          </p>

          <div className="code-block">
            <div className="head">
              <span className="tag">STEP 1</span>
              <span>CLONE</span>
            </div>
            <pre>
              <span className="c">
                {"# drop the microagent into your workspace"}
              </span>
              {"\n"}
              <span className="k">git clone</span>
              {" https://github.com/you/exis-os my-workspace\n"}
              <span className="k">cd</span>
              {" my-workspace"}
            </pre>
          </div>

          <div className="code-block">
            <div className="head">
              <span className="tag">STEP 2</span>
              <span>RUN OPENHANDS</span>
            </div>
            <pre>
              <span className="k">docker run</span>
              {" -it --rm --pull=always \\\n"}
              {"  -e LLM_MODEL="}
              <span className="s">{'"mistral/devstral-small-latest"'}</span>
              {" \\\n"}
              {"  -e LLM_API_KEY="}
              <span className="s">{'"$MISTRAL_API_KEY"'}</span>
              {" \\\n"}
              {"  -e SANDBOX_VOLUMES="}
              <span className="s">{'"$(pwd):/workspace:rw"'}</span>
              {" \\\n"}
              {"  -v /var/run/docker.sock:/var/run/docker.sock \\\n"}
              {"  -v ~/.openhands:/.openhands \\\n"}
              {"  -p 3000:3000 \\\n"}
              {"  docker.all-hands.dev/all-hands-ai/openhands:latest"}
            </pre>
          </div>

          <div className="code-block">
            <div className="head">
              <span className="tag">STEP 3</span>
              <span>VERIFY</span>
            </div>
            <pre>
              <span className="c">
                {"# open http://localhost:3000 and say:"}
              </span>
              {"\n"}
              <span className="k">&gt;</span>
              {" exis, run scripts/preflight.sh and tell me\n"}
              <span className="k">&gt;</span>
              {" which of Node-L, M, C you can actually reach."}
            </pre>
          </div>
        </section>
      </main>

      {/* CONNECT / SUPPORT */}
      <div className="connect">
        <div className="inner">
          <h3>
            Built by <span className="accent">Madhur Sabherwal.</span>
          </h3>
          <div className="sub">// Data Engineer · Perth, Australia</div>
          <div className="links">
            <a
              className="card"
              href="https://www.linkedin.com/in/madhur-sabherwal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="label">
                <span className="tag">CONNECT</span>
                <span className="name">LinkedIn →</span>
              </div>
              <span className="arrow">↗</span>
            </a>
            <a
              className="card"
              href="https://buymeacoffee.com/MaadhurSabherwal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="label">
                <span className="tag">SUPPORT</span>
                <span className="name">Buy me a coffee</span>
              </div>
              <span className="arrow">☕</span>
            </a>
          </div>
        </div>
      </div>

      <footer>
        <div className="inner">
          <div>
            © 2026 &nbsp; EXIS-OS &nbsp;·&nbsp; MIT &nbsp;·&nbsp;{" "}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              source
            </a>
          </div>
          <div>
            built for{" "}
            <a
              href="https://github.com/All-Hands-AI/OpenHands"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenHands
            </a>{" "}
            ·{" "}
            <a
              href="https://mistral.ai/news/devstral/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Devstral
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
