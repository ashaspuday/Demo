---
name: job-search-apply
description: Use when the user attaches a resume and asks to find matching jobs on company career sites and/or apply to them. Reads the resume, finds at least 10 live, well-matched openings on official career portals (Greenhouse, Lever, Ashby, Workday, SmartRecruiters, company /careers pages), ranks them, and — only with the user's go-ahead — fills and submits applications in the user's own signed-in browser.
argument-hint: "<resume.pdf> [location] [count]"
---

# Job search & apply from a resume

## Inputs
- **Resume** (required): an attached PDF/DOCX or a path. This is also the file uploaded to every application.
- **Location** (optional): default to the city on the resume, plus "Remote – India"-style remote roles for that country.
- **Count** (optional): default **10**. Never return fewer verified jobs than this without saying why.

## Step 1 — Build the candidate profile from the resume
Read the resume in full and write down (in chat, briefly):
- Target titles: current title plus 2–3 equivalents (e.g. SDET → "Software Development Engineer in Test", "QA Automation Engineer", "Software Engineer in Test", "Test Automation Engineer"). Add "Senior" if the person has 5 or more years.
- Total years of experience, computed from the dates. Acceptable band: the posting's minimum is at most total + 1 years, and its maximum is at least total − 1 years.
- Core skills, ranked by how prominent they are (summary, latest role, skills section).
- Location, languages and preferred domains.
Use only facts that are on the resume. Never invent skills, employers or numbers.

## Step 2 — Search official career portals
Run several searches in one turn, each combining a target title, the location and 1–2 core skills. Restrict them to career portals:
`job-boards.greenhouse.io`, `boards.greenhouse.io`, `jobs.lever.co`, `jobs.ashbyhq.com`, `*.myworkdayjobs.com`, `jobs.smartrecruiters.com`, and company `careers.*` / `/careers` pages.

Aggregators (LinkedIn, Naukri, Indeed, Glassdoor, foundit, Cutshort, Instahyre) may be used **only to discover** a company. The final link must always be the company's own posting. If you can't find the original, drop the job.

Gather about 2× the target count, because many results will be closed.

## Step 3 — Verify every posting is live
Open each posting in a browser or fetch it. Fast checks per portal:
- Greenhouse: `https://boards-api.greenhouse.io/v1/boards/<board>/jobs/<id>` (a 404 means closed)
- Lever: `https://api.lever.co/v0/postings/<company>/<id>`
- Ashby: `https://api.ashbyhq.com/posting-api/job-board/<company>` (look for the id)
- SmartRecruiters: `https://api.smartrecruiters.com/v1/companies/<company>/postings/<id>`
- Workday: `https://<tenant>.wdN.myworkdayjobs.com/wday/cxs/<tenant>/<site>/job/<path>`

Drop a job if it is closed, redirects to a generic list, or was posted more than 60 days ago. **Never** present an unverified job as open. If the network blocks the portals, say so and label the list "unverified".

## Step 4 — Score and present
Score each job from 0 to 100:
- Title and seniority fit: 25
- Experience band fit: 20
- Primary-skill overlap (e.g. Playwright/Selenium, language, API/DB, CI/CD): 35
- Location / work-mode fit: 10
- Bonus skills the resume has (AI tools, team lead, domain): 10

Keep the top ≥ `count` jobs and show a table: `# | Company | Title | Location | Exp asked | Match | Why it fits | Gaps | Apply link`.

Save the same rows to `job-applications.csv` in the working directory, with a `status` column (`found`). The resume and this CSV contain personal data, so never commit them to a repository.

## Step 5 — Apply (only on explicit go-ahead)
Ask once: "Apply to all N, or which ones?" Do nothing until the user answers.

Applying requires a browser **on the user's machine** where they are signed in: Claude in Chrome (`mcp__claude-in-chrome__*`) or the desktop app's built-in browser. Load that browser's skill first. A cloud container cannot do this step; say so and stop after Step 4.

For each approved job:
1. Open the apply link in a new tab.
2. **Sign-in:** if the portal needs an account, use "Sign in with Google" or "Continue with Google" when it's offered. Let the user pick the account and complete any password or 2FA prompt themselves. **Never ask for, type or store a password or OTP.** If only an email/password account is offered, ask before creating one. The user types the password.
3. Fill fields from the resume only: name, email, phone, LinkedIn, current company, years, skills. Upload the resume file.
4. If `job-answers.md` exists in the working directory, use its saved answers: CTC, notice period, work authorization, reason for change (vary the wording per application), and so on. It is git-ignored; never commit it. Stop and ask the user for anything neither the resume nor that file answers: notice period, current/expected CTC, work authorization, relocation, start date, cover-letter text, and every voluntary EEO/demographic question. Reuse their answers for later applications in this run.
5. Before clicking **Submit**, show a short summary (company, role, answers you gave, file uploaded) and wait for an explicit "yes" for that job. A "submit all" from the user covers later jobs only if their summaries contain no new answers.
6. Stop and hand control to the user on a CAPTCHA, an assessment/test link, or anything that looks like it would cost money or share data beyond the application.
7. After each job, update the CSV status: `applied` (with the date), `skipped` (with the reason), `needs-user` or `closed`.

## Step 6 — Report
End with: how many found, how many verified, how many applied/skipped, and the table with final statuses. Add one line on any gaps worth fixing on the resume, based on skills that kept appearing in postings but are missing from the resume.
