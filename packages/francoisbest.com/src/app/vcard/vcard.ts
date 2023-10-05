export const vcard = `
BEGIN:VCARD
VERSION:3.0
SOURCE:https://francoisbest.com/vcard
FN:François Best
N:Best;François
PHOTO;TYPE=JPEG;VALUE=URI:https://res.47ng.com/francois.best.jpg
ORG:47ng
TITLE:Freelance Software Engineer
TEL;CELL:${process.env.PHONE_NUMBER}
EMAIL;WORK;INTERNET:hi@francoisbest.com
URL:https://francoisbest.com
TZ:Europe/Paris
END:VCARD
`.trim()
