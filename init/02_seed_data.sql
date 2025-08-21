-- Insert seed data for categories in a hierarchical structure
-- Note: We need to insert in order so parent categories exist before children

-- Level 1: Root categories
INSERT INTO categories (name, description, parent_id) VALUES
('Sports', 'All sports-related categories', NULL),
('Entertainment', 'Movies, TV shows, and entertainment content', NULL),
('Technology', 'Technology and software-related categories', NULL);

-- Level 2: Sub-categories under Sports
INSERT INTO categories (name, description, parent_id) VALUES
('Football', 'Association football (soccer)', (SELECT id FROM categories WHERE name = 'Sports')),
('Basketball', 'Professional and amateur basketball', (SELECT id FROM categories WHERE name = 'Sports'));

-- Level 2: Sub-categories under Entertainment  
INSERT INTO categories (name, description, parent_id) VALUES
('Movies', 'Film and cinema content', (SELECT id FROM categories WHERE name = 'Entertainment')),
('Music', 'Musical artists and genres', (SELECT id FROM categories WHERE name = 'Entertainment'));

-- Level 2: Sub-categories under Technology
INSERT INTO categories (name, description, parent_id) VALUES
('Programming', 'Software development and programming languages', (SELECT id FROM categories WHERE name = 'Technology')),
('Hardware', 'Computer hardware and components', (SELECT id FROM categories WHERE name = 'Technology'));

-- Level 3: Sub-categories under Football
INSERT INTO categories (name, description, parent_id) VALUES
('Premier League', 'English Premier League football', (SELECT id FROM categories WHERE name = 'Football')),
('Champions League', 'UEFA Champions League competition', (SELECT id FROM categories WHERE name = 'Football'));

-- Level 3: Sub-categories under Programming
INSERT INTO categories (name, description, parent_id) VALUES
('Web Development', 'Frontend and backend web development', (SELECT id FROM categories WHERE name = 'Programming')),
('Mobile Development', 'iOS and Android app development', (SELECT id FROM categories WHERE name = 'Programming'));

-- Display the hierarchical structure for verification
-- This query will show the tree structure with levels
CREATE OR REPLACE VIEW category_hierarchy AS
WITH RECURSIVE category_tree AS (
    -- Base case: root categories (no parent)
    SELECT 
        id,
        name,
        description,
        parent_id,
        0 as level,
        CAST(name AS TEXT) as path
    FROM categories 
    WHERE parent_id IS NULL
    
    UNION ALL
    
    -- Recursive case: children of current level
    SELECT 
        c.id,
        c.name,
        c.description,
        c.parent_id,
        ct.level + 1,
        ct.path || ' > ' || c.name as path
    FROM categories c
    JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT 
    REPEAT('  ', level) || name as indented_name,
    description,
    level,
    path
FROM category_tree
ORDER BY path;