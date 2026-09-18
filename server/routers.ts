import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

const sites = [
  { slug: "dome-of-the-rock", name: "Dome of the Rock", arabic: "قبة الصخرة", period: "Umayyad Jerusalem · 691 CE", category: "Architecture", location: "Temple Mount / al-Ḥaram al-Sharīf", verifiedFact: "Its foundation inscription is among the earliest surviving examples of monumental Islamic epigraphy.", sources: ["UNESCO World Heritage Centre", "The Israel Museum, Jerusalem"] },
  { slug: "city-of-david", name: "City of David", arabic: "مدينة داود", period: "Iron Age · c. 1000 BCE", category: "Archaeology", location: "Silwan ridge", verifiedFact: "The ancient ridge is associated with the oldest continuously inhabited core of Jerusalem.", sources: ["British Museum", "A. W. Lawrence Archive"] },
  { slug: "old-city-walls", name: "Old City Walls", arabic: "أسوار البلدة القديمة", period: "Ottoman Jerusalem · 1538–1541", category: "History", location: "Old City perimeter", verifiedFact: "The present walls were commissioned during the reign of Sultan Suleiman the Magnificent.", sources: ["UNESCO World Heritage Centre", "The Israel Museum, Jerusalem"] },
  { slug: "al-aqsa-mamluk", name: "Al-Aqsa in Mamluk Jerusalem", arabic: "المسجد الأقصى في القدس المملوكية", period: "Mamluk Jerusalem · 13th–15th century", category: "Live documentary", location: "al-Ḥaram al-Sharīf", verifiedFact: "The Mamluk period left a visible architectural and institutional imprint around Jerusalem's sacred plateau.", sources: ["UNESCO World Heritage Centre", "The Israel Museum, Jerusalem"], media: { documentary: "/manus-storage/mamluk-jerusalem-documentary(1)_d062a406.mp4", duration: "01:04", timeLens: ["Mamluk Jerusalem · c. 1350", "100 years ago · c. 1926", "1 year ago · c. 2025"] } },
];

const sources = [
  { institution: "UNESCO World Heritage Centre", title: "Old City of Jerusalem and Its Walls", type: "Heritage institution", date: "1981" },
  { institution: "The Israel Museum, Jerusalem", title: "Jerusalem: A History of the City", type: "Museum collection", date: "2024" },
  { institution: "British Museum", title: "Jerusalem Through Time", type: "Academic collection", date: "2022" },
  { institution: "A. W. Lawrence Archive", title: "The City of David and Early Jerusalem", type: "Archive / field record", date: "1936" },
];

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  heritage: router({
    sites: publicProcedure.query(() => sites),
    site: publicProcedure.input(z.object({ slug: z.string() })).query(({ input }) => sites.find(site => site.slug === input.slug) ?? null),
    sources: publicProcedure.query(() => sources),
    ask: publicProcedure.input(z.object({ question: z.string().min(2), siteSlug: z.string().optional() })).mutation(({ input }) => {
      const site = sites.find(item => item.slug === input.siteSlug);
      const subject = site ? site.name : "Jerusalem";
      return {
        answer: `Based on the available historical sources, ${subject} is best understood as a layered place. The evidence points to a site whose meaning and built form changed across centuries; some details remain interpreted rather than certain. ATHAR will always distinguish documented facts from historical interpretation.`,
        sources: site?.sources ?? sources.slice(0, 2).map(source => source.institution),
        transparency: "VERIFIED FACT + HISTORICAL INTERPRETATION",
      };
    }),
  }),
  routes: router({
    generate: publicProcedure.input(z.object({ availableTime: z.string(), interest: z.string() })).mutation(({ input }) => ({
      title: `Jerusalem in ${input.availableTime}`,
      interest: input.interest,
      distance: "2.4 km",
      stops: sites.slice(0, 3).map((site, index) => ({ site: site.name, slug: site.slug, duration: index === 0 ? "35 min" : index === 1 ? "40 min" : "45 min", walk: index === 0 ? "Start here" : index === 1 ? "Walk 0.8 km" : "Walk 1.1 km" })),
    })),
  }),
  passport: router({
    progress: publicProcedure.query(() => ({ badgesEarned: 2, sitesUnlocked: 3, storiesHeard: 6, badges: ["Heritage Explorer", "History Seeker"] })),
  }),
});

export type AppRouter = typeof appRouter;
