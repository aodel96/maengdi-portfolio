import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Home communicates the role and connects the main journeys", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page).toHaveTitle("MAENGDI — Game UI/UX & Visual Designer");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "MAENGDI",
  );
  await expect(
    page.getByText("Game UI/UX & Visual Designer.", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".selected-grid .project-card")).toHaveCount(3);
  await expect(page.locator(".play-preview-card")).toHaveCount(3);
  // Bring lazy images into view before capturing the full-page reference.
  await page.locator(".play-preview").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".play-preview img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              (image as HTMLImageElement).complete &&
              (image as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: `artifacts/home-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await page.getByRole("link", { name: "View My Work" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(
    page.getByRole("heading", { name: "Work.", exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("category filters actually change the projects", async ({ page }) => {
  await page.goto("/work");
  await expect(page.locator(".work-grid .project-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Visual Design" }).click();
  await expect(page.locator(".work-grid .project-card")).toHaveCount(1);
  await expect(page.locator(".work-grid")).toContainText(
    "A distinctive visual language",
  );
  await expect(
    page.getByRole("button", { name: "Visual Design" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Game UI/UX" }).click();
  await expect(page.locator(".work-grid .project-card")).toHaveCount(2);
  await page.getByRole("button", { name: "All", exact: false }).click();
  await expect(page.locator(".work-grid .project-card")).toHaveCount(3);
});

test("project details include every case-study section", async ({ page }) => {
  await page.goto("/work");
  await page.locator(".project-card").first().click();
  await expect(page).toHaveURL(/\/work\/game-interface$/);
  await expect(
    page.getByText("실제 프로젝트가 아닌 상세 페이지 템플릿", { exact: false }),
  ).toBeVisible();
  for (const title of [
    "Overview",
    "Context & Problem",
    "My Role & Process",
    "Final Design",
    "Outcome & Reflection",
  ]) {
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
  }
  await page.getByRole("link", { name: "All work", exact: true }).click();
  await expect(page).toHaveURL(/\/work$/);
});

test("gallery supports navigation, Escape, focus return, and direct links", async ({
  page,
}) => {
  await page.goto("/playground");
  const first = page.getByRole("button", {
    name: /Studies in form.*크게 보기/,
  });
  await first.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("Studies in form");
  await page.getByRole("button", { name: "다음 이미지" }).click();
  await expect(page.getByRole("dialog")).toContainText("A little rhythm");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("dialog")).toContainText("Color, in between");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(first).toBeFocused();
  await page.goto("/playground?view=color");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("Color, in between");
  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
  await page.getByRole("button", { name: "상세 보기 닫기" }).click();
  await expect(page).toHaveURL(/\/playground$/);
});

test("missing personal information is explicit and never creates fake contact links", async ({
  page,
}) => {
  await page.goto("/about");
  await expect(
    page.getByRole("button", { name: "Download résumé" }),
  ).toBeDisabled();
  await expect(
    page.getByText("현재 공개된 경력 정보가 없습니다.", { exact: false }),
  ).toBeVisible();
  await page.goto("/contact");
  await expect(
    page.getByText("이메일 주소 등록 예정", { exact: true }),
  ).toBeVisible();
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.locator(".channel-pending")).toHaveCount(3);
});

test("navigation works on the current viewport", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "메뉴 열기" }).click();
    await expect(
      page.getByRole("button", { name: "메뉴 닫기" }),
    ).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "메뉴 열기" })).toBeFocused();
    await page.getByRole("button", { name: "메뉴 열기" }).click();
    await page
      .getByRole("navigation", { name: "모바일 내비게이션" })
      .getByRole("link", { name: "About" })
      .click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(
      page.getByRole("button", { name: "메뉴 열기" }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
      "hidden",
    );
  } else {
    await page
      .getByRole("navigation", { name: "주 내비게이션" })
      .getByRole("link", { name: "About" })
      .click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(
      page
        .getByRole("navigation", { name: "주 내비게이션" })
        .getByRole("link", { name: "About" }),
    ).toHaveAttribute("aria-current", "page");
  }
});

test("pages fit the viewport and pass automated accessibility checks", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/work",
    "/work/game-interface",
    "/about",
    "/playground",
    "/contact",
  ]) {
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflows, `Horizontal overflow on ${route}`).toBe(false);
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => ({
          target: node.target,
          summary: node.failureSummary,
        })),
      })),
      `Accessibility violations on ${route}`,
    ).toEqual([]);
  }
});

test("unknown projects return a real 404", async ({ page }) => {
  const response = await page.goto("/work/not-a-real-project");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "Lost in play?" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Back to Home" }).click();
  await expect(page).toHaveURL("/");
});
