export const INBOX_ADMIN_EMAIL = "jain.aman3789@gmail.com";

export const INQUIRY_CATEGORIES = [
  "Professional Opportunities",
  "Project Collaborations",
  "Creator & Brand Partnerships",
  "General",
] as const;

export type InquiryCategory = (typeof INQUIRY_CATEGORIES)[number];

export type ContactMessageInput = {
  name: string;
  email: string;
  phone?: string;
  category: InquiryCategory;
  message: string;
};

export type InboxMessage = ContactMessageInput & {
  id: string;
  created_at: string;
  read_at: string | null;
};

type StoredSession = { access_token: string; refresh_token: string; expires_at: number; };
type AuthResponse = {
  access_token: string; refresh_token: string; expires_in?: number; expires_at?: number;
  user?: { email?: string }; msg?: string; message?: string; error_description?: string;
};

const SESSION_KEY = "aj-contact-inbox-session-v1";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, "");
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isInboxConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function hasInboxSession(): boolean {
  return typeof window !== "undefined" && Boolean(window.sessionStorage.getItem(SESSION_KEY));
}

function requireConfig(): { url: string; key: string } {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("The private inbox has not been connected yet. Please use the email draft for now.");
  }
  return { url: supabaseUrl, key: supabaseAnonKey };
}

function readSession(): StoredSession | null {
  const raw = window.sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredSession;
    if (!parsed.access_token || !parsed.refresh_token || !parsed.expires_at) return null;
    return parsed;
  } catch {
    window.sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function saveSession(data: AuthResponse): StoredSession {
  const session: StoredSession = {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: data.expires_at ?? Math.floor(Date.now() / 1000) + (data.expires_in ?? 3600),
  };
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

async function responseError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as AuthResponse;
    return body.msg || body.message || body.error_description || "The request could not be completed.";
  } catch {
    return `The request could not be completed (HTTP ${response.status}).`;
  }
}

async function validAccessToken(): Promise<string> {
  const { url, key } = requireConfig();
  const session = readSession();
  if (!session) throw new Error("Your inbox session has ended. Please sign in again.");
  if (session.expires_at * 1000 > Date.now() + 30_000) return session.access_token;

  const response = await fetch(`${url}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: session.refresh_token }),
  });
  if (!response.ok) {
    window.sessionStorage.removeItem(SESSION_KEY);
    throw new Error("Your inbox session has expired. Please sign in again.");
  }
  return saveSession((await response.json()) as AuthResponse).access_token;
}

async function adminHeaders(): Promise<HeadersInit> {
  const { key } = requireConfig();
  return { apikey: key, Authorization: `Bearer ${await validAccessToken()}`, "Content-Type": "application/json" };
}

export async function submitContactMessage(input: ContactMessageInput): Promise<void> {
  const { url, key } = requireConfig();
  const response = await fetch(`${url}/rest/v1/contact_messages`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      name: input.name.trim(), email: input.email.trim().toLowerCase(),
      phone: input.phone?.trim() || null, category: input.category, message: input.message.trim(),
    }),
  });
  if (!response.ok) throw new Error(await responseError(response));
}

export async function signInToInbox(password: string): Promise<void> {
  const { url, key } = requireConfig();
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ email: INBOX_ADMIN_EMAIL, password }),
  });
  if (!response.ok) throw new Error(await responseError(response));
  const data = (await response.json()) as AuthResponse;
  if (data.user?.email?.toLowerCase() !== INBOX_ADMIN_EMAIL.toLowerCase()) {
    window.sessionStorage.removeItem(SESSION_KEY);
    throw new Error("This account is not authorised to open the inbox.");
  }
  saveSession(data);
}

export async function signOutOfInbox(): Promise<void> {
  const session = readSession();
  window.sessionStorage.removeItem(SESSION_KEY);
  if (!session || !supabaseUrl || !supabaseAnonKey) return;
  const { url, key } = requireConfig();
  try {
    await fetch(`${url}/auth/v1/logout`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${session.access_token}` },
    });
  } catch {
    // Clearing the local session is sufficient if the network is unavailable.
  }
}

export async function getInboxMessages(): Promise<InboxMessage[]> {
  const { url } = requireConfig();
  const response = await fetch(
    `${url}/rest/v1/contact_messages?select=id,name,email,phone,category,message,created_at,read_at&order=created_at.desc&limit=100`,
    { headers: await adminHeaders(), cache: "no-store" },
  );
  if (!response.ok) throw new Error(await responseError(response));
  return (await response.json()) as InboxMessage[];
}

export async function setInboxMessageRead(id: string, read: boolean): Promise<void> {
  const { url } = requireConfig();
  const response = await fetch(`${url}/rest/v1/contact_messages?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH", headers: { ...(await adminHeaders()), Prefer: "return=minimal" },
    body: JSON.stringify({ read_at: read ? new Date().toISOString() : null }),
  });
  if (!response.ok) throw new Error(await responseError(response));
}

export async function deleteInboxMessage(id: string): Promise<void> {
  const { url } = requireConfig();
  const response = await fetch(`${url}/rest/v1/contact_messages?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE", headers: { ...(await adminHeaders()), Prefer: "return=minimal" },
  });
  if (!response.ok) throw new Error(await responseError(response));
}
