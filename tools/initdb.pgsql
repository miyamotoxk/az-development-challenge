-- Drops actions table
DROP TABLE IF EXISTS actions;

-- Creates actions table
CREATE TABLE IF NOT EXISTS actions (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    , action varchar(50) NOT NULL
);