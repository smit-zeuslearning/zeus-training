-- -----------------------------------------------------
-- Database walkin_portal
-- -----------------------------------------------------
DROP DATABASE IF EXISTS walkin_portal;
CREATE DATABASE walkin_portal;
USE walkin_portal;

-- -----------------------------------------------------
-- Table contact_number
-- -----------------------------------------------------
CREATE TABLE contact_number (
	id INT AUTO_INCREMENT,
    country_code INT NOT NULL,
    phone_number INT NOT NULL,
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

-- -----------------------------------------------------
-- Table preferred_job_role
-- -----------------------------------------------------
CREATE TABLE preferred_job_role(
	id INT AUTO_INCREMENT,
    instructional_designer BOOLEAN DEFAULT FALSE,
    software_enginner BOOLEAN DEFAULT FALSE,
    software_quality_engineer BOOLEAN DEFAULT FALSE,
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

-- -----------------------------------------------------
-- Table education
-- -----------------------------------------------------
CREATE TABLE education(
	id INT AUTO_INCREMENT,
    aggregate_percentage INT NOT NULL,
    passing_year INT NOT NULL,
    qualification VARCHAR(255) NOT NULL,
    education_stream VARCHAR(255) NOT NULL,
    college_name VARCHAR(255) NOT NULL,
    college_location VARCHAR(255) NOT NULL,
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

-- -----------------------------------------------------
-- Table expertised_technologies
-- -----------------------------------------------------
CREATE TABLE expertised_technologies (
	id INT AUTO_INCREMENT,
    javascript BOOLEAN default false,
    angularjs BOOLEAN default false,
    reactjs BOOLEAN default false,
    nodejs BOOLEAN default false,
    other VARCHAR(50) default 'N/A',
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

-- -----------------------------------------------------
-- Table famalier_technologies
-- -----------------------------------------------------
CREATE TABLE famalier_technologies (
	id INT AUTO_INCREMENT NOT NULL,
    javascript BOOLEAN default false,
    angularjs BOOLEAN default false,
    reactjs BOOLEAN default false,
    nodejs BOOLEAN default false,
    other VARCHAR(50) default 'N/A',
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

-- -----------------------------------------------------
-- Table professional_qualification
-- -----------------------------------------------------
CREATE TABLE professional_qualification(
	id INT AUTO_INCREMENT,
    application_type VARCHAR(50) NOT NULL,
    total_experience INT NOT NULL,
    on_ontice_period BOOLEAN NOT NULL,
    last_working_date DATE NOT NULL,
    termination_notice_months INT NOT NULL,
    zeus_test_last_12months BOOLEAN NOT NULL,
    appled_rold_last_12months VARCHAR(50) DEFAULT 'N/A',
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    expertised_technologies_id INT NOT NULL,
    famalier_technologies_id INT NOT NULL,
    
    PRIMARY KEY (id),
    FOREIGN KEY (expertised_technologies_id) REFERENCES expertised_technologies(id),
    FOREIGN KEY (famalier_technologies_id) REFERENCES famalier_technologies(id)
);

-- -----------------------------------------------------
-- Table users
-- -----------------------------------------------------
CREATE table users (
    id INT AUTO_INCREMENT,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    resume BLOB NOT NULL,
    display_picture BLOB,
    portfolio_url varchar(255),
    get_job_update BOOLEAN default false,
    password VARCHAR(50) NOT NULL,
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    contact_id INT NOT NULL,
    preferred_job_id INT NOT NULL,
    education_id INT NOT NULL,
    professional_qualification_id INT NOT NULL,
    
    PRIMARY KEY(id),
    FOREIGN KEY (contact_id) REFERENCES contact_number(id),
    FOREIGN KEY (preferred_job_id) REFERENCES preferred_job_role(id),
    FOREIGN KEY (education_id) REFERENCES education(id),
    FOREIGN KEY (professional_qualification_id) REFERENCES professional_qualification(id)
);

-- -----------------------------------------------------
-- Table job_role_description
-- -----------------------------------------------------
CREATE TABLE job_role_description(
    id INT AUTO_INCREMENT NOT NULL,
    gross_package INT NOT NULL,
    role_description TEXT NOT NULL,
    requirements TEXT NOT NULL,
    PRIMARY KEY(id)
);

-- -----------------------------------------------------
-- Table address
-- -----------------------------------------------------
CREATE TABLE address(
    id INT AUTO_INCREMENT NOT NULL,
    house_no VARCHAR(255) NOT NULL,
    apartment VARCHAR(255) NOT NULL,
    landmark VARCHAR(255) default 'N/A',
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    zipcode INT NOT NULL,
    PRIMARY KEY(id)
);

-- -----------------------------------------------------
-- Table job_post
-- -----------------------------------------------------
CREATE TABLE job_post(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(100) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    address_id INT NOT NULL,
    instructional_design_description_id INT NOT NULL,
    software_engineer_description_id INT NOT NULL,
    software_quality_engineer_desription_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (address_id) REFERENCES address(id),
    FOREIGN KEY (instructional_design_description_id) REFERENCES job_role_description(id),
    FOREIGN KEY (software_engineer_description_id) REFERENCES job_role_description(id),
    FOREIGN KEY (software_quality_engineer_desription_id) REFERENCES job_role_description(id)
);

-- -----------------------------------------------------
-- Table time_slots
-- -----------------------------------------------------
CREATE TABLE time_slots(
    id INT AUTO_INCREMENT NOT NULL,
    start_time VARCHAR(30),
    end_time VARCHAR(30),
    job_post_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (job_post_id) REFERENCES job_post(id)
);

-- -----------------------------------------------------
-- Table job_application
-- -----------------------------------------------------
CREATE TABLE job_application(
    id INT AUTO_INCREMENT NOT NULL,
    updated_resume BLOB NOT NULL,
    selected_time_slot_id INT NOT NULL,
    selected_preference_id INT NOT NULL,
    users_id INT NOT NULL,
    job_post_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (selected_preference_id) REFERENCES preferred_job_role(id),
    FOREIGN KEY (users_id) REFERENCES users(id),
    FOREIGN KEY (job_post_id) REFERENCES job_post(id),
    FOREIGN KEY (selected_time_slot_id) REFERENCES time_slots(id)
);