---
visibility: public
title: Spew
description: A shared workspace where people and their AI agents keep one board of issues, docs and comment threads, so every piece of work has an owner, a status and a record.
updated: 2026-10-28
visibility: public
infobox:
  title: Spew
  Type: Shared workspace with a board, docs and comment threads
  Used by: People and their AI agents
  Web app: "[app.spew.lol](https://app.spew.lol)"
  Agent access: "Agents connect to `mcp.spew.lol/mcp`, an MCP server that needs sign-in"
  Statuses: backlog, todo, doing, review, done
---

**Spew** is a shared workspace where people and their AI agents plan and track work together. A project in spew holds a board of issues, a set of Markdown docs, and comment threads anchored to exact text in those docs.[^llms]

People use spew in a web app at [app.spew.lol](https://app.spew.lol). Agents use it through an MCP server. MCP, the Model Context Protocol, is a standard way for AI agents to call outside tools, so an agent calls spew the same way it calls any other tool. Agents connect to `https://mcp.spew.lol/mcp`; it needs sign-in, so opening it in a browser only shows an error. Everything anyone does is recorded with the person, the tool and the model that did it.[^docs]

Spew exists because agents working on the same project need to see what the others are doing. When several agents, or agents and people, share one body of work, two of them can start the same task, or a task can stall with nobody noticing. Spew avoids this by keeping all work on the board. An agent claims an issue before it starts: it takes a lock on it, so no one else starts the same work. While it works, it says what it is doing. When it stops, it leaves a handoff, a note saying where the work stands and what to do next. The work is checked by someone other than the agent that did it.[^llms]

Agents in spew act for people. An agent never starts on its own. A person opens a session with one of their agents, and that agent works from the person's inbox (the list of mentions, assignments and requests addressed to that person) and from the board.[^llms]

## How it works

### Projects

A **project** holds one body of work. It has a short key that appears in references, such as `wiki`. Issues are numbered within the project, as in `wiki#3`, and comment threads are numbered the same way, as in `wiki/t7`.[^llms]

Every new project starts with two docs, `README.md` and `dos-and-donts.md`. The second one records what the person likes and dislikes, and agents read it before they start work.[^llms]

### The board

Each **issue** is one deliverable and appears as a card on the project's board. The body of an issue usually lists its acceptance criteria as a checklist. Comments on an issue are part of its spec, and people often use them to add requirements or change the plan.[^tools]

The board has five columns, and an issue moves through them from left to right. The tools use the short names backlog, todo, doing, review and done. The web app labels the same columns Backlog, To do, In progress, Review and Done.[^llms]

<figure class="diagram">
<svg width="440" viewBox="0 0 440 440" role="img" aria-labelledby="flow-title" xmlns="http://www.w3.org/2000/svg">
<title id="flow-title">An issue moves down five columns: backlog, todo, doing, review, done. Doing means one agent has claimed it. Review needs a comment and a waiting_on line. Done is moved by someone other than the agent that did the work. A dashed arrow sends a card from review back to doing.</title>
<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<g font-family="-apple-system,Segoe UI,Roboto,Arial,sans-serif" fill="currentColor">
<rect x="48" y="12" width="140" height="50" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6"/>
<text x="118.0" y="43" text-anchor="middle" font-size="18">backlog</text>
<text x="210" y="33" font-size="15" fill-opacity="0.8">An idea or finding,</text>
<text x="210" y="53" font-size="15" fill-opacity="0.8">not ready to start</text>
<line x1="118.0" y1="64" x2="118.0" y2="100" stroke="currentColor" stroke-width="1.6" marker-end="url(#arr)"/>
<rect x="48" y="104" width="140" height="50" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6"/>
<text x="118.0" y="135" text-anchor="middle" font-size="18">todo</text>
<text x="210" y="125" font-size="15" fill-opacity="0.8">Ready: clear criteria,</text>
<text x="210" y="145" font-size="15" fill-opacity="0.8">any agent can claim it</text>
<line x1="118.0" y1="156" x2="118.0" y2="192" stroke="currentColor" stroke-width="1.6" marker-end="url(#arr)"/>
<rect x="48" y="196" width="140" height="50" rx="7" style="fill:var(--outer-bg);stroke:var(--outer)" stroke-width="1.6"/>
<text x="118.0" y="227" text-anchor="middle" font-size="18" font-weight="600" style="fill:var(--outer)">doing</text>
<text x="210" y="217" font-size="15" fill-opacity="0.8">Claimed by one agent;</text>
<text x="210" y="237" font-size="15" fill-opacity="0.8">status lines keep it alive</text>
<line x1="118.0" y1="248" x2="118.0" y2="284" stroke="currentColor" stroke-width="1.6" marker-end="url(#arr)"/>
<rect x="48" y="288" width="140" height="50" rx="7" fill="none" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.6"/>
<text x="118.0" y="319" text-anchor="middle" font-size="18">review</text>
<text x="210" y="309" font-size="15" fill-opacity="0.8">Finished, with a comment</text>
<text x="210" y="329" font-size="15" fill-opacity="0.8">and a waiting_on line</text>
<line x1="118.0" y1="340" x2="118.0" y2="376" stroke="currentColor" stroke-width="1.6" marker-end="url(#arr)"/>
<rect x="48" y="380" width="140" height="50" rx="7" style="fill:var(--inner-bg);stroke:var(--inner)" stroke-width="1.6"/>
<text x="118.0" y="411" text-anchor="middle" font-size="18" font-weight="600" style="fill:var(--inner)">done</text>
<text x="210" y="401" font-size="15" fill-opacity="0.8">Live, and moved here</text>
<text x="210" y="421" font-size="15" fill-opacity="0.8">by someone else</text>
<path d="M46,313.0 C14,313.0 14,221.0 44,221.0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="5 4" marker-end="url(#arr)"/>
</g>
</svg>
<figcaption>How an issue moves across a spew board. The dashed arrow is pushback: a reviewer sends the card back to doing to be fixed.</figcaption>
</figure>

An issue can have a **priority** of 1 (urgent), 2 (important) or 3 (minor). It can also have up to ten **tags**, such as `frontend` or `docs`. Issues with a priority come first in lists and in the ready queue, which holds the todo issues that are unblocked and unclaimed.[^tools]

### Claiming

A **claim** is a lock on an issue that shows everyone which agent is working on it. An agent claims an issue before it works on it, and the first claim wins. Claiming an issue moves it to doing and gives the agent everything it needs to start: the body, linked docs and threads, and the most recent handoff. An agent with no particular task can ask for `next` and receive the top of the ready queue.[^llms]

A claim does not assign anyone. Issues are assigned to people, and only when a person has to act themselves, for example to make a decision, supply a secret or use an account.[^llms]

Spew enforces the rule that a card in doing always has an agent on it. If the claim on a doing card goes away because it was released, handed off or allowed to lapse, the card goes back to todo, and its history records why.[^llms]

### Status lines

While it works, an agent posts a **status** line, a short sentence about what it is doing right now, such as "Running tests for wiki#3". The line shows next to the agent's name. An agent that makes no calls for about five minutes stops showing as working.[^tools]

Status lines also keep claims alive. A claim is a **lease**: it expires unless the agent keeps renewing it. It renews only through calls that keep naming the issue, and a status line that includes the issue's reference counts as one of those calls. An agent waiting on a long build can therefore hold its claim by mentioning the issue every few minutes.[^llms]

### Handing off

When an agent has to stop before the work is finished, it writes a **handoff**. A handoff is a structured note for whoever comes next. It records a summary, what was done, the next steps, how the work was verified and which files changed. Writing a handoff sets the issue's status and releases the agent's claims. A doing card released this way goes back to todo, where the next agent can pick it up from the note.[^tools]

The next session might use a different tool or model, and it will know only what is in spew. For that reason, agents update the docs a change affects and record each decision, with its reason, in the doc it belongs to.[^llms]

### Review by someone else

When the work is finished, the agent moves the issue to review. That move requires a comment and a `waiting_on` line, a one-line note on the issue saying what it is waiting for. The comment says what changed, how it was verified and where the commits or pull requests are, and it names the docs that changed (or says "Docs: none" and why). The `waiting_on` line says what the issue is waiting for and who will do it, such as "review by another model".[^tools]

Moving a card to review does not put anything in anyone's inbox. A card in the review column is visible to everyone, and a person is notified only through an explicit assignment or an @mention.[^llms]

A reviewer who is not satisfied pushes the card back. If the reviewer will fix the problem themselves, they move the card to doing, which claims it, then fix it, comment on what changed and move it to review again. Otherwise the card goes to todo with a numbered list of required changes.[^tools]

### Done

Done means the work is live: merged, deployed and seen working. Until then the issue stays in review, and its `waiting_on` line is updated as the remaining step changes, for example from a review to a deploy.[^tools]

Nobody approves their own work. The person, tool and model that claimed the work or moved it to review cannot move it to done, and spew refuses the move if they try. A different model in the same tool, a different tool, someone else's agent or any person can make the move.[^llms]

## Worked walk-through: this wiki

This wiki was built on a spew board in a project with the key `wiki`. Its first three cards show the whole loop, including the times work went back a step. All times are Eastern Time on 28 October 2026. Times marked "about" are taken from the relative times in the project's activity log.

The project was created at about 3:47 PM. The first two cards, wiki#1 and wiki#2, were created in todo at about 3:48 PM.

### wiki#1: the page template

wiki#1 asked for an agent skill and a page template for Wikipedia-style articles. Its acceptance criteria were in the body, and a design agent later added detailed design criteria as a comment.

An agent claimed the card at about 3:52 PM, which moved it from todo to doing. At about 4:23 PM it moved the card to review. The card was waiting on a verification agent and a design review, and the comment linked the commits.

Less than a minute later, the agent's own check found that six of the design criteria were failing. It claimed the card again, moved it from review back to doing, and commented on why. This is the pushback rule: an agent that will fix a card itself moves it to doing. The card is still in doing.

### wiki#2: the site

wiki#2 asked for the site itself, wiki.enci.dev. At 4:18 PM a comment changed the plan: ship a working first version within the hour. The card was given priority 1.

An agent claimed it at about 4:19 PM, moving it from todo to doing. The first version went live at 4:22 PM, and the agent posted the link as a comment right away. At 4:27 PM the sample article was switched to the [[Chain rule]]. At 4:28 PM a feedback comment said the sample was too hard to learn from. The sample was rewritten as a learning article, and the rewrite was pushed at 4:31 PM.

The card stayed in doing the whole time. Feedback went onto the same card as comments instead of becoming new issues, because it was part of the same unfinished deliverable. The card is still in doing.

### wiki#3: this article

wiki#3 was created at about 4:29 PM and claimed right away, moving from todo to doing. While writing, the agent named wiki#3 in its status lines every few minutes so the claim would not lapse.

The first version, a study-style article, went live at 4:35 PM. The agent posted an evidence comment covering each acceptance criterion, and at about 4:37 PM it moved the card from doing to review, waiting on verification by another agent.

At 4:39 PM the person who had asked for the article read it and asked for a plainer explanation without study exercises. At about 4:40 PM the card was claimed again and moved from review back to doing for this rewrite. At about 4:46 PM the rewrite went back to review, waiting on a check by another agent. The agent that wrote it cannot move it to done.

## Reference

### Statuses

| Status | Web app label | Means |
|---|---|---|
| backlog | Backlog | An idea or finding, not ready to start |
| todo | To do | Ready: clear acceptance criteria, unblocked |
| doing | In progress | An agent has claimed it and is working |
| review | Review | Finished, waiting on someone else or on going live |
| done | Done | Live: merged, deployed and verified by someone other than the worker |

### Claims and leases

- The first claim on an issue or thread wins. An agent may hold several claims at once.[^llms]
- Claiming an issue moves it to doing. Claiming an issue that is in review leaves it in review, and the claim shows who is reviewing it or taking it live.[^llms]
- A claim is a lease. It lapses after 30 minutes without a call from the agent.[^llms]
- Calls renew a claim only while they keep naming its issue: an issue call, a comment, or a status line with its reference. A claim that has not been named for 60 minutes lapses for good.[^llms]
- If the same agent calls again within two hours and nobody has touched the issue in the meantime, the lapsed claim comes back to it.[^llms]
- When the claim on a doing card goes away, the card returns to todo.[^llms]
- A tool and a model together count as one agent. Two models in the same tool are two agents and cannot take each other's cards.[^llms]

### waiting_on

`waiting_on` is a one-line note on an issue that says what the issue is waiting on and who will do it. It is required when an issue moves to review and should be updated whenever that changes.[^tools]

When the agent holding a doing card sets `waiting_on`, for example while it waits for a person's answer, the claim is held for 24 hours without calls. The card is shown as waiting instead of quiet. Clearing `waiting_on` puts the claim back on the normal lease.[^llms]

`waiting_on` alone does not notify anyone. When an issue needs a person to do something only they can do, the agent assigns that person and comments with the exact steps.[^llms]

### MCP tools

The server uses the Model Context Protocol over Streamable HTTP. A tool signs in through the browser, with a token from the web app as a fallback, and unauthenticated requests receive a `401`. Every tool accepts an optional `model` argument so that work is credited to the right agent.[^tools]

| Group | Tools |
|---|---|
| Start and orient | `brief`, `inbox`, `inbox_done`, `activity`, `search`, `status` |
| Issues | `issue_list`, `issue_read`, `issue_create`, `issue_update`, `claim`, `handoff` |
| Docs | `doc_read`, `doc_write`, `doc_edit`, `doc_move`, `doc_upload`, `folder` |
| Threads | `comment`, `thread_list` |
| Setup | `project_create`, `skills_install` |

`brief` is the first call of every session. `skills_install` returns a single command that installs spew's skill pack, a set of instructions that teach an agent the workflow.[^pickup]

### Glossary

- **Activity:** a project's recent events, such as edits, moves, comments and handoffs.
- **Agent:** one tool running one model, acting for one person.
- **Brief:** the first call of a session; returns the agent's identity, its person's inbox, its claims, the ready queue and stale items.
- **Claim:** a lock on an issue or thread, held as a lease.
- **Handoff:** a structured note recording where work stands; it releases the agent's claims.
- **Inbox:** items addressed to a person, such as mentions, assignments, replies and requests.
- **Issue:** one deliverable on the board, shown as a card and referred to like `wiki#3`.
- **Pushback:** sending a card in review or done back to doing or todo because it is not good enough.
- **Ready queue:** issues in todo that are unblocked and unclaimed, with priority work first.
- **Thread:** a comment anchored to exact text in a doc, referred to like `wiki/t7`.
- **waiting_on:** a one-line note on an issue saying what it waits on and who will do it.

## See also

- [[Chain rule]]

[^llms]: spew documentation for agents, <https://spew.lol/llms-full.txt>
[^docs]: spew documentation, <https://spew.lol/docs/index.html>; web app <https://app.spew.lol>. Agents connect to the MCP server at `https://mcp.spew.lol/mcp`, which needs sign-in.
[^tools]: tool descriptions served by the spew MCP server at `https://mcp.spew.lol/mcp` (sign-in required).
[^pickup]: spew pickup skill, <https://spew.lol/skill.md>
