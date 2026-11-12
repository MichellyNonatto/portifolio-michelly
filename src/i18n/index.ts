import { cookies } from "next/headers";
import { en } from "./en";
import { ptBr } from "./pt-BR";

export type Locale = "en" | "pt-BR";
export type Dictionary = typeof en | typeof ptBr;

const dictionaries = { en, "pt-BR": ptBr } satisfies Record<Locale, Dictionary>;

export async function getLocale(): Promise<Locale> {
  const locale = (await cookies()).get("locale")?.value;
  return locale === "pt-BR" ? "pt-BR" : "en";
}

export async function getDictionary(): Promise<{
  locale: Locale;
  dictionary: Dictionary;
}> {
  const locale = await getLocale();
  return { locale, dictionary: dictionaries[locale] };
}
