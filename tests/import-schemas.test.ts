import { describe, it, expect } from "vitest";
import { validateImportRow } from "@/lib/validation/import-schemas";

describe("importRowSchema", () => {
  const validRow = {
    external_id: "EXT-001",
    address: "12 The Pantiles, Tunbridge Wells",
    postcode: "TN2 5TN",
    lat: "51.1282",
    lng: "0.2641",
    price: "325000",
    beds: "2",
    baths: "1",
    building_type: "flat",
    tenure: "leasehold",
    status: "live",
    image_urls: "https://example.com/img1.jpg, https://example.com/img2.jpg",
  };

  it("validates a correct row", () => {
    const result = validateImportRow(validRow);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.external_id).toBe("EXT-001");
      expect(result.data.price).toBe(325000);
      expect(result.data.lat).toBe(51.1282);
      expect(result.data.image_urls).toEqual([
        "https://example.com/img1.jpg",
        "https://example.com/img2.jpg",
      ]);
    }
  });

  it("rejects missing external_id", () => {
    const row = { ...validRow, external_id: "" };
    const result = validateImportRow(row);
    expect(result.success).toBe(false);
  });

  it("rejects invalid UK postcode", () => {
    const row = { ...validRow, postcode: "12345" };
    const result = validateImportRow(row);
    expect(result.success).toBe(false);
  });

  it("accepts valid UK postcodes", () => {
    for (const pc of ["TN2 5TN", "SW1A 1AA", "EC1A 1BB", "M1 1AE"]) {
      const row = { ...validRow, postcode: pc };
      const result = validateImportRow(row);
      expect(result.success).toBe(true);
    }
  });

  it("rejects latitude outside UK bounds", () => {
    const row = { ...validRow, lat: "40.0" };
    const result = validateImportRow(row);
    expect(result.success).toBe(false);
  });

  it("rejects longitude outside UK bounds", () => {
    const row = { ...validRow, lng: "10.0" };
    const result = validateImportRow(row);
    expect(result.success).toBe(false);
  });

  it("rejects negative price", () => {
    const row = { ...validRow, price: "-100" };
    const result = validateImportRow(row);
    expect(result.success).toBe(false);
  });

  it("rejects invalid building_type", () => {
    const row = { ...validRow, building_type: "castle" };
    const result = validateImportRow(row);
    expect(result.success).toBe(false);
  });

  it("defaults status to live when not provided", () => {
    const { status: _, ...row } = validRow;
    const result = validateImportRow(row);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.status).toBe("live");
    }
  });

  it("handles empty image_urls", () => {
    const row = { ...validRow, image_urls: "" };
    const result = validateImportRow(row);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.image_urls).toEqual([]);
    }
  });

  it("handles missing image_urls", () => {
    const { image_urls: _, ...row } = validRow;
    const result = validateImportRow(row);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.image_urls).toEqual([]);
    }
  });
});
