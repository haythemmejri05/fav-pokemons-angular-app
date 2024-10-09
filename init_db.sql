-- Create the pokemon_types table
CREATE TABLE pokemon_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE
);

-- Fill out the pokemon_type table with dummy data
INSERT INTO "public"."pokemon_types" ("id", "name") VALUES
('4ce536a7-5f83-4e7c-8c72-c0c894ed568b', 'water'),
('835cbe18-976d-42e3-8666-6b58f5d216d0', 'fire'),
('ea34c055-6f88-4753-bc42-bf8ca19837e1', 'grass');

-- Create the pokemons table
CREATE TABLE pokemons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    type UUID REFERENCES pokemon_types(id) ON DELETE CASCADE,
    image TEXT,
    power INT CHECK (power BETWEEN 10 AND 100),
    life INT CHECK (life BETWEEN 50 AND 100)
);

-- Fill out the pokemons table with dummy data
INSERT INTO "public"."pokemons" ("id", "name", "type", "image", "power", "life") VALUES
('0153c056-cd59-4206-a802-831517efbe23', 'Golduck', '4ce536a7-5f83-4e7c-8c72-c0c894ed568b', 'https://img.pokemondb.net/artwork/avif/golduck.avif', '30', '80'),
('06c919ae-56d9-4f11-8f62-e6208b120c38', 'Psyduck', '4ce536a7-5f83-4e7c-8c72-c0c894ed568b', 'https://img.pokemondb.net/artwork/avif/psyduck.avif', '24', '50'),
('0d9da8d1-c9e3-4754-b5a9-3a4cf6954242', 'Charmeleon', '835cbe18-976d-42e3-8666-6b58f5d216d0', 'https://img.pokemondb.net/artwork/avif/charmeleon.avif', '16', '59'),
('1db5421d-df5a-443f-8ab7-10355d57e63d', 'Venusaur', 'ea34c055-6f88-4753-bc42-bf8ca19837e1', 'https://img.pokemondb.net/artwork/avif/venusaur.avif', '50', '80'),
('38c6cace-870e-4680-b46b-beb14ceb8565', 'Charizard', '835cbe18-976d-42e3-8666-6b58f5d216d0', 'https://img.pokemondb.net/artwork/avif/charizard.avif', '13', '77'),
('3ffe8f7f-cc77-4bdc-8892-be763736d3d5', 'Blastoise', '4ce536a7-5f83-4e7c-8c72-c0c894ed568b', 'https://img.pokemondb.net/artwork/avif/blastoise.avif', '17', '79'),
('589842e0-ec53-495c-96f1-6d1c62090af6', 'Ninetales', '835cbe18-976d-42e3-8666-6b58f5d216d0', 'https://img.pokemondb.net/artwork/avif/ninetales.avif', '28', '73'),
('5c5847f2-bc26-478c-aa54-c916ca932853', 'Wartortle', '4ce536a7-5f83-4e7c-8c72-c0c894ed568b', 'https://img.pokemondb.net/artwork/avif/wartortle.avif', '30', '59'),
('62457fcb-2e6f-4d38-9f29-8b1195ca0b4a', 'Charmander', '835cbe18-976d-42e3-8666-6b58f5d216d0', 'https://img.pokemondb.net/artwork/avif/charmander.avif', '35', '59'),
('6cba0e86-7e4d-4a29-a792-16b684d2fe08', 'Ivysaur', 'ea34c055-6f88-4753-bc42-bf8ca19837e1', 'https://img.pokemondb.net/artwork/avif/ivysaur.avif', '15', '60'),
('7059cbb9-70af-4ece-b32d-41ff0fc90232', 'Vulpix', '835cbe18-976d-42e3-8666-6b58f5d216d0', 'https://img.pokemondb.net/artwork/avif/vulpix.avif', '23', '58'),
('88204e14-c839-46b2-8d1c-ae354a84a1a5', 'Gloom', 'ea34c055-6f88-4753-bc42-bf8ca19837e1', 'https://img.pokemondb.net/artwork/avif/gloom.avif', '31', '60'),
('aa6902c4-0f3a-4003-928e-7063426b5049', 'Oddish', 'ea34c055-6f88-4753-bc42-bf8ca19837e1', 'https://img.pokemondb.net/artwork/avif/oddish.avif', '22', '55'),
('c42fc9d5-5f94-436c-947c-6fa716d809e4', 'Bulbasaur', '4ce536a7-5f83-4e7c-8c72-c0c894ed568b', 'https://img.pokemondb.net/artwork/avif/bulbasaur.avif', '11', '55'),
('fbb6bb8a-9519-4803-ae28-bdee9b7baa29', 'Squirtle', '4ce536a7-5f83-4e7c-8c72-c0c894ed568b', 'https://img.pokemondb.net/artwork/avif/squirtle.avif', '19', '54');

