import { describe, expect, it } from "vitest";
import { detectMedia, retrieve } from "./routers";

describe("heritage retrieval", () => {
  it("matches the Dome of the Rock from English wording", () => {
    expect(retrieve("Where is the Dome of the Rock?")[0]?.slug).toBe("dome-of-the-rock");
  });

  it("matches Al-Aqsa from Arabic wording", () => {
    expect(retrieve("أين المسجد الأقصى؟")[0]?.slug).toBe("al-aqsa-mamluk");
  });

  it("detects a documentary request only when media intent is present", () => {
    const sites = retrieve("show me the Al-Aqsa video");
    expect(detectMedia("show me the Al-Aqsa video", sites)?.documentary).toContain("mamluk-jerusalem");
    expect(detectMedia("Tell me about Al-Aqsa", sites)).toBeNull();
  });

  it("keeps a one-character question valid for graceful AI handling", () => {
    expect(retrieve("?")).toEqual([]);
  });
});
