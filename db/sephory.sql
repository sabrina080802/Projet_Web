CREATE DATABASE sephory;

USE sephory;

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    gender BOOLEAN,
    country VARCHAR(100),
    postal_code INT UNSIGNED,
    city VARCHAR(100),
    address TEXT,
    phone VARCHAR(20)
)ENGINE=INNODB;

CREATE TABLE product_category(
    id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
)ENGINE=INNODB;

INSERT INTO product_category(name) VALUES('Foundation'), ('Skincare'), ('Blush'), ('Parfum'), ('Makeup');

CREATE TABLE product(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category SMALLINT UNSIGNED NOT NULL,
    price INT UNSIGNED NOT NULL,
    stock INT UNSIGNED NOT NULL,
    image TEXT,
    CONSTRAINT fk_product_category FOREIGN KEY(category) REFERENCES product_category(id)
)ENGINE=INNODB;

INSERT INTO product (name, description, category, price, stock, image) VALUES
    ("Huda Beauty Liquid Matte Lipstick", "A highly comfortable, long-wear liquid lipstick that dries matte with intense color.", 2, 2200, 15, "https://www.sephora.fr/dw/image/v2/BCVW_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dw10b54bca/images/hi-res/SKU/SKU_2212/543707_swatch.jpg?sw=585&sh=585&sm=fit"), 
    ("Charlotte Tilbury Magic Cream", "An award-winning moisturizer that provides a dewy, plumped look for youthful skin.", 3, 8500, 5, "https://www.sephora.fr/dw/image/v2/BCVW_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dwf9b9e010/images/hi-res/PID_principal/PID_principal_5386/P1000205640_principal.jpg?sw=585&sh=585&sm=fit"), 
    ("Too Faced Better Than Sex Mascara", "A volumizing mascara that gives you thick, full, and defined lashes.", 4, 2600, 20, "https://www.sephora.fr/dw/image/v2/BCVW_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dw99562578/images/hi-res/SKU/SKU_3376/275755_swatch.jpg?sw=585&sh=585&sm=fit"), 
    ("Tarte Shape Tape Concealer", "A vegan, full-coverage concealer that brightens and smooths for a flawless finish.", 1, 3000, 8, "https://www.sephora.fr/dw/image/v2/BCVW_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dw023e64c0/images/hi-res/SKU/SKU_672/451693_swatch.jpg?sw=585&sh=585&sm=fit"), 
    ("Anastasia Beverly Hills Brow Wiz", "An ultra-slim, retractable pencil for precise detailing and natural-looking brows.", 5, 2300, 12, "https://www.sephora.fr/dw/image/v2/BCVW_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dwfe1bdfc4/images/hi-res/SKU/SKU_2003/510785_swatch.jpg?sw=585&sh=585&sm=fit"), 
    ("Dior Addict Lip Glow", "A color reviver balm that reacts to the moisture level of your lips for a custom glow.", 2, 4200, 9, "https://www.sephora.fr/dw/image/v2/BCVW_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dwc09e87e8/images/hi-res/SKU/SKU_6220/749150_swatch.jpg?sw=585&sh=585&sm=fit"), 
    ("Clinique Take The Day Off Cleansing Balm", "A lightweight makeup remover that transforms from a balm to an oil.", 3, 3300, 7, "https://www.sephora.fr/dw/image/v2/BCVW_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dw07bb4378/images/hi-res/SKU/SKU_6120/450289_swatch.jpg?sw=585&sh=585&sm=fit"),
    ("Fenty Beauty Pro Filt'r Foundation", "A soft matte, long-wear foundation with buildable, medium-to-full coverage.", 1, 3400, 10, "https://www.sephora.fr/dw/image/v2/BCVW_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dwd74f690c/images/hi-res/SKU/SKU_5297/722102_swatch.jpg?sw=585&sh=585&sm=fit"),
    ("Rare Beauty Soft Pinch Liquid Blush", "A long-lasting liquid blush that blends and builds beautifully for a soft, healthy flush.", 3, 2000, 25, "https://www.sephora.fr/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dwc6692224/images/hi-res/SKU/SKU_2383/527974_swatch.jpg"),
    ("Dior Sauvage Eau de Toilette", "A fresh, spicy fragrance for men inspired by wide-open spaces and the wilderness.", 4, 12000, 15, "https://www.sephora.fr/dw/image/v2/BCVW_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dwb7fca1c2/images/hi-res/SKU/SKU_4/335956_swatch.jpg?sw=585&sh=585&sm=fit"),
    ("Laneige Lip Sleeping Mask", "A leave-on lip mask that soothes and moisturizes for smoother, more supple lips overnight.", 2, 2200, 30, "https://www.sephora.fr/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dwda24bbf5/images/hi-res/SKU/SKU_3928/615228_swatch.jpg"),
    ("Sephora Collection Eye Masks", "Hydrogel eye masks that de-puff, soothe, and hydrate the under-eye area.", 2, 500, 40, "https://www.sephora.fr/dw/image/v2/BCVW_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/default/dw6d71dc3b/images/hi-res/SKU/SKU_5211/693472_swatch.jpg?sw=585&sh=585&sm=fit");


CREATE TABLE basket_product(
    `user` INT UNSIGNED NOT NULL,
    product INT UNSIGNED NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    PRIMARY KEY(`user`, product),
    CONSTRAINT fk_basketprod_user FOREIGN KEY(`user`) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_basketprod_product FOREIGN KEY(product) REFERENCES product(id) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE=INNODB;

CREATE TABLE user_card(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user` INT UNSIGNED NOT NULL,
    card_owner VARCHAR(255) NOT NULL,
    card_number VARCHAR(255) NOT NULL,
    cvc VARCHAR(5) NOT NULL,
    expire_date DATE NOT NULL,
    CONSTRAINT fk_card_user FOREIGN KEY(`user`) REFERENCES `users`(id) ON UPDATE CASCADE ON DELETE CASCADE
)ENGINE=INNODB;