-- Create the users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

-- Fill out the users table with dummy data
INSERT INTO "public"."users" ("id", "email", "password_hash") VALUES
('1a479461-a6fc-4a7d-acee-4451997a7ed7', 'john.doe@gmail.com', '$2b$10$20ifXh59RLPRoOB3Z2GkquDdLJdWuWZqvEaWoFWhFtPIy9g88UAGu'),
('21bd790e-024f-4bf7-b1fa-0246ec8d3dec', 'haythemmejri05@gmail.com', '$2b$10$20ifXh59RLPRoOB3Z2GkquDdLJdWuWZqvEaWoFWhFtPIy9g88UAGu'),
('eed354cf-ce01-40f6-bb25-0d2fdd1a5155', 'jane.doe@gmail.com', '$2b$10$20ifXh59RLPRoOB3Z2GkquDdLJdWuWZqvEaWoFWhFtPIy9g88UAGu');

-- Create the teams table
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	name TEXT NOT NULL UNIQUE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    pokemon1 UUID NOT NULL REFERENCES pokemons(id),
    pokemon2 UUID NOT NULL REFERENCES pokemons(id),
    pokemon3 UUID NOT NULL REFERENCES pokemons(id),
    pokemon4 UUID NOT NULL REFERENCES pokemons(id),
    pokemon5 UUID NOT NULL REFERENCES pokemons(id),
    pokemon6 UUID NOT NULL REFERENCES pokemons(id)
);

-- Fill out the teams table with dummy data
INSERT INTO "public"."teams" ("id", "name", "user_id", "pokemon1", "pokemon2", "pokemon3", "pokemon4", "pokemon5", "pokemon6") VALUES
('66ebd10f-2c64-4cbb-9738-0a2ad1711f04', 'Safari', 'eed354cf-ce01-40f6-bb25-0d2fdd1a5155', '7059cbb9-70af-4ece-b32d-41ff0fc90232', '62457fcb-2e6f-4d38-9f29-8b1195ca0b4a', '589842e0-ec53-495c-96f1-6d1c62090af6', '0d9da8d1-c9e3-4754-b5a9-3a4cf6954242', '38c6cace-870e-4680-b46b-beb14ceb8565', '06c919ae-56d9-4f11-8f62-e6208b120c38'),
('cc5d5c29-8fe1-46f3-96ab-7fba6bb4977b', 'Titans', '21bd790e-024f-4bf7-b1fa-0246ec8d3dec', '0d9da8d1-c9e3-4754-b5a9-3a4cf6954242', '38c6cace-870e-4680-b46b-beb14ceb8565', '589842e0-ec53-495c-96f1-6d1c62090af6', '5c5847f2-bc26-478c-aa54-c916ca932853', '3ffe8f7f-cc77-4bdc-8892-be763736d3d5', '06c919ae-56d9-4f11-8f62-e6208b120c38'),
('f29d5ced-2533-49ce-a070-a4a517b314cd', 'Infinite Loop', '1a479461-a6fc-4a7d-acee-4451997a7ed7', '0153c056-cd59-4206-a802-831517efbe23', '6cba0e86-7e4d-4a29-a792-16b684d2fe08', '1db5421d-df5a-443f-8ab7-10355d57e63d', '88204e14-c839-46b2-8d1c-ae354a84a1a5', 'fbb6bb8a-9519-4803-ae28-bdee9b7baa29', 'c42fc9d5-5f94-436c-947c-6fa716d809e4');

