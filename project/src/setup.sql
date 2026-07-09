-- =========================================
-- DROP TABLES
-- =========================================

DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS organization;

-- =========================================
-- ORGANIZATION TABLE
-- =========================================

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- =========================================
-- CATEGORY TABLE
-- =========================================

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT
);

-- =========================================
-- PROJECT TABLE
-- =========================================

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    location VARCHAR(150) NOT NULL,

    organization_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_project_category
        FOREIGN KEY (category_id)
        REFERENCES category(category_id)
        ON DELETE CASCADE
);

-- =========================================
-- SAMPLE ORGANIZATIONS
-- =========================================

INSERT INTO organization
(name, description, contact_email, logo_filename)
VALUES
(
'BrightFuture Builders',
'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
'info@brightfuturebuilders.org',
'brightfuture-logo.png'
),
(
'GreenHarvest Growers',
'An urban farming collective promoting food sustainability and education.',
'contact@greenharvest.org',
'greenharvest-logo.png'
),
(
'UnityServe Volunteers',
'A volunteer coordination group supporting local charities and community initiatives.',
'hello@unityserve.org',
'unityserve-logo.png'
);

-- =========================================
-- SAMPLE CATEGORIES
-- =========================================

INSERT INTO category
(category_name, description)
VALUES
(
'Education',
'Projects that support learning and education.'
),
(
'Environment',
'Projects promoting environmental sustainability.'
),
(
'Community Service',
'Projects that improve local communities.'
);

-- =========================================
-- SAMPLE PROJECTS
-- =========================================

INSERT INTO project
(title, description, date, location, organization_id, category_id)
VALUES

(
'Community Learning Center',
'Construction of a learning center for children.',
'2026-08-10',
'Lagos',
1,
1
),

(
'School Renovation',
'Renovating classrooms and libraries.',
'2026-08-20',
'Ibadan',
1,
1
),

(
'Scholarship Outreach',
'Providing educational scholarships.',
'2026-09-01',
'Abuja',
1,
1
),

(
'Urban Garden Expansion',
'Expansion of community gardens.',
'2026-08-15',
'Port Harcourt',
2,
2
),

(
'Tree Planting Campaign',
'Planting thousands of trees.',
'2026-08-25',
'Enugu',
2,
2
),

(
'Clean River Project',
'Cleaning polluted rivers.',
'2026-09-12',
'Calabar',
2,
2
),

(
'Neighborhood Food Drive',
'Food distribution for vulnerable families.',
'2026-08-18',
'Lagos',
3,
3
),

(
'Free Medical Outreach',
'Community medical screening.',
'2026-09-05',
'Uyo',
3,
3
),

(
'Youth Volunteer Training',
'Training youth volunteers.',
'2026-09-18',
'Benin City',
3,
3
),

(
'Community Cleanup Day',
'Cleaning streets and public spaces.',
'2026-10-01',
'Abeokuta',
3,
3
);