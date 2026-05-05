import { useState } from "react";
import { IdCard } from "lucide-react";

const VCARD = `BEGIN:VCARD
VERSION:3.0
FN:Darley
N:Darley;;;;
NICKNAME:Darley
TITLE:Singer, Songwriter, Storyteller
EMAIL;TYPE=INTERNET:darleynarh@gmail.com
TEL;TYPE=CELL:+233540217150
URL:https://darley-studio.lovable.app
X-SOCIALPROFILE;TYPE=instagram:https://www.instagram.com/darley_musik
END:VCARD`;

export function SaveCardButton() {
  const [saved, setSaved] = useState(false);

  function handleDownload() {
    const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Darley.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="inline-flex items-center gap-3 rounded-md px-6 py-3.5 text-xs uppercase tracking-[0.25em] transition-transform duration-200 hover:scale-105"
      style={{ backgroundColor: "#B8860B", color: "#0D1B2A" }}
    >
      <IdCard size={18} />
      {saved ? "Saved!" : "Save My Card"}
    </button>
  );
}
