"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  deleteInboxMessage,
  getInboxMessages,
  hasInboxSession,
  isInboxConfigured,
  setInboxMessageRead,
  signInToInbox,
  signOutOfInbox,
  type InboxMessage,
} from "@/lib/contact-inbox";

function formatDate(value: string): string {
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function InboxContent() {
  const [view, setView] = useState<"checking" | "signed-out" | "signed-in">("checking");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function loadMessages() {
    setLoading(true);
    setError("");
    try {
      const result = await getInboxMessages();
      setMessages(result);
      setView("signed-in");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load messages.");
      await signOutOfInbox();
      setView("signed-out");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    if (!hasInboxSession()) {
      setView("signed-out");
      return () => { active = false; };
    }

    setLoading(true);
    void getInboxMessages()
      .then((result) => {
        if (active) {
          setMessages(result);
          setView("signed-in");
        }
      })
      .catch(async (loadError: unknown) => {
        await signOutOfInbox();
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Your session has ended. Sign in again.");
          setView("signed-out");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInToInbox(password);
      setPassword("");
      await loadMessages();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Sign-in failed. Check your password.");
      setLoading(false);
    }
  }

  async function handleReadToggle(message: InboxMessage) {
    setBusyId(message.id);
    setError("");
    try {
      await setInboxMessageRead(message.id, !message.read_at);
      setMessages((current) => current.map((item) => (
        item.id === message.id
          ? { ...item, read_at: message.read_at ? null : new Date().toISOString() }
          : item
      )));
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Could not update this message.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(message: InboxMessage) {
    if (!window.confirm("Delete this message permanently?")) return;
    setBusyId(message.id);
    setError("");
    try {
      await deleteInboxMessage(message.id);
      setMessages((current) => current.filter((item) => item.id !== message.id));
    } catch (actionError) {
      setError(actionError instanceof Error ? actionError.message : "Could not delete this message.");
    } finally {
      setBusyId(null);
    }
  }

  async function handleLogout() {
    await signOutOfInbox();
    setMessages([]);
    setView("signed-out");
    setError("");
  }

  const unreadCount = messages.filter((message) => !message.read_at).length;
  const filteredMessages = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return messages;
    return messages.filter((message) =>
      [message.name, message.email, message.phone ?? "", message.category, message.message]
        .some((value) => value.toLowerCase().includes(term)),
    );
  }, [messages, search]);

  return (
    <main id="main" className="aj-inner-page aj-inbox-page">
      <div className="aj-container">
        <header className="aj-inner-heading aj-inbox-heading">
          <p className="aj-eyebrow aj-eyebrow-accent">PRIVATE SPACE</p>
          <h1>Your inbox.</h1>
          <p>Messages sent through the portfolio contact form. This area is private to the site owner.</p>
        </header>

        {!isInboxConfigured() ? (
          <section className="aj-inbox-auth-card">
            <p className="aj-eyebrow aj-eyebrow-accent">SETUP REQUIRED</p>
            <h2>Connect your private inbox.</h2>
            <p>The inbox is built, but it needs its private database connection before you can sign in or receive website messages.</p>
            <Link className="aj-button aj-button-primary" href="/contact/">Back to contact <span aria-hidden="true">↗</span></Link>
          </section>
        ) : view === "checking" ? (
          <section className="aj-inbox-auth-card" aria-live="polite">
            <p>Checking your private session…</p>
          </section>
        ) : view === "signed-out" ? (
          <section className="aj-inbox-auth-card" aria-labelledby="inbox-login-heading">
            <p className="aj-eyebrow aj-eyebrow-accent">OWNER ACCESS</p>
            <h2 id="inbox-login-heading">Good to see you.</h2>
            <p>Enter the private password to view incoming messages.</p>
            <form className="aj-inbox-login-form" onSubmit={handleLogin}>
              <label className="aj-contact-field">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Your inbox password"
                  required
                />
              </label>
              <button className="aj-button aj-button-primary" type="submit" disabled={loading || !password}>
                {loading ? "Signing in..." : "Unlock inbox"} <span aria-hidden="true">↗</span>
              </button>
            </form>
            {error && <p className="aj-inbox-error" role="alert">{error}</p>}
            <Link className="aj-inbox-back-link" href="/contact/">← Back to Contact</Link>
          </section>
        ) : (
          <section className="aj-inbox-dashboard" aria-labelledby="inbox-dashboard-heading">
            <div className="aj-inbox-toolbar">
              <div>
                <p className="aj-eyebrow aj-eyebrow-accent">MESSAGE ARCHIVE</p>
                <h2 id="inbox-dashboard-heading">All messages <span>{messages.length}</span></h2>
                <p>{unreadCount} unread · Showing the latest 100 messages</p>
              </div>
              <div className="aj-inbox-actions">
                <button className="aj-button aj-button-outline" type="button" onClick={() => void loadMessages()} disabled={loading}>
                  {loading ? "Refreshing..." : "Refresh"}
                </button>
                <button className="aj-button aj-button-outline" type="button" onClick={() => void handleLogout()}>
                  Lock inbox
                </button>
              </div>
            </div>

            <label className="aj-inbox-search">
              <span className="aj-sr-only">Search messages</span>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email or message..." />
            </label>

            {error && <p className="aj-inbox-error" role="alert">{error}</p>}

            {filteredMessages.length === 0 ? (
              <div className="aj-inbox-empty">
                <span aria-hidden="true">✉</span>
                <h3>{messages.length === 0 ? "No messages yet." : "No matching messages."}</h3>
                <p>{messages.length === 0 ? "New contact-form messages will appear here." : "Try another name, email address or keyword."}</p>
              </div>
            ) : (
              <div className="aj-inbox-message-list">
                {filteredMessages.map((message) => (
                  <article className={"aj-inbox-message" + (!message.read_at ? " is-unread" : "")} key={message.id}>
                    <div className="aj-inbox-message-top">
                      <div className="aj-inbox-sender">
                        <span className="aj-inbox-unread-dot" aria-hidden="true" />
                        <h3>{message.name}</h3>
                        <span className="aj-inbox-category">{message.category}</span>
                      </div>
                      <time dateTime={message.created_at}>{formatDate(message.created_at)}</time>
                    </div>
                    <div className="aj-inbox-contact-line">
                      <a href={`mailto:${message.email}`}>{message.email}</a>
                      {message.phone && <a href={`tel:${message.phone.replace(/[^+0-9]/g, "")}`}>{message.phone}</a>}
                    </div>
                    <p className="aj-inbox-message-body">{message.message}</p>
                    <div className="aj-inbox-message-actions">
                      <a className="aj-text-link" href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.category}`)}`}>
                        Reply by email <span aria-hidden="true">↗</span>
                      </a>
                      <button type="button" onClick={() => void handleReadToggle(message)} disabled={busyId === message.id}>
                        {message.read_at ? "Mark unread" : "Mark read"}
                      </button>
                      <button className="is-danger" type="button" onClick={() => void handleDelete(message)} disabled={busyId === message.id}>
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
