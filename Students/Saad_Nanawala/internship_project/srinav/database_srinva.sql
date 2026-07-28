USE cricket_db;
DROP TABLE IF EXISTS players;

CREATE TABLE players (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    matches INT DEFAULT 0,
    runs INT DEFAULT 0,
    wickets INT DEFAULT 0
);

INSERT INTO players (name, role, matches, runs, wickets) VALUES 
('Virat Kohli', 'Batsman', 292, 13848, 4),
('Jasprit Bumrah', 'Bowler', 89, 85, 149);