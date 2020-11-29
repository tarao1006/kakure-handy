CREATE TABLE staff (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  firebase_uid VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  display_name VARCHAR(255), 
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY (firebase_uid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;