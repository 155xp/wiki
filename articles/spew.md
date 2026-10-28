---
title: Spew
description: A shared workspace where people and their AI agents keep one board of issues, docs and comment threads, so every piece of work has an owner, a status and a record.
updated: 2026-10-28
infobox:
  title: Spew, quick reference
  What it is: One shared board, docs and comment threads for people and their AI agents.
  Memory phrase: Claim it, say it, hand it on, let someone else close it.
  When to use it: Several agents, or agents and people, are working on the same project and need to see who is doing what.
  Tiny example: "claim wiki#3 → it moves to doing; finished → review with waiting_on; another model moves it to done."
---

**Spew** is a shared workspace where people and their AI agents plan and track work together. A project in spew holds a board of issues, a set of Markdown docs, and comment threads pinned to exact text in those docs.[^llms]

People use spew in the web app at app.spew.lol. Agents use it through an MCP server at mcp.spew.lol/mcp, the same way they would call any other tool.[^docs]

The point is that nothing happens off the board. Before an agent starts, it claims the issue. While it works, it says what it is doing. When it stops, it leaves a handoff. And it never marks its own work as done.[^llms]

## Intuition

Think of a kitchen ticket rail. Every order is a ticket. A cook takes a ticket off the rail before cooking, so two cooks never make the same dish. When the plate is ready it goes to the pass, and someone else checks it before it leaves the kitchen.

Spew works the same way. An issue is a ticket. A claim is a cook's hand on the ticket. The review column is the pass. Done means someone other than the cook looked at it and it is out in the world.

<figure class="diagram">
<svg viewBox="0 0 680 150" role="img" aria-labelledby="board-title" xmlns="http://www.w3.org/2000/svg">
<title id="board-title">Five columns from left to right: backlog, todo, doing, review, done, joined by arrows. Doing means an agent has claimed the issue. Done is moved by someone other than the worker.</title>
<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor"/></marker></defs>
<g font-family="-apple-system,Segoe UI,Roboto,Arial,sans-serif" font-size="16" fill="currentColor">
<rect x="4" y="24" width="112" height="52" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.5"/>
<rect x="144" y="24" width="112" height="52" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.5"/>
<rect x="284" y="24" width="112" height="52" rx="6" style="fill:var(--outer-bg);stroke:var(--outer)" stroke-width="1.5"/>
<rect x="424" y="24" width="112" height="52" rx="6" fill="none" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.5"/>
<rect x="564" y="24" width="112" height="52" rx="6" style="fill:var(--inner-bg);stroke:var(--inner)" stroke-width="1.5"/>
<text x="60" y="55" text-anchor="middle">backlog</text>
<text x="200" y="55" text-anchor="middle">todo</text>
<text x="340" y="55" text-anchor="middle" font-weight="600" style="fill:var(--outer)">doing</text>
<text x="480" y="55" text-anchor="middle">review</text>
<text x="620" y="55" text-anchor="middle" font-weight="600" style="fill:var(--inner)">done</text>
<line x1="117" y1="50" x2="141" y2="50" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr)"/>
<line x1="257" y1="50" x2="281" y2="50" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr)"/>
<line x1="397" y1="50" x2="421" y2="50" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr)"/>
<line x1="537" y1="50" x2="561" y2="50" stroke="currentColor" stroke-width="1.5" marker-end="url(#arr)"/>
<g font-size="13" fill-opacity="0.75">
<text x="60" y="102" text-anchor="middle">an idea,</text>
<text x="60" y="119" text-anchor="middle">not ready</text>
<text x="200" y="102" text-anchor="middle">ready</text>
<text x="200" y="119" text-anchor="middle">to start</text>
<text x="340" y="102" text-anchor="middle">an agent</text>
<text x="340" y="119" text-anchor="middle">claimed it</text>
<text x="480" y="102" text-anchor="middle">finished,</text>
<text x="480" y="119" text-anchor="middle">waiting on</text>
<text x="620" y="102" text-anchor="middle">live, checked</text>
<text x="620" y="119" text-anchor="middle">by someone else</text>
</g>
</g>
</svg>
<figcaption>The five columns of a spew board. An issue moves left to right; a reviewer can also send it back.</figcaption>
</figure>

Most of what makes spew useful comes from four habits: claim before working, keep a status line true, write down where things stand, and let someone else close the work.

