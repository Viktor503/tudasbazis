const script = [

"DROP TABLE Hibajelentes",
"DROP TABLE Lektornyelv",
"DROP TABLE Kulcsszokapcsolat",
"DROP TABLE Kulcsszo",
"DROP TABLE Nyelvkapcsolat",
"DROP TABLE Nyelv",
"DROP TABLE Cikk",
"DROP TABLE Felhasznalo",
"DROP TABLE Lektor",

"CREATE TABLE Lektor (azon INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL, fokozat VARCHAR2(256) NOT NULL, intezet VARCHAR2(256) NOT NULL, szakterulet VARCHAR2(256) NOT NULL)",

"CREATE TABLE Felhasznalo (azon INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL, nev VARCHAR2(256) NOT NULL, jelszo VARCHAR2(256) NOT NULL, admin NUMBER(1) DEFAULT 0 NOT NULL, lektorAzon INTEGER DEFAULT NULL, CONSTRAINT felhasznalo_lektor_fk FOREIGN KEY (lektorAzon) REFERENCES Lektor(azon) ON DELETE SET NULL)",

"CREATE TABLE Cikk (azon INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL, cim VARCHAR2(256) NOT NULL, szerzoAzon INTEGER NOT NULL, lektorAzon INTEGER DEFAULT NULL, allapot INTEGER DEFAULT 0, modositasokSzama INTEGER DEFAULT 0, tartalom CLOB DEFAULT NULL, CONSTRAINT cikk_szerzo_fk FOREIGN KEY (szerzoAzon) REFERENCES Felhasznalo(azon) ON DELETE CASCADE, CONSTRAINT cikk_lektor_fk FOREIGN KEY (lektorAzon) REFERENCES Lektor(azon) ON DELETE SET NULL)",

"CREATE TABLE Nyelv (azon INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL, nyelv VARCHAR2(256) NOT NULL)",

"CREATE TABLE Nyelvkapcsolat (cikkAzon INTEGER NOT NULL, eredetiCikkAzon INTEGER DEFAULT NULL, nyelvAzon INTEGER NOT NULL, CONSTRAINT nyelvkapcsolat_cikk_fk FOREIGN KEY (cikkAzon) REFERENCES Cikk(azon) ON DELETE CASCADE, CONSTRAINT nyelvkapcsolat_eredeticikk_fk FOREIGN KEY (eredetiCikkAzon) REFERENCES Cikk(azon) ON DELETE SET NULL, CONSTRAINT nyelvkapcsolat_nyelv_fk FOREIGN KEY (nyelvAzon) REFERENCES Nyelv(azon) ON DELETE CASCADE)",

"CREATE TABLE Kulcsszo (azon INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL, kulcsszo VARCHAR2(256) NOT NULL)",

"CREATE TABLE Kulcsszokapcsolat (cikkAzon INTEGER NOT NULL, kulcsszoAzon INTEGER NOT NULL, CONSTRAINT kulcsszokapcsolat_cikk_fk FOREIGN KEY (cikkAzon) REFERENCES Cikk(azon) ON DELETE CASCADE, CONSTRAINT kulcsszokapcsolat_kulcsszo_fk FOREIGN KEY (kulcsszoAzon) REFERENCES Kulcsszo(azon) ON DELETE CASCADE, PRIMARY KEY (cikkAzon, kulcsszoAzon))",

"CREATE TABLE Lektornyelv (lektorAzon INTEGER NOT NULL, nyelvAzon INTEGER NOT NULL, nyelvSzint INTEGER DEFAULT 0 NOT NULL, CONSTRAINT lektornyelv_lektor_fk FOREIGN KEY (lektorAzon) REFERENCES Lektor(azon) ON DELETE CASCADE, CONSTRAINT lektornyelv_nyelv_fk FOREIGN KEY (nyelvAzon) REFERENCES Nyelv(azon) ON DELETE CASCADE, PRIMARY KEY (lektorAzon, nyelvAzon))",

"CREATE TABLE Hibajelentes (azon INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL, bejelento INTEGER NOT NULL, cikkAzon INTEGER NOT NULL, aktiv NUMBER(1) DEFAULT 1 NOT NULL, datum TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, tartalom CLOB NOT NULL, CONSTRAINT hibajelentes_bejelento_fk FOREIGN KEY (bejelento) REFERENCES Felhasznalo(azon) ON DELETE SET NULL, CONSTRAINT hibajelentes_cikk_fk FOREIGN KEY (cikkAzon) REFERENCES Cikk(azon) ON DELETE CASCADE)",


"INSERT INTO Lektor (fokozat, intezet, szakterulet) VALUES ('BSc', 'Eötvös Loránd Tudományegyetem', 'Informatika')",
"INSERT INTO Lektor (fokozat, intezet, szakterulet) VALUES ('MSc', 'Budapesti Műszaki és Gazdaságtudományi Egyetem', 'Mérnökinformatika')",
"INSERT INTO Lektor (fokozat, intezet, szakterulet) VALUES ('PhD', 'Debreceni Egyetem', 'Fizika')",
"INSERT INTO Lektor (fokozat, intezet, szakterulet) VALUES ('BSc', 'Szegedi Tudományegyetem', 'Matematika')",
"INSERT INTO Lektor (fokozat, intezet, szakterulet) VALUES ('MSc', 'Eötvös Loránd Tudományegyetem', 'Biológia')",
"INSERT INTO Lektor (fokozat, intezet, szakterulet) VALUES ('PhD', 'Semmelweis Egyetem', 'Orvosi Informatika')",
"INSERT INTO Lektor (fokozat, intezet, szakterulet) VALUES ('BSc', 'Pécsi Tudományegyetem', 'Kémia')",
"INSERT INTO Lektor (fokozat, intezet, szakterulet) VALUES ('MSc', 'Budapesti Corvinus Egyetem', 'Gazdaságinformatika')",
"INSERT INTO Lektor (fokozat, intezet, szakterulet) VALUES ('PhD', 'Debreceni Egyetem', 'Biokémia')",
"INSERT INTO Lektor (fokozat, intezet, szakterulet) VALUES ('BSc', 'Szegedi Tudományegyetem', 'Földrajz')",
"INSERT INTO Lektor (fokozat, intezet, szakterulet) VALUES ('MSc', 'Eötvös Loránd Tudományegyetem', 'Pszichológia')",
"INSERT INTO Lektor (fokozat, intezet, szakterulet) VALUES ('PhD', 'Szegedi Tudományegyetem', 'Környezettudomány')",
"INSERT INTO Lektor (fokozat, intezet, szakterulet) VALUES ('BSc', 'Budapesti Műszaki és Gazdaságtudományi Egyetem', 'Gépészmérnöki Informatika')",
"INSERT INTO Lektor (fokozat, intezet, szakterulet) VALUES ('MSc', 'Pécsi Tudományegyetem', 'Néprajz')",
"INSERT INTO Lektor (fokozat, intezet, szakterulet) VALUES ('PhD', 'Eötvös Loránd Tudományegyetem', 'Történelem')",


"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('janos.kovacs123', '9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684', 1, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('eszter.kiss567', '6eea9b7ef19179a06954ed7c73c8b3b8b6d004f8', 0, 1)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('peter.nagy.789', '1e3b3258bfa358e6750bc59f794eb566045e8a28', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('marta.tamas_456', '5f4dcc3b5aa765d61d8327deb882cf99', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('gabor.varadi890', '098f6bcd4621d373cade4e832627b4f6', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('zoltan.balogh123', '5d41402abc4b2a76b9719d911017c592', 0, 2)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('anna.szabo_456', '1f3870be274f6c49b3e31a0c6728957f', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('ferenc.kovacs789', 'b6d767d2f8ed5d21a44b0e5886680cb9', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('dora.balogh123', '37693cfc748049e45d87b8c7d8b9aacd', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('istvan.nemet567', '1ff1de774005f8da13f42943881c655f', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('mariann.nagy.789', 'b3ba2c5aa7825e7c99049a35e3ab39a9', 0, 3)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('adam.toth_456', '5e884898da28047151d0e56f8dc6292f', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('zsuzsa.balla890', '90b43d05c97c8e13bae57f0778800fd1', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('sandor.varga123', '841b143c8ec550d6a2d9b247b57dd036', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('szilvia.takacs567', '69c885bcf2f76e55dcfa105ce3fda94a', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('istvan.kis.789', '1b6453892473a467d07372d45eb05abc', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('katalin.fekete_456', '48a24b4c6ff0e0ee088ebb9d9a3f8e71', 0, 4)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('ferenc.szabo890', '24cb18fd6d3e4195f01b64beba092e50', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('erika.balogh123', 'c16a5320fa475530d9583c34fd356ef5', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('attila.szabo567', 'c20ad4d76fe97759aa27a0c99bff6710', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('eva.kiss.789', '25d55ad283aa400af464c76d713c07ad', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('tamas.kovacs_456', '1679091c5a880faf6fb5e6087eb1b2dc', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('anna.nagy890', '8fa14cdd754f91cc6554c9e71929cce7', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('istvan.balla123', 'c9f0f895fb98ab9159f51fd0297e236d', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('zsofia.szabo567', '45c48cce2e2d7fbdea1afc51c7c6ad26', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('istvan.toth.789', 'd3d9446802a44259755d38e6d163e820', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('emese.szucs_456', '6512bd43d9caa6e02c990b0a82652dca', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('peter.balogh890', 'c20ad4d76fe97759aa27a0c99bff6710', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('katalin.biro123', 'c51ce410c124a10e0db5e4b97fc2af39', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('attila.kovacs567', 'c74d97b01eae257e44aa9d5bade97baf', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('beatrix.kiss.789', '70efdf2ec9b086079795c442636b55fb', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('gyorgy.kiss_456', '57ceeff350a5a421fbbef8e6182248ad', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('agnes.nagy890', 'b5f1dded844817dd07e01757e04a89d1', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('laszlo.kovacs123', 'd3b07384d113edec49eaa6238ad5ff00', 0, 5)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('eszter.szekely567', '063aa419091320ae7ad5fdfc4eccb185', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('gabor.takacs.789', '0cc175b9c0f1b6a831c399e269772661', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('agnes.balla_456', 'f7177163c833dff4b38fc8d2872f1ec6', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('andras.szabo890', 'eae8bd71199a1ee2ee08b0106ce25183', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('anna.kovacs123', '0183db340d55dbb7d1d1b39c2ce25e4d', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('istvan.nagy567', '014f366350abb4ebc6c0bf3fc72561f3', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('agnes.kovacs.789', '984816fd2e2ebcdfbf25b44234c7d1db', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('sandor.nagy_456', 'e3f4e3c03b6d91b4dfb6a26d3aeeb3a5', 0, 6)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('tunde.szabo890', '8d43a322c7c9ad8ad45b44d88bc767d9', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('attila.nagy123', '73feffa4b7f6bb68e44cf984c85f6e88', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('maria.biro567', 'b7c5b0914ed7600db3c10a1e3c79ab8f', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('laszlo.takacs.789', '17e62166fc8586dfa4d1bc0e1742c08b', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('tunde.kovacs_456', 'f1290186a5d0b1ceab27f4e77c0c5d68', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('peter.szabo890', '7a15c4966b0277bebe28553e47bf4899', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('eszter.kis123', '946f6b122a480e1b43a3229ad8ad45b4', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('laszlo.takacs567', '1dcca23355272056f04fe8bf20edfce0', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('zsofia.szekely.789', 'eedac317c3fcdc0c07042a5b24cf2c86', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('andras.balogh_456', '19ca14e7ea6328a42e0eb13d585e4c22', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('anna.szabo890', 'a3f390d88e4c41f2747bfa2f1b5f87db', 0, 7)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('zsolt.szabo123', '4e732ced3463d06de0ca9a15b6153677', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('eszter.nagy567', '02e74f10e0327ad868d138f2b4fdd6f0', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('peter.fekete.789', '33e75ff09dd601bbe69f351039152189', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('agnes.kovacs_456', 'a1d0c6e83f027327d8461063f4ac58a6', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('laszlo.toth890', 'd1fe173d7e2c80d0d9b457aefae4c8bd', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('tunde.balla123', '38dfa22bacc39b8e8efc7cd855ebcfbf', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('attila.biro567', 'fbade9e36a3f36d3d676c1b808451dd7', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('anna.szabo.789', '254e7bf1c98e72f8fb713f62d030c4a9', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('laszlo.kiss_456', '8babea6dd113007fbe6b1b04b0f33656', 0, 8)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('eszter.balla890', 'bb1ca8b931f3b7ebece79912028ad5e5', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('zsolt.szabo123', '05cfc603ffcdc93811b0849e3f6c17b3', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('eszter.takacs567', 'c13d87fe9af722b87f8dd6c0758ddbd9', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('attila.fekete.789', '5d067c3d0674e5f46d84f5e7f65e0cf9', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('mariann.kovacs_456', '69d91b104d78d5d48f0c6ff6f8a2e3e2', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('andras.balogh890', '95a8d14cb9b9b2e8c7c048a839656b6e', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('tunde.nagy123', '4712fc6f2ef9e1e6d5f176684a8ac648', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('laszlo.takacs567', 'e005e5b7e3033c7128483e259666baff', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('katalin.szabo.789', '8c661e2252064c55c13028b0d2e4ab9e', 0, 9)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('eszter.toth_456', '1f7a3885d16a0a61bc0f05d1a83e63a1', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('mihaly.balogh890', '3e1670cb1bde83783bf3f43d2170e85c', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('agnes.kovacs123', '0ac175b9c0f1b6a831c399e269772661', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('istvan.nagy567', 'd43f5de69a9261d410bb1da2b876a6b1', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('eszter.takacs.789', '7b1ea9f8d38bea8f47d5e7f3a877e5e4', 0, 10)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('peter.szabo_456', '02738e4b92ddc2ebdda9915f9c43af86', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('katalin.balla890', 'b76417ddff49374ff38d6ff747b9fa2e', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('laszlo.nagy123', 'b7a55b9268e0593fa08c07723fd51ff0', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('agnes.fekete567', '4f4b5ec07e82b4af04bde32a98f7e0d7', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('attila.kovacs.789', '0e3e4b73aebb6281b81e0d4f931d3c1c', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('mariann.kiss_456', '6004bc3f2b5e3ec6414dfb033ee1f12c', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('eszter.szabo890', 'f1a7066c3e491076d4e69dd2b38b8334', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('laszlo.balla123', '39db7ce198ad86f78864f7beedf90a0d', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('katalin.toth567', '8a101d4e827dd62e7c821c5ce2f3e23f', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('attila.szabo.789', '3ef815d015ff993a6c71cc3df290d709', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('zsolt.kovacs_456', 'a604ffafcdf4a29e6b758b26c7456e6f', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('maria.balogh890', 'ac29e62c71e2ca5e6e3e95b2ef97edec', 0, 11)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('eszter.kiss123', 'a0d942f5291d9cf1bb3b58c72ca14093', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('mihaly.szabo567', 'c2aefda6bd9335ecf5da0baf6bc5b93d', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('zsuzsa.takacs.789', '1d9055a9d02488e1c3613aeb5e21fa74', 0, 12)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('tamas.biro_456', 'b1e6c4d9f783e043179444f827d6a758', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('katalin.szabo890', '7b28e94087ff6cb134aedb8399283a80', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('tamas.szabo123', '711ac3c91540f3b5c28193b53b8a7a7b', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('eszter.nagy567', 'b43f6da5917ec582ad876dd26cf3bb12', 0, 13)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('laszlo.kovacs.789', 'd6a2f1574fa2a14213f182da239de58c', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('anna.szabo_456', 'bd33717b88ef18b2dcac40e93eb55eab', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('istvan.balla890', '78b0b50f42172c79c64bcb8bfb7269d5', 0, NULL)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('zsuzsa.takacs123', 'cd09acdfb35102f8d9822f79ec2a6fa1', 0, 14)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('attila.fekete567', '885d4a0efc19f153aabc6b9f34e1646e', 0, 15)",
"INSERT INTO Felhasznalo (nev, jelszo, admin, lektorAzon) VALUES ('admin.attila', 'p4FL4LSNaE.jxXYb7c6NLeQzzSt3YaWTdAu4mvje6QFZhE3r2PrHO', 1, NULL)",

"INSERT INTO Cikk (cim, szerzoAzon, lektorAzon, allapot, modositasokSzama, tartalom)  VALUES ('Mesterséges Intelligencia Alapjai', 7, 3, 3, 8, 'A mesterséges intelligencia olyan számítógépes rendszerek tervezésével foglalkozik, amelyek képesek az emberi intelligenciához hasonló feladatokat elvégezni.')",
"INSERT INTO Cikk (cim, szerzoAzon, lektorAzon, allapot, modositasokSzama, tartalom)  VALUES ('Gépi Tanulás Alapjai', 15, 12, 3, 5, 'A gépi tanulás egy olyan mesterséges intelligencia ága, amely lehetővé teszi a számítógépek számára, hogy adatokból tanuljanak anélkül, hogy kifejezetten programoznák őket.')",
"INSERT INTO Cikk (cim, szerzoAzon, lektorAzon, allapot, modositasokSzama, tartalom)  VALUES ('Big Data Anasztázia', 35, 7, 3, 7, 'A Big Data a hagyományos adatbázis-kezelési módszereken túlmutató adatfeldolgozási módszerek és technológiák összessége, amelyek lehetővé teszik nagy adatmennyiségek hatékony és gyors feldolgozását.')",
"INSERT INTO Cikk (cim, szerzoAzon, lektorAzon, allapot, modositasokSzama, tartalom)  VALUES ('Cloud Computing Tendenciák', 27, 9, 3, 6, 'A felhőszolgáltatás egy olyan modell, amely lehetővé teszi a hozzáférést és az erőforrás-használatot interneten keresztül, távoli helyekről.')",
"INSERT INTO Cikk (cim, szerzoAzon, lektorAzon, allapot, modositasokSzama, tartalom)  VALUES ('Blockchain Technológia Áttekintés', 42, 5, 3, 4, 'A blockchain egy elosztott adatbázis, amelyet több számítógép egyidejűleg kezel és hitelesít. Ez a technológia lehetővé teszi az adatok biztonságos és átlátható rögzítését és megosztását.')",
"INSERT INTO Cikk (cim, szerzoAzon, lektorAzon, allapot, modositasokSzama, tartalom)  VALUES ('Cybersecurity Alapjai', 9, 8, 3, 3, 'A kiberbiztonság az adatok, rendszerek és hálózatok védelmével foglalkozik az internetes támadásoktól, kibertámadásoktól és adathalászattól.')",
"INSERT INTO Cikk (cim, szerzoAzon, lektorAzon, allapot, modositasokSzama, tartalom)  VALUES ('IoT és a Jövő Smart Cities', 63, 11, 3, 9, 'Az IoT (Internet of Things) technológia lehetővé teszi az eszközök és gépek internetkapcsolatát, amely lehetővé teszi azok számára, hogy adatokat gyűjtsenek és kommunikáljanak egymással.')",
"INSERT INTO Cikk (cim, szerzoAzon, lektorAzon, allapot, modositasokSzama, tartalom)  VALUES ('Számítógépes Hálózatok', 18, 14, 3, 7, 'A számítógépes hálózatok az elektronikus eszközök közötti kommunikációt és adatok megosztását teszik lehetővé.')",
"INSERT INTO Cikk (cim, szerzoAzon, lektorAzon, allapot, modositasokSzama, tartalom)  VALUES ('Robotika és Automatizálás', 82, 10, 3, 5, 'A robotika a robotok tervezésével, készítésével és működtetésével foglalkozó tudományág, amely automatizált rendszereket hoz létre az emberi munkaerő helyettesítésére.')",
"INSERT INTO Cikk (cim, szerzoAzon, lektorAzon, allapot, modositasokSzama, tartalom)  VALUES ('Adatbiztonság és Adatvédelem', 76, 6, 3, 8, 'Az adatbiztonság és adatvédelem célja az érzékeny adatok védelme az illetéktelen hozzáféréstől és az adatvesztéstől vagy adatlopástól.')",


"INSERT INTO Nyelv (nyelv) VALUES ('Magyar')",
"INSERT INTO Nyelv (nyelv) VALUES ('Angol')",
"INSERT INTO Nyelv (nyelv) VALUES ('Francia')",
"INSERT INTO Nyelv (nyelv) VALUES ('Német')",
"INSERT INTO Nyelv (nyelv) VALUES ('Olasz')",
"INSERT INTO Nyelv (nyelv) VALUES ('Kínai')",
"INSERT INTO Nyelv (nyelv) VALUES ('Japán')",

"INSERT INTO Nyelvkapcsolat (cikkAzon, eredetiCikkAzon, nyelvAzon) VALUES (1,NULL, 1)",
"INSERT INTO Nyelvkapcsolat (cikkAzon, eredetiCikkAzon, nyelvAzon) VALUES (2,NULL, 1)",
"INSERT INTO Nyelvkapcsolat (cikkAzon, eredetiCikkAzon, nyelvAzon) VALUES (3,NULL, 1)",
"INSERT INTO Nyelvkapcsolat (cikkAzon, eredetiCikkAzon, nyelvAzon) VALUES (4,NULL, 1)",
"INSERT INTO Nyelvkapcsolat (cikkAzon, eredetiCikkAzon, nyelvAzon) VALUES (5,NULL, 1)",
"INSERT INTO Nyelvkapcsolat (cikkAzon, eredetiCikkAzon, nyelvAzon) VALUES (6,NULL, 1)",
"INSERT INTO Nyelvkapcsolat (cikkAzon, eredetiCikkAzon, nyelvAzon) VALUES (7,NULL, 1)",
"INSERT INTO Nyelvkapcsolat (cikkAzon, eredetiCikkAzon, nyelvAzon) VALUES (8,NULL, 1)",
"INSERT INTO Nyelvkapcsolat (cikkAzon, eredetiCikkAzon, nyelvAzon) VALUES (9,NULL, 1)",
"INSERT INTO Nyelvkapcsolat (cikkAzon, eredetiCikkAzon, nyelvAzon) VALUES (10,NULL, 1)",

"INSERT INTO Kulcsszo (kulcsszo) VALUES ('mesterséges intelligencia')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('gépi tanulás')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('big data')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('felhőszolgáltatás')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('blockchain')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('kiberbiztonság')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('IoT')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('számítógépes hálózatok')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('robotika')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('adatbiztonság')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('programozás')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('webfejlesztés')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('mobilalkalmazások')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('UI/UX design')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('adatelemzés')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('termelési folyamatok')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('üzleti intelligencia')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('digitális marketing')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('fizikai szimuláció')",
"INSERT INTO Kulcsszo (kulcsszo) VALUES ('eseményvezérelt programozás')",

"INSERT INTO Kulcsszokapcsolat (cikkAzon, kulcsszoAzon) VALUES (1,1)",
"INSERT INTO Kulcsszokapcsolat (cikkAzon, kulcsszoAzon) VALUES (2,2)",
"INSERT INTO Kulcsszokapcsolat (cikkAzon, kulcsszoAzon) VALUES (3,3)",
"INSERT INTO Kulcsszokapcsolat (cikkAzon, kulcsszoAzon) VALUES (4,4)",
"INSERT INTO Kulcsszokapcsolat (cikkAzon, kulcsszoAzon) VALUES (5,5)",
"INSERT INTO Kulcsszokapcsolat (cikkAzon, kulcsszoAzon) VALUES (6,6)",
"INSERT INTO Kulcsszokapcsolat (cikkAzon, kulcsszoAzon) VALUES (7,7)",
"INSERT INTO Kulcsszokapcsolat (cikkAzon, kulcsszoAzon) VALUES (8,8)",
"INSERT INTO Kulcsszokapcsolat (cikkAzon, kulcsszoAzon) VALUES (9,9)",
"INSERT INTO Kulcsszokapcsolat (cikkAzon, kulcsszoAzon) VALUES (10,10)",

"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (1, 1, 6)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (1, 2, 4)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (2, 1, 6)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (2, 3, 3)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (3, 1, 6)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (3, 4, 5)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (4, 1, 6)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (4, 5, 2)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (5, 1, 6)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (5, 6, 3)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (6, 1, 6)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (6, 7, 4)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (7, 1, 6)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (7, 2, 3)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (8, 1, 6)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (8, 3, 4)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (9, 1, 6)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (9, 4, 5)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (10, 1, 6)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (10, 5, 3)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (11, 1, 6)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (11, 6, 2)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (12, 1, 6)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (12, 7, 5)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (13, 1, 6)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (13, 2, 3)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (14, 1, 6)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (14, 3, 4)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (15, 1, 6)",
"INSERT INTO Lektornyelv (lektorAzon, nyelvAzon, nyelvSzint) VALUES (15, 4, 3)",



"INSERT INTO Hibajelentes (bejelento,cikkAzon,aktiv,datum,tartalom) values(2,2,1,TO_TIMESTAMP('2024/03/21 08:00:09', 'YYYY/MM/DD HH24:MI:SS'),to_clob('A felhőszolgáltatásokról szóló cikkben néhány információ hiányzik a legújabb fejleményekről, ami olyan, mintha egy ködös felhő takarná el a friss híreket. Kérem, frissítsék a cikket a legfrissebb információkkal.') )",
"INSERT INTO Hibajelentes (bejelento,cikkAzon,aktiv,datum,tartalom) values(3,3,1,TO_TIMESTAMP('2024/03/21 17:15:32', 'YYYY/MM/DD HH24:MI:SS'),to_clob('A blokklánc technológiáról szóló cikkben néhány alapvető fogalom hiányzik, ami olyan, mintha a blokklánc egy hibás láncszem lenne. Kérem, bővítsék a cikket az alapvető fogalmakkal. Köszönöm!') )",
"INSERT INTO Hibajelentes (bejelento,cikkAzon,aktiv,datum,tartalom) values(4,4,1,TO_TIMESTAMP('2024/03/21 13:33:33', 'YYYY/MM/DD HH24:MI:SS'),to_clob('A kiberbiztonsági témájú cikkben egy fontos adatvédelmi szabályozásról nincs említés, ami olyan, mintha egy biztonsági rést hagytak volna a hálózaton. Kérem, vegyék fel ezt a fontos tényt a cikkbe.') )",
"INSERT INTO Hibajelentes (bejelento,cikkAzon,aktiv,datum,tartalom) values(5,5,1,TO_TIMESTAMP('2024/03/21 00:23:42', 'YYYY/MM/DD HH24:MI:SS'),to_clob('A gépi tanulás témájú cikkben néhány releváns példa hiányzik, ami olyan, mintha a gép elveszett volna a tanulás folyamatában. Kérem, adják hozzá ezeket a példákat a cikkhez. Köszönöm!') )",
"INSERT INTO Hibajelentes (bejelento,cikkAzon,aktiv,datum,tartalom) values(6,6,1,TO_TIMESTAMP('2024/03/21 16:43:02', 'YYYY/MM/DD HH24:MI:SS'),to_clob('A cikk a kiberbiztonságról néhány alapvető biztonsági intézkedést hagyott ki, ami olyan, mintha egy zárt ajtót hagytak volna nyitva az internetes fenyegetések előtt. Kérem, tegyék teljessé a cikket a megfelelő biztonsági tippekkel.') )",
];
module.exports = script;