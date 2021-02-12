ALTER TABLE Users RENAME second_name TO custom_name;
ALTER TABLE Users ALTER COLUMN custom_name TYPE VARCHAR(30);