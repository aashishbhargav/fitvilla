import { LOCATION_OPTIONS } from "@/lib/constants";

export const FITVILLA_WHATSAPP_NUMBER = "918448519333";

export interface LeadFormValues {
  name: string;
  phone: string;
  location: string;
  source?: string;
}

function getLocationLabel(value: string): string {
  return LOCATION_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function buildLeadWhatsAppMessage(values: LeadFormValues): string {
  const lines = [
    "*New free trial enquiry from FitVilla*",
    "",
    `*Name:* ${values.name.trim()}`,
    `*Phone:* ${values.phone.trim()}`,
    `*Preferred location:* ${getLocationLabel(values.location)}`,
  ];

  if (values.source) {
    lines.push(`*Source:* ${values.source}`);
  }

  lines.push("", "Please call me back to confirm my free trial.");
  return lines.join("\n");
}

export function buildLeadWhatsAppUrl(values: LeadFormValues): string {
  const text = encodeURIComponent(buildLeadWhatsAppMessage(values));
  return `https://wa.me/${FITVILLA_WHATSAPP_NUMBER}?text=${text}`;
}

export function getLeadFormValues(form: HTMLFormElement): LeadFormValues {
  const data = new FormData(form);
  return {
    name: String(data.get("name") ?? ""),
    phone: String(data.get("phone") ?? ""),
    location: String(data.get("location") ?? ""),
  };
}

export function openLeadOnWhatsApp(values: LeadFormValues): string {
  const url = buildLeadWhatsAppUrl(values);
  window.open(url, "_blank", "noopener,noreferrer");
  return url;
}
