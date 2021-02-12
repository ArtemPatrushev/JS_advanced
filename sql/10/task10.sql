ALTER TABLE Products ADD properties JSONB;
UPDATE Products SET properties='{"weight": 110, "legality": true}' WHERE id=1;
UPDATE Products SET properties='{"weight": 3.4, "legality": true}' WHERE id=2;
UPDATE Products SET properties='{"weight": 200, "legality": true}' WHERE id=3;
UPDATE Products SET properties='{"weight": 0.1, "legality": false}' WHERE id IN (4, 5);
UPDATE Products SET properties='{"weight": 1700, "legality": true}' WHERE id=8;