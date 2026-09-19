import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn(async () => ({
    id: "test-response",
    created: 0,
    model: "gpt-5-mini",
    choices: [{ index: 0, finish_reason: "stop", message: { role: "assistant", content: "Dome of the Rock is a layered place. VERIFIED FACT: its foundation inscription is among the earliest surviving examples of monumental Islamic epigraphy. HISTORICAL INTERPRETATION: its meaning has changed across centuries." } }],
  })),
}));

const ctx = {
  user: null,
  req: {} as TrpcContext["req"],
  res: {} as TrpcContext["res"],
} as TrpcContext;

describe("heritage content API", () => {
  it("returns the seeded Jerusalem sites and documentary experience", async () => {
    const sites = await appRouter.createCaller(ctx).heritage.sites();
    expect(sites).toHaveLength(4);
    expect(sites.map(site => site.slug)).toContain("dome-of-the-rock");
    expect(sites.map(site => site.slug)).toContain("city-of-david");
    expect(sites.map(site => site.slug)).toContain("al-aqsa-mamluk");
  });

  it("returns a source-aware AI answer with navigation metadata", async () => {
    const answer = await appRouter.createCaller(ctx).heritage.ask({
      question: "Why does this place matter?",
      siteSlug: "dome-of-the-rock",
    });
    expect(answer.answer).toContain("Dome of the Rock");
    expect(answer.sources.length).toBeGreaterThan(0);
    expect(answer.transparency).toContain("VERIFIED FACT");
    expect(answer.matchedSites[0]?.href).toBe("/site/dome-of-the-rock");
  });

  it("generates a route with all supported stops", async () => {
    const route = await appRouter.createCaller(ctx).routes.generate({ availableTime: "2 hours", interest: "Architecture" });
    expect(route.stops).toHaveLength(3);
    expect(route.distance).toBe("2.4 km");
  });

  it("returns passport progress", async () => {
    const passport = await appRouter.createCaller(ctx).passport.progress();
    expect(passport.badgesEarned).toBe(2);
    expect(passport.badges).toContain("Heritage Explorer");
  });
});
