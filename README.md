# EZS-IoT

# Arduino

Arduino [čti Arduíno] je v informatice název malého jednodeskového počítače založeného na mikrokontrolerech ATmega od firmy Atmel. Svým návrhem se snaží podpořit výuku informatiky ve školách a seznámit studenty s tím, jak jsou pomocí počítačů řízena různá zařízení (např. mikrovlnná trouba, automatická pračka a jiné stroje). Nejedná se tedy o počítač ve smyslu stolního počítače nebo chytrého telefonu. Nelze proto k němu snadno přímo připojit monitor ani klávesnici či myš, ale je připraven na připojení LED diod, displeje z tekutých krystalů, servomotorů, senzorů, osvětlení atd. Více na .. [[1]](https://cs.wikipedia.org/wiki/Arduino) 

#### Hardware

- **WeMos D1 Mini** - Wemos D1 Mini je Wifi vývojová breadbord kompatibilní deska, založená na ESP8266 [e-shop](https://arduino-shop.cz/arduino/1679-externi-konektor-anteny-wemos-d1-mini-pro-16mb-1501219041.html?gclid=EAIaIQobChMInLuQ9d_A2QIVhOcbCh35RwMeEAQYASABEgJ-zvD_BwE)
- **Senzor Plamene Infračervený Detekční Modul** - Modul detekuje plamen nebo podobné světlo o vlnové délce 760nm. [e-shop](https://arduino-shop.cz/arduino/1520-senzor-plamene-infracerveny-detekcni-modul-1486113741.html) | [návod](http://navody.arduino-shop.cz/navody-k-produktum/infracerveny-senzor-plamene.html)
- **BME280 Modul Měření Teploty Vlhkosti** - Modul pro měření teploty, vlhkosti a barometrického tlaku obsahuje precizní senzor BME280. Tento měřící senzor od firmy Bosch komunikuje přes rozhraní I2C a zvládá komunikovat rychlostí až 3,4 MHz. [e-shop](https://arduino-shop.cz/arduino/1361-bme280-modul-mereni-teploty-vlhkosti-a-barometrickeho-tlaku-precizni-1469214547.html) | [návod](http://navody.arduino-shop.cz/navody-k-produktum/senzor-bme280-mereni-teploty-relativni-vlhkosti-a-barometrickeho-tlaku.html) | [datasheet](https://arduino-shop.cz/docs/produkty/0/91/1469214547.pdf)
- **Vodiče, jumpers** - [e-shop F-F + F-M + M-M](https://arduino-shop.cz/arduino/1314-sada-dupont-vodicu-120-kusu-mm-ff-mf-3-druhy-1464646471.html) | [e-shop F-F](https://arduino-shop.cz/arduino-kabelaz-propoje-rozsireni/835-arduino-vodice-samice-samice-40-kusu-1500635965.html) | [e-shop F-M](https://arduino-shop.cz/arduino-kabelaz-propoje-rozsireni/1214-arduino-vodice-samice-samice-40-kusu-1457705007.html) | [e-shop M-M](https://arduino-shop.cz/arduino-kabelaz-propoje-rozsireni/1063-arduino-vodice-samec-samec-40-kusu-1500635966.html) 
- **Kontaktní nepájivé pole** - [e-shop](https://www.gme.cz/nepajive-kontaktni-pole-zy-204) 
- **LED (3x)** - [e-shop](https://www.gme.cz/led-5mm-warm-white-8500-30)
- **Rezistor 220 ohm (3x)** - [e-shop](https://www.gme.cz/rm-220r-0309-1w-1)
- **Mikrospínač (3x)** - [e-shop](https://www.gme.cz/tc-0102-t-a00) 

#### Software

Arduino IDE je open-source software umožňující snadné psaní kódu a jeho nahrávání na desku. Spouští se na systémech Windows, Mac OS X a Linux a jeho prostředí je napsáno v jazyce Java. Tento software lze použít s libovolnou deskou Arduino.

1. **Stažení a instalace softwaru Arduino IDE** - Software Arduino IDE je dostupný na oficiálních stránkách společnosti Arduino [Download](https://www.arduino.cc/en/main/software). 

2. **Instalace WiFi čipu ESP8266** - Samotný software Arduino IDE neobsahuje podporu desek s WiFi čipy ESP8266, proto je nutné tuto podporu doinstalovat. Využijeme návodu vytvořeného společností Arduino-shop [Návod](http://navody.arduino-shop.cz/navody-k-produktum/esp8266-vyvojova-deska-wemos-d1.html). 
*Pozn.: Vývojovou desku nevolte dle návodu WeMos D1 (retired), ale zvolte WeMos D1 R2 & mini*.

3. **Připojení desky WeMos D1 mini** - Desku WeMos D1 mini připojte MicroUSB kabelem k PC. V sotwaru Arduino IDE přejděte do Nástroje -> Port a zvolte port, ke kterému jste vaši desku připojili.

4. **Instalace knihoven** - Návod, jak knihovny do prostředí Arduino IDE implementovat nalezneme opět na stránkách společnosti Arduino-shop [Návod](http://navody.arduino-shop.cz/zaciname-s-arduinem/arduino-knihovny.html). 
Potřebné knihovny: **BME280** [Download](https://github.com/adafruit/Adafruit_BME280_Library), **ArduinoJson** [Download](https://github.com/bblanchon/ArduinoJson)

#### Zapojení

![zapojeni](https://github.com/davidvasicek/EZS-IoT/blob/master/Sch%C3%A9ma%20zapojen%C3%AD.png)

Schéma zapojení bylo vytvořeno v open-source software Fritzing. Tento software můžeme stáhnout ze stránek [http://fritzing.org/download/](http://fritzing.org/download/) 

Veškeré externí součástky, které nejsou součástí knihovny programu Fritzing, naleznete [zde](https://github.com/davidvasicek/EZS-IoT/blob/master/Fritzing_sou%C4%8D%C3%A1stky.rar)

#### PinOut

![WeMos D1 mini PinOut](https://github.com/davidvasicek/Elektronicke-zabezpecovaci-systemy---EZS/blob/master/img/WeMos%20D1%20mini%20pinout3.png)

- **SPI**: D5 = SCK, D6 = MISO, D7 = MOSI, D8 = SS; 
- **I2C**: D1 = SCL, D2 = SDA

#### Kód

Kód projektu Arduina naleznete zde: [Arduino.ino](https://github.com/davidvasicek/EZS-IoT/blob/master/Arduino.ino) 

Základní struktura kódu se zakládá na dvou hlavních funkcích, bez nichž by program nemohl fungovat. Z funkce Setup a funkce Loop, které se spouštějí automaticky po zapnutí desky Arduino. Funkce Setup se spouští po každém zapnutí nebo resetování pouze jednou a slouží k inicializaci proměnných, definování režimů pinů, inicializaci knihoven, načtení vstupních dat apod. Funkce Loop, jak už její název napovídá bude automaticky cyklovat, což umožňuje Arduinu reagovat na změny, měnit stav hodnot, funkcí, pinů atd.

Samotný program na svém začátku obsahuje připojení veškerých potřebných knihoven, definici pinů jednotlivých připojených senzorů, popřípadě jejich adresy pro IIC komunikaci, ale především definuje heslo a SSID Wi-Fi sítě, ke které se bude zařízení připojovat. Tyto údaje jsou důležité pro inicializaci Wi-Fi spojení s naší síti a získání IP adresy. Tato inicializace je spouštěna ve funkci Setup voláním metody WiFi.begin. Proces následně spadne do smyčky while, ve které každých 500ms kontroluje status připojení, dokud není status připojení roven *WL_CONNECTED*. V takovém to případě pokračuje program dále, inicializuje přenos paketů pomocí protokolu UDP a zavolá funkci sendBroadcastMessage. Tato funkce slouží k vytvoření broadcastu z přidělené lokální adresy, na který je následně odeslán UDP packet se zprávou "Hello server", kterou se snaží ve své síti najít server, kterému může zasílat veškerá svá data.

Ve chvíli, kdy server na zprávu odpověděl, zasílá svou IP adresu, na kterou je opětovně zaslaná zpráva s registračními údaji a informacemi o našem zařízení v podobě JSON objektu.

V této chvíli může začít probíhat samotná smyčka. Ta v cyklu v prvé řadě kontroluje příchozí pakety na svém otevřeném portu 2807, který jsme definovali na začátku kódu a následně v druhé řadě dojde ke čtení dat z připojených senzorů. Tyto data jsou odesílány každých 5000 ms v podobě JSON objektu, nebo ve chvíli, kdy dojde k detekování požáru, či detekování stisku mikrospínače. Tyto objekty již zpracovává samotný server, který si popíšeme v další části tutoriálu.

# Firebase

Firebase je platforma pro vývoj mobilních a webových aplikací vyvinutá firmou Firebase, Inc. v roce 2011 a poté získala společnost Google v roce 2014. [[2]](https://en.wikipedia.org/wiki/Firebase)

#### Firebase Cloud Messaging

Firebase Cloud Messaging (FCM) je řešení pro zasílání zpráv mezi platformami, které vám umožní spolehlivě doručovat zprávy zdarma.
Pomocí služby FCM můžete upozornit aplikaci klienta, že jsou k dispozici nová e-mailová nebo jiná data. U aplikací, jako je například instant messaging, může zpráva přenést užitečné zatížení až 4 kB do aplikace klienta. [[3]](https://firebase.google.com/products/cloud-messaging/), [[4]](https://firebase.google.com/docs/cloud-messaging/)

#### Realtime Database

Ukládejte a synchronizujte data s NoSQL cloud databází. Data jsou synchronizována ve všech klientech v reálném čase a zůstávají k dispozici, když aplikace zmizí.
Firebase Realtime Database je databáze hostovaná v cloudu. Data jsou uložena jako JSON a synchronizována v reálném čase s každým připojeným klientem. Při vytváření aplikací s více platformami iOS, Android a JavaScript SDK sdílí všichni klienti jednu instanci Realtime databáze a automaticky přijímá aktualizace s nejnovějšími daty. [[5]](https://firebase.google.com/products/realtime-database/), [[6]](https://firebase.google.com/docs/database/)

#### Založení projektu Firebase:

1. **Registrace Google účtu** - Abychom mohli plně využívat služeb Firebase, potřebujeme mít platný účet u společnosti Google, Inc. Pokud tento účet nemáme, budeme ho muset v prvé řadě vytvořit. [Registrace](https://accounts.google.com/SignUp?continue=https%3A%2F%2Fwww.google.cz%2F%3Fgfe_rd%3Dcr%26ei%3DUXnfWML0IfGv8wfVooPIAg&hl=cs)

2. **Vytvoření nového projektu** na stránkách [https://console.firebase.google.com/](https://console.firebase.google.com/) vytvořte nový projekt kliknutím na tlačítko *Add project*. V dalším kroku vyplňte potřebné údaje a nový projekt vytvořte stisknutím *CREATE PROJEKT*.

## Raspberry Pi

Raspberry Pi (výslovnost [ˈraːzbəri pai]) je v informatice název malého jednodeskového počítače s deskou plošných spojů o velikosti zhruba platební karty. V roce 2012 byl vyvinut britskou nadací Raspberry Pi Foundantion s cílem podpořit výuku informatiky ve školách a seznámit studenty s tím, jak mohou počítače řídit různá zařízení (např. mikrovlnná trouba, automatická pračka). Primárním operačním systémem je Raspbian. Cena je na konci roku 2016 v rozmezí 150–1 200 Kč (nejlevnější je Raspberry Pi Zero, nejdražší pak Raspberry Pi 3 Model B). Označení „Raspberry Pi“ je registrovanou ochrannou známkou, a proto mají podobně navržené počítače zdánlivě odvozené názvy (např. Banana Pi). [[7]](https://cs.wikipedia.org/wiki/Raspberry_Pi)

#### Software

**Raspbian** (výslovnost [raːzbiən]) je operační systém odvozený od Debianu pro Raspberry Pi i osobní počítače. Je oficiálně poskytován nadací Raspberry Pi Foundation jako primární operační systém pro jednoplášťové počítače z rodiny Raspberry Pi. Raspbian byl vytvořen Mikem Thompsonem a Peterem Greenem jako nezávislý projekt a první sestavení byla dokončena v červnu 2012.  Raspbian je vysoce optimalizovaný pro ARM procesory používané v Raspberry Pi. [[8]](https://cs.wikipedia.org/wiki/Raspbian)

1. **Stažení operačního systému** - Raspbian je součásti instalačního balíčku zvaného NOOBS, který nalezneme na oficiálních stránkách organizace RaspberryPi [Download](https://www.raspberrypi.org/downloads/noobs/). Stáhneme NOOBS ve formátu *.zip* kliknutím na tlačítko *Download ZIP*.

2. **Příprava Micro SD karty** - Pokud naše karta obsahuje zastaralá data, bude nutné kartu v prvé řadě naformátovat. To provedeme programem zvaným SD Memory Card Formatter [Download](https://www.sdcard.org/downloads/formatter_4/).

3. **Kopírování souborů na Micro SD kartu** - Jestliže máme balíček NOOBS stažený a paměťovou kartu naformátovanou, překopírujeme veškeré soubory ze ZIP archívu balíčku NOOBS na paměťovou kartu.

4. **Instalace OS** - Paměťovou kartu vsuneme do našeho zařízení Raspberry Pi a připojíme monitor a napájení. Po nabootování paměťové karty se zobrazí nabídka, ve které zaškrtávacím políčkem zvolíme *Raspbian with PIXEL* a stiskem tlačítka *Install* system Raspbian nainstalujeme.

#### Prvotní spuštění systému:

1. **Připojení k internetu:** 

    - **Kabelové připojení (ETH0)** - V případě kabelového připojení pouze připojíme datový kabel do zařízení Raspberry Pi. 
    - **Bezdrátové připojení (WLAN0)** - Pokud budeme využívat WiFi připojení, nalezneme v grafickém prostředí OS Raspbianu v pravé horní části obrazovky ikonku WiFi, na kterou klikneme, vybereme SSID sítě, ke které se budeme připojovat a vložíme heslo. 
    - **Získáni IP adresy** - Spusťte příkazový řádek a zadejte příkaz `ifconfig`. IP adresu najdeme pod označením *inet*. V případě kabelového připojení v *ETH0*, v případě bezdrátového připojení *WLAN0*.
2. **Povolení protokolu SSH (Secure Shell)** - V prostředí OS Raspbianu klikneme v levém horním rohu na ikonu maliny -> Preferences -> Raspberry Pi Configuration -> Interfaces -> SSH: Enable -> OK [Návod](https://www.raspberrypi.org/documentation/remote-access/ssh/).
3. **Update a Upgrade systému.** Spusťte příkazový řádek a zadejte příkaz `sudo apt-get -y upgrade`, po dokončení zadejte příkaz `sudo apt-get -y update`

#### Instalace repozitářů

Přejděte do příkazovéhé řádky a přihlaste se jako správce root příkazem `sudo -i`. Pokud nebudete jako správce přihlášeni, budou vám chybět oprávnění k následujícím úkonům.

1. **Instalace FTP**. FTP (File Transfer Protocol) slouží pro přenos souborů mezi Raspberry Pi a jiným počítačem.

    ```
    apt-get install -y vsftpd
    nano /etc/vsftpd.conf // úprava konfiguračního souboru vsftpd.conf
    	// změťe #write_enable=YES na write_enable=YES
    /etc/init.d/vsftpd restart
    ```

2. **Instalace Node JS a npm.** Node.js je softwarový systém navržený pro psaní vysoce škálovatelných internetových aplikací, především webových serverů. Programy pro Node.js jsou psané v jazyce JavaScript, hojně využívající model událostí a asynchronní I/O operace pro minimalizaci režie procesoru a maximalizaci výkonu [[9]](https://cs.wikipedia.org/wiki/Node.js). Npm je správce balíčků pro programovací jazyk JavaScript. [[10]](https://en.wikipedia.org/wiki/Npm_(software))
    
    ``` 
	curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
	apt-get install nodejs
	apt-get install npm
	node -v
	npm -v
    ``` 
   
   vytvoření ukázkového skriptu:
    ```
    mkdir /home/pi/IoT
    chmod 777 /home/pi/IoT
    cd /home/pi/IoT
    nano server.js
    	console.log("Hello world, I am IoT server");
    chmod 777 server.js
    node server.js
	``` 
	
3. **Instalace knihoven** Aplikace serveru obsahuje několik knihoven, které je potřeba pomocí nástroje nmp nainstalovat. Server tyto knihovny očekává v adresáři umístění serveru server.js. Přejděte proto do tohoto adresáře příkazem cd /home/pi/IoT a zadejte následující příkazy:

    ```
	npm install dgram
	npm install dfirebase --save
	npm install drequest
	npm install dip
	npm install dos
	npm install dmariasql
	npm install dfs
	``` 
	
	V případě, že bychom se instalaci nechtěli zatěžovat, stačí do adresáře /home/pi/IoT překopírovat následující adresář. [node_modules.rar](https://www.dropbox.com/s/19hbomc7ptnvymg/node_modules.rar?dl=0)

#### Vytvoření interní databáze MariaDB

MariDB je relační databáze, která je komunitou vyvíjenou nástupnickou větví (tzv, „forkem“) MySQL. Hlavním důvodem k vytvoření této větve bylo udržení licence svobodného softwaru GNU GPL [[11]](https://cs.wikipedia.org/wiki/MariaDB). V našem případě nám bude sloužit pro dlouhodobé ukládání dat jednotlivých senzorů. Tyto data budou sloužit pro analýzu, statistiku a vizualizaci na serveru. 

1. **Instalace MariDB.** 

    ```
	sudo apt install -y mariadb-server
    ```
    
2. **Přihlášení do MariDB a vytvoření nové databáze s názvem IoT** (defaultní heslo pro vstup do databáze je heslo uživatele root => raspberry)

	``` 
	mysql -u root -p // Přihlášení do MariDB
	CREATE DATABASE IoT;  // Vytvoření nové databáze s názvem IoT
	```

3. **Udělení oprávnění pro přístup do databáze**

	```
	   CREATE USER 'pi'@'localhost' IDENTIFIED BY 'raspberry'; // vytvoření nového uživatele pi'@'localhost identifikovatelného podle hesla raspberry
	   GRANT ALL PRIVILEGES ON IoT.* TO 'pi'@'localhost' IDENTIFIED BY 'raspberry' WITH GRANT OPTION; // povolení přístupu uživateli pi do všech tabulek v databázi IoT, který se identifikoval heslem raspberry
	   FLUSH PRIVILEGES; // flush pravidel
	   USE IoT; // přepnutí se do databáze IoT, ve které budeme vytvářet nové tabulky
	```

4. **Vytvoření tabulek** - Budou vytvořeny celkem 2 tabulky, každá pro jeden ze senzorů zasílající svá data serveru. Tbulka BME280 uchovávající data o teplotě, vlhkosti a barometrického tlaku a tabulka FlameDetection uchovávající informace o detekovaném požáru.
	
	
	``` 	
	CREATE TABLE IF NOT EXISTS BME280(
	id INT(20) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	Temperature VARCHAR(500) NOT NULL,
	Humidity VARCHAR(500) NOT NULL,
	Pressure VARCHAR(500) NOT NULL,
	TimeStamp NUMERIC(20) NOT NULL
	);
	``` 

	``` 
	CREATE TABLE IF NOT EXISTS FlameDetection(
	id INT(20) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	Value VARCHAR(500) NOT NULL,
	TimeStamp NUMERIC(20) NOT NULL
	);
	``` 
	
#### Spuštění skriptu na pozadí jako Daemon

1. vytvoření nového souboru `sudo nano /etc/systemd/system/server.service` a vložení následujícího kódu
	
	``` 
	[Unit]
	Description=Node.js Hello World Http Server

	[Service]
	ExecStart=/home/pi/IoT/server.js
	Restart=always
	User=root
	Group=root
	Environment=PATH=/usr/bin:/usr/local/bin
	Environment=NODE_ENV=production
	WorkingDirectory=/home/pi/IoT

	[Install]
	WantedBy=multi-user.target
	```
	
2. Spuštění příkazů:

	``` 
	systemctl daemon-reload
	systemctl start server
	journalctl --follow -u server
	```

3. Úprava souboru `sudo nano /etc/rc.local` a přidáním na předposlední řádek (těsně před exit 0) následující příkaz

	``` 
	sudo systemctl start server
	```

	
#### Kód

Kód projektu pro raspberry server stáhneme z následujícího odkazu. [Server.js](https://github.com/davidvasicek/EZS-IoT/blob/master/RaspberryPi_server.js) (tento kód překopírujte do již dříve vytvořeného souboru server.js v adresáři /home/pi/IoT/)	

kód serveru se skládá z několika sekcí pro lepší orientaci a snadnější pochopení celého kódu a jeho funkčnosti. Na samotném začátku kódu se nachází import knihoven (balíčků) spravovaného nástrojem npm, inicializace realtime databáze Firebase a inicializace klienta pro Maria databázi.

První sekci, která se nachází těsně pod potřebnými inicializacemi je sekce *RASPBERRY PI INFO*. V této sekci dochází k vytěžení IP adres z jednotlivých rozhraní (ETH0, WLAN0) a také k získání sériového čísla zařízení, které je přečteno ze souboru /proc/cpuinfo pod označením jako serial:. Všechny tyto informace jsou posléze uloženy do databáze Firebase s referencí *Gateway/Info* a mají především informativní charakter.

Další sekcí, tou nejdůležitější, je sekce *UDP PACKET LISTENER*. V této sekci je implementován UDP posluchač, který naslouchá příchozím paketům na otevřeném portu 2807 a dále je zpracovává. Posluchač předvídá, že veškeré IoT zařízení zasílají zprávy ve formátu JSON, proto veškeré pakety po příchodu ihned parsuje. Na základě takto rozparsovaných paketů následně rozlišuje tři základní typy zpráv, které jsou v paketu obsaženy. DeviceRegister, sensorData a actionData. Zpráva DeviceRegister informuje server o novém IoT zařízení v síti a server jej může řádně registrovat. Zprávy tohoto charakteru nesou potřebné informace o daném zařízení, jako je název zařízení, ID, IP adresa, MAC adresa apod. Zpráva sensorData informuje server, že v těle paketu je přenášen objekt dat s užitečnými informacemi generovanými určitým senzorem. Tyto data se dále nezpracovávají a jsou rovnou uloženy do databáze Firebase. To je prováděno z toho důvodu, že ne vždy můžeme znát specifický charakter každého senzoru a v případě nějakého neznámého senzoru požadujeme data alespoň zaznamenat. Poslední zprávou je zpráva actionData, která server informuje o nějakém požadavku na změnu (např. rozsvícení, zhasnutí osvětlení apod.) a jsou většinou generovaný interakcí uživatele.

Další sekce *UDP PACKET SEND* obsahuje funkci SendUDPPacket, která má za úkol vytvořit UDP packet a zaslat jej na příslušnou adresu. Vlastní informace, přenášena v těle paketu je předávána parametrem *MESSAGE* a parametr *HOST* definuje adresu zařízení, na kterou se má packet zaslat. 

Po sekci *UDP PACKET SEND* následuje sekce *SAVE TO INTERNAL DATABASE*, která obsahuje funkci se stejnojmenným názvem saveToInternalDatabase a slouží pro ukládání příchozích dat do interní databáze, jak už název sám napovídá. Tato funkce je naprogramována staticky a ukládá do interní databáze pouze senzory typu BME280 a FlameDetection.

V neposlední řadě obsahuje také kód serveru sekci *FIREBASE LIGHTS LISTENER*. V této sekci jsou implementovány dva posluchače pro Firebase databázi a naslouchají změnám v referenci *Lights*. První posluchač "child_added" je volán vždy při novém spuštění skriptu, nebo při přidaní nového "childu" do cloudové databáze. V našem případě ovšem neočekáváme rozšíření databáze o nová osvětlení, proto tento posluchač slouží pouze k prvotnímu naplnění pole objektů *m_lights*, které po celou dobu běhu programu udržuje v paměti. Druhý posluchač "child_changed" je posluchač naslouchající změnám již v definovaných osvětleních. Díky tomuto posluchači jsme schopni zaznamenat změnu stavu ze zapnuto na vypnuto a naopak, nebo také změnu intenzity záření u konkrétního osvětlení. Při každé takovéto změně dojde taktéž ke změně v poli objektů *m_lights*, což nám umožňuje toto pole udržovat stále aktuální. 

Pravděpodobně nejmenší sekci tohoto kódu je sekce *FIREBASE ARDUINO DEVICE LISTENER*, která slouží pouze k udržení aktuální IP adresy našeho zařízení, kdyby náhodou během chodu programu došlo k její změně.

Poslední a zároveň největší sekcí je sekce *FCM*, jejiž zkratka označuje Firebase Cloud Messaging a jak už název napovídá, jedná se o sekci, která se stará o distribuci notifikací do jednotlivých registrovaných mobilních zařízení. Sekce se skládá z posluchače nad referenci *SensorData/FlameDetection* ve Firebase databázi, z posluchačů "child_added" a "child_changed" nad referencí *AndoidDevices* a z hlavní funkce *sendNotification*. Posluchač *FlameDetection* slouží k detekování požáru a následnému zaslání upozornění do příslušných mobilních zařízení. To je docíleno voláním funkce *sendNotification*, která si v prvé řadě vytáhne veškeré autorizované tokeny, kterým následně notifikaci zašle. Aby byly tokeny aktuální bylo nutné definovat již zmiňované posluchače "child_added" a "child_changed" nad referencí *AndoidDevices*, které fungují obdobně jako posluchače v   sekci *FIREBASE LIGHTS LISTENER*.

# Webový server

Pojmem webový server se rozumí počítač, který je odpovědný za vyřizování požadavků HTTP od klientů (nejčastěji webových prohlížečů). Vyřízením požadavků se rozumí odeslání cíle specifikovaného URL (typicky webová stránka, ale též statický text, obrázek či jiný soubor). Webové stránky jsou obvykle dokumenty v jazyku HTML. V druhém případě se webovým serverem rozumí  počítačový program, který provádí činnosti popsané v předchozím bodě (démon). [12](https://cs.wikipedia.org/wiki/Webov%C3%BD_server)

Pro potřeby našeho projektu jsme použili nejpoužívanějším webový server vůbec, Apache HTTP Server.

### Instalace

    ``` 
	apt-get install -y apache2
    ``` 
    
Web, který pro naše účely používáme, využívá skripty v jazyce php. Proto je potřeba doinstalovat jednotlivé balíčky a závislosti, které s php skripty umí pracovat. Webový server následně restartujeme.

    ``` 
	sudo apt-get install -y php7.0 libapache2-mod-php7.0 php7.0-cli php7.0-common php7.0-mbstring php7.0-gd php7.0-intl php7.0-xml php7.0-mysql php7.0-mcrypt php7.0-zip
	sudo systemctl restart apache2
    ```     
    
Tento webový server očekává svá data v adresáři /var/www/html. Do tohoto adresáře budeme kopírovat veškerá data, která najdeme v následujícím archívu [Dashboard.rar](https://github.com/davidvasicek/EZS-IoT/blob/master/Dashboard.rar)	

Jakmile jsou veškerá data zkopírování v adresáři /var/www/html, nastavíme přístupová práva všech souborů a adresářů v dané cestě příkazem `sudo chmod 777 -R /var/www/html`

### Kód
 
![Dashboard Screen](https://github.com/davidvasicek/Elektronicke-zabezpecovaci-systemy---EZS/blob/master/Dashboard_screen.png)

Změny v kódu ... 

Původní Dashboard, který byl upraven naším požadavkům byl stažen ze stránek GitHubu [https://github.com/puikinsh/sufee-admin-dashboard](https://github.com/puikinsh/sufee-admin-dashboard). Veškeré velké změny provedeny oproti původního projektu naleznete v popisu níže.

Index.html ... Index.html je hlavní soubor webových stránek, který webový server zpracovává jako první v pořadí. Krom celkové úpravy tohoto souboru a přizpůsobení dashboardu naším potřebám je nejdůležitější implementace Firebase do našeho projektu. Firebase implementujeme následovně: Přejděte do konzole prostředí Firebase. Ve vašem projektu zvolte *ADD ANOTHER APP* a zvolte *Add Firebase to your web app*. Zkopírujte skript a vložte jej ke konci souboru.

V Index.html kódu si můžeme všimnout také implementaci vlastního JavaScriptu Firebase.js (<script src="assets/js/firebase.js"></script>), kde assets/js/ označuje cestu v hierarchiji adresářů, kde soubor můžeme nalézt. Tento skript se stará o vytěžování dat z databáze Firebase a také o ovládání prvků pro zapínání/vypínání světel, či úpravy jejich intenzity. K tomu slouží implementovány přepínače (switch) a posuvníky (RangeBar). Vzhled těchto prvků je definovaný v nově vytvořeném souboru kaskádových stylů, myStyle.css. (
<link rel="stylesheet" href="assets/css/myStyle.css">). 

Kromě výše uvedených skriptů implementovaných do souboru Index.html, jsou do tohoto souboru implementovaný také skripty chart_temperature_humidity_dashboard.js a chart_pressure_dashboard.js. Zde je potřeba dbát na implementaci těchto skriptů až pod skript Chart.bundle.js, který slouží k inicializaci JavaScriptu Chart.js. Bez něj nám nebudou námi vytvořené skripty fungovat. Jak už tedy text napovídá, skripty slouží k zobrazení grafů na hlavní nástěnce. Oba tyto skripty využívají asynchronního načítání dynamického obsahu (AJAX), čímž odpadá nutnost aktualizovat vždy celou webovou stránku. Tím jsme byli schopni vytvořit Real-Time grafy, které každou sekundu načítají obsah interní databáze MariDb a data zpracovávají. O vytěžování těchto dat se starají php skripty BME280_Data.php a FlameDetection_Data.php, které po přihlášení do interní databáze vyselektují požadovaná data a vrátí je v objektu JSON.

Zbytek úprav provedeny v ostatních souborech využívají obdobné postupy výše uvedené, proto je zde nebudu více popisovat.    

# Mobilní aplikace pro platformu Android

![Android App Screen](https://github.com/davidvasicek/EZS-IoT/blob/master/Android_app_screen.png)

Aplikaci pro platformmu Android stáhnete z následujícího odkazu. [IoT-EZS.apk](https://github.com/davidvasicek/EZS-IoT/blob/master/IoT-EZS.apk)
	
### Software

1. **Stažení a instalace softwaru Android Studio** - Software Android Studio je dostupný na oficiálních stránkách Android Developer [Download zde](https://developer.android.com/studio/). 

2. **Instalace služby Google Play services** - Pro implementaci Firebase do našeho nového projektu budeme prvně muset nainstalovat Google Play services, bez kterých nám Firebase v aplikaci nepoběží. Android Studio -> Tools -> SDK Manager -> SDK Tools -> Google Play Services -> Apply.

### Implementace Firebase do nového projektu

Přejděte do konzole prostředí Firebase. Ve vašem projektu zvolte *ADD ANOTHER APP* a zvolte *Add Firebase to your Android app*. Do kolonky *Android package name* vložte package vašeho nového projektu v Android Studiu. Package lze nalézt v *Android Manifestu* pod označením *package*. *Např. com.example.user.myfirstfirebaseapp*. Následně zvolte *REGISTER APP* a dále pokračujte dle průvodce ve Firebase.

### Kód

Kód projektu pro Android Studio stáhneme z následujícího odkazu. [Android_App.rar](https://www.dropbox.com/s/vvygq6qlhf0o6kg/IoTEZS.rar?dl=0)

Struktura projektu Android aplikace se skládá z celkem tří aktivit (MainActivity, LoginActivity, DevicesActivity), dvou dialogů (AboutAppDialog, LightIntensityDialog), dvou service (FirebaseMessagingService, FirebaseInstanceIDService) a ze dvou objektů (AndroidDevicesObject, LightsObject). Všechny tyto třídy jsou logicky strukturovány do jednotlivých adresářů dle jejich charakteru. 

Hlavní aktivita, která je defaultně spouštěná při zapnutí aplikace, je aktivita LoginActivity, která slouží pro zadání pinu a ověření přístupu do dané aplikace. K tomu slouží jeden TextView a celkem devět tlačítek, z nichž každé je interaktivní a slouží pro zadání číslice do vstupu pro ověření přístupu. Tento vstup se postupně vypisuje do TextView, čímž uživatel může postupně kontrolovat zadávající pin. Při každé takovéto interakci kontroluje kód také velikost vstupu uživatelem zadaný. Je-li uživatelem zadána již šestá číslice, dojde k ověření tohoto vstupu vůči databázi firebase.

V případě pozitivního výsledku, přesměruje aplikace uživatele do aktivity MainActivity, která je hlavní aktivitou celého projektu. V této aktivitě jsou uživateli zobrazeny celkem čtyři sekce. Senzorové data, které slouží pro vizualizaci dat jednotlivých senzorů z databáze Firebase, osvětlení, která uživateli nabízí zapínat/vypínat jednotlivé osvětlení nebo měnit jejich intenzitu záření, sekci zabezpečení, která vizualizuje stav detekce požáru a sekci notifikace, která uživateli umožňuje vypínat/zapínat příchozí notifikace do daného mobilního zařízení. Co se týče první a třetí sekce, čili sekce senzorových dat a zabezpečení, umožňuje uživateli pouze čtení z Firebase databáze. Ostatní sekce, dovolují uživateli do databáze také zapisovat, čímž můžeme např. osvětlení zapnout nebo vypnout, popřípadě nastavit danému osvětlení intenzitu jeho záření. Ke změně této intenzity slouží dialogové okno LightIntensityDialog, která čte údaje z "posuvníku" a tyto údaje v reálné době do databáze zapisuje. Aktivita MainActivity obsahuje kromě čtyř sekcí také prvek známý jako panel akcí, který se nachází v levé postranní liště aktivity. Tento panel je uživateli skrytý, dokud jej sám nezobrazí. To lze provést přejetím prstu po obrazovce z levého okraje displejem směrem k pravému. 

Tento panel obsahuje tři položky. Položku Zařízení, položku O aplikaci a položku Odhlášení. Položka Zařízení přesměruje uživatele do aktivity DevicesActivity a slouží především jako informativní aktivita vyobrazující ID zařízení s IP adresou Arduina a ID zařízení s IP adresami Raspberry Pi serveru. Další položka v panelu je položka O aplikaci, která zobrazuje dialogové okno AboutAppDialog. Tento dialog složí pro zobrazení informací a aplikaci, především její verzi a kontaktní údaje o vývojáři. Poslední položkou je položka Odhlášení, která uživatele přesměruje zpět do aktivity LoginActivity. Tato položka slouží především k zabezpečení aplikace před neautorizovanou osobou, která by se mohla dost již k odemknuté aplikaci.
