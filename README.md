# 🍀 Emerald Health

**Built at the Google Student AI Hackathon @ Google Dublin Office**

Healthcare theme. 48 hours. 5 students who just met. Way too much coffee.

[Live Demo](https://emerald-health.vercel.app) · [Report Bug](https://github.com/DevEnjoysMath/symptom-assessment-tool/issues)

---

## What is this?

An AI symptom checker for Ireland. You describe what's wrong, optionally upload a photo, and our Gemini-powered AI gives you a preliminary assessment + tells you if you should probably see a doctor.

We also built a provider finder (search GPs/hospitals by location) and a contact page with Irish emergency numbers, telehealth options, etc.

![Homepage](public/demo/hero-screenshot.png)

---

## The Hackathon

**When:** January 2025
**Where:** Google's Dublin office (yes, the actual Google office - still can't believe we got to work there)
**Theme:** AI for Healthcare
**Team size:** 5 people

None of us knew each other before. We formed a team at the kickoff, brainstormed for like 2 hours, and landed on this idea because healthcare in Ireland can be genuinely confusing - especially if you're new here or don't know the system.

The name "Emerald" comes from Ireland being called the Emerald Isle. Green and white theme throughout.

---

## Features

### Symptom Checker
- Describe symptoms in plain English
- Upload photos (rashes, swelling, etc.)
- Get AI analysis with severity assessment
- Clear "should I see a doctor?" guidance

![Symptom Checker](public/demo/symptom-checker.png)

### Find Provider
- Search by city or Eircode
- Filter: GPs, Hospitals, Specialists
- One-tap calling and directions

![Find Provider](public/demo/find-provider.png)

### Contact GP
- Emergency numbers (999, HSE Live, Samaritans, Poisons Centre)
- Telehealth options with pricing
- Dublin GP listings

![Contact GP](public/demo/contact-gp.png)

---

## Tech Stack

| What | Why |
|------|-----|
| Next.js 16 | React framework, handles routing nicely |
| TypeScript | Catches bugs before users see them |
| Tailwind CSS | Fast styling, crucial for hackathon speed |
| Gemini 2.5 Flash | Google's AI - fast and can analyze images |
| Radix UI | Accessible components out of the box |
| Vercel | Easy deploys |

---

## My Part

I handled the backend and AI stuff:

- **API integration** - Connected everything to Google's Generative AI SDK
- **Prompt engineering** - Spent a lot of time making the AI responses actually useful and not scary/irresponsible
- **Image analysis** - Getting the photo upload to work with Gemini's multimodal capabilities
- **Bug fixes** - Hydration errors, hook violations, the usual Next.js fun
- **Deployment** - Fixed a CVE vulnerability last minute before Vercel would accept the deploy

The prompt engineering was honestly the hardest part. You want the AI to be helpful but also not diagnose people or tell them they're fine when they're not. Finding that balance took a lot of iteration.

---

## What I Learned

**Stuff that went well:**
- Splitting work by expertise actually works
- Building the AI part first meant we knew the core feature worked before touching UI
- Saying no to feature creep (we probably rejected 10+ ideas)

**Stuff that was hard:**
- Gemini rate limits during testing (we burned through quota fast)
- The pressure of knowing people might actually use this for health decisions
- Running on 4 hours of sleep

**What I'd do differently:**
- Set up proper error handling earlier
- Write tests for the AI response parsing
- Start deployment setup on day 1, not day 2

---

## Run It Yourself

```bash
git clone https://github.com/DevEnjoysMath/symptom-assessment-tool.git
cd symptom-assessment-tool
npm install

# Create .env.local and add:
# GOOGLE_GENAI_API_KEY=your_key_here

npm run dev
```

Then open http://localhost:3000

---

## The Team

![Team Photo](public/demo/team-photo.jpg)

5 strangers → teammates → actually friends now

Thanks to Google DSC for organizing and the Google Dublin folks for hosting us. The office is insane btw.

---

## Future Ideas

- [ ] Irish language support
- [ ] Symptom history/tracking
- [ ] Better mental health resources
- [ ] Real HSE API integration (if that's even possible)

PRs welcome if any of this interests you.

---

<p align="center">
Built in Dublin 🇮🇪<br>
Google Student AI Hackathon 2025
</p>
