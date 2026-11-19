# xojimurodbektemirov.uz — qo'llanma

Bu qo'llanmada saytning fayllari, ularni qanday o'zgartirish va saytni qanday qilib internetga chiqarish tushuntirilgan.

---

## 1. Fayllar va ularning vazifasi

```
sayt/
├── index.html          ← sahifaning tuzilishi va qolgan matnlar
├── css/
│   └── style.css       ← dizayn: ranglar, shriftlar, o'lchamlar, animatsiyalar
├── img/
│   └── xojimurod.jpg   ← bosh qismdagi rasmingiz
├── js/│   ├── malumotlar.js   ← ★ SIZNING MA'LUMOTLARINGIZ (eng ko'p o'zgartiriladigan fayl)
│   └── script.js       ← harakatlar: globus, atlas, terminal, animatsiyalar
└── QOLLANMA.md         ← shu qo'llanma
```

| Nimani o'zgartirmoqchisiz | Qaysi fayl |
|---|---|
| Ism, tug'ilgan sana, tajriba yili | `js/malumotlar.js` |
| Hayot yo'li kartalari | `js/malumotlar.js` → `yol` |
| Tillar va darajalar | `js/malumotlar.js` → `tillar` |
| Davlatlar (globus) | `js/malumotlar.js` → `davlatlar` |
| Ko'nikmalar, orbita | `js/malumotlar.js` → `konikmalar`, `orbita1`, `orbita2` |
| Telegram, email, Instagram | `js/malumotlar.js` → `aloqa` |
| Yugurib turuvchi lentalar | `js/malumotlar.js` → `lenta`, `lenta2` |
| Bo'lim sarlavhalari, "Men kimman" matni, stikerlar | `index.html` |
| Ranglar va shriftlar | `css/style.css` (fayl boshidagi `:root` qismi) |
| Bosh qismdagi rasm | `img/xojimurod.jpg`. Yangi rasmni **xuddi shu nomda** saqlab, eskisining o'rniga qo'ying (tik rasm yaxshi chiqadi, masalan 800×1200) |
| Terminal buyruqlari | `js/script.js` → `const CMDS` |

**Qanday dasturda ochish kerak?** Bepul **VS Code** (code.visualstudio.com) yoki oddiy Notepad. Word'da ochmang, u kodni buzadi.

**O'zgarishni tekshirish:** `index.html` ni ikki marta bosib brauzerda oching. Faylni o'zgartirib saqlagandan keyin brauzerda **F5** bosing.

---

## 2. `js/malumotlar.js`: asosiy ma'lumotlar

Faylning har bir qatori yonida nima ekanligi izoh qilib yozilgan. Qoidalar:

- Faqat qo'shtirnoq `"..."` ichidagi matnni va raqamlarni o'zgartiring.
- Vergul `,`, qavslar `[ ] { }` va qo'shtirnoqlarni o'chirmang. Bitta vergul tushib qolsa, sayt bo'sh ko'rinadi.
- Apostrof `'` ni bemalol yozavering (o'qituvchi, ta'lim).

### Misollar

**Telegram manzilini qo'yish:**
```js
["Telegram", "@xojimurod_uz"],
```

**Hayot yo'liga yangi karta qo'shish.** Bitta qatorni nusxalab, oxiriga vergul qo'ying:
```js
{ yr: "2025", em: "🏆", t: "Yilning eng yaxshi o'qituvchisi", d: "Tuman tanlovida g'olib bo'ldim.", big: "#1" },
```
Rangli fon 5 ta kartagacha alohida bo'yalgan. Oltinchi karta qo'shsangiz, `style.css` da `.step:nth-child(6){background:...}` qatorini ham qo'shing.

**Yangi davlat qo'shish.** Koordinatalarni Google Maps'dan olasiz: shahar ustida o'ng tugmani bossangiz, birinchi qatorda raqamlar chiqadi.
```js
{ nom: "BAA", bayroq: "🇦🇪", shahar: "Dubay", lat: 25.204, lon: 55.270, utc: 4, rang: "#00c896" },
```
Globus va ro'yxat avtomatik yangilanadi. Lekin davlatlar nomi qo'lda yozilgan yana uchta joy bor, ularni ham yangilang:
- `index.html` dagi bayroqli stiker: `🇲🇾 🇸🇬 🇹🇷` qatorini qidiring;
- `index.html` dagi "Men kimman" kartasi matni: `Turkiyada bo'lganman` ni qidiring;
- `js/malumotlar.js` dagi `lenta2` so'zlari.

**Til darajasi:** `daraja` raqami 1 = A1 ... 4 = B2, 5 = C1, 6 = C2. Masalan, IELTS 7.0 olsangiz: `katta: "7.0"`, `izoh: "IELTS 7.0 · CEFR C1"`, `daraja: 5`.

