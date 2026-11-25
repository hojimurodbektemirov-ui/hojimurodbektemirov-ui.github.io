/* =====================================================================
   MALUMOTLAR.JS — SAYTDAGI MA'LUMOTLARNING KO'P QISMI SHU YERDA

   Qoidalar:
   • Faqat qo'shtirnoq "..." ichidagi matnni va raqamlarni o'zgartiring.
   • Vergul ( , ), qavslar ( [ ] { } ) va qo'shtirnoqlarni o'chirmang.
   • Matn ichida qo'shtirnoq " kerak bo'lsa, uni \" deb yozing.
     Apostrof ' ni bemalol yozavering (masalan: o'qituvchi).
   • // bilan boshlangan qatorlar izoh. Ular saytda ko'rinmaydi.
   ===================================================================== */
const MEN = {

  /* ---------- BACKEND ---------- */
  // Cloudflare Worker manzili (backend/O'RNATISH.md ga qarang). Bo'sh bo'lsa,
  // fikrlar devori, aloqa formasi, yurakcha va ko'rishlar yashirinadi, sayt odatdagidek ishlayveradi.
  // Misol: "https://xojimurod-api.sizningnomingiz.workers.dev"
  API_URL: "",

  /* ---------- HOZIR (nima bilan bandman) ---------- */
  // Vaqti-vaqti bilan yangilab turing. yangilangan = oxirgi yangilangan sana (YIL-OY-KUN)
  hozir: {
    yangilangan: "2026-11-25",
    // Hozirgi ish joyi (logotip: img/zis-logo.svg)
    ish: { nom: "Zafar International School", lavozim: "IT va Dasturlash fani ustozi", yil: "2026 – hozir", logo: "img/zis-logo.svg" },
    // Yutuq: orin = egallangan o'rin, top = nechta o'qituvchi ichida
    mukofot: { kichik: "AI Leaders · 2026", loyiha: "Besh Million Sun'iy Intellekt Yetakchilari", turi: "milliy loyihasi", orin: 6, top: 100, sovrin: "$1000", holat: "Hozir yana qatnashyapman" },
    loyiha: { t: "Turli xil katta loyihalar ustida ishlayapman", d: "Tafsilotlar bilan tez orada shu yerda bo'lishaman." },
    // kitob: hozir o'qiyotgan kitob nomi (bo'sh qolsa ko'rsatilmaydi)
    mutolaa: { id: "5343128", nik: "@bektemirov_x", kitob: "", url: "https://mutolaa.com/uz" }
  },

  /* ---------- ASOSIY ---------- */
  ism: "Xojimurod",
  familiya: "Bektemirov",
  tugilgan: "2000-11-19",   // YIL-OY-KUN. Yosh, soniyalar va tug'ilgan kun tabrigi shundan hisoblanadi
  tajribaYil: 6,            // Tajriba yili. Kartalarda, stikerda va terminalda ko'rinadi

  /* ---------- BOSH QISM ---------- */
  // "IT va dasturlash ..." degan joyda navbatma-navbat yozilib turadigan so'zlar
  rollar: ["o'qituvchisi", "ustozi", "ishqibozi", "murabbiyi"],

  // Qora yugurib turadigan lentadagi so'zlar
  lenta: ["Python", "Algoritmlar", "HTML · CSS · JS", "Kompyuter tizimlari", "Informatika", "IELTS 6.5", "Ustoz", "Andijon"],

  // Ikkinchi (konturli) lentadagi so'zlar
  lenta2: ["Xojimurod Bektemirov", "AI Leaders · 6-o'rin", "Zafar International School", "IT o'qituvchisi", "6 yil tajriba", "Magistr", "Malayziya", "Singapur", "Turkiya"],

  /* ---------- HAYOT YO'LI (yonga suriladigan rangli kartalar) ---------- */
  // yr = kichik yozuv, em = emoji, t = sarlavha, d = izoh, big = fondagi katta xira belgi
  // Karta qo'shish uchun bitta { ... } qatorni nusxalab, vergul bilan qo'shing
  yol: [
    { yr: "19.11.2000",   em: "👶", t: "git init", d: "Dunyoga keldim. Hayotimning birinchi commiti.", big: "00" },
    { yr: "bakalavriat",  em: "📘", t: "Informatika o'qitish metodikasi", d: "Qanday o'qitishni o'rgandim: pedagogika va informatika bir joyda.", big: "BA" },
    { yr: "magistratura", em: "🎓", t: "Kompyuter tizimlari va dasturiy ta'minot", d: "Tizimlar qanday ishlashini chuqur o'rgandim.", big: "MA" },
    { yr: "2020 – 2026",  em: "🏫", t: "Jasorat 4-umumta'lim maktabi", d: "Oltinko'l tumani. Informatika va axborot texnologiyalari ustozi.", big: "6" },
    { yr: "2026",         em: "🏆", t: "AI Leaders: TOP-100 ichida 6-o'rin", d: "Besh Million Sun'iy Intellekt Yetakchilari milliy loyihasi. $1000 sovrindori.", big: "#6" },
    { yr: "2026 – hozir", em: "🌍", t: "Zafar International School", d: "IT va Dasturlash fani ustozi.", big: "ZIS" },
    { yr: "hozir",        em: "🚀", t: "xojimurodbektemirov.uz", d: "Shaxsiy saytim ishga tushdi. Davomi bor...", big: "∞" }
  ],

  /* ---------- ISH JOYLARI ("Men haqimda" kartasida va terminalda) ---------- */
  // [yillar, ish joyi, lavozim]. Eng yangisi birinchi
  ish: [
    ["2026 – hozir", "Zafar International School", "IT va Dasturlash fani ustozi"],
    ["2020 – 2026", "Oltinko'l tumani, Jasorat 4-umumta'lim maktabi", "Informatika va axborot texnologiyalari ustozi"]
  ],

  /* ---------- TILLAR (aylana diagrammalar) ---------- */
  // daraja: 1=A1, 2=A2, 3=B1, 4=B2, 5=C1, 6=C2. Aylana shunga qarab to'ladi
  // katta = aylana o'rtasidagi katta yozuv, kichik = uning ostidagi kichik yozuv
  tillar: [
    { nom: "O'zbek tili", izoh: "ona tilim",           daraja: 6, katta: "UZ",  kichik: "ona tili",   rang: "#00c896" },
    { nom: "Rus tili",    izoh: "erkin muloqot",       daraja: 5, katta: "C1",  kichik: "CEFR",       rang: "#3d6bff" },
    { nom: "Ingliz tili", izoh: "IELTS 6.5 · CEFR B2", daraja: 4, katta: "6.5", kichik: "IELTS · B2", rang: "#ff2d8a" }
  ],

  /* ---------- DAVLATLAR (globus va ro'yxat) ---------- */
  // lat/lon = shahar koordinatalari (Google Maps'dan olinadi). Masofa shundan hisoblanadi
  // utc = shahar vaqt mintaqasi (Andijon va Toshkent +5). chap:true bo'lsa, globusdagi nom chap tomonda chiqadi
  // Yangi davlat qo'shsangiz, index.html dagi stikerdagi bayroqlarni va bosh qismdagi "3" raqamini ham o'zgartiring
  davlatlar: [
    { nom: "Malayziya", bayroq: "🇲🇾", shahar: "Kuala-Lumpur", lat: 3.139,  lon: 101.687, utc: 8, rang: "#ff2d8a", chap: true },
    { nom: "Singapur",  bayroq: "🇸🇬", shahar: "Singapur",     lat: 1.352,  lon: 103.82,  utc: 8, rang: "#3d6bff" },
    { nom: "Turkiya",   bayroq: "🇹🇷", shahar: "Istanbul",     lat: 41.008, lon: 28.978,  utc: 3, rang: "#ffb000" }
  ],

  /* ---------- KO'NIKMALAR ---------- */
  // O'ngdagi chiziqli darajalar: ["nomi", foiz]
  konikmalar: [
    ["Dasturlash asoslari", 95],
    ["O'qitish metodikasi", 95],
    ["Algoritmlar", 88],
    ["Python", 85],
    ["Kompyuter tizimlari", 85],
    ["HTML · CSS · JS", 80]
  ],
  // Orbitada aylanadigan so'zlar: ichki halqa (3–5 ta) va tashqi halqa (5–7 ta)
  orbita1: ["Python", "HTML", "CSS", "JavaScript"],
  orbita2: ["Algoritmlar", "Informatika", "Pedagogika", "Kompyuter tizimlari", "Linux", "SQL"],

  /* ---------- ALOQA ---------- */
  // ["sarlavha", "ko'rinadigan matn", "havola"]
  // "Nusxa olish" tugmasi matnni nusxalaydi, "Ochish" tugmasi havolani ochadi.
  // Havola faqat https:// , mailto: yoki tel: bilan boshlanishi mumkin
  aloqa: [
    ["Telegram",  "@bektemirov_x",                 "https://t.me/bektemirov_x"],
    ["Instagram", "@bektemirov_x",                 "https://instagram.com/bektemirov_x"],
    ["Email",     "hojimurodbektemirov@gmail.com", "mailto:hojimurodbektemirov@gmail.com"],
    ["Telefon",   "+998 95 025 20 00",             "tel:+998950252000"]
  ]
};
