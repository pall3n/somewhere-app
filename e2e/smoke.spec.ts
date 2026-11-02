import { test, expect } from "@playwright/test";

test("homepage loads with somewhere wordmark", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("header")).toContainText("somewhere");
});

test("property cards render with seed data", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator('[data-testid="property-card"]');
  await expect(cards.first()).toBeVisible();
});

test("header nav links present", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Homes" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Places" })).toBeVisible();
});

test("mobile nav opens at small viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: /menu/i });
  await expect(menuButton).toBeVisible();
  await menuButton.click();
  await expect(page.getByRole("link", { name: "Homes" })).toBeVisible();
});
