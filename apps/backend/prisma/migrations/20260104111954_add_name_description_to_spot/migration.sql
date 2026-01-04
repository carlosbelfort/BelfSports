-- 1. Adiciona a coluna como opcional temporariamente
ALTER TABLE "Spot" ADD COLUMN "name" TEXT;
ALTER TABLE "Spot" ADD COLUMN "description" TEXT;

-- 2. Define um valor padrão para os registros existentes
UPDATE "Spot"
SET "name" = 'Spot sem nome'
WHERE "name" IS NULL;

-- 3. Torna a coluna obrigatória
PRAGMA foreign_keys=off;
CREATE TABLE "new_Spot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "eventId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Spot_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Spot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Spot"
SELECT
  "id",
  "name",
  "description",
  "status",
  "createdAt",
  "updatedAt",
  "eventId",
  "userId"
FROM "Spot";
DROP TABLE "Spot";
ALTER TABLE "new_Spot" RENAME TO "Spot";
PRAGMA foreign_keys=on;