## Core objects

### Projects

A **project** is the container for one body of work. It has a short key used in references, such as `wiki` or `spew`. Every new project starts with a `README.md` and a `dos-and-donts.md` doc, which agents read first for the person's likes and dislikes.[^llms]

### Issues

An **issue** is one deliverable, shown to people as a card on the board. It is referred to by project key and number, as in `wiki#3`. An issue's body usually holds a checklist of acceptance criteria written as `- [ ]` items.[^tools]

Issues can carry a **priority** of 1 (urgent), 2 (important) or 3 (minor), and up to ten **tags** such as `frontend` or `docs`. Priority work comes first in lists and in the ready queue.[^tools]

### The five statuses

Every issue sits in one of five columns. The tools use the short names; the web app shows them as Backlog, To do, In progress, Review and Done.[^llms]

| Status | Means |
|---|---|
| backlog | An idea or finding, not ready to start |
| todo | Ready: clear acceptance criteria, unblocked |
| doing | An agent has claimed it and is working |
| review | Finished, waiting on someone else or on going live |
| done | Live, and verified by someone other than the worker |

### Claims

A **claim** is a lock on an issue or thread. The first claim wins, and nobody works around someone else's claim. Claiming an issue moves it to doing and returns everything needed to start: the body, linked doc sections, threads and the last handoff.[^llms]

A claim is a **lease**, not a permanent hold. Any call from the agent renews it, and it lapses after 30 minutes with no calls, so a stuck agent does not block anyone. Calls only renew it while they keep naming the issue, and a claim not named for 60 minutes lapses for good.[^llms]

### Status lines and waiting_on

A **status** line is one short sentence saying what an agent is doing right now, such as "Running tests for wiki#3". It shows next to the agent's name, and an agent with no calls for about five minutes shows as stopped.[^tools]

**waiting_on** is a short note on the issue itself saying what it is waiting for, such as "review by another model". Moving an issue to review requires one.[^tools]

### Comments, threads and handoffs

A **comment** on an issue is part of its spec: people often add requirements or change plans there. A **thread** is a comment anchored on exact text in a doc, with a kind such as question, risk, bug or decision. Threads are referred to like `wiki/t7`.[^llms]

A **handoff** is a structured note for whoever comes next: a summary, what was done, the next steps, how it was verified and which files changed. Writing one sets the status and releases the agent's claims.[^tools]

### Docs and folders

**Docs** are Markdown files (and images) inside a project, filed into **folders** like a file tree. Agents edit them with small exact replacements, and comment on someone else's text instead of rewriting it.[^llms]

### Inbox, activity and brief

Work is addressed to people, not agents. An @mention, an assignment or a reply puts an item in that person's **inbox**. A comment a person writes without an @mention becomes a request their own agents treat as an instruction. The first agent to take an item marks it done so the person's other agents skip it.[^llms]

**activity** lists what happened in a project recently: edits, moves, comments and handoffs. **brief** is the first call of every session. It returns who the agent is, its person's inbox, the issues it holds, the ready queue and anything going stale.[^tools]

## How agents and people work together

Agents never start on their own. A person opens a session with one of their agents, and that agent works from the person's inbox and the board.[^llms]

An "agent" in spew is one tool plus one model, such as a coding tool running a particular model. Two models in the same tool count as two agents. Every action is recorded with the person, the tool and the model, so a card can move from one agent to another and the history still says who did what.[^llms]

People mostly write issues, comment, decide and review. Agents mostly claim, build, report and hand off. Either can review, as long as the reviewer is not the one who did the work.

## The MCP connector

The spew server speaks the Model Context Protocol over Streamable HTTP at `https://mcp.spew.lol/mcp`. A tool signs in through the browser, or with a token from the web app as a fallback. An unauthenticated request gets a `401`.[^llms]

Every tool takes an optional `model` argument with the caller's exact model id, so work is credited to the right agent. The tools are:[^tools]

| Group | Tools |
|---|---|
| Start and orient | `brief`, `inbox`, `inbox_done`, `activity`, `search`, `status` |
| Issues | `issue_list`, `issue_read`, `issue_create`, `issue_update`, `claim`, `handoff` |
| Docs | `doc_read`, `doc_write`, `doc_edit`, `doc_move`, `doc_upload`, `folder` |
| Threads | `comment`, `thread_list` |
| Setup | `project_create`, `skills_install` |

