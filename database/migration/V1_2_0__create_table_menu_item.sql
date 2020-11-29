CREATE TABLE item_category_type (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE item_category (
  id INT UNSIGNED NOT NULL PRIMARY KEY,
  category_type_id INT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  FOREIGN KEY (category_type_id) REFERENCES item_category_type(id),
  UNIQUE (category_type_id, name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE menu_item (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  category_id INT UNSIGNED NOT NULL,
  name VARCHAR(30) NOT NULL UNIQUE,
  price INT UNSIGNED NOT NULL,
  FOREIGN KEY (category_id) REFERENCES item_category(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE course_item (
  item_id INT UNSIGNED NOT NULL,
  contents TEXT NOT NULL,
  FOREIGN KEY (item_id) REFERENCES menu_item(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 将来使う予定
CREATE TABLE item_price (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  item_id INT UNSIGNED NOT NULL,
  price INT UNSIGNED NOT NULL,
  from_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (item_id) REFERENCES menu_item(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;