> Yosh va "yashagan soniyalar" `tugilgan` sanadan har kuni avtomatik hisoblanadi. Har yili 19-noyabrda saytda tabrik lentasi va konfetti chiqadi.

---

## 3. `index.html`: qolgan matnlar

Faylni oching va **Ctrl+F** orqali quyidagi so'zlarni qidiring:

| Qidiring | Bu nima |
|---|---|
| `<title>` | Brauzer tabidagi sarlavha |
| `og:description` | Telegram yoki Facebookda havola tashlaganda chiqadigan tavsif |
| `class="lead"` | Bosh qismdagi ism ostidagi 2 qator matn |
| `sticker s1` … `s4` | Sudraladigan stikerlar (IELTS, tajriba, bayroqlar, kod) |
| `c-about` | "Men kimman" kartasidagi katta va kichik matn |
| `c-exp` | "6+ yil" kartasi |
| `c-deg` | Oliy ta'lim kartasi (magistr, bakalavr) |
| `<h2>` | Bo'lim sarlavhalari. `<span class="hl">...</span>` ichidagi so'z sariq chiziq bilan ajratiladi |
| `class="sub"` | Aloqa bo'limidagi matn |
| `Bugun Xojimurodning` | Tug'ilgan kun lentasi matni |
| `class="pill"` | Yuqoridagi menyu tugmalari |

Faqat teglar orasidagi matnni o'zgartiring: `<p>` **shu yerni** `</p>`. Burchakli qavslar `< >` ichidagi narsaga tegmang.

---

## 4. `css/style.css`: ranglar va shriftlar

Fayl boshidagi `:root { ... }` qismida butun saytning ranglari bor. Bittasini o'zgartirsangiz, u hamma joyda o'zgaradi:

```css
--oq:#fbfaff;        /* sahifa foni */
--siyoh:#170f3c;     /* asosiy matn, qora tugmalar */
--xira:#6a6491;      /* kulrang ikkinchi darajali matn */
--pushti:#ff2d8a;    /* pushti urg'u */
--zafar:#ffb000;     /* sariq (sarlavha ostidagi chiziq) */
--yalpiz:#00c896;    /* yashil */
--kok:#3d6bff;       /* ko'k */
--binafsha:#8b5cf6;  /* binafsha */
```

Rang kodini tanlash uchun Google'da **"color picker"** deb qidiring.

**Shriftlar** `index.html` dagi Google Fonts havolasida va `--f-display` (sarlavhalar), `--f-body` (oddiy matn) hamda `--f-mono` (kod) qatorlarida ko'rsatilgan.

---

## 5. `js/script.js`: harakatlar

Bu faylni o'zgartirish shart emas. Asosiy qismlari:

| Qism (Ctrl+F) | Vazifasi |
|---|---|
| `atlas (ikat) ravoq` | Bosh qismdagi jonli atlas naqshi |
| `stikerlarni sudrash` | Stikerlarni qo'l bilan surish |
| `kursor halqasi` | Sichqoncha halqasi, magnit tugmalar, bosganda uchqunlar |
| `gorizontal yo'l` | Hayot yo'li kartalarining yonga surilishi |
| `3D egilish` | Kartalarning sichqonchaga qarab burilishi |
| `globus` | Aylanadigan globus va yoylar |
| `const CMDS` | Terminal buyruqlari |
| `konfetti` | Tug'ilgan kun va `party` buyrug'idagi konfetti |

**Terminalga yangi buyruq qo'shish.** `const CMDS={` qatorini toping va uning ichiga quyidagini qo'shing:
```js
  maktab:()=>`Men 12-maktabda dars beraman`,
```
Keyin `yordam` ro'yxatiga ham bir qator qo'shing.

---

## 6. Saytni internetga chiqarish

Buning uchun ikki narsa kerak: **domen** (xojimurodbektemirov.uz manzili) va **hosting** (fayllar turadigan joy).

### 6.1. Domen sotib olish

`.uz` domenlari faqat akkreditatsiyalangan registratorlar orqali sotiladi. Ularning ro'yxati **cctld.uz** saytida bor. Registratorni tanlang, `xojimurodbektemirov.uz` bo'sh yoki bandligini tekshiring va to'lovni qiling. Narxi yiliga taxminan 30–60 ming so'm atrofida, registratorga qarab farq qiladi.

### 6.2. Hosting: uchta yo'l (birini tanlang)

#### A) Netlify: bepul, eng oson (tavsiya qilinadi)
1. **app.netlify.com/drop** saytiga kiring va ro'yxatdan o'ting.
2. `sayt` papkasini sichqoncha bilan sahifaga tashlang. Bir necha soniyada sayt `xxx.netlify.app` manzilida ochiladi.
3. **Domain management → Add a domain** bo'limiga `xojimurodbektemirov.uz` ni yozing.
4. Domen registratoringiz panelida DNS yozuvlarini qo'shing:
   - `A` yozuv: `@` → `75.2.60.5`
   - `CNAME` yozuv: `www` → `xxx.netlify.app` (Netlify bergan manzil)
