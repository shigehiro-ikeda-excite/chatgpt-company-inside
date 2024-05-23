-- アプリ用データベース作成
CREATE DATABASE IF NOT EXISTS app;

-- アプリ用データベースのユーザー作成
CREATE USER IF NOT EXISTS `appuser`@`%` IDENTIFIED BY 'LtbPJLRDA7vixT5n';
GRANT ALL PRIVILEGES ON app.* TO `appuser`@`%`;
FLUSH PRIVILEGES;
