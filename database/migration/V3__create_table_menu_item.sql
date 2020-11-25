CREATE TABLE item_category (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE item_subcategory (
  id INT UNSIGNED NOT NULL PRIMARY KEY,
  category_id INT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  FOREIGN KEY (category_id) REFERENCES item_category(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE menu_item (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  category_id INT UNSIGNED NOT NULL,
  subcategory_id INT UNSIGNED NOT NULL,
  name VARCHAR(30) NOT NULL UNIQUE,
  price INT UNSIGNED NOT NULL,
  FOREIGN KEY (category_id) REFERENCES item_category(id),
  FOREIGN KEY (subcategory_id) REFERENCES item_subcategory(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO item_category (id, name) VALUES (1, "フード");
INSERT INTO item_category (id, name) VALUES (2, "ドリンク");

INSERT INTO item_subcategory (id, category_id, name) VALUES (11, 1, "サラダ");
INSERT INTO item_subcategory (id, category_id, name) VALUES (12, 1, "肴");
INSERT INTO item_subcategory (id, category_id, name) VALUES (13, 1, "一品");
INSERT INTO item_subcategory (id, category_id, name) VALUES (14, 1, "御飯もの");
INSERT INTO item_subcategory (id, category_id, name) VALUES (15, 1, "水物");
INSERT INTO item_subcategory (id, category_id, name) VALUES (99, 1, "その他");

INSERT INTO item_subcategory (id, category_id, name) VALUES (101, 2, "ビール");
INSERT INTO item_subcategory (id, category_id, name) VALUES (102, 2, "ウィスキー");
INSERT INTO item_subcategory (id, category_id, name) VALUES (103, 2, "ソフトドリンク");
INSERT INTO item_subcategory (id, category_id, name) VALUES (104, 2, "日本酒");
INSERT INTO item_subcategory (id, category_id, name) VALUES (105, 2, "焼酎");
INSERT INTO item_subcategory (id, category_id, name) VALUES (106, 2, "梅酒");
INSERT INTO item_subcategory (id, category_id, name) VALUES (107, 2, "果実酒");
INSERT INTO item_subcategory (id, category_id, name) VALUES (108, 2, "ワイン");
INSERT INTO item_subcategory (id, category_id, name) VALUES (999, 2, "その他");

INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 11, "旬野菜の彩りサラダ オレンジドレッシング", 850);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 11, "水菜とくみあげゆばのサラダ オリジナル和風ドレッシング", 900);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 11, "スモークサーモンとアボカドのシーザーサラダ", 950);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 12, "鶏そぼろ奴っこ", 600);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 12, "くみ上げ湯葉", 650);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 12, "鯛のからすみ和え", 800);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 12, "ほたるいかの沖漬け", 650);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 12, "さばへしこ", 600);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 12, "京漬物の盛り合わせ", 650);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 12, "チャンジャクリームチーズ", 700);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 13, "生麩とベーコンの九条葱バター醤油焼き", 950);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 13, "生麩の揚げ出し", 700);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 13, "エビのマヨネーズソース", 900);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 13, "京赤地鶏の塩焼き", 1200);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 13, "鴨肉黒七味焼き", 1500);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 13, "和牛レアステーキ", 2400);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 14, "ぶぶ漬け 鮭", 600);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 14, "ぶぶ漬け 梅", 500);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 14, "ぶぶ漬け 明太子", 700);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 14, "ぶぶ漬け ちりめん山椒", 650);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 14, "京風湯葉あんかけにゅうめん", 800);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 14, "あぶり鯖寿司(4カン)", 1200);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 14, "赤出汁", 400);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 15, "ほうじ茶プリン", 500);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 15, "抹茶アイス", 450);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 15, "黒ごまアイス", 450);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (1, 99, "付き出し", 600);

INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 101, "生ビール(キリン一番絞り) <中>", 700);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 101, "瓶ビール(クラシックラガー)", 700);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 101, "キリン零ICHI(ノンアルコール)", 600);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 102, "シーバスリーガル", 850);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 102, "山崎", 900);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 103, "黒烏龍茶", 550);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 103, "コカコーラ", 450);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 103, "ジンジャエール(甘口)", 450);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 103, "ジンジャエール(辛口)", 450);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 103, "オレンジジュース", 450);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 103, "グレープフルーツジュース", 450);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 103, "梅ジュース(水割り)", 450);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 103, "梅ジュース(ソーダ割り)", 450);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 103, "マンゴジュース", 450);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 103, "緑茶(玉露)", 450);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 104, "京まんざら(京都)純米酒", 800);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 104, "伯楽星(宮城)純米酒吟醸", 1000);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 105, "井田萬力(大分)", 700);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 105, "井田萬力(大分) 四合瓶", 4500);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 105, "兼八(宮崎)", 700);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 105, "兼八(宮崎) 四合瓶", 4800);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 105, "百年の孤独", 1000);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 105, "八海山(新潟)", 700);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 105, "㐂六(鹿児島)", 700);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 105, "㐂六(鹿児島) 四合瓶", 4500);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 105, "富乃宝山(鹿児島)", 700);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 105, "富乃宝山(鹿児島) 四合瓶", 4800);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 105, "朝日(鹿児島)", 700);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 106, "七年熟成梅酒青谷の梅(京都)", 700);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 106, "あらごし梅酒(奈良)", 750);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 106, "うぐいすとまり鶯とろ(福岡)", 750);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 107, "ゆず酒", 700);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 107, "みかん", 700);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 107, "シークァーサー", 700);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 108, "モエ・エ・シャンドン <full>", 9800);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 108, "ブリュット・アンペリアル <half>", 6000);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 108, "リースリング", 5000);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 108, "ミュスカデ・セーヴル・メーヌ シュール・リー", 5500);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 108, "シャブリ", 6300);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 108, "ヴィーニ・ヴェルト・ルージュ", 5000);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 108, "ドメーヌ・ド・ラ・ガランス キュヴェ・風(KAZE)ルージュ", 6000);
INSERT INTO menu_item (category_id, subcategory_id, name, price) VALUES (2, 108, "レ ザルミエール", 8500);