5. 1–24 soat kuting. Netlify HTTPS (qulf belgisi) ni o'zi yoqadi.

Keyinchalik saytni yangilash uchun **Deploys** bo'limiga yangi `sayt` papkasini qayta tashlaysiz.

#### B) GitHub Pages: bepul
1. github.com da yangi repository oching, masalan `xojimurodbektemirov.uz`.
2. **Add file → Upload files** orqali `sayt` papkasi **ichidagi** fayllarni yuklang. `index.html` eng yuqori darajada turishi kerak.
3. **Settings → Pages** bo'limida Branch: `main` ni tanlab, Save bosing.
4. **Custom domain** maydoniga `xojimurodbektemirov.uz` ni yozing.
5. Registrator panelida 4 ta `A` yozuv qo'shing (`@` uchun):
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   `www` uchun `CNAME` yozuvi: `sizning-loginingiz.github.io`
6. DNS ishlagach, **Enforce HTTPS** ni yoqing.

#### C) O'zbek hosting kompaniyasi (pullik)
Domen bilan birga oddiy hosting sotib oling. Panelda (odatda cPanel) **File Manager → public_html** papkasini oching va `sayt` papkasi **ichidagi** hamma narsani shu yerga yuklang. DNS odatda avtomatik sozlanadi.

### 6.3. Muhim
- Yuklashda papka tuzilishi saqlansin: `index.html`, uning yonida `css` va `js` papkalari.
- `QOLLANMA.md` ni yuklash shart emas, lekin yuklansa ham zarari yo'q.
- Sayt to'liq statik: unga ma'lumotlar bazasi, PHP yoki server dasturi kerak emas.

---

## 7. Muammo bo'lsa

| Muammo | Sababi va yechimi |
|---|---|
| Sayt oq yoki bo'sh, ba'zi qismlar chiqmaydi | `malumotlar.js` da vergul, qavs yoki qo'shtirnoq tushib qolgan. Brauzerda **F12 → Console** ni oching: qizil xabar qaysi qatorda xato borligini ko'rsatadi |
| Dizayn yo'q, faqat oddiy matn | `css` papkasi `index.html` yonida emas yoki noto'g'ri joyga yuklangan |
| Shriftlar boshqacha ko'rinadi | Internet yo'q yoki Google Fonts ochilmayapti. Sayt baribir ishlaydi |
| Domen ochilmayapti | DNS yangilanishi 24 soatgacha davom etishi mumkin. Biroz kuting |
| O'zgarish ko'rinmayapti | **Ctrl+F5** bosing: brauzer eski nusxani eslab qolgan bo'lishi mumkin |

Omad! 🚀

---

## 8. Xavfsizlik

Sayt tekshirilgan va quyidagi himoyalar o'rnatilgan:

- **XSS himoyasi:** `malumotlar.js` dagi har bir matn sahifaga qo'shilishdan oldin tozalanadi. Ranglar faqat `#rrggbb` ko'rinishida, raqamlar faqat raqam bo'lib qabul qilinadi.
- **Content Security Policy** (`index.html` boshidagi `Content-Security-Policy` qatori): brauzer faqat saytning o'z fayllarini va Google Fonts'ni yuklaydi. Begona skriptlar bloklanadi.
  ⚠️ Saytga yangi tashqi xizmat qo'shsangiz (masalan, analitika), uning manzilini shu qatorga qo'shish kerak, aks holda u ishlamaydi.
- **Referrer Policy:** boshqa saytlarga o'tilganda faqat domeningiz nomi uzatiladi.
- **Rasm metama'lumotlari:** GPS va telefon ma'lumotlari o'chirilgan. Yangi rasm qo'shsangiz, ularni o'zingiz o'chiring yoki rasmni menga yuboring.

**Hisoblar xavfsizligi:** saytning eng zaif joyi kod emas, hisoblaringiz.
1. **GitHub:** Settings → Password and authentication → **Two-factor authentication** ni yoqing.
2. **aHOST:** kuchli, boshqa joyda ishlatilmagan parol qo'ying. Ikki bosqichli kirish bo'lsa, uni ham yoqing.
3. **Domen muddati:** 19.11.2027. Avtomatik to'lovni yoqing. Muddati o'tib ketgan domenni boshqa odam sotib olishi mumkin.
4. Hech kimga parol yoki SMS kodini aytmang. aHOST yoki GitHub nomidan kelgan "shoshilinch" xatlardagi havolalarni bosmang.