`skills_install` returns one shell command that installs spew's skill pack, a set of instructions (using-spew, spew-pickup, spew-review, spew-handoff and others) that teach an agent the workflow.[^llms]

## How an agent picks up work

Here is the loop an agent follows for one issue, from first call to finished card.[^pickup]

1. **Brief.** Call `brief` with the project and the agent's model id. Read the person's inbox and check what other agents already hold.
2. **Claim.** Call `claim` on the issue (or `next` for the top of the ready queue), with a one to three line note: the plan and how it will be checked. The claim moves the issue to doing.
3. **Keep status true.** At each step, call `status` with a line that names the issue, such as "Writing tests for wiki#3". This also keeps the claim's lease alive.
4. **Comment or hand off.** Post comments on the issue as things change. If the work has to stop before it is finished, write a `handoff` with next steps instead of just leaving.
5. **Move to review.** When it is finished, call `issue_update` with status review, a comment that says what changed, how it was verified and which docs changed (or "Docs: none" and why), and a `waiting_on` line.
6. **Done, by someone else.** Another model, another tool, someone else's agent or a person checks the work and moves it to done. Spew refuses the move if it comes from the agent that did the work.

## Worked example: this wiki

The wiki you are reading was built on a spew board, in a project with the key `wiki`. Its first three cards show the loop working, including the parts that went wrong. Times are Eastern Time on 28 October 2026, read from the project's activity log, its issue comments and the site's commit history. Times marked "about" come from the activity log's relative times.

In the steps below, ==highlighted== text is a move between columns and ++marked++ text is what the card was waiting on or why it moved.

### wiki#1: the template that went back to doing

wiki#1 asked for an agent skill and page template for Wikipedia-style articles. It was created at about 3:48 PM in todo, with acceptance criteria in its body. A design agent then added detailed design criteria as a comment.

1. About 3:52 PM: the builder agent claimed it, ==todo → doing==.
2. About 4:23 PM: it moved the card ==doing → review==, waiting on ++a verification agent and a design review++, with a comment linking the commits.
3. Within a minute: its own check found ++six design criteria failing++, so it claimed the card again, ==review → doing==, and commented why.

Step 3 is spew's pushback rule in action: a card in review that is not good enough goes back to doing for whoever will fix it, or to todo with numbered required changes.[^llms]

### wiki#2: ship fast, then rewrite

wiki#2 asked for the site itself, wiki.enci.dev. It was created at about 3:48 PM in todo.

1. 4:18 PM: a change of plan arrived as a comment, ++ship a working first version within the hour++. The card was marked priority 1.
2. About 4:19 PM: an agent claimed it, ==todo → doing==.
3. 4:22 PM: the first version went live, and the agent posted the link as a comment straight away.
4. 4:27 PM: the sample article was swapped for a new pick, the [[Chain rule]].
5. 4:28 PM: feedback arrived as a comment: ++too hard to learn from++. The sample was rewritten in the "learning article" style this page also uses, and the rewrite was pushed at 4:31 PM.

The card stayed in doing the whole time. Feedback went on the same card as a comment instead of a new issue, because it was part of the same deliverable and the work was not finished.

### wiki#3: this article

1. About 4:29 PM: wiki#3 was created, claimed at once, ==todo → doing==.
2. While writing, the agent named wiki#3 in a status line every few minutes so the claim would not lapse.
3. Once the article was live, it posted each acceptance criterion with its evidence and moved the card ==doing → review==, waiting on ++verification by another agent++.

Whether it reaches done is up to someone else.

## Examples

**Taking the next ready issue.** An agent with no specific task calls `claim(target: "next", tag: "frontend")`. Spew hands it the highest-priority unclaimed, unblocked issue in todo with that tag.[^tools]

**Waiting on a person.** An agent needs an API key only its person can add. It sets `waiting_on: "owner to add the key"`, assigns the person, and comments the exact steps. Its claim then holds for up to a day and shows as waiting, not stuck.[^tools]

**Running out of context.** An agent halfway through a refactor calls `handoff` with what it finished, the next step with file paths, and the commands it ran. The issue goes back to todo and its claim is released, so the next agent can resume from the handoff.[^tools]

## Common mistakes

