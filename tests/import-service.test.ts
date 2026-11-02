import { describe, it, expect } from "vitest";
import { parseCsvFile } from "@/server/services/import-service";

const validCsv = `external_id,address,postcode,lat,lng,price,beds,baths,building_type,tenure,status,image_urls
EXT-001,12 The Pantiles Tunbridge Wells,TN2 5TN,51.1282,0.2641,325000,2,1,flat,leasehold,live,https://example.com/img1.jpg
EXT-002,8 Langton Road Rusthall,TN4 8RE,51.1415,0.2345,750000,4,2,detached,freehold,live,`;

const mixedCsv = `external_id,address,postcode,lat,lng,price,beds,baths,building_type,tenure,status,image_urls
EXT-001,12 The Pantiles,TN2 5TN,51.1282,0.2641,325000,2,1,flat,leasehold,live,
BAD-001,,INVALID,40.0,10.0,-100,99,99,castle,,live,`;

describe("parseCsvFile", () => {
  it("parses valid CSV into validated rows", () => {
    const result = parseCsvFile(validCsv, "source-1");
    expect(result.totalRows).toBe(2);
    expect(result.valid).toHaveLength(2);
    expect(result.rejected).toHaveLength(0);
    expect(result.valid[0].parsed.external_id).toBe("EXT-001");
    expect(result.valid[0].parsed.price).toBe(325000);
    expect(result.valid[1].parsed.beds).toBe(4);
  });

  it("separates valid and invalid rows", () => {
    const result = parseCsvFile(mixedCsv, "source-1");
    expect(result.totalRows).toBe(2);
    expect(result.valid).toHaveLength(1);
    expect(result.rejected).toHaveLength(1);
    expect(result.rejected[0].errors).toBeDefined();
  });

  it("parses image_urls as array", () => {
    const csv = `external_id,address,postcode,lat,lng,price,beds,baths,building_type,status,image_urls
EXT-001,12 The Pantiles,TN2 5TN,51.1282,0.2641,325000,2,1,flat,live,"https://a.com/1.jpg, https://a.com/2.jpg"`;
    const result = parseCsvFile(csv, "source-1");
    expect(result.valid[0].parsed.image_urls).toEqual([
      "https://a.com/1.jpg",
      "https://a.com/2.jpg",
    ]);
  });

  it("handles empty CSV", () => {
    const csv = `external_id,address,postcode,lat,lng,price,beds,baths,building_type,status,image_urls`;
    const result = parseCsvFile(csv, "source-1");
    expect(result.totalRows).toBe(0);
    expect(result.valid).toHaveLength(0);
    expect(result.rejected).toHaveLength(0);
  });

  it("preserves raw data on rejected rows", () => {
    const result = parseCsvFile(mixedCsv, "source-1");
    expect(result.rejected[0].raw).toBeDefined();
    expect(result.rejected[0].raw.external_id).toBe("BAD-001");
  });
});
