import { readFileSync } from 'node:fs';
import { parse } from 'csv-parse/sync';
import { db } from './db/index.js';
import { compounds } from './db/schema.js';

async function seedDatabase() {
  try {
    // Read and parse the CSV file
    const fileContent = readFileSync('./compound.csv', 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });

    // Transform the data to match our schema
    const compoundData = records.map(record => ({
      id: Number.parseInt(record.id, 10),
      name: record.CompoundName,
      description: record.CompounrDescription,
      strImageSource: record.strImageSource,
      srcImageAttribution: record.strImageAttribution || null,
      dateModified: record.dateModified
    }));

    // Clear existing data
    await db.delete(compounds);

    // Insert the new data
    const result = await db.insert(compounds).values(compoundData).returning();
    
    console.log(`Successfully seeded ${result.length} compounds`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
