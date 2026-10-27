import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const prefix = "/maengdi-portfolio";

test("exported site loads its assets and navigates under the repository path", async ({
  page,
}) => {
  const failures: string[] = [];
  const runtimeErrors: string[] = [];
  page.on("response", (response) => {
    if (response.status() >= 400) failures.push(response.url());
  });
  page.on("pageerror", (error) => runtimeErrors.push(error.message));
  await page.goto(`${prefix}/`);
  await page.evaluate(() => document.fonts.ready);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "MAENGDI",
  );
  const hero = page.locator(".hero-sculpture");
  await expect(hero).toHaveAttribute(
    "src",
    `${prefix}/images/hero-sculpture.svg`,
  );
  await expect
    .poll(() =>
      hero.evaluate((image) => (image as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.getByRole("link", { name: "View My Work" }).click();
  await expect(page).toHaveURL(new RegExp(`${prefix}/work/$`));
  await page.getByRole("button", { name: "Visual Design" }).click();
  await expect(page.locator(".work-grid .project-card")).toHaveCount(1);
  await page.locator(".project-card").click();
  await expect(page).toHaveURL(new RegExp(`${prefix}/work/visual-system/$`));
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A distinctive visual language",
  );
  await expect
    .poll(() =>
      page
        .locator(".case-cover img")
        .evaluate((image) => (image as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.goto(`${prefix}/playground/?view=form`);
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "다음 이미지" }).click();
  await expect(page.getByRole("dialog")).toContainText("A little rhythm");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  expect(failures).toEqual([]);
  expect(runtimeErrors).toEqual([]);
});

test("exported pages have working deep links, accessible content, and correct production metadata", async ({
  page,
  request,
}) => {
  for (const route of [
    "/",
    "/work/",
    "/work/game-interface/",
    "/about/",
    "/playground/",
    "/contact/",
  ]) {
    const response = await page.goto(prefix + route);
    expect(response?.status()).toBe(200);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
    const result = await new AxeBuilder({ page }).analyze();
    expect(
      result.violations.map((item) => ({
        id: item.id,
        targets: item.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  }
  const sitemap = await request.get(`${prefix}/sitemap.xml`);
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain(
    "https://aodel96.github.io/maengdi-portfolio/work",
  );
  expect(await sitemap.text()).not.toContain("localhost");
  const missing = await page.goto(`${prefix}/work/missing-project/`);
  expect(missing?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Lost in play?" }),
  ).toBeVisible();
});
