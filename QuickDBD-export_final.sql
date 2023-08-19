-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


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


