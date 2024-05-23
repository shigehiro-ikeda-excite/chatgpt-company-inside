-- 初期投入テーブル作成

USE app;

CREATE TABLE IF NOT EXISTS test_table (
  id INT NOT NULL AUTO_INCREMENT,
  test_message VARCHAR(1024) NOT NULL DEFAULT '',
  PRIMARY KEY (id)
);

INSERT INTO test_table (test_message) VALUES ('test_message');