-- Create the weakness table
CREATE TABLE weakness (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type1 UUID REFERENCES pokemon_typeS(id) ON DELETE CASCADE,
    type2 UUID REFERENCES pokemon_typeS(id) ON DELETE CASCADE,
    factor FLOAT CHECK (factor > 0),
    UNIQUE (type1, type2)
);

-- Fill out the weakness table with dummy data
INSERT INTO "public"."weakness" ("type1", "type2", "factor", "id") VALUES
('ea34c055-6f88-4753-bc42-bf8ca19837e1', 'ea34c055-6f88-4753-bc42-bf8ca19837e1', '1', '1205d51c-00d3-4844-a0b4-23b71c45c907'),
('ea34c055-6f88-4753-bc42-bf8ca19837e1', '4ce536a7-5f83-4e7c-8c72-c0c894ed568b', '2', '29758391-1135-406c-909d-a01d69f18502'),
('835cbe18-976d-42e3-8666-6b58f5d216d0', '835cbe18-976d-42e3-8666-6b58f5d216d0', '1', '509575a4-a005-4ad0-9078-499a11572947'),
('4ce536a7-5f83-4e7c-8c72-c0c894ed568b', 'ea34c055-6f88-4753-bc42-bf8ca19837e1', '0.5', '87f55284-eda5-48cb-82dd-937d9494ee1a'),
('4ce536a7-5f83-4e7c-8c72-c0c894ed568b', '835cbe18-976d-42e3-8666-6b58f5d216d0', '2', '977ee28f-1545-42db-8b21-3e7d51ea9c36'),
('4ce536a7-5f83-4e7c-8c72-c0c894ed568b', '4ce536a7-5f83-4e7c-8c72-c0c894ed568b', '1', 'a6e6b4e9-80e1-430d-b965-f3a994d9e505'),
('835cbe18-976d-42e3-8666-6b58f5d216d0', '4ce536a7-5f83-4e7c-8c72-c0c894ed568b', '0.5', 'b198218f-d9fa-412e-81ff-261668f1f773'),
('ea34c055-6f88-4753-bc42-bf8ca19837e1', '835cbe18-976d-42e3-8666-6b58f5d216d0', '0.5', 'c55187b0-98b9-4d62-a5ee-dfe15e2e9541'),
('835cbe18-976d-42e3-8666-6b58f5d216d0', 'ea34c055-6f88-4753-bc42-bf8ca19837e1', '2', 'f5f65368-c144-48aa-9b62-dff5ecf28b38');

-- get_teams_ordered_by_power function
CREATE OR REPLACE FUNCTION get_teams_ordered_by_power()
RETURNS TABLE(team_id UUID, user_id UUID, total_power BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT
        t.id AS team_id,
        t.user_id,
        COALESCE(SUM(p.power), 0)::BIGINT AS total_power
    FROM
        teams t
    LEFT JOIN
        pokemons p ON p.id IN (t.pokemon1, t.pokemon2, t.pokemon3, t.pokemon4, t.pokemon5, t.pokemon6)
    GROUP BY
        t.id, t.user_id
    ORDER BY
        total_power DESC;
END;
$$ LANGUAGE plpgsql;

-- insert_team function
CREATE OR REPLACE FUNCTION insert_team(
    user_id UUID,
	name TEXT,
    p1 UUID,
    p2 UUID,
    p3 UUID,
    p4 UUID,
    p5 UUID,
    p6 UUID
) RETURNS VOID AS $$
BEGIN
    INSERT INTO teams (user_id, pokemon1, pokemon2, pokemon3, pokemon4, pokemon5, pokemon6)
    VALUES (user_id, p1, p2, p3, p4, p5, p6);
END;
$$ LANGUAGE plpgsql;
