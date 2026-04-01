import { WebhookEvent } from "@clerk/nextjs/server"
import { headers } from "next/headers"
import { Webhook } from 'svix'
import { supabase } from "@/lib/data-base/supabase"

// ─────────────────────────────────────────────
// Seed helper — runs once on first signup
// ─────────────────────────────────────────────
async function seedUserData(userId: number) {
  // 1. Create 2 libraries
  const { data: libraries, error: libError } = await supabase
    .from("libraries")
    .insert([
      {
        name: "Work Notes",
        description: "All work-related notes and tasks",
        user_id: userId,
        is_default: true,
      },
      {
        name: "Personal",
        description: "Personal notes, ideas and journal",
        user_id: userId,
        is_default: false,
      },
    ])
    .select()

  if (libError || !libraries) {
    console.error("❌ Seed: Error creating libraries:", libError)
    return
  }

  const [workLib, personalLib] = libraries

  // 2. Create 3 folders per library
  const { data: folders, error: folderError } = await supabase
    .from("folders")
    .insert([
      // Work library
      { folder_name: "Projects",  user_id: userId, library_id: workLib.id },
      { folder_name: "Meetings",  user_id: userId, library_id: workLib.id },
      { folder_name: "Research",  user_id: userId, library_id: workLib.id },
      // Personal library
      { folder_name: "Journal",   user_id: userId, library_id: personalLib.id },
      { folder_name: "Ideas",     user_id: userId, library_id: personalLib.id },
      { folder_name: "Reading",   user_id: userId, library_id: personalLib.id },
    ])
    .select()

  if (folderError || !folders) {
    console.error("❌ Seed: Error creating folders:", folderError)
    return
  }

  const [projects, meetings, research, journal, ideas, reading] = folders

  // 3. Create 2 notes per folder
//   const { error: notesError } = await supabase
//     .from("notes")
//     .insert([
//       // Projects
//       { title: "Q2 Roadmap",          content: "<h1>Q2 Roadmap</h1><p>Key milestones for Q2.</p>",                      folder_id: projects.id, is_pinned: true,  is_favourite: false, is_public: false },
//       { title: "Sprint Planning",     content: "<h2>Sprint Goals</h2><p>Deliverables for next sprint.</p>",             folder_id: projects.id, is_pinned: false, is_favourite: false, is_public: false },
//       // Meetings
//       { title: "Weekly Standup",      content: "<h2>Standup Notes</h2><p>Team updates this week.</p>",                  folder_id: meetings.id, is_pinned: false, is_favourite: false, is_public: false },
//       { title: "Client Call Summary", content: "<h2>Client Feedback</h2><p>Key points from the client call.</p>",       folder_id: meetings.id, is_pinned: true,  is_favourite: true,  is_public: false },
//       // Research
//       { title: "Competitor Analysis", content: "<h2>Competitors</h2><p>Overview of top market competitors.</p>",        folder_id: research.id, is_pinned: false, is_favourite: false, is_public: false },
//       { title: "Tech Stack Compare",  content: "<h2>Options</h2><p>Next.js vs Remix for the new project.</p>",          folder_id: research.id, is_pinned: false, is_favourite: true,  is_public: false },
//       // Journal
//       { title: "March Reflection",    content: "<h1>March 2026</h1><p>A good month. Learned a lot.</p>",                folder_id: journal.id,  is_pinned: false, is_favourite: false, is_public: false },
//       { title: "Goals for April",     content: "<h2>April Goals</h2><ul><li>Read 2 books</li><li>Exercise</li></ul>",   folder_id: journal.id,  is_pinned: true,  is_favourite: false, is_public: false },
//       // Ideas
//       { title: "Habit Tracker App",   content: "<h2>Idea</h2><p>A minimal app to track daily habits.</p>",              folder_id: ideas.id,    is_pinned: false, is_favourite: true,  is_public: false },
//       { title: "Blog Post Ideas",     content: "<h2>Topics</h2><ul><li>Next.js tips</li><li>Supabase RLS</li></ul>",    folder_id: ideas.id,    is_pinned: false, is_favourite: false, is_public: true  },
//       // Reading
//       { title: "Atomic Habits Notes", content: "<h2>Takeaways</h2><p>Small habits compound over time.</p>",             folder_id: reading.id,  is_pinned: false, is_favourite: true,  is_public: false },
//       { title: "Deep Work Summary",   content: "<h2>Summary</h2><p>Focus is the superpower in a distracted world.</p>", folder_id: reading.id,  is_pinned: false, is_favourite: false, is_public: false },
//     ])

  const { error: notesError } = await supabase
  .from("notes")
  .insert([
    // ── Projects ──────────────────────────────────────────────
    {
      title: "Q2 Roadmap",
      folder_id: projects.id,
      is_pinned: true,
      is_favourite: false,
      is_public: false,
      content: `
        <h1>Q2 Roadmap — April to June 2026</h1>
        <p>This document outlines the <strong>key initiatives</strong>, <em>milestones</em>, and <mark>critical deadlines</mark> for Q2. Every team member should review this before the quarter kickoff.</p>

        <h2>Objectives</h2>
        <ul>
          <li>Launch <strong>v2.0</strong> of the core product by <mark>May 15</mark></li>
          <li>Onboard <em>at least 3 enterprise clients</em></li>
          <li>Reduce churn rate by <s>20%</s> <strong>25%</strong> (revised target)</li>
          <li>Complete <mark>security audit</mark> before public beta</li>
        </ul>

        <h2>Timeline</h2>
        <ol>
          <li><strong>April:</strong> Finalize designs, complete backend APIs</li>
          <li><strong>May:</strong> Internal QA, beta launch to select users</li>
          <li><strong>June:</strong> Public launch, marketing push, retrospective</li>
        </ol>

        <h2>Risks & Mitigations</h2>
        <p><s>Initial plan was to ship in March</s> — delayed due to infra issues. Key risks going forward:</p>
        <ul>
          <li><mark>Dependency on third-party API</mark> — have a fallback ready</li>
          <li>Team bandwidth during May holidays</li>
          <li>Scope creep from stakeholder requests</li>
        </ul>

        <h2>Notes</h2>
        <p>All updates should be logged in the project tracker. <em>Weekly syncs every Monday at 10am.</em> Reach out to the PM if blockers arise before then.</p>
      `,
    },
    {
      title: "Sprint Planning",
      folder_id: projects.id,
      is_pinned: false,
      is_favourite: false,
      is_public: false,
      content: `
        <h1>Sprint 12 — Planning Document</h1>
        <p>Sprint duration: <strong>April 7 – April 21</strong>. This sprint focuses on <mark>authentication refactor</mark> and <em>dashboard performance improvements</em>.</p>

        <h2>Sprint Goals</h2>
        <ol>
          <li>Refactor <strong>Clerk auth</strong> integration to support org-level roles</li>
          <li>Reduce dashboard load time from <s>4.2s</s> to <strong>under 1.5s</strong></li>
          <li>Fix all <mark>P0 and P1 bugs</mark> from last sprint retrospective</li>
        </ol>

        <h2>Tickets in Scope</h2>
        <ul>
          <li><strong>AUTH-204:</strong> Migrate to Clerk organizations API</li>
          <li><strong>PERF-089:</strong> Lazy load dashboard widgets</li>
          <li><strong>BUG-310:</strong> <mark>Fix logout redirect loop</mark> on mobile</li>
          <li><strong>UI-145:</strong> Update sidebar to new <em>design system tokens</em></li>
        </ul>

        <h2>Out of Scope</h2>
        <p>The following items were <s>initially considered</s> but deferred to Sprint 13:</p>
        <ul>
          <li>Email notification system</li>
          <li>Dark mode toggle</li>
        </ul>

        <h2>Definition of Done</h2>
        <p>A ticket is <strong>done</strong> when: code is reviewed, tests pass, <mark>staging deploy is verified</mark>, and the PM has signed off.</p>
      `,
    },

    // ── Meetings ───────────────────────────────────────────────
    {
      title: "Weekly Standup",
      folder_id: meetings.id,
      is_pinned: false,
      is_favourite: false,
      is_public: false,
      content: `
        <h1>Weekly Standup — April 7, 2026</h1>
        <p>Attendees: <strong>Manoj, Priya, Dev, Sara</strong>. Facilitated by <em>Manoj</em>. Duration: <mark>15 minutes</mark>.</p>

        <h2>What did we ship last week?</h2>
        <ul>
          <li>Manoj: <strong>Completed</strong> the folder API refactor with user scoping</li>
          <li>Priya: Shipped <mark>new onboarding flow</mark> to staging</li>
          <li>Dev: Fixed <s>3 known bugs</s> — actually resolved <strong>5 bugs</strong> total</li>
          <li>Sara: Finalized <em>Q2 content calendar</em></li>
        </ul>

        <h2>What are we working on this week?</h2>
        <ol>
          <li>Manoj — <mark>Webhook seed logic</mark> for new signups</li>
          <li>Priya — A/B test for onboarding CTA copy</li>
          <li>Dev — Performance profiling on notes editor</li>
          <li>Sara — Launch blog post for v2.0 announcement</li>
        </ol>

        <h2>Blockers</h2>
        <p>Dev is blocked on <strong>missing staging credentials</strong> for the payment gateway. <mark>Action: Sara to follow up with finance by EOD.</mark></p>

        <h2>Reminders</h2>
        <p><em>All PRs must be reviewed within 24 hours.</em> <s>Bi-weekly all-hands is cancelled</s> — rescheduled to April 14.</p>
      `,
    },
    {
      title: "Client Call Summary",
      folder_id: meetings.id,
      is_pinned: true,
      is_favourite: true,
      is_public: false,
      content: `
        <h1>Client Call — Acme Corp | April 5, 2026</h1>
        <p>Call duration: <strong>45 minutes</strong>. Participants: <em>Manoj (us), James & Rachel (Acme)</em>. Topic: <mark>Renewal discussion + feature requests</mark>.</p>

        <h2>Key Discussion Points</h2>
        <ol>
          <li>Acme is happy with the <strong>core product</strong> but flagged <mark>slow load times</mark> on the reports page</li>
          <li>They want <em>role-based access control</em> before renewing the enterprise plan</li>
          <li>Rachel specifically mentioned that <s>the old export feature was better</s> — needs investigation</li>
        </ol>

        <h2>Feature Requests</h2>
        <ul>
          <li><strong>Priority 1:</strong> <mark>RBAC with manager/viewer roles</mark></li>
          <li><strong>Priority 2:</strong> Bulk export to PDF</li>
          <li><strong>Priority 3:</strong> <em>Slack integration for note sharing</em></li>
          <li><s>Custom domain support</s> — already on roadmap, confirmed to James</li>
        </ul>

        <h2>Commitments Made</h2>
        <p>We committed to delivering <mark>RBAC by end of May</mark>. James agreed to <strong>extend the trial by 30 days</strong> pending this delivery.</p>

        <h2>Next Steps</h2>
        <ol>
          <li>Manoj to create RBAC ticket and assign to Dev</li>
          <li>Sara to send follow-up email with roadmap timeline</li>
          <li><em>Next call scheduled: May 2, 2026</em></li>
        </ol>
      `,
    },

    // ── Research ───────────────────────────────────────────────
    {
      title: "Competitor Analysis",
      folder_id: research.id,
      is_pinned: false,
      is_favourite: false,
      is_public: false,
      content: `
        <h1>Competitor Analysis — Notes App Market</h1>
        <p>Last updated: <strong>April 2026</strong>. This document tracks <mark>direct and indirect competitors</mark> and their positioning relative to our product.</p>

        <h2>Direct Competitors</h2>
        <ul>
          <li><strong>Notion</strong> — All-in-one workspace. <em>Strong brand, complex UX.</em> <mark>Their free tier is very generous.</mark></li>
          <li><strong>Obsidian</strong> — Local-first, markdown-based. Popular with <em>power users and developers.</em></li>
          <li><strong>Roam Research</strong> — <s>Was hyped in 2021</s>, growth has stalled. Bi-directional linking is their USP.</li>
        </ul>

        <h2>Indirect Competitors</h2>
        <ul>
          <li>Google Docs — Used as a notes tool despite not being one</li>
          <li>Apple Notes — <em>Pre-installed advantage</em> on iOS devices</li>
          <li><mark>Bear App</mark> — Beautiful UI, loyal niche following</li>
        </ul>

        <h2>Our Differentiators</h2>
        <ol>
          <li><strong>Library + Folder + Note hierarchy</strong> — more intuitive than flat structures</li>
          <li><mark>Rich text with HTML content</mark> — not just markdown</li>
          <li>Built-in <em>favourites, pinning, and public sharing</em></li>
          <li>Tight <strong>Clerk auth integration</strong> — enterprise-ready from day one</li>
        </ol>

        <h2>Gaps to Address</h2>
        <p>We currently lack: <s>mobile app (in progress)</s>, <mark>offline support</mark>, and real-time collaboration. These should be on the <strong>H2 roadmap</strong>.</p>
      `,
    },
    {
      title: "Tech Stack Comparison",
      folder_id: research.id,
      is_pinned: false,
      is_favourite: true,
      is_public: false,
      content: `
        <h1>Tech Stack Comparison — Frontend Framework</h1>
        <p>Evaluating options for the <mark>v3.0 rewrite</mark>. This note captures research done in <strong>March–April 2026</strong>.</p>

        <h2>Options Evaluated</h2>
        <ol>
          <li><strong>Next.js 15</strong> (current stack)</li>
          <li><strong>Remix v3</strong></li>
          <li><em>SvelteKit</em> (dark horse candidate)</li>
        </ol>

        <h2>Next.js 15</h2>
        <ul>
          <li><mark>App Router is stable</mark> and well-documented</li>
          <li>Strong ecosystem — Vercel, Clerk, Supabase all have first-class support</li>
          <li><s>Pages Router is being deprecated</s> — already migrated</li>
          <li>Turbopack is <em>significantly faster</em> than Webpack for dev builds</li>
        </ul>

        <h2>Remix v3</h2>
        <ul>
          <li>Excellent <strong>data loading patterns</strong> with loaders/actions</li>
          <li><em>Smaller bundle size</em> out of the box</li>
          <li><mark>Less ecosystem support</mark> — Clerk and Supabase integrations are community-maintained</li>
          <li>Migration cost is <strong>high</strong> — estimated 6–8 weeks</li>
        </ul>

        <h2>Decision</h2>
        <p><strong>Sticking with Next.js 15.</strong> The ecosystem lock-in with Clerk + Supabase + Vercel makes switching <mark>high risk with low reward</mark>. <em>Revisit in 2027 if Remix ecosystem matures.</em></p>
      `,
    },

    // ── Journal ────────────────────────────────────────────────
    {
      title: "March Reflection",
      folder_id: journal.id,
      is_pinned: false,
      is_favourite: false,
      is_public: false,
      content: `
        <h1>March 2026 — Monthly Reflection</h1>
        <p>Another month gone. Here's an honest look at <strong>what went well</strong>, <em>what didn't</em>, and <mark>what I want to carry forward</mark>.</p>

        <h2>Wins 🎉</h2>
        <ul>
          <li>Shipped the <strong>folder API refactor</strong> — finally scoped by user properly</li>
          <li>Started working out consistently — <mark>18 out of 31 days</mark></li>
          <li>Read <em>two full books</em> (Atomic Habits + Deep Work)</li>
          <li>Had a great client call that might convert to a <strong>big contract</strong></li>
        </ul>

        <h2>What Didn't Go Well</h2>
        <ul>
          <li><s>Planned to launch the mobile app — didn't happen</s></li>
          <li>Spent too much time in meetings, <mark>deep work blocks kept getting interrupted</mark></li>
          <li><em>Sleep schedule was inconsistent</em> for the first two weeks</li>
        </ul>

        <h2>Lessons Learned</h2>
        <ol>
          <li><strong>Block deep work time in the calendar</strong> — treat it like a meeting</li>
          <li>Don't commit to deadlines without <mark>buffer time built in</mark></li>
          <li><em>Rest is productive.</em> The weeks I slept well, I shipped more.</li>
        </ol>

        <h2>Intention for April</h2>
        <p>Focus on <strong>one big thing per day</strong>. Less context switching. <mark>Ship the seed feature, close the Acme deal, read one book.</mark> That's it.</p>
      `,
    },
    {
      title: "Goals for April",
      folder_id: journal.id,
      is_pinned: true,
      is_favourite: false,
      is_public: false,
      content: `
        <h1>April 2026 — Goals & Intentions</h1>
        <p>Setting clear goals for the month. Inspired by last month's reflection — <em>fewer goals, deeper focus.</em></p>

        <h2>Work Goals</h2>
        <ol>
          <li><mark>Close Acme Corp deal</mark> by April 15</li>
          <li>Ship <strong>RBAC feature</strong> to staging by April 28</li>
          <li>Write and publish <em>one technical blog post</em></li>
          <li><s>Attend 3 networking events</s> — replaced with 1 quality event</li>
        </ol>

        <h2>Health Goals</h2>
        <ul>
          <li>Exercise <strong>at least 20 days</strong> out of 30</li>
          <li><mark>Sleep by 11pm on weekdays</mark> — non-negotiable</li>
          <li>No coffee after <em>2pm</em></li>
        </ul>

        <h2>Learning Goals</h2>
        <ul>
          <li>Finish <strong>PostgreSQL performance tuning</strong> course</li>
          <li>Read: <em>The Pragmatic Programmer</em></li>
          <li>Watch <mark>at least 4 conference talks</mark> on distributed systems</li>
        </ul>

        <h2>End of Month Check-in Prompt</h2>
        <p>On April 30, ask: <em>"Did I do the work that mattered, or just the work that felt urgent?"</em> <strong>Be honest.</strong></p>
      `,
    },

    // ── Ideas ──────────────────────────────────────────────────
    {
      title: "Habit Tracker App",
      folder_id: ideas.id,
      is_pinned: false,
      is_favourite: true,
      is_public: false,
      content: `
        <h1>App Idea — Minimal Habit Tracker</h1>
        <p>A <strong>dead-simple</strong> habit tracking app. No streaks guilt, no gamification noise. Just <mark>honest daily logging</mark>.</p>

        <h2>Core Problem</h2>
        <p>Existing apps like Habitica and Streaks are <s>too complex</s> or too gamified. People want something that <em>respects their time</em> and doesn't punish missing a day.</p>

        <h2>Core Features (MVP)</h2>
        <ol>
          <li><strong>Add habits</strong> with a name and frequency (daily / weekly)</li>
          <li><mark>One-tap check-in</mark> per habit per day</li>
          <li>Simple <em>monthly view</em> — no streaks, just dots</li>
          <li>Optional <strong>reminder notification</strong> at a set time</li>
        </ol>

        <h2>Tech Stack Ideas</h2>
        <ul>
          <li>Frontend: <strong>React Native</strong> (or Flutter for cross-platform)</li>
          <li>Backend: <em>Supabase</em> — already familiar with it</li>
          <li>Auth: <mark>Clerk</mark> — same as my current project</li>
          <li><s>Firebase</s> — considered but rejected due to vendor lock-in</li>
        </ul>

        <h2>Monetisation</h2>
        <p>Free forever for core features. <strong>One-time purchase</strong> of ₹299 to unlock <em>custom themes and export to CSV</em>. <mark>No subscriptions.</mark></p>

        <h2>Next Step</h2>
        <p>Sketch 3 screens on paper this weekend. Validate the idea with <strong>5 people</strong> before writing a single line of code.</p>
      `,
    },
    {
      title: "Blog Post Ideas",
      folder_id: ideas.id,
      is_pinned: false,
      is_favourite: false,
      is_public: true,
      content: `
        <h1>Blog Post Backlog — 2026</h1>
        <p>A running list of <strong>post ideas</strong> worth writing. Updated regularly. <mark>Starred items are highest priority.</mark></p>

        <h2>Technical Posts</h2>
        <ol>
          <li>⭐ <mark><strong>Supabase RLS: A practical guide for Next.js apps</strong></mark></li>
          <li>⭐ <strong>Clerk Webhooks + Supabase</strong> — syncing users on signup</li>
          <li><em>next/image with external domains</em> — the gotchas no one talks about</li>
          <li>TypeScript strict mode — <s>why I avoided it</s> why you shouldn't</li>
          <li>Building a <mark>seed script</mark> that runs on first user signup</li>
        </ol>

        <h2>Product / Indie Hacker Posts</h2>
        <ul>
          <li>How I validated my SaaS idea in <strong>one weekend</strong></li>
          <li><em>The real cost of "just one more feature"</em></li>
          <li><mark>Shipping alone vs shipping with a team</mark> — honest comparison</li>
          <li><s>Why I switched from Notion to my own app</s> — too niche, skip</li>
        </ul>

        <h2>Format Ideas</h2>
        <ul>
          <li><strong>Short tutorials</strong> (under 800 words) perform best on dev.to</li>
          <li><em>Longer essays</em> do better on personal blog and newsletter</li>
          <li>Consider <mark>video walkthroughs</mark> for the more complex technical posts</li>
        </ul>

        <h2>Publishing Schedule</h2>
        <p>Aim for <strong>one post every two weeks</strong>. Quality over quantity. <em>Each post should answer one specific question clearly.</em></p>
      `,
    },

    // ── Reading ────────────────────────────────────────────────
    {
      title: "Atomic Habits — Notes",
      folder_id: reading.id,
      is_pinned: false,
      is_favourite: true,
      is_public: false,
      content: `
        <h1>Atomic Habits — James Clear</h1>
        <p>Finished: <strong>March 18, 2026</strong>. Rating: <mark>9/10</mark>. One of the most practically useful books I've read.</p>

        <h2>Core Framework — The 4 Laws</h2>
        <ol>
          <li><strong>Make it obvious</strong> — design your environment for the habit</li>
          <li><strong>Make it attractive</strong> — <em>temptation bundling</em> works well here</li>
          <li><strong>Make it easy</strong> — <mark>reduce friction below the threshold of resistance</mark></li>
          <li><strong>Make it satisfying</strong> — immediate reward keeps the loop going</li>
        </ol>

        <h2>Highlights & Quotes</h2>
        <ul>
          <li><em>"You do not rise to the level of your goals, you fall to the level of your systems."</em></li>
          <li>Identity-based habits: <mark>vote for the person you want to become</mark> with every action</li>
          <li><s>Motivation is overrated</s> — <strong>environment design is what actually drives behaviour</strong></li>
        </ul>

        <h2>Applied to My Life</h2>
        <ul>
          <li>Put <strong>my book on my pillow</strong> every morning so I read before sleep</li>
          <li><mark>Phone charger moved outside the bedroom</mark> — reduced screen time by 40 min/day</li>
          <li>Linked workouts to <em>morning coffee</em> — don't drink it until I've exercised</li>
        </ul>

        <h2>Re-read?</h2>
        <p><strong>Yes</strong> — specifically chapters 6 and 13. <em>Would recommend to anyone building a product or a routine.</em></p>
      `,
    },
    {
      title: "Deep Work — Notes",
      folder_id: reading.id,
      is_pinned: false,
      is_favourite: false,
      is_public: false,
      content: `
        <h1>Deep Work — Cal Newport</h1>
        <p>Finished: <strong>March 29, 2026</strong>. Rating: <mark>8/10</mark>. Dense but rewarding. Best read slowly.</p>

        <h2>The Central Argument</h2>
        <p><em>"Deep work is the ability to focus without distraction on a cognitively demanding task."</em> Newport argues this is becoming <strong>increasingly rare</strong> and <mark>increasingly valuable</mark> — a powerful combination.</p>

        <h2>The 4 Philosophies of Deep Work</h2>
        <ol>
          <li><strong>Monastic</strong> — eliminate all shallow work entirely (e.g. Donald Knuth)</li>
          <li><strong>Bimodal</strong> — <em>alternate between deep and shallow seasons</em></li>
          <li><strong>Rhythmic</strong> — <mark>daily deep work block, same time every day</mark> ← most practical</li>
          <li><strong>Journalistic</strong> — fit deep work whenever possible (hard to do well)</li>
        </ol>

        <h2>Rules That Stuck</h2>
        <ul>
          <li><mark>Schedule every minute of your workday</mark> — not to be rigid, but to be intentional</li>
          <li><strong>Quit social media</strong> — or at least do a <em>30-day absence experiment</em></li>
          <li><s>Multitasking is efficient</s> — it destroys depth and residue lingers for 20+ minutes</li>
          <li>Embrace <em>boredom</em> — <mark>don't reach for your phone every idle moment</mark></li>
        </ul>

        <h2>My Takeaway</h2>
        <p>I now <strong>block 9am–12pm as deep work</strong> daily. No Slack, no email, no meetings. <mark>Output in those 3 hours beats the rest of the day combined.</mark> <em>This book is responsible for that change.</em></p>
      `,
    },
  ])

  if (notesError) {
    console.error("❌ Seed: Error creating notes:", notesError)
    return
  }
}

// ─────────────────────────────────────────────
// Webhook handler
// ─────────────────────────────────────────────
export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add clerk web hook to .env')
  }

  const headerPayload = headers()
  const svix_id = (await headerPayload).get('svix-id')
  const svix_timestamp = (await headerPayload).get('svix-timestamp')
  const svix_signature = (await headerPayload).get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent
  } catch (err) {
    return new Response('Error occured', { status: 400 })
  }

  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data

    if (!id || !email_addresses) {
      return new Response('Error occured -- missing data', { status: 400 })
    }

    const userName = [first_name, last_name].filter(Boolean).join(' ')
      || email_addresses[0].email_address.split('@')[0]

    const { data, error } = await supabase
      .from('users')
      .insert({
        clerk_id: id,
        email: email_addresses[0].email_address,
        user_name: userName,
      })
      .select()
      .single()

    if (error) {
      return new Response('Error saving user', { status: 500 })
    }

    // ✅ Seed default libraries, folders, and notes for new user
    await seedUserData(data.id)
  }

  return new Response('', { status: 200 })
}