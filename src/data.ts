export const BRAND = {
  blue: "#0340B8",
  blueDark: "#022C82",
  green: "#8BC759",
};

export const CONTACT = {
  firstName: "Kanishk",
  lastName: "Malhotra",
  fullName: "Kanishk Malhotra",
  title: "Business Development & Operations Executive",
  company: "Glacious Fresh",
  tagline: "Delivering Freshness. Driving Trust.",
  email: "kanishk@glaciousfresh.com",
  website: "www.glaciousfresh.com",
  websiteUrl: "https://www.glaciousfresh.com",
  phoneDisplay: "+91 93157 12533",
  phoneRaw: "+919315712533",
  address: {
    street: "Gale House, 5NH/87, N.I.T.",
    city: "Faridabad",
    postcode: "121001",
    state: "Haryana",
    country: "India",
  },
};

export const addressLines = [
  CONTACT.address.street + ",",
  `${CONTACT.address.city} ${CONTACT.address.postcode},`,
  `${CONTACT.address.state},`,
  CONTACT.address.country,
];

export const addressOneLine = `${CONTACT.address.street}, ${CONTACT.address.city} ${CONTACT.address.postcode}, ${CONTACT.address.state}, ${CONTACT.address.country}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  addressOneLine
)}`;

export function buildVCard(): string {
  const a = CONTACT.address;
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${CONTACT.lastName};${CONTACT.firstName};;;`,
    `FN:${CONTACT.fullName}`,
    `ORG:${CONTACT.company}`,
    `TITLE:${CONTACT.title}`,
    `TEL;TYPE=CELL,VOICE:${CONTACT.phoneRaw}`,
    `EMAIL;TYPE=WORK,INTERNET:${CONTACT.email}`,
    `URL:${CONTACT.websiteUrl}`,
    `ADR;TYPE=WORK:;;${a.street};${a.city};${a.state};${a.postcode};${a.country}`,
    "END:VCARD",
  ].join("\n");
}

export function downloadVCard() {
  const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Kanishk-Malhotra-Glacious-Fresh.vcf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
