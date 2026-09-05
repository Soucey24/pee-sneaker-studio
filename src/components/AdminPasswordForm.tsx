import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";

export function AdminPasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch("/api/admin/password", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ currentPassword, newPassword }) });
    setMessage(response.ok ? "Password updated. Please sign in again." : "Password change failed.");
    if (response.ok) { setCurrentPassword(""); setNewPassword(""); }
  };
  return <section className="border border-border bg-surface p-5 sm:p-6"><h2 className="flex items-center gap-2 font-display text-lg"><LockKeyhole className="size-4 text-primary" /> Admin password</h2><form onSubmit={submit} className="mt-5 space-y-3"><div className="relative"><input required type={show ? "text" : "password"} value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} placeholder="Current password" className="w-full rounded-md border border-border bg-background px-4 py-3 pr-11 text-sm" /><button type="button" onClick={() => setShow((value) => !value)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2" aria-label="Toggle password visibility">{show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></div><input required minLength={10} type={show ? "text" : "password"} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="New password (10+ characters)" className="w-full rounded-md border border-border bg-background px-4 py-3 text-sm" /><button type="submit" className="ember-fill rounded-md px-4 py-2 font-display text-xs tracking-widest">Update password</button>{message && <p className="text-sm text-muted-foreground" role="status">{message}</p>}</form></section>;
}
