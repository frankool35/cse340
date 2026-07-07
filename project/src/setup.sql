-- =========================================
-- DROP TABLES (Run in reverse dependency order)
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
    project_name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    start_date DATE,

    organization_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id),

    CONSTRAINT fk_project_category
        FOREIGN KEY (category_id)
        REFERENCES category (category_id)
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
'An urban farming collective promoting food sustainability and education in local neighborhoods.',
'contact@greenharvest.org',
'greenharvest-logo.png'
),

(
'UnityServe Volunteers',
'A volunteer coordination group supporting local charities and service initiatives.',
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
'Projects that support education and learning.'
),

(
'Environment',
'Projects focused on environmental sustainability.'
),

(
'Community Service',
'Projects that improve local communities.'
);

-- =========================================
-- SAMPLE PROJECTS
-- =========================================

INSERT INTO project
(project_name, description, start_date, organization_id, category_id)
VALUES

(
'Community Learning Center',
'Construction of a community learning center for children.',
'2026-01-15',
1,
1
),

(
'Urban Garden Expansion',
'Expansion of community gardens to encourage sustainable farming.',
'2026-03-10',
2,
2
),

(
'Neighborhood Food Drive',
'Monthly food distribution program for vulnerable families.',
'2026-05-01',
3,
3
);