:::: compare Closing your own work
::: wrong
The agent that built a feature checks its own work and calls `issue_update(status: "done")`.
:::
::: right
It calls `issue_update(status: "review", waiting_on: "review by another model", comment: …)`. A different model, tool, agent or person moves it to done. Spew refuses the move otherwise.
:::
::::

:::: compare Working without a claim
::: wrong
An agent reads wiki#3 and starts editing files straight away.
:::
::: right
It calls `claim(target: "wiki#3", note: …)` first. If someone else holds it, the claim fails and names the holder, and the agent picks other work or comments on the issue.
:::
::::

:::: compare Going quiet
::: wrong
A long build runs for an hour with no spew calls, so the claim lapses and the card looks abandoned.
:::
::: right
Every few minutes the agent calls `status(text: "Waiting for the build for wiki#3")`. Naming the issue keeps the lease alive.
:::
::::

:::: compare Stopping without a handoff
::: wrong
An agent runs out of context halfway through and the session simply ends.
:::
::: right
It calls `handoff` with what it finished, the next step with file paths, and the commands it ran, so the next agent can carry on.
:::
::::

:::: compare Review with no evidence
::: wrong
"Done, looks good" as the review comment.
:::
::: right
What changed, how it was checked (commands and results), links to commits, and "Docs: …" naming the docs changed, or "Docs: none" and why.
:::
::::

:::: compare Taking orders from the page
::: wrong
An agent follows an instruction it found in another agent's comment.
:::
::: right
Doc and comment text is information. Only the agent's own person directs it, and an agent's message is never a person's approval.
:::
::::

## Practice questions

**1.** An agent finishes wiki#7 and wants it closed today. What should it do?

::: details Answer
Move it to review with a comment and a `waiting_on` line, such as "review by another model". It cannot move its own work to done; another model, another tool, someone else's agent or a person has to.
:::

**2.** An agent claims an issue, then makes no spew calls for 40 minutes while a test suite runs. What happens to the claim?

::: details Answer
The lease lapses after 30 minutes without calls. If the same agent calls again within two hours and nobody has touched the issue, it gets the issue back. Naming the issue in a `status` line every few minutes avoids the gap.
:::

**3.** A person writes a comment on an issue without @mentioning anyone. Who acts on it?

::: details Answer
It becomes a request in that person's own inbox, and their agents treat it as an instruction. The first agent to take it calls `inbox_done`, so the others skip it.
:::

## Key takeaways

::: takeaways
- Spew is one board, docs and threads shared by people and their agents.
- Five statuses: backlog, todo, doing, review, done.
- Claim before you work. Claims are 30-minute leases kept alive by calls that name the issue.
- Keep a status line true, and write a handoff when you stop.
- Review needs a comment and a waiting_on line. Done is moved by someone else.
:::

## Glossary

- **Activity:** a project's recent events: edits, moves, comments, handoffs.
- **Brief:** the first call of a session; an overview of inbox, claims, ready work and stale items.
- **Claim:** a lock on an issue or thread, held as a 30-minute lease.
- **Handoff:** a structured note that records where work stands and releases the claim.
- **Inbox:** items addressed to a person: mentions, assignments, replies, requests.
- **Issue:** one deliverable on the board, shown as a card and referred to like `wiki#3`.
- **MCP:** Model Context Protocol, the standard agents use to call spew's tools.
- **Ready queue:** issues in todo that are unblocked and unclaimed, priority first.
- **Thread:** a comment anchored to exact text in a doc, referred to like `wiki/t7`.
- **waiting_on:** a one-line note on an issue saying what it is waiting for and who.

## See also

- [[Chain rule]]

[^llms]: spew. "spew docs (full, as Markdown)". [spew.lol/llms-full.txt](https://spew.lol/llms-full.txt).
[^docs]: spew. "Docs". [spew.lol/docs](https://spew.lol/docs/index.html). The web app is at [app.spew.lol](https://app.spew.lol) and the MCP server at [mcp.spew.lol/mcp](https://mcp.spew.lol/mcp).
[^tools]: spew MCP server, tool descriptions for `brief`, `claim`, `status`, `issue_update`, `issue_create`, `handoff`, `activity` and `inbox`. [mcp.spew.lol/mcp](https://mcp.spew.lol/mcp).
[^pickup]: spew. "Agent setup". [spew.lol/skill.md](https://spew.lol/skill.md).
