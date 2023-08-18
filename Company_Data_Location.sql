
-- Drop Tables if Existing
DROP TABLE IF EXISTS company_data_2021
DROP TABLE IF EXISTS company_data_2022 
DROP TABLE IF EXISTS company_location

-- Exported from QuickDBD: Specifying data types, primary keys, and foreign keys
-- Import CSV Files into Corresponding Tables

CREATE TABLE "company_location" (
    "Company" VARCHAR   NOT NULL,
    "Sector" VARCHAR   NOT NULL,
    "City" VARCHAR   NOT NULL,
    "State" VARCHAR   NOT NULL,
    "Ceo_woman" VARCHAR   NOT NULL,
    "lat" DECIMAL(20,15)   NOT NULL,
    "long" DECIMAL(20,15)   NOT NULL
);

CREATE TABLE "company_data_2021" (
    "Company" VARCHAR   NOT NULL,
    "Revenue_2021" FLOAT   NOT NULL,
    "Revenue%change_2021" FLOAT   NOT NULL,
    "Profits_in_millions_2021" FLOAT   NOT NULL,
    "Market_value_2021" FLOAT   NOT NULL,
    "Employees_2021" INT   NOT NULL,
    CONSTRAINT "pk_company_data_2021" PRIMARY KEY (
        "Company"
     )
);

CREATE TABLE "company_data_2022" (
    "Company" VARCHAR   NOT NULL,
    "Revenue_2022" FLOAT   NOT NULL,
    "Revenue%change_2022" FLOAT   NOT NULL,
    "Profits_in_millions_2022" FLOAT   NOT NULL,
    "Market_value_2022" FLOAT   NOT NULL,
    "Employees_2022" INT   NOT NULL
);

ALTER TABLE "company_location" ADD CONSTRAINT "fk_company_location_Company" FOREIGN KEY("Company")
REFERENCES "company_data_2021" ("Company");

ALTER TABLE "company_data_2022" ADD CONSTRAINT "fk_company_data_2022_Company" FOREIGN KEY("Company")
REFERENCES "company_data_2021" ("Company");

-- Query to Retrieve Data following CSV Import

SELECT * FROM company_data_2021
SELECT * FROM company_data_2022
SELECT * FROM company_location

-- Create Table to Combine Data From company_data_2021, company_data_2022, and company_location

CREATE TABLE company_data_and_location AS
SELECT 
	a."Company", a."Revenue_2021",a."Revenue%change_2021",a."Profits_in_millions_2021",a."Market_value_2021",a."Employees_2021",
	b."Revenue_2022",b."Revenue%change_2022",b."Profits_in_millions_2022",b."Market_value_2022",b."Employees_2022",
	c."Sector",c."City",c."State",c."Ceo_woman",c.lat,c.long
FROM company_data_2021 as a
INNER JOIN company_data_2022 as b 
ON a."Company"=b."Company"
INNER JOIN company_location as c
ON b."Company"=c